import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { parse } from "parse5";
import { languages, legacyPath, readRoute, routes, siteOrigin, sitePath } from "../.prerender/prerender.js";

const read = path => readFileSync(`dist/${path}`, "utf8");
const pathToFile = path => path.endsWith("/") ? `${path}index.html` : `${path}.html`;
const homeLabels = {
  en: "BarCodeR – Coming soon",
  fr: "BarCodeR – Bientôt disponible",
  es: "BarCodeR – Próximamente",
  zh: "BarCodeR – 即将推出",
  hi: "BarCodeR – जल्द उपलब्ध",
};
const docs = JSON.parse(read("documentation/manifest.json"));
const pagePaths = routes.flatMap(route => languages.map(language => sitePath(route, language)));
const docPaths = docs.modules.flatMap(module => docs.sections.flatMap(section =>
  languages.map(language => `/documentation/${language}/${module}/${section}`)));

function* walk(node) {
  yield node;
  for (const child of node.childNodes ?? []) yield* walk(child);
}

const attr = (node, key) => node.attrs?.find(({ name }) => name === key)?.value;
const text = node => Array.from(walk(node), child => child.nodeName === "#text" ? child.value : "").join("").trim();

test("sitemap lists unique, real canonical pages and robots keeps assets crawlable", () => {
  const xml = read("sitemap.xml");
  assert.match(xml, /^<\?xml[^\n]+\?>\n<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  assert.match(xml, /<\/urlset>\s*$/);
  assert.doesNotMatch(xml, /<lastmod>|<loc>[^<]*#/);
  const locations = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), ([, url]) => url);
  const paths = [...pagePaths, "/documentation/", ...docPaths];
  assert.deepEqual(new Set(locations), new Set(paths.map(path => siteOrigin + path)));
  assert.equal(locations.length, paths.length);
  assert.match(read("robots.txt"), /^User-agent: \*\nDisallow: \/cdn-cgi\/\n\nSitemap: https:\/\/[^\n]+\/sitemap\.xml\n$/);
  assert.ok(!existsSync("dist/downloads/BarCodeR_telechargement_test.zip"));
});

test("prerendered pages have localized content, metadata, headings, and crawlable links", () => {
  const mainTitles = new Set();
  for (const path of [...pagePaths, "/documentation/", ...docPaths]) {
    const route = readRoute(path);
    const docsLanguage = path.split("/")[2];
    const language = languages.includes(docsLanguage) ? docsLanguage : route.language;
    const html = read(pathToFile(path).slice(1));
    const nodes = Array.from(walk(parse(html)));
    const first = name => nodes.find(node => node.tagName === name);
    const tags = name => nodes.filter(node => node.tagName === name);
    const meta = (key, value) => tags("meta").find(node => attr(node, key) === value);
    assert.equal(attr(first("html"), "lang"), language, path);
    assert.equal(tags("h1").length, 1, path);
    assert.ok(text(first("h1")).length > 4, path);
    const canonical = tags("link").filter(node => attr(node, "rel") === "canonical");
    assert.equal(canonical.length, 1, path);
    assert.equal(attr(canonical[0], "href"), siteOrigin + path, path);
    assert.ok(attr(meta("name", "description"), "content")?.length > 10, path);
    assert.equal(attr(meta("property", "og:url"), "content"), siteOrigin + path, path);
    assert.equal(attr(meta("property", "og:title"), "content"), text(first("title")), path);
    assert.equal(attr(meta("name", "twitter:card"), "content"), "summary_large_image", path);
    assert.doesNotMatch(html, /<meta[^>]+content="[^"]*noindex|href="#\//i, path);
    assert.ok(tags("a").some(node => (attr(node, "href") ?? "").includes("/")), path);

    const alternates = tags("link").filter(node => attr(node, "rel") === "alternate");
    if (path !== "/documentation/") {
      const hrefFor = locale => route.route ? sitePath(route.route, locale) : path.replace(`/documentation/${language}/`, `/documentation/${locale}/`);
      assert.equal(alternates.length, 6, path);
      for (const code of [...languages, "x-default"]) {
        const alternate = alternates.find(node => attr(node, "hreflang") === code);
        const target = hrefFor(code === "x-default" ? "en" : code);
        assert.equal(attr(alternate, "href"), siteOrigin + target, path);
        assert.ok(existsSync("dist" + pathToFile(target)), target);
      }
    }
    if (!route.route) continue;
    mainTitles.add(text(first("title")));
    let previousLevel = 0;
    for (const heading of nodes.filter(node => /^h[1-3]$/.test(node.tagName ?? ""))) {
      const level = Number(heading.tagName.slice(1));
      assert.ok(level <= previousLevel + 1, `${path}: ${heading.tagName} after h${previousLevel}`);
      previousLevel = level;
    }
    assert.ok(tags("img").every(node => attr(node, "alt") !== undefined), path);
    for (const link of tags("a")) {
      const href = attr(link, "href");
      if (href?.startsWith("/")) assert.ok(existsSync("dist" + pathToFile(href)), `${path}: ${href}`);
    }
    assert.doesNotMatch(html, /href="\/api\/download|BarCodeR_v2\.|wrad026/, path);
    if (["/", "/download", "/citation"].includes(route.route)) {
      assert.ok(tags("button").some(button => attr(button, "disabled") !== undefined && text(button) === homeLabels[language]), path);
    }
    if (route.route === "/") {
      const structured = tags("script").find(node => attr(node, "type") === "application/ld+json");
      const data = JSON.parse(text(structured));
      assert.deepEqual(data["@graph"].map(node => node["@type"]), ["WebSite", "SoftwareApplication"]);
      assert.doesNotMatch(text(structured), /softwareVersion|downloadUrl|datePublished|aggregateRating|"offers"/);
    }
  }
  assert.equal(mainTitles.size, pagePaths.length);
  assert.match(read("404.html"), /name="robots" content="noindex"/);
});

test("legacy links preserve the language, query strings, and section anchors", () => {
  for (const language of languages) {
    for (const route of routes) assert.equal(legacyPath(`#${route}`, "", language), sitePath(route, language));
    assert.equal(legacyPath("#/download#installer-process", "?ref=old", language), sitePath("/download", language) + "?ref=old#installer-process");
    assert.equal(legacyPath("#/documentation", "", language), sitePath("/tutorials", language));
    assert.equal(legacyPath("#/application/analyse", "", language), sitePath("/functioning", language));
    assert.equal(legacyPath("#/reproducibility", "", language), sitePath("/analyses", language));
    assert.equal(legacyPath("#installer-process", "", language), null);
    assert.equal(legacyPath("#//example.net", "", language), null);
    assert.equal(legacyPath("#/unknown", "", language), null);
  }
  assert.equal(readRoute("/unknown").route, null);
});
