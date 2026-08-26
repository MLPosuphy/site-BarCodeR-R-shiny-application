import { useState } from "react";
import type { Language } from "./content";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

export default function CitationPage({ language }: { language: Language }) {
  const [copied, setCopied] = useState<string | null>(null);
  const appVersion = "2.12.8";
  const doiUrl = "https://doi.org/10.1093/ismejo/wrad026";
  const authorDate = `BarCodeR Consortium (2026). BarCodeR: interactive and reproducible processing, exploration and analysis of metabarcoding data (Version ${appVersion}). The ISME Journal. https://doi.org/10.1093/ismejo/wrad026`;
  const vancouver = `BarCodeR Consortium. BarCodeR: interactive and reproducible processing, exploration and analysis of metabarcoding data. The ISME Journal. 2026;20:wrad026. doi:10.1093/ismejo/wrad026. Software version ${appVersion}.`;
  const bibtex = `@article{barcoder2026,
  author  = {{BarCodeR Consortium}},
  title   = {BarCodeR: interactive and reproducible processing, exploration and analysis of metabarcoding data},
  journal = {The ISME Journal},
  year    = {2026},
  volume  = {20},
  pages   = {wrad026},
  doi     = {10.1093/ismejo/wrad026},
  note    = {Software version ${appVersion}}
}`;
  const ris = `TY  - JOUR
AU  - BarCodeR Consortium
TI  - BarCodeR: interactive and reproducible processing, exploration and analysis of metabarcoding data
JO  - The ISME Journal
PY  - 2026
VL  - 20
SP  - wrad026
DO  - 10.1093/ismejo/wrad026
N1  - Software version ${appVersion}
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
    version: "Version citée", journal: "Journal simulé", year: "Année simulée", formatsK: "Formats de citation", formatsT: "Choisir le format adapté au document.", formatsP: "Les références ci-dessous simulent la présentation finale d’un article BarCodeR et peuvent être copiées directement pour tester la page.",
    demo: "Maquette de référence", article: "Voir l’article scientifique", note: "Lien DOI fourni à titre de démonstration visuelle", copy: "Copier", copied: "Copié", install: "Télécharger BarCodeR", tutorials: "Consulter les tutoriels",
    labels: ["Auteur-date", "Vancouver", "BibTeX", "RIS"]
  } : {
    k: "Citation", title: "Used BarCodeR? Cite the tool.", p: "Whenever BarCodeR contributes to sequence processing with OpenMetaBar, dataset preparation, statistical analysis or result visualisation, the tool and the version used should be cited in the associated work.",
    version: "Cited version", journal: "Simulated journal", year: "Simulated year", formatsK: "Citation formats", formatsT: "Choose the format suited to the document.", formatsP: "The references below simulate the final presentation of a BarCodeR paper and can be copied directly to test the page.",
    demo: "Reference mock-up", article: "View the scientific article", note: "DOI link supplied for visual demonstration", copy: "Copy", copied: "Copied", install: "Download BarCodeR", tutorials: "Browse tutorials",
    labels: ["Author-date", "Vancouver", "BibTeX", "RIS"]
  };
  const formats = [["author-date", c.labels[0], authorDate], ["vancouver", c.labels[1], vancouver], ["bibtex", c.labels[2], bibtex], ["ris", c.labels[3], ris]];

  return <main className="citation-page citation-page-v2">
    <section className="citation-hero"><div className="page-width"><header><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p>{c.p}</p><a className="citation-doi-link" href={doiUrl} target="_blank" rel="noreferrer"><span>DOI</span><b>{c.article}</b><i>↗</i><small>{c.note}</small></a></header><aside aria-hidden="true"><div className="citation-hero-sheet"><small>BarCodeR · ARTICLE</small><strong>The ISME Journal</strong><span>“</span><i /><i /></div></aside><dl><div><dt>{c.version}</dt><dd>v{appVersion}</dd></div><div><dt>{c.journal}</dt><dd>The ISME Journal</dd></div><div><dt>{c.year}</dt><dd>2026</dd></div></dl></div></section>

    <section className="citation-current"><div className="page-width"><div className="citation-heading reveal"><Eyebrow>{c.formatsK}</Eyebrow><h2>{c.formatsT}</h2><p>{c.formatsP}</p></div><div className="citation-format-grid citation-format-grid-v2">{formats.map(([key, label, value], index) => <article className="reveal" key={key}><header><span>{String(index + 1).padStart(2, "0")}</span><b>{label}</b><small>{c.demo}</small></header>{key === "author-date" || key === "vancouver" ? <blockquote>{value}</blockquote> : <pre>{value}</pre>}<button type="button" onClick={() => copy(key, value)}>{copied === key ? c.copied : c.copy}<i>⧉</i></button></article>)}</div></div></section>

    <section className="citation-actions"><div className="page-width"><a className="button primary" href="#/download">{c.install}<span>→</span></a><a className="button secondary" href="#/tutorials">{c.tutorials}<span>→</span></a></div></section>
  </main>;
}
