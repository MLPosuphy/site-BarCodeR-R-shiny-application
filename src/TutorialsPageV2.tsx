import { useState } from "react";
import type { Language, Localized } from "./content";

type TutorialCategory = "install" | "start" | "project" | "tools";
type Tutorial = {
  id: string;
  category: TutorialCategory;
  duration: string;
  title: Localized;
  summary: Localized;
  result: Localized;
  steps: Localized[];
  tabs: Localized[];
};

const tx = (value: Localized, language: Language) => value[language];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

const tutorials: Tutorial[] = [
  {
    id: "install", category: "install", duration: "5 min",
    title: { fr: "Installer et lancer BarCodeR", en: "Install and launch BarCodeR" },
    summary: { fr: "Télécharger le dossier de l’application, lancer l’exécutable puis vérifier que l’interface s’ouvre correctement.", en: "Download the application folder, launch the executable and check that the interface opens correctly." },
    result: { fr: "Une application prête à être utilisée, sans installation de R ou de RStudio.", en: "An application ready to use, without installing R or RStudio." },
    steps: [
      { fr: "Télécharger la version de BarCodeR adaptée au système pris en charge.", en: "Download the BarCodeR version for the supported operating system." },
      { fr: "Décompresser le dossier dans un emplacement accessible en écriture.", en: "Extract the folder to a writable location." },
      { fr: "Double-cliquer sur l’application BarCodeR présente dans le dossier.", en: "Double-click the BarCodeR application inside the folder." },
      { fr: "Attendre l’ouverture de la fenêtre et l’initialisation de l’interface.", en: "Wait for the window to open and the interface to initialise." }
    ],
    tabs: [{ fr: "Installation", en: "Installation" }, { fr: "Premier lancement", en: "First launch" }]
  },
  {
    id: "interface", category: "start", duration: "10 min",
    title: { fr: "Prendre en main l’interface", en: "Get familiar with the interface" },
    summary: { fr: "Identifier le projet actif, le dataset sélectionné, le menu des onglets et les raccourcis disponibles sur l’accueil.", en: "Identify the active project, selected dataset, tab menu and shortcuts available from the home page." },
    result: { fr: "Les principaux repères de navigation sont identifiés avant l’import des données.", en: "The main navigation landmarks are identified before importing data." },
    steps: [
      { fr: "Repérer le projet actif et son état d’enregistrement dans la barre supérieure.", en: "Locate the active project and its saved state in the top bar." },
      { fr: "Parcourir le menu latéral sans lancer d’analyse.", en: "Browse the side menu without starting an analysis." },
      { fr: "Identifier la zone indiquant le dataset actif.", en: "Identify the area showing the active dataset." },
      { fr: "Revenir à l’accueil et utiliser les raccourcis de reprise.", en: "Return to the home page and use the resume shortcuts." }
    ],
    tabs: [{ fr: "Accueil", en: "Home" }, { fr: "Navigation", en: "Navigation" }, { fr: "Paramètres", en: "Settings" }]
  },
  {
    id: "import", category: "start", duration: "12 min",
    title: { fr: "Importer un objet phyloseq", en: "Import a phyloseq object" },
    summary: { fr: "Charger un fichier .rds ou .RData, suivre les contrôles de compatibilité et ajouter l’objet au projet.", en: "Load an .rds or .RData file, follow compatibility checks and add the object to the project." },
    result: { fr: "Un dataset reconnu par BarCodeR et disponible dans le registre du projet.", en: "A dataset recognised by BarCodeR and available in the project registry." },
    steps: [
      { fr: "Ouvrir l’onglet Input data et sélectionner le fichier à importer.", en: "Open the Input data tab and select the file to import." },
      { fr: "Vérifier le nom de l’objet détecté et ses composantes disponibles.", en: "Check the detected object name and available components." },
      { fr: "Lire les contrôles ou corrections automatiques signalés par l’application.", en: "Review checks or automatic corrections reported by the application." },
      { fr: "Nommer le dataset puis confirmer son ajout au projet.", en: "Name the dataset and confirm its addition to the project." }
    ],
    tabs: [{ fr: "Input data", en: "Input data" }, { fr: "Datasets", en: "Datasets" }]
  },
  {
    id: "project", category: "project", duration: "15 min",
    title: { fr: "Créer, sauvegarder et reprendre un projet", en: "Create, save and resume a project" },
    summary: { fr: "Organiser plusieurs datasets dans une session de travail, sauvegarder le projet et le rouvrir ultérieurement.", en: "Organise several datasets in one work session, save the project and reopen it later." },
    result: { fr: "Une archive de projet contenant les datasets et le contexte de travail disponible.", en: "A project archive containing datasets and the available working context." },
    steps: [
      { fr: "Créer un nouveau projet et lui attribuer un nom explicite.", en: "Create a new project and give it a clear name." },
      { fr: "Importer un ou plusieurs objets phyloseq dans le projet.", en: "Import one or more phyloseq objects into the project." },
      { fr: "Changer de dataset actif et vérifier que chacun reste disponible.", en: "Switch the active dataset and check that each one remains available." },
      { fr: "Sauvegarder ou exporter le projet, puis le rouvrir depuis l’archive.", en: "Save or export the project, then reopen it from the archive." }
    ],
    tabs: [{ fr: "Datasets", en: "Datasets" }, { fr: "Projet", en: "Project" }, { fr: "Export", en: "Export" }]
  },
  {
    id: "prepare", category: "tools", duration: "20 min",
    title: { fr: "Modifier et filtrer un dataset", en: "Edit and filter a dataset" },
    summary: { fr: "Créer un nouvel état de données sans écraser l’objet initial, puis le retrouver dans le projet.", en: "Create a new data state without overwriting the original object, then retrieve it in the project." },
    result: { fr: "Une nouvelle version nommée du dataset, conservée à côté de l’état initial.", en: "A named new version of the dataset retained alongside the original state." },
    steps: [
      { fr: "Sélectionner le dataset à modifier dans le registre du projet.", en: "Select the dataset to edit in the project registry." },
      { fr: "Appliquer une modification ciblée dans Data Edition.", en: "Apply a targeted change in Data Edition." },
      { fr: "Prévisualiser un filtre et consulter le bilan avant/après.", en: "Preview a filter and review the before/after summary." },
      { fr: "Enregistrer le résultat sous un nouveau nom et vérifier sa présence dans Datasets.", en: "Save the result under a new name and check its presence in Datasets." }
    ],
    tabs: [{ fr: "Data Edition", en: "Data Edition" }, { fr: "Filtration", en: "Filtering" }, { fr: "Datasets", en: "Datasets" }]
  },
  {
    id: "figures", category: "tools", duration: "18 min",
    title: { fr: "Générer, sauvegarder et organiser une figure", en: "Generate, save and organise a figure" },
    summary: { fr: "Utiliser les paramètres d’un module, sauvegarder une figure puis la retrouver et l’organiser dans MultiView.", en: "Use module settings, save a figure, then retrieve and organise it in MultiView." },
    result: { fr: "Une figure sauvegardée, retrouvable dans le projet et intégrée à une composition MultiView.", en: "A saved figure available in the project and included in a MultiView composition." },
    steps: [
      { fr: "Ouvrir Exploration ou Analyse et sélectionner un dataset actif.", en: "Open Exploration or Analysis and select an active dataset." },
      { fr: "Modifier les paramètres disponibles et observer la mise à jour du résultat.", en: "Change available settings and observe the updated result." },
      { fr: "Sauvegarder la figure avec un nom permettant de la reconnaître.", en: "Save the figure with a recognisable name." },
      { fr: "Ouvrir MultiView, ajouter la figure et modifier sa taille ou sa position.", en: "Open MultiView, add the figure and change its size or position." }
    ],
    tabs: [{ fr: "Exploration", en: "Exploration" }, { fr: "Analyse", en: "Analysis" }, { fr: "MultiView", en: "MultiView" }]
  },
  {
    id: "openmetabar", category: "tools", duration: "20 min",
    title: { fr: "Démarrer avec des fichiers FASTQ", en: "Start from FASTQ files" },
    summary: { fr: "Configurer le passage par OpenMetaBar, lancer le traitement et récupérer l’objet phyloseq produit dans le projet.", en: "Configure the OpenMetaBar route, start processing and retrieve the resulting phyloseq object in the project." },
    result: { fr: "Un objet phyloseq structuré, produit à partir des séquences brutes et récupéré dans BarCodeR.", en: "A structured phyloseq object produced from raw sequences and retrieved in BarCodeR." },
    steps: [
      { fr: "Ouvrir OpenMetaBar et renseigner les fichiers et informations demandés.", en: "Open OpenMetaBar and provide the requested files and information." },
      { fr: "Vérifier les paramètres de traitement et la connexion à l’infrastructure configurée.", en: "Check processing settings and the connection to the configured infrastructure." },
      { fr: "Lancer le traitement et suivre son état depuis l’interface.", en: "Start processing and monitor its status from the interface." },
      { fr: "Récupérer l’objet phyloseq produit et l’ajouter au projet actif.", en: "Retrieve the resulting phyloseq object and add it to the active project." }
    ],
    tabs: [{ fr: "OpenMetaBar", en: "OpenMetaBar" }, { fr: "Datasets", en: "Datasets" }]
  }
];

const datasets = [
  { name: "GlobalPatterns", marker: "16S", pkg: "phyloseq", description: { fr: "Jeu de données environnemental varié, adapté à une première prise en main complète de l’interface.", en: "A varied environmental dataset suited to a first complete tour of the interface." }, file: "GlobalPatterns.RData", source: "https://github.com/joey711/phyloseq/blob/master/data/GlobalPatterns.RData", raw: "https://raw.githubusercontent.com/joey711/phyloseq/master/data/GlobalPatterns.RData" },
  { name: "enterotype", marker: "16S", pkg: "phyloseq", description: { fr: "Objet issu de données du microbiome intestinal humain, utile pour tester l’import et les comparaisons par groupes.", en: "An object based on human gut microbiome data, useful for testing import and group comparisons." }, file: "enterotype.RData", source: "https://github.com/joey711/phyloseq/blob/master/data/enterotype.RData", raw: "https://raw.githubusercontent.com/joey711/phyloseq/master/data/enterotype.RData" },
  { name: "soilrep", marker: "16S", pkg: "phyloseq", description: { fr: "Objet consacré à la reproductibilité de données de microbiome du sol.", en: "An object focused on reproducibility in soil microbiome data." }, file: "soilrep.RData", source: "https://github.com/joey711/phyloseq/blob/master/data/soilrep.RData", raw: "https://raw.githubusercontent.com/joey711/phyloseq/master/data/soilrep.RData" },
  { name: "esophagus", marker: "16S", pkg: "phyloseq", description: { fr: "Petit objet phyloseq, pratique pour vérifier rapidement l’import et la navigation.", en: "A small phyloseq object convenient for quickly checking import and navigation." }, file: "esophagus.RData", source: "https://github.com/joey711/phyloseq/blob/master/data/esophagus.RData", raw: "https://raw.githubusercontent.com/joey711/phyloseq/master/data/esophagus.RData" },
  { name: "dietswap", marker: "16S", pkg: "microbiome", description: { fr: "Cohorte de microbiome intestinal associée à une intervention alimentaire, utile pour tester groupes, métadonnées et diversité.", en: "A gut microbiome cohort linked to a dietary intervention, useful for testing groups, metadata and diversity." }, file: "dietswap.rda", source: "https://github.com/microbiome/microbiome/blob/master/data/dietswap.rda", raw: "https://raw.githubusercontent.com/microbiome/microbiome/master/data/dietswap.rda" },
  { name: "atlas1006", marker: "16S", pkg: "microbiome", description: { fr: "Large atlas du microbiome intestinal humain pour éprouver la navigation et les analyses sur un objet plus fourni.", en: "A large human gut microbiome atlas for testing navigation and analyses on a richer object." }, file: "atlas1006.rda", source: "https://github.com/microbiome/microbiome/blob/master/data/atlas1006.rda", raw: "https://raw.githubusercontent.com/microbiome/microbiome/master/data/atlas1006.rda" }
];

export default function TutorialsPageV2({ language }: { language: Language }) {
  const [filter, setFilter] = useState<"all" | TutorialCategory>("all");
  const filtered = tutorials.filter(item => filter === "all" || item.category === filter);
  const c = language === "fr" ? {
    k: "Tutoriels BarCodeR", title: "Installer, découvrir et utiliser l’outil pas à pas.", p: "Des parcours courts centrés exclusivement sur la prise en main de BarCodeR : installation, navigation, import, projets, préparation des données, sauvegarde des figures et utilisation de MultiView.",
    path: [["01", "Installer"], ["02", "Ouvrir"], ["03", "Importer"], ["04", "Travailler"], ["05", "Sauvegarder"]],
    libraryK: "Parcours guidés", libraryT: "Un tutoriel pour chaque action essentielle dans BarCodeR.",
    filters: [["all", "Tous"], ["install", "Installation"], ["start", "Prise en main"], ["project", "Projets"], ["tools", "Outils"]],
    result: "Résultat attendu", steps: "Afficher les étapes", tabs: "Parcours dans BarCodeR", available: "Tutoriel disponible", next: "Tutoriel suivant",
    dataK: "Objets phyloseq publics", dataT: "Télécharger davantage de jeux de données prêts à importer.", dataP: "La sélection réunit les objets de démonstration du package phyloseq et deux objets publics supplémentaires du package microbiome. Ils permettent de tester BarCodeR sans utiliser de données personnelles.",
    download: "Télécharger l’objet", source: "Voir la source officielle", format: "Fichier", package: "Package"
  } : {
    k: "BarCodeR tutorials", title: "Install, discover and use the tool step by step.", p: "Short journeys focused exclusively on getting started with BarCodeR: installation, navigation, import, projects, data preparation, figure saving and MultiView.",
    path: [["01", "Install"], ["02", "Open"], ["03", "Import"], ["04", "Work"], ["05", "Save"]],
    libraryK: "Guided journeys", libraryT: "One tutorial for every essential action in BarCodeR.",
    filters: [["all", "All"], ["install", "Installation"], ["start", "Getting started"], ["project", "Projects"], ["tools", "Tools"]],
    result: "Expected result", steps: "Show steps", tabs: "Journey through BarCodeR", available: "Tutorial available", next: "Next tutorial",
    dataK: "Public phyloseq objects", dataT: "Download more datasets ready to import.", dataP: "This selection combines demonstration objects from phyloseq with two additional public objects from the microbiome package. They let you test BarCodeR without using personal data.",
    download: "Download object", source: "View official source", format: "File", package: "Package"
  };

  const openTutorial = (id: string) => {
    setFilter("all");
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => document.getElementById(`tutorial-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" })));
  };

  return <main className="tutorial-v3-page">
    <section className="tutorial-v3-hero"><div className="page-width"><header><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p>{c.p}</p></header><div className="tutorial-v3-path">{c.path.map(([number, label], index) => <article key={number}><span>{number}</span><b>{label}</b>{index < c.path.length - 1 && <i><em /></i>}</article>)}</div></div></section>

    <section className="tutorial-v3-library"><div className="page-width"><div className="tutorial-v3-heading"><Eyebrow>{c.libraryK}</Eyebrow><h2>{c.libraryT}</h2></div><div className="tutorial-v3-filters">{c.filters.map(([value, label]) => <button type="button" className={filter === value ? "active" : ""} onClick={() => setFilter(value as "all" | TutorialCategory)} key={value}>{label}</button>)}</div><div className="tutorial-v3-grid">{filtered.map(tutorial => { const absoluteIndex = tutorials.findIndex(item => item.id === tutorial.id); const nextTutorial = tutorials[(absoluteIndex + 1) % tutorials.length]; return <article className="tutorial-v3-card" id={`tutorial-${tutorial.id}`} key={tutorial.id}><header><span>{String(absoluteIndex + 1).padStart(2, "0")}</span><small>{c.available} · {tutorial.duration}</small></header><h3>{tx(tutorial.title, language)}</h3><p>{tx(tutorial.summary, language)}</p><div className="tutorial-v3-result"><b>✓ {c.result}</b><span>{tx(tutorial.result, language)}</span></div><details><summary>{c.steps}<span>+</span></summary><ol>{tutorial.steps.map(step => <li key={step.fr}>{tx(step, language)}</li>)}</ol></details><div className="tutorial-v3-tabs"><small>{c.tabs}</small><div>{tutorial.tabs.map((tab, tabIndex) => <span key={tab.fr}>{tx(tab, language)}{tabIndex < tutorial.tabs.length - 1 && <i>→</i>}</span>)}</div></div><button className="tutorial-v3-next" type="button" onClick={() => openTutorial(nextTutorial.id)}><small>{c.next}</small><b>{tx(nextTutorial.title, language)}</b><span>→</span></button></article>; })}</div></div></section>

    <section className="tutorial-v3-datasets"><div className="page-width"><div className="tutorial-v3-dataset-heading"><Eyebrow>{c.dataK}</Eyebrow><h2>{c.dataT}</h2><p>{c.dataP}</p></div><div className="tutorial-v3-dataset-grid">{datasets.map((dataset, index) => <article className="reveal" key={dataset.name}><header><span>{String(index + 1).padStart(2, "0")}</span><b>{dataset.marker}</b></header><h3>{dataset.name}</h3><p>{tx(dataset.description, language)}</p><dl><div><dt>{c.format}</dt><dd>{dataset.file}</dd></div><div><dt>{c.package}</dt><dd>{dataset.pkg}</dd></div></dl><a className="primary" href={dataset.raw} target="_blank" rel="noreferrer">{c.download}<span>↓</span></a><a className="source" href={dataset.source} target="_blank" rel="noreferrer">{c.source}<span>↗</span></a></article>)}</div></div></section>
  </main>;
}
