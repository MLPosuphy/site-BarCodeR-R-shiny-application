import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { parse, serializeOuter } from "parse5";
import {
  languages, routes, routeAliases, renderPage, siteOrigin, sitePath,
  translatePhrase, translatedAttributes,
} from "../.prerender/prerender.js";
import { ogLocales, pageMetadata } from "./page-metadata.mjs";

const template = await readFile("dist/index.html", "utf8");
const redirects = await readFile("dist/_redirects", "utf8");
const urls = new Set();
const imagePath = "/app-previews/screen-home-current.png";
const metadataEscape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const absolute = (path) => new URL(path, siteOrigin).href;
const name = (title) => `${title} | BarCodeR`;

function first(node, tagName) {
  if (node.tagName === tagName) return node;
  for (const child of node.childNodes ?? []) {
    const found = first(child, tagName);
    if (found) return found;
  }
}

function innerText(node) {
  if (node.nodeName === "#text") return node.value;
  return (node.childNodes ?? []).map(innerText).join("");
}

function translateMarkup(node, language) {
  if (node.attrs?.some(({ name }) => name === "data-i18n-skip") || ["style", "script", "noscript"].includes(node.tagName)) return;
  if (node.nodeName === "#text") {
    const stripped = node.value.trim();
    if (stripped) node.value = node.value.replace(stripped, () => translatePhrase(stripped, language));
  }
  for (const attribute of node.attrs ?? []) {
    if (translatedAttributes.includes(attribute.name)) attribute.value = translatePhrase(attribute.value.trim(), language);
  }
  for (const child of node.childNodes ?? []) translateMarkup(child, language);
}

function alternateLinks(alternates) {
  return Object.entries(alternates).map(([language, url]) =>
    `<link rel="alternate" hreflang="${language}" href="${metadataEscape(url)}">`
  ).join("\n");
}

function metadata({ title, description, path, language, alternates = {} }) {
  const url = absolute(path);
  const image = absolute(imagePath);
  const imageAlt = translatePhrase("Current BarCodeR application home page with active project and dataset", language);
  const meta = (key, value, attribute = "name") => `<meta ${attribute}="${key}" content="${metadataEscape(value)}">`;
  const og = (key, value) => meta(`og:${key}`, value, "property");
  return [
    meta("description", description),
    `<link rel="canonical" href="${metadataEscape(url)}">`,
    alternateLinks(alternates),
    og("type", "website"), og("site_name", "BarCodeR"), og("title", title), og("description", description),
    og("url", url), og("locale", ogLocales[language]), og("image", image),
    og("image:alt", language === "fr" ? "Page d’accueil de BarCodeR avec le projet et le jeu de données actifs" : imageAlt),
    ...Object.keys(alternates).filter(code => code !== language && ogLocales[code]).map(code => og("locale:alternate", ogLocales[code])),
    meta("twitter:card", "summary_large_image"), meta("twitter:title", title),
    meta("twitter:description", description), meta("twitter:image", image),
    meta("twitter:image:alt", language === "fr" ? "Page d’accueil de BarCodeR avec le projet et le jeu de données actifs" : imageAlt),
  ].join("\n");
}

function alternatives(getPath) {
  return Object.fromEntries([
    ...languages.map(language => [language, absolute(getPath(language))]),
    ["x-default", absolute(getPath("en"))],
  ]);
}

async function writePage(path, html) {
  const file = path.endsWith("/") ? `dist${path}index.html` : `dist${path}.html`;
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  urls.add(absolute(path));
}

for (const route of routes) {
  const alternates = alternatives(language => sitePath(route, language));
  for (const language of languages) {
    const path = sitePath(route, language);
    const [heading, description] = pageMetadata[language][route];
    const title = name(heading);
    const html = parse(`<div id="root" data-prerendered="${language}">${renderPage(route, language)}</div>`);
    translateMarkup(first(html, "body"), language);
    const data = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", "@id": `${siteOrigin}/#website`, name: "BarCodeR", url: absolute("/"), inLanguage: languages },
        {
          "@type": "SoftwareApplication", "@id": `${siteOrigin}/#application`, name: "BarCodeR",
          url: absolute("/"), description, applicationCategory: "UtilitiesApplication",
          applicationSubCategory: "Metabarcoding analysis", operatingSystem: "Windows",
        },
      ],
    };
    const structuredData = route === "/"
      ? `<script type="application/ld+json">${JSON.stringify(data).replaceAll("<", "\\u003c")}</script>`
      : "";
    await writePage(path, template
      .replace('<html lang="en">', `<html lang="${language}">`)
      .replace(/<title>[^<]*<\/title>/, `<title>${metadataEscape(title)}</title>`)
      .replace("<!-- Page metadata is generated at build time. -->", () => metadata({ title, description, path, language, alternates }) + structuredData)
      .replace('<div id="root"></div>', () => first(html, "body").childNodes.map(node => serializeOuter(node)).join("")));
  }
}

const docs = JSON.parse(await readFile("dist/documentation/manifest.json", "utf8"));
const docsHeading = "BarCodeR documentation";
const docsDescription = "Browse BarCodeR methodology guides and technical references in English, French, Spanish, Chinese and Hindi.";
const languageNames = { en: "English", fr: "Français", es: "Español", zh: "中文", hi: "हिन्दी" };
const docGroups = [];
for (const language of languages) {
  const links = [];
  for (const module of docs.modules) {
    for (const section of docs.sections) {
      const docPath = lang => `/documentation/${lang}/${module}/${section}`;
      const path = docPath(language);
      const file = `dist${path}.html`;
      const source = await readFile(file, "utf8");
      const html = parse(source);
      const title = innerText(first(html, "title")).trim();
      const heading = innerText(first(html, "h1")).trim();
      const article = first(first(html, "main"), "article");
      const intro = first(article, "p");
      const description = intro ? innerText(intro).replace(/\s+/g, " ").trim().slice(0, 230) : heading;
      const alternates = alternatives(docPath);
      await writePage(path, source.replace("</head>", () => metadata({ title, description, path, language, alternates }) + "\n</head>"));
      links.push(`<li><a href="${path}">${metadataEscape(heading)}</a></li>`);
    }
  }
  docGroups.push(`<section lang="${language}"><h2>${languageNames[language]}</h2><ul>${links.join("")}</ul></section>`);
}

const oldDocsIndex = parse(await readFile("dist/documentation/index.html", "utf8"));
const docsRedirect = innerText(first(oldDocsIndex, "script"));
await writePage("/documentation/", `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${name(docsHeading)}</title>
<link rel="stylesheet" href="/documentation/assets/documentation.css">
${metadata({ title: name(docsHeading), description: docsDescription, path: "/documentation/", language: "en" })}
</head><body>
<main class="content" id="doc-content"><article class="doc-article">
<p><a href="/">BarCodeR</a></p><h1>${docsHeading}</h1><p>${docsDescription}</p>
${docGroups.join("\n")}
</article></main><script>if (location.search) { ${docsRedirect} }</script></body></html>`);

await writeFile("dist/404.html", template
  .replace(/<title>[^<]*<\/title>/, "<title>Page not found | BarCodeR</title>")
  .replace("<!-- Page metadata is generated at build time. -->", '<meta name="robots" content="noindex">')
  .replace('<div id="root"></div>', () => `<div id="root">${renderPage(null, "en")}</div>`));

const aliases = [
  ...routes.map(route => [route === "/" ? "/en" : `/en${route}`, route]),
  ...languages.flatMap(language => Object.entries(routeAliases).map(([from, to]) => [
    language === "en" ? from : `/${language}${from}`, sitePath(to, language),
  ])),
];
await writeFile("dist/_redirects", aliases.map(([from, to]) => `${from} ${to} 301`).join("\n") + "\n\n" + redirects);
await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(urls, url => `  <url><loc>${metadataEscape(url)}</loc></url>`).join("\n")}
</urlset>
`);
await writeFile("dist/robots.txt", `User-agent: *\nDisallow: /cdn-cgi/\n\nSitemap: ${absolute("/sitemap.xml")}\n`);
// Retain the historic sample in Git while excluding it from public builds.
await rm("dist/downloads/BarCodeR_telechargement_test.zip", { force: true });
