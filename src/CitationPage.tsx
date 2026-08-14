import { useState } from "react";
import type { Language } from "./content";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

export default function CitationPage({ language }: { language: Language }) {
  const [copied, setCopied] = useState<string | null>(null);
  const appVersion = "2.12.8";
  const year = new Date().getFullYear();
  const citation = language === "fr"
    ? `Équipe BarCodeR (${year}). BarCodeR v${appVersion} : plateforme pour l’exploration et l’analyse reproductible de données de métabarcoding.`
    : `BarCodeR team (${year}). BarCodeR v${appVersion}: a platform for reproducible exploration and analysis of metabarcoding data.`;
  const bibtex = `@software{barcoder_${year},
  author  = {{BarCodeR team}},
  title   = {BarCodeR: a platform for reproducible exploration and analysis of metabarcoding data},
  year    = {${year}},
  version = {${appVersion}},
  note    = {R/Shiny application}
}`;

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
    k: "Citation", title: "Citer BarCodeR de façon précise.", p: "La citation identifie l’outil et sa version. Les informations associées décrivent ensuite les données, les traitements et les paramètres nécessaires pour comprendre et reproduire le parcours analytique.",
    version: "Version de l’application", status: "Format actuel", statusValue: "Citation logicielle provisoire", year: "Année",
    currentK: "Citation recommandée", currentT: "Une référence claire, prête à être utilisée.", currentP: "Cette formulation peut être intégrée dans un article, un rapport, un mémoire ou les métadonnées d’un projet. Elle sera remplacée par la référence pérenne lorsqu’une publication ou une archive versionnée officielle sera disponible.",
    plain: "Texte", bibtex: "BibTeX", copy: "Copier", copied: "Copié",
    recordK: "Traçabilité", recordT: "La citation seule ne décrit pas toute l’analyse.", recordP: "Pour rendre un travail réellement interprétable et reproductible, la version du logiciel doit être associée aux éléments qui ont déterminé les résultats.",
    records: [
      ["Version", `Indiquer BarCodeR v${appVersion} et conserver la distribution utilisée.`],
      ["Données d’entrée", "Identifier les objets phyloseq, les fichiers FASTQ, les métadonnées et, lorsque c’est pertinent, les bases de référence."],
      ["Paramètres", "Conserver les filtrations, transformations, méthodes statistiques et réglages graphiques appliqués."],
      ["Projet", "Archiver le projet BarCodeR, les historiques, le code R généré et les figures nécessaires à la reprise du travail."]
    ],
    writingK: "Dans les travaux", writingT: "Trois niveaux d’information qui se complètent.",
    writing: [
      ["01", "Méthodes", `Mentionner BarCodeR v${appVersion}, les modules utilisés et les principaux paramètres ayant une influence sur les résultats.`],
      ["02", "Références", "Ajouter la citation logicielle dans la bibliographie ou dans la section consacrée aux logiciels et ressources numériques."],
      ["03", "Matériel reproductible", "Joindre, lorsque cela est possible, l’archive de projet, le code exporté, les identifiants des données et les figures finales."]
    ],
    exampleK: "Exemple pour la section Méthodes", example: `Les données de métabarcoding ont été préparées, explorées et analysées avec BarCodeR v${appVersion}. Les paramètres appliqués et les éléments nécessaires à la reproduction du parcours analytique ont été conservés dans le projet BarCodeR associé.`,
    statusK: "À propos de cette référence", statusT: "Aucun DOI ou article logiciel n’est inventé.", statusP: "Tant qu’une référence officielle et pérenne n’a pas été publiée, la page présente explicitement une citation provisoire fondée sur le nom de l’outil, son équipe, son année et sa version. La page sera mise à jour lorsque cette référence existera.",
    install: "Voir la version distribuée", tutorials: "Consulter les tutoriels"
  } : {
    k: "Citation", title: "Cite BarCodeR precisely.", p: "The citation identifies the tool and its version. The associated information then describes the data, processing and parameters required to understand and reproduce the analytical journey.",
    version: "Application version", status: "Current format", statusValue: "Provisional software citation", year: "Year",
    currentK: "Recommended citation", currentT: "A clear reference, ready to use.", currentP: "This wording can be included in a paper, report, dissertation or project metadata. It will be replaced by the persistent reference when an official publication or versioned archive becomes available.",
    plain: "Text", bibtex: "BibTeX", copy: "Copy", copied: "Copied",
    recordK: "Traceability", recordT: "The citation alone does not describe the full analysis.", recordP: "To make work genuinely interpretable and reproducible, the software version must be associated with the elements that shaped the results.",
    records: [
      ["Version", `Report BarCodeR v${appVersion} and retain the distribution used.`],
      ["Input data", "Identify phyloseq objects, FASTQ files, metadata and, when relevant, reference databases."],
      ["Parameters", "Retain the filtering, transformations, statistical methods and graphical settings that were applied."],
      ["Project", "Archive the BarCodeR project, histories, generated R code and figures required to resume the work."]
    ],
    writingK: "In research outputs", writingT: "Three complementary levels of information.",
    writing: [
      ["01", "Methods", `Report BarCodeR v${appVersion}, the modules used and the main parameters that influence results.`],
      ["02", "References", "Add the software citation to the bibliography or to the section dedicated to software and digital resources."],
      ["03", "Reproducible material", "Whenever possible, provide the project archive, exported code, data identifiers and final figures."]
    ],
    exampleK: "Methods section example", example: `Metabarcoding data were prepared, explored and analysed with BarCodeR v${appVersion}. Applied parameters and the elements required to reproduce the analytical journey were retained in the associated BarCodeR project.`,
    statusK: "About this reference", statusT: "No DOI or software paper is invented.", statusP: "Until an official persistent reference is published, this page explicitly provides a provisional citation based on the tool name, team, year and version. The page will be updated when that reference exists.",
    install: "View the distributed version", tutorials: "Browse the tutorials"
  };

  return <main className="citation-page">
    <section className="citation-hero"><div className="page-width"><header><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p>{c.p}</p></header><aside aria-hidden="true"><div className="citation-hero-sheet"><small>BarCodeR</small><strong>v{appVersion}</strong><span>“</span><i /><i /></div></aside><dl><div><dt>{c.version}</dt><dd>v{appVersion}</dd></div><div><dt>{c.status}</dt><dd>{c.statusValue}</dd></div><div><dt>{c.year}</dt><dd>{year}</dd></div></dl></div></section>

    <section className="citation-current"><div className="page-width"><div className="citation-heading reveal"><Eyebrow>{c.currentK}</Eyebrow><h2>{c.currentT}</h2><p>{c.currentP}</p></div><div className="citation-format-grid"><article className="reveal"><header><span>01</span><b>{c.plain}</b></header><blockquote>{citation}</blockquote><button type="button" onClick={() => copy("plain", citation)}>{copied === "plain" ? c.copied : c.copy}<i>⧉</i></button></article><article className="reveal"><header><span>02</span><b>{c.bibtex}</b></header><pre>{bibtex}</pre><button type="button" onClick={() => copy("bibtex", bibtex)}>{copied === "bibtex" ? c.copied : c.copy}<i>⧉</i></button></article></div></div></section>

    <section className="citation-record"><div className="page-width"><div className="citation-record-heading reveal"><Eyebrow>{c.recordK}</Eyebrow><h2>{c.recordT}</h2><p>{c.recordP}</p></div><div className="citation-record-grid">{c.records.map(([title, text], index) => <article className="reveal" key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="citation-writing"><div className="page-width"><div className="citation-heading reveal"><Eyebrow>{c.writingK}</Eyebrow><h2>{c.writingT}</h2></div><div className="citation-writing-flow">{c.writing.map(([number, title, text], index) => <article className="reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p>{index < c.writing.length - 1 && <i><em /></i>}</article>)}</div><blockquote className="citation-method-example"><small>{c.exampleK}</small><p>{c.example}</p><button type="button" onClick={() => copy("example", c.example)}>{copied === "example" ? c.copied : c.copy}<span>⧉</span></button></blockquote></div></section>

    <section className="citation-status"><div className="page-width"><div className="citation-status-mark" aria-hidden="true"><span>i</span><i /></div><div><Eyebrow>{c.statusK}</Eyebrow><h2>{c.statusT}</h2><p>{c.statusP}</p></div></div></section>

    <section className="citation-actions"><div className="page-width"><a className="button primary" href="#/download">{c.install}<span>→</span></a><a className="button secondary" href="#/tutorials">{c.tutorials}<span>→</span></a></div></section>
  </main>;
}
