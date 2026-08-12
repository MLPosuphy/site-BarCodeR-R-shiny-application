import { useEffect, useState } from "react";
import type { Language } from "./content";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

type JourneyStep = {
  id: string;
  number: string;
  title: string;
  text: string;
  modules: string[];
  outputs: string[];
  image: string;
  imageAlt: string;
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

export default function FunctioningPageV2({ language }: { language: Language }) {
  const [activeStep, setActiveStep] = useState(0);

  const c = language === "fr" ? {
    heroK: "Fonctionnement de BarCodeR",
    heroT: <>De vos données à vos résultats,<br /><em>dans un même parcours.</em></>,
    heroP: "Importez un objet phyloseq ou produisez-le à partir de fichiers FASTQ avec OpenMetaBar, puis contrôlez, préparez, explorez et analysez vos données dans BarCodeR.",
    heroPrimary: "Découvrir le parcours",
    heroSecondary: "Voir les analyses",
    heroScreen: "Un espace de travail qui conserve vos données, vos résultats et le contexte nécessaire pour reprendre l’analyse.",
    entriesK: "Deux façons de commencer",
    entriesT: "Deux points d’entrée, puis un seul environnement de travail.",
    entriesP: "La préparation en amont dépend du format dont vous disposez. Dès qu’un objet phyloseq est présent, les mêmes outils BarCodeR deviennent disponibles.",
    fastqK: "Séquences brutes",
    fastqT: "Je pars de fichiers FASTQ",
    fastqP: "OpenMetaBar prépare et suit le traitement bioinformatique sur l’infrastructure configurée, puis restitue un objet phyloseq utilisable dans BarCodeR.",
    fastqAction: "Comprendre OpenMetaBar",
    phyloseqK: "Données structurées",
    phyloseqT: "Je possède déjà un objet phyloseq",
    phyloseqP: "Importez directement un objet complet ou partiel enregistré dans un fichier R, puis contrôlez les composantes réellement disponibles.",
    phyloseqAction: "Voir l’import",
    common: "Objet phyloseq disponible",
    commonP: "Le parcours BarCodeR commence ici.",
    storyK: "Le parcours dans l’application",
    storyT: "Avancez étape par étape, sans être enfermé dans un assistant rigide.",
    storyP: "Les modules restent accessibles librement. Ce parcours montre l’ordre le plus naturel pour comprendre les données avant de les préparer, puis de les analyser.",
    modulesLabel: "Modules concernés",
    outputsLabel: "Ce que vous obtenez",
    screenLabel: "Dans l’interface",
    freedomK: "Un parcours qui reste flexible",
    freedomT: "Revenez à l’étape utile au moment où votre question évolue.",
    freedomP: "BarCodeR ne vous impose pas de suivre tous les modules. Vous pouvez décrire un dataset, ajuster sa préparation, relancer une analyse ou recomposer des figures selon les besoins de l’étude.",
    projectK: "Travailler sous forme de projet",
    projectT: "Conserver plusieurs états des données sans perdre l’origine des résultats.",
    projectP: "Un projet regroupe les datasets et les historiques associés. Selon l’action et le nom choisi lors de l’enregistrement, vous pouvez mettre à jour un dataset ou conserver un nouvel état sous un autre nom.",
    tree: [
      ["Objet importé", "Point de départ conservé"],
      ["Dataset corrigé", "Structure ou informations ajustées"],
      ["Version filtrée A", "Préparation pour une première question"],
      ["Version filtrée B", "Préparation pour une autre question"],
      ["Résultats", "Figures, tableaux et code R"]
    ],
    shareT: "Reprendre ou transmettre le travail",
    shareP: "Sauvegardez le projet, exportez une archive portable et transmettez-la à un autre membre de l’équipe pour qu’il puisse retrouver les datasets et les éléments conservés dans le projet.",
    shareSteps: ["Sauvegarder", "Exporter en .zip", "Transmettre", "Importer", "Reprendre"],
    finalK: "Prochaine étape",
    finalT: "Le parcours est clair. Découvrez maintenant ce que vous pouvez analyser.",
    finalP: "Partez d’une question biologique, explorez les résultats disponibles et ouvrez la documentation uniquement lorsque vous avez besoin du détail méthodologique.",
    finalAnalysis: "Explorer les analyses",
    finalTutorial: "Suivre un tutoriel",
    finalInstall: "Installer BarCodeR"
  } : {
    heroK: "How BarCodeR works",
    heroT: <>From your data to your results,<br /><em>in one continuous journey.</em></>,
    heroP: "Import a phyloseq object or produce one from FASTQ files with OpenMetaBar, then check, prepare, explore and analyse your data in BarCodeR.",
    heroPrimary: "Discover the journey",
    heroSecondary: "View analyses",
    heroScreen: "A workspace that retains your data, results and the context needed to resume the analysis.",
    entriesK: "Two ways to start",
    entriesT: "Two entry points, then one working environment.",
    entriesP: "Upstream preparation depends on your available format. As soon as a phyloseq object is present, the same BarCodeR tools become available.",
    fastqK: "Raw sequences",
    fastqT: "I start with FASTQ files",
    fastqP: "OpenMetaBar prepares and monitors bioinformatics processing on the configured infrastructure, then returns a phyloseq object ready for BarCodeR.",
    fastqAction: "Understand OpenMetaBar",
    phyloseqK: "Structured data",
    phyloseqT: "I already have a phyloseq object",
    phyloseqP: "Directly import a complete or partial object stored in an R file, then check which components are actually available.",
    phyloseqAction: "View import",
    common: "Phyloseq object available",
    commonP: "The BarCodeR journey starts here.",
    storyK: "The application journey",
    storyT: "Move step by step without being locked into a rigid wizard.",
    storyP: "Modules remain freely accessible. This journey shows the most natural order for understanding data before preparing and analysing them.",
    modulesLabel: "Related modules",
    outputsLabel: "What you obtain",
    screenLabel: "In the interface",
    freedomK: "A flexible journey",
    freedomT: "Return to the useful step whenever your question evolves.",
    freedomP: "BarCodeR does not force you through every module. Describe a dataset, adjust its preparation, rerun an analysis or recompose figures according to the study needs.",
    projectK: "Project-based work",
    projectT: "Keep several data states without losing the origin of results.",
    projectP: "A project groups datasets and associated histories. Depending on the action and the name chosen when saving, you can update a dataset or preserve a new state under another name.",
    tree: [
      ["Imported object", "Preserved starting point"],
      ["Corrected dataset", "Adjusted structure or information"],
      ["Filtered version A", "Preparation for a first question"],
      ["Filtered version B", "Preparation for another question"],
      ["Results", "Figures, tables and R code"]
    ],
    shareT: "Resume or transfer the work",
    shareP: "Save the project, export a portable archive and share it with another team member so they can recover the datasets and retained project elements.",
    shareSteps: ["Save", "Export .zip", "Share", "Import", "Resume"],
    finalK: "Next step",
    finalT: "The journey is clear. Now discover what you can analyse.",
    finalP: "Start from a biological question, explore available outputs and open the documentation only when you need methodological detail.",
    finalAnalysis: "Explore analyses",
    finalTutorial: "Follow a tutorial",
    finalInstall: "Install BarCodeR"
  };

  const steps: JourneyStep[] = language === "fr" ? [
    { id: "import", number: "01", title: "Importer et organiser", text: "Ajoutez vos données, choisissez le dataset actif et organisez les différents objets utilisés au cours du travail.", modules: ["Input data", "Datasets"], outputs: ["Dataset actif identifié", "Contrôles d’import", "Projet organisé"], image: "app-previews/screen-datasets-current.png", imageAlt: "Gestion des datasets dans BarCodeR" },
    { id: "describe", number: "02", title: "Comprendre les données", text: "Examinez la structure du dataset, la profondeur de séquençage, la richesse, la taxonomie, les métadonnées et les éventuels points d’attention.", modules: ["Description"], outputs: ["Vue d’ensemble", "Diagnostics descriptifs", "Points à examiner"], image: "app-previews/screen-description-current.png", imageAlt: "Description d’un dataset dans BarCodeR" },
    { id: "prepare", number: "03", title: "Corriger et préparer", text: "Corrigez ou enrichissez une composante lorsque nécessaire, puis sélectionnez les taxons, échantillons ou séquences adaptés à la question étudiée.", modules: ["Data Edition", "Filtration"], outputs: ["Dataset ajusté", "Aperçu avant/après", "Journal des opérations"], image: "app-previews/screen-filtration-current.png", imageAlt: "Filtration interactive dans BarCodeR" },
    { id: "analyse", number: "04", title: "Explorer et analyser", text: "Produisez des visualisations descriptives, comparez les groupes, testez des hypothèses et examinez les diagnostics utiles à l’interprétation.", modules: ["Exploration", "Analyse"], outputs: ["Figures interactives", "Résultats statistiques", "Diagnostics"], image: "app-previews/screen-analyse-current.png", imageAlt: "Analyses statistiques dans BarCodeR" },
    { id: "compose", number: "05", title: "Comparer et composer", text: "Retrouvez les figures sauvegardées, comparez-les dans un même espace et organisez-les pour construire une restitution cohérente.", modules: ["MultiView"], outputs: ["Comparaison visuelle", "Composition de figures", "Panneau exportable"], image: "app-previews/screen-multiview-current.png", imageAlt: "Composition de figures dans MultiView" },
    { id: "export", number: "06", title: "Sauvegarder et poursuivre", text: "Conservez le contexte disponible, exportez les résultats et récupérez le code R associé aux figures lorsque le module le propose.", modules: ["Datasets", "Historiques", "Exports"], outputs: ["Figures et tableaux", "Code R", "Archive de projet"], image: "app-previews/screen-home-current.png", imageAlt: "Accueil d’un projet BarCodeR" }
  ] : [
    { id: "import", number: "01", title: "Import and organise", text: "Add your data, choose the active dataset and organise the objects used throughout the work.", modules: ["Input data", "Datasets"], outputs: ["Identified active dataset", "Import checks", "Organised project"], image: "app-previews/screen-datasets-current.png", imageAlt: "Dataset management in BarCodeR" },
    { id: "describe", number: "02", title: "Understand the data", text: "Review dataset structure, sequencing depth, richness, taxonomy, metadata and points that may deserve attention.", modules: ["Description"], outputs: ["Overview", "Descriptive diagnostics", "Points to review"], image: "app-previews/screen-description-current.png", imageAlt: "Dataset description in BarCodeR" },
    { id: "prepare", number: "03", title: "Correct and prepare", text: "Correct or enrich a component when needed, then select taxa, samples or sequences suited to the question being studied.", modules: ["Data Edition", "Filtering"], outputs: ["Adjusted dataset", "Before/after preview", "Operation log"], image: "app-previews/screen-filtration-current.png", imageAlt: "Interactive filtering in BarCodeR" },
    { id: "analyse", number: "04", title: "Explore and analyse", text: "Produce descriptive visualisations, compare groups, test hypotheses and review diagnostics that support interpretation.", modules: ["Exploration", "Analysis"], outputs: ["Interactive figures", "Statistical results", "Diagnostics"], image: "app-previews/screen-analyse-current.png", imageAlt: "Statistical analyses in BarCodeR" },
    { id: "compose", number: "05", title: "Compare and compose", text: "Retrieve saved figures, compare them in one space and arrange them into a coherent report.", modules: ["MultiView"], outputs: ["Visual comparison", "Figure composition", "Exportable panel"], image: "app-previews/screen-multiview-current.png", imageAlt: "Figure composition in MultiView" },
    { id: "export", number: "06", title: "Save and continue", text: "Retain available context, export results and recover the R code associated with figures whenever the module provides it.", modules: ["Datasets", "Histories", "Exports"], outputs: ["Figures and tables", "R code", "Project archive"], image: "app-previews/screen-home-current.png", imageAlt: "BarCodeR project home" }
  ];

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".function-v2-step"));
    if (!nodes.length) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveStep(Number((visible.target as HTMLElement).dataset.step || 0));
    }, { threshold: [0.25, 0.5, 0.75], rootMargin: "-22% 0px -42%" });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [language]);

  const current = steps[activeStep] || steps[0];

  return <main className="function-v2-page">
    <section className="function-v2-hero">
      <div className="page-width function-v2-hero-grid">
        <div className="function-v2-hero-copy reveal">
          <Eyebrow>{c.heroK}</Eyebrow><h1>{c.heroT}</h1><p className="lead">{c.heroP}</p>
          <div className="hero-actions"><a className="button primary" href="#function-v2-story">{c.heroPrimary}<span>↓</span></a><a className="button secondary" href="#/analyses">{c.heroSecondary}<span>→</span></a></div>
        </div>
        <div className="function-v2-hero-screen reveal delay-1">
          <div className="function-v2-screen-orbit" aria-hidden="true"><i /><i /><i /></div>
          <div className="function-v2-browser"><div><span /><span /><span /><b>BarCodeR</b></div><img src={asset("app-previews/screen-home-current.png")} alt={language === "fr" ? "Accueil de BarCodeR" : "BarCodeR home"} /></div>
          <p><span>↳</span>{c.heroScreen}</p>
          <a href="#function-v2-entries" aria-label={c.heroPrimary}><i>↓</i></a>
        </div>
      </div>
    </section>

    <section className="section page-width function-v2-entries" id="function-v2-entries">
      <div className="section-heading reveal"><div><Eyebrow>{c.entriesK}</Eyebrow><h2>{c.entriesT}</h2></div><p>{c.entriesP}</p></div>
      <div className="function-v2-entry-map reveal">
        <article className="function-v2-entry function-v2-entry-openmeta"><header><img src={asset("app-previews/openmetabar-logo.png")} alt="" /><div><small>{c.fastqK}</small><h3>{c.fastqT}</h3></div></header><p>{c.fastqP}</p><div><span>FASTQ</span><i>↓</i><span>OpenMetaBar</span><i>↓</i><span>phyloseq</span></div><a href="#/application/openmetabar">{c.fastqAction}<span>→</span></a></article>
        <div className="function-v2-entry-merge" aria-hidden="true"><span /><span /><i>↓</i></div>
        <article className="function-v2-entry function-v2-entry-barcoder"><header><img src={asset("app-previews/barcoder-logo.png")} alt="" /><div><small>{c.phyloseqK}</small><h3>{c.phyloseqT}</h3></div></header><p>{c.phyloseqP}</p><div><span>.rds</span><span>.RData</span><i>↓</i><span>Import</span></div><a href="#/application/input-data">{c.phyloseqAction}<span>→</span></a></article>
        <div className="function-v2-common"><img src={asset("app-previews/barcoder-logo.png")} alt="" /><div><small>{c.common}</small><b>{c.commonP}</b></div><span>↓</span></div>
      </div>
    </section>

    <section className="function-v2-story" id="function-v2-story">
      <div className="page-width">
        <div className="section-heading reveal"><div><Eyebrow>{c.storyK}</Eyebrow><h2>{c.storyT}</h2></div><p>{c.storyP}</p></div>
        <div className="function-v2-story-grid">
          <div className="function-v2-step-list">
            {steps.map((step, index) => <article className={`function-v2-step ${activeStep === index ? "active" : ""}`} data-step={index} key={step.id} onPointerEnter={() => setActiveStep(index)} onFocus={() => setActiveStep(index)} tabIndex={0}>
              <span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p><small>{c.modulesLabel}</small><div>{step.modules.map(module => <b key={module}>{module}</b>)}</div></div><i>↓</i>
            </article>)}
          </div>
          <aside className="function-v2-stage" aria-live="polite">
            <div className="function-v2-stage-head"><span>{c.screenLabel}</span><b>{current.number} / 06</b></div>
            <div className="function-v2-stage-screen" key={current.id}><img src={asset(current.image)} alt={current.imageAlt} /><span>{current.title}</span></div>
            <div className="function-v2-stage-output"><small>{c.outputsLabel}</small><div>{current.outputs.map(output => <span key={output}>{output}</span>)}</div></div>
          </aside>
        </div>
        <aside className="function-v2-freedom reveal"><span>↺</span><div><Eyebrow>{c.freedomK}</Eyebrow><h3>{c.freedomT}</h3><p>{c.freedomP}</p></div></aside>
      </div>
    </section>

    <section className="section page-width function-v2-project">
      <div className="function-v2-project-copy reveal"><Eyebrow>{c.projectK}</Eyebrow><h2>{c.projectT}</h2><p>{c.projectP}</p></div>
      <div className="function-v2-project-grid">
        <div className="function-v2-lineage reveal">
          {c.tree.map(([title, text], index) => <article className={`node-${index + 1}`} key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{title}</b><small>{text}</small></div></article>)}
          <i className="line-one" /><i className="line-two" /><i className="line-three" /><i className="line-four" />
        </div>
        <article className="function-v2-share reveal"><span className="function-v2-share-icon">⇄</span><h3>{c.shareT}</h3><p>{c.shareP}</p><div>{c.shareSteps.map((step, index) => <span key={step}><b>{String(index + 1).padStart(2, "0")}</b>{step}{index < c.shareSteps.length - 1 && <i>→</i>}</span>)}</div></article>
      </div>
    </section>

    <section className="function-v2-final"><div className="page-width"><div><Eyebrow>{c.finalK}</Eyebrow><h2>{c.finalT}</h2><p>{c.finalP}</p></div><nav><a className="button primary" href="#/analyses">{c.finalAnalysis}<span>→</span></a><a className="button secondary" href="#/tutorials">{c.finalTutorial}<span>→</span></a><a className="button secondary" href="#/download">{c.finalInstall}<span>↓</span></a></nav></div></section>
  </main>;
}
