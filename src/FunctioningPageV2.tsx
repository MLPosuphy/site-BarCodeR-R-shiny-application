import { useEffect, useState } from "react";
import type { Language } from "./content";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

type JourneyStep = {
  id: string; number: string; title: string; lead: string; details: string[];
  modules: string[]; outputs: string[]; image: string; imageAlt: string;
  tone: "openmeta" | "barcoder";
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

export default function FunctioningPageV2({ language }: { language: Language }) {
  const [activeStep, setActiveStep] = useState(0);

  const c = language === "fr" ? {
    heroK: "Fonctionnement de BarCodeR",
    heroT: <>Un environnement unique pour suivre <em>tout le parcours des données de métabarcoding.</em></>,
    heroP: "À partir de fichiers FASTQ ou d’un objet phyloseq, BarCodeR structure un même chemin vers les contrôles, figures, analyses et exports, dans un espace cohérent, interactif et reproductible.",
    heroScreen: "Un espace de travail continu, depuis la donnée initiale jusqu’au résultat interprétable.",
    heroOrbit: ["Importer", "Préparer", "Explorer", "Analyser", "Transmettre"],
    scroll: "Faire défiler pour suivre le parcours",
    entriesK: "Genèse du parcours analytique",
    entriesT: "Deux manières d’entrer dans BarCodeR, un même parcours une fois les données structurées.",
    entriesP: "Le parcours au sein de BarCodeR dépend des données initiales disponibles et des choix retenus pour le traitement des séquences.",
    storyK: "Le parcours dans l’application",
    storyT: "Chaque étape trouve sa place dans un chemin lisible, sans imposer un ordre rigide.",
    storyP: "Le schéma reste visible pendant le défilement. L’étape placée au centre devient active et révèle son rôle, ses outils et son aperçu dans l’application.",
    rawLabel: "Séquences brutes", fastqT: "Démarrage à partir de fichiers FASTQ",
    phyloLabel: "Données structurées", phyloT: "Démarrage à partir d’un objet phyloseq",
    convergence: "Objet phyloseq", commonPath: "Parcours commun",
    outputsLabel: "Résultats de l’étape", screenLabel: "Aperçu de l’application",
    freedomK: "Un parcours qui reste flexible",
    freedomT: "Chaque étape reste accessible au moment où elle devient utile.",
    freedomP: "Une analyse peut faire émerger un nouveau besoin de contrôle, de filtration ou de comparaison. Le parcours se réorganise autour de la question scientifique, sans effacer les états déjà conservés.",
    loop: ["Contrôler", "Ajuster", "Analyser", "Comparer"],
    projectK: "Travailler sous forme de projet",
    projectT: "Le projet donne une structure durable à l’ensemble de l’analyse.",
    projectP: "Dans BarCodeR, un projet constitue le conteneur du travail : il rassemble les datasets, leur contexte et les éléments sauvegardés au fil de l’analyse.",
    projectDefK: "Le projet", projectDefT: "Le cadre général du travail",
    projectDefP: "Il réunit plusieurs états des données et les éléments nécessaires pour retrouver le fil de l’analyse.",
    datasetDefK: "Le dataset", datasetDefT: "Un état exploitable des données",
    datasetDefP: "Il peut correspondre à l’objet importé, à une version corrigée ou à une version filtrée destinée à une question précise.",
    projectHub: "Projet BarCodeR", projectHubP: "Un seul contexte, plusieurs états",
    projectNodes: [["Données initiales", "Objet importé"], ["Dataset corrigé", "Structure ajustée"], ["Version filtrée A", "Question biologique A"], ["Version filtrée B", "Question biologique B"], ["Résultats", "Figures, tableaux, code R"]],
    projectBenefits: [["01", "Regrouper", "Centraliser les datasets et leur contexte dans un même espace de travail."], ["02", "Distinguer", "Conserver plusieurs versions sans confondre l’objet initial et les états préparés."], ["03", "Retrouver", "Revenir aux éléments sauvegardés et comprendre à quel dataset ils se rapportent."]],
    transferK: "Continuité du travail",
    transferT: "Reprendre ou transmettre le travail sans perdre son contexte.",
    transferP: "Le projet devient une unité portable : il peut être sauvegardé, exporté, transmis puis importé pour retrouver les datasets et les éléments conservés.",
    transferSteps: [["01", "Sauvegarder", "Conserver l’état utile du projet et les datasets associés.", "●"], ["02", "Exporter", "Créer une archive .zip portable à partir du projet.", "↓"], ["03", "Transmettre", "Déplacer l’archive vers un autre espace de travail.", "↗"], ["04", "Importer", "Créer un nouveau projet à partir de l’archive reçue.", "＋"], ["05", "Reprendre", "Retrouver les données et poursuivre l’exploration.", "▶"]],
    transferNote: "L’import d’une archive crée un nouveau projet ; aucune fusion silencieuse avec le projet déjà ouvert.",
    finalK: "Étape suivante", finalT: "Le parcours est posé. Les familles d’analyses peuvent maintenant être explorées.",
    finalP: "La page Analyses relie chaque question biologique aux méthodes, sorties et niveaux d’accompagnement disponibles.",
    finalAnalysis: "Explorer les analyses", finalTutorial: "Suivre un tutoriel", finalInstall: "Installer BarCodeR"
  } : {
    heroK: "How BarCodeR works",
    heroT: <>One environment for <em>the complete metabarcoding data journey.</em></>,
    heroP: "From FASTQ files or a phyloseq object to figures, analyses and exports, BarCodeR brings the useful steps together in a coherent, interactive and reproducible workspace.",
    heroScreen: "A continuous workspace, from initial data to interpretable results.",
    heroOrbit: ["Import", "Prepare", "Explore", "Analyse", "Transfer"], scroll: "Scroll to follow the journey",
    entriesK: "Origins of the analytical journey",
    entriesT: "Two ways into BarCodeR, one shared journey once the data are structured.",
    entriesP: "The journey through BarCodeR depends on the available starting data and the selected sequence-processing choices.",
    storyK: "The application journey", storyT: "Every step has a clear place without imposing a rigid order.",
    storyP: "The map remains visible while scrolling. The step at the centre becomes active and reveals its purpose, tools and application preview.",
    rawLabel: "Raw sequences", fastqT: "Starting from FASTQ files", phyloLabel: "Structured data", phyloT: "Starting from a phyloseq object",
    convergence: "Phyloseq object", commonPath: "Shared journey", outputsLabel: "Step outputs", screenLabel: "Application preview",
    freedomK: "A flexible journey", freedomT: "Every step remains available whenever it becomes useful.",
    freedomP: "An analysis may reveal a new need for checking, filtering or comparison. The journey reorganises around the scientific question without erasing states that have already been retained.",
    loop: ["Check", "Adjust", "Analyse", "Compare"],
    projectK: "Project-based work", projectT: "A project gives the entire analysis a durable structure.",
    projectP: "In BarCodeR, a project is the work container: it brings datasets, their context and elements saved throughout the analysis together.",
    projectDefK: "The project", projectDefT: "The overall working frame", projectDefP: "It brings several data states and the elements needed to recover the thread of an analysis together.",
    datasetDefK: "The dataset", datasetDefT: "A usable state of the data", datasetDefP: "It may be the imported object, a corrected version or a filtered version intended for a specific question.",
    projectHub: "BarCodeR project", projectHubP: "One context, several states",
    projectNodes: [["Initial data", "Imported object"], ["Corrected dataset", "Adjusted structure"], ["Filtered version A", "Biological question A"], ["Filtered version B", "Biological question B"], ["Results", "Figures, tables, R code"]],
    projectBenefits: [["01", "Gather", "Centralise datasets and their context in the same workspace."], ["02", "Differentiate", "Keep several versions without confusing the initial object and prepared states."], ["03", "Recover", "Return to saved elements and understand which dataset they relate to."]],
    transferK: "Work continuity", transferT: "Resume or transfer work without losing its context.",
    transferP: "The project becomes a portable unit: it can be saved, exported, shared and imported to recover retained datasets and elements.",
    transferSteps: [["01", "Save", "Retain the useful project state and its associated datasets.", "●"], ["02", "Export", "Create a portable .zip archive from the project.", "↓"], ["03", "Transfer", "Move the archive to another workspace.", "↗"], ["04", "Import", "Create a new project from the received archive.", "＋"], ["05", "Resume", "Recover the data and continue the exploration.", "▶"]],
    transferNote: "Importing an archive creates a new project; it is never silently merged into the project already open.",
    finalK: "Next step", finalT: "The journey is set. The analysis families are ready to explore.",
    finalP: "The Analysis page connects each biological question with its methods, outputs and available guidance levels.",
    finalAnalysis: "Explore analyses", finalTutorial: "Follow a tutorial", finalInstall: "Install BarCodeR"
  };

  const steps: JourneyStep[] = language === "fr" ? [
    { id: "fastq", number: "01A", title: "Préparer les séquences brutes", lead: "OpenMetaBar transforme les fichiers FASTQ en un objet phyloseq exploitable dans BarCodeR.", details: ["Choix du traitement bioinformatique", "Suivi des étapes de calcul", "Production d’un objet structuré"], modules: ["OpenMetaBar"], outputs: ["Objet phyloseq", "Séquences traitées"], image: "app-previews/screen-openmetabar-current.png", imageAlt: "Préparation des séquences dans OpenMetaBar", tone: "openmeta" },
    { id: "phyloseq", number: "01B", title: "Importer un objet phyloseq", lead: "Un objet déjà structuré rejoint directement l’espace de travail BarCodeR.", details: ["Import d’un fichier R compatible", "Lecture des composantes disponibles", "Contrôle avant utilisation"], modules: ["Input data"], outputs: ["Objet chargé", "Composantes contrôlées"], image: "app-previews/screen-input-data.png", imageAlt: "Import d’un objet phyloseq dans BarCodeR", tone: "barcoder" },
    { id: "organize", number: "02", title: "Organiser les datasets", lead: "Les objets disponibles sont nommés, distingués et réunis dans le projet actif.", details: ["Sélection du dataset actif", "Repérage des différents états", "Accès rapide aux données du projet"], modules: ["Datasets"], outputs: ["Dataset actif", "Projet organisé"], image: "app-previews/screen-datasets-current.png", imageAlt: "Gestion des datasets dans BarCodeR", tone: "barcoder" },
    { id: "describe", number: "03", title: "Décrire avant de décider", lead: "La structure, la profondeur, la richesse, la taxonomie et les métadonnées deviennent lisibles avant toute transformation.", details: ["Vue d’ensemble du dataset", "Diagnostics descriptifs", "Repérage des points d’attention"], modules: ["Description"], outputs: ["Profil des données", "Contrôles visuels"], image: "app-previews/screen-description-current.png", imageAlt: "Description d’un dataset dans BarCodeR", tone: "barcoder" },
    { id: "edit", number: "04", title: "Corriger ou enrichir", lead: "Les composantes du dataset peuvent être ajustées lorsque la structure ou les informations demandent une correction.", details: ["Édition ciblée", "Contrôle des modifications", "Nouvel état enregistrable"], modules: ["Data Edition"], outputs: ["Dataset corrigé", "Structure harmonisée"], image: "app-previews/screen-data-edition.png", imageAlt: "Édition des données dans BarCodeR", tone: "barcoder" },
    { id: "filter", number: "05", title: "Filtrer selon la question", lead: "Taxons, échantillons et séquences sont sélectionnés en fonction du périmètre scientifique étudié.", details: ["Critères combinables", "Aperçu avant et après", "Version filtrée conservable"], modules: ["Filtration"], outputs: ["Dataset préparé", "Journal des opérations"], image: "app-previews/screen-filtration-current.png", imageAlt: "Filtration interactive dans BarCodeR", tone: "barcoder" },
    { id: "explore", number: "06", title: "Explorer les grands équilibres", lead: "Les premières visualisations révèlent composition, diversité et variations dans les données.", details: ["Figures descriptives", "Navigation interactive", "Premières comparaisons"], modules: ["Exploration"], outputs: ["Profils visuels", "Tendances à approfondir"], image: "app-previews/screen-exploration-current.png", imageAlt: "Exploration visuelle dans BarCodeR", tone: "barcoder" },
    { id: "analyse", number: "07", title: "Tester et interpréter", lead: "Les méthodes statistiques structurent les comparaisons et documentent les résultats utiles à l’interprétation.", details: ["Choix guidé des méthodes", "Résultats statistiques", "Diagnostics associés"], modules: ["Analyse"], outputs: ["Tests et modèles", "Figures analytiques"], image: "app-previews/screen-analyse-current.png", imageAlt: "Analyses statistiques dans BarCodeR", tone: "barcoder" },
    { id: "compose", number: "08", title: "Comparer et composer", lead: "Les figures sauvegardées se retrouvent dans un même espace pour construire une lecture d’ensemble.", details: ["Comparaison côte à côte", "Organisation des figures", "Composition d’un panneau"], modules: ["MultiView"], outputs: ["Panneau de figures", "Restitution cohérente"], image: "app-previews/screen-multiview-current.png", imageAlt: "Composition de figures dans MultiView", tone: "barcoder" },
    { id: "export", number: "09", title: "Conserver et exporter", lead: "Les résultats produits quittent l’application avec le niveau de contexte nécessaire à leur réutilisation.", details: ["Export des figures et tableaux", "Récupération du code R disponible", "Sauvegarde du projet"], modules: ["Exports", "Historiques", "Projet"], outputs: ["Fichiers exploitables", "Archive de projet"], image: "app-previews/screen-home-current.png", imageAlt: "Accueil d’un projet BarCodeR", tone: "barcoder" }
  ] : [
    { id: "fastq", number: "01A", title: "Prepare raw sequences", lead: "OpenMetaBar turns FASTQ files into a phyloseq object that can be used in BarCodeR.", details: ["Bioinformatics processing choices", "Processing-step monitoring", "Production of a structured object"], modules: ["OpenMetaBar"], outputs: ["Phyloseq object", "Processed sequences"], image: "app-previews/screen-openmetabar-current.png", imageAlt: "Sequence preparation in OpenMetaBar", tone: "openmeta" },
    { id: "phyloseq", number: "01B", title: "Import a phyloseq object", lead: "An already structured object enters the BarCodeR workspace directly.", details: ["Compatible R file import", "Reading available components", "Pre-use checks"], modules: ["Input data"], outputs: ["Loaded object", "Checked components"], image: "app-previews/screen-input-data.png", imageAlt: "Phyloseq object import in BarCodeR", tone: "barcoder" },
    { id: "organize", number: "02", title: "Organise datasets", lead: "Available objects are named, differentiated and gathered in the active project.", details: ["Active dataset selection", "Identification of data states", "Quick project-data access"], modules: ["Datasets"], outputs: ["Active dataset", "Organised project"], image: "app-previews/screen-datasets-current.png", imageAlt: "Dataset management in BarCodeR", tone: "barcoder" },
    { id: "describe", number: "03", title: "Describe before deciding", lead: "Structure, depth, richness, taxonomy and metadata become readable before any transformation.", details: ["Dataset overview", "Descriptive diagnostics", "Identification of points to review"], modules: ["Description"], outputs: ["Data profile", "Visual checks"], image: "app-previews/screen-description-current.png", imageAlt: "Dataset description in BarCodeR", tone: "barcoder" },
    { id: "edit", number: "04", title: "Correct or enrich", lead: "Dataset components can be adjusted whenever structure or information requires a correction.", details: ["Targeted editing", "Change review", "Savable new state"], modules: ["Data Edition"], outputs: ["Corrected dataset", "Harmonised structure"], image: "app-previews/screen-data-edition.png", imageAlt: "Data editing in BarCodeR", tone: "barcoder" },
    { id: "filter", number: "05", title: "Filter for the question", lead: "Taxa, samples and sequences are selected according to the scientific scope under study.", details: ["Combinable criteria", "Before-and-after preview", "Retainable filtered version"], modules: ["Filtering"], outputs: ["Prepared dataset", "Operation log"], image: "app-previews/screen-filtration-current.png", imageAlt: "Interactive filtering in BarCodeR", tone: "barcoder" },
    { id: "explore", number: "06", title: "Explore the main patterns", lead: "Initial visualisations reveal composition, diversity and variation within the data.", details: ["Descriptive figures", "Interactive navigation", "Initial comparisons"], modules: ["Exploration"], outputs: ["Visual profiles", "Patterns to investigate"], image: "app-previews/screen-exploration-current.png", imageAlt: "Visual exploration in BarCodeR", tone: "barcoder" },
    { id: "analyse", number: "07", title: "Test and interpret", lead: "Statistical methods structure comparisons and document the results needed for interpretation.", details: ["Guided method selection", "Statistical results", "Associated diagnostics"], modules: ["Analysis"], outputs: ["Tests and models", "Analytical figures"], image: "app-previews/screen-analyse-current.png", imageAlt: "Statistical analyses in BarCodeR", tone: "barcoder" },
    { id: "compose", number: "08", title: "Compare and compose", lead: "Saved figures come together in one space to build an overall reading.", details: ["Side-by-side comparison", "Figure organisation", "Panel composition"], modules: ["MultiView"], outputs: ["Figure panel", "Coherent report"], image: "app-previews/screen-multiview-current.png", imageAlt: "Figure composition in MultiView", tone: "barcoder" },
    { id: "export", number: "09", title: "Retain and export", lead: "Produced results leave the application with the context required for reuse.", details: ["Figure and table exports", "Available R code recovery", "Project saving"], modules: ["Exports", "Histories", "Project"], outputs: ["Usable files", "Project archive"], image: "app-previews/screen-home-current.png", imageAlt: "BarCodeR project home", tone: "barcoder" }
  ];

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".function-v3-chapter"));
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
    document.getElementById(`function-v3-chapter-${steps[index].id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return <main className="function-v3-page">
    <section className="function-v3-hero"><div className="page-width">
      <header className="function-v3-hero-copy reveal"><Eyebrow>{c.heroK}</Eyebrow><h1>{c.heroT}</h1><p>{c.heroP}</p></header>
      <div className="function-v3-hero-visual reveal delay-1">
        <div className="function-v3-orbits" aria-hidden="true"><i className="ring ring-1" /><i className="ring ring-2" /><i className="ring ring-3" />{c.heroOrbit.map((label, index) => <span className={`orbit-node node-${index + 1}`} key={label}><b>{index + 1}</b>{label}</span>)}</div>
        <div className="function-v3-browser"><div><span /><span /><span /><b>BarCodeR</b></div><img src={asset("app-previews/screen-home-current.png")} alt={language === "fr" ? "Accueil de BarCodeR" : "BarCodeR home"} /></div>
        <p className="function-v3-hero-caption"><span>↳</span>{c.heroScreen}</p>
      </div>
      <a className="function-v3-scroll-cue" href="#function-v3-journey"><span>{c.scroll}</span><i><b /></i></a>
    </div></section>

    <section className="function-v3-journey" id="function-v3-journey"><div className="page-width">
      <div className="function-v3-journey-intro reveal"><Eyebrow>{c.entriesK}</Eyebrow><h2>{c.entriesT}</h2><p>{c.entriesP}</p></div>
      <div className="function-v3-story-intro reveal"><div><Eyebrow>{c.storyK}</Eyebrow><h3>{c.storyT}</h3></div><p>{c.storyP}</p></div>
      <div className="function-v3-journey-grid">
        <aside className="function-v3-pathmap" aria-label={c.storyK}>
          <div className="function-v3-entry-routes"><button className={activeStep === 0 ? "active openmeta" : "openmeta"} onPointerEnter={() => setActiveStep(0)} onFocus={() => setActiveStep(0)} onClick={() => goToStep(0)}><small>{c.rawLabel}</small><b>{c.fastqT}</b><span>FASTQ → OpenMetaBar</span></button><button className={activeStep === 1 ? "active" : ""} onPointerEnter={() => setActiveStep(1)} onFocus={() => setActiveStep(1)} onClick={() => goToStep(1)}><small>{c.phyloLabel}</small><b>{c.phyloT}</b><span>.rds · .RData → Import</span></button></div>
          <div className="function-v3-convergence"><i /><span>{c.convergence}</span><i /></div><small className="function-v3-common-label">{c.commonPath}</small>
          <ol>{steps.slice(2).map((step, offset) => { const index = offset + 2; return <li className={activeStep === index ? "active" : activeStep > index ? "passed" : ""} key={step.id}><button onPointerEnter={() => setActiveStep(index)} onFocus={() => setActiveStep(index)} onClick={() => goToStep(index)}><span>{step.number}</span><b>{step.title}</b></button></li>; })}</ol>
        </aside>
        <div className="function-v3-chapters">{steps.map((step, index) => <article id={`function-v3-chapter-${step.id}`} className={`function-v3-chapter ${activeStep === index ? "active" : ""}`} data-step={index} data-tone={step.tone} key={step.id} onPointerEnter={() => setActiveStep(index)}>
          <header><span>{step.number}</span><div><small>{step.modules.join(" · ")}</small><h3>{step.title}</h3><p>{step.lead}</p></div></header>
          <div className="function-v3-chapter-body"><div className="function-v3-detail-list">{step.details.map((detail, detailIndex) => <p key={detail}><span>0{detailIndex + 1}</span>{detail}</p>)}</div><figure><figcaption>{c.screenLabel}<b>{step.modules[0]}</b></figcaption><div><img src={asset(step.image)} alt={step.imageAlt} /></div></figure></div>
          <footer><small>{c.outputsLabel}</small>{step.outputs.map(output => <span key={output}>{output}</span>)}</footer>
        </article>)}</div>
      </div>
    </div></section>

    <section className="function-v3-flexibility"><div className="page-width function-v3-flex-grid"><div className="reveal"><Eyebrow>{c.freedomK}</Eyebrow><h2>{c.freedomT}</h2><p>{c.freedomP}</p></div><div className="function-v3-loop reveal delay-1" aria-hidden="true"><span className="loop-core">↺<b>BarCodeR</b></span>{c.loop.map((label, index) => <span className={`loop-node loop-${index + 1}`} key={label}><i>{String(index + 1).padStart(2, "0")}</i>{label}</span>)}<div className="loop-path" /></div></div></section>

    <section className="function-v3-project"><div className="page-width">
      <header className="function-v3-project-intro reveal"><Eyebrow>{c.projectK}</Eyebrow><h2>{c.projectT}</h2><p>{c.projectP}</p></header>
      <div className="function-v3-definitions reveal"><article><small>{c.projectDefK}</small><h3>{c.projectDefT}</h3><p>{c.projectDefP}</p><span>▣</span></article><article><small>{c.datasetDefK}</small><h3>{c.datasetDefT}</h3><p>{c.datasetDefP}</p><span>◇</span></article></div>
      <div className="function-v3-project-map reveal"><div className="project-pulse pulse-1" /><div className="project-pulse pulse-2" /><div className="project-hub"><img src={asset("app-previews/barcoder-logo.png")} alt="" /><b>{c.projectHub}</b><small>{c.projectHubP}</small></div>{c.projectNodes.map(([title, text], index) => <article className={`project-node project-node-${index + 1}`} key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{title}</b><small>{text}</small></div></article>)}</div>
      <div className="function-v3-benefits reveal">{c.projectBenefits.map(([number, title, text]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div></section>

    <section className="function-v3-transfer"><div className="page-width">
      <header className="function-v3-transfer-intro reveal"><Eyebrow>{c.transferK}</Eyebrow><h2>{c.transferT}</h2><p>{c.transferP}</p></header>
      <div className="function-v3-transfer-flow reveal">{c.transferSteps.map(([number, title, text, icon], index) => <article key={title}><header><span>{number}</span><i>{icon}</i></header><h3>{title}</h3><p>{text}</p>{index < c.transferSteps.length - 1 && <b aria-hidden="true">→</b>}</article>)}</div>
      <p className="function-v3-transfer-note"><span>i</span>{c.transferNote}</p>
    </div></section>

    <section className="function-v2-final"><div className="page-width"><div><Eyebrow>{c.finalK}</Eyebrow><h2>{c.finalT}</h2><p>{c.finalP}</p></div><nav><a className="button primary" href="#/analyses">{c.finalAnalysis}<span>→</span></a><a className="button secondary" href="#/tutorials">{c.finalTutorial}<span>→</span></a><a className="button secondary" href="#/download">{c.finalInstall}<span>↓</span></a></nav></div></section>
  </main>;
}
