import { useState } from "react";
import type { Language } from "./content";
import { useRelease, ReleaseButton, ReleaseNotice } from "./release";
import { SiteLink } from "./SiteLink";
import { siteOrigin } from "./routes";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

export default function CitationPage({ language }: { language: Language }) {
  const [copied, setCopied] = useState<string | null>(null);
  const { release } = useRelease();
  const homepage = siteOrigin + "/";
  const versionNote = !release.released ? "" : ` (v${release.version})`;
  const authorDate = `BarCodeR${versionNote}. ${homepage}`;
  const vancouver = `BarCodeR${versionNote} [Internet]. Available from: ${homepage}`;
  const bibtex = `@misc{barcoder,
  title = {BarCodeR${versionNote}},
  url   = {${homepage}}
}`;
  const ris = `TY  - COMP
TI  - BarCodeR${versionNote}
UR  - ${homepage}
ER  -`;

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  };

  const c = language === "fr" ? {
    k: "Citation", title: "BarCodeR utilisé ? Citez l’outil.", p: "Dès que BarCodeR intervient dans le traitement des séquences avec OpenMetaBar, la préparation des datasets, l’analyse statistique ou la visualisation des résultats, l’outil et la version utilisée doivent être cités dans le travail associé.",
    version: "Version publiée", source: "Source", resource: "Site du projet", formatsK: "Formats de citation", formatsT: "Choisir le format adapté au document.",
    formatsP: "Vous pouvez citer le site du projet avec ces références provisoires. Si vous avez utilisé BarCodeR, indiquez la version exacte utilisée.",
    demo: "Référence provisoire", article: "Voir le site du projet", copy: "Copier", copied: "Copié", tutorials: "Consulter les tutoriels",
    labels: ["Auteur-date", "Vancouver", "BibTeX", "RIS"]
  } : {
    k: "Citation", title: "Used BarCodeR? Cite the tool.", p: "Whenever BarCodeR contributes to sequence processing with OpenMetaBar, dataset preparation, statistical analysis or result visualisation, the tool and the version used should be cited in the associated work.",
    version: "Published version", source: "Source", resource: "Project website", formatsK: "Citation formats", formatsT: "Choose the format suited to the document.",
    formatsP: "You can cite the project website using these provisional references. If you used BarCodeR, include the exact version you used.",
    demo: "Provisional reference", article: "View the project website", copy: "Copy", copied: "Copied", tutorials: "Browse tutorials",
    labels: ["Author-date", "Vancouver", "BibTeX", "RIS"]
  };
  const formats = [["author-date", c.labels[0], authorDate], ["vancouver", c.labels[1], vancouver], ["bibtex", c.labels[2], bibtex], ["ris", c.labels[3], ris]];

  return <main className="citation-page citation-page-v2">
    <section className="citation-hero"><div className="page-width"><header><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p>{c.p}</p><SiteLink className="citation-doi-link" to="/"><span>URL</span><b>{c.article}</b><i>↗</i></SiteLink></header><aside aria-hidden="true"><div className="citation-hero-sheet"><small>BarCodeR</small><strong>{c.resource}</strong><span>“</span><i /><i /></div></aside><dl>{release.released && <div><dt>{c.version}</dt><dd>v{release.version}</dd></div>}<div><dt>{c.source}</dt><dd>{c.resource}</dd></div></dl></div></section>

    <section className="citation-current"><div className="page-width"><div className="citation-heading reveal"><Eyebrow>{c.formatsK}</Eyebrow><h2>{c.formatsT}</h2><p>{c.formatsP}</p></div><div className="citation-format-grid citation-format-grid-v2">{formats.map(([key, label, value], index) => <article className="reveal" key={key}><header><span>{String(index + 1).padStart(2, "0")}</span><b>{label}</b><small>{c.demo}</small></header>{key === "author-date" || key === "vancouver" ? <blockquote>{value}</blockquote> : <pre>{value}</pre>}<button type="button" onClick={() => copy(key, value)}>{copied === key ? c.copied : c.copy}<i>⧉</i></button></article>)}</div></div></section>

    <section className="citation-actions"><div className="page-width"><ReleaseButton className="button primary" /><SiteLink className="button secondary" to="/tutorials">{c.tutorials}<span>→</span></SiteLink><ReleaseNotice className="release-notice" /></div></section>
  </main>;
}
