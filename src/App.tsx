import { Fragment, useEffect, useMemo, useState } from "react";
import { groups, moduleScreens, modules, type AppModule, type Language, type Localized } from "./content";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const tx = (value: Localized, language: Language) => value[language];
const moduleHref = (key: string) => `#/application/${key}`;

// Main BarCodeR application screenshot displayed on the overview page.
// Replacing this file in `public/app-previews/` updates the visual without
// changing the page component.
const HOME_SCREENSHOT_PATH: string | null = null;

const groupOrder: AppModule["group"][] = ["orient", "input", "prepare", "analyse", "report"];

function useHashRoute() {
  const current = () => window.location.hash.replace(/^#/, "") || "/";
  const [route, setRoute] = useState(current);

  useEffect(() => {
    const update = () => setRoute(current());
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [route]);

  return route;
}

function Brand({ language }: { language: Language }) {
  return (
    <a className="brand" href="#/" aria-label={language === "fr" ? "BarCodeR — accueil du site" : "BarCodeR — website home"}>
      <span className="brand-mark" style={{ backgroundImage: `url(${asset("app-previews/barcoder-logo.png")})` }} aria-hidden="true" />
      <span className="brand-wordmark"><strong>BarCodeR</strong></span>
    </a>
  );
}

function Header({ language, setLanguage, route }: { language: Language; setLanguage: (language: Language) => void; route: string }) {
  const [open, setOpen] = useState(false);
  const c = language === "fr" ? {
    home: "Accueil", functioning: "Fonctionnement", analyses: "Analyses", tutorials: "Tutoriels", documentation: "Documentation", download: "Installer"
  } : {
    home: "Home", functioning: "How it works", analyses: "Analyses", tutorials: "Tutorials", documentation: "Documentation", download: "Install"
  };

  useEffect(() => setOpen(false), [route]);

  return (
    <header className="site-header">
      <Brand language={language} />
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={language === "fr" ? "Ouvrir le menu" : "Open menu"}>
        <span /><span />
      </button>
      <nav className={open ? "primary-nav open" : "primary-nav"} aria-label={language === "fr" ? "Navigation principale" : "Main navigation"}>
        <a className={route === "/" ? "active" : ""} href="#/">{c.home}</a>
        <a className={route === "/functioning" || route.startsWith("/application") ? "active" : ""} href="#/functioning">{c.functioning}</a>
        <a className={route === "/analyses" || route === "/showcase" ? "active" : ""} href="#/analyses">{c.analyses}</a>
        <a className={route === "/tutorials" || route === "/evidence" ? "active" : ""} href="#/tutorials">{c.tutorials}</a>
        <a className={route === "/documentation" ? "active" : ""} href="#/documentation">{c.documentation}</a>
        <a className={`nav-install ${route === "/download" || route === "/availability" ? "active" : ""}`} href="#/download">{c.download}</a>
        <div className="language-switch" aria-label={language === "fr" ? "Langue" : "Language"}>
          <button className={language === "fr" ? "active" : ""} onClick={() => { setLanguage("fr"); setOpen(false); }}>FR</button>
          <button className={language === "en" ? "active" : ""} onClick={() => { setLanguage("en"); setOpen(false); }}>EN</button>
        </div>
      </nav>
    </header>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

function AppPreview({ language }: { language: Language }) {
  const names = language === "fr" ? ["Données", "Description", "Édition", "Filtration", "Exploration", "Analyse"] : ["Input", "Description", "Edition", "Filtering", "Exploration", "Analysis"];
  return (
    <div className="app-preview" role="img" aria-label={language === "fr" ? "Schéma du tableau de bord BarCodeR avec projet, dataset actif et parcours analytique" : "Diagram of the BarCodeR dashboard with project, active dataset and analytical workflow"}>
      <div className="preview-titlebar"><span /><span /><span /><b>BarCodeR · GlobalPatterns</b><em>FR</em></div>
      <div className="preview-body">
        <div className="preview-rail"><strong>B|R</strong>{["⌂", "?", "⇢", "↓", "▦", "◎", "✎", "≋", "◉", "∴", "▤"].map((x, i) => <span className={i === 0 ? "active" : ""} key={`${x}-${i}`}>{x}</span>)}</div>
        <div className="preview-main">
          <div className="preview-project"><span>{language === "fr" ? "PROJET ACTIF" : "ACTIVE PROJECT"}</span><b>Public demo · GlobalPatterns</b><i>● {language === "fr" ? "enregistré" : "saved"}</i></div>
          <div className="preview-dataset">
            <div><small>{language === "fr" ? "DATASET ACTIF" : "ACTIVE DATASET"}</small><strong>GlobalPatterns</strong><p>phyloseq · public dataset</p></div>
            <div className="preview-kpis"><span><b>26</b><small>{language === "fr" ? "échantillons" : "samples"}</small></span><span><b>19 216</b><small>taxa</small></span><span><b>9</b><small>{language === "fr" ? "milieux" : "environments"}</small></span></div>
          </div>
          <div className="preview-section-title"><b>{language === "fr" ? "Parcours d’analyse" : "Analysis journey"}</b><span>4 / 6</span></div>
          <div className="preview-journey">{names.map((name, index) => <div className={index < 4 ? "done" : ""} key={name}><span>{index < 4 ? "✓" : index + 1}</span><b>{name}</b></div>)}</div>
          <div className="preview-recent"><div><small>{language === "fr" ? "FIGURES RÉCENTES" : "RECENT FIGURES"}</small><b>{language === "fr" ? "Reprendre là où vous étiez" : "Resume where you left off"}</b></div><img src={asset("app-previews/ordinations.png")} alt="" /><img src={asset("app-previews/alpha_diversite.png")} alt="" /></div>
        </div>
      </div>
    </div>
  );
}

function HomeApplicationVisual({ language }: { language: Language }) {
  if (!HOME_SCREENSHOT_PATH) return <AppPreview language={language} />;

  return (
    <div className="home-screenshot-frame">
      <img
        src={asset(HOME_SCREENSHOT_PATH)}
        alt={language === "fr" ? "Page d’accueil réelle de l’application BarCodeR" : "Real BarCodeR application home page"}
      />
    </div>
  );
}

function Landing({ language }: { language: Language }) {
  const c = language === "fr" ? {
    badge: "Analyse interactive du métabarcoding",
    title: <>Analysez vos données de métabarcoding,<br /><em>sans perdre la maîtrise de vos méthodes.</em></>,
    intro: "BarCodeR centralise la préparation des données, leur exploration, les analyses statistiques guidées et la comparaison des résultats dans une même application. Importez directement un objet phyloseq complet ou partiel, ou partez de fichiers FASTQ via le module OpenMetaBar.",
    workflowAction: "Découvrir le parcours",
    analysesAction: "Voir les questions scientifiques",
    downloadAction: "Installer BarCodeR",
    version: "Version présentée : BarCodeR v2.12.8",
    metrics: [
      ["PS", "phyloseq", "Import direct d’un objet complet ou partiel"],
      ["FQ", "FASTQ", "Traitement en amont via OpenMetaBar"],
      ["R", "code exportable", "Reproduire ou prolonger une analyse hors de l’interface"],
      ["LOCAL", "données sous contrôle", "Les analyses s’exécutent sur votre installation"]
    ],
    journeysK: "Commencer avec vos données",
    journeysT: "Deux points d’entrée, puis un même environnement d’analyse.",
    journeysP: "BarCodeR s’adapte à l’étape où se trouve votre projet. Si votre objet phyloseq existe déjà, vous l’importez directement. Si vous partez de FASTQ, le module OpenMetaBar permet de lancer le traitement sur une infrastructure HPC puis de récupérer l’objet phyloseq dans le projet.",
    phyloseqTitle: "J’ai déjà un objet phyloseq",
    phyloseqTag: "Import direct",
    phyloseqText: "Chargez un objet phyloseq complet ou partiel au format R, vérifiez ce qu’il contient puis poursuivez avec les modules de description, d’édition, de filtration et d’analyse.",
    phyloseqSteps: ["Projet", "Import", "Description", "Analyses", "Export"],
    phyloseqAction: "Voir l’import des données",
    componentsTitle: "Je pars de fichiers FASTQ",
    componentsTag: "Module optionnel",
    componentsText: "Configurez et suivez un traitement OpenMetaBar depuis BarCodeR, sur une infrastructure distante compatible, puis récupérez le phyloseq produit pour poursuivre l’analyse dans la même application.",
    componentsSteps: ["Projet", "FASTQ", "OpenMetaBar", "phyloseq", "Analyses"],
    componentsAction: "Découvrir l’onglet OpenMetaBar",
    questionsK: "Partir de la question scientifique",
    questionsT: "Cherchez d’abord ce que vous voulez comprendre.",
    questionsP: "Le site présente les possibilités de BarCodeR par question scientifique. Les choix techniques, les paramètres et les détails méthodologiques restent documentés dans la documentation dédiée.",
    questions: [
      ["Composition", "Quels taxons dominent ou structurent mes communautés ?", "Explorer leur abondance et leur répartition selon les groupes étudiés."],
      ["Diversité", "La diversité diffère-t-elle entre mes échantillons ou mes groupes ?", "Comparer la richesse et plusieurs dimensions de la diversité."],
      ["Structure", "Comment mes échantillons s’organisent-ils les uns par rapport aux autres ?", "Visualiser les grands gradients et les ressemblances entre communautés."],
      ["Effet", "Une variable est-elle associée à la structure des communautés ?", "Tester une hypothèse multivariée avec les contrôles associés."],
      ["Taxons", "Quels taxons sont associés à une condition ?", "Comparer plusieurs approches d’analyse différentielle dans un même cadre."],
      ["Comparaison", "Plusieurs datasets ou marqueurs racontent-ils une histoire cohérente ?", "Mettre en regard plusieurs représentations d’un même système biologique."]
    ],
    questionsAction: "Explorer toutes les questions",
    strengthsK: "Pourquoi utiliser BarCodeR",
    strengthsT: "Rendre les analyses plus accessibles sans les transformer en boîte noire.",
    strengths: [
      ["01", "Une interface réellement interactive", "Explorez les données, modifiez les paramètres et examinez les résultats directement dans l’application avant de les exporter."],
      ["02", "Un parcours guidé mais transparent", "BarCodeR signale les prérequis, incompatibilités et points de vigilance lorsqu’ils sont pertinents, tout en laissant les choix analytiques à l’utilisateur."],
      ["03", "Des datasets adaptés à chaque question", "L’édition et la filtration permettent de préparer différentes versions d’un projet sans perdre le contexte des transformations effectuées."],
      ["04", "Des résultats reproductibles", "Les figures, tableaux, paramètres, historiques et scripts R permettent de retrouver comment un résultat a été produit et de poursuivre le travail hors de l’interface."]
    ],
    proofK: "Comparer et restituer",
    proofT: "MultiView rassemble les résultats que vous avez choisi de conserver.",
    proofP: "Les figures sauvegardées depuis les différents modules sont réunies dans une bibliothèque commune. Vous pouvez les rechercher, les comparer côte à côte, construire des compositions et exporter une planche de résultats sans perdre leur contexte d’origine.",
    proofAction: "Découvrir MultiView",
    showcaseAction: "Voir des exemples de résultats",
    audienceK: "Pensé pour plusieurs profils",
    audienceT: "Un même projet, différents niveaux d’expertise.",
    audienceP: "BarCodeR vise à faciliter le travail des biologistes et écologues tout en conservant suffisamment de transparence pour les utilisateurs avancés, les bioinformaticiens et les plateformes.",
    audiences: [
      ["Biologistes & écologues", "Explorer et analyser des données sans devoir programmer chaque étape, tout en gardant accès aux choix effectués.", "Découvrir un tutoriel", "#/tutorials"],
      ["Chercheurs & étudiants", "Passer d’une question biologique à une analyse documentée et à des résultats directement explorables.", "Explorer les analyses", "#/analyses"],
      ["Bioinformaticiens", "Utiliser une interface modulaire sans perdre l’accès aux objets phyloseq, aux paramètres ni au code R reproductible.", "Comprendre le fonctionnement", "#/functioning"],
      ["Plateformes & équipes", "Proposer un environnement commun pour préparer, analyser, reprendre et partager des projets de métabarcoding.", "Consulter la documentation", "#/documentation"]
    ],
    finalK: "Commencer avec BarCodeR",
    finalT: "Importez vos données, explorez-les, préparez-les puis répondez à vos questions scientifiques.",
    finalP: "Le site présente le fonctionnement général et les possibilités de l’application. La documentation prend ensuite le relais pour les paramètres, les méthodes et les détails techniques.",
    finalTutorial: "Voir les tutoriels",
    finalDocs: "Ouvrir la documentation",
    finalDownload: "Installer BarCodeR",
    citationK: "Projet scientifique",
    citationT: "BarCodeR est conçu pour être utilisé, compris et cité.",
    citationP: "La version utilisée, les modalités d’installation et les informations de citation sont regroupées dans l’espace de téléchargement."
  } : {
    badge: "Interactive metabarcoding analysis",
    title: <>Analyse your metabarcoding data,<br /><em>without losing control of your methods.</em></>,
    intro: "BarCodeR centralises data preparation, exploration, guided statistical analyses and result comparison in one application. Import a complete or partial phyloseq object directly, or start from FASTQ files through the OpenMetaBar module.",
    workflowAction: "Discover the workflow",
    analysesAction: "View scientific questions",
    downloadAction: "Install BarCodeR",
    version: "Version presented: BarCodeR v2.12.8",
    metrics: [
      ["PS", "phyloseq", "Direct import of a complete or partial object"],
      ["FQ", "FASTQ", "Upstream processing through OpenMetaBar"],
      ["R", "exportable code", "Reproduce or extend an analysis outside the interface"],
      ["LOCAL", "data under control", "Analyses run on your installation"]
    ],
    journeysK: "Start with your data",
    journeysT: "Two entry points, then one analysis environment.",
    journeysP: "BarCodeR adapts to the stage of your project. Import an existing phyloseq object directly, or use the OpenMetaBar module to process FASTQ files on a compatible HPC infrastructure and retrieve the resulting phyloseq object into the project.",
    phyloseqTitle: "I already have a phyloseq object",
    phyloseqTag: "Direct import",
    phyloseqText: "Load a complete or partial phyloseq object stored in an R file, inspect its available components, then continue with description, editing, filtering and analysis modules.",
    phyloseqSteps: ["Project", "Import", "Description", "Analyses", "Export"],
    phyloseqAction: "View data import",
    componentsTitle: "I start from FASTQ files",
    componentsTag: "Optional module",
    componentsText: "Configure and monitor an OpenMetaBar run from BarCodeR on a compatible remote infrastructure, then retrieve the produced phyloseq object and continue the analysis in the same application.",
    componentsSteps: ["Project", "FASTQ", "OpenMetaBar", "phyloseq", "Analyses"],
    componentsAction: "Discover the OpenMetaBar tab",
    questionsK: "Start from the scientific question",
    questionsT: "First decide what you want to understand.",
    questionsP: "The website presents BarCodeR capabilities through scientific questions. Technical choices, parameters and methodological details remain in the dedicated documentation.",
    questions: [
      ["Composition", "Which taxa dominate or structure my communities?", "Explore abundance and distribution across the groups being studied."],
      ["Diversity", "Does diversity differ among my samples or groups?", "Compare richness and several dimensions of diversity."],
      ["Structure", "How are my samples organised relative to each other?", "Visualise major gradients and similarities among communities."],
      ["Effect", "Is a variable associated with community structure?", "Test a multivariate hypothesis with associated checks."],
      ["Taxa", "Which taxa are associated with a condition?", "Compare several differential-analysis approaches in a common framework."],
      ["Comparison", "Do several datasets or markers tell a coherent story?", "Compare several representations of the same biological system."]
    ],
    questionsAction: "Explore all questions",
    strengthsK: "Why use BarCodeR",
    strengthsT: "Make analyses more accessible without turning them into a black box.",
    strengths: [
      ["01", "A genuinely interactive interface", "Explore data, adjust parameters and inspect results directly in the application before exporting them."],
      ["02", "Guided but transparent workflows", "BarCodeR flags prerequisites, incompatibilities and cautions when relevant while leaving analytical decisions to the user."],
      ["03", "Datasets adapted to each question", "Editing and filtering support several project versions without losing the context of the transformations applied."],
      ["04", "Reproducible results", "Figures, tables, parameters, histories and R scripts make it possible to recover how a result was produced and continue outside the interface."]
    ],
    proofK: "Compare and report",
    proofT: "MultiView brings together the results you chose to keep.",
    proofP: "Figures saved from the different modules are gathered in a shared library. Search them, compare them side by side, build compositions and export result panels without losing their original context.",
    proofAction: "Discover MultiView",
    showcaseAction: "View result examples",
    audienceK: "Designed for several profiles",
    audienceT: "One project, different levels of expertise.",
    audienceP: "BarCodeR aims to simplify work for biologists and ecologists while retaining enough transparency for advanced users, bioinformaticians and core facilities.",
    audiences: [
      ["Biologists & ecologists", "Explore and analyse data without programming every step while keeping access to the choices made.", "Discover a tutorial", "#/tutorials"],
      ["Researchers & students", "Move from a biological question to a documented analysis and directly explorable results.", "Explore analyses", "#/analyses"],
      ["Bioinformaticians", "Use a modular interface without losing access to phyloseq objects, parameters or reproducible R code.", "Understand the workflow", "#/functioning"],
      ["Core facilities & teams", "Provide a shared environment to prepare, analyse, resume and share metabarcoding projects.", "Read the documentation", "#/documentation"]
    ],
    finalK: "Get started with BarCodeR",
    finalT: "Import your data, explore them, prepare them and answer your scientific questions.",
    finalP: "The website presents the application workflow and capabilities. The documentation then takes over for parameters, methods and technical details.",
    finalTutorial: "View tutorials",
    finalDocs: "Open documentation",
    finalDownload: "Install BarCodeR",
    citationK: "Scientific project",
    citationT: "BarCodeR is designed to be used, understood and cited.",
    citationP: "Version information, installation options and citation guidance are grouped in the download area."
  };

  return <main>
    <section className="hero home-hero page-width">
      <div className="hero-copy reveal">
        <Eyebrow>{c.badge}</Eyebrow>
        <h1>{c.title}</h1>
        <p className="lead">{c.intro}</p>
        <div className="hero-actions">
          <a className="button primary" href="#/functioning">{c.workflowAction}<span>→</span></a>
          <a className="button secondary" href="#/analyses">{c.analysesAction}<span>↘</span></a>
        </div>
        <div className="hero-meta-row"><p className="version-line"><span />{c.version}</p><a href="#/download">{c.downloadAction}<b>→</b></a></div>
      </div>
      <div className="hero-media reveal delay-1">
        <div className="ambient-ring" />
        <HomeApplicationVisual language={language} />
        <div className="signal-card signal-one"><span>PS</span><div><b>{language === "fr" ? "Objet phyloseq" : "Phyloseq object"}</b><small>{language === "fr" ? "Complet ou partiel" : "Complete or partial"}</small></div></div>
        <div className="signal-card signal-two"><span>FQ</span><div><b>FASTQ</b><small>{language === "fr" ? "via OpenMetaBar" : "through OpenMetaBar"}</small></div></div>
        <div className="signal-card signal-three"><span>R</span><div><b>{language === "fr" ? "Code R" : "R code"}</b><small>{language === "fr" ? "Pour reproduire et prolonger" : "To reproduce and extend"}</small></div></div>
      </div>
      <div className="home-trust-row reveal delay-1">{c.metrics.map(([number, label, detail]) => <article key={label}><b>{number}</b><div><span>{label}</span><small>{detail}</small></div></article>)}</div>
    </section>

    <section className="section home-journeys page-width reveal">
      <div className="section-heading home-journey-heading"><div><Eyebrow>{c.journeysK}</Eyebrow><h2>{c.journeysT}</h2></div><p>{c.journeysP}</p></div>
      <div className="journey-grid journey-grid-compact">
        <article className="journey-card barcoder-journey"><div className="journey-card-head"><span>01</span><small>{c.phyloseqTag}</small></div><h3>{c.phyloseqTitle}</h3><p>{c.phyloseqText}</p><a href="#/application/input-data">{c.phyloseqAction}<span>↗</span></a></article>
        <article className="journey-card components-journey"><div className="journey-card-head"><span>02</span><small>{c.componentsTag}</small></div><h3>{c.componentsTitle}</h3><p>{c.componentsText}</p><a href="#/application/openmetabar">{c.componentsAction}<span>↗</span></a></article>
      </div>
      <div className="home-common-flow" aria-label={language === "fr" ? "Parcours commun dans BarCodeR" : "Shared BarCodeR workflow"}>
        {(language === "fr" ? ["Projet", "Description", "Édition / Filtration", "Exploration / Analyses", "MultiView", "Export"] : ["Project", "Description", "Editing / Filtering", "Exploration / Analyses", "MultiView", "Export"]).map((step, index, steps) => <div key={step}><span>{String(index + 1).padStart(2, "0")}</span><b>{step}</b>{index < steps.length - 1 && <i>→</i>}</div>)}
      </div>
    </section>

    <section className="section section-tint home-questions"><div className="page-width"><div className="section-heading home-question-heading reveal"><div><Eyebrow>{c.questionsK}</Eyebrow><h2>{c.questionsT}</h2></div><p>{c.questionsP}</p></div><div className="question-grid">{c.questions.map(([label, question, detail], index) => <a className="question-card reveal" style={{ "--delay": `${index * 45}ms` } as React.CSSProperties} href="#/analyses" key={question}><span>{String(index + 1).padStart(2, "0")} · {label}</span><h3>{question}</h3><p>{detail}</p><b>→</b></a>)}</div><div className="section-action"><a className="button primary" href="#/analyses">{c.questionsAction}<span>→</span></a></div></div></section>

    <section className="home-value-section"><div className="page-width home-value-grid">
      <div className="home-value-copy reveal"><Eyebrow>{c.strengthsK}</Eyebrow><h2>{c.strengthsT}</h2><div className="home-value-list">{c.strengths.map(([number, title, text]) => <article key={title}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div>
      <div className="home-value-proof reveal delay-1"><div className="home-proof-visual"><img src={asset("app-previews/screen-multiview.png")} alt={language === "fr" ? "Interface MultiView de BarCodeR" : "BarCodeR MultiView interface"} /></div><Eyebrow>{c.proofK}</Eyebrow><h3>{c.proofT}</h3><p>{c.proofP}</p><div className="home-proof-actions"><a className="button secondary" href="#/application/multiview">{c.proofAction}<span>↗</span></a><a className="inline-link" href="#/showcase">{c.showcaseAction}<span>→</span></a></div></div>
    </div></section>

    <section className="home-start-band"><div className="page-width home-start-inner reveal"><div><Eyebrow>{c.finalK}</Eyebrow><h2>{c.finalT}</h2><p>{c.finalP}</p></div><div className="home-start-actions"><a className="button start-light" href="#/tutorials">{c.finalTutorial}<span>→</span></a><a className="button start-outline" href="#/documentation">{c.finalDocs}<span>↗</span></a><a className="button start-accent" href="#/download">{c.finalDownload}<span>↓</span></a></div></div></section>
  </main>;
}
function ModuleGrid({ language, limit }: { language: Language; limit?: number }) {
  return <div className="module-grid">{modules.slice(0, limit).map((module, index) => <a href={moduleHref(module.key)} className="module-card reveal" style={{ "--delay": `${(index % 4) * 45}ms` } as React.CSSProperties} key={module.key}><div className="module-card-top"><span>{module.order}</span><i>{module.icon}</i></div><small>{tx(groups[module.group], language)}</small><h3>{tx(module.title, language)}</h3><p>{tx(module.question, language)}</p><b>{language === "fr" ? "Découvrir l’onglet" : "Discover the tab"}<span>↗</span></b></a>)}</div>;
}

function ApplicationIndex({ language }: { language: Language }) {
  const c = language === "fr" ? {
    k: "Fonctionnement de BarCodeR",
    title: <>Un projet continu,<br /><em>de l’import aux résultats.</em></>,
    p: "BarCodeR organise le travail autour d’un projet et d’un dataset actif. L’utilisateur peut partir d’un objet phyloseq déjà disponible ou de fichiers FASTQ traités avec le module OpenMetaBar, puis avancer librement entre description, édition, filtration, exploration, analyses et restitution.",
    primary: "Voir le parcours",
    secondary: "Explorer les onglets",
    entriesK: "Deux points d’entrée",
    entriesT: "Commencez là où se trouve réellement votre projet.",
    phyloseqRole: "Importer un objet phyloseq",
    phyloseqText: "BarCodeR accepte un objet phyloseq complet ou partiel enregistré au format .rds, .RData, .rda ou .rdata. Les composantes présentes sont identifiées au chargement avant de poursuivre dans l’application.",
    phyloseqTags: [".rds", ".RData", "phyloseq complet", "phyloseq partiel"],
    componentsRole: "Partir de fichiers FASTQ",
    componentsText: "Le module OpenMetaBar permet de préparer, lancer et suivre un traitement sur une infrastructure HPC distante, puis de récupérer l’objet phyloseq produit dans BarCodeR.",
    componentsTags: ["FASTQ", "OpenMetaBar", "HPC", "phyloseq"],
    pathsK: "Le parcours dans l’application",
    pathsT: "Les mêmes étapes deviennent disponibles une fois les données présentes dans le projet.",
    pathsP: "Ce parcours n’est pas un assistant rigide. Les modules sont indépendants et l’utilisateur revient sur les étapes utiles selon son dataset et sa question scientifique.",
    objectLabel: "Entrée A",
    objectTitle: "Objet phyloseq disponible",
    objectIntro: "Le projet rejoint directement l’environnement d’exploration et d’analyse.",
    objectSteps: [
      ["01", "Créer ou ouvrir un projet", "Regrouper les datasets, résultats et historiques dans un même espace de travail."],
      ["02", "Importer le phyloseq", "Charger l’objet et identifier les composantes réellement disponibles."],
      ["03", "Décrire les données", "Obtenir une vue d’ensemble avant d’aller vers les analyses approfondies."],
      ["04", "Préparer le dataset", "Corriger si nécessaire puis filtrer les données en fonction de la question étudiée."],
      ["05", "Explorer et analyser", "Interagir avec les visualisations, comparer les groupes et tester les hypothèses pertinentes."],
      ["06", "Comparer et exporter", "Sauvegarder les résultats, les réunir dans MultiView et exporter figures, tableaux ou code R."]
    ],
    componentLabel: "Entrée B",
    componentTitle: "Fichiers FASTQ",
    componentIntro: "OpenMetaBar ajoute une étape de traitement en amont, sans changer le reste du parcours BarCodeR.",
    componentSteps: [
      ["01", "Créer ou ouvrir un projet", "Préparer l’espace dans lequel les résultats du traitement seront ensuite analysés."],
      ["02", "Ouvrir l’onglet OpenMetaBar", "Renseigner les données et la configuration nécessaires au traitement FASTQ."],
      ["03", "Lancer le traitement distant", "Soumettre et suivre le pipeline sur l’infrastructure HPC configurée."],
      ["04", "Récupérer le phyloseq", "Importer dans BarCodeR l’objet produit par le pipeline."],
      ["05", "Décrire et préparer", "Contrôler le dataset puis l’adapter à la question scientifique."],
      ["06", "Explorer, analyser et exporter", "Poursuivre exactement dans les mêmes modules que pour un phyloseq importé directement."]
    ],
    lineageK: "Un projet qui conserve son contexte",
    lineageT: "Préparer plusieurs analyses sans perdre le fil du dataset utilisé.",
    lineageP: "BarCodeR garde les datasets, les opérations enregistrées et les résultats dans le contexte du projet. Selon l’action réalisée, l’objet peut être modifié ou une nouvelle version peut être créée ; l’objectif est de pouvoir retrouver quelle version a servi à chaque résultat.",
    lineageNodes: [
      ["Projet", "Le contexte commun"],
      ["Dataset importé", "Le point de départ de l’analyse"],
      ["Description", "Comprendre les données disponibles"],
      ["Préparation", "Édition et/ou filtration selon le besoin"],
      ["Résultats", "Figures, tableaux, historiques et exports"]
    ],
    editTitle: "Édition",
    editP: "Corriger ou enrichir les informations du dataset lorsque cela est nécessaire avant l’analyse.",
    filterTitle: "Filtration",
    filterP: "Préparer un dataset adapté à la question scientifique en sélectionnant finement les taxons, échantillons ou caractéristiques utiles.",
    responsibilityK: "Une aide à l’analyse, pas une décision automatique",
    responsibilityT: "BarCodeR encadre les choix sans se substituer au raisonnement scientifique.",
    guarantees: ["Une interface commune pour préparer, explorer et analyser les données.", "Des contrôles, avertissements et prérequis affichés lorsqu’ils sont pertinents.", "Des résultats interactifs qui restent reliés au dataset et aux paramètres utilisés.", "Des exports et du code R pour reprendre les analyses en dehors de l’application."],
    responsibilities: ["Définir une question scientifique et un plan expérimental cohérents.", "Décider quelles données doivent être conservées ou filtrées.", "Choisir et interpréter les méthodes dans leur contexte biologique.", "Confronter les résultats aux limites de l’étude et aux connaissances du domaine."],
    guaranteeTitle: "Ce que BarCodeR facilite",
    responsibilityTitle: "Ce qui reste un choix scientifique",
    modulesK: "Les onglets de BarCodeR",
    modulesT: "Chaque module répond à une étape concrète du projet.",
    modulesP: "Ces pages donnent une vue fonctionnelle et accessible de chaque onglet. Les paramètres détaillés, les méthodes et les explications techniques sont réservés à la documentation.",
    discover: "Découvrir"
  } : {
    k: "How BarCodeR works",
    title: <>One continuous project,<br /><em>from import to results.</em></>,
    p: "BarCodeR organises work around a project and an active dataset. Users can start from an existing phyloseq object or FASTQ files processed through the OpenMetaBar module, then move freely among description, editing, filtering, exploration, analyses and reporting.",
    primary: "View the workflow",
    secondary: "Explore the tabs",
    entriesK: "Two entry points",
    entriesT: "Start where your project actually is.",
    phyloseqRole: "Import a phyloseq object",
    phyloseqText: "BarCodeR accepts a complete or partial phyloseq object stored as .rds, .RData, .rda or .rdata. Available components are identified at loading before continuing in the application.",
    phyloseqTags: [".rds", ".RData", "complete phyloseq", "partial phyloseq"],
    componentsRole: "Start from FASTQ files",
    componentsText: "The OpenMetaBar module can prepare, launch and monitor processing on a remote HPC infrastructure, then retrieve the produced phyloseq object into BarCodeR.",
    componentsTags: ["FASTQ", "OpenMetaBar", "HPC", "phyloseq"],
    pathsK: "The application workflow",
    pathsT: "The same steps become available once data are present in the project.",
    pathsP: "This is not a rigid wizard. Modules remain independent and users return to the relevant steps according to their dataset and scientific question.",
    objectLabel: "Entry A",
    objectTitle: "Available phyloseq object",
    objectIntro: "The project goes directly into the exploration and analysis environment.",
    objectSteps: [
      ["01", "Create or open a project", "Keep datasets, results and histories in one workspace."],
      ["02", "Import the phyloseq object", "Load the object and identify the components actually available."],
      ["03", "Describe the data", "Get an overview before moving into deeper analyses."],
      ["04", "Prepare the dataset", "Correct when necessary, then filter according to the question being studied."],
      ["05", "Explore and analyse", "Interact with visualisations, compare groups and test relevant hypotheses."],
      ["06", "Compare and export", "Save results, bring them into MultiView and export figures, tables or R code."]
    ],
    componentLabel: "Entry B",
    componentTitle: "FASTQ files",
    componentIntro: "OpenMetaBar adds an upstream processing step without changing the rest of the BarCodeR workflow.",
    componentSteps: [
      ["01", "Create or open a project", "Prepare the workspace where processing outputs will later be analysed."],
      ["02", "Open the OpenMetaBar tab", "Provide the data and configuration needed for FASTQ processing."],
      ["03", "Launch remote processing", "Submit and monitor the pipeline on the configured HPC infrastructure."],
      ["04", "Retrieve the phyloseq object", "Import the object produced by the pipeline into BarCodeR."],
      ["05", "Describe and prepare", "Check the dataset and adapt it to the scientific question."],
      ["06", "Explore, analyse and export", "Continue through exactly the same modules as for a directly imported phyloseq object."]
    ],
    lineageK: "A project that retains context",
    lineageT: "Prepare several analyses without losing track of the dataset used.",
    lineageP: "BarCodeR keeps datasets, recorded operations and results within the project context. Depending on the action, an object may be modified or a new version created; the aim is to recover which version was used for each result.",
    lineageNodes: [["Project", "The shared context"], ["Imported dataset", "The analytical starting point"], ["Description", "Understand available data"], ["Preparation", "Editing and/or filtering as needed"], ["Results", "Figures, tables, histories and exports"]],
    editTitle: "Editing",
    editP: "Correct or enrich dataset information when needed before analysis.",
    filterTitle: "Filtering",
    filterP: "Prepare a dataset suited to the scientific question by finely selecting useful taxa, samples or characteristics.",
    responsibilityK: "Analysis support, not automatic decisions",
    responsibilityT: "BarCodeR frames choices without replacing scientific reasoning.",
    guarantees: ["A shared interface to prepare, explore and analyse data.", "Checks, warnings and prerequisites displayed when relevant.", "Interactive results linked to the dataset and parameters used.", "Exports and R code to continue analyses outside the application."],
    responsibilities: ["Define a coherent scientific question and experimental design.", "Decide which data should be kept or filtered.", "Choose and interpret methods in their biological context.", "Relate results to study limitations and domain knowledge."],
    guaranteeTitle: "What BarCodeR facilitates",
    responsibilityTitle: "What remains a scientific choice",
    modulesK: "BarCodeR tabs",
    modulesT: "Each module answers a concrete stage of the project.",
    modulesP: "These pages provide an accessible functional overview of each tab. Detailed parameters, methods and technical explanations are left to the documentation.",
    discover: "Discover"
  };

  const commonFlow = language === "fr" ? [
    ["01", "Description", "Obtenir une vue d’ensemble du dataset avant d’entrer dans les analyses approfondies."],
    ["02", "Édition", "Corriger ou enrichir les informations du dataset lorsque le projet le nécessite."],
    ["03", "Filtration", "Préparer une version des données adaptée à la question scientifique étudiée."],
    ["04", "Exploration & analyses", "Visualiser les données, comparer les groupes et tester les hypothèses pertinentes."],
    ["05", "MultiView", "Retrouver et comparer les figures sauvegardées dans un espace commun."],
    ["06", "Export", "Récupérer figures, tableaux et code R depuis les modules concernés."]
  ] : [
    ["01", "Description", "Get an overview of the dataset before moving into deeper analyses."],
    ["02", "Editing", "Correct or enrich dataset information when the project requires it."],
    ["03", "Filtering", "Prepare a version of the data suited to the scientific question."],
    ["04", "Exploration & analyses", "Visualise data, compare groups and test relevant hypotheses."],
    ["05", "MultiView", "Find and compare saved figures in a shared workspace."],
    ["06", "Export", "Recover figures, tables and R code from the relevant modules."]
  ];

  return <main className="functioning-page">
    <section className="functioning-hero"><div className="page-width functioning-hero-grid"><div className="functioning-hero-copy reveal"><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p className="lead">{c.p}</p><div className="hero-actions"><button className="button primary" type="button" onClick={() => document.getElementById("function-entry")?.scrollIntoView({ behavior: "smooth" })}>{c.primary}<span>↓</span></button><button className="button secondary" type="button" onClick={() => document.getElementById("function-modules")?.scrollIntoView({ behavior: "smooth" })}>{c.secondary}<span>→</span></button></div></div><div className="reveal delay-1"><AppPreview language={language} /></div></div></section>

    <section className="section page-width function-entry-section" id="function-entry">
      <div className="section-heading reveal"><div><Eyebrow>{c.entriesK}</Eyebrow><h2>{c.entriesT}</h2></div><p>{language === "fr" ? "Le projet est le point commun. Seule la manière d’y faire entrer les données change." : "The project is the shared starting point. Only the way data enter it changes."}</p></div>
      <div className="function-project-start reveal"><span>01</span><div><small>{language === "fr" ? "Point de départ" : "Starting point"}</small><h3>{language === "fr" ? "Créer ou ouvrir un projet" : "Create or open a project"}</h3><p>{language === "fr" ? "Le projet regroupe les datasets, les historiques et les résultats produits au cours du travail." : "The project brings together datasets, histories and results produced throughout the work."}</p></div></div>
      <div className="product-role-grid function-entry-grid">
        <article className="product-role barcoder-role reveal"><div className="product-role-head"><img src={asset("app-previews/barcoder-logo.png")} alt="" /><div><small>phyloseq</small><h3>{c.phyloseqRole}</h3></div></div><p>{c.phyloseqText}</p><div className="role-tags">{c.phyloseqTags.map(tag => <span key={tag}>{tag}</span>)}</div><a className="function-entry-link" href="#/application/input-data">{language === "fr" ? "Voir l’import" : "View import"}<span>→</span></a></article>
        <article className="product-role openmetabar-entry-card reveal"><div className="product-role-head"><img src={asset("app-previews/openmetabar-logo.png")} alt="" /><div><small>{language === "fr" ? "Option FASTQ" : "FASTQ option"}</small><h3>{c.componentsRole}</h3></div></div><p>{c.componentsText}</p><div className="role-tags">{c.componentsTags.map(tag => <span key={tag}>{tag}</span>)}</div><a className="function-entry-link" href="#/application/openmetabar">{language === "fr" ? "Voir OpenMetaBar" : "View OpenMetaBar"}<span>→</span></a></article>
      </div>
      <div className="function-converge reveal"><span>↓</span><b>{language === "fr" ? "Une fois un objet phyloseq présent dans le projet, le parcours est commun." : "Once a phyloseq object is present in the project, the workflow is shared."}</b></div>
    </section>

    <section className="section section-tint function-common-section" id="function-paths"><div className="page-width"><div className="section-heading reveal"><div><Eyebrow>{c.pathsK}</Eyebrow><h2>{language === "fr" ? "Un parcours commun, à utiliser librement." : "One shared workflow, used freely."}</h2></div><p>{c.pathsP}</p></div><div className="function-common-flow">{commonFlow.map(([number, title, detail], index) => <article className="reveal" style={{ "--delay": `${index * 40}ms` } as React.CSSProperties} key={number}><span>{number}</span><div><h3>{title}</h3><p>{detail}</p></div>{index < commonFlow.length - 1 && <i>→</i>}</article>)}</div></div></section>

    <section className="dataset-lineage-section"><div className="page-width dataset-lineage-grid"><div className="dataset-lineage-copy reveal"><Eyebrow>{c.lineageK}</Eyebrow><h2>{c.lineageT}</h2><p>{c.lineageP}</p><div className="edition-filtering"><article><span>✎</span><div><b>{c.editTitle}</b><p>{c.editP}</p></div></article><article><span>⌁</span><div><b>{c.filterTitle}</b><p>{c.filterP}</p></div></article></div></div><div className="lineage-tree reveal">{c.lineageNodes.map(([title, value], index) => <article className={`lineage-node lineage-node-${index}`} key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{title}</b><small>{value}</small></div></article>)}</div></div></section>

    <section className="section page-width responsibility-section"><div className="section-heading reveal"><div><Eyebrow>{c.responsibilityK}</Eyebrow><h2>{c.responsibilityT}</h2></div></div><div className="responsibility-grid"><article className="responsibility-provided reveal"><span>✓</span><h3>{c.guaranteeTitle}</h3><ul>{c.guarantees.map(item => <li key={item}>{item}</li>)}</ul></article><article className="responsibility-science reveal"><span>!</span><h3>{c.responsibilityTitle}</h3><ul>{c.responsibilities.map(item => <li key={item}>{item}</li>)}</ul></article></div></section>

    <section className="section section-tint process-section" id="function-modules"><div className="page-width"><div className="section-heading reveal"><div><Eyebrow>{c.modulesK}</Eyebrow><h2>{c.modulesT}</h2></div><p>{c.modulesP}</p></div>{groupOrder.map((group, groupIndex) => <div className="module-group" key={group}><div className="group-heading"><b>0{groupIndex + 1}</b><span>{tx(groups[group], language)}</span><i /></div><div className="module-grid">{modules.filter(m => m.group === group).map(module => <a className="module-card" href={moduleHref(module.key)} key={module.key}><div className="module-card-top"><span>{module.order}</span><i>{module.icon}</i></div><h3>{tx(module.title, language)}</h3><p>{tx(module.purpose, language)}</p><b>{c.discover}<span>→</span></b></a>)}</div></div>)}</div></section>
  </main>;
}
type AnalysisFamily = "describe" | "test" | "compare" | "hypothesis";
type AnalysisRequirement = "metadata" | "tree" | "multiple" | "counts";

type AnalysisMethodSpec = {
  id: string;
  family: AnalysisFamily;
  number: string;
  icon: string;
  title: Localized;
  question: Localized;
  summary: Localized;
  methods: string[];
  requirements: AnalysisRequirement[];
  inputs: Localized[];
  preparation: Localized[];
  diagnostics: Localized[];
  outputs: Localized[];
  cautions: Localized[];
  image?: string;
  moduleKey: "exploration" | "analyse";
};

const analysisText = (fr: string, en: string): Localized => ({ fr, en });

const analysisMethodCatalog: AnalysisMethodSpec[] = [
  {
    id: "composition",
    family: "describe",
    number: "01",
    icon: "▥",
    title: analysisText("Composition des communautés", "Community composition"),
    question: analysisText("Quels taxons structurent mes communautés et lesquels sont partagés entre groupes ?", "Which taxa structure my communities and which are shared among groups?"),
    summary: analysisText("Décrire la composition à différents rangs taxonomiques, cibler une lignée et comparer les taxons communs ou spécifiques.", "Describe composition at different taxonomic ranks, target a lineage and compare shared or specific taxa."),
    methods: ["Barplot", "Venn", "UpSet", "Heat Tree", "Phylogeny", "Taxonomy quality"],
    requirements: ["metadata"],
    inputs: [analysisText("Table OTU/ASV", "OTU/ASV table"), analysisText("Taxonomie", "Taxonomy"), analysisText("Variable de groupe facultative", "Optional grouping variable")],
    preparation: [analysisText("Choisir le rang taxonomique", "Choose the taxonomic rank"), analysisText("Définir le traitement des non-assignés", "Define how unassigned taxa are handled"), analysisText("Choisir comptes, proportions ou agrégation", "Choose counts, proportions or aggregation")],
    diagnostics: [analysisText("Part des taxons non assignés", "Share of unassigned taxa"), analysisText("Effet du top N et du regroupement « Autres »", "Effect of top N and the 'Other' group"), analysisText("Couverture des groupes et des échantillons", "Coverage of groups and samples")],
    outputs: [analysisText("Barplots interactifs", "Interactive bar plots"), analysisText("Diagrammes Venn/UpSet", "Venn/UpSet diagrams"), analysisText("Arbres et Heat Trees", "Trees and Heat Trees")],
    cautions: [analysisText("Une proportion élevée ne prouve pas une différence statistique.", "A high proportion does not demonstrate a statistical difference."), analysisText("L’agrégation peut masquer une hétérogénéité au niveau ASV.", "Aggregation can hide ASV-level heterogeneity.")],
    image: "barplot.png",
    moduleKey: "exploration"
  },
  {
    id: "alpha",
    family: "describe",
    number: "02",
    icon: "α",
    title: analysisText("Diversité au sein des échantillons", "Diversity within samples"),
    question: analysisText("La richesse ou la diversité intra-échantillon diffère-t-elle entre mes groupes ?", "Does within-sample richness or diversity differ among groups?"),
    summary: analysisText("Comparer plusieurs dimensions de la richesse et de la diversité, visualiser leur distribution et examiner les différences entre groupes.", "Compare several dimensions of richness and diversity, visualise their distribution and examine differences among groups."),
    methods: ["Observed", "Chao1", "ACE", "Shannon", "Simpson", "Inverse Simpson", "Fisher", "Faith PD"],
    requirements: ["metadata", "tree", "counts"],
    inputs: [analysisText("Table de comptes", "Count table"), analysisText("Variable de groupe", "Grouping variable"), analysisText("Arbre pour Faith PD", "Tree for Faith PD")],
    preparation: [analysisText("Contrôler la profondeur de séquençage", "Check sequencing depth"), analysisText("Choisir les indices avant de tester", "Choose indices before testing"), analysisText("Définir les comparaisons prévues", "Define planned comparisons")],
    diagnostics: [analysisText("Courbes de raréfaction", "Rarefaction curves"), analysisText("Distribution et valeurs atypiques", "Distribution and atypical values"), analysisText("Taille des groupes et comparaisons multiples", "Group size and multiple comparisons")],
    outputs: [analysisText("Boxplots et points interactifs", "Interactive box plots and points"), analysisText("Tables d’indices", "Index tables"), analysisText("Tests globaux et post-hoc", "Global and post-hoc tests")],
    cautions: [analysisText("La richesse observée dépend fortement de la profondeur.", "Observed richness strongly depends on depth."), analysisText("Un indice unique ne résume pas toutes les dimensions de la diversité.", "A single index does not summarise every dimension of diversity.")],
    image: "alpha_diversite.png",
    moduleKey: "exploration"
  },
  {
    id: "ordination",
    family: "describe",
    number: "03",
    icon: "◎",
    title: analysisText("Organisation globale des communautés", "Overall community organisation"),
    question: analysisText("Comment les échantillons s’organisent-ils dans un espace multivarié ?", "How are samples organised in multivariate space?"),
    summary: analysisText("Représenter l’organisation globale des échantillons, rechercher les gradients ou séparations et examiner les diagnostics avant de les interpréter.", "Represent the overall organisation of samples, look for gradients or separations and inspect diagnostics before interpreting them."),
    methods: ["PCA", "PCoA", "NMDS", "CCA", "RDA", "dbRDA"],
    requirements: ["metadata", "tree"],
    inputs: [analysisText("Table OTU/ASV", "OTU/ASV table"), analysisText("Métadonnées facultatives ou explicatives", "Optional or explanatory metadata"), analysisText("Arbre pour UniFrac", "Tree for UniFrac")],
    preparation: [analysisText("Choisir transformation et distance ensemble", "Choose transformation and distance together"), analysisText("Retirer les taxons à variance nulle", "Remove zero-variance taxa"), analysisText("Définir contraintes, covariables et blocs si nécessaire", "Define constraints, covariates and blocks when needed")],
    diagnostics: [analysisText("Stress, convergence et Shepard pour NMDS", "Stress, convergence and Shepard for NMDS"), analysisText("Valeurs propres et inertie", "Eigenvalues and inertia"), analysisText("Stabilité des échantillons et robustesse", "Sample stability and robustness")],
    outputs: [analysisText("Ordinations 2D/3D interactives", "Interactive 2D/3D ordinations"), analysisText("Biplots, centroides et envfit", "Biplots, centroids and envfit"), analysisText("Diagnostics et tables d’axes", "Diagnostics and axis tables")],
    cautions: [analysisText("Une séparation visuelle n’est pas un test.", "Visual separation is not a test."), analysisText("Une NMDS non convergée ou à stress élevé ne doit pas être surinterprétée.", "A non-converged or high-stress NMDS should not be overinterpreted.")],
    image: "ordinations.png",
    moduleKey: "analyse"
  },
  {
    id: "permanova",
    family: "test",
    number: "04",
    icon: "P",
    title: analysisText("Différences de composition entre groupes", "Composition differences among groups"),
    question: analysisText("Une variable explique-t-elle une part de la structure multivariée ?", "Does a variable explain part of multivariate structure?"),
    summary: analysisText("Tester si la composition diffère entre groupes et contrôler séparément si leur dispersion peut influencer la conclusion.", "Test whether composition differs among groups and separately check whether dispersion may influence the conclusion."),
    methods: ["adonis2", "PERMDISP", "Pairwise", "Sequential tests", "Marginal tests"],
    requirements: ["metadata", "tree"],
    inputs: [analysisText("Matrice de distance", "Distance matrix"), analysisText("Facteur principal et covariables", "Main factor and covariates"), analysisText("Variable de bloc pour plans appariés", "Blocking variable for paired designs")],
    preparation: [analysisText("Définir une formule conforme au plan", "Define a formula matching the design"), analysisText("Choisir le schéma de permutations", "Choose the permutation scheme"), analysisText("Corriger les comparaisons pairwise", "Correct pairwise comparisons")],
    diagnostics: [analysisText("PERMDISP et distances aux centroïdes", "PERMDISP and distances to centroids"), analysisText("R², pseudo-F et p-value", "R², pseudo-F and p-value"), analysisText("Taille des groupes et structure des blocs", "Group size and block structure")],
    outputs: [analysisText("Table PERMANOVA", "PERMANOVA table"), analysisText("Tests pairwise", "Pairwise tests"), analysisText("Graphiques de dispersion", "Dispersion plots")],
    cautions: [analysisText("Une PERMANOVA significative peut refléter une dispersion différente.", "A significant PERMANOVA can reflect different dispersion."), analysisText("Les permutations doivent respecter les répétitions et les blocs.", "Permutations must respect repeated measures and blocks.")],
    image: "permanova_dispersion.png",
    moduleKey: "analyse"
  },
  {
    id: "differential",
    family: "test",
    number: "05",
    icon: "Δ",
    title: analysisText("Taxons associés aux conditions", "Taxa associated with conditions"),
    question: analysisText("Quels taxons sont associés à une condition après ajustement du modèle ?", "Which taxa are associated with a condition after model adjustment?"),
    summary: analysisText("Identifier les taxons associés aux conditions étudiées et confronter plusieurs approches lorsque leur comparaison est pertinente.", "Identify taxa associated with the studied conditions and compare several approaches when that comparison is meaningful."),
    methods: ["ANCOM-BC2", "LinDA", "ALDEx2", "corncob", "MaAsLin 3"],
    requirements: ["metadata", "counts"],
    inputs: [analysisText("Comptes bruts", "Raw counts"), analysisText("Variable principale et référence", "Main variable and reference"), analysisText("Covariables et effets aléatoires compatibles", "Compatible covariates and random effects")],
    preparation: [analysisText("Appliquer un filtre de prévalence partagé", "Apply a shared prevalence filter"), analysisText("Choisir un rang taxonomique", "Choose a taxonomic rank"), analysisText("Vérifier réplicats, NA et confusion entre facteurs", "Check replicates, missing values and factor confounding")],
    diagnostics: [analysisText("Prévalence, abondance et nombre d’échantillons", "Prevalence, abundance and sample count"), analysisText("Effet, q-value et direction", "Effect, q-value and direction"), analysisText("Concordance et discordance entre moteurs", "Concordance and disagreement among engines")],
    outputs: [analysisText("Volcano plots et tableaux complets", "Volcano plots and complete tables"), analysisText("Consensus multi-méthodes", "Multi-method consensus"), analysisText("Dispersion corncob et prévalence MaAsLin 3 séparées", "Separate corncob dispersion and MaAsLin 3 prevalence")],
    cautions: [analysisText("Les amplitudes d’effet des moteurs ne sont pas directement comparables.", "Effect magnitudes from different engines are not directly comparable."), analysisText("ALDEx2 et corncob ne gèrent pas les effets aléatoires.", "ALDEx2 and corncob do not support random effects.")],
    image: "analyses_differentielles.png",
    moduleKey: "analyse"
  },
  {
    id: "matrices",
    family: "compare",
    number: "06",
    icon: "⇄",
    title: analysisText("Comparer plusieurs représentations", "Compare several representations"),
    question: analysisText("Plusieurs marqueurs ou représentations racontent-ils une structure cohérente ?", "Do multiple markers or representations reveal a coherent structure?"),
    summary: analysisText("Comparer l’organisation de plusieurs datasets décrivant les mêmes échantillons et mesurer dans quelle mesure leurs structures concordent.", "Compare the organisation of several datasets describing the same samples and assess how strongly their structures agree."),
    methods: ["Mantel", "Procrustes", "PROTEST", "Co-inertia", "MCOA"],
    requirements: ["multiple", "tree"],
    inputs: [analysisText("Au moins deux datasets", "At least two datasets"), analysisText("Clé d’appariement non ambiguë", "Unambiguous matching key"), analysisText("Intersection d’échantillons suffisante", "Sufficient sample intersection")],
    preparation: [analysisText("Harmoniser les identifiants", "Harmonise identifiers"), analysisText("Choisir une préparation cohérente pour chaque matrice", "Choose coherent preparation for each matrix"), analysisText("Contrôler doublons et clés ambiguës", "Check duplicates and ambiguous keys")],
    diagnostics: [analysisText("Recouvrement des échantillons et taxons", "Sample and taxon overlap"), analysisText("Résidus et flèches Procrustes", "Procrustes residuals and arrows"), analysisText("Distance au consensus MCOA", "Distance to the MCOA consensus")],
    outputs: [analysisText("Corrélations Mantel", "Mantel correlations"), analysisText("Superpositions Procrustes", "Procrustes superimpositions"), analysisText("Consensus et projections partielles MCOA", "MCOA consensus and partial projections")],
    cautions: [analysisText("La validité dépend entièrement de l’appariement.", "Validity depends entirely on matching."), analysisText("Une faible intersection peut ne plus représenter les datasets initiaux.", "A small intersection may no longer represent the original datasets.")],
    image: "comparaison_matrices.png",
    moduleKey: "analyse"
  },
  {
    id: "networks",
    family: "hypothesis",
    number: "07",
    icon: "⌘",
    title: analysisText("Associations entre taxons", "Associations among taxa"),
    question: analysisText("Quelles associations statistiques émergent entre taxons ou domaines ?", "Which statistical associations emerge among taxa or domains?"),
    summary: analysisText("Explorer les associations entre taxons, repérer les éléments structurants et comparer l’organisation de plusieurs réseaux lorsque le projet s’y prête.", "Explore associations among taxa, identify structuring elements and compare the organisation of several networks when appropriate."),
    methods: ["SPIEC-EASI", "SparCC", "Proportionality", "Correlations", "Bootstrap"],
    requirements: ["counts", "multiple"],
    inputs: [analysisText("Au moins quatre échantillons et trois taxons après préparation", "At least four samples and three taxa after preparation"), analysisText("Comptes et taxonomie", "Counts and taxonomy"), analysisText("Plusieurs datasets pour le multi-domaine", "Multiple datasets for multi-domain analysis")],
    preparation: [analysisText("Filtrer prévalence et abondance", "Filter prevalence and abundance"), analysisText("Choisir une méthode compositionnelle adaptée", "Choose an appropriate compositional method"), analysisText("Éviter une double transformation", "Avoid double transformation")],
    diagnostics: [analysisText("Stabilité bootstrap des arêtes", "Bootstrap edge stability"), analysisText("Densité, modularité et composantes", "Density, modularity and components"), analysisText("Sensibilité aux filtres et seuils", "Sensitivity to filters and thresholds")],
    outputs: [analysisText("Réseaux interactifs", "Interactive networks"), analysisText("Tables des arêtes et nœuds", "Edge and node tables"), analysisText("Hubs, modules et comparaisons", "Hubs, modules and comparisons")],
    cautions: [analysisText("Une arête est une association, pas une interaction démontrée.", "An edge is an association, not a demonstrated interaction."), analysisText("Un hub statistique n’est pas automatiquement une espèce clé.", "A statistical hub is not automatically a keystone species.")],
    moduleKey: "analyse"
  },
  {
    id: "clustering",
    family: "hypothesis",
    number: "08",
    icon: "⋈",
    title: analysisText("Regroupements dans les données", "Groupings in the data"),
    question: analysisText("Des regroupements non supervisés sont-ils compatibles avec les données ?", "Are unsupervised groupings compatible with the data?"),
    summary: analysisText("Rechercher des regroupements non supervisés parmi les échantillons ou les taxons et examiner leur cohérence avant de leur donner un sens biologique.", "Search for unsupervised groupings among samples or taxa and examine their consistency before assigning biological meaning."),
    methods: ["Hierarchical", "Ward", "Silhouette", "Dunn", "Heatmap", "Bootstrap"],
    requirements: [],
    inputs: [analysisText("Table OTU/ASV", "OTU/ASV table"), analysisText("Métadonnées ou taxonomie facultatives", "Optional metadata or taxonomy"), analysisText("Choix de l’unité à regrouper", "Choice of unit to cluster")],
    preparation: [analysisText("Sélectionner transformation et distance compatibles", "Select compatible transformation and distance"), analysisText("Limiter les taxons rares ou peu variables", "Limit rare or low-variance taxa"), analysisText("Définir la plage de k", "Define the k range")],
    diagnostics: [analysisText("Silhouette et indice de Dunn", "Silhouette and Dunn index"), analysisText("Corrélation cophénétique", "Cophenetic correlation"), analysisText("Taille et stabilité des groupes", "Group size and stability")],
    outputs: [analysisText("Dendrogrammes", "Dendrograms"), analysisText("Heatmaps ordonnées", "Ordered heatmaps"), analysisText("Profils descriptifs des clusters", "Descriptive cluster profiles")],
    cautions: [analysisText("Le meilleur k statistique n’est pas automatiquement biologiquement pertinent.", "The statistically best k is not automatically biologically meaningful."), analysisText("La mise à l’échelle peut masquer les différences absolues.", "Scaling can hide absolute differences.")],
    image: "clustering.png",
    moduleKey: "analyse"
  }
];

function AnalysesPage({ language }: { language: Language }) {
  const [activeFamily, setActiveFamily] = useState<"all" | AnalysisFamily>("all");

  const c = language === "fr" ? {
    k: "Analyses dans BarCodeR",
    title: <>Partez d’une question,<br /><em>pas d’un nom de méthode.</em></>,
    p: "BarCodeR regroupe plusieurs approches d’exploration et d’analyse du métabarcoding. Le site vous aide à identifier ce que l’application peut apporter à votre question ; la documentation détaille ensuite les méthodes, leurs paramètres et leurs conditions d’utilisation.",
    heroPrimary: "Explorer les questions",
    heroSecondary: "Ouvrir la documentation",
    metrics: [["Composition", "décrire les communautés"], ["Diversité", "comparer leur diversité"], ["Structure", "comprendre leur organisation"], ["Tests", "évaluer des associations"]],
    orientK: "Que cherchez-vous à comprendre ?",
    orientT: "Filtrez les possibilités par objectif scientifique.",
    orientP: "Ces catégories servent à s’orienter. BarCodeR peut combiner plusieurs approches au cours d’un même projet, et le choix final dépend toujours du design de l’étude et des données disponibles.",
    families: [
      ["all", "Tout afficher", "Voir l’ensemble des possibilités."],
      ["describe", "Décrire mes communautés", "Composition, diversité et organisation générale."],
      ["test", "Tester une différence ou une association", "Comparer des groupes ou rechercher des taxons associés."],
      ["compare", "Comparer plusieurs datasets", "Mettre en regard plusieurs marqueurs ou représentations."],
      ["hypothesis", "Explorer des structures", "Rechercher des regroupements ou associations à approfondir."]
    ] as ["all" | AnalysisFamily, string, string][],
    catalogK: "Questions couvertes",
    catalogT: "Plusieurs outils, présentés selon ce qu’ils permettent d’étudier.",
    catalogP: "Chaque carte résume l’objectif d’une famille d’analyses et les approches disponibles dans BarCodeR. Les détails statistiques restent volontairement dans la documentation.",
    results: "familles affichées",
    reset: "Tout afficher",
    methodsLabel: "Dans BarCodeR",
    openModule: "Voir l’onglet correspondant",
    readGuide: "Lire la documentation",
    empty: "Aucune famille ne correspond à ce filtre.",
    supportK: "Une interface guidée",
    supportT: "BarCodeR aide à éviter les erreurs évidentes sans décider à votre place.",
    supportP: "Selon les modules, l’application peut vérifier des prérequis, signaler une incompatibilité, afficher un avertissement ou compléter le résultat par un diagnostic. Le niveau de contrôle dépend de l’analyse réalisée.",
    support: [
      ["01", "Préparer", "Choisir le dataset, les groupes et les variables qui correspondent réellement à la question étudiée."],
      ["02", "Vérifier", "Être averti lorsqu’une analyse nécessite une information absente ou lorsqu’un choix mérite une attention particulière."],
      ["03", "Comparer", "Mettre en regard plusieurs méthodes ou plusieurs représentations lorsque cela apporte une lecture plus robuste des données."],
      ["04", "Interpréter", "Consulter les résultats avec les diagnostics et indications utiles plutôt qu’une p-value ou une figure isolée."]
    ],
    examplesK: "Quelques questions typiques",
    examplesT: "Un même dataset peut être interrogé sous plusieurs angles.",
    examples: [
      ["Quels taxons dominent mes groupes ?", "Explorer la composition et la répartition taxonomique."],
      ["La diversité change-t-elle entre mes conditions ?", "Comparer la diversité alpha et sa variabilité."],
      ["Mes communautés se structurent-elles selon un facteur ?", "Visualiser les distances entre échantillons puis tester l’association."],
      ["Quels taxons sont associés à une condition ?", "Comparer plusieurs approches complémentaires pour identifier les associations les plus cohérentes."],
      ["Deux marqueurs décrivent-ils la même organisation ?", "Comparer plusieurs matrices ou ordinations sur des échantillons communs."],
      ["Existe-t-il des groupes ou associations inattendus ?", "Explorer clustering et réseaux comme outils de génération d’hypothèses."]
    ],
    finalTitle: "Les détails méthodologiques restent disponibles quand vous en avez besoin.",
    finalP: "Le site reste volontairement centré sur les usages. Pour comprendre une méthode, ses paramètres, ses hypothèses ou ses détails techniques, la documentation constitue la référence.",
    finalModule: "Voir l’onglet Analyse",
    finalDocs: "Consulter la documentation"
  } : {
    k: "Analyses in BarCodeR",
    title: <>Start from a question,<br /><em>not a method name.</em></>,
    p: "BarCodeR brings together several approaches for exploring and analysing metabarcoding data. The website helps identify what the application can bring to your question; the documentation then details methods, parameters and conditions of use.",
    heroPrimary: "Explore questions",
    heroSecondary: "Open documentation",
    metrics: [["Composition", "describe communities"], ["Diversity", "compare diversity"], ["Structure", "understand organisation"], ["Tests", "assess associations"]],
    orientK: "What are you trying to understand?",
    orientT: "Filter possibilities by scientific objective.",
    orientP: "These categories are for orientation. BarCodeR can combine several approaches within one project, and the final choice always depends on study design and available data.",
    families: [
      ["all", "Show everything", "View all possibilities."],
      ["describe", "Describe my communities", "Composition, diversity and overall organisation."],
      ["test", "Test a difference or association", "Compare groups or find associated taxa."],
      ["compare", "Compare several datasets", "Compare markers or data representations."],
      ["hypothesis", "Explore structures", "Find groupings or associations to investigate further."]
    ] as ["all" | AnalysisFamily, string, string][],
    catalogK: "Questions covered",
    catalogT: "Several tools, presented through what they help investigate.",
    catalogP: "Each card summarises the purpose of an analysis family and the approaches available in BarCodeR. Statistical details are intentionally kept in the documentation.",
    results: "families displayed",
    reset: "Show all",
    methodsLabel: "In BarCodeR",
    openModule: "View the relevant tab",
    readGuide: "Read documentation",
    empty: "No family matches this filter.",
    supportK: "A guided interface",
    supportT: "BarCodeR helps avoid obvious mistakes without deciding for you.",
    supportP: "Depending on the module, the application may check prerequisites, flag an incompatibility, display a warning or complement a result with a diagnostic. The level of control depends on the analysis being performed.",
    support: [
      ["01", "Prepare", "Choose the dataset, groups and variables that actually match the scientific question."],
      ["02", "Check", "Be warned when an analysis needs missing information or when a choice deserves particular attention."],
      ["03", "Compare", "Compare several methods or representations when this provides a more robust reading of the data."],
      ["04", "Interpret", "Review results together with useful diagnostics and guidance rather than an isolated p-value or figure."]
    ],
    examplesK: "Typical questions",
    examplesT: "The same dataset can be examined from several angles.",
    examples: [
      ["Which taxa dominate my groups?", "Explore taxonomic composition and distribution."],
      ["Does diversity change among my conditions?", "Compare alpha diversity and its variability."],
      ["Are my communities structured by a factor?", "Visualise sample distances and then test the association."],
      ["Which taxa are associated with a condition?", "Compare several complementary approaches to identify the most consistent associations."],
      ["Do two markers describe the same organisation?", "Compare several matrices or ordinations on shared samples."],
      ["Are there unexpected groups or associations?", "Use clustering and networks as hypothesis-generating tools."]
    ],
    finalTitle: "Methodological details remain available when you need them.",
    finalP: "The website intentionally focuses on uses. For methods, parameters, assumptions and technical details, the documentation is the reference.",
    finalModule: "View the Analysis tab",
    finalDocs: "Read the documentation"
  };

  const visibleMethods = analysisMethodCatalog.filter(method => activeFamily === "all" || method.family === activeFamily);
  const selectFamily = (family: "all" | AnalysisFamily) => {
    setActiveFamily(family);
    window.setTimeout(() => document.getElementById("analysis-catalog")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };
  const guidePath = asset(`documentation/${language}/analyse/guides-methodologiques.html`);

  return <main className="analyses-page">
    <section className="analyses-hero page-width">
      <div className="analyses-hero-copy reveal">
        <Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p className="lead">{c.p}</p>
        <div className="hero-actions"><button className="button primary" type="button" onClick={() => document.getElementById("analysis-orientation")?.scrollIntoView({ behavior: "smooth", block: "start" })}>{c.heroPrimary}<span>↓</span></button><a className="button secondary" href="#/documentation">{c.heroSecondary}<span>→</span></a></div>
      </div>
      <div className="analyses-hero-note reveal delay-1"><span>?</span><div><b>{language === "fr" ? "Le site vous oriente par question scientifique" : "The website guides you through scientific questions"}</b><p>{language === "fr" ? "Les méthodes, paramètres et hypothèses sont détaillés uniquement dans la documentation." : "Methods, parameters and assumptions are detailed only in the documentation."}</p></div></div>
    </section>

    <section className="section section-tint analysis-orientation" id="analysis-orientation"><div className="page-width"><div className="section-heading analysis-orientation-heading reveal"><div><Eyebrow>{c.orientK}</Eyebrow><h2>{c.orientT}</h2></div><p>{c.orientP}</p></div><div className="analysis-question-selector">{c.families.slice(1).map(([id, title, text], index) => <button type="button" className={activeFamily === id ? "active" : ""} onClick={() => selectFamily(id as AnalysisFamily)} aria-pressed={activeFamily === id} key={id}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p><i>→</i></button>)}</div></div></section>

    <section className="section page-width analysis-catalog-section" id="analysis-catalog">
      <div className="section-heading analysis-catalog-heading reveal"><div><Eyebrow>{c.catalogK}</Eyebrow><h2>{c.catalogT}</h2></div><p>{c.catalogP}</p></div>
      <div className="analysis-filter-panel reveal"><div className="analysis-filter-group"><div>{c.families.map(([id, title]) => <button type="button" className={activeFamily === id ? "active" : ""} onClick={() => setActiveFamily(id)} aria-pressed={activeFamily === id} key={id}>{title}</button>)}</div></div><div className="analysis-filter-status"><span><b>{visibleMethods.length}</b> {c.results}</span><button type="button" onClick={() => setActiveFamily("all")}>{c.reset} ↺</button></div></div>

      {visibleMethods.length > 0 ? <div className="analysis-method-grid">{visibleMethods.map((method, index) => <article className="analysis-method-card reveal" style={{ "--delay": `${(index % 2) * 55}ms` } as React.CSSProperties} key={method.id}>
        <div className="analysis-method-media">{method.image ? <img src={asset(`app-previews/${method.image}`)} alt="" loading="lazy" /> : <div className="analysis-network-visual" aria-hidden="true"><span /><span /><span /><span /><i /><i /><i /></div>}<span className="analysis-method-number">{method.number}</span><i className="analysis-method-icon">{method.icon}</i></div>
        <div className="analysis-method-body"><h3>{tx(method.title, language)}</h3><p className="analysis-method-question">{tx(method.question, language)}</p><p className="analysis-method-summary">{tx(method.summary, language)}</p><div className="analysis-method-actions"><a href={moduleHref(method.moduleKey)}>{c.openModule}<span>→</span></a><a href={guidePath} target="_blank" rel="noreferrer">{c.readGuide}<span>↗</span></a></div></div>
      </article>)}</div> : <div className="analysis-empty"><span>∅</span><p>{c.empty}</p><button type="button" onClick={() => setActiveFamily("all")}>{c.reset}</button></div>}
    </section>

    <section className="analysis-compatibility-section"><div className="page-width"><div className="section-heading reveal"><div><Eyebrow>{c.supportK}</Eyebrow><h2>{c.supportT}</h2></div><p>{c.supportP}</p></div><div className="analysis-limit-grid">{c.support.map(([number, title, text]) => <article className="reveal" key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>


    <section className="analysis-final-band"><div className="page-width"><div><Eyebrow>{c.k}</Eyebrow><h2>{c.finalTitle}</h2><p>{c.finalP}</p></div><div><a className="button primary" href="#/application/analyse">{c.finalModule}<span>→</span></a><a className="button secondary" href="#/documentation">{c.finalDocs}<span>→</span></a></div></div></section>
  </main>;
}

function ModuleVisual({ module, language }: { module: AppModule; language: Language }) {
  const screen = moduleScreens[module.key];
  if (screen) {
    const imagePath = asset(`app-previews/${screen.image}`);
    return <figure className="module-visual screen-preview"><div className="screen-crop"><img src={imagePath} alt={`${tx(screen.title, language)} — ${tx(screen.description, language)}`} decoding="async" /></div><figcaption><small>{language === "fr" ? "CAPTURE DE L’APPLICATION" : "APPLICATION SCREEN"}</small><b>{tx(screen.title, language)}</b><p>{tx(screen.description, language)}</p></figcaption></figure>;
  }
  if (module.image) return <div className="module-visual image"><img src={asset(`app-previews/${module.image}`)} alt={`${tx(module.title, language)} — ${tx(module.kicker, language)}`} /><div><span>{language === "fr" ? "APERÇU DE L’APPLICATION" : "APPLICATION PREVIEW"}</span><b>{tx(module.title, language)}</b></div></div>;
  return <div className={`module-visual schematic theme-${module.group}`} role="img" aria-label={language === "fr" ? `Schéma fonctionnel de l’onglet ${tx(module.title, language)}` : `Functional diagram of the ${tx(module.title, language)} tab`}><div className="schematic-bar"><span /><span /><span /><b>BarCodeR / {tx(module.title, language)}</b></div><div className="schematic-body"><aside><strong>{module.icon}</strong>{modules.slice(0, 8).map((m) => <i className={m.key === module.key ? "active" : ""} key={m.key} />)}</aside><div className="schematic-content"><small>{tx(module.kicker, language)}</small><h3>{tx(module.title, language)}</h3><div className="schematic-cards"><span /><span /><span /></div><div className="schematic-lines"><i /><i /><i /><i /></div></div></div></div>;
}

const moduleTraceability: Partial<Record<string, Localized>> = {
  openmetabar: analysisText("La configuration du run, son état et ses journaux permettent de suivre le traitement jusqu’au phyloseq récupéré et de conserver sa provenance dans le projet.", "Run configuration, status and logs make it possible to follow processing through to the retrieved phyloseq and retain its provenance in the project."),
  "input-data": analysisText("L’import conserve un récapitulatif des contrôles et ajustements appliqués avant que l’objet rejoigne le registre des datasets.", "Import keeps a summary of checks and adjustments applied before the object joins the dataset registry."),
  datasets: analysisText("L’onglet centralise l’état du projet et permet de le sauvegarder ou de l’exporter avec ses datasets et les historiques de figures associés.", "The tab centralises project state and lets it be saved or exported with its datasets and associated figure histories."),
  description: analysisText("Les vues descriptives peuvent être exportées pour documenter l’état du dataset examiné sans modifier celui-ci.", "Descriptive views can be exported to document the state of the examined dataset without modifying it."),
  "data-edition": analysisText("Les transformations effectuées sont consignées dans un journal afin de retrouver ce qui a été modifié avant de poursuivre les analyses.", "Applied transformations are recorded in a log so changes can be reviewed before continuing with analyses."),
  filtration: analysisText("Les critères utilisés, les éléments retirés et le bilan avant/après sont conservés dans le journal de filtration au moment de l’enregistrement.", "Applied criteria, removed elements and the before/after summary are retained in the filtering log when the result is saved."),
  exploration: analysisText("Une figure sauvegardée conserve son contexte, ses paramètres et le code R nécessaire à sa reproduction afin de pouvoir la retrouver dans l’historique et dans MultiView.", "A saved figure retains its context, parameters and the R code needed to reproduce it so it can be retrieved from history and MultiView."),
  analyse: analysisText("Les analyses enregistrées conservent leurs paramètres, diagnostics, résultats et code R afin de rendre les choix relisibles et les figures reproductibles.", "Recorded analyses retain their parameters, diagnostics, results and R code so choices remain reviewable and figures reproducible."),
  multiview: analysisText("Une composition peut être sauvegardée puis rouverte ou importée pour retrouver la même sélection et la même organisation de figures.", "A composition can be saved and later reopened or imported to restore the same figure selection and arrangement.")
};

const moduleTraceFlow: Partial<Record<string, Localized[]>> = {
  openmetabar: [analysisText("FASTQ", "FASTQ"), analysisText("run", "run"), analysisText("phyloseq", "phyloseq"), analysisText("projet", "project")],
  "input-data": [analysisText("fichier R", "R file"), analysisText("contrôle", "checks"), analysisText("dataset", "dataset"), analysisText("projet", "project")],
  datasets: [analysisText("datasets", "datasets"), analysisText("projet", "project"), analysisText("sauvegarde", "save"), analysisText("archive", "archive")],
  description: [analysisText("dataset", "dataset"), analysisText("vue d’ensemble", "overview"), analysisText("contrôle", "review"), analysisText("export", "export")],
  "data-edition": [analysisText("dataset", "dataset"), analysisText("modification", "edit"), analysisText("journal", "log"), analysisText("état enregistré", "saved state")],
  filtration: [analysisText("dataset", "dataset"), analysisText("critères", "criteria"), analysisText("bilan", "summary"), analysisText("version enregistrée", "saved version")],
  exploration: [analysisText("dataset", "dataset"), analysisText("paramètres", "parameters"), analysisText("figure", "figure"), analysisText("code R", "R code")],
  analyse: [analysisText("question", "question"), analysisText("paramètres", "parameters"), analysisText("résultats", "results"), analysisText("code R", "R code")],
  multiview: [analysisText("figures", "figures"), analysisText("sélection", "selection"), analysisText("composition", "composition"), analysisText("export", "export")]
};

function ModulePage({ module, language }: { module: AppModule; language: Language }) {
  const index = modules.findIndex(m => m.key === module.key);
  const previous = modules[(index - 1 + modules.length) % modules.length];
  const next = modules[(index + 1) % modules.length];
  const traceability = moduleTraceability[module.key];
  const traceFlow = moduleTraceFlow[module.key];
  const documentedModules = new Set(["openmetabar", "input-data", "datasets", "description", "data-edition", "filtration", "exploration", "analyse", "multiview"]);
  const moduleDocsHref = documentedModules.has(module.key) ? asset(`documentation/${language}/${module.key}/guides-methodologiques.html`) : "#/documentation";
  const c = language === "fr" ? {
    app: "Fonctionnement de BarCodeR",
    what: "Ce que cet onglet permet de faire",
    io: "Entrées, actions et résultats",
    inputs: "Vous partez de",
    operations: "Vous pouvez",
    outputs: "Vous obtenez",
    question: "Question directrice",
    modules: "Principales possibilités",
    vigilance: "À garder en tête",
    docs: "Besoin des détails ?",
    docsTitle: "La documentation prend le relais.",
    docsText: "Cette page présente le rôle de l’onglet sans entrer dans ses paramètres. Pour les méthodes, options, formats attendus et explications techniques, consultez la documentation BarCodeR.",
    docsAction: "Ouvrir la documentation",
    previous: "Onglet précédent",
    next: "Onglet suivant",
    reproduce: "Résultats et traçabilité",
    reproText: "Lorsque l’onglet produit des figures, tableaux ou analyses enregistrables, BarCodeR conserve leur contexte dans le projet afin de faciliter la comparaison, l’export et la reproduction du résultat."
  } : {
    app: "How BarCodeR works",
    what: "What this tab lets you do",
    io: "Inputs, actions and results",
    inputs: "You start from",
    operations: "You can",
    outputs: "You obtain",
    question: "Guiding question",
    modules: "Main possibilities",
    vigilance: "Keep in mind",
    docs: "Need the details?",
    docsTitle: "The documentation takes over.",
    docsText: "This page presents the role of the tab without going into its parameters. For methods, options, expected formats and technical explanations, consult the BarCodeR documentation.",
    docsAction: "Open documentation",
    previous: "Previous tab",
    next: "Next tab",
    reproduce: "Results and traceability",
    reproText: "When the tab produces figures, tables or recordable analyses, BarCodeR keeps their context in the project to support comparison, export and reproduction of the result."
  };

  return <main className={module.key === "openmetabar" ? "module-page openmetabar-page" : "module-page"}>
    <section className="module-hero page-width">
      <div className="module-hero-copy reveal"><div className="breadcrumbs"><a href="#/functioning">{c.app}</a><span>/</span><b>{tx(module.title, language)}</b></div>{module.key === "openmetabar" && <img className="openmetabar-page-logo" src={asset("app-previews/openmetabar-logo.png")} alt="" />}<Eyebrow>{module.order} · {tx(groups[module.group], language)}</Eyebrow><h1>{tx(module.title, language)}</h1><p className="module-kicker">{tx(module.kicker, language)}</p><p className="lead">{tx(module.purpose, language)}</p>{module.key === "openmetabar" && <div className="openmetabar-optional-note"><span>i</span><div><b>{language === "fr" ? "Module optionnel" : "Optional module"}</b><p>{language === "fr" ? "OpenMetaBar n’est nécessaire que si vous partez de fichiers FASTQ. Si vous disposez déjà d’un objet phyloseq, vous pouvez l’importer directement et utiliser le reste de BarCodeR sans passer par cet onglet." : "OpenMetaBar is only needed when starting from FASTQ files. If you already have a phyloseq object, you can import it directly and use the rest of BarCodeR without this tab."}</p></div></div>}<div className="question-callout"><span>?</span><div><small>{c.question}</small><b>{tx(module.question, language)}</b></div></div></div>
      <div className="reveal delay-1"><ModuleVisual module={module} language={language} /></div>
    </section>


    <section className="section page-width"><div className="section-intro"><Eyebrow>{c.io}</Eyebrow><h2>{c.io}</h2></div><div className="io-grid"><InfoColumn number="01" title={c.inputs} items={module.inputs} language={language} /><InfoColumn number="02" title={c.operations} items={module.actions.slice(0, 4)} language={language} accent /><InfoColumn number="03" title={c.outputs} items={module.outputs} language={language} /></div></section>

    {module.submodules && <section className="section submodule-section"><div className="page-width"><div className="section-intro light"><Eyebrow>{c.modules}</Eyebrow><h2>{c.modules}</h2></div><div className="submodule-grid">{module.submodules.map((sub, i) => <article className="submodule-card reveal" style={{ "--delay": `${(i % 3) * 55}ms` } as React.CSSProperties} key={sub.title.fr}>{sub.image ? <img src={asset(`app-previews/${sub.image}`)} alt="" /> : <div className="submodule-placeholder"><span>{module.icon}</span><i /></div>}<div><small>{String(i + 1).padStart(2, "0")}</small><h3>{tx(sub.title, language)}</h3><p>{tx(sub.question, language)}</p></div></article>)}</div></div></section>}

    <section className={`section page-width method-section${traceability ? "" : " single-panel"}`}><div className="method-panel caution"><Eyebrow>{c.vigilance}</Eyebrow><h2>{c.vigilance}</h2><ul>{module.cautions.map(item => <li key={item.fr}><span>!</span>{tx(item, language)}</li>)}</ul></div>{traceability && <div className="method-panel reproducibility"><Eyebrow>{c.reproduce}</Eyebrow><h2>{c.reproduce}</h2><p>{tx(traceability, language)}</p>{traceFlow && <div className="provenance-mini">{traceFlow.map((item, i) => <Fragment key={item.fr}><span>{tx(item, language)}</span>{i < traceFlow.length - 1 && <i>→</i>}</Fragment>)}</div>}</div>}</section>

    <section className="source-band"><div className="page-width"><div><Eyebrow>{c.docs}</Eyebrow><h2>{c.docsTitle}</h2><p>{c.docsText}</p></div><a href={moduleDocsHref} target={documentedModules.has(module.key) ? "_blank" : undefined} rel={documentedModules.has(module.key) ? "noreferrer" : undefined}><span>?</span><div><small>BarCodeR documentation</small><b>{c.docsAction} →</b></div></a></div></section>
    <nav className="page-pagination page-width" aria-label={language === "fr" ? "Navigation entre les onglets" : "Tab navigation"}><a href={moduleHref(previous.key)}><small>← {c.previous}</small><b>{tx(previous.title, language)}</b></a><a href={moduleHref(next.key)}><small>{c.next} →</small><b>{tx(next.title, language)}</b></a></nav>
  </main>;
}

function InfoColumn({ number, title, items, language, accent = false }: { number: string; title: string; items: Localized[]; language: Language; accent?: boolean }) {
  return <article className={accent ? "info-column accent" : "info-column"}><span>{number}</span><h3>{title}</h3><ul>{items.map(item => <li key={item.fr}>{tx(item, language)}</li>)}</ul></article>;
}

const publicFigures = [
  { file: "globalpatterns-composition.png", title: { fr: "Composition des communautés", en: "Community composition" }, method: { fr: "Répartition des principaux groupes taxonomiques selon les environnements.", en: "Distribution of the main taxonomic groups across environments." } },
  { file: "globalpatterns-ordination.png", title: { fr: "Organisation des échantillons", en: "Sample organisation" }, method: { fr: "Position relative des échantillons selon la composition de leurs communautés.", en: "Relative position of samples according to community composition." } },
  { file: "globalpatterns-alpha-diversity.png", title: { fr: "Diversité au sein des échantillons", en: "Within-sample diversity" }, method: { fr: "Comparaison de la richesse et de la diversité entre environnements.", en: "Comparison of richness and diversity across environments." } }
];

type TutorialCategory = "start" | "prepare" | "analyse";

type TutorialJourney = {
  id: string;
  category: TutorialCategory;
  duration: string;
  title: Localized;
  summary: Localized;
  dataset: Localized;
  goal: Localized;
  outputs: Localized[];
  steps: Localized[];
  modules: string[];
  caution: Localized;
};

type TestDataset = {
  id: string;
  title: Localized;
  input: Localized;
  purpose: Localized;
  coverage: Localized[];
};

const tutorialJourneys: TutorialJourney[] = [
  {
    id: "discover-globalpatterns", category: "start", duration: "15 min",
    title: { fr: "Découvrir BarCodeR avec GlobalPatterns", en: "Discover BarCodeR with GlobalPatterns" },
    summary: { fr: "Suivre un premier projet, de l’import d’un objet phyloseq public jusqu’à une synthèse de plusieurs résultats.", en: "Follow a first project from importing a public phyloseq object to a synthesis of several results." },
    dataset: { fr: "GlobalPatterns · phyloseq public", en: "GlobalPatterns · public phyloseq" },
    goal: { fr: "Comprendre où importer, contrôler, explorer, analyser, sauvegarder et comparer les résultats.", en: "Understand where to import, check, explore, analyse, save and compare results." },
    outputs: [
      { fr: "une vue d’ensemble du dataset", en: "an overview of the dataset" },
      { fr: "une visualisation de la composition", en: "a composition visualisation" },
      { fr: "une représentation des différences entre échantillons", en: "a representation of differences among samples" },
      { fr: "une composition MultiView", en: "a MultiView composition" }
    ],
    steps: [
      { fr: "Créer un projet de démonstration puis importer l’objet GlobalPatterns.", en: "Create a demonstration project and import the GlobalPatterns object." },
      { fr: "Ouvrir Description pour vérifier la structure générale et les informations disponibles.", en: "Open Description to review the overall structure and available information." },
      { fr: "Explorer la composition des communautés et leur diversité.", en: "Explore community composition and diversity." },
      { fr: "Visualiser l’organisation des échantillons selon leur composition.", en: "Visualise how samples are organised according to community composition." },
      { fr: "Sauvegarder plusieurs figures utiles au projet.", en: "Save several figures useful to the project." },
      { fr: "Retrouver ces figures dans MultiView et les réunir dans une même composition.", en: "Find these figures in MultiView and combine them into one composition." }
    ],
    modules: ["input-data", "description", "exploration", "analyse", "multiview"],
    caution: { fr: "Ce parcours sert à découvrir l’application. Il ne constitue pas une analyse écologique complète de GlobalPatterns.", en: "This journey is designed to discover the application. It is not a complete ecological analysis of GlobalPatterns." }
  },
  {
    id: "audit-phyloseq", category: "prepare", duration: "20 min",
    title: { fr: "Contrôler un phyloseq avant l’analyse", en: "Check a phyloseq object before analysis" },
    summary: { fr: "Examiner la structure, les échantillons, la taxonomie et les métadonnées afin d’identifier les points à corriger ou à surveiller.", en: "Review structure, samples, taxonomy and metadata to identify points that need correction or attention." },
    dataset: { fr: "GlobalPatterns ou votre propre phyloseq", en: "GlobalPatterns or your own phyloseq" },
    goal: { fr: "Savoir ce que contient réellement le dataset avant de commencer les analyses.", en: "Know what the dataset actually contains before starting analyses." },
    outputs: [
      { fr: "un contrôle de la structure de l’objet", en: "a check of the object structure" },
      { fr: "un bilan des échantillons", en: "a sample assessment" },
      { fr: "un bilan taxonomique", en: "a taxonomy assessment" },
      { fr: "une liste de points à examiner avant l’analyse", en: "a list of points to review before analysis" }
    ],
    steps: [
      { fr: "Importer l’objet et vérifier que ses composants sont reconnus et cohérents.", en: "Import the object and check that its components are recognised and consistent." },
      { fr: "Examiner la quantité d’information disponible pour chaque échantillon.", en: "Review the amount of information available for each sample." },
      { fr: "Observer la richesse, la dominance et la présence de nombreux zéros.", en: "Review richness, dominance and the presence of many zeros." },
      { fr: "Examiner jusqu’où les taxons sont identifiés.", en: "Review how far taxa are identified." },
      { fr: "Repérer les valeurs manquantes ou les métadonnées difficiles à exploiter.", en: "Identify missing values or metadata that may be difficult to use." },
      { fr: "Repérer les échantillons atypiques sans les exclure automatiquement.", en: "Identify atypical samples without excluding them automatically." }
    ],
    modules: ["description", "data-edition"],
    caution: { fr: "Un échantillon atypique n’est pas nécessairement erroné. Toute exclusion doit être justifiée par le contexte biologique ou expérimental.", en: "An atypical sample is not necessarily erroneous. Any exclusion should be justified by the biological or experimental context." }
  },
  {
    id: "filter-provenance", category: "prepare", duration: "25 min",
    title: { fr: "Préparer un dataset sans perdre l’original", en: "Prepare a dataset without losing the original" },
    summary: { fr: "Tester plusieurs niveaux de filtration, observer leur impact et conserver une version adaptée à la question étudiée.", en: "Try several filtering levels, review their impact and keep a version suited to the question being studied." },
    dataset: { fr: "GlobalPatterns", en: "GlobalPatterns" },
    goal: { fr: "Comprendre comment préparer les données tout en gardant une trace des choix réalisés.", en: "Understand how to prepare data while retaining a record of the choices made." },
    outputs: [
      { fr: "plusieurs versions comparables du dataset", en: "several comparable dataset versions" },
      { fr: "un bilan avant/après", en: "a before/after assessment" },
      { fr: "un historique des filtres appliqués", en: "a history of applied filters" },
      { fr: "une version retenue pour la suite du projet", en: "a version retained for the rest of the project" }
    ],
    steps: [
      { fr: "Conserver une version de référence du dataset initial.", en: "Keep a reference version of the initial dataset." },
      { fr: "Appliquer une première filtration légère et observer ce qui change.", en: "Apply a first light filtering step and review what changes." },
      { fr: "Tester une filtration plus sélective lorsque la question le justifie.", en: "Try a more selective filter when the question justifies it." },
      { fr: "Comparer les taxons et échantillons conservés entre les versions.", en: "Compare retained taxa and samples across versions." },
      { fr: "Vérifier que la filtration ne supprime pas un signal utile au projet.", en: "Check that filtering does not remove a signal useful to the project." },
      { fr: "Enregistrer la version retenue avec un nom qui permette de comprendre son rôle.", en: "Save the retained version with a name that makes its role clear." }
    ],
    modules: ["datasets", "filtration", "description"],
    caution: { fr: "Une filtration plus stricte n’est pas automatiquement meilleure. Elle doit rester cohérente avec la question scientifique.", en: "Stricter filtering is not automatically better. It should remain consistent with the scientific question." }
  },
  {
    id: "composition-alpha", category: "analyse", duration: "25 min",
    title: { fr: "Décrire et comparer les communautés", en: "Describe and compare communities" },
    summary: { fr: "Observer quels groupes taxonomiques dominent et comparer plusieurs dimensions de la diversité entre échantillons ou conditions.", en: "Review which taxonomic groups dominate and compare several dimensions of diversity across samples or conditions." },
    dataset: { fr: "GlobalPatterns", en: "GlobalPatterns" },
    goal: { fr: "Produire une première lecture biologique des communautés avant d’aller vers des analyses plus ciblées.", en: "Produce a first biological reading of communities before moving to more targeted analyses." },
    outputs: [
      { fr: "une visualisation de la composition taxonomique", en: "a taxonomic composition visualisation" },
      { fr: "un tableau de composition", en: "a composition table" },
      { fr: "plusieurs indicateurs de diversité", en: "several diversity indicators" },
      { fr: "une comparaison entre groupes lorsque cela est pertinent", en: "a group comparison when relevant" }
    ],
    steps: [
      { fr: "Choisir le niveau taxonomique adapté à la lecture recherchée.", en: "Choose the taxonomic level suited to the intended interpretation." },
      { fr: "Observer les groupes dominants et la part des taxons moins bien identifiés.", en: "Review dominant groups and the share of less well identified taxa." },
      { fr: "Comparer les profils entre échantillons ou groupes.", en: "Compare profiles across samples or groups." },
      { fr: "Examiner plusieurs dimensions de la diversité au sein des échantillons.", en: "Review several dimensions of within-sample diversity." },
      { fr: "Comparer les groupes lorsque les données et le plan d’étude le permettent.", en: "Compare groups when the data and study design allow it." },
      { fr: "Interpréter séparément composition et diversité.", en: "Interpret composition and diversity separately." }
    ],
    modules: ["exploration", "analyse"],
    caution: { fr: "Une différence de proportion ne signifie pas nécessairement qu’un groupe contient davantage d’organismes en valeur absolue.", en: "A difference in proportion does not necessarily mean that a group contains more organisms in absolute terms." }
  },
  {
    id: "beta-permanova", category: "analyse", duration: "35 min",
    title: { fr: "Tester si les communautés diffèrent entre groupes", en: "Test whether communities differ among groups" },
    summary: { fr: "Visualiser l’organisation des échantillons puis tester si les différences observées entre groupes sont soutenues par l’analyse.", en: "Visualise sample organisation and then test whether observed differences among groups are supported by the analysis." },
    dataset: { fr: "GlobalPatterns", en: "GlobalPatterns" },
    goal: { fr: "Ne pas conclure à partir de la seule séparation visuelle des échantillons.", en: "Avoid drawing conclusions from visual sample separation alone." },
    outputs: [
      { fr: "une représentation de l’organisation des échantillons", en: "a representation of sample organisation" },
      { fr: "un résultat de comparaison entre groupes", en: "a result comparing groups" },
      { fr: "un contrôle de l’hétérogénéité entre groupes", en: "a check of heterogeneity among groups" },
      { fr: "une lecture conjointe du graphique et des résultats statistiques", en: "a joint interpretation of the plot and statistical results" }
    ],
    steps: [
      { fr: "Définir clairement la variable ou les groupes à comparer.", en: "Clearly define the variable or groups to compare." },
      { fr: "Choisir dans BarCodeR une représentation adaptée à la question.", en: "Choose a representation in BarCodeR that is suited to the question." },
      { fr: "Observer la structure générale et les échantillons atypiques.", en: "Review the overall structure and atypical samples." },
      { fr: "Lancer le test de comparaison proposé dans le module Analyse.", en: "Run the comparison test provided in the Analysis module." },
      { fr: "Examiner le diagnostic de dispersion fourni avec le résultat.", en: "Review the dispersion diagnostic provided with the result." },
      { fr: "Interpréter ensemble la visualisation, l’intensité de l’effet et l’incertitude.", en: "Interpret the visualisation, effect strength and uncertainty together." }
    ],
    modules: ["analyse"],
    caution: { fr: "Une séparation visuelle entre groupes ne suffit pas à démontrer une différence, et un résultat significatif doit être interprété avec ses diagnostics.", en: "Visual separation among groups is not enough to demonstrate a difference, and a significant result should be interpreted together with its diagnostics." }
  },
  {
    id: "multiview-report", category: "start", duration: "20 min",
    title: { fr: "Construire une planche de résultats avec MultiView", en: "Build a results panel with MultiView" },
    summary: { fr: "Retrouver les figures sauvegardées, sélectionner celles qui répondent au projet et les organiser dans une composition commune.", en: "Retrieve saved figures, select those relevant to the project and arrange them in a shared composition." },
    dataset: { fr: "Tout projet contenant plusieurs figures sauvegardées", en: "Any project containing several saved figures" },
    goal: { fr: "Passer d’une succession de graphiques isolés à une synthèse visuelle organisée.", en: "Move from isolated plots to an organised visual synthesis." },
    outputs: [
      { fr: "une bibliothèque de figures organisée", en: "an organised figure library" },
      { fr: "une sélection de résultats", en: "a selection of results" },
      { fr: "une composition MultiView", en: "a MultiView composition" },
      { fr: "une image composite exportée", en: "an exported composite image" }
    ],
    steps: [
      { fr: "Sauvegarder plusieurs figures utiles depuis les différents onglets.", en: "Save several useful figures from the different tabs." },
      { fr: "Retrouver et filtrer ces figures dans MultiView.", en: "Find and filter these figures in MultiView." },
      { fr: "Utiliser tags et favoris pour identifier les résultats retenus.", en: "Use tags and favourites to identify retained results." },
      { fr: "Choisir une disposition et organiser les figures dans la grille.", en: "Choose a layout and arrange figures in the grid." },
      { fr: "Vérifier la lisibilité et l’ordre dans lequel les résultats sont présentés.", en: "Check readability and the order in which results are presented." },
      { fr: "Exporter la composition et sauvegarder sa configuration.", en: "Export the composition and save its configuration." }
    ],
    modules: ["multiview"],
    caution: { fr: "Une composition visuellement cohérente ne remplace pas l’interprétation de chaque résultat dans son propre contexte.", en: "A visually coherent composition does not replace interpretation of each result in its own context." }
  }
];

const testDatasets: TestDataset[] = [
  {
    id: "globalpatterns", title: { fr: "GlobalPatterns", en: "GlobalPatterns" },
    input: { fr: "Objet phyloseq public", en: "Public phyloseq object" },
    purpose: { fr: "Découvrir le fonctionnement de BarCodeR avec des données publiques et retrouver plusieurs types de résultats dans un même projet.", en: "Discover how BarCodeR works using public data and explore several types of results within one project." },
    coverage: [{ fr: "26 échantillons", en: "26 samples" }, { fr: "9 environnements", en: "9 environments" }, { fr: "plusieurs étapes du parcours BarCodeR", en: "several stages of the BarCodeR workflow" }]
  }
];

function EvidencePage({ language }: { language: Language }) {
  const [filter, setFilter] = useState<"all" | TutorialCategory>("all");
  const filteredTutorials = useMemo(() => tutorialJourneys.filter(tutorial => filter === "all" || tutorial.category === filter), [filter, language]);
  const availableDatasets = testDatasets;

  const c = language === "fr" ? {
    k: "Tutoriels",
    title: "Découvrir BarCodeR avec des parcours guidés.",
    p: "Les tutoriels partent d’un objectif concret et montrent comment enchaîner les étapes utiles dans l’application. Ils sont là pour apprendre le fonctionnement de BarCodeR ; la documentation reste la référence pour les paramètres et les détails méthodologiques.",
    published: "parcours guidés",
    publicDataset: "dataset public de démonstration",
    referenceOutputs: "figures de référence",
    startK: "Par où commencer ?",
    startT: "Choisissez le parcours qui ressemble le plus à votre situation.",
    startRoutes: [
      ["Je découvre BarCodeR", "Suivre un premier projet avec un dataset public et parcourir les principales étapes de l’application.", "discover-globalpatterns", "Commencer"],
      ["J’ai déjà un phyloseq", "Importer un objet existant, obtenir une vue d’ensemble puis préparer le dataset avant l’analyse.", "audit-phyloseq", "Voir le parcours"],
      ["J’ai une question biologique", "Passer de l’exploration des communautés à une analyse adaptée à l’hypothèse étudiée.", "beta-permanova", "Voir un exemple"]
    ],
    libraryK: "Parcours disponibles",
    libraryT: "Des exemples courts reliés aux vrais onglets de BarCodeR.",
    libraryP: "Chaque parcours relie un objectif concret aux onglets réellement utilisés dans BarCodeR, avec les résultats attendus et les points de vigilance utiles.",
    filters: [["all", "Tous"], ["start", "Prise en main"], ["prepare", "Préparer les données"], ["analyse", "Explorer et analyser"]],
    statusPublished: "Parcours disponible",
    category: { start: "Prise en main", prepare: "Préparation", analyse: "Exploration et analyse" },
    dataset: "Dataset",
    objective: "Ce que vous allez faire",
    outputs: "À la fin du parcours",
    steps: "Voir les étapes",
    modules: "Onglets utilisés",
    caution: "À garder en tête",
    documentation: "Documentation",
    noResult: "Aucun tutoriel disponible ne correspond à ce filtre.",
    datasetsK: "Dataset de démonstration",
    datasetsT: "Commencer sans utiliser ses propres données.",
    datasetsP: "GlobalPatterns fournit un objet phyloseq public pratique pour découvrir l’interface et reproduire plusieurs résultats de référence.",
    datasetInput: "Format",
    datasetCoverage: "Permet notamment de découvrir",
    datasetAction: "Commencer avec GlobalPatterns",
    demo: "Exemple reproductible",
    demoT: "Quelques résultats obtenus à partir du même objet public.",
    demoP: "Ces figures servent à montrer le type de sorties que BarCodeR peut produire. Elles ne constituent pas une démonstration interactive de l’application, mais un point de repère pour suivre les tutoriels.",
    method: "Ce que montre la figure",
    facts: [["26", "échantillons"], ["9", "types d’environnements"], ["1", "objet phyloseq public"]],
    resourcesK: "Continuer",
    resourcesT: "Passer du tutoriel à l’utilisation de BarCodeR.",
    showcase: "Voir les cas d’usage",
    docs: "Consulter la documentation",
    install: "Installer BarCodeR"
  } : {
    k: "Tutorials",
    title: "Discover BarCodeR through guided journeys.",
    p: "Tutorials start from a concrete objective and show how to connect the useful steps in the application. They are designed to teach the BarCodeR workflow; the documentation remains the reference for parameters and methodological details.",
    published: "guided journeys",
    publicDataset: "public demonstration dataset",
    referenceOutputs: "reference figures",
    startK: "Where should you start?",
    startT: "Choose the journey closest to your situation.",
    startRoutes: [
      ["I am discovering BarCodeR", "Follow a first project with a public dataset and visit the main stages of the application.", "discover-globalpatterns", "Start"],
      ["I already have a phyloseq object", "Import an existing object, get an overview and prepare the dataset before analysis.", "audit-phyloseq", "View journey"],
      ["I have a biological question", "Move from community exploration to an analysis suited to the hypothesis being studied.", "beta-permanova", "View example"]
    ],
    libraryK: "Available journeys",
    libraryT: "Short examples linked to the actual BarCodeR tabs.",
    libraryP: "Each journey connects a concrete objective to the BarCodeR tabs actually used, together with expected outputs and useful points of attention.",
    filters: [["all", "All"], ["start", "Getting started"], ["prepare", "Prepare data"], ["analyse", "Explore and analyse"]],
    statusPublished: "Available journey",
    category: { start: "Getting started", prepare: "Preparation", analyse: "Exploration and analysis" },
    dataset: "Dataset",
    objective: "What you will do",
    outputs: "By the end of the journey",
    steps: "View steps",
    modules: "Tabs used",
    caution: "Keep in mind",
    documentation: "Documentation",
    noResult: "No available tutorial matches this filter.",
    datasetsK: "Demonstration dataset",
    datasetsT: "Start without using your own data.",
    datasetsP: "GlobalPatterns provides a public phyloseq object that is useful for discovering the interface and reproducing several reference outputs.",
    datasetInput: "Format",
    datasetCoverage: "Useful for discovering",
    datasetAction: "Start with GlobalPatterns",
    demo: "Reproducible example",
    demoT: "A few results generated from the same public object.",
    demoP: "These figures illustrate the kinds of outputs BarCodeR can produce. They are not an interactive application demo, but a reference point for following the tutorials.",
    method: "What the figure shows",
    facts: [["26", "samples"], ["9", "environment types"], ["1", "public phyloseq object"]],
    resourcesK: "Continue",
    resourcesT: "Move from the tutorial to using BarCodeR.",
    showcase: "View use cases",
    docs: "Read documentation",
    install: "Install BarCodeR"
  };

  const scrollToTutorial = (id: string) => document.getElementById(`tutorial-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return <main className="tutorial-page">
    <section className="page-hero page-width tutorial-hero tutorial-hero-v2">
      <Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p className="lead">{c.p}</p>
      <div className="tutorial-summary tutorial-summary-v2"><div><b>{tutorialJourneys.length}</b><span>{c.published}</span></div><div><b>{availableDatasets.length}</b><span>{c.publicDataset}</span></div><div><b>{publicFigures.length}</b><span>{c.referenceOutputs}</span></div></div>
    </section>

    <section className="section tutorial-start-section"><div className="page-width"><div className="section-heading reveal"><div><Eyebrow>{c.startK}</Eyebrow><h2>{c.startT}</h2></div></div><div className="tutorial-start-grid">{c.startRoutes.map(([title, text, id, action], index) => <article className="tutorial-start-card reveal" style={{ "--delay": `${index * 65}ms` } as React.CSSProperties} key={id}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><button type="button" onClick={() => scrollToTutorial(id)}>{action}<i>↓</i></button></article>)}</div></div></section>

    <section className="section section-tint tutorial-library-section"><div className="page-width"><div className="tutorial-library-header"><div><Eyebrow>{c.libraryK}</Eyebrow><h2>{c.libraryT}</h2><p>{c.libraryP}</p></div><div className="tutorial-filters" role="group" aria-label={language === "fr" ? "Filtrer les tutoriels par objectif" : "Filter tutorials by goal"}>{c.filters.map(([value, label]) => <button type="button" className={filter === value ? "active" : ""} aria-pressed={filter === value} onClick={() => setFilter(value as "all" | TutorialCategory)} key={value}>{label}</button>)}</div></div>
      <div className="journey-grid">{filteredTutorials.map((tutorial, index) => <article id={`tutorial-${tutorial.id}`} className="journey-card published" style={{ "--delay": `${(index % 3) * 55}ms` } as React.CSSProperties} key={tutorial.id}><div className="journey-card-head"><span className="journey-status published">{c.statusPublished}</span><span className="journey-duration">{tutorial.duration}</span></div><div className="journey-tags"><span>{c.category[tutorial.category]}</span></div><h3>{tx(tutorial.title, language)}</h3><p className="journey-summary">{tx(tutorial.summary, language)}</p><dl className="journey-meta"><div><dt>{c.dataset}</dt><dd>{tx(tutorial.dataset, language)}</dd></div><div><dt>{c.objective}</dt><dd>{tx(tutorial.goal, language)}</dd></div></dl><div className="journey-outputs"><b>{c.outputs}</b><ul>{tutorial.outputs.map(output => <li key={output.fr}>{tx(output, language)}</li>)}</ul></div><details className="journey-details"><summary>{c.steps}<span>+</span></summary><ol>{tutorial.steps.map(step => <li key={step.fr}>{tx(step, language)}</li>)}</ol><div className="journey-caution"><span>!</span><div><b>{c.caution}</b><p>{tx(tutorial.caution, language)}</p></div></div></details><div className="journey-links"><div><small>{c.modules}</small>{tutorial.modules.map(key => { const module = modules.find(item => item.key === key); return module ? <a href={moduleHref(key)} key={key}>{tx(module.title, language)}</a> : null; })}</div><a className="journey-doc-link" href="#/documentation">{c.documentation}<span>→</span></a></div></article>)}</div>
      {filteredTutorials.length === 0 && <p className="tutorial-empty">{c.noResult}</p>}
    </div></section>

    <section className="section section-dark dataset-library-section"><div className="page-width"><div className="section-heading light reveal"><div><Eyebrow>{c.datasetsK}</Eyebrow><h2>{c.datasetsT}</h2></div><p>{c.datasetsP}</p></div><div className="dataset-library-grid">{availableDatasets.map((dataset, index) => <article className="dataset-library-card available reveal" style={{ "--delay": `${index * 55}ms` } as React.CSSProperties} key={dataset.id}><div className="dataset-library-head"><span>{language === "fr" ? "Disponible" : "Available"}</span><i>{String(index + 1).padStart(2, "0")}</i></div><h3>{tx(dataset.title, language)}</h3><small>{c.datasetInput}</small><b>{tx(dataset.input, language)}</b><p>{tx(dataset.purpose, language)}</p><div><small>{c.datasetCoverage}</small><ul>{dataset.coverage.map(item => <li key={item.fr}>{tx(item, language)}</li>)}</ul></div>{dataset.id === "globalpatterns" && <button type="button" className="dataset-start-action" onClick={() => scrollToTutorial("discover-globalpatterns")}>{c.datasetAction}<span>↓</span></button>}</article>)}</div></div></section>

    <section className="section page-width tutorial-demo-section"><div className="dataset-demo dataset-demo-v2"><div><Eyebrow>{c.demo}</Eyebrow><h2>{c.demoT}</h2><p>{c.demoP}</p></div><div className="fact-row">{c.facts.map(([n, label]) => <div key={label}><b>{n}</b><span>{label}</span></div>)}</div></div></section>
    <section className="figure-gallery page-width tutorial-figure-gallery">{publicFigures.map((figure, i) => <figure className="public-figure reveal" style={{ "--delay": `${i * 70}ms` } as React.CSSProperties} key={figure.file}><div><img src={asset(`figures/${figure.file}`)} alt={tx(figure.title, language)} /></div><figcaption><span>0{i + 1}</span><h2>{tx(figure.title, language)}</h2><small>{c.method}</small><p>{tx(figure.method, language)}</p></figcaption></figure>)}</section>

    <section className="section section-tint tutorial-resources-section"><div className="page-width tutorial-resources tutorial-resources-v2"><div><Eyebrow>{c.resourcesK}</Eyebrow><h2>{c.resourcesT}</h2></div><div className="evidence-links"><a className="button primary" href="#/download">{c.install}<span>→</span></a><a className="button secondary" href="#/showcase">{c.showcase}<span>→</span></a><a className="button secondary" href="#/documentation">{c.docs}<span>→</span></a></div></div></section>
  </main>;
}

type DocumentationManifest = {
  documentation_version: string;
  generated_for_app_version: string;
  generated: string;
  languages: string[];
  modules: string[];
  sections: string[];
};

type DocumentationSection = "guide" | "reference";
type DocumentationProfile = "all" | "biology" | "bioinformatics" | "platform" | "development";

type DocumentationTarget = {
  id: string;
  module: string;
  section: DocumentationSection;
  anchor?: string;
  title: Localized;
  description: Localized;
  profiles: DocumentationProfile[];
  keywords: Localized;
};

const documentationTargets: DocumentationTarget[] = [
  {
    id: "import",
    module: "input-data",
    section: "guide",
    anchor: "section-5",
    title: { fr: "Importer un objet phyloseq", en: "Import a phyloseq object" },
    description: { fr: "Formats acceptés, détection du contenu et différence entre dataset et projet.", en: "Accepted formats, content detection and the difference between a dataset and a project." },
    profiles: ["biology", "bioinformatics"],
    keywords: { fr: "import rds rdata phyloseq fichier entrée", en: "import rds rdata phyloseq file input" }
  },
  {
    id: "projects",
    module: "datasets",
    section: "guide",
    anchor: "section-3",
    title: { fr: "Comprendre datasets et projets", en: "Understand datasets and projects" },
    description: { fr: "Dataset actif, registre, sessions, projets et organisation des versions dérivées.", en: "Active dataset, registry, sessions, projects and organisation of derived versions." },
    profiles: ["biology", "bioinformatics", "platform"],
    keywords: { fr: "dataset projet registre session actif lignée version", en: "dataset project registry session active lineage version" }
  },
  {
    id: "audit",
    module: "description",
    section: "guide",
    anchor: "section-6",
    title: { fr: "Auditer les données avant analyse", en: "Audit data before analysis" },
    description: { fr: "Profondeur, richesse, sparsité, taxonomie, métadonnées, séquences et outliers.", en: "Depth, richness, sparsity, taxonomy, metadata, sequences and outliers." },
    profiles: ["biology", "bioinformatics"],
    keywords: { fr: "diagnostic qualité profondeur richesse sparsité outlier taxonomie", en: "diagnostic quality depth richness sparsity outlier taxonomy" }
  },
  {
    id: "edit",
    module: "data-edition",
    section: "guide",
    anchor: "section-2",
    title: { fr: "Corriger ou compléter un objet", en: "Correct or complete an object" },
    description: { fr: "Édition des composants, modifications immédiates, historique et annulation.", en: "Component editing, immediate changes, history and undo." },
    profiles: ["bioinformatics"],
    keywords: { fr: "édition correction otu taxonomie métadonnées séquences arbre historique", en: "editing correction otu taxonomy metadata sequences tree history" }
  },
  {
    id: "filter",
    module: "filtration",
    section: "guide",
    anchor: "section-3",
    title: { fr: "Filtrer sans perdre la provenance", en: "Filter without losing provenance" },
    description: { fr: "Ordre des filtres, abondance, prévalence, taxonomie, séquences et création d’un dérivé.", en: "Filter order, abundance, prevalence, taxonomy, sequences and creation of a derived dataset." },
    profiles: ["biology", "bioinformatics"],
    keywords: { fr: "filtration abondance prévalence taxonomie séquence dérivé provenance", en: "filter abundance prevalence taxonomy sequence derived provenance" }
  },
  {
    id: "explore",
    module: "exploration",
    section: "guide",
    anchor: "section-4",
    title: { fr: "Explorer les communautés", en: "Explore communities" },
    description: { fr: "Composition taxonomique, diversité alpha, Venn, UpSet, Heat Tree et phylogénie.", en: "Taxonomic composition, alpha diversity, Venn, UpSet, Heat Tree and phylogeny." },
    profiles: ["biology"],
    keywords: { fr: "barplot alpha diversité venn upset heat tree phylogénie exploration", en: "barplot alpha diversity venn upset heat tree phylogeny exploration" }
  },
  {
    id: "analyse",
    module: "analyse",
    section: "guide",
    anchor: "section-17",
    title: { fr: "Choisir et conduire une analyse", en: "Choose and conduct an analysis" },
    description: { fr: "Différentiel, ordination, PERMANOVA, matrices, réseaux, clustering et checklists.", en: "Differential analysis, ordination, PERMANOVA, matrices, networks, clustering and checklists." },
    profiles: ["biology", "bioinformatics"],
    keywords: { fr: "analyse ordination pcoa nmds bray-curtis aitchison permanova différentiel ancom-bc2 aldex2 linda maaslin corncob réseau clustering matrice méthode", en: "analysis ordination pcoa nmds bray-curtis aitchison permanova differential ancom-bc2 aldex2 linda maaslin corncob network clustering matrix method" }
  },
  {
    id: "openmetabar",
    module: "openmetabar",
    section: "guide",
    anchor: "section-3",
    title: { fr: "Lancer et suivre OpenMetaBar", en: "Launch and monitor OpenMetaBar" },
    description: { fr: "Connexion SSH, configuration, routes, Slurm, Nextflow, monitoring et récupération du phyloseq.", en: "SSH connection, configuration, routes, Slurm, Nextflow, monitoring and phyloseq retrieval." },
    profiles: ["bioinformatics", "platform"],
    keywords: { fr: "openmetabar ssh cluster slurm nextflow fastq monitoring pipeline", en: "openmetabar ssh cluster slurm nextflow fastq monitoring pipeline" }
  },
  {
    id: "multiview",
    module: "multiview",
    section: "guide",
    anchor: "section-10",
    title: { fr: "Composer et partager les résultats", en: "Compose and share results" },
    description: { fr: "Bibliothèque de figures, grilles, favoris, tags, compositions et export PNG.", en: "Figure library, grids, favourites, tags, compositions and PNG export." },
    profiles: ["biology", "platform"],
    keywords: { fr: "multiview figure grille composition export png favori tag", en: "multiview figure grid composition export png favourite tag" }
  },
  {
    id: "technical",
    module: "analyse",
    section: "reference",
    anchor: "top",
    title: { fr: "Inspecter les paramètres techniques", en: "Inspect technical parameters" },
    description: { fr: "Référence précise des entrées, options, dépendances, sorties et mécanismes internes.", en: "Precise reference for inputs, options, dependencies, outputs and internal mechanisms." },
    profiles: ["bioinformatics", "platform", "development"],
    keywords: { fr: "référence technique paramètres dépendances code architecture développeur", en: "technical reference parameters dependencies code architecture developer" }
  }
];

const documentationModuleLabels: Record<string, Localized> = {
  "openmetabar": { fr: "OpenMetaBar", en: "OpenMetaBar" },
  "input-data": { fr: "Import de données", en: "Input data" },
  "datasets": { fr: "Datasets et projets", en: "Datasets and projects" },
  "description": { fr: "Description", en: "Description" },
  "data-edition": { fr: "Édition des données", en: "Data editing" },
  "filtration": { fr: "Filtration", en: "Filtering" },
  "exploration": { fr: "Exploration", en: "Exploration" },
  "analyse": { fr: "Analyse", en: "Analysis" },
  "multiview": { fr: "MultiView", en: "MultiView" }
};

function DocumentationPage({ language }: { language: Language }) {
  const [manifest, setManifest] = useState<DocumentationManifest | null>(null);
  const [query, setQuery] = useState("");
  const [profile, setProfile] = useState<DocumentationProfile>("all");
  const [activeTarget, setActiveTarget] = useState<DocumentationTarget>(documentationTargets[7]);
  const [activeSection, setActiveSection] = useState<DocumentationSection>("guide");

  useEffect(() => {
    let cancelled = false;
    fetch(asset("documentation/manifest.json"))
      .then(response => {
        if (!response.ok) throw new Error(`Documentation manifest: ${response.status}`);
        return response.json() as Promise<DocumentationManifest>;
      })
      .then(data => { if (!cancelled) setManifest(data); })
      .catch(() => { if (!cancelled) setManifest(null); });
    return () => { cancelled = true; };
  }, []);

  const c = language === "fr" ? {
    k: "Documentation BarCodeR",
    title: "Trouvez d’abord la bonne réponse. Ouvrez ensuite la documentation complète.",
    p: "Entrez par votre besoin, votre profil ou le module concerné. Le site charge directement le guide méthodologique ou la référence technique correspondante, tout en conservant la recherche et le sommaire de la documentation originale.",
    modules: "modules documentés",
    sections: "niveaux documentaires",
    languages: "langues disponibles",
    version: "version documentaire",
    open: "Ouvrir en plein écran",
    appTab: "Voir l’onglet dans l’application",
    source: "Contenu généré pour",
    generated: "Documentation générée le",
    finderK: "Point d’entrée",
    finderT: "Que cherchez-vous à faire ?",
    finderP: "La recherche ci-dessous filtre les parcours documentaires. Une fois la page ouverte, la recherche interne du lecteur permet d’explorer tout son contenu.",
    searchLabel: "Rechercher un besoin ou une méthode",
    searchPlaceholder: "Ex. filtrer, Bray-Curtis, import, Slurm…",
    profiles: "Filtrer par profil",
    all: "Tous",
    profileLabels: { biology: "Biologiste / écologue", bioinformatics: "Bioinformaticien", platform: "Plateforme", development: "Développeur" } as Record<Exclude<DocumentationProfile, "all">, string>,
    noResult: "Aucun parcours ne correspond à cette recherche. Utilisez la navigation par module ou ouvrez la documentation complète.",
    openTarget: "Consulter cette section",
    quickK: "Accès direct",
    quickT: "Naviguer par module",
    quickP: "Chaque module possède un guide méthodologique et une référence technique. Le choix reste modifiable dans le lecteur.",
    guide: "Guide méthodologique",
    reference: "Référence technique",
    readerK: "Lecteur documentaire",
    readerT: "Documentation intégrée",
    readerP: "Le lecteur conserve le sommaire, la recherche plein texte dans la page, le changement de langue et le thème clair ou sombre.",
    current: "Section affichée",
    loading: "Chargement de la documentation BarCodeR",
    methodsK: "Deux niveaux complémentaires",
    methodsT: "Comprendre la méthode ou inspecter son implémentation.",
    methods: [
      ["01", "Guide méthodologique", "Questions scientifiques, prérequis, ordre des opérations, diagnostics, limites et interprétation."],
      ["02", "Référence technique", "Entrées, paramètres, dépendances, événements réactifs, objets produits et détails d’implémentation."]
    ] as [string, string, string][]
  } : {
    k: "BarCodeR documentation",
    title: "Find the right answer first. Then open the complete documentation.",
    p: "Start from your need, profile or the relevant module. The website loads the corresponding methodological guide or technical reference directly while preserving the original documentation search and table of contents.",
    modules: "documented modules",
    sections: "documentation levels",
    languages: "available languages",
    version: "documentation version",
    open: "Open full screen",
    appTab: "View the application tab",
    source: "Content generated for",
    generated: "Documentation generated on",
    finderK: "Entry point",
    finderT: "What are you trying to do?",
    finderP: "The search below filters documentation journeys. Once a page is open, the reader's internal search explores its full content.",
    searchLabel: "Search for a need or method",
    searchPlaceholder: "E.g. filtering, Bray-Curtis, import, Slurm…",
    profiles: "Filter by profile",
    all: "All",
    profileLabels: { biology: "Biologist / ecologist", bioinformatics: "Bioinformatician", platform: "Platform", development: "Developer" } as Record<Exclude<DocumentationProfile, "all">, string>,
    noResult: "No journey matches this search. Use module navigation or open the complete documentation.",
    openTarget: "Open this section",
    quickK: "Direct access",
    quickT: "Browse by module",
    quickP: "Each module has a methodological guide and a technical reference. The selection can still be changed inside the reader.",
    guide: "Methodological guide",
    reference: "Technical reference",
    readerK: "Documentation reader",
    readerT: "Embedded documentation",
    readerP: "The reader retains its table of contents, full-text search within the page, language switcher and light or dark theme.",
    current: "Displayed section",
    loading: "Loading BarCodeR documentation",
    methodsK: "Two complementary levels",
    methodsT: "Understand the method or inspect its implementation.",
    methods: [
      ["01", "Methodological guide", "Scientific questions, requirements, operation order, diagnostics, limitations and interpretation."],
      ["02", "Technical reference", "Inputs, parameters, dependencies, reactive events, produced objects and implementation details."]
    ] as [string, string, string][]
  };

  const filteredTargets = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(language);
    return documentationTargets.filter(target => {
      const profileMatch = profile === "all" || target.profiles.includes(profile);
      const haystack = `${tx(target.title, language)} ${tx(target.description, language)} ${tx(target.keywords, language)} ${tx(documentationModuleLabels[target.module], language)}`.toLocaleLowerCase(language);
      return profileMatch && (!normalized || haystack.includes(normalized));
    });
  }, [language, profile, query]);

  const buildDocumentationUrl = (target: DocumentationTarget, section: DocumentationSection = target.section) => {
    const params = new URLSearchParams({ lang: language, module: target.module, section });
    if (target.anchor && section === target.section) params.set("anchor", target.anchor);
    return `${asset("documentation/index.html")}?${params.toString()}`;
  };

  const documentationUrl = buildDocumentationUrl(activeTarget, activeSection);
  const fullDocumentationUrl = `${asset("documentation/index.html")}?lang=${language}&module=${activeTarget.module}&section=${activeSection}`;
  const metrics = [
    [String(manifest?.modules.length ?? 9), c.modules],
    [String(manifest?.sections.length ?? 2), c.sections],
    [String(manifest?.languages.length ?? 5), c.languages],
    [manifest?.documentation_version ? `v${manifest.documentation_version}` : "v1.9.0", c.version]
  ];

  const selectTarget = (target: DocumentationTarget, section: DocumentationSection = target.section) => {
    setActiveTarget(target);
    setActiveSection(section);
    window.setTimeout(() => document.getElementById("documentation-reader")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const selectModule = (module: string, section: DocumentationSection) => {
    const target = documentationTargets.find(item => item.module === module) ?? {
      id: module,
      module,
      section,
      title: documentationModuleLabels[module],
      description: documentationModuleLabels[module],
      profiles: ["all"],
      keywords: documentationModuleLabels[module]
    };
    selectTarget({ ...target, section, anchor: undefined }, section);
  };

  return <main className="documentation-page">
    <section className="documentation-hero page-width">
      <div className="documentation-hero-layout">
        <div className="documentation-hero-copy">
          <Eyebrow>{c.k}</Eyebrow>
          <h1>{c.title}</h1>
          <p className="lead">{c.p}</p>
          <div className="documentation-actions">
            <a className="button primary" href={fullDocumentationUrl} target="_blank" rel="noreferrer">{c.open}<span>↗</span></a>
            <a className="button secondary" href="#/application/documentation">{c.appTab}<span>→</span></a>
          </div>
        </div>
        <div className="documentation-level-preview">
          <Eyebrow>{c.methodsK}</Eyebrow>
          <h2>{c.methodsT}</h2>
          {c.methods.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
      </div>
      <div className="documentation-metrics">{metrics.map(([number, label]) => <div key={label}><b>{number}</b><span>{label}</span></div>)}</div>
      {manifest && <p className="documentation-version-line"><span>{c.source} <strong>{manifest.generated_for_app_version}</strong></span><span>{c.generated} <strong>{manifest.generated}</strong></span></p>}
    </section>

    <section className="documentation-finder-section">
      <div className="page-width">
        <div className="documentation-finder-heading">
          <div><Eyebrow>{c.finderK}</Eyebrow><h2>{c.finderT}</h2></div>
          <p>{c.finderP}</p>
        </div>
        <div className="documentation-search-panel">
          <label htmlFor="documentation-search"><span>{c.searchLabel}</span><input id="documentation-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={c.searchPlaceholder} /></label>
          <div className="documentation-profile-filter" aria-label={c.profiles}>
            <span>{c.profiles}</span>
            <button className={profile === "all" ? "active" : ""} type="button" onClick={() => setProfile("all")}>{c.all}</button>
            {(Object.keys(c.profileLabels) as Exclude<DocumentationProfile, "all">[]).map(key => <button className={profile === key ? "active" : ""} type="button" onClick={() => setProfile(key)} key={key}>{c.profileLabels[key]}</button>)}
          </div>
        </div>
        <div className="documentation-target-grid">
          {filteredTargets.map((target, index) => <article className={`documentation-target-card ${activeTarget.id === target.id ? "selected" : ""}`} key={target.id}>
            <header><span>{String(index + 1).padStart(2, "0")}</span><small>{tx(documentationModuleLabels[target.module], language)}</small></header>
            <h3>{tx(target.title, language)}</h3>
            <p>{tx(target.description, language)}</p>
            <footer><span>{target.section === "guide" ? c.guide : c.reference}</span><button type="button" onClick={() => selectTarget(target)}>{c.openTarget}<i>→</i></button></footer>
          </article>)}
        </div>
        {filteredTargets.length === 0 && <p className="documentation-empty">{c.noResult}</p>}
      </div>
    </section>

    <section className="documentation-modules-section">
      <div className="page-width">
        <div className="documentation-modules-heading"><div><Eyebrow>{c.quickK}</Eyebrow><h2>{c.quickT}</h2></div><p>{c.quickP}</p></div>
        <div className="documentation-module-grid">
          {(manifest?.modules ?? Object.keys(documentationModuleLabels)).map((module, index) => <article key={module}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{tx(documentationModuleLabels[module] ?? { fr: module, en: module }, language)}</h3>
            <div><button type="button" onClick={() => selectModule(module, "guide")}>{c.guide}</button><button type="button" onClick={() => selectModule(module, "reference")}>{c.reference}</button></div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="documentation-reader-section" id="documentation-reader">
      <div className="page-width">
        <div className="documentation-reader-intro">
          <div><Eyebrow>{c.readerK}</Eyebrow><h2>{c.readerT}</h2></div>
          <p>{c.readerP}</p>
        </div>
        <div className="documentation-reader-toolbar">
          <div><small>{c.current}</small><strong>{tx(documentationModuleLabels[activeTarget.module], language)} · {activeSection === "guide" ? c.guide : c.reference}</strong></div>
          <div className="documentation-section-switch" role="group" aria-label={c.current}><button className={activeSection === "guide" ? "active" : ""} type="button" onClick={() => setActiveSection("guide")}>{c.guide}</button><button className={activeSection === "reference" ? "active" : ""} type="button" onClick={() => setActiveSection("reference")}>{c.reference}</button></div>
          <a href={documentationUrl} target="_blank" rel="noreferrer">{c.open}<span>↗</span></a>
        </div>
        <div className="documentation-browser">
          <div className="documentation-browser-bar"><span /><span /><span /><b>docs.barcoder.local/{language}/{activeTarget.module}</b><a href={documentationUrl} target="_blank" rel="noreferrer" aria-label={c.open}>↗</a></div>
          <iframe key={`${language}-${documentationUrl}`} src={documentationUrl} title={c.loading} loading="lazy" />
        </div>
      </div>
    </section>
  </main>;
}


type ShowcaseCategory = "all" | "quality" | "exploration" | "analysis" | "report";

function ShowcasePage({ language }: { language: Language }) {
  const [category, setCategory] = useState<ShowcaseCategory>("all");
  const [selectedOutput, setSelectedOutput] = useState("composition");

  const c = language === "fr" ? {
    heroK: "BarCodeR en situation",
    heroT: <>Des données aux résultats,<br /><em>à travers des cas concrets.</em></>,
    heroP: "Trois situations montrent comment les différents onglets s’enchaînent pour décrire des communautés, comparer des conditions ou mettre plusieurs datasets en regard. Les réglages techniques restent dans la documentation.",
    heroPrimary: "Voir les cas d’usage",
    heroSecondary: "Parcourir les résultats",
    casesK: "Exemples de parcours",
    casesT: "Une question scientifique mobilise souvent plusieurs onglets.",
    casesP: "Les exemples ci-dessous montrent comment BarCodeR peut organiser un raisonnement analytique. Ils ne constituent pas des recettes obligatoires : le parcours dépend des données et de la question étudiée.",
    input: "Point de départ",
    outputs: "Ce que l’on peut obtenir",
    openAnalysis: "Explorer les analyses",
    openTutorials: "Voir un tutoriel",
    cases: [
      {
        number: "01", title: "Suivi environnemental", question: "Les communautés évoluent-elles entre sites, campagnes ou saisons ?",
        audience: "Écologie · biodiversité · surveillance", input: "Un objet phyloseq accompagné de métadonnées environnementales.",
        steps: ["Obtenir une vue d’ensemble", "Préparer le dataset", "Explorer composition et diversité", "Visualiser la structure globale", "Tester les différences", "Réunir les résultats dans MultiView"],
        outputs: ["profils taxonomiques", "indicateurs de diversité", "visualisation de la structure des communautés", "résultats de comparaison entre groupes", "planche de synthèse"],
        image: "app-previews/ordinations.png", href: "#/analyses"
      },
      {
        number: "02", title: "Comparer des conditions", question: "Quels taxons ou caractéristiques sont associés à une condition étudiée ?",
        audience: "Expérimentation · biomonitoring · comparaison de groupes", input: "Un dataset préparé avec une variable d’intérêt clairement définie.",
        steps: ["Contrôler le dataset", "Appliquer une filtration justifiée", "Choisir la comparaison", "Lancer plusieurs approches si utile", "Comparer les résultats", "Exporter les tableaux et figures"],
        outputs: ["taxons associés à la condition", "importance et direction des associations", "résultats croisés entre approches", "figures interactives", "tableaux exportables"],
        image: "app-previews/analyses_differentielles.png", href: "#/analyses"
      },
      {
        number: "03", title: "Comparer plusieurs marqueurs", question: "Plusieurs datasets décrivent-ils une organisation biologique cohérente ?",
        audience: "Multi-marqueurs · multi-domaines · intercomparaison", input: "Plusieurs objets phyloseq partageant des échantillons ou des informations comparables.",
        steps: ["Identifier les données communes", "Explorer chaque dataset", "Comparer leurs structures", "Repérer accords et divergences", "Examiner les échantillons atypiques", "Composer les résultats"],
        outputs: ["comparaisons de structures", "superpositions visuelles", "niveau de concordance entre datasets", "échantillons divergents", "synthèse multi-datasets"],
        image: "app-previews/comparaison_matrices.png", href: "#/analyses"
      }
    ],
    galleryK: "Galerie de résultats",
    galleryT: "Des sorties issues des différents modules de l’application.",
    galleryP: "Filtrez les exemples par étape du projet puis sélectionnez une sortie. Les visuels publics basés sur GlobalPatterns sont reproductibles ; les autres sont des captures de l’interface BarCodeR.",
    filters: { all: "Tout", quality: "Description", exploration: "Exploration", analysis: "Analyse", report: "Restitution" },
    inspect: "Voir",
    selectedUse: "À quoi sert cette sortie ?",
    selectedSource: "Type d’exemple",
    openModule: "Découvrir l’onglet",
    reproducible: "Figure publique reproductible",
    interfacePreview: "Capture de l’application",
    compareK: "MultiView",
    compareT: "Rassembler les résultats importants dans un même espace.",
    compareP: "Les figures enregistrées dans les différents onglets peuvent être retrouvées dans MultiView, filtrées, comparées côte à côte et organisées dans une composition. Cela permet de mettre plusieurs résultats en regard sans multiplier les fichiers isolés.",
    compareItems: [
      ["Bibliothèque", "Retrouver les figures sauvegardées dans les différents modules."],
      ["Comparaison", "Afficher plusieurs résultats côte à côte pour les lire ensemble."],
      ["Organisation", "Utiliser tags, favoris et compositions pour structurer les résultats retenus."],
      ["Export", "Produire une planche composite pour la discussion ou la restitution."]
    ],
    compareAction: "Découvrir MultiView",
    reproAction: "Voir comment BarCodeR conserve le contexte",
    finalK: "Essayer le parcours",
    finalT: "Passez des exemples à un tutoriel guidé.",
    finalP: "Les tutoriels permettent de suivre une démarche complète avec des données identifiées. Pour les paramètres et la méthodologie détaillée, utilisez ensuite la documentation.",
    finalTutorial: "Voir les tutoriels",
    finalDocs: "Consulter la documentation"
  } : {
    heroK: "BarCodeR in practice",
    heroT: <>From data to results,<br /><em>through concrete use cases.</em></>,
    heroP: "Three situations show how the different tabs connect to describe communities, compare conditions or bring several datasets together. Technical settings remain in the documentation.",
    heroPrimary: "View use cases",
    heroSecondary: "Browse results",
    casesK: "Example workflows",
    casesT: "A scientific question often uses several tabs.",
    casesP: "The examples below show how BarCodeR can organise an analytical reasoning process. They are not mandatory recipes: the workflow depends on the data and the question being studied.",
    input: "Starting point",
    outputs: "What you can obtain",
    openAnalysis: "Explore analyses",
    openTutorials: "View a tutorial",
    cases: [
      { number: "01", title: "Environmental monitoring", question: "Do communities change among sites, campaigns or seasons?", audience: "Ecology · biodiversity · monitoring", input: "A phyloseq object with environmental metadata.", steps: ["Get an overview", "Prepare the dataset", "Explore composition and diversity", "Visualise overall structure", "Test differences", "Bring results into MultiView"], outputs: ["taxonomic profiles", "diversity indicators", "community-structure visualisation", "group-comparison results", "summary panel"], image: "app-previews/ordinations.png", href: "#/analyses" },
      { number: "02", title: "Compare conditions", question: "Which taxa or features are associated with a studied condition?", audience: "Experiments · biomonitoring · group comparison", input: "A prepared dataset with a clearly defined variable of interest.", steps: ["Check the dataset", "Apply justified filtering", "Choose the comparison", "Run several approaches when useful", "Compare results", "Export tables and figures"], outputs: ["taxa associated with the condition", "strength and direction of associations", "results compared across approaches", "interactive figures", "exportable tables"], image: "app-previews/analyses_differentielles.png", href: "#/analyses" },
      { number: "03", title: "Compare several markers", question: "Do several datasets describe a coherent biological organisation?", audience: "Multi-marker · multi-domain · intercomparison", input: "Several phyloseq objects sharing samples or comparable information.", steps: ["Identify shared data", "Explore each dataset", "Compare their structures", "Find agreements and disagreements", "Review atypical samples", "Compose the results"], outputs: ["structural comparisons", "visual overlays", "level of concordance across datasets", "divergent samples", "multi-dataset synthesis"], image: "app-previews/comparaison_matrices.png", href: "#/analyses" }
    ],
    galleryK: "Result gallery",
    galleryT: "Outputs from the different application modules.",
    galleryP: "Filter examples by project stage and select an output. Public GlobalPatterns visuals are reproducible; the others are screenshots of the BarCodeR interface.",
    filters: { all: "All", quality: "Description", exploration: "Exploration", analysis: "Analysis", report: "Reporting" },
    inspect: "View",
    selectedUse: "What is this output for?",
    selectedSource: "Example type",
    openModule: "Discover the tab",
    reproducible: "Reproducible public figure",
    interfacePreview: "Application screenshot",
    compareK: "MultiView",
    compareT: "Bring important results together in one space.",
    compareP: "Figures recorded in the different tabs can be found in MultiView, filtered, compared side by side and arranged into a composition. This makes it possible to read several results together without multiplying isolated files.",
    compareItems: [
      ["Library", "Find figures saved from the different modules."],
      ["Comparison", "Display several results side by side to read them together."],
      ["Organisation", "Use tags, favourites and compositions to structure retained results."],
      ["Export", "Produce a composite panel for discussion or reporting."]
    ],
    compareAction: "Discover MultiView",
    reproAction: "See how BarCodeR retains context",
    finalK: "Try the workflow",
    finalT: "Move from examples to a guided tutorial.",
    finalP: "Tutorials let you follow a complete workflow using identified data. For detailed parameters and methodology, use the documentation afterwards.",
    finalTutorial: "View tutorials",
    finalDocs: "Read documentation"
  };

  const gallery = [
    { id: "composition", category: "exploration" as ShowcaseCategory, image: "figures/globalpatterns-composition.png", title: { fr: "Composition des communautés", en: "Community composition" }, use: { fr: "Comparer quels groupes taxonomiques dominent selon les environnements ou conditions.", en: "Compare which taxonomic groups dominate across environments or conditions." }, source: "reproducible", href: "#/application/exploration" },
    { id: "ordination", category: "analysis" as ShowcaseCategory, image: "figures/globalpatterns-ordination.png", title: { fr: "Organisation des échantillons", en: "Sample organisation" }, use: { fr: "Visualiser quels échantillons présentent des communautés proches ou différentes avant d’approfondir l’analyse.", en: "Visualise which samples contain similar or different communities before investigating further." }, source: "reproducible", href: "#/application/analyse" },
    { id: "alpha", category: "exploration" as ShowcaseCategory, image: "figures/globalpatterns-alpha-diversity.png", title: { fr: "Diversité des échantillons", en: "Sample diversity" }, use: { fr: "Comparer la richesse et la diversité observées au sein des échantillons ou des groupes.", en: "Compare richness and diversity observed within samples or groups." }, source: "reproducible", href: "#/application/exploration" },
    { id: "quality", category: "quality" as ShowcaseCategory, image: "app-previews/qualite_assignation_taxonomique.png", title: { fr: "Qualité des assignations taxonomiques", en: "Taxonomic assignment quality" }, use: { fr: "Voir jusqu’à quel niveau les organismes sont identifiés et repérer les parties moins bien résolues.", en: "See how far organisms are identified and locate less resolved parts of the taxonomy." }, source: "interface", href: "#/application/exploration" },
    { id: "heat-tree", category: "exploration" as ShowcaseCategory, image: "app-previews/heat_tree.png", title: { fr: "Structure taxonomique", en: "Taxonomic structure" }, use: { fr: "Repérer visuellement où se concentrent les groupes dominants ou les différences dans la hiérarchie taxonomique.", en: "Locate dominant groups or differences within the taxonomic hierarchy." }, source: "interface", href: "#/application/exploration" },
    { id: "venn", category: "exploration" as ShowcaseCategory, image: "app-previews/diagramme_venn.png", title: { fr: "Taxons partagés et spécifiques", en: "Shared and specific taxa" }, use: { fr: "Identifier quels taxons sont communs à plusieurs groupes et lesquels leur sont spécifiques.", en: "Identify taxa shared across groups and those specific to particular groups." }, source: "interface", href: "#/application/exploration" },
    { id: "differential", category: "analysis" as ShowcaseCategory, image: "app-previews/analyses_differentielles.png", title: { fr: "Taxons associés à une condition", en: "Taxa associated with a condition" }, use: { fr: "Identifier les taxons dont le comportement est associé à une condition et confronter plusieurs approches lorsque cela est utile.", en: "Identify taxa whose behaviour is associated with a condition and compare several approaches when useful." }, source: "interface", href: "#/application/analyse" },
    { id: "permanova", category: "analysis" as ShowcaseCategory, image: "app-previews/permanova_dispersion.png", title: { fr: "Différences entre groupes", en: "Differences among groups" }, use: { fr: "Tester si la composition des communautés diffère entre groupes tout en examinant les diagnostics nécessaires à l’interprétation.", en: "Test whether community composition differs among groups while reviewing the diagnostics needed for interpretation." }, source: "interface", href: "#/application/analyse" },
    { id: "matrices", category: "analysis" as ShowcaseCategory, image: "app-previews/comparaison_matrices.png", title: { fr: "Concordance entre datasets", en: "Concordance across datasets" }, use: { fr: "Évaluer si plusieurs marqueurs, domaines ou représentations décrivent une organisation comparable.", en: "Assess whether several markers, domains or representations describe a comparable organisation." }, source: "interface", href: "#/application/analyse" },
    { id: "clustering", category: "analysis" as ShowcaseCategory, image: "app-previews/clustering.png", title: { fr: "Regroupements d’échantillons", en: "Sample groupings" }, use: { fr: "Explorer si les échantillons forment naturellement des ensembles et examiner la stabilité de ces regroupements.", en: "Explore whether samples naturally form groups and review the stability of those groupings." }, source: "interface", href: "#/application/analyse" },
    { id: "multiview", category: "report" as ShowcaseCategory, image: "app-previews/screen-multiview.png", title: { fr: "Composition de résultats", en: "Result composition" }, use: { fr: "Réunir plusieurs figures sauvegardées dans une même planche pour les comparer ou les présenter ensemble.", en: "Bring several saved figures into one panel for comparison or presentation." }, source: "interface", href: "#/application/multiview" }
  ];

  const filteredGallery = category === "all" ? gallery : gallery.filter(item => item.category === category);
  const selectCategory = (nextCategory: ShowcaseCategory) => {
    setCategory(nextCategory);
    const nextOutputs = nextCategory === "all" ? gallery : gallery.filter(item => item.category === nextCategory);
    if (!nextOutputs.some(item => item.id === selectedOutput) && nextOutputs[0]) setSelectedOutput(nextOutputs[0].id);
  };
  const currentOutput = gallery.find(item => item.id === selectedOutput) ?? gallery[0];

  return <main>
    <section className="showcase-hero"><div className="page-width showcase-hero-grid"><div className="reveal"><Eyebrow>{c.heroK}</Eyebrow><h1>{c.heroT}</h1><p className="lead">{c.heroP}</p><div className="showcase-hero-actions"><button className="button primary" type="button" onClick={() => document.getElementById("scientific-use-cases")?.scrollIntoView({ behavior: "smooth" })}>{c.heroPrimary}<span>↓</span></button><button className="button secondary" type="button" onClick={() => document.getElementById("output-gallery")?.scrollIntoView({ behavior: "smooth" })}>{c.heroSecondary}<span>↘</span></button></div></div><div className="showcase-hero-visual reveal"><img src={asset("app-previews/screen-multiview.png")} alt={language === "fr" ? "Planche de résultats dans MultiView" : "Result panel in MultiView"} /><span className="showcase-float-card top">BarCodeR · MultiView</span><span className="showcase-float-card bottom">Figures · Tables · Exports</span></div></div></section>

    <section className="section page-width showcase-cases" id="scientific-use-cases"><div className="section-heading"><div><Eyebrow>{c.casesK}</Eyebrow><h2>{c.casesT}</h2></div><p>{c.casesP}</p></div><div className="showcase-case-list">{c.cases.map((item, index) => <article className="showcase-case reveal" style={{ "--delay": `${index * 50}ms` } as React.CSSProperties} key={item.number}><div className="showcase-case-image"><img src={asset(item.image)} alt="" /><span>{item.number}</span></div><div className="showcase-case-copy"><small>{item.audience}</small><h3>{item.title}</h3><blockquote>{item.question}</blockquote><div className="showcase-case-input"><b>{c.input}</b><p>{item.input}</p></div><ol>{item.steps.map((step, stepIndex) => <li key={step}><span>{String(stepIndex + 1).padStart(2, "0")}</span>{step}</li>)}</ol><div className="showcase-output-tags"><b>{c.outputs}</b><div>{item.outputs.map(output => <span key={output}>{output}</span>)}</div></div><div className="showcase-case-actions"><a href={item.href}>{c.openAnalysis}<span>→</span></a><a href="#/tutorials">{c.openTutorials}<span>↗</span></a></div></div></article>)}</div></section>

    <section className="showcase-gallery-section" id="output-gallery"><div className="page-width"><div className="section-heading light"><div><Eyebrow>{c.galleryK}</Eyebrow><h2>{c.galleryT}</h2></div><p>{c.galleryP}</p></div><div className="showcase-filter-bar" role="group" aria-label={c.galleryK}>{(Object.keys(c.filters) as ShowcaseCategory[]).map(key => <button type="button" className={category === key ? "active" : ""} onClick={() => selectCategory(key)} aria-pressed={category === key} key={key}>{c.filters[key]}</button>)}</div><div className="showcase-gallery-layout"><div className="showcase-gallery-grid">{filteredGallery.map((item, index) => <button type="button" className={`showcase-gallery-card ${selectedOutput === item.id ? "active" : ""}`} onClick={() => setSelectedOutput(item.id)} style={{ "--delay": `${(index % 3) * 45}ms` } as React.CSSProperties} key={item.id}><div><img src={asset(item.image)} alt={tx(item.title, language)} /><span>{item.source === "reproducible" ? c.reproducible : c.interfacePreview}</span></div><h3>{tx(item.title, language)}</h3><b>{c.inspect}<i>→</i></b></button>)}</div><aside className="showcase-output-detail" key={currentOutput.id}><div className="showcase-detail-image"><img src={asset(currentOutput.image)} alt={tx(currentOutput.title, language)} /></div><small>{currentOutput.source === "reproducible" ? c.reproducible : c.interfacePreview}</small><h3>{tx(currentOutput.title, language)}</h3><dl><div><dt>{c.selectedUse}</dt><dd>{tx(currentOutput.use, language)}</dd></div><div><dt>{c.selectedSource}</dt><dd>{currentOutput.source === "reproducible" ? (language === "fr" ? "Exemple public calculé à partir de GlobalPatterns" : "Public example generated from GlobalPatterns") : (language === "fr" ? "Capture de l’interface BarCodeR" : "BarCodeR interface screenshot")}</dd></div></dl><a href={currentOutput.href}>{c.openModule}<span>→</span></a></aside></div></div></section>

    <section className="section page-width showcase-provenance"><div className="section-heading"><div><Eyebrow>{c.compareK}</Eyebrow><h2>{c.compareT}</h2></div><p>{c.compareP}</p></div><div className="showcase-limits-grid">{c.compareItems.map(([title, text], index) => <article className="reveal" style={{ "--delay": `${index * 45}ms` } as React.CSSProperties} key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="showcase-case-actions"><a href="#/application/multiview">{c.compareAction}<span>→</span></a><a href="#/reproducibility">{c.reproAction}<span>↗</span></a></div></section>

    <section className="section page-width showcase-final"><div><Eyebrow>{c.finalK}</Eyebrow><h2>{c.finalT}</h2><p>{c.finalP}</p></div><div><a className="button primary" href="#/tutorials">{c.finalTutorial}<span>→</span></a><a className="button secondary" href="#/documentation">{c.finalDocs}<span>↗</span></a></div></section>
  </main>;
}

function ReproducibilityPage({ language }: { language: Language }) {
  const [activeStep, setActiveStep] = useState(0);
  const c = language === "fr" ? {
    k: "Reproductibilité",
    title: "Retrouver comment un résultat a été obtenu.",
    p: "BarCodeR conserve le contexte du travail réalisé dans le projet : dataset utilisé, opérations enregistrées, paramètres des analyses, figures sauvegardées et code R associé aux résultats concernés. L’objectif est de pouvoir relire, comparer et prolonger une analyse plutôt que d’accumuler des sorties isolées.",
    metrics: [["Projet", "un contexte commun"], ["Historique", "des choix retrouvables"], ["R", "du code pour reproduire et prolonger"]],
    explore: "Du projet au résultat",
    exploreP: "Sélectionnez une étape pour voir ce que BarCodeR cherche à conserver tout au long du parcours.",
    steps: [
      { title: "Projet", kicker: "Le contexte de travail", description: "Datasets, résultats et éléments sauvegardés sont regroupés dans un même projet afin de pouvoir reprendre le travail plus tard.", keeps: ["datasets du projet", "dataset actif", "résultats sauvegardés"], outcome: "Reprendre une analyse dans son contexte" },
      { title: "Entrée des données", kicker: "Le point de départ", description: "Le projet peut commencer avec un objet phyloseq complet ou partiel, ou avec des FASTQ traités via OpenMetaBar avant de rejoindre le même parcours BarCodeR.", keeps: ["objet phyloseq importé", "informations disponibles dans l’objet", "provenance OpenMetaBar lorsqu’elle existe"], outcome: "Savoir sur quelles données repose le travail" },
      { title: "Préparation", kicker: "Les données évoluent", description: "Les opérations d’édition et de filtration permettent de préparer les données pour la question étudiée tout en gardant des traces des actions enregistrées dans les modules concernés.", keeps: ["versions de datasets", "historique des opérations", "contexte du projet"], outcome: "Retrouver la version utilisée pour une analyse" },
      { title: "Analyse", kicker: "Les choix restent visibles", description: "Les paramètres utiles à la production d’un résultat restent associés à son historique lorsque le module propose l’enregistrement de la figure ou de l’analyse.", keeps: ["méthode", "variables et paramètres", "graine et contexte logiciel lorsque pertinents"], outcome: "Comprendre les choix derrière le résultat" },
      { title: "Résultats", kicker: "Figures et tableaux", description: "Les sorties sauvegardées peuvent être retrouvées dans les historiques et, pour les figures compatibles, réunies dans MultiView pour être comparées ou composées.", keeps: ["figure", "tableaux associés", "historique et provenance du résultat"], outcome: "Comparer plusieurs résultats sans perdre leur origine" },
      { title: "Export", kicker: "Continuer hors de BarCodeR", description: "Les exports permettent de récupérer les résultats et, pour les figures couvertes par le système de reproductibilité, le code R correspondant afin de poursuivre l’analyse dans un workflow personnel.", keeps: ["figures et tableaux", "code R reproductible", "fichiers de projet"], outcome: "Partager ou prolonger le travail" }
    ],
    pillarsK: "Quatre principes",
    pillarsT: "Conserver le contexte sans alourdir le travail.",
    pillars: [["01", "Tracer", "Enregistrer les opérations et paramètres qui comptent pour comprendre un résultat."], ["02", "Relier", "Garder le résultat associé au dataset et au projet qui l’ont produit."], ["03", "Comparer", "Retrouver plusieurs analyses et les mettre en regard dans un même environnement."], ["04", "Prolonger", "Exporter les sorties et le code R lorsque vous souhaitez quitter l’interface."]],
    limits: "Reproductible ne veut pas dire automatiquement valide.",
    limitP: "BarCodeR facilite la traçabilité et la répétition d’une analyse, mais la qualité scientifique dépend toujours du plan expérimental, de la qualité des données, des choix de préparation, de la méthode utilisée et de l’interprétation biologique."
  } : {
    k: "Reproducibility",
    title: "Recover how a result was obtained.",
    p: "BarCodeR preserves the context of work performed in a project: the dataset used, recorded operations, analysis parameters, saved figures and R code associated with relevant results. The goal is to review, compare and extend an analysis rather than accumulate isolated outputs.",
    metrics: [["Project", "one shared context"], ["History", "recoverable choices"], ["R", "code to reproduce and extend"]],
    explore: "From project to result",
    exploreP: "Select a stage to see what BarCodeR aims to retain throughout the workflow.",
    steps: [
      { title: "Project", kicker: "The workspace context", description: "Datasets, results and saved elements are grouped in one project so work can be resumed later.", keeps: ["project datasets", "active dataset", "saved results"], outcome: "Resume an analysis in context" },
      { title: "Data entry", kicker: "The starting point", description: "A project can start from a complete or partial phyloseq object, or FASTQ files processed through OpenMetaBar before joining the same BarCodeR workflow.", keeps: ["imported phyloseq object", "information available in the object", "OpenMetaBar provenance when available"], outcome: "Know which data support the work" },
      { title: "Preparation", kicker: "Data evolve", description: "Editing and filtering operations prepare data for the question being studied while retaining records of actions in the relevant modules.", keeps: ["dataset versions", "operation history", "project context"], outcome: "Recover the version used for an analysis" },
      { title: "Analysis", kicker: "Choices remain visible", description: "Parameters useful for producing a result remain attached to its history when the module supports saving the figure or analysis.", keeps: ["method", "variables and parameters", "seed and software context when relevant"], outcome: "Understand the choices behind a result" },
      { title: "Results", kicker: "Figures and tables", description: "Saved outputs can be found in histories and, for compatible figures, gathered in MultiView for comparison or composition.", keeps: ["figure", "associated tables", "result history and provenance"], outcome: "Compare results without losing their origin" },
      { title: "Export", kicker: "Continue outside BarCodeR", description: "Exports provide access to results and, for figures covered by the reproducibility system, corresponding R code for continuing in a personal workflow.", keeps: ["figures and tables", "reproducible R code", "project files"], outcome: "Share or extend the work" }
    ],
    pillarsK: "Four principles",
    pillarsT: "Retain context without making the workflow heavier.",
    pillars: [["01", "Trace", "Record the operations and parameters that matter for understanding a result."], ["02", "Connect", "Keep the result associated with the dataset and project that produced it."], ["03", "Compare", "Recover several analyses and read them together in one environment."], ["04", "Extend", "Export outputs and R code when you want to leave the interface."]],
    limits: "Reproducible does not automatically mean valid.",
    limitP: "BarCodeR supports traceability and repetition of an analysis, but scientific quality still depends on experimental design, data quality, preparation choices, the method used and biological interpretation."
  };
  const step = c.steps[activeStep];
  return <main><section className="repro-hero"><div className="page-width"><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p className="lead">{c.p}</p><div className="repro-metrics">{c.metrics.map(([number, label]) => <div key={number}><b>{number}</b><span>{label}</span></div>)}</div></div></section><section className="section page-width"><div className="section-heading"><div><Eyebrow>{c.explore}</Eyebrow><h2>{c.explore}</h2></div><p>{c.exploreP}</p></div><div className="repro-explorer"><nav aria-label={c.explore}>{c.steps.map((item, index) => <button className={index === activeStep ? "active" : ""} onClick={() => setActiveStep(index)} aria-pressed={index === activeStep} key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><b>{item.title}</b><i>→</i></button>)}</nav><article className="repro-detail" key={step.title}><div className="repro-progress"><span style={{ width: `${((activeStep + 1) / c.steps.length) * 100}%` }} /></div><small>{step.kicker}</small><h3>{step.title}</h3><p>{step.description}</p><div className="repro-keeps">{step.keeps.map(item => <span key={item}>✓ {item}</span>)}</div><div className="repro-outcome"><small>{language === "fr" ? "Ce que cela permet" : "What this enables"}</small><b>{step.outcome}</b></div></article></div></section><section className="section section-tint"><div className="page-width"><div className="section-intro"><Eyebrow>{c.pillarsK}</Eyebrow><h2>{c.pillarsT}</h2></div><div className="repro-pillars">{c.pillars.map(([number, title, value]) => <article className="reveal" key={title}><span>{number}</span><h3>{title}</h3><p>{value}</p></article>)}</div></div></section><section className="limits-panel repro-limits page-width"><span>!</span><div><Eyebrow>{c.limits}</Eyebrow><h2>{c.limits}</h2><p>{c.limitP}</p></div></section></main>;
}

function DownloadPage({ language }: { language: Language }) {
  const [copied, setCopied] = useState<string | null>(null);
  const appVersion = "2.12.8";
  const documentationVersion = "1.9.0";
  const sourceCommand = 'shiny::runApp()';
  const temporaryCitation = language === "fr"
    ? `Équipe BarCodeR (${new Date().getFullYear()}). BarCodeR v${appVersion} : plateforme R/Shiny pour l’exploration et l’analyse reproductible de données de métabarcoding.`
    : `BarCodeR team (${new Date().getFullYear()}). BarCodeR v${appVersion}: an R/Shiny platform for reproducible exploration and analysis of metabarcoding data.`;

  const copyText = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied((current) => current === key ? null : current), 1800);
    } catch {
      setCopied(null);
    }
  };

  const c = language === "fr" ? {
    k: "Installer BarCodeR",
    title: "Utilisez BarCodeR dans l’environnement qui convient à votre projet.",
    p: "BarCodeR s’exécute dans un environnement R/Shiny et peut être utilisé localement ou déployé pour une équipe. Les données d’analyse restent sous le contrôle de l’installation choisie.",
    version: "Version",
    docs: "Documentation",
    languages: "Langues de l’interface",
    currentAccess: "Accès actuel",
    localTitle: "Installation locale",
    localP: "Le mode de référence pour travailler sur votre propre machine avec vos projets et vos données. Une fois l’archive complète extraite et les dépendances disponibles, lancez BarCodeR depuis le dossier BarCodeR_app contenant app.R et modules/.",
    localItems: ["Travail sur votre machine", "Accès à l’ensemble des modules", "Projets et résultats conservés dans votre environnement"],
    launch: "Depuis le dossier BarCodeR_app",
    copy: "Copier",
    copied: "Copié",
    sharedTitle: "Déploiement pour une équipe",
    sharedP: "BarCodeR peut aussi être installé sur une infrastructure R/Shiny partagée afin de proposer un même environnement de travail à plusieurs utilisateurs.",
    sharedItems: ["Installation centralisée", "Accès depuis un navigateur", "Gestion du stockage et des accès par l’administrateur"],
    sharedAction: "Voir le fonctionnement",
    distributionTitle: "Récupérer l’application",
    distributionP: "BarCodeR est actuellement installé à partir de ses sources R. Utilisez l’archive ou le dépôt associé à votre distribution, puis suivez la procédure d’installation détaillée dans la documentation.",
    distributionAction: "Consulter la documentation",
    startK: "Commencer",
    startT: "Trois repères avant votre première analyse.",
    startItems: [
      ["Préparer vos données", "Importez un objet phyloseq complet ou partiel au format R, ou partez de FASTQ via le module OpenMetaBar.", "#/functioning"],
      ["Découvrir l’interface", "Suivez un parcours documenté pour comprendre les principales étapes de BarCodeR.", "#/tutorials"],
      ["Approfondir une méthode", "Retrouvez dans la documentation les paramètres, prérequis et explications méthodologiques.", "#/documentation"]
    ],
    citationK: "Citer BarCodeR",
    citationT: "Identifiez la version utilisée dans vos travaux.",
    citationP: "En attendant la mise à disposition d’une citation pérenne associée à une archive versionnée, cette formulation permet d’indiquer clairement la version de BarCodeR utilisée.",
    copyCitation: "Copier la citation",
    privacyK: "Vos données restent sous votre contrôle",
    privacyT: "Les analyses sont réalisées dans l’installation BarCodeR que vous utilisez.",
    privacyP: "Les modules d’analyse n’envoient pas le contenu scientifique de vos projets vers un service d’analyse externe. Une télémétrie technique et désactivable peut toutefois aider à comprendre l’usage de l’application et à diagnostiquer son fonctionnement.",
    localData: "Données scientifiques",
    localDataItems: ["Tables d’abondance", "Métadonnées scientifiques", "Noms d’échantillons", "Séquences et taxonomie"],
    telemetry: "Télémétrie optionnelle",
    telemetryItems: ["Navigation dans l’application", "Analyses lancées", "Durées techniques", "Erreurs et informations d’exécution"],
    privacyNote: "La télémétrie peut être désactivée depuis Paramètres > Confidentialité. Lorsque vous utilisez OpenMetaBar, le traitement des FASTQ est volontairement exécuté sur l’infrastructure HPC distante que vous avez configurée.",
    helpK: "Besoin d’aide ?",
    helpT: "Le site vous oriente ; la documentation rassemble les détails d’utilisation.",
    helpItems: [
      ["Tutoriels", "Prendre BarCodeR en main sur un parcours guidé.", "#/tutorials"],
      ["Documentation", "Retrouver les explications détaillées des modules et des méthodes.", "#/documentation"],
      ["Fonctionnement", "Comprendre où se place chaque étape dans un projet BarCodeR.", "#/functioning"]
    ]
  } : {
    k: "Install BarCodeR",
    title: "Use BarCodeR in the environment that fits your project.",
    p: "BarCodeR runs in an R/Shiny environment and can be used locally or deployed for a team. Analysis data remain under the control of the selected installation.",
    version: "Version",
    docs: "Documentation",
    languages: "Interface languages",
    currentAccess: "Current access",
    localTitle: "Local installation",
    localP: "The reference mode for working on your own machine with your projects and data. Once the complete archive is extracted and dependencies are available, launch BarCodeR from the BarCodeR_app directory containing app.R and modules/.",
    localItems: ["Work on your own machine", "Access to all modules", "Projects and results kept in your environment"],
    launch: "From the BarCodeR_app directory",
    copy: "Copy",
    copied: "Copied",
    sharedTitle: "Team deployment",
    sharedP: "BarCodeR can also be installed on a shared R/Shiny infrastructure to provide a common working environment to several users.",
    sharedItems: ["Centralised installation", "Browser access", "Storage and access managed by the administrator"],
    sharedAction: "See how it works",
    distributionTitle: "Get the application",
    distributionP: "BarCodeR is currently installed from its R sources. Use the archive or repository associated with your distribution, then follow the detailed installation procedure in the documentation.",
    distributionAction: "Read the documentation",
    startK: "Getting started",
    startT: "Three reference points before your first analysis.",
    startItems: [
      ["Prepare your data", "Import a complete or partial phyloseq object stored as an R file, or start from FASTQ through the OpenMetaBar module.", "#/functioning"],
      ["Discover the interface", "Follow a documented workflow to understand the main stages of BarCodeR.", "#/tutorials"],
      ["Explore a method", "Use the documentation for parameters, prerequisites and methodological explanations.", "#/documentation"]
    ],
    citationK: "Cite BarCodeR",
    citationT: "Identify the version used in your work.",
    citationP: "Until a persistent citation linked to a versioned archive is available, this wording clearly identifies the BarCodeR version used.",
    copyCitation: "Copy citation",
    privacyK: "Your data remain under your control",
    privacyT: "Analyses run in the BarCodeR installation you use.",
    privacyP: "Analysis modules do not send the scientific content of your projects to an external analysis service. Optional technical telemetry may however help understand application usage and diagnose its operation.",
    localData: "Scientific data",
    localDataItems: ["Abundance tables", "Scientific metadata", "Sample names", "Sequences and taxonomy"],
    telemetry: "Optional telemetry",
    telemetryItems: ["Application navigation", "Launched analyses", "Technical durations", "Errors and runtime information"],
    privacyNote: "Telemetry can be disabled from Settings > Privacy. When OpenMetaBar is used, FASTQ processing is intentionally executed on the remote HPC infrastructure you configured.",
    helpK: "Need help?",
    helpT: "The website provides orientation; the documentation contains detailed usage guidance.",
    helpItems: [
      ["Tutorials", "Get started with BarCodeR through a guided workflow.", "#/tutorials"],
      ["Documentation", "Find detailed explanations of modules and methods.", "#/documentation"],
      ["How it works", "Understand where each stage fits into a BarCodeR project.", "#/functioning"]
    ]
  };

  return <main className="download-page">
    <section className="download-hero">
      <div className="page-width download-hero-grid">
        <div>
          <Eyebrow>{c.k}</Eyebrow>
          <h1>{c.title}</h1>
          <p className="lead">{c.p}</p>
          <div className="download-hero-actions">
            <a className="button primary" href="#/documentation">{c.distributionAction}<span>→</span></a>
            <a className="button secondary" href="#download-start">{c.startK}<span>↓</span></a>
          </div>
        </div>
        <div className="download-release-card" aria-label={c.version}>
          <span>BarCodeR</span><strong>v{appVersion}</strong>
          <dl>
            <div><dt>{c.docs}</dt><dd>v{documentationVersion}</dd></div>
            <div><dt>{c.languages}</dt><dd>5</dd></div>
            <div><dt>{c.currentAccess}</dt><dd>R / Shiny</dd></div>
          </dl>
        </div>
      </div>
    </section>

    <section className="section page-width" id="download-modes">
      <div className="section-heading"><div><Eyebrow>{c.k}</Eyebrow><h2>{language === "fr" ? "Deux façons d’utiliser la même application." : "Two ways to use the same application."}</h2></div></div>
      <div className="download-mode-grid download-mode-grid-two">
        <article className="download-mode-card featured">
          <header><span>R</span><b>{language === "fr" ? "Local" : "Local"}</b></header>
          <h3>{c.localTitle}</h3><p>{c.localP}</p>
          <ul>{c.localItems.map((item) => <li key={item}>{item}</li>)}</ul>
          <div className="download-code-stack"><div><small>{c.launch}</small><code>{sourceCommand}</code><button type="button" onClick={() => copyText("launch", sourceCommand)}>{copied === "launch" ? c.copied : c.copy}</button></div></div>
        </article>
        <article className="download-mode-card">
          <header><span>WEB</span><b>{language === "fr" ? "Équipe" : "Team"}</b></header>
          <h3>{c.sharedTitle}</h3><p>{c.sharedP}</p>
          <ul>{c.sharedItems.map((item) => <li key={item}>{item}</li>)}</ul>
          <a href="#/functioning">{c.sharedAction}<span>→</span></a>
        </article>
      </div>
      <div className="download-distribution-note"><span>↓</span><div><small>{language === "fr" ? "Accès aux sources" : "Source access"}</small><h3>{c.distributionTitle}</h3><p>{c.distributionP}</p></div><a href="#/documentation">{c.distributionAction}<span>→</span></a></div>
    </section>

    <section className="section section-tint" id="download-start">
      <div className="page-width">
        <div className="section-heading"><div><Eyebrow>{c.startK}</Eyebrow><h2>{c.startT}</h2></div></div>
        <div className="download-help-grid">{c.startItems.map(([title, description, href], index) => <a href={href} key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p><b>→</b></a>)}</div>
      </div>
    </section>

    <section className="section page-width download-citation-section">
      <div className="download-citation-grid">
        <div><Eyebrow>{c.citationK}</Eyebrow><h2>{c.citationT}</h2><p>{c.citationP}</p></div>
        <div className="download-citation-box"><blockquote>{temporaryCitation}</blockquote><button type="button" onClick={() => copyText("citation", temporaryCitation)}>{copied === "citation" ? c.copied : c.copyCitation}</button></div>
      </div>
    </section>

    <section className="download-privacy-section">
      <div className="page-width">
        <div className="download-privacy-heading"><Eyebrow>{c.privacyK}</Eyebrow><h2>{c.privacyT}</h2><p>{c.privacyP}</p></div>
        <div className="download-privacy-grid">
          <article className="never"><span>✓</span><h3>{c.localData}</h3><ul>{c.localDataItems.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <article className="collected"><span>i</span><h3>{c.telemetry}</h3><ul>{c.telemetryItems.map((item) => <li key={item}>{item}</li>)}</ul></article>
        </div>
        <p className="download-privacy-note">{c.privacyNote}</p>
      </div>
    </section>


  </main>;
}

function Footer({ language }: { language: Language }) {
  return <footer><div className="page-width footer-main"><Brand language={language} /><p>{language === "fr" ? "Plateforme scientifique pour préparer, explorer et analyser de manière interactive et reproductible des données de métabarcoding." : "Scientific platform for preparing, exploring and reproducibly analysing metabarcoding data through an interactive interface."}</p><nav><a href="#/functioning">{language === "fr" ? "Fonctionnement" : "How it works"}</a><a href="#/analyses">{language === "fr" ? "Analyses" : "Analyses"}</a><a href="#/showcase">{language === "fr" ? "Cas d’usage" : "Use cases"}</a><a href="#/reproducibility">{language === "fr" ? "Reproductibilité" : "Reproducibility"}</a><a href="#/tutorials">{language === "fr" ? "Tutoriels" : "Tutorials"}</a><a href="#/documentation">Documentation</a><a href="#/download">{language === "fr" ? "Installer" : "Install"}</a></nav></div><div className="footer-bottom page-width"><span>BarCodeR · v2.12.8</span><span>Institut Sophia Agrobiotech · PHYBAC</span></div></footer>;
}

export default function App() {
  const route = useHashRoute();
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("barcoder-site-language");
    if (stored === "fr" || stored === "en") return stored;
    return navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
  });

  const setLanguage = (next: Language) => { localStorage.setItem("barcoder-site-language", next); setLanguageState(next); };
  const activeModule = useMemo(() => {
    const match = route.match(/^\/application\/([^/]+)/);
    return match ? modules.find(module => module.key === match[1]) : undefined;
  }, [route]);

  useEffect(() => {
    document.documentElement.lang = language;
    const label = activeModule ? tx(activeModule.title, language)
      : route === "/tutorials" || route === "/evidence" ? (language === "fr" ? "Tutoriels et datasets tests" : "Tutorials and test datasets")
      : route === "/documentation" ? (language === "fr" ? "Documentation BarCodeR" : "BarCodeR documentation")
      : route === "/analyses" ? (language === "fr" ? "Analyses scientifiques" : "Scientific analyses")
      : route === "/showcase" ? (language === "fr" ? "Cas d’usage et résultats" : "Use cases and outputs")
      : route === "/functioning" || route === "/application" ? (language === "fr" ? "Fonctionnement de BarCodeR" : "How BarCodeR works")
      : route === "/download" || route === "/availability" ? (language === "fr" ? "Télécharger et citer" : "Download and cite")
      : route === "/reproducibility" ? (language === "fr" ? "Reproductibilité" : "Reproducibility")
      : (language === "fr" ? "Analyse reproductible du métabarcoding" : "Reproducible metabarcoding analysis");
    document.title = `${label} | BarCodeR`;
  }, [language, route, activeModule]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { nodes.forEach(node => node.classList.add("visible")); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: 0.08, rootMargin: "0px 0px -30px" });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [route, language]);

  let page: React.ReactNode;
  if (activeModule) page = <ModulePage module={activeModule} language={language} />;
  else if (route === "/functioning" || route === "/application") page = <ApplicationIndex language={language} />;
  else if (route === "/analyses") page = <AnalysesPage language={language} />;
  else if (route === "/showcase") page = <ShowcasePage language={language} />;
  else if (route === "/tutorials" || route === "/evidence") page = <EvidencePage language={language} />;
  else if (route === "/documentation") page = <DocumentationPage language={language} />;
  else if (route === "/reproducibility") page = <ReproducibilityPage language={language} />;
  else if (route === "/download" || route === "/availability") page = <DownloadPage language={language} />;
  else page = <Landing language={language} />;

  return <div className={activeModule?.key === "openmetabar" ? "site-shell openmetabar-route" : "site-shell"}><Header language={language} setLanguage={setLanguage} route={route} />{page}<Footer language={language} /></div>;
}
