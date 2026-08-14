import { useEffect, useState } from "react";
import type { Language } from "./content";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

type JourneyStep = {
  id: string;
  number: string;
  title: string;
  lead: string;
  details: string[];
  modules: string[];
  outputs: string[];
  image: string;
  imageAlt: string;
  tone: "openmeta" | "barcoder" | "repro";
  actionLabel?: string;
  actionHref?: string;
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

export default function FunctioningPageV2({ language }: { language: Language }) {
  const [activeStep, setActiveStep] = useState(0);

  const c = language === "fr" ? {
    heroK: "Fonctionnement de BarCodeR",
    heroT: <>Un environnement unique pour conduire <em>l’ensemble du parcours analytique des données de métabarcoding.</em></>,
    heroP: "À partir de fichiers FASTQ ou d’un objet phyloseq, BarCodeR structure un même chemin vers la préparation, l’exploration, les analyses, la visualisation et les exports.",
    heroOrbit: [["01A", "Traiter des séquences brutes"], ["01B", "Importer un objet phyloseq"], ["02", "Préparer les données"], ["03", "Explorer les données"], ["04", "Analyser les données"], ["05", "Visualiser les données"], ["06", "Exporter les données"]],
    entriesK: "Genèse du parcours analytique",
    entriesT: "BarCodeR intervient à plusieurs niveaux de l’analyse des données de métabarcoding : avant ou après le traitement des séquences.",
    entriesP: "Le parcours au sein de BarCodeR dépend des données initiales disponibles et des choix retenus pour le traitement des séquences.",
    storyK: "Le parcours des données dans l’application",
    storyT: "Chaque onglet de l’application représente une étape du parcours analytique des données.",
    rawLabel: "Séquences brutes",
    fastqT: "Traitement à partir de fichiers FASTQ",
    phyloLabel: "Données structurées",
    phyloT: "Import d’un objet phyloseq",
    convergence: "Objet phyloseq",
    commonPath: "Parcours commun",
    outputsLabel: "Résultats de l’étape",
    screenLabel: "Aperçu de l’application",
    projectK: "Travailler sous forme de projet",
    projectT: "Plusieurs datasets, un contexte de travail conservé et transmissible.",
    projectP: "Un projet BarCodeR fonctionne comme une session de travail : plusieurs objets phyloseq et leurs versions y sont organisés avec les figures sauvegardées et les historiques disponibles. L’ensemble peut être repris plus tard ou transmis sous forme d’archive.",
    datasetStack: ["Dataset importé", "Dataset corrigé", "Dataset filtré"],
    sessionK: "Session de travail",
    sessionT: "Projet BarCodeR",
    sessionItems: ["Datasets", "Figures", "Historiques", "Code R"],
    archiveK: "Archive portable",
    archiveT: "Projet .zip",
    resumeK: "Nouvel environnement",
    resumeT: "Projet repris",
    projectStages: [
      ["01", "Rassembler", "Regrouper plusieurs datasets importés ou dérivés sans écraser leurs états précédents."],
      ["02", "Organiser", "Structurer les objets phyloseq et les résultats dans un contexte commun d’analyse."],
      ["03", "Conserver", "Retrouver les datasets, figures sauvegardées et historiques disponibles comme dans une session de travail."],
      ["04", "Transmettre", "Exporter le projet sous forme d’archive portable afin de déplacer le contexte du travail."],
      ["05", "Reprendre", "Importer l’archive comme un nouveau projet et poursuivre l’analyse dans un autre environnement."]
    ]
  } : {
    heroK: "How BarCodeR works",
    heroT: <>One environment for <em>the complete analytical journey of metabarcoding data.</em></>,
    heroP: "Starting from FASTQ files or a phyloseq object, BarCodeR structures one path through preparation, exploration, analyses, visualisation and exports.",
    heroOrbit: [["01A", "Process raw sequences"], ["01B", "Import a phyloseq object"], ["02", "Prepare data"], ["03", "Explore data"], ["04", "Analyse data"], ["05", "Visualise data"], ["06", "Export data"]],
    entriesK: "Origins of the analytical journey",
    entriesT: "BarCodeR can enter the metabarcoding data analysis process at several levels: before or after sequence processing.",
    entriesP: "The journey through BarCodeR depends on the available starting data and the selected sequence-processing choices.",
    storyK: "The data journey through the application",
    storyT: "Each application tab represents a stage in the analytical data journey.",
    rawLabel: "Raw sequences",
    fastqT: "Processing from FASTQ files",
    phyloLabel: "Structured data",
    phyloT: "Phyloseq object import",
    convergence: "Phyloseq object",
    commonPath: "Shared journey",
    outputsLabel: "Step outputs",
    screenLabel: "Application preview",
    projectK: "Project-based work",
    projectT: "Several datasets, one retained and transferable working context.",
    projectP: "A BarCodeR project works like a work session: several phyloseq objects and their versions are organised alongside saved figures and available histories. The whole context can be resumed later or transferred as an archive.",
    datasetStack: ["Imported dataset", "Corrected dataset", "Filtered dataset"],
    sessionK: "Work session",
    sessionT: "BarCodeR project",
    sessionItems: ["Datasets", "Figures", "Histories", "R code"],
    archiveK: "Portable archive",
    archiveT: ".zip project",
    resumeK: "New environment",
    resumeT: "Resumed project",
    projectStages: [
      ["01", "Gather", "Bring imported or derived datasets together without overwriting previous states."],
      ["02", "Organise", "Structure phyloseq objects and outputs in one shared analysis context."],
      ["03", "Retain", "Recover datasets, saved figures and available histories as in a work session."],
      ["04", "Transfer", "Export the project as a portable archive to move the working context."],
      ["05", "Resume", "Import the archive as a new project and continue the analysis in another environment."]
    ]
  };

  const steps: JourneyStep[] = language === "fr" ? [
    {
      id: "fastq", number: "01A", title: "Traiter les séquences brutes",
      lead: "OpenMetaBar transforme les fichiers FASTQ en un objet phyloseq exploitable dans BarCodeR.",
      details: ["Choix du traitement bioinformatique", "Suivi des étapes de calcul", "Production d’un objet phyloseq (dataset) structuré"],
      modules: ["Onglet OpenMetaBar"], outputs: ["Dataset phyloseq structuré", "Séquences prêtes pour l’analyse"],
      image: "app-previews/screen-openmetabar-current.png", imageAlt: "Traitement des séquences dans OpenMetaBar", tone: "openmeta"
    },
    {
      id: "phyloseq", number: "01B", title: "Importer un objet phyloseq",
      lead: "Un objet phyloseq déjà structuré rejoint directement l’espace de travail BarCodeR.",
      details: ["Import d’un objet phyloseq (format compatible : .rds, .rdata)", "Vérification de la compatibilité du ou des fichiers chargés", "Corrections automatiques si l’objet chargé ne respecte pas les conventions de l’application"],
      modules: ["Onglet Input data"], outputs: ["Dataset importé", "Compatibilité contrôlée"],
      image: "app-previews/screen-input-data.png", imageAlt: "Import d’un objet phyloseq dans BarCodeR", tone: "openmeta"
    },
    {
      id: "organize", number: "02", title: "Organiser les datasets (objets phyloseq) en projets",
      lead: "Plusieurs datasets peuvent être organisés au sein d’un même projet, analysés dans un contexte commun et, lorsque les méthodes le permettent, comparés directement entre eux.",
      details: ["Sélection du dataset actif", "Organisation de plusieurs objets phyloseq", "Comparaisons intra- et inter-datasets"],
      modules: ["Onglet Datasets"], outputs: ["Projet multi-datasets", "Contexte commun d’analyse"],
      image: "app-previews/screen-datasets-current.png", imageAlt: "Organisation des datasets dans BarCodeR", tone: "barcoder"
    },
    {
      id: "describe", number: "03", title: "Vue d’ensemble des données",
      lead: "Les principales variables sont visualisées afin d’évaluer la structure, la qualité et la pertinence des datasets avant de passer aux analyses approfondies.",
      details: ["Structure et dimensions du dataset", "Profondeur, richesse et composition", "Taxonomie et métadonnées disponibles"],
      modules: ["Onglet Description"], outputs: ["Vue synthétique du dataset", "Points de vigilance identifiés"],
      image: "app-previews/screen-description-current.png", imageAlt: "Vue d’ensemble d’un dataset dans BarCodeR", tone: "barcoder"
    },
    {
      id: "edit", number: "04", title: "Corriger ou enrichir les datasets",
      lead: "Les composantes du dataset peuvent être ajustées lorsque la structure ou les informations demandent une correction ou des ajouts.",
      details: ["Édition des données", "Ajout ou correction des informations", "Nouvel état enregistrable"],
      modules: ["Onglet Data Edition"], outputs: ["Dataset enrichi ou corrigé", "Nouvel état conservable"],
      image: "app-previews/screen-data-edition.png", imageAlt: "Édition des datasets dans BarCodeR", tone: "barcoder"
    },
    {
      id: "filter", number: "05", title: "Filtrer selon la question scientifique",
      lead: "Des filtrations multiples, diversifiées et personnalisables permettent d’adapter chaque dataset à la question scientifique et aux données disponibles.",
      details: ["Filtres taxonomiques et biologiques", "Sélection des échantillons et séquences", "Aperçu avant et après filtration"],
      modules: ["Onglet Filtration"], outputs: ["Dataset adapté à la question", "Transformations documentées"],
      image: "app-previews/screen-filtration-current.png", imageAlt: "Filtration interactive dans BarCodeR", tone: "barcoder"
    },
    {
      id: "analyse", number: "06", title: "Explorer et analyser les datasets",
      lead: "Une grande diversité de paramétrages calculatoires et graphiques permet d’explorer les données, de tester des hypothèses et de conduire des analyses intra- ou inter-datasets.",
      details: ["Paramétrages graphiques et calculatoires", "Analyses au sein d’un dataset", "Analyses et comparaisons entre datasets"],
      modules: ["Onglet Exploration", "Onglet Analyse"], outputs: ["Figures et diagnostics", "Résultats intra- et inter-datasets"],
      image: "app-previews/screen-analyse-current.png", imageAlt: "Exploration et analyses dans BarCodeR", tone: "barcoder",
      actionLabel: "Explorer les analyses disponibles", actionHref: "#/analyses"
    },
    {
      id: "multiview", number: "07", title: "MultiView, un outil au service de l’interprétation des figures",
      lead: "Toutes les figures générées et sauvegardées dans un projet peuvent être retrouvées, visualisées, déplacées, redimensionnées et organisées librement dans un espace interactif.",
      details: ["Récupération des figures sauvegardées", "Disposition et redimensionnement interactifs", "Organisation d’une lecture d’ensemble"],
      modules: ["Onglet MultiView"], outputs: ["Bibliothèque de figures", "Composition visuelle interactive"],
      image: "app-previews/screen-multiview-current.png", imageAlt: "Organisation interactive des figures dans MultiView", tone: "barcoder"
    },
    {
      id: "repro", number: "08", title: "Une reproductibilité sans faille",
      lead: "Chaque résultat sauvegardé reste relié à son dataset, à ses paramètres et, lorsque la fonctionnalité est disponible, au code R permettant de comprendre, répéter ou prolonger l’analyse.",
      details: ["Historique des opérations et paramètres", "Code R associé aux figures compatibles", "Exports réutilisables hors de BarCodeR"],
      modules: ["Historiques", "Exports", "Code R"], outputs: ["Historique retrouvable", "Résultats et code réutilisables"],
      image: "app-previews/screen-home-current.png", imageAlt: "Projet et historique de travail dans BarCodeR", tone: "repro"
    }
  ] : [
    { id: "fastq", number: "01A", title: "Process raw sequences", lead: "OpenMetaBar turns FASTQ files into a phyloseq object ready for BarCodeR.", details: ["Bioinformatics processing choices", "Processing-step monitoring", "Production of a structured phyloseq object (dataset)"], modules: ["OpenMetaBar tab"], outputs: ["Structured phyloseq dataset", "Sequences ready for analysis"], image: "app-previews/screen-openmetabar-current.png", imageAlt: "Sequence processing in OpenMetaBar", tone: "openmeta" },
    { id: "phyloseq", number: "01B", title: "Import a phyloseq object", lead: "An already structured phyloseq object enters the BarCodeR workspace directly.", details: ["Phyloseq object import (compatible format: .rds, .rdata)", "Compatibility check for loaded file or files", "Automatic corrections when the loaded object does not follow application conventions"], modules: ["Input data tab"], outputs: ["Imported dataset", "Checked compatibility"], image: "app-previews/screen-input-data.png", imageAlt: "Phyloseq object import in BarCodeR", tone: "openmeta" },
    { id: "organize", number: "02", title: "Organise datasets (phyloseq objects) into projects", lead: "Several datasets can be organised in one project, analysed in a shared context and, where supported by the methods, compared directly.", details: ["Active dataset selection", "Organisation of several phyloseq objects", "Within- and between-dataset comparisons"], modules: ["Datasets tab"], outputs: ["Multi-dataset project", "Shared analysis context"], image: "app-previews/screen-datasets-current.png", imageAlt: "Dataset organisation in BarCodeR", tone: "barcoder" },
    { id: "describe", number: "03", title: "Data overview", lead: "The main variables are visualised to assess dataset structure, quality and relevance before deeper analyses.", details: ["Dataset structure and dimensions", "Depth, richness and composition", "Available taxonomy and metadata"], modules: ["Description tab"], outputs: ["Dataset overview", "Identified points to review"], image: "app-previews/screen-description-current.png", imageAlt: "Dataset overview in BarCodeR", tone: "barcoder" },
    { id: "edit", number: "04", title: "Correct or enrich datasets", lead: "Dataset components can be adjusted whenever structure or information requires corrections or additions.", details: ["Data editing", "Information addition or correction", "Savable new state"], modules: ["Data Edition tab"], outputs: ["Enriched or corrected dataset", "Retainable new state"], image: "app-previews/screen-data-edition.png", imageAlt: "Dataset editing in BarCodeR", tone: "barcoder" },
    { id: "filter", number: "05", title: "Filter for the scientific question", lead: "Multiple, diverse and customisable filters adapt each dataset to the scientific question and available data.", details: ["Taxonomic and biological filters", "Sample and sequence selection", "Before-and-after preview"], modules: ["Filtering tab"], outputs: ["Question-specific dataset", "Documented transformations"], image: "app-previews/screen-filtration-current.png", imageAlt: "Interactive filtering in BarCodeR", tone: "barcoder" },
    { id: "analyse", number: "06", title: "Explore and analyse datasets", lead: "A broad range of computational and graphical settings supports data exploration, hypothesis testing, and within- or between-dataset analyses.", details: ["Graphical and computational settings", "Within-dataset analyses", "Between-dataset analyses and comparisons"], modules: ["Exploration tab", "Analysis tab"], outputs: ["Figures and diagnostics", "Within- and between-dataset results"], image: "app-previews/screen-analyse-current.png", imageAlt: "Exploration and analyses in BarCodeR", tone: "barcoder", actionLabel: "Explore available analyses", actionHref: "#/analyses" },
    { id: "multiview", number: "07", title: "MultiView, a tool supporting figure interpretation", lead: "All figures generated and saved in a project can be recovered, viewed, moved, resized and freely organised in an interactive space.", details: ["Saved figure retrieval", "Interactive layout and resizing", "Organisation of an overall reading"], modules: ["MultiView tab"], outputs: ["Figure library", "Interactive visual composition"], image: "app-previews/screen-multiview-current.png", imageAlt: "Interactive figure organisation in MultiView", tone: "barcoder" },
    { id: "repro", number: "08", title: "Reproducibility without compromise", lead: "Every saved result remains linked to its dataset, parameters and, when available, the R code needed to understand, repeat or extend the analysis.", details: ["Operation and parameter history", "R code attached to compatible figures", "Reusable exports outside BarCodeR"], modules: ["Histories", "Exports", "R code"], outputs: ["Recoverable history", "Reusable results and code"], image: "app-previews/screen-home-current.png", imageAlt: "Project and work history in BarCodeR", tone: "repro" }
  ];

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".function-v4-chapter"));
    if (!nodes.length) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveStep(Number((visible.target as HTMLElement).dataset.step || 0));
    }, { threshold: [0.2, 0.4, 0.6], rootMargin: "-30% 0px -36%" });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [language]);

  const goToStep = (index: number) => {
    setActiveStep(index);
    document.getElementById(`function-v4-chapter-${steps[index].id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return <main className="function-v4-page">
    <section className="function-v4-hero"><div className="page-width">
      <header className="function-v4-hero-copy reveal"><Eyebrow>{c.heroK}</Eyebrow><h1>{c.heroT}</h1><p>{c.heroP}</p></header>
      <div className="function-v4-hero-visual reveal delay-1">
        <div className="function-v4-orbit-system" aria-label={language === "fr" ? "Étapes principales du parcours BarCodeR" : "Main stages of the BarCodeR journey"}>
          <i className="function-v4-orbit-line orbit-line-1" /><i className="function-v4-orbit-line orbit-line-2" />
          {c.heroOrbit.map(([number, label], index) => <span className="function-v4-orbit-node" style={{ "--orbit-index": index === 0 ? 0 : c.heroOrbit.length - index } as React.CSSProperties} key={number}><b>{number}</b><strong>{label}</strong></span>)}
        </div>
        <div className="function-v4-browser"><div><span /><span /><span /><b>BarCodeR</b></div><img src={asset("app-previews/screen-home-current.png")} alt={language === "fr" ? "Accueil de BarCodeR" : "BarCodeR home"} /></div>
      </div>
    </div></section>

    <section className="function-v4-journey" id="function-v4-journey"><div className="page-width">
      <div className="section-heading home-journey-heading function-v4-entry-heading reveal reveal-left"><div><Eyebrow>{c.entriesK}</Eyebrow><h2>{c.entriesT}</h2></div><aside className="home-journey-context"><p>{c.entriesP}</p></aside></div>
      <div className="function-v4-story-heading reveal"><Eyebrow>{c.storyK}</Eyebrow><h2>{c.storyT}</h2></div>

      <div className="function-v4-journey-grid">
        <aside className="function-v4-pathmap" aria-label={c.storyK}>
          <div className="function-v4-entry-routes">
            <button className={activeStep === 0 ? "active openmeta" : "openmeta"} onPointerEnter={() => setActiveStep(0)} onFocus={() => setActiveStep(0)} onClick={() => goToStep(0)}><span className="route-number">01A</span><small>{c.rawLabel}</small><b>{c.fastqT}</b><em>FASTQ → OpenMetaBar</em></button>
            <button className={activeStep === 1 ? "active" : ""} onPointerEnter={() => setActiveStep(1)} onFocus={() => setActiveStep(1)} onClick={() => goToStep(1)}><span className="route-number">01B</span><small>{c.phyloLabel}</small><b>{c.phyloT}</b><em>.rds · .rdata → Import</em></button>
          </div>
          <div className="function-v4-convergence"><i /><span>{c.convergence}</span><i /></div><small className="function-v4-common-label">{c.commonPath}</small>
          <ol>{steps.slice(2).map((step, offset) => { const index = offset + 2; return <li className={activeStep === index ? "active" : activeStep > index ? "passed" : ""} key={step.id}><button onPointerEnter={() => setActiveStep(index)} onFocus={() => setActiveStep(index)} onClick={() => goToStep(index)}><span>{step.number}</span><b>{step.title}</b></button></li>; })}</ol>
        </aside>

        <div className="function-v4-chapters">{steps.map((step, index) => <article id={`function-v4-chapter-${step.id}`} className={`function-v4-chapter ${activeStep === index ? "active" : ""}`} data-step={index} data-tone={step.tone} key={step.id} onPointerEnter={() => setActiveStep(index)}>
          <header><div><div className="function-v4-module-line">{step.id === "phyloseq" && <img src={asset("app-previews/openmetabar-logo.png")} alt="" />}<small>{step.modules.join(" · ")}</small></div><h3>{step.title}</h3><p>{step.lead}</p></div></header>
          <div className="function-v4-chapter-body"><div className="function-v4-detail-list">{step.details.map((detail, detailIndex) => <p key={detail}><span>0{detailIndex + 1}</span>{detail}</p>)}</div><figure><figcaption>{c.screenLabel}<b>{step.modules[0]}</b></figcaption><div><img src={asset(step.image)} alt={step.imageAlt} /></div></figure></div>
          {step.actionHref && <a className="function-v4-analysis-link" href={step.actionHref}>{step.actionLabel}<span>→</span></a>}
          <div className="function-v4-outcomes"><small><i>✦</i>{c.outputsLabel}</small><div>{step.outputs.map((output, outputIndex) => <span key={output}><b>0{outputIndex + 1}</b><strong>{output}</strong></span>)}</div></div>
        </article>)}</div>
      </div>
    </div></section>

    <section className="function-v4-project"><div className="page-width">
      <div className="section-heading home-journey-heading function-v4-project-heading reveal reveal-left"><div><Eyebrow>{c.projectK}</Eyebrow><h2>{c.projectT}</h2></div><aside className="home-journey-context"><p>{c.projectP}</p></aside></div>

      <div className="function-v4-project-visual reveal reveal-scale">
        <div className="function-v4-dataset-stack"><small>Datasets</small>{c.datasetStack.map((dataset, index) => <span style={{ "--dataset-index": index } as React.CSSProperties} key={dataset}><i>◇</i><b>{dataset}</b></span>)}</div>
        <i className="function-v4-project-link project-link-1"><b /></i>
        <article className="function-v4-session-card"><header><img src={asset("app-previews/barcoder-logo.png")} alt="" /><span><small>{c.sessionK}</small><b>{c.sessionT}</b></span></header><div>{c.sessionItems.map(item => <span key={item}>✓ {item}</span>)}</div></article>
        <i className="function-v4-project-link project-link-2"><b /></i>
        <article className="function-v4-archive-card"><span>ZIP</span><small>{c.archiveK}</small><b>{c.archiveT}</b></article>
        <i className="function-v4-project-link project-link-3"><b /></i>
        <article className="function-v4-resume-card"><span>↻</span><small>{c.resumeK}</small><b>{c.resumeT}</b></article>
      </div>

      <div className="function-v4-project-stages reveal">{c.projectStages.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div></section>
  </main>;
}
