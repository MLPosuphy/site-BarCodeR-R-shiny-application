import { useState } from "react";
import type { Language } from "./content";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

export default function CitationPageV2({ language }: { language: Language }) {
  const version = "2.12.8";
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState<"main" | "bibtex" | null>(null);
  const citation = language === "fr"
    ? `Équipe BarCodeR (${year}). BarCodeR v${version} : plateforme pour l’exploration et l’analyse reproductible de données de métabarcoding. Institut Sophia Agrobiotech – INRAE.`
    : `BarCodeR team (${year}). BarCodeR v${version}: a platform for reproducible exploration and analysis of metabarcoding data. Institut Sophia Agrobiotech – INRAE.`;
  const bibtex = `@software{barcoder_${year},\n  author  = {{BarCodeR team}},\n  title   = {BarCodeR: interactive and reproducible metabarcoding data analysis},\n  year    = {${year}},\n  version = {${version}}\n}`;
  const c = language === "fr" ? {
    k: "Citation", title: "Citer BarCodeR et préciser la version utilisée.", p: "Une citation logicielle complète permet d’identifier précisément l’outil qui a contribué à produire les résultats et de retrouver l’environnement correspondant.",
    current: "Version actuelle", mainK: "Citation recommandée", mainT: "Une référence prête à intégrer dans un manuscrit.", copy: "Copier la citation", copied: "Copié",
    bibK: "Format BibTeX", bibT: "Pour une bibliothèque bibliographique ou un document LaTeX.", versionK: "À conserver avec la citation", versionT: "Le contexte minimal d’un résultat reproductible.",
    items: [["Version", `BarCodeR v${version}`], ["Date d’accès", "À compléter au moment de l’utilisation"], ["Projet", "Nom ou identifiant du projet analysé"], ["Exports", "Archive du projet et code R lorsqu’il est disponible"]],
    note: "Cette référence est proposée dans l’attente d’un identifiant pérenne ou d’une publication officielle. Elle pourra être remplacée sans modifier l’organisation de cette page."
  } : {
    k: "Citation", title: "Cite BarCodeR and record the version used.", p: "A complete software citation precisely identifies the tool that contributed to the results and makes the corresponding environment easier to retrieve.",
    current: "Current version", mainK: "Recommended citation", mainT: "A reference ready to add to a manuscript.", copy: "Copy citation", copied: "Copied",
    bibK: "BibTeX format", bibT: "For a reference manager or LaTeX document.", versionK: "Keep with the citation", versionT: "The minimum context for a reproducible result.",
    items: [["Version", `BarCodeR v${version}`], ["Access date", "Complete when the software is used"], ["Project", "Name or identifier of the analysed project"], ["Exports", "Project archive and R code when available"]],
    note: "This reference is provided while a persistent identifier or official publication is pending. It can later be replaced without changing the organisation of this page."
  };

  const copy = async (kind: "main" | "bibtex", value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1700);
  };

  return <main className="citation-v2-page">
    <section className="citation-v2-hero"><div className="page-width"><header><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p>{c.p}</p></header><aside><small>{c.current}</small><strong>v{version}</strong><span>BarCodeR</span><i /></aside></div></section>
    <section className="citation-v2-main"><div className="page-width"><div className="citation-v2-heading"><Eyebrow>{c.mainK}</Eyebrow><h2>{c.mainT}</h2></div><div className="citation-v2-copy-card"><blockquote>{citation}</blockquote><button type="button" onClick={() => copy("main", citation)}>{copied === "main" ? c.copied : c.copy}<span>{copied === "main" ? "✓" : "⧉"}</span></button></div><p className="citation-v2-note">{c.note}</p></div></section>
    <section className="citation-v2-details"><div className="page-width"><div className="citation-v2-bib"><Eyebrow>{c.bibK}</Eyebrow><h2>{c.bibT}</h2><pre>{bibtex}</pre><button type="button" onClick={() => copy("bibtex", bibtex)}>{copied === "bibtex" ? c.copied : c.copy}<span>{copied === "bibtex" ? "✓" : "⧉"}</span></button></div><div className="citation-v2-context"><Eyebrow>{c.versionK}</Eyebrow><h2>{c.versionT}</h2><div>{c.items.map(([label, value], index) => <article key={label}><span>0{index + 1}</span><div><b>{label}</b><p>{value}</p></div></article>)}</div></div></div></section>
  </main>;
}
