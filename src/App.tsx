import { useEffect, useMemo, useState } from "react";
import { groups, moduleScreens, modules, type AppModule, type Language, type Localized } from "./content";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const tx = (value: Localized, language: Language) => value[language];
const moduleHref = (key: string) => `#/application/${key}`;

// Main BarCodeR application screenshot displayed on the overview page.
// Replacing this file in `public/app-previews/` updates the visual without
// changing the page component.
const HOME_SCREENSHOT_PATH: string | null = "app-previews/barcoder-home-real.png";

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
    <a className="brand" href="#/" aria-label={language === "fr" ? "BarCodeR et OpenMetaBar — accueil du site" : "BarCodeR and OpenMetaBar — website home"}>
      <img className="brand-barcoder" src={asset("app-previews/barcoder-logo.png")} alt="" />
      <span className="brand-wordmark"><strong>BarCodeR</strong><i>×</i><strong>OpenMetaBar</strong></span>
      <img className="brand-openmetabar" src={asset("app-previews/openmetabar-logo.png")} alt="" />
    </a>
  );
}

function Header({ language, setLanguage, route }: { language: Language; setLanguage: (language: Language) => void; route: string }) {
  const [open, setOpen] = useState(false);
  const c = language === "fr" ? {
    home: "Accueil", functioning: "Fonctionnement", analyses: "Analyses", tutorials: "Tutoriels", documentation: "Documentation", download: "Télécharger"
  } : {
    home: "Home", functioning: "How it works", analyses: "Analyses", tutorials: "Tutorials", documentation: "Documentation", download: "Download"
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
        <a className={route === "/download" || route === "/availability" ? "active" : ""} href="#/download">{c.download}</a>
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

function Workflow({ language, compact = false }: { language: Language; compact?: boolean }) {
  const overviewItems = [
    [language === "fr" ? "Entrer dans BarCodeR" : "Enter BarCodeR", language === "fr" ? "Projet · données · paramètres" : "Project · data · parameters", "01"],
    [language === "fr" ? "Lancer OpenMetaBar" : "Launch OpenMetaBar", "FASTQ · design · reference", "02"],
    [language === "fr" ? "Suivre le calcul HPC" : "Monitor HPC computing", "Nextflow · Slurm · monitoring", "03"],
    [language === "fr" ? "Récupérer le phyloseq" : "Retrieve the phyloseq", language === "fr" ? "Import direct dans BarCodeR" : "Direct import into BarCodeR", "04"],
    [language === "fr" ? "Explorer & analyser" : "Explore & analyse", language === "fr" ? "Figures · statistiques · diagnostics" : "Figures · statistics · diagnostics", "05"],
    [language === "fr" ? "Restituer" : "Report", language === "fr" ? "Historique · code R · MultiView" : "History · R code · MultiView", "06"]
  ];
  const applicationItems = [
    ["FASTQ", "OpenMetaBar", "01"], ["phyloseq", language === "fr" ? "Objet scientifique" : "Scientific object", "02"],
    [language === "fr" ? "Préparer" : "Prepare", language === "fr" ? "Édition & filtration" : "Edition & filtering", "03"],
    [language === "fr" ? "Explorer" : "Explore", language === "fr" ? "Description & figures" : "Description & figures", "04"],
    [language === "fr" ? "Tester" : "Test", language === "fr" ? "Modèles & diagnostics" : "Models & diagnostics", "05"],
    [language === "fr" ? "Restituer" : "Report", "MultiView", "06"]
  ];
  const items = compact ? applicationItems : overviewItems;
  return <div className={compact ? "workflow compact" : "workflow"}>{items.map(([name, detail, number], index) => <div className="workflow-step" key={number}><span>{number}</span><div><b>{name}</b><small>{detail}</small></div>{index < items.length - 1 && <i />}</div>)}</div>;
}

function Landing({ language }: { language: Language }) {
  const c = language === "fr" ? {
    badge: "Métabarcoding reproductible · traitement, contrôle et analyse",
    title: <>Du FASTQ à la figure,<br /><em>dans un workflow traçable.</em></>,
    intro: "OpenMetaBar prépare et suit le traitement de vos séquences sur cluster HPC. BarCodeR contrôle ensuite les objets phyloseq, guide les choix analytiques et produit des figures, tableaux et scripts R sans masquer les paramètres utilisés.",
    workflowAction: "Découvrir le workflow",
    analysesAction: "Explorer les analyses",
    downloadAction: "Télécharger BarCodeR",
    version: "Versions présentées : BarCodeR v2.12.8 · OpenMetaBar v1.0.0",
    metrics: [
      ["3", "technologies de séquençage", "Illumina · PacBio · Oxford Nanopore"],
      ["5", "moteurs différentiels", "ANCOM-BC2 · LinDA · ALDEx2 · corncob · MaAsLin 3"],
      ["6", "familles d’ordination", "PCA · PCoA · NMDS · CCA · RDA · dbRDA"],
      ["R", "code exportable", "Commencer dans l’interface, poursuivre dans R"]
    ],
    journeysK: "Deux points d’entrée",
    journeysT: "Commencez avec les données dont vous disposez déjà.",
    journeysP: "OpenMetaBar et BarCodeR forment un continuum, mais restent indépendants. Le cluster n’est nécessaire que pour le traitement distant des séquences.",
    fastqTitle: "Je pars de fichiers FASTQ",
    fastqTag: "Parcours complet",
    fastqText: "Préparez le design, configurez le pipeline, soumettez le calcul sur Slurm et récupérez automatiquement l’objet phyloseq dans BarCodeR.",
    fastqSteps: ["FASTQ", "OpenMetaBar", "Nextflow / Slurm", "phyloseq", "BarCodeR"],
    fastqAction: "Voir le parcours FASTQ",
    phyloseqTitle: "J’ai déjà un objet phyloseq",
    phyloseqTag: "Accès direct",
    phyloseqText: "Importez votre objet ou ses composants, contrôlez sa structure, créez des versions filtrées puis explorez et testez vos hypothèses.",
    phyloseqSteps: ["Import", "Diagnostic", "Filtration", "Analyses", "MultiView"],
    phyloseqAction: "Voir le parcours phyloseq",
    questionsK: "Partir de la question scientifique",
    questionsT: "L’interface ne vous demande pas d’apprendre treize onglets avant de commencer.",
    questionsP: "Choisissez d’abord ce que vous cherchez à comprendre. BarCodeR vous oriente ensuite vers les données requises, les méthodes compatibles et les diagnostics à vérifier.",
    questions: [
      ["Composition", "Quels taxons structurent mes communautés ?", "Barplots, analyses ciblées et niveaux taxonomiques."],
      ["Diversité", "La diversité diffère-t-elle entre mes groupes ?", "Richesse, Shannon, Simpson, Faith PD et tests associés."],
      ["Structure", "Comment mes échantillons s’organisent-ils ?", "Ordinations, distances, stress et robustesse."],
      ["Hypothèses", "Une variable explique-t-elle les différences ?", "PERMANOVA accompagnée du contrôle de dispersion."],
      ["Taxons", "Quels taxons sont associés à une condition ?", "Cinq moteurs différentiels et comparaison de concordance."],
      ["Matrices", "Deux marqueurs racontent-ils la même histoire ?", "Mantel, Procrustes, RV, co-inertie et MCOA."]
    ],
    questionsAction: "Parcourir toutes les analyses",
    strengthsK: "Ce que BarCodeR ajoute aux calculs",
    strengthsT: "Une interface guidée, sans transformer les méthodes en boîte noire.",
    strengths: [
      ["01", "Diagnostiquer avant d’analyser", "Profondeur, sparsité, complétude taxonomique, métadonnées, séquences, raréfaction et échantillons atypiques sont examinés avant les tests."],
      ["02", "Conserver la lignée des datasets", "L’édition corrige l’objet ; la filtration crée une version dérivée. Le dataset original et les transformations restent identifiables."],
      ["03", "Vérifier les hypothèses", "Stress, dispersion, stabilité, tailles d’effet et diagnostics complètent les représentations graphiques et les p-values."],
      ["04", "Continuer hors de l’interface", "Figures, tableaux, historiques et code R permettent de relire, partager ou prolonger une analyse dans un workflow personnalisé."]
    ],
    proofK: "De l’analyse à la restitution",
    proofT: "Vos résultats restent associés à leur contexte.",
    proofP: "MultiView rassemble les figures sauvegardées, leurs paramètres et leur provenance pour construire une planche réutilisable. L’objectif n’est pas seulement de générer une image, mais de pouvoir expliquer comment elle a été obtenue.",
    proofAction: "Découvrir MultiView",
    showcaseAction: "Voir les cas d’usage",
    audienceK: "Quatre usages, un même socle",
    audienceT: "Un point de rencontre entre expertise biologique, statistiques et bioinformatique.",
    audienceP: "Chaque profil peut entrer par le niveau qui lui convient, tout en partageant les mêmes objets, paramètres et résultats.",
    audiences: [
      ["Biologistes & écologues", "Explorer un dataset, tester une hypothèse et produire des figures sans programmer les analyses courantes.", "Tester avec un exemple", "#/tutorials"],
      ["Bioinformaticiens", "Inspecter les objets phyloseq, les transformations, les paramètres et le code R généré.", "Explorer les méthodes", "#/analyses"],
      ["Plateformes", "Standardiser les parcours, connecter un cluster et remettre des projets documentés aux utilisateurs.", "Comprendre le fonctionnement", "#/functioning"],
      ["Équipes de recherche", "Partager des datasets dérivés, reprendre une analyse et composer les résultats dans un cadre commun.", "Consulter la documentation", "#/documentation"]
    ],
    finalK: "Commencer",
    finalT: "Testez d’abord le parcours qui correspond à vos données.",
    finalP: "Utilisez un dataset public pour découvrir l’interface, consultez les méthodes avant de lancer un test ou installez BarCodeR pour travailler sur vos propres objets phyloseq.",
    finalTutorial: "Ouvrir les tutoriels",
    finalDocs: "Consulter la documentation",
    finalDownload: "Télécharger BarCodeR",
    citationK: "Science ouverte · communauté",
    citationT: "Une analyse reproductible doit aussi être identifiable et citable.",
    citationP: "Les versions, le code source, les conditions de disponibilité et les informations de citation sont regroupés dans l’espace de téléchargement et de science ouverte."
  } : {
    badge: "Reproducible metabarcoding · processing, checking and analysis",
    title: <>From FASTQ to figures,<br /><em>in a traceable workflow.</em></>,
    intro: "OpenMetaBar prepares and monitors sequence processing on an HPC cluster. BarCodeR then checks phyloseq objects, guides analytical choices and produces figures, tables and R scripts without hiding the parameters used.",
    workflowAction: "Explore the workflow",
    analysesAction: "Explore analyses",
    downloadAction: "Download BarCodeR",
    version: "Versions presented: BarCodeR v2.12.8 · OpenMetaBar v1.0.0",
    metrics: [
      ["3", "sequencing technologies", "Illumina · PacBio · Oxford Nanopore"],
      ["5", "differential engines", "ANCOM-BC2 · LinDA · ALDEx2 · corncob · MaAsLin 3"],
      ["6", "ordination families", "PCA · PCoA · NMDS · CCA · RDA · dbRDA"],
      ["R", "exportable code", "Start in the interface, continue in R"]
    ],
    journeysK: "Two entry points",
    journeysT: "Start with the data you already have.",
    journeysP: "OpenMetaBar and BarCodeR form a continuum but remain independent. A cluster is required only for remote sequence processing.",
    fastqTitle: "I have FASTQ files",
    fastqTag: "Complete journey",
    fastqText: "Prepare the design, configure the pipeline, submit the computation to Slurm and automatically retrieve the phyloseq object in BarCodeR.",
    fastqSteps: ["FASTQ", "OpenMetaBar", "Nextflow / Slurm", "phyloseq", "BarCodeR"],
    fastqAction: "View the FASTQ journey",
    phyloseqTitle: "I already have a phyloseq object",
    phyloseqTag: "Direct access",
    phyloseqText: "Import your object or its components, check its structure, create filtered versions, then explore and test your hypotheses.",
    phyloseqSteps: ["Import", "Diagnosis", "Filtering", "Analyses", "MultiView"],
    phyloseqAction: "View the phyloseq journey",
    questionsK: "Start from the scientific question",
    questionsT: "The interface does not require you to learn thirteen tabs before you begin.",
    questionsP: "First choose what you need to understand. BarCodeR then points you to the required data, compatible methods and diagnostics to check.",
    questions: [
      ["Composition", "Which taxa structure my communities?", "Bar plots, targeted analyses and taxonomic levels."],
      ["Diversity", "Does diversity differ among groups?", "Richness, Shannon, Simpson, Faith PD and associated tests."],
      ["Structure", "How are my samples organised?", "Ordinations, distances, stress and robustness."],
      ["Hypotheses", "Does a variable explain the differences?", "PERMANOVA accompanied by a dispersion check."],
      ["Taxa", "Which taxa are associated with a condition?", "Five differential engines and concordance comparison."],
      ["Matrices", "Do two markers tell the same story?", "Mantel, Procrustes, RV, co-inertia and MCOA."]
    ],
    questionsAction: "Browse all analyses",
    strengthsK: "What BarCodeR adds to computations",
    strengthsT: "A guided interface without turning methods into a black box.",
    strengths: [
      ["01", "Diagnose before analysing", "Depth, sparsity, taxonomic completeness, metadata, sequences, rarefaction and atypical samples are examined before testing."],
      ["02", "Retain dataset lineage", "Editing corrects the object; filtering creates a derived version. The original dataset and transformations remain identifiable."],
      ["03", "Check assumptions", "Stress, dispersion, stability, effect sizes and diagnostics complement graphical representations and p-values."],
      ["04", "Continue outside the interface", "Figures, tables, histories and R code support review, sharing or extension in a customised workflow."]
    ],
    proofK: "From analysis to reporting",
    proofT: "Your results remain linked to their context.",
    proofP: "MultiView brings together saved figures, their parameters and provenance to build a reusable panel. The aim is not only to generate an image, but to explain how it was obtained.",
    proofAction: "Discover MultiView",
    showcaseAction: "View use cases",
    audienceK: "Four uses, one shared foundation",
    audienceT: "A meeting point for biological expertise, statistics and bioinformatics.",
    audienceP: "Each profile can enter at the appropriate level while sharing the same objects, parameters and results.",
    audiences: [
      ["Biologists & ecologists", "Explore a dataset, test a hypothesis and produce figures without programming routine analyses.", "Try an example", "#/tutorials"],
      ["Bioinformaticians", "Inspect phyloseq objects, transformations, parameters and generated R code.", "Explore methods", "#/analyses"],
      ["Core facilities", "Standardise journeys, connect a cluster and deliver documented projects to users.", "Understand the workflow", "#/functioning"],
      ["Research teams", "Share derived datasets, resume analyses and compose results in a common framework.", "Read the documentation", "#/documentation"]
    ],
    finalK: "Get started",
    finalT: "First test the journey that matches your data.",
    finalP: "Use a public dataset to discover the interface, review methods before running a test or install BarCodeR to work with your own phyloseq objects.",
    finalTutorial: "Open tutorials",
    finalDocs: "Read the documentation",
    finalDownload: "Download BarCodeR",
    citationK: "Open science · community",
    citationT: "A reproducible analysis must also be identifiable and citable.",
    citationP: "Versions, source code, availability conditions and citation information are grouped in the download and open-science area."
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
          <a className="button tertiary" href="#/download">{c.downloadAction}<span>↓</span></a>
        </div>
        <p className="version-line"><span />{c.version}</p>
      </div>
      <div className="hero-media reveal delay-1">
        <div className="ambient-ring" />
        <HomeApplicationVisual language={language} />
        <div className="signal-card signal-one"><span>PS</span><div><b>{language === "fr" ? "Objet phyloseq" : "Phyloseq object"}</b><small>{language === "fr" ? "Entrée standardisée" : "Standardised input"}</small></div></div>
        <div className="signal-card signal-two"><span>HPC</span><div><b>{language === "fr" ? "Calcul distant optionnel" : "Optional remote computing"}</b><small>OpenMetaBar · Nextflow · Slurm</small></div></div>
        <div className="signal-card signal-three"><span>R</span><div><b>{language === "fr" ? "Code R prolongeable" : "Extensible R code"}</b><small>{language === "fr" ? "Paramètres visibles" : "Visible parameters"}</small></div></div>
      </div>
    </section>

    <section className="home-metrics-band">
      <div className="page-width home-metrics-grid">
        {c.metrics.map(([number, label, detail]) => <article key={label}><b>{number}</b><div><span>{label}</span><small>{detail}</small></div></article>)}
      </div>
    </section>

    <section className="section home-journeys page-width reveal">
      <div className="section-intro home-section-intro"><Eyebrow>{c.journeysK}</Eyebrow><h2>{c.journeysT}</h2><p>{c.journeysP}</p></div>
      <div className="journey-grid">
        <article className="journey-card openmetabar-journey">
          <div className="journey-card-head"><span>01</span><small>{c.fastqTag}</small></div>
          <h3>{c.fastqTitle}</h3><p>{c.fastqText}</p>
          <div className="journey-chain">{c.fastqSteps.map((step, index) => <div key={step}><b>{step}</b>{index < c.fastqSteps.length - 1 && <span>→</span>}</div>)}</div>
          <a href="#/functioning">{c.fastqAction}<span>↗</span></a>
        </article>
        <article className="journey-card barcoder-journey">
          <div className="journey-card-head"><span>02</span><small>{c.phyloseqTag}</small></div>
          <h3>{c.phyloseqTitle}</h3><p>{c.phyloseqText}</p>
          <div className="journey-chain">{c.phyloseqSteps.map((step, index) => <div key={step}><b>{step}</b>{index < c.phyloseqSteps.length - 1 && <span>→</span>}</div>)}</div>
          <a href="#/functioning">{c.phyloseqAction}<span>↗</span></a>
        </article>
      </div>
    </section>

    <section className="section section-tint home-questions">
      <div className="page-width">
        <div className="section-heading home-question-heading reveal"><div><Eyebrow>{c.questionsK}</Eyebrow><h2>{c.questionsT}</h2></div><p>{c.questionsP}</p></div>
        <div className="question-grid">
          {c.questions.map(([label, question, detail], index) => <a className="question-card reveal" style={{ "--delay": `${index * 45}ms` } as React.CSSProperties} href="#/analyses" key={question}><span>{String(index + 1).padStart(2, "0")} · {label}</span><h3>{question}</h3><p>{detail}</p><b>→</b></a>)}
        </div>
        <div className="section-action"><a className="button primary" href="#/analyses">{c.questionsAction}<span>→</span></a></div>
      </div>
    </section>

    <section className="section home-strengths page-width">
      <div className="section-intro home-section-intro reveal"><Eyebrow>{c.strengthsK}</Eyebrow><h2>{c.strengthsT}</h2></div>
      <div className="strength-grid">
        {c.strengths.map(([number, title, text], index) => <article className="reveal" style={{ "--delay": `${index * 55}ms` } as React.CSSProperties} key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>

    <section className="home-proof-section">
      <div className="page-width home-proof-grid reveal">
        <div className="home-proof-visual"><img src={asset("app-previews/screen-multiview.png")} alt={language === "fr" ? "Interface MultiView de BarCodeR" : "BarCodeR MultiView interface"} /><div className="proof-chip proof-chip-one">Barplot</div><div className="proof-chip proof-chip-two">Ordination</div><div className="proof-chip proof-chip-three">Differential</div></div>
        <div className="home-proof-copy"><Eyebrow>{c.proofK}</Eyebrow><h2>{c.proofT}</h2><p>{c.proofP}</p><div className="home-proof-actions"><a className="button secondary" href="#/application/multiview">{c.proofAction}<span>↗</span></a><a className="button tertiary" href="#/showcase">{c.showcaseAction}<span>→</span></a></div></div>
      </div>
    </section>

    <section className="section audience-section home-audiences">
      <div className="page-width">
        <div className="section-intro home-section-intro reveal"><Eyebrow>{c.audienceK}</Eyebrow><h2>{c.audienceT}</h2><p>{c.audienceP}</p></div>
        <div className="profile-grid">
          {c.audiences.map(([title, text, action, href], index) => <article className="reveal" style={{ "--delay": `${index * 55}ms` } as React.CSSProperties} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><a href={href}>{action}<b>→</b></a></article>)}
        </div>
      </div>
    </section>

    <section className="home-start-band">
      <div className="page-width home-start-inner reveal"><div><Eyebrow>{c.finalK}</Eyebrow><h2>{c.finalT}</h2><p>{c.finalP}</p></div><div className="home-start-actions"><a className="button start-light" href="#/tutorials">{c.finalTutorial}<span>→</span></a><a className="button start-outline" href="#/documentation">{c.finalDocs}<span>↗</span></a><a className="button start-accent" href="#/download">{c.finalDownload}<span>↓</span></a></div></div>
    </section>

    <section className="citation-band"><div className="page-width citation-band-inner reveal"><span className="citation-symbol">×</span><div><Eyebrow>{c.citationK}</Eyebrow><h2>{c.citationT}</h2><p>{c.citationP}</p><a className="citation-link" href="#/download">{language === "fr" ? "Versions, code et citation" : "Versions, code and citation"}<span>→</span></a></div></div></section>
  </main>;
}
function ModuleGrid({ language, limit }: { language: Language; limit?: number }) {
  return <div className="module-grid">{modules.slice(0, limit).map((module, index) => <a href={moduleHref(module.key)} className="module-card reveal" style={{ "--delay": `${(index % 4) * 45}ms` } as React.CSSProperties} key={module.key}><div className="module-card-top"><span>{module.order}</span><i>{module.icon}</i></div><small>{tx(groups[module.group], language)}</small><h3>{tx(module.title, language)}</h3><p>{tx(module.purpose, language)}</p><b>{language === "fr" ? "Ouvrir la page" : "Open page"}<span>↗</span></b></a>)}</div>;
}

function ApplicationIndex({ language }: { language: Language }) {
  const c = language === "fr" ? {
    k: "Fonctionnement de l’écosystème",
    title: <>Deux outils complémentaires,<br /><em>un même fil scientifique.</em></>,
    p: "OpenMetaBar orchestre le traitement distant des séquences. BarCodeR prend ensuite en charge les objets phyloseq, leur contrôle, leur transformation, les analyses statistiques et la restitution. Les deux outils peuvent être utilisés ensemble ou séparément.",
    primary: "Voir le parcours complet",
    secondary: "Explorer les modules",
    bridge: "Le point de jonction",
    bridgeTitle: "L’objet phyloseq relie le traitement bioinformatique à l’analyse.",
    bridgeP: "OpenMetaBar peut produire un objet directement importable dans BarCodeR. BarCodeR accepte également des objets phyloseq déjà construits ou leurs composants fournis séparément.",
    productsK: "Rôles respectifs",
    productsT: "Une séparation claire entre traitement des reads et analyse scientifique.",
    openmetaRole: "Traitement bioinformatique distant",
    openmetaText: "Préparer un design, configurer un pipeline, transférer les entrées, soumettre sur Slurm, suivre Nextflow et récupérer les sorties.",
    openmetaTags: ["FASTQ", "SSH", "Slurm", "Nextflow", "Monitoring"],
    barcoderRole: "Contrôle, exploration et analyse",
    barcoderText: "Vérifier la structure des données, gérer plusieurs versions, filtrer, explorer, tester des hypothèses et composer les résultats.",
    barcoderTags: ["phyloseq", "Diagnostics", "Statistiques", "Code R", "MultiView"],
    independent: "Indépendants par conception",
    independentP: "OpenMetaBar n’est pas requis pour analyser un phyloseq dans BarCodeR. Inversement, les sorties d’OpenMetaBar restent exploitables en dehors de BarCodeR.",
    pathsK: "Deux points d’entrée",
    pathsT: "Le parcours s’adapte au niveau auquel commencent vos données.",
    pathsP: "Les étapes affichées décrivent la logique de travail, pas une obligation de passer par tous les modules.",
    fastqLabel: "Parcours A",
    fastqTitle: "Je pars de fichiers FASTQ",
    fastqIntro: "OpenMetaBar structure le passage des séquences brutes vers un objet scientifique contrôlable.",
    fastqSteps: [
      ["01", "Préparer les entrées", "FASTQ, design expérimental et base de référence."],
      ["02", "Configurer le traitement", "Technologie, moteur, amorces, filtres et ressources HPC."],
      ["03", "Valider avant lancement", "Cohérence des chemins, paramètres et fichiers attendus."],
      ["04", "Soumettre et suivre", "SSH, Slurm, Nextflow, états des jobs et journaux d’exécution."],
      ["05", "Récupérer les résultats", "Tables, rapports, séquences et objet phyloseq."],
      ["06", "Poursuivre dans BarCodeR", "Description, filtration, analyses et restitution."],
    ],
    phyloseqLabel: "Parcours B",
    phyloseqTitle: "J’ai déjà un objet phyloseq",
    phyloseqIntro: "BarCodeR commence directement par la validation de l’objet et la préparation de versions analytiques traçables.",
    phyloseqSteps: [
      ["01", "Importer", "Objet phyloseq ou composants fournis séparément."],
      ["02", "Diagnostiquer", "Dimensions, profondeur, sparsité, taxonomie et métadonnées."],
      ["03", "Corriger si nécessaire", "Identifiants, tables, taxonomie, séquences ou arbre."],
      ["04", "Créer une version analytique", "Filtres d’abondance, prévalence, taxonomie ou échantillons."],
      ["05", "Explorer et tester", "Figures descriptives, ordinations, modèles et diagnostics."],
      ["06", "Restituer", "Historique, tableaux, scripts R, bibliothèque et MultiView."],
    ],
    hpcK: "Cycle de vie d’un run OpenMetaBar",
    hpcT: "Le calcul distant reste visible de la configuration jusqu’à la récupération.",
    hpcP: "L’interface ne remplace pas Slurm ou Nextflow : elle rend leurs états, leurs paramètres et leurs journaux accessibles dans un parcours unique.",
    hpcSteps: [
      ["Configuration", "Choix des entrées, de la technologie et des paramètres."],
      ["Validation", "Contrôles avant transfert et génération de la commande."],
      ["Soumission", "Création du job sur l’infrastructure distante."],
      ["Exécution", "Traitement par Nextflow et les outils du pipeline."],
      ["Monitoring", "Lecture des états Slurm, progression et logs."],
      ["Intégration", "Récupération des sorties et import du phyloseq."],
    ],
    lineageK: "Projets et lignée des datasets",
    lineageT: "Conserver l’original tout en construisant plusieurs versions analytiques.",
    lineageP: "BarCodeR distingue la correction structurelle d’un objet et la création d’un sous-dataset filtré. Chaque branche peut répondre à une hypothèse différente sans écraser la version précédente.",
    lineageNodes: [
      ["Objet original", "Import conservé comme référence"],
      ["Dataset corrigé", "Structure et métadonnées harmonisées"],
      ["Filtration faible", "Exploration et contrôle de sensibilité"],
      ["Filtration standard", "Analyse principale"],
      ["Filtration stricte", "Analyse de robustesse"],
    ],
    editTitle: "Éditer corrige l’objet",
    editP: "L’édition agit sur la structure, les identifiants ou les composants du phyloseq.",
    filterTitle: "Filtrer crée une version dérivée",
    filterP: "La filtration sélectionne des taxons ou échantillons selon des règles analytiques explicites.",
    responsibilityK: "Ce que l’écosystème garantit — et ce qu’il ne remplace pas",
    responsibilityT: "La traçabilité encadre les choix ; elle ne décide pas à la place du scientifique.",
    guarantees: [
      "Paramètres et étapes visibles dans l’interface.",
      "Conservation de plusieurs datasets et de leur filiation.",
      "Diagnostics associés aux méthodes lorsqu’ils sont disponibles.",
      "Sorties exportables et analyses prolongeables avec R.",
    ],
    responsibilities: [
      "Qualité du plan expérimental et de l’échantillonnage.",
      "Pertinence des amorces et de la base de référence.",
      "Choix des seuils, transformations, distances et modèles.",
      "Interprétation biologique et portée des conclusions.",
    ],
    guaranteeTitle: "Fourni par l’outil",
    responsibilityTitle: "Reste sous responsabilité scientifique",
    modulesK: "Architecture détaillée",
    modulesT: "Retrouver les modules de l’application par étape du parcours.",
    modulesP: "Cette vue secondaire permet d’ouvrir chaque fiche fonctionnelle, avec ses entrées, opérations, sorties et points de vigilance.",
    discover: "Découvrir",
  } : {
    k: "How the ecosystem works",
    title: <>Two complementary tools,<br /><em>one scientific thread.</em></>,
    p: "OpenMetaBar orchestrates remote sequence processing. BarCodeR then handles phyloseq objects, quality checks, transformations, statistical analyses and reporting. Both tools can be used together or independently.",
    primary: "View the complete journey",
    secondary: "Explore the modules",
    bridge: "The connection point",
    bridgeTitle: "The phyloseq object connects bioinformatics processing to analysis.",
    bridgeP: "OpenMetaBar can produce an object that is directly importable into BarCodeR. BarCodeR also accepts existing phyloseq objects or their components supplied separately.",
    productsK: "Respective roles",
    productsT: "A clear separation between read processing and scientific analysis.",
    openmetaRole: "Remote bioinformatics processing",
    openmetaText: "Prepare a design, configure a pipeline, transfer inputs, submit through Slurm, monitor Nextflow and retrieve outputs.",
    openmetaTags: ["FASTQ", "SSH", "Slurm", "Nextflow", "Monitoring"],
    barcoderRole: "Quality control, exploration and analysis",
    barcoderText: "Check data structure, manage multiple versions, filter, explore, test hypotheses and assemble results.",
    barcoderTags: ["phyloseq", "Diagnostics", "Statistics", "R code", "MultiView"],
    independent: "Independent by design",
    independentP: "OpenMetaBar is not required to analyse a phyloseq object in BarCodeR. Conversely, OpenMetaBar outputs remain usable outside BarCodeR.",
    pathsK: "Two entry points",
    pathsT: "The journey adapts to the stage at which your data begin.",
    pathsP: "The displayed steps describe the working logic; users do not have to visit every module.",
    fastqLabel: "Journey A",
    fastqTitle: "I start with FASTQ files",
    fastqIntro: "OpenMetaBar structures the transition from raw sequences to a scientific object that can be inspected.",
    fastqSteps: [
      ["01", "Prepare inputs", "FASTQ files, experimental design and reference database."],
      ["02", "Configure processing", "Technology, engine, primers, filters and HPC resources."],
      ["03", "Validate before launch", "Consistency of paths, parameters and expected files."],
      ["04", "Submit and monitor", "SSH, Slurm, Nextflow, job states and execution logs."],
      ["05", "Retrieve results", "Tables, reports, sequences and phyloseq object."],
      ["06", "Continue in BarCodeR", "Description, filtering, analyses and reporting."],
    ],
    phyloseqLabel: "Journey B",
    phyloseqTitle: "I already have a phyloseq object",
    phyloseqIntro: "BarCodeR starts directly with object validation and preparation of traceable analytical versions.",
    phyloseqSteps: [
      ["01", "Import", "Phyloseq object or components supplied separately."],
      ["02", "Diagnose", "Dimensions, depth, sparsity, taxonomy and metadata."],
      ["03", "Correct when necessary", "Identifiers, tables, taxonomy, sequences or tree."],
      ["04", "Create an analytical version", "Abundance, prevalence, taxonomy or sample filters."],
      ["05", "Explore and test", "Descriptive figures, ordinations, models and diagnostics."],
      ["06", "Report", "History, tables, R scripts, library and MultiView."],
    ],
    hpcK: "OpenMetaBar run lifecycle",
    hpcT: "Remote computing remains visible from configuration to retrieval.",
    hpcP: "The interface does not replace Slurm or Nextflow: it presents their states, parameters and logs in one continuous journey.",
    hpcSteps: [
      ["Configuration", "Select inputs, technology and parameters."],
      ["Validation", "Checks before transfer and command generation."],
      ["Submission", "Create the job on the remote infrastructure."],
      ["Execution", "Processing through Nextflow and pipeline tools."],
      ["Monitoring", "Read Slurm states, progress and logs."],
      ["Integration", "Retrieve outputs and import the phyloseq object."],
    ],
    lineageK: "Projects and dataset lineage",
    lineageT: "Keep the original while building several analytical versions.",
    lineageP: "BarCodeR distinguishes structural correction of an object from creation of a filtered sub-dataset. Each branch can address a different hypothesis without overwriting the previous version.",
    lineageNodes: [
      ["Original object", "Import preserved as reference"],
      ["Corrected dataset", "Structure and metadata harmonised"],
      ["Light filtering", "Exploration and sensitivity control"],
      ["Standard filtering", "Primary analysis"],
      ["Strict filtering", "Robustness analysis"],
    ],
    editTitle: "Editing corrects the object",
    editP: "Editing acts on the structure, identifiers or components of the phyloseq object.",
    filterTitle: "Filtering creates a derived version",
    filterP: "Filtering selects taxa or samples through explicit analytical rules.",
    responsibilityK: "What the ecosystem guarantees — and what it does not replace",
    responsibilityT: "Traceability frames decisions; it does not make them for the scientist.",
    guarantees: [
      "Parameters and steps remain visible in the interface.",
      "Multiple datasets and their lineage are preserved.",
      "Diagnostics accompany methods when available.",
      "Outputs are exportable and analyses can continue in R.",
    ],
    responsibilities: [
      "Quality of the experimental design and sampling.",
      "Relevance of primers and reference database.",
      "Choice of thresholds, transformations, distances and models.",
      "Biological interpretation and scope of conclusions.",
    ],
    guaranteeTitle: "Provided by the tool",
    responsibilityTitle: "Remains a scientific responsibility",
    modulesK: "Detailed architecture",
    modulesT: "Find the application modules by stage of the journey.",
    modulesP: "This secondary view opens each functional page with its inputs, operations, outputs and cautions.",
    discover: "Discover",
  };

  const renderPath = (label: string, title: string, intro: string, steps: string[][], variant: "openmeta" | "barcoder") => (
    <article className={`function-path function-path-${variant} reveal`}>
      <div className="function-path-heading"><span>{label}</span><h3>{title}</h3><p>{intro}</p></div>
      <ol>{steps.map(([number, stepTitle, detail]) => <li key={number}><span>{number}</span><div><b>{stepTitle}</b><p>{detail}</p></div></li>)}</ol>
    </article>
  );

  return <main className="functioning-page">
    <section className="functioning-hero">
      <div className="page-width functioning-hero-grid">
        <div className="functioning-hero-copy reveal"><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p className="lead">{c.p}</p><div className="hero-actions"><button className="button primary" type="button" onClick={() => document.getElementById("function-paths")?.scrollIntoView({ behavior: "smooth" })}>{c.primary}<span>↓</span></button><button className="button secondary" type="button" onClick={() => document.getElementById("function-modules")?.scrollIntoView({ behavior: "smooth" })}>{c.secondary}<span>→</span></button></div></div>
        <div className="ecosystem-diagram reveal" aria-label={c.bridgeTitle}>
          <div className="ecosystem-tool ecosystem-openmeta"><img src={asset("app-previews/openmetabar-logo.png")} alt="" /><small>OpenMetaBar</small><b>FASTQ → pipeline</b></div>
          <div className="ecosystem-bridge"><span>phyloseq</span><i>→</i></div>
          <div className="ecosystem-tool ecosystem-barcoder"><img src={asset("app-previews/barcoder-logo.png")} alt="" /><small>BarCodeR</small><b>diagnostics → figures</b></div>
          <div className="ecosystem-note"><small>{c.bridge}</small><strong>{c.bridgeTitle}</strong><p>{c.bridgeP}</p></div>
        </div>
      </div>
    </section>

    <section className="section page-width function-products">
      <div className="section-heading reveal"><div><Eyebrow>{c.productsK}</Eyebrow><h2>{c.productsT}</h2></div></div>
      <div className="product-role-grid">
        <article className="product-role openmeta-role reveal"><div className="product-role-head"><img src={asset("app-previews/openmetabar-logo.png")} alt="" /><div><small>OpenMetaBar</small><h3>{c.openmetaRole}</h3></div></div><p>{c.openmetaText}</p><div className="role-tags">{c.openmetaTags.map(tag => <span key={tag}>{tag}</span>)}</div><figure><img src={asset("app-previews/screen-openmetabar.png")} alt={c.openmetaRole} /></figure></article>
        <article className="product-role barcoder-role reveal"><div className="product-role-head"><img src={asset("app-previews/barcoder-logo.png")} alt="" /><div><small>BarCodeR</small><h3>{c.barcoderRole}</h3></div></div><p>{c.barcoderText}</p><div className="role-tags">{c.barcoderTags.map(tag => <span key={tag}>{tag}</span>)}</div><figure><img src={asset("app-previews/barcoder-home-real.png")} alt={c.barcoderRole} /></figure></article>
      </div>
      <aside className="independence-note reveal"><span>↔</span><div><b>{c.independent}</b><p>{c.independentP}</p></div></aside>
    </section>

    <section className="section section-tint function-paths-section" id="function-paths">
      <div className="page-width"><div className="section-heading reveal"><div><Eyebrow>{c.pathsK}</Eyebrow><h2>{c.pathsT}</h2></div><p>{c.pathsP}</p></div><div className="function-path-grid">{renderPath(c.fastqLabel, c.fastqTitle, c.fastqIntro, c.fastqSteps, "openmeta")}{renderPath(c.phyloseqLabel, c.phyloseqTitle, c.phyloseqIntro, c.phyloseqSteps, "barcoder")}</div></div>
    </section>

    <section className="section page-width hpc-lifecycle">
      <div className="section-heading reveal"><div><Eyebrow>{c.hpcK}</Eyebrow><h2>{c.hpcT}</h2></div><p>{c.hpcP}</p></div>
      <div className="hpc-track reveal">{c.hpcSteps.map(([title, detail], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><i /><h3>{title}</h3><p>{detail}</p></article>)}</div>
      <div className="hpc-technology-row reveal"><span>SSH</span><i>→</i><span>Slurm</span><i>→</i><span>Nextflow</span><i>→</i><span>Logs</span><i>→</i><span>phyloseq</span></div>
    </section>

    <section className="dataset-lineage-section">
      <div className="page-width dataset-lineage-grid">
        <div className="dataset-lineage-copy reveal"><Eyebrow>{c.lineageK}</Eyebrow><h2>{c.lineageT}</h2><p>{c.lineageP}</p><div className="edition-filtering"><article><span>✎</span><div><b>{c.editTitle}</b><p>{c.editP}</p></div></article><article><span>⌁</span><div><b>{c.filterTitle}</b><p>{c.filterP}</p></div></article></div></div>
        <div className="lineage-tree reveal">{c.lineageNodes.map(([title, text], index) => <article className={`lineage-node lineage-node-${index}`} key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{title}</b><small>{text}</small></div></article>)}</div>
      </div>
    </section>

    <section className="section page-width responsibility-section">
      <div className="section-intro reveal"><Eyebrow>{c.responsibilityK}</Eyebrow><h2>{c.responsibilityT}</h2></div>
      <div className="responsibility-grid">
        <article className="responsibility-provided reveal"><span>✓</span><h3>{c.guaranteeTitle}</h3><ul>{c.guarantees.map(item => <li key={item}>{item}</li>)}</ul></article>
        <article className="responsibility-science reveal"><span>!</span><h3>{c.responsibilityTitle}</h3><ul>{c.responsibilities.map(item => <li key={item}>{item}</li>)}</ul></article>
      </div>
    </section>

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
    title: analysisText("Composition et taxons partagés", "Composition and shared taxa"),
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
    title: analysisText("Diversité alpha", "Alpha diversity"),
    question: analysisText("La richesse ou la diversité intra-échantillon diffère-t-elle entre mes groupes ?", "Does within-sample richness or diversity differ among groups?"),
    summary: analysisText("Calculer plusieurs indices, visualiser leur distribution et appliquer des tests adaptés au nombre de groupes et au plan d’étude.", "Compute several indices, visualise their distribution and apply tests suited to the number of groups and study design."),
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
    title: analysisText("Ordinations", "Ordinations"),
    question: analysisText("Comment les échantillons s’organisent-ils dans un espace multivarié ?", "How are samples organised in multivariate space?"),
    summary: analysisText("Résumer la structure globale avec des méthodes non contraintes ou contraintes, tout en contrôlant la qualité de la représentation.", "Summarise overall structure with unconstrained or constrained methods while checking representation quality."),
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
    title: analysisText("PERMANOVA et dispersion", "PERMANOVA and dispersion"),
    question: analysisText("Une variable explique-t-elle une part de la structure multivariée ?", "Does a variable explain part of multivariate structure?"),
    summary: analysisText("Tester les différences de centroïdes avec des permutations et vérifier séparément que les dispersions ne conduisent pas à une conclusion trompeuse.", "Test centroid differences with permutations and separately check that dispersion does not lead to a misleading conclusion."),
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
    title: analysisText("Analyses différentielles", "Differential analyses"),
    question: analysisText("Quels taxons sont associés à une condition après ajustement du modèle ?", "Which taxa are associated with a condition after model adjustment?"),
    summary: analysisText("Appliquer jusqu’à cinq moteurs sur un même jeu de taxons et comparer la significativité corrigée ainsi que la direction des effets.", "Run up to five engines on the same taxon set and compare adjusted significance and effect direction."),
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
    title: analysisText("Comparaison de matrices", "Matrix comparison"),
    question: analysisText("Plusieurs marqueurs ou représentations racontent-ils une structure cohérente ?", "Do multiple markers or representations reveal a coherent structure?"),
    summary: analysisText("Apparier rigoureusement les mêmes unités biologiques puis comparer distances, ordinations et configurations communes.", "Rigorously match the same biological units, then compare distances, ordinations and shared configurations."),
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
    title: analysisText("Réseaux d’associations", "Association networks"),
    question: analysisText("Quelles associations statistiques émergent entre taxons ou domaines ?", "Which statistical associations emerge among taxa or domains?"),
    summary: analysisText("Construire, filtrer et comparer des réseaux simples ou multi-domaines avec des diagnostics de stabilité et de structure.", "Build, filter and compare single- or multi-domain networks with stability and structural diagnostics."),
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
    title: analysisText("Clustering", "Clustering"),
    question: analysisText("Des regroupements non supervisés sont-ils compatibles avec les données ?", "Are unsupervised groupings compatible with the data?"),
    summary: analysisText("Regrouper échantillons ou taxons, comparer les algorithmes et évaluer la qualité des partitions avant toute interprétation biologique.", "Group samples or taxa, compare algorithms and assess partition quality before biological interpretation."),
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
  const [activeRequirement, setActiveRequirement] = useState<"all" | AnalysisRequirement>("all");

  const c = language === "fr" ? {
    k: "Capacités scientifiques",
    title: <>Choisir une méthode à partir de la <em>question biologique.</em></>,
    p: "BarCodeR distingue la description, le test d’hypothèse, la comparaison de matrices et la génération d’hypothèses. Chaque famille ci-dessous précise les données requises, la préparation, les diagnostics et les limites à examiner avant d’interpréter un résultat.",
    heroPrimary: "Trouver une méthode",
    heroSecondary: "Lire le guide méthodologique",
    metrics: [["8", "familles d’analyses"], ["5", "moteurs différentiels"], ["6", "méthodes d’ordination"], ["5", "cadres multi-matrices"]],
    orientK: "Orientation rapide",
    orientT: "Commencez par ce que vous cherchez à démontrer — ou à décrire.",
    orientP: "Cliquer sur une question filtre immédiatement le catalogue. Le filtre ne remplace pas le choix scientifique : il réduit seulement les méthodes à examiner.",
    families: [
      ["all", "Tout afficher", "Voir les huit familles disponibles."],
      ["describe", "Décrire mes données", "Composition, diversité et structure globale."],
      ["test", "Tester une hypothèse", "Effet d’une variable ou taxons associés."],
      ["compare", "Comparer plusieurs datasets", "Marqueurs, domaines ou représentations."],
      ["hypothesis", "Générer des hypothèses", "Réseaux et regroupements non supervisés."]
    ] as ["all" | AnalysisFamily, string, string][],
    catalogK: "Catalogue des méthodes",
    catalogT: "Des fiches conçues pour vérifier la compatibilité avant de calculer.",
    catalogP: "Filtrez par objectif et par composant disponible. Ouvrez ensuite chaque fiche pour consulter les entrées, la préparation, les diagnostics, les sorties et les limites.",
    objective: "Objectif",
    dataAvailable: "Composant ou contrainte",
    requirements: [
      ["all", "Toutes les méthodes"],
      ["metadata", "Métadonnées requises"],
      ["tree", "Arbre utilisable"],
      ["multiple", "Plusieurs datasets"],
      ["counts", "Comptes bruts"]
    ] as ["all" | AnalysisRequirement, string][],
    requirementLabels: { metadata: "Métadonnées", tree: "Arbre facultatif/requis", multiple: "Multi-datasets", counts: "Comptes" } as Record<AnalysisRequirement, string>,
    results: "méthodes affichées",
    reset: "Réinitialiser",
    methodsLabel: "Méthodes disponibles",
    detailsOne: "Entrées, préparation et diagnostics",
    detailsTwo: "Sorties et points de vigilance",
    inputs: "Entrées",
    preparation: "Préparation",
    diagnostics: "Diagnostics à vérifier",
    outputs: "Sorties",
    cautions: "Points de vigilance",
    openModule: "Ouvrir le module",
    readGuide: "Guide méthodologique",
    empty: "Aucune famille ne correspond à cette combinaison. Réinitialisez les filtres ou examinez les exigences de vos données.",
    compatibilityK: "Transformation × distance",
    compatibilityT: "La méthode commence avant le bouton Calculer.",
    compatibilityP: "La transformation définit la représentation des données ; la distance définit ce que signifie être similaire. Certaines associations sont cohérentes, d’autres sont redondantes ou invalides.",
    tableHeaders: ["Question", "Données", "Préparation", "Distance / modèle", "Analyses compatibles"],
    compatibilityRows: [
      ["Composition taxonomique", "Comptes", "Agrégation + abondance relative", "Aucune distance", "Barplot · Heat Tree"],
      ["Structure d’abondance", "Comptes ou proportions", "Relatif ou Hellinger", "Bray-Curtis", "PCoA · NMDS · PERMANOVA"],
      ["Structure compositionnelle", "Comptes avec zéros traités", "CLR", "Aitchison", "PCA · PCoA · clustering"],
      ["Présence-absence", "Comptes binarisés", "Présence-absence", "Jaccard", "PCoA · NMDS · PERMANOVA"],
      ["Structure phylogénétique", "OTU + arbre", "Selon pondération choisie", "UniFrac", "PCoA · PERMANOVA"],
      ["Taxons associés", "Comptes entiers", "Filtre partagé, sans CLR", "Modèle par taxon", "ANCOM-BC2 · LinDA · ALDEx2 · corncob · MaAsLin 3"]
    ],
    warningTitle: "Combinaisons à éviter",
    warningItems: ["CLR suivi de Bray-Curtis : la géométrie log-ratio n’est plus respectée.", "Aitchison après une transformation CLR déjà appliquée : risque de double transformation.", "ALDEx2, ANCOM-BC2 ou rarefaction sur des proportions : ces méthodes attendent des comptes.", "UniFrac sans arbre correctement apparié aux taxons : résultat impossible ou invalide."],
    workflowK: "Parcours recommandé",
    workflowT: "Une séquence courte pour éviter de tester trop tôt.",
    workflowSteps: [
      ["01", "Contrôler l’objet", "Structure, profondeur, taxonomie, métadonnées, arbre et valeurs manquantes dans Description."],
      ["02", "Conserver une référence", "Garder le dataset brut et créer une version filtrée documentée plutôt que l’écraser."],
      ["03", "Décrire avant de tester", "Examiner composition, diversité et ordination pour comprendre les principales structures."],
      ["04", "Vérifier les hypothèses", "Contrôler stress, dispersion, blocs, réplicats et compatibilité transformation-distance."],
      ["05", "Tester avec un modèle explicite", "Définir facteur principal, référence, covariables, effets aléatoires et permutations."],
      ["06", "Lire au-delà de la p-value", "Examiner taille d’effet, R², q-value, prévalence, stabilité et cohérence entre méthodes."],
      ["07", "Sauvegarder le contexte", "Conserver tables, figures, paramètres, code R et dataset source dans le projet."]
    ],
    limitsK: "Interprétation",
    limitsT: "Ce que les résultats ne démontrent pas à eux seuls.",
    limits: [
      ["Ordination", "Une distance visuelle ou un chevauchement d’ellipses ne constitue pas un test statistique."],
      ["PERMANOVA", "Une significativité peut être liée aux centroïdes, aux dispersions ou aux deux."],
      ["Différentiel", "Un consensus entre moteurs renforce la robustesse, mais les amplitudes restent sur des échelles différentes."],
      ["Mantel", "Une corrélation globale élevée n’identifie pas les échantillons responsables de l’accord ou du désaccord."],
      ["Réseaux", "Une association n’établit ni causalité, ni interaction directe, ni statut d’espèce clé."],
      ["Clustering", "Une partition stable peut être statistiquement nette sans correspondre à une entité biologique pertinente."]
    ],
    finalTitle: "La méthode retenue doit rester explicable.",
    finalP: "Les fiches du site orientent le choix. Le guide méthodologique détaille les hypothèses et la documentation technique décrit les paramètres effectivement utilisés par l’application.",
    finalModule: "Inspecter le module Analyse",
    finalDocs: "Ouvrir la documentation"
  } : {
    k: "Scientific capabilities",
    title: <>Choose a method from the <em>biological question.</em></>,
    p: "BarCodeR separates description, hypothesis testing, matrix comparison and hypothesis generation. Each family below specifies required data, preparation, diagnostics and limitations to examine before interpreting a result.",
    heroPrimary: "Find a method",
    heroSecondary: "Read the methodological guide",
    metrics: [["8", "analysis families"], ["5", "differential engines"], ["6", "ordination methods"], ["5", "multi-matrix frameworks"]],
    orientK: "Quick orientation",
    orientT: "Start with what you need to demonstrate — or describe.",
    orientP: "Selecting a question immediately filters the catalogue. The filter does not replace scientific choice; it only narrows the methods to examine.",
    families: [
      ["all", "Show everything", "View all eight available families."],
      ["describe", "Describe my data", "Composition, diversity and overall structure."],
      ["test", "Test a hypothesis", "Effect of a variable or associated taxa."],
      ["compare", "Compare several datasets", "Markers, domains or representations."],
      ["hypothesis", "Generate hypotheses", "Networks and unsupervised groupings."]
    ] as ["all" | AnalysisFamily, string, string][],
    catalogK: "Method catalogue",
    catalogT: "Cards designed to check compatibility before computing.",
    catalogP: "Filter by objective and available component. Then open each card to review inputs, preparation, diagnostics, outputs and limitations.",
    objective: "Objective",
    dataAvailable: "Component or constraint",
    requirements: [
      ["all", "All methods"],
      ["metadata", "Metadata required"],
      ["tree", "Usable tree"],
      ["multiple", "Several datasets"],
      ["counts", "Raw counts"]
    ] as ["all" | AnalysisRequirement, string][],
    requirementLabels: { metadata: "Metadata", tree: "Optional/required tree", multiple: "Multiple datasets", counts: "Counts" } as Record<AnalysisRequirement, string>,
    results: "methods displayed",
    reset: "Reset",
    methodsLabel: "Available methods",
    detailsOne: "Inputs, preparation and diagnostics",
    detailsTwo: "Outputs and cautions",
    inputs: "Inputs",
    preparation: "Preparation",
    diagnostics: "Diagnostics to check",
    outputs: "Outputs",
    cautions: "Cautions",
    openModule: "Open module",
    readGuide: "Methodological guide",
    empty: "No family matches this combination. Reset the filters or review your data requirements.",
    compatibilityK: "Transformation × distance",
    compatibilityT: "The method starts before the Compute button.",
    compatibilityP: "Transformation defines the data representation; distance defines what similarity means. Some combinations are coherent, while others are redundant or invalid.",
    tableHeaders: ["Question", "Data", "Preparation", "Distance / model", "Compatible analyses"],
    compatibilityRows: [
      ["Taxonomic composition", "Counts", "Aggregation + relative abundance", "No distance", "Barplot · Heat Tree"],
      ["Abundance structure", "Counts or proportions", "Relative or Hellinger", "Bray-Curtis", "PCoA · NMDS · PERMANOVA"],
      ["Compositional structure", "Counts with handled zeros", "CLR", "Aitchison", "PCA · PCoA · clustering"],
      ["Presence-absence", "Binarised counts", "Presence-absence", "Jaccard", "PCoA · NMDS · PERMANOVA"],
      ["Phylogenetic structure", "OTU + tree", "According to weighting", "UniFrac", "PCoA · PERMANOVA"],
      ["Associated taxa", "Integer counts", "Shared filter, no CLR", "Taxon-level model", "ANCOM-BC2 · LinDA · ALDEx2 · corncob · MaAsLin 3"]
    ],
    warningTitle: "Combinations to avoid",
    warningItems: ["CLR followed by Bray-Curtis: the log-ratio geometry is no longer respected.", "Aitchison after an already applied CLR transformation: risk of double transformation.", "ALDEx2, ANCOM-BC2 or rarefaction on proportions: these methods expect counts.", "UniFrac without a tree correctly matched to taxa: the result is impossible or invalid."],
    workflowK: "Recommended journey",
    workflowT: "A short sequence to avoid testing too early.",
    workflowSteps: [
      ["01", "Check the object", "Structure, depth, taxonomy, metadata, tree and missing values in Description."],
      ["02", "Retain a reference", "Keep the raw dataset and create a documented filtered version rather than overwriting it."],
      ["03", "Describe before testing", "Review composition, diversity and ordination to understand the main structures."],
      ["04", "Check assumptions", "Check stress, dispersion, blocks, replicates and transformation-distance compatibility."],
      ["05", "Test with an explicit model", "Define the main factor, reference, covariates, random effects and permutations."],
      ["06", "Read beyond the p-value", "Review effect size, R², q-value, prevalence, stability and agreement among methods."],
      ["07", "Save the context", "Retain tables, figures, parameters, R code and source dataset in the project."]
    ],
    limitsK: "Interpretation",
    limitsT: "What the results do not demonstrate on their own.",
    limits: [
      ["Ordination", "Visual distance or ellipse overlap is not a statistical test."],
      ["PERMANOVA", "Significance may relate to centroids, dispersions or both."],
      ["Differential", "Agreement among engines strengthens robustness, but magnitudes remain on different scales."],
      ["Mantel", "A high global correlation does not identify the samples responsible for agreement or disagreement."],
      ["Networks", "An association establishes neither causality, direct interaction nor keystone status."],
      ["Clustering", "A stable partition can be statistically clear without corresponding to a relevant biological entity."]
    ],
    finalTitle: "The selected method must remain explainable.",
    finalP: "Website cards guide the choice. The methodological guide details assumptions and the technical documentation describes the parameters actually used by the application.",
    finalModule: "Inspect the Analysis module",
    finalDocs: "Open documentation"
  };

  const visibleMethods = analysisMethodCatalog.filter(method => {
    const familyMatch = activeFamily === "all" || method.family === activeFamily;
    const requirementMatch = activeRequirement === "all" || method.requirements.includes(activeRequirement);
    return familyMatch && requirementMatch;
  });

  const selectFamily = (family: "all" | AnalysisFamily) => {
    setActiveFamily(family);
    window.setTimeout(() => document.getElementById("analysis-catalog")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const resetFilters = () => {
    setActiveFamily("all");
    setActiveRequirement("all");
  };

  const guidePath = asset(`documentation/${language}/analyse/guides-methodologiques.html`);

  return <main className="analyses-page">
    <section className="analyses-hero page-width">
      <div className="analyses-hero-copy reveal">
        <Eyebrow>{c.k}</Eyebrow>
        <h1>{c.title}</h1>
        <p className="lead">{c.p}</p>
        <div className="hero-actions">
          <button className="button primary" type="button" onClick={() => document.getElementById("analysis-catalog")?.scrollIntoView({ behavior: "smooth", block: "start" })}>{c.heroPrimary}<span>↓</span></button>
          <a className="button secondary" href={guidePath} target="_blank" rel="noreferrer">{c.heroSecondary}<span>↗</span></a>
        </div>
      </div>
      <div className="analysis-hero-metrics reveal delay-1">
        {c.metrics.map(([number, label]) => <article key={label}><b>{number}</b><span>{label}</span></article>)}
      </div>
    </section>

    <section className="section section-tint analysis-orientation">
      <div className="page-width">
        <div className="section-heading analysis-orientation-heading reveal"><div><Eyebrow>{c.orientK}</Eyebrow><h2>{c.orientT}</h2></div><p>{c.orientP}</p></div>
        <div className="analysis-question-selector">
          {c.families.slice(1).map(([id, title, text], index) => <button type="button" className={activeFamily === id ? "active" : ""} onClick={() => selectFamily(id as AnalysisFamily)} aria-pressed={activeFamily === id} key={id}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p><i>→</i></button>)}
        </div>
      </div>
    </section>

    <section className="section page-width analysis-catalog-section" id="analysis-catalog">
      <div className="section-heading analysis-catalog-heading reveal"><div><Eyebrow>{c.catalogK}</Eyebrow><h2>{c.catalogT}</h2></div><p>{c.catalogP}</p></div>
      <div className="analysis-filter-panel reveal">
        <div className="analysis-filter-group"><b>{c.objective}</b><div>{c.families.map(([id, title]) => <button type="button" className={activeFamily === id ? "active" : ""} onClick={() => setActiveFamily(id)} aria-pressed={activeFamily === id} key={id}>{title}</button>)}</div></div>
        <div className="analysis-filter-group"><b>{c.dataAvailable}</b><div>{c.requirements.map(([id, title]) => <button type="button" className={activeRequirement === id ? "active" : ""} onClick={() => setActiveRequirement(id)} aria-pressed={activeRequirement === id} key={id}>{title}</button>)}</div></div>
        <div className="analysis-filter-status"><span><b>{visibleMethods.length}</b> {c.results}</span><button type="button" onClick={resetFilters}>{c.reset} ↺</button></div>
      </div>

      {visibleMethods.length > 0 ? <div className="analysis-method-grid">
        {visibleMethods.map((method, index) => <article className="analysis-method-card reveal" style={{ "--delay": `${(index % 2) * 55}ms` } as React.CSSProperties} key={method.id}>
          <div className="analysis-method-media">
            {method.image ? <img src={asset(`app-previews/${method.image}`)} alt="" loading="lazy" /> : <div className="analysis-network-visual" aria-hidden="true"><span /><span /><span /><span /><i /><i /><i /></div>}
            <span className="analysis-method-number">{method.number}</span><i className="analysis-method-icon">{method.icon}</i>
          </div>
          <div className="analysis-method-body">
            <div className="analysis-requirement-row">{method.requirements.length > 0 ? method.requirements.map(item => <span key={item}>{c.requirementLabels[item]}</span>) : <span>{language === "fr" ? "OTU/ASV" : "OTU/ASV"}</span>}</div>
            <h3>{tx(method.title, language)}</h3>
            <p className="analysis-method-question">{tx(method.question, language)}</p>
            <p className="analysis-method-summary">{tx(method.summary, language)}</p>
            <small>{c.methodsLabel}</small>
            <div className="analysis-method-pills">{method.methods.map(item => <span key={item}>{item}</span>)}</div>
            <details>
              <summary>{c.detailsOne}<span>+</span></summary>
              <div className="analysis-detail-grid">
                <div><b>{c.inputs}</b><ul>{method.inputs.map(item => <li key={item.fr}>{tx(item, language)}</li>)}</ul></div>
                <div><b>{c.preparation}</b><ul>{method.preparation.map(item => <li key={item.fr}>{tx(item, language)}</li>)}</ul></div>
                <div><b>{c.diagnostics}</b><ul>{method.diagnostics.map(item => <li key={item.fr}>{tx(item, language)}</li>)}</ul></div>
              </div>
            </details>
            <details>
              <summary>{c.detailsTwo}<span>+</span></summary>
              <div className="analysis-detail-grid two-cols">
                <div><b>{c.outputs}</b><ul>{method.outputs.map(item => <li key={item.fr}>{tx(item, language)}</li>)}</ul></div>
                <div className="analysis-caution-list"><b>{c.cautions}</b><ul>{method.cautions.map(item => <li key={item.fr}>{tx(item, language)}</li>)}</ul></div>
              </div>
            </details>
            <div className="analysis-method-actions"><a href={moduleHref(method.moduleKey)}>{c.openModule}<span>→</span></a><a href={guidePath} target="_blank" rel="noreferrer">{c.readGuide}<span>↗</span></a></div>
          </div>
        </article>)}
      </div> : <div className="analysis-empty"><span>∅</span><p>{c.empty}</p><button type="button" onClick={resetFilters}>{c.reset}</button></div>}
    </section>

    <section className="analysis-compatibility-section">
      <div className="page-width">
        <div className="section-heading reveal"><div><Eyebrow>{c.compatibilityK}</Eyebrow><h2>{c.compatibilityT}</h2></div><p>{c.compatibilityP}</p></div>
        <div className="analysis-table-wrap reveal"><table><thead><tr>{c.tableHeaders.map(header => <th key={header}>{header}</th>)}</tr></thead><tbody>{c.compatibilityRows.map(row => <tr key={row[0]}>{row.map((cell, index) => <td key={cell}>{index === 0 ? <b>{cell}</b> : cell}</td>)}</tr>)}</tbody></table></div>
        <aside className="analysis-warning reveal"><div><span>!</span><h3>{c.warningTitle}</h3></div><ul>{c.warningItems.map(item => <li key={item}>{item}</li>)}</ul></aside>
      </div>
    </section>

    <section className="section page-width analysis-workflow-section">
      <div className="section-intro reveal"><Eyebrow>{c.workflowK}</Eyebrow><h2>{c.workflowT}</h2></div>
      <div className="analysis-workflow-list">{c.workflowSteps.map(([number, title, text]) => <article className="reveal" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    </section>

    <section className="section section-tint analysis-limits-section"><div className="page-width"><div className="section-heading reveal"><div><Eyebrow>{c.limitsK}</Eyebrow><h2>{c.limitsT}</h2></div></div><div className="analysis-limit-grid">{c.limits.map(([title, text]) => <article className="reveal" key={title}><span>!</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="analysis-final-band"><div className="page-width"><div><Eyebrow>{c.k}</Eyebrow><h2>{c.finalTitle}</h2><p>{c.finalP}</p></div><div><a className="button primary" href="#/application/analyse">{c.finalModule}<span>→</span></a><a className="button secondary" href="#/documentation">{c.finalDocs}<span>→</span></a></div></div></section>
  </main>;
}

function ModuleVisual({ module, language }: { module: AppModule; language: Language }) {
  const screen = moduleScreens[module.key];
  if (screen) {
    const imagePath = asset(`app-previews/${screen.image}`);
    return <figure className="module-visual screen-preview"><a href={imagePath} target="_blank" rel="noreferrer"><img src={imagePath} alt={`${tx(screen.title, language)} — ${tx(screen.description, language)}`} decoding="async" /><span>{language === "fr" ? "Voir en pleine résolution" : "View full resolution"}<i>↗</i></span></a><figcaption><small>{language === "fr" ? "CAPTURE DE L’APPLICATION" : "APPLICATION SCREEN"}</small><b>{tx(screen.title, language)}</b><p>{tx(screen.description, language)}</p></figcaption></figure>;
  }
  if (module.image) return <div className="module-visual image"><img src={asset(`app-previews/${module.image}`)} alt={`${tx(module.title, language)} — ${tx(module.kicker, language)}`} /><div><span>{language === "fr" ? "APERÇU ISSU DU DÉPÔT" : "PREVIEW FROM THE REPOSITORY"}</span><b>{tx(module.title, language)}</b></div></div>;
  return <div className={`module-visual schematic theme-${module.group}`} role="img" aria-label={language === "fr" ? `Schéma fonctionnel de l’onglet ${tx(module.title, language)}` : `Functional diagram of the ${tx(module.title, language)} tab`}><div className="schematic-bar"><span /><span /><span /><b>BarCodeR / {tx(module.title, language)}</b></div><div className="schematic-body"><aside><strong>{module.icon}</strong>{modules.slice(0, 8).map((m) => <i className={m.key === module.key ? "active" : ""} key={m.key} />)}</aside><div className="schematic-content"><small>{tx(module.kicker, language)}</small><h3>{tx(module.title, language)}</h3><div className="schematic-cards"><span /><span /><span /></div><div className="schematic-lines"><i /><i /><i /><i /></div></div></div></div>;
}

function ModulePage({ module, language }: { module: AppModule; language: Language }) {
  const index = modules.findIndex(m => m.key === module.key);
  const previous = modules[(index - 1 + modules.length) % modules.length];
  const next = modules[(index + 1) % modules.length];
  const c = language === "fr" ? { app: "Processus analytique", what: "Ce que l’utilisateur peut faire", io: "De l’entrée à la sortie", inputs: "Entrées", operations: "Opérations", outputs: "Sorties", question: "Question directrice", modules: "Sous-modules et questions", vigilance: "Rigueur et points d’attention", source: "Confronté au code source", sourceText: "Le contenu de cette page est dérivé du module ci-dessous, et non d’une description générique du logiciel.", previous: "Onglet précédent", next: "Onglet suivant", reproduce: "Ce qui est conservé", reproText: "Le dataset et les paramètres restent rattachés à la session ou au projet. Lorsqu’un historique est proposé, il sert à relire le contexte de production de la figure ou du résultat." } : { app: "Analytical process", what: "What users can do", io: "From input to output", inputs: "Inputs", operations: "Operations", outputs: "Outputs", question: "Guiding question", modules: "Submodules and questions", vigilance: "Rigour and cautions", source: "Checked against source code", sourceText: "This page content is derived from the module below, not from a generic software description.", previous: "Previous tab", next: "Next tab", reproduce: "What is retained", reproText: "The dataset and parameters remain attached to the session or project. Where histories are available, they support review of the context used to produce a figure or result." };
  return <main className={module.key === "openmetabar" ? "module-page openmetabar-page" : "module-page"}>
    <section className="module-hero page-width">
      <div className="module-hero-copy reveal"><div className="breadcrumbs"><a href="#/functioning">{c.app}</a><span>/</span><b>{tx(module.title, language)}</b></div>{module.key === "openmetabar" && <img className="openmetabar-page-logo" src={asset("app-previews/openmetabar-logo.png")} alt="" />}<Eyebrow>{module.order} · {tx(groups[module.group], language)}</Eyebrow><h1>{tx(module.title, language)}</h1><p className="module-kicker">{tx(module.kicker, language)}</p><p className="lead">{tx(module.purpose, language)}</p><div className="question-callout"><span>?</span><div><small>{c.question}</small><b>{tx(module.question, language)}</b></div></div></div>
      <div className="reveal delay-1"><ModuleVisual module={module} language={language} /></div>
    </section>
    <section className="section section-tint"><div className="page-width"><div className="section-heading"><div><Eyebrow>{module.order}</Eyebrow><h2>{c.what}</h2></div><p>{tx(module.question, language)}</p></div><div className="action-grid">{module.actions.map((action, i) => <article className="action-card reveal" style={{ "--delay": `${(i % 3) * 60}ms` } as React.CSSProperties} key={action.fr}><span>{String(i + 1).padStart(2, "0")}</span><p>{tx(action, language)}</p></article>)}</div></div></section>
    <section className="section page-width"><div className="section-intro"><Eyebrow>{c.io}</Eyebrow><h2>{c.io}</h2></div><div className="io-grid"><InfoColumn number="01" title={c.inputs} items={module.inputs} language={language} /><InfoColumn number="02" title={c.operations} items={module.actions.slice(0, 4)} language={language} accent /><InfoColumn number="03" title={c.outputs} items={module.outputs} language={language} /></div></section>
    {module.submodules && <section className="section submodule-section"><div className="page-width"><div className="section-intro light"><Eyebrow>{c.modules}</Eyebrow><h2>{c.modules}</h2></div><div className="submodule-grid">{module.submodules.map((sub, i) => <article className="submodule-card reveal" style={{ "--delay": `${(i % 3) * 55}ms` } as React.CSSProperties} key={sub.title.fr}>{sub.image ? <img src={asset(`app-previews/${sub.image}`)} alt="" /> : <div className="submodule-placeholder"><span>{module.icon}</span><i /></div>}<div><small>{String(i + 1).padStart(2, "0")}</small><h3>{tx(sub.title, language)}</h3><p>{tx(sub.question, language)}</p><span>{tx(sub.method, language)}</span></div></article>)}</div></div></section>}
    <section className="section page-width method-section"><div className="method-panel caution"><Eyebrow>{c.vigilance}</Eyebrow><h2>{c.vigilance}</h2><ul>{module.cautions.map(item => <li key={item.fr}><span>!</span>{tx(item, language)}</li>)}</ul></div><div className="method-panel reproducibility"><Eyebrow>{c.reproduce}</Eyebrow><h2>{c.reproduce}</h2><p>{c.reproText}</p><div className="provenance-mini"><span>dataset</span><i>→</i><span>parameters</span><i>→</i><span>history</span><i>→</i><span>output</span></div></div></section>
    <section className="source-band"><div className="page-width"><div><Eyebrow>{c.source}</Eyebrow><h2>{c.source}</h2><p>{c.sourceText}</p></div><a href={`https://github.com/MLPosuphy/BarCodeR/blob/main/${module.source}`} target="_blank" rel="noreferrer"><span>R</span><div><small>BarCodeR/{module.source}</small><b>{language === "fr" ? "Inspecter le module" : "Inspect module"} ↗</b></div></a></div></section>
    <nav className="page-pagination page-width" aria-label={language === "fr" ? "Navigation entre les onglets" : "Tab navigation"}><a href={moduleHref(previous.key)}><small>← {c.previous}</small><b>{tx(previous.title, language)}</b></a><a href={moduleHref(next.key)}><small>{c.next} →</small><b>{tx(next.title, language)}</b></a></nav>
  </main>;
}

function InfoColumn({ number, title, items, language, accent = false }: { number: string; title: string; items: Localized[]; language: Language; accent?: boolean }) {
  return <article className={accent ? "info-column accent" : "info-column"}><span>{number}</span><h3>{title}</h3><ul>{items.map(item => <li key={item.fr}>{tx(item, language)}</li>)}</ul></article>;
}

const publicFigures = [
  { file: "globalpatterns-composition.png", title: { fr: "Composition taxonomique", en: "Taxonomic composition" }, method: { fr: "Abondances relatives · agrégation au phylum · moyenne par environnement", en: "Relative abundance · phylum aggregation · mean by environment" } },
  { file: "globalpatterns-ordination.png", title: { fr: "Structure inter-échantillons", en: "Between-sample structure" }, method: { fr: "Bray–Curtis sur abondances relatives · PCoA", en: "Bray–Curtis on relative abundances · PCoA" } },
  { file: "globalpatterns-alpha-diversity.png", title: { fr: "Diversité intra-échantillon", en: "Within-sample diversity" }, method: { fr: "Richesse observée et Shannon sur les comptes", en: "Observed richness and Shannon on counts" } }
];

type TutorialCategory = "start" | "prepare" | "analyse" | "advanced";
type TutorialLevel = "beginner" | "intermediate" | "advanced";
type TutorialStatus = "published" | "planned";

type TutorialJourney = {
  id: string;
  category: TutorialCategory;
  level: TutorialLevel;
  status: TutorialStatus;
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
  status: "available" | "specified" | "planned";
  title: Localized;
  input: Localized;
  purpose: Localized;
  coverage: Localized[];
  note: Localized;
};

const tutorialJourneys: TutorialJourney[] = [
  {
    id: "discover-globalpatterns", category: "start", level: "beginner", status: "published", duration: "15 min",
    title: { fr: "Découvrir BarCodeR avec GlobalPatterns", en: "Discover BarCodeR with GlobalPatterns" },
    summary: { fr: "Parcourir le cycle complet, de l’import d’un phyloseq public à une première planche de résultats.", en: "Walk through the complete cycle, from importing a public phyloseq object to a first results panel." },
    dataset: { fr: "GlobalPatterns · phyloseq public", en: "GlobalPatterns · public phyloseq" },
    goal: { fr: "Comprendre où charger, contrôler, explorer, analyser et sauvegarder un résultat.", en: "Understand where to load, check, explore, analyse and save a result." },
    outputs: [
      { fr: "un diagnostic rapide du dataset", en: "a rapid dataset diagnosis" },
      { fr: "un barplot au niveau Phylum", en: "a phylum-level bar plot" },
      { fr: "une PCoA Bray–Curtis", en: "a Bray–Curtis PCoA" },
      { fr: "une composition MultiView", en: "a MultiView composition" }
    ],
    steps: [
      { fr: "Créer un projet de démonstration puis importer l’objet GlobalPatterns.", en: "Create a demonstration project and import the GlobalPatterns object." },
      { fr: "Ouvrir Description et vérifier dimensions, profondeur, taxonomie et métadonnées.", en: "Open Description and check dimensions, depth, taxonomy and metadata." },
      { fr: "Produire une composition taxonomique en abondances relatives au niveau Phylum.", en: "Produce a relative-abundance taxonomic composition at phylum level." },
      { fr: "Calculer Observed et Shannon puis comparer les environnements.", en: "Compute Observed and Shannon, then compare environments." },
      { fr: "Construire une PCoA fondée sur Bray–Curtis et colorée par environnement.", en: "Build a Bray–Curtis PCoA coloured by environment." },
      { fr: "Sauvegarder les figures et les réunir dans MultiView.", en: "Save the figures and combine them in MultiView." }
    ],
    modules: ["input-data", "description", "exploration", "analyse", "multiview"],
    caution: { fr: "Ce parcours sert à comprendre l’interface ; il ne constitue pas une analyse écologique complète de GlobalPatterns.", en: "This journey explains the interface; it is not a complete ecological analysis of GlobalPatterns." }
  },
  {
    id: "audit-phyloseq", category: "prepare", level: "beginner", status: "published", duration: "20 min",
    title: { fr: "Auditer un phyloseq avant toute analyse", en: "Audit a phyloseq object before analysis" },
    summary: { fr: "Vérifier la structure de l’objet, les profondeurs, la sparsité, la taxonomie et les métadonnées avant de choisir une méthode.", en: "Check object structure, depths, sparsity, taxonomy and metadata before choosing a method." },
    dataset: { fr: "GlobalPatterns ou votre propre phyloseq", en: "GlobalPatterns or your own phyloseq" },
    goal: { fr: "Décider si le dataset est analysable et identifier les points nécessitant une correction ou une justification.", en: "Decide whether the dataset is ready for analysis and identify issues requiring correction or justification." },
    outputs: [
      { fr: "une checklist de structure", en: "a structure checklist" },
      { fr: "un bilan de profondeur et de sparsité", en: "a depth and sparsity assessment" },
      { fr: "un bilan taxonomique", en: "a taxonomy assessment" },
      { fr: "une liste d’échantillons à examiner", en: "a list of samples to inspect" }
    ],
    steps: [
      { fr: "Contrôler la présence et l’orientation des tables OTU, taxonomie et métadonnées.", en: "Check the presence and orientation of OTU, taxonomy and metadata tables." },
      { fr: "Vérifier la concordance des identifiants entre les composants.", en: "Check identifier consistency across components." },
      { fr: "Examiner profondeur, richesse, dominance et sparsité par échantillon.", en: "Inspect depth, richness, dominance and sparsity by sample." },
      { fr: "Mesurer la complétude taxonomique à chaque rang.", en: "Assess taxonomic completeness at each rank." },
      { fr: "Repérer les valeurs manquantes et les variables de métadonnées non exploitables.", en: "Identify missing values and unusable metadata variables." },
      { fr: "Examiner les courbes de raréfaction et les échantillons atypiques sans les exclure automatiquement.", en: "Inspect rarefaction curves and atypical samples without excluding them automatically." }
    ],
    modules: ["description", "data-edition"],
    caution: { fr: "Un échantillon atypique n’est pas nécessairement erroné. Toute exclusion doit être documentée et biologiquement justifiée.", en: "An atypical sample is not necessarily erroneous. Any exclusion must be documented and biologically justified." }
  },
  {
    id: "filter-provenance", category: "prepare", level: "intermediate", status: "published", duration: "25 min",
    title: { fr: "Filtrer sans perdre la provenance", en: "Filter without losing provenance" },
    summary: { fr: "Créer plusieurs branches analytiques à partir d’un même objet et comparer leur impact sans écraser l’original.", en: "Create several analytical branches from the same object and compare their impact without overwriting the original." },
    dataset: { fr: "GlobalPatterns", en: "GlobalPatterns" },
    goal: { fr: "Comprendre la différence entre corriger un objet et produire un dataset filtré dérivé.", en: "Understand the difference between correcting an object and producing a derived filtered dataset." },
    outputs: [
      { fr: "trois datasets dérivés", en: "three derived datasets" },
      { fr: "un bilan avant/après", en: "a before/after assessment" },
      { fr: "un historique des filtres", en: "a filtering history" },
      { fr: "une décision de seuil argumentée", en: "a justified threshold decision" }
    ],
    steps: [
      { fr: "Dupliquer le dataset original et nommer clairement la branche de travail.", en: "Duplicate the original dataset and clearly name the working branch." },
      { fr: "Créer une filtration faible fondée sur la prévalence.", en: "Create a light prevalence-based filtering branch." },
      { fr: "Créer une filtration standard combinant prévalence et abondance minimale.", en: "Create a standard branch combining prevalence and minimum abundance." },
      { fr: "Créer une filtration stricte uniquement pour tester la sensibilité des résultats.", en: "Create a strict branch solely to test result sensitivity." },
      { fr: "Comparer le nombre de taxons, les reads conservés et la distribution des profondeurs.", en: "Compare retained taxa, reads and depth distributions." },
      { fr: "Conserver la branche la plus défendable et documenter pourquoi les autres ne sont pas retenues.", en: "Keep the most defensible branch and document why the others are not retained." }
    ],
    modules: ["datasets", "filtration", "description"],
    caution: { fr: "Un seuil plus strict n’est pas automatiquement meilleur. Il peut supprimer un signal rare mais biologiquement pertinent.", en: "A stricter threshold is not automatically better. It can remove a rare but biologically relevant signal." }
  },
  {
    id: "composition-alpha", category: "analyse", level: "beginner", status: "published", duration: "25 min",
    title: { fr: "Comparer composition et diversité alpha", en: "Compare composition and alpha diversity" },
    summary: { fr: "Décrire les communautés, choisir un rang taxonomique et comparer plusieurs indices de diversité intra-échantillon.", en: "Describe communities, choose a taxonomic rank and compare several within-sample diversity indices." },
    dataset: { fr: "GlobalPatterns", en: "GlobalPatterns" },
    goal: { fr: "Produire une description lisible des groupes sans confondre abondance relative, richesse et équitabilité.", en: "Produce a readable group description without confusing relative abundance, richness and evenness." },
    outputs: [
      { fr: "un barplot taxonomique", en: "a taxonomic bar plot" },
      { fr: "un tableau de composition", en: "a composition table" },
      { fr: "Observed, Shannon et Simpson", en: "Observed, Shannon and Simpson" },
      { fr: "une comparaison statistique documentée", en: "a documented statistical comparison" }
    ],
    steps: [
      { fr: "Choisir le rang Phylum et examiner la proportion de taxons non assignés.", en: "Choose phylum rank and inspect the proportion of unassigned taxa." },
      { fr: "Définir un top N et regrouper explicitement les taxons restants.", en: "Define a top N and explicitly group remaining taxa." },
      { fr: "Comparer profils par échantillon puis moyenne par environnement.", en: "Compare sample profiles, then means by environment." },
      { fr: "Calculer plusieurs indices de diversité alpha sur les comptes adaptés.", en: "Compute several alpha-diversity indices on suitable counts." },
      { fr: "Vérifier distributions et tailles de groupes avant de choisir le test.", en: "Check distributions and group sizes before choosing the test." },
      { fr: "Interpréter séparément composition, richesse et équitabilité.", en: "Interpret composition, richness and evenness separately." }
    ],
    modules: ["exploration", "analyse"],
    caution: { fr: "Une différence d’abondance relative ne signifie pas nécessairement une différence d’abondance absolue.", en: "A difference in relative abundance does not necessarily imply a difference in absolute abundance." }
  },
  {
    id: "beta-permanova", category: "analyse", level: "intermediate", status: "published", duration: "35 min",
    title: { fr: "Construire une bêta-diversité complète", en: "Build a complete beta-diversity analysis" },
    summary: { fr: "Associer transformation, distance, ordination, PERMANOVA et contrôle de dispersion dans un même raisonnement.", en: "Combine transformation, distance, ordination, PERMANOVA and dispersion control in one reasoning workflow." },
    dataset: { fr: "GlobalPatterns", en: "GlobalPatterns" },
    goal: { fr: "Tester une structuration entre groupes sans conclure à partir de la seule séparation visuelle des points.", en: "Test group structuring without drawing conclusions from visual point separation alone." },
    outputs: [
      { fr: "une PCoA Bray–Curtis", en: "a Bray–Curtis PCoA" },
      { fr: "un diagnostic d’ordination", en: "an ordination diagnosis" },
      { fr: "une PERMANOVA", en: "a PERMANOVA" },
      { fr: "un test de dispersion multivariée", en: "a multivariate dispersion test" }
    ],
    steps: [
      { fr: "Formuler la variable explicative et vérifier la taille des groupes.", en: "Define the explanatory variable and check group sizes." },
      { fr: "Choisir une transformation cohérente avec la distance Bray–Curtis.", en: "Choose a transformation consistent with Bray–Curtis distance." },
      { fr: "Construire la matrice de distance puis la PCoA.", en: "Build the distance matrix and then the PCoA." },
      { fr: "Examiner variance expliquée, points atypiques et stabilité de la représentation.", en: "Inspect explained variance, atypical points and representation stability." },
      { fr: "Lancer la PERMANOVA avec un nombre de permutations adapté.", en: "Run PERMANOVA with an appropriate number of permutations." },
      { fr: "Contrôler PERMDISP avant d’attribuer la différence aux centroïdes des groupes.", en: "Check PERMDISP before attributing the difference to group centroids." },
      { fr: "Présenter conjointement taille d’effet, p-value, dispersion et graphique.", en: "Report effect size, p-value, dispersion and plot together." }
    ],
    modules: ["analyse"],
    caution: { fr: "Une PERMANOVA significative avec dispersion hétérogène demande une interprétation prudente.", en: "A significant PERMANOVA with heterogeneous dispersion requires cautious interpretation." }
  },
  {
    id: "multiview-report", category: "start", level: "beginner", status: "published", duration: "20 min",
    title: { fr: "Construire une planche de résultats avec MultiView", en: "Build a results panel with MultiView" },
    summary: { fr: "Retrouver les figures sauvegardées, les organiser, les annoter et exporter une composition cohérente.", en: "Retrieve saved figures, arrange and annotate them, then export a coherent composition." },
    dataset: { fr: "Tout projet contenant plusieurs figures", en: "Any project containing several figures" },
    goal: { fr: "Passer d’une succession de graphiques isolés à une restitution structurée et traçable.", en: "Move from isolated plots to a structured and traceable report." },
    outputs: [
      { fr: "une bibliothèque filtrée", en: "a filtered library" },
      { fr: "une sélection de figures", en: "a figure selection" },
      { fr: "une grille MultiView", en: "a MultiView grid" },
      { fr: "une image composite exportée", en: "an exported composite image" }
    ],
    steps: [
      { fr: "Sauvegarder au moins trois figures issues de modules différents.", en: "Save at least three figures from different modules." },
      { fr: "Filtrer la bibliothèque par dataset, module ou recherche textuelle.", en: "Filter the library by dataset, module or text search." },
      { fr: "Ajouter favoris et tags pour distinguer les résultats retenus.", en: "Add favourites and tags to distinguish selected results." },
      { fr: "Choisir une disposition puis glisser les figures dans les emplacements.", en: "Choose a layout and drag figures into the slots." },
      { fr: "Vérifier lisibilité, ordre narratif et cohérence des légendes.", en: "Check readability, narrative order and legend consistency." },
      { fr: "Exporter la composition et sauvegarder sa configuration.", en: "Export the composition and save its configuration." }
    ],
    modules: ["multiview"],
    caution: { fr: "Une planche visuellement homogène ne corrige pas des méthodes ou des échelles incompatibles entre figures.", en: "A visually consistent panel does not correct incompatible methods or scales across figures." }
  },
  {
    id: "differential-consensus", category: "advanced", level: "advanced", status: "planned", duration: "45–60 min",
    title: { fr: "Comparer plusieurs moteurs différentiels", en: "Compare several differential-analysis engines" },
    summary: { fr: "Mettre en parallèle ANCOM-BC2, LinDA, ALDEx2, corncob et MaAsLin 3 sur un signal contrôlé.", en: "Compare ANCOM-BC2, LinDA, ALDEx2, corncob and MaAsLin 3 on a controlled signal." },
    dataset: { fr: "Benchmark différentiel simulé · à produire", en: "Simulated differential benchmark · to produce" },
    goal: { fr: "Distinguer résultats spécifiques à une méthode et signaux concordants entre modèles.", en: "Distinguish method-specific findings from signals shared across models." },
    outputs: [{ fr: "cinq résultats comparables", en: "five comparable results" }, { fr: "une matrice de concordance", en: "a concordance matrix" }, { fr: "une sélection robuste de taxons", en: "a robust taxon selection" }],
    steps: [
      { fr: "Construire un dataset simulé avec vrais positifs, absence d’effet et structure de groupes connue.", en: "Build a simulated dataset with known true positives, null effects and group structure." },
      { fr: "Fixer la même population, le même contraste et les mêmes règles de correction multiple.", en: "Use the same population, contrast and multiple-testing rules." },
      { fr: "Comparer signes, tailles d’effet, significativité et rangs taxonomiques.", en: "Compare signs, effect sizes, significance and taxonomic ranks." },
      { fr: "Documenter les divergences plutôt que de sélectionner uniquement la méthode la plus favorable.", en: "Document disagreements rather than selecting only the most favourable method." }
    ],
    modules: ["analyse"],
    caution: { fr: "Ce tutoriel sera publié avec un dataset dont le signal attendu est connu afin d’éviter une comparaison circulaire sur un cas réel.", en: "This tutorial will be published with a dataset whose expected signal is known, avoiding circular comparison on a real case." }
  },
  {
    id: "compare-markers", category: "advanced", level: "advanced", status: "planned", duration: "45 min",
    title: { fr: "Comparer plusieurs marqueurs ou matrices", en: "Compare several markers or matrices" },
    summary: { fr: "Harmoniser les échantillons puis comparer plusieurs représentations avec Mantel, Procrustes, PROTEST, co-inertie et MCOA.", en: "Harmonise samples and compare representations using Mantel, Procrustes, PROTEST, co-inertia and MCOA." },
    dataset: { fr: "Projet multi-marqueurs · à produire", en: "Multi-marker project · to produce" },
    goal: { fr: "Évaluer si plusieurs marqueurs décrivent une organisation écologique cohérente.", en: "Assess whether several markers describe a coherent ecological organisation." },
    outputs: [{ fr: "des matrices harmonisées", en: "harmonised matrices" }, { fr: "plusieurs tests de concordance", en: "several concordance tests" }, { fr: "une synthèse multi-tableaux", en: "a multi-table synthesis" }],
    steps: [
      { fr: "Identifier l’intersection exacte des échantillons et variables comparables.", en: "Identify the exact intersection of comparable samples and variables." },
      { fr: "Appliquer des transformations et distances défendables dans chaque matrice.", en: "Apply defensible transformations and distances to each matrix." },
      { fr: "Comparer les structures par plusieurs méthodes complémentaires.", en: "Compare structures using several complementary methods." },
      { fr: "Séparer concordance globale, alignement des ordinations et contribution des tables.", en: "Separate global concordance, ordination alignment and table contribution." }
    ],
    modules: ["analyse"],
    caution: { fr: "La concordance dépend fortement de l’intersection des échantillons et des choix de prétraitement.", en: "Concordance strongly depends on sample intersection and preprocessing choices." }
  },
  {
    id: "openmetabar-run", category: "advanced", level: "advanced", status: "planned", duration: "60 min",
    title: { fr: "Lancer un run OpenMetaBar minimal", en: "Launch a minimal OpenMetaBar run" },
    summary: { fr: "Préparer FASTQ et design, configurer le pipeline, soumettre sur Slurm puis importer le phyloseq produit.", en: "Prepare FASTQ and design, configure the pipeline, submit through Slurm and import the resulting phyloseq object." },
    dataset: { fr: "Mini-run FASTQ + référence · à produire", en: "FASTQ mini-run + reference · to produce" },
    goal: { fr: "Démontrer le passage reproductible des reads bruts à un objet analysable dans BarCodeR.", en: "Demonstrate the reproducible transition from raw reads to an analysable BarCodeR object." },
    outputs: [{ fr: "un design validé", en: "a validated design" }, { fr: "un job Slurm suivi", en: "a monitored Slurm job" }, { fr: "des logs interprétables", en: "interpretable logs" }, { fr: "un phyloseq importé", en: "an imported phyloseq" }],
    steps: [
      { fr: "Préparer un jeu réduit légalement redistribuable et une base de référence minimale.", en: "Prepare a small redistributable dataset and a minimal reference database." },
      { fr: "Valider noms de fichiers, design et paramètres technologiques.", en: "Validate filenames, design and technology-specific parameters." },
      { fr: "Prévisualiser la configuration puis soumettre le job.", en: "Preview the configuration and submit the job." },
      { fr: "Lire états Slurm, logs Nextflow et sorties avant l’import final.", en: "Read Slurm states, Nextflow logs and outputs before final import." }
    ],
    modules: ["openmetabar", "input-data", "description"],
    caution: { fr: "Ce parcours dépend d’un cluster Slurm configuré, de Nextflow et d’images de conteneurs accessibles.", en: "This journey requires a configured Slurm cluster, Nextflow and accessible container images." }
  }
];

const testDatasets: TestDataset[] = [
  {
    id: "globalpatterns", status: "available", title: { fr: "GlobalPatterns", en: "GlobalPatterns" },
    input: { fr: "Objet phyloseq public", en: "Public phyloseq object" },
    purpose: { fr: "Découvrir l’application et reproduire composition, diversité alpha, ordination, PERMANOVA, filtration et MultiView.", en: "Discover the application and reproduce composition, alpha diversity, ordination, PERMANOVA, filtering and MultiView." },
    coverage: [{ fr: "26 échantillons", en: "26 samples" }, { fr: "9 environnements", en: "9 environments" }, { fr: "figures de référence", en: "reference figures" }],
    note: { fr: "Disponible dans le package phyloseq ; les figures publiques du site sont générées par le script versionné.", en: "Available in the phyloseq package; the public site figures are generated by the versioned script." }
  },
  {
    id: "diagnostic-challenge", status: "specified", title: { fr: "Diagnostic Challenge", en: "Diagnostic Challenge" },
    input: { fr: "Phyloseq volontairement problématique", en: "Deliberately problematic phyloseq" },
    purpose: { fr: "S’entraîner à repérer identifiants incohérents, métadonnées manquantes, taxonomie partielle, profondeur variable et échantillons atypiques.", en: "Practise identifying inconsistent identifiers, missing metadata, partial taxonomy, variable depth and atypical samples." },
    coverage: [{ fr: "structure", en: "structure" }, { fr: "qualité", en: "quality" }, { fr: "corrections", en: "corrections" }],
    note: { fr: "Spécification pédagogique définie ; fichier redistribuable encore à générer et valider.", en: "Educational specification defined; redistributable file still needs to be generated and validated." }
  },
  {
    id: "differential-benchmark", status: "planned", title: { fr: "Differential Benchmark", en: "Differential Benchmark" },
    input: { fr: "Comptes simulés avec signal connu", en: "Simulated counts with known signal" },
    purpose: { fr: "Comparer équitablement les cinq moteurs différentiels et mesurer concordance, vrais positifs et faux positifs.", en: "Fairly compare the five differential engines and assess concordance, true positives and false positives." },
    coverage: [{ fr: "5 moteurs", en: "5 engines" }, { fr: "effets connus", en: "known effects" }, { fr: "benchmark", en: "benchmark" }],
    note: { fr: "À produire avec une graine, un modèle de simulation et des réponses attendues versionnés.", en: "To be produced with a versioned seed, simulation model and expected answers." }
  },
  {
    id: "multi-marker", status: "planned", title: { fr: "Multi-marker Project", en: "Multi-marker Project" },
    input: { fr: "Plusieurs phyloseq partageant les mêmes échantillons", en: "Several phyloseq objects sharing the same samples" },
    purpose: { fr: "Tester Mantel, Procrustes, PROTEST, co-inertie et MCOA dans un cas où l’intersection des échantillons est contrôlée.", en: "Test Mantel, Procrustes, PROTEST, co-inertia and MCOA with a controlled sample intersection." },
    coverage: [{ fr: "multi-datasets", en: "multiple datasets" }, { fr: "concordance", en: "concordance" }, { fr: "MCOA", en: "MCOA" }],
    note: { fr: "À construire à partir de matrices distribuables et d’une question écologique simple.", en: "To be built from redistributable matrices and a simple ecological question." }
  },
  {
    id: "openmetabar-mini", status: "planned", title: { fr: "OpenMetaBar Mini-run", en: "OpenMetaBar Mini-run" },
    input: { fr: "FASTQ, design et référence minimaux", en: "Minimal FASTQ, design and reference" },
    purpose: { fr: "Rejouer l’ensemble du passage FASTQ → Slurm → Nextflow → phyloseq sur un calcul court.", en: "Replay the complete FASTQ → Slurm → Nextflow → phyloseq path in a short computation." },
    coverage: [{ fr: "FASTQ", en: "FASTQ" }, { fr: "HPC", en: "HPC" }, { fr: "phyloseq final", en: "final phyloseq" }],
    note: { fr: "À produire après validation des droits de redistribution et du profil d’exécution de démonstration.", en: "To be produced after validating redistribution rights and the demonstration execution profile." }
  },
  {
    id: "complete-project", status: "planned", title: { fr: "Complete Analysis Project", en: "Complete Analysis Project" },
    input: { fr: "Projet BarCodeR portable", en: "Portable BarCodeR project" },
    purpose: { fr: "Fournir un projet déjà structuré avec datasets dérivés, historiques, figures et composition MultiView pour apprendre à reprendre un travail existant.", en: "Provide a structured project with derived datasets, histories, figures and a MultiView composition to learn how to resume existing work." },
    coverage: [{ fr: "provenance", en: "provenance" }, { fr: "historiques", en: "histories" }, { fr: "reprise", en: "resumption" }],
    note: { fr: "À générer lorsque le format de projet public et la politique de compatibilité de versions seront figés.", en: "To be generated once the public project format and version-compatibility policy are fixed." }
  }
];

function EvidencePage({ language }: { language: Language }) {
  const [filter, setFilter] = useState<"all" | TutorialLevel>("all");
  const filteredTutorials = useMemo(() => tutorialJourneys.filter(tutorial => filter === "all" || tutorial.level === filter), [filter]);
  const publishedCount = tutorialJourneys.filter(tutorial => tutorial.status === "published").length;
  const plannedCount = tutorialJourneys.filter(tutorial => tutorial.status === "planned").length;

  const c = language === "fr" ? {
    k: "Tutoriels & datasets tests",
    title: "Apprendre par objectif, pas onglet par onglet.",
    p: "Chaque parcours part d’une question concrète, précise les prérequis, déroule les étapes dans BarCodeR et indique ce qui doit être obtenu, vérifié et interprété. Les ressources encore absentes sont identifiées sans les présenter comme disponibles.",
    published: "parcours publiés",
    planned: "parcours avancés planifiés",
    publicDataset: "dataset public reproductible",
    referenceOutputs: "sorties de référence",
    startK: "Choisir son point de départ",
    startT: "Trois portes d’entrée selon votre situation.",
    startRoutes: [
      ["Première visite", "Découvrir le cycle complet avec GlobalPatterns en quinze minutes.", "discover-globalpatterns", "Commencer"],
      ["J’ai mon phyloseq", "Auditer sa structure et sa qualité avant de sélectionner une méthode.", "audit-phyloseq", "Contrôler"],
      ["Je veux tester une hypothèse", "Associer ordination, PERMANOVA et dispersion dans un parcours cohérent.", "beta-permanova", "Analyser"]
    ],
    libraryK: "Bibliothèque de parcours",
    libraryT: "Des procédures courtes, vérifiables et reliées aux modules réels.",
    libraryP: "Les six parcours publiés sont directement consultables ci-dessous. Les trois parcours avancés documentent aussi les ressources nécessaires avant leur publication complète.",
    filters: [["all", "Tous"], ["beginner", "Débutant"], ["intermediate", "Intermédiaire"], ["advanced", "Avancé"]],
    statusPublished: "Parcours publié",
    statusPlanned: "Ressource à préparer",
    level: { beginner: "Débutant", intermediate: "Intermédiaire", advanced: "Avancé" },
    category: { start: "Prise en main", prepare: "Préparation", analyse: "Analyse", advanced: "Avancé" },
    dataset: "Dataset",
    objective: "Objectif",
    outputs: "Résultats attendus",
    steps: "Voir les étapes",
    modules: "Modules associés",
    caution: "Point de vigilance",
    documentation: "Documentation",
    noResult: "Aucun parcours ne correspond à ce filtre.",
    formatK: "Format pédagogique commun",
    formatT: "Chaque tutoriel doit permettre de refaire, vérifier et expliquer.",
    formatItems: [
      ["01", "Objectif", "Une question précise et un résultat attendu avant de commencer."],
      ["02", "Prérequis", "Les composants phyloseq, variables, packages ou accès HPC nécessaires."],
      ["03", "Dataset", "Une ressource identifiable, versionnée et légalement redistribuable."],
      ["04", "Procédure", "Des étapes ordonnées reliées aux modules réellement utilisés."],
      ["05", "Contrôles", "Les diagnostics à examiner avant de conserver un résultat."],
      ["06", "Interprétation", "Ce que la sortie permet de conclure et ce qu’elle ne démontre pas."],
      ["07", "Ressources", "Figures, tableaux, code R, provenance et version de l’application."]
    ],
    datasetsK: "Bibliothèque de datasets tests",
    datasetsT: "Une fonction pédagogique distincte pour chaque ressource.",
    datasetsP: "Le statut distingue les fichiers réellement disponibles, les spécifications déjà définies et les jeux encore à construire.",
    datasetStatus: { available: "Disponible", specified: "Spécification prête", planned: "À produire" },
    datasetInput: "Entrée",
    datasetCoverage: "Couvre",
    demo: "Démonstration reproductible",
    demoT: "GlobalPatterns fournit aujourd’hui la référence publique complète.",
    demoP: "Les trois figures sont générées à partir du même objet et du script R versionné. Elles servent de résultats de contrôle pour vérifier la composition, l’ordination et la diversité alpha.",
    method: "Méthode",
    facts: [["26", "échantillons"], ["18 988", "taxons non nuls analysés"], ["9", "types d’environnements"]],
    resourcesK: "Ressources pédagogiques",
    resourcesT: "Reproduire le cas public et préparer les suivants.",
    script: "Consulter le script R",
    provenance: "Lire la provenance",
    workbook: "Télécharger le carnet de parcours",
    docs: "Ouvrir la documentation"
  } : {
    k: "Tutorials & test datasets",
    title: "Learn by objective, not tab by tab.",
    p: "Each journey starts from a concrete question, states its requirements, walks through the BarCodeR steps and explains what must be obtained, checked and interpreted. Missing resources are explicitly identified rather than presented as available.",
    published: "published journeys",
    planned: "planned advanced journeys",
    publicDataset: "reproducible public dataset",
    referenceOutputs: "reference outputs",
    startK: "Choose a starting point",
    startT: "Three entry points depending on your situation.",
    startRoutes: [
      ["First visit", "Discover the full cycle with GlobalPatterns in fifteen minutes.", "discover-globalpatterns", "Start"],
      ["I have a phyloseq", "Audit its structure and quality before selecting a method.", "audit-phyloseq", "Check"],
      ["I want to test a hypothesis", "Combine ordination, PERMANOVA and dispersion in a coherent journey.", "beta-permanova", "Analyse"]
    ],
    libraryK: "Journey library",
    libraryT: "Short, verifiable procedures linked to the real modules.",
    libraryP: "The six published journeys can be read directly below. The three advanced journeys also document the resources required before full publication.",
    filters: [["all", "All"], ["beginner", "Beginner"], ["intermediate", "Intermediate"], ["advanced", "Advanced"]],
    statusPublished: "Published journey",
    statusPlanned: "Resource to prepare",
    level: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
    category: { start: "Getting started", prepare: "Preparation", analyse: "Analysis", advanced: "Advanced" },
    dataset: "Dataset",
    objective: "Objective",
    outputs: "Expected outputs",
    steps: "View steps",
    modules: "Related modules",
    caution: "Caution",
    documentation: "Documentation",
    noResult: "No journey matches this filter.",
    formatK: "Shared learning format",
    formatT: "Every tutorial must make it possible to repeat, check and explain.",
    formatItems: [
      ["01", "Objective", "A precise question and expected result before starting."],
      ["02", "Requirements", "Required phyloseq components, variables, packages or HPC access."],
      ["03", "Dataset", "An identifiable, versioned and legally redistributable resource."],
      ["04", "Procedure", "Ordered steps linked to the modules actually used."],
      ["05", "Checks", "Diagnostics to inspect before retaining a result."],
      ["06", "Interpretation", "What the output supports and what it does not demonstrate."],
      ["07", "Resources", "Figures, tables, R code, provenance and application version."]
    ],
    datasetsK: "Test dataset library",
    datasetsT: "A distinct educational role for each resource.",
    datasetsP: "Status labels distinguish files that are actually available, specifications already defined and datasets still to be built.",
    datasetStatus: { available: "Available", specified: "Specification ready", planned: "To produce" },
    datasetInput: "Input",
    datasetCoverage: "Covers",
    demo: "Reproducible demonstration",
    demoT: "GlobalPatterns currently provides the complete public reference.",
    demoP: "The three figures are generated from the same object and the versioned R script. They act as control outputs for composition, ordination and alpha diversity.",
    method: "Method",
    facts: [["26", "samples"], ["18,988", "nonzero taxa analysed"], ["9", "environment types"]],
    resourcesK: "Learning resources",
    resourcesT: "Reproduce the public case and prepare the next ones.",
    script: "View R script",
    provenance: "Read provenance",
    workbook: "Download journey workbook",
    docs: "Open documentation"
  };

  const scrollToTutorial = (id: string) => document.getElementById(`tutorial-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return <main className="tutorial-page">
    <section className="page-hero page-width tutorial-hero tutorial-hero-v2">
      <Eyebrow>{c.k}</Eyebrow>
      <h1>{c.title}</h1>
      <p className="lead">{c.p}</p>
      <div className="tutorial-summary tutorial-summary-v2">
        <div><b>{publishedCount}</b><span>{c.published}</span></div>
        <div><b>{plannedCount}</b><span>{c.planned}</span></div>
        <div><b>1</b><span>{c.publicDataset}</span></div>
        <div><b>{publicFigures.length}</b><span>{c.referenceOutputs}</span></div>
      </div>
    </section>

    <section className="section tutorial-start-section"><div className="page-width">
      <div className="section-heading reveal"><div><Eyebrow>{c.startK}</Eyebrow><h2>{c.startT}</h2></div></div>
      <div className="tutorial-start-grid">{c.startRoutes.map(([title, text, id, action], index) => <article className="tutorial-start-card reveal" style={{ "--delay": `${index * 65}ms` } as React.CSSProperties} key={id}>
        <span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><button type="button" onClick={() => scrollToTutorial(id)}>{action}<i>↓</i></button>
      </article>)}</div>
    </div></section>

    <section className="section section-tint tutorial-library-section"><div className="page-width">
      <div className="tutorial-library-header"><div><Eyebrow>{c.libraryK}</Eyebrow><h2>{c.libraryT}</h2><p>{c.libraryP}</p></div><div className="tutorial-filters" role="group" aria-label={language === "fr" ? "Filtrer les tutoriels par niveau" : "Filter tutorials by level"}>{c.filters.map(([value, label]) => <button type="button" className={filter === value ? "active" : ""} aria-pressed={filter === value} onClick={() => setFilter(value as "all" | TutorialLevel)} key={value}>{label}</button>)}</div></div>
      <div className="journey-grid">{filteredTutorials.map((tutorial, index) => <article id={`tutorial-${tutorial.id}`} className={`journey-card ${tutorial.status}`} style={{ "--delay": `${(index % 3) * 55}ms` } as React.CSSProperties} key={tutorial.id}>
        <div className="journey-card-head"><span className={`journey-status ${tutorial.status}`}>{tutorial.status === "published" ? c.statusPublished : c.statusPlanned}</span><span className="journey-duration">{tutorial.duration}</span></div>
        <div className="journey-tags"><span>{c.category[tutorial.category]}</span><span>{c.level[tutorial.level]}</span></div>
        <h3>{tx(tutorial.title, language)}</h3>
        <p className="journey-summary">{tx(tutorial.summary, language)}</p>
        <dl className="journey-meta"><div><dt>{c.dataset}</dt><dd>{tx(tutorial.dataset, language)}</dd></div><div><dt>{c.objective}</dt><dd>{tx(tutorial.goal, language)}</dd></div></dl>
        <div className="journey-outputs"><b>{c.outputs}</b><ul>{tutorial.outputs.map(output => <li key={output.fr}>{tx(output, language)}</li>)}</ul></div>
        <details className="journey-details"><summary>{c.steps}<span>+</span></summary><ol>{tutorial.steps.map(step => <li key={step.fr}>{tx(step, language)}</li>)}</ol><div className="journey-caution"><span>!</span><div><b>{c.caution}</b><p>{tx(tutorial.caution, language)}</p></div></div></details>
        <div className="journey-links"><div><small>{c.modules}</small>{tutorial.modules.map(key => { const module = modules.find(item => item.key === key); return module ? <a href={moduleHref(key)} key={key}>{tx(module.title, language)}</a> : null; })}</div><a className="journey-doc-link" href="#/documentation">{c.documentation}<span>→</span></a></div>
      </article>)}</div>
      {filteredTutorials.length === 0 && <p className="tutorial-empty">{c.noResult}</p>}
    </div></section>

    <section className="section tutorial-format-section"><div className="page-width"><div className="section-heading reveal"><div><Eyebrow>{c.formatK}</Eyebrow><h2>{c.formatT}</h2></div></div><div className="tutorial-format-grid">{c.formatItems.map(([number, title, text]) => <article className="reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="section section-dark dataset-library-section"><div className="page-width"><div className="section-heading light reveal"><div><Eyebrow>{c.datasetsK}</Eyebrow><h2>{c.datasetsT}</h2></div><p>{c.datasetsP}</p></div><div className="dataset-library-grid">{testDatasets.map((dataset, index) => <article className={`dataset-library-card ${dataset.status} reveal`} style={{ "--delay": `${(index % 3) * 55}ms` } as React.CSSProperties} key={dataset.id}><div className="dataset-library-head"><span>{c.datasetStatus[dataset.status]}</span><i>{String(index + 1).padStart(2, "0")}</i></div><h3>{tx(dataset.title, language)}</h3><small>{c.datasetInput}</small><b>{tx(dataset.input, language)}</b><p>{tx(dataset.purpose, language)}</p><div><small>{c.datasetCoverage}</small><ul>{dataset.coverage.map(item => <li key={item.fr}>{tx(item, language)}</li>)}</ul></div><footer>{tx(dataset.note, language)}</footer></article>)}</div></div></section>

    <section className="section page-width tutorial-demo-section"><div className="dataset-demo dataset-demo-v2"><div><Eyebrow>{c.demo}</Eyebrow><h2>{c.demoT}</h2><p>{c.demoP}</p></div><div className="fact-row">{c.facts.map(([n, label]) => <div key={label}><b>{n}</b><span>{label}</span></div>)}</div></div></section>
    <section className="figure-gallery page-width tutorial-figure-gallery">{publicFigures.map((figure, i) => <figure className="public-figure reveal" style={{ "--delay": `${i * 70}ms` } as React.CSSProperties} key={figure.file}><div><img src={asset(`figures/${figure.file}`)} alt={tx(figure.title, language)} /></div><figcaption><span>0{i + 1}</span><h2>{tx(figure.title, language)}</h2><small>{c.method}</small><p>{tx(figure.method, language)}</p></figcaption></figure>)}</section>

    <section className="section section-tint tutorial-resources-section"><div className="page-width tutorial-resources tutorial-resources-v2"><div><Eyebrow>{c.resourcesK}</Eyebrow><h2>{c.resourcesT}</h2></div><div className="evidence-links"><a className="button primary" target="_blank" rel="noreferrer" href="https://github.com/MLPosuphy/site-BarCodeR-R-shiny-application/blob/main/scripts/generate_public_data_figures.R">{c.script}<span>↗</span></a><a className="button secondary" target="_blank" rel="noreferrer" href="https://github.com/MLPosuphy/site-BarCodeR-R-shiny-application/blob/main/public/figures/data-provenance.tsv">{c.provenance}<span>↗</span></a><a className="button secondary" href={asset(`tutorials/barcoder-tutorial-workbook-${language}.md`)} download>{c.workbook}<span>↓</span></a><a className="button secondary" href="#/documentation">{c.docs}<span>→</span></a></div></div></section>
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
    [manifest?.documentation_version ? `v${manifest.documentation_version}` : "v1.8.0", c.version]
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
type ProvenanceKey = "composition" | "ordination" | "alpha";

function ShowcasePage({ language }: { language: Language }) {
  const [category, setCategory] = useState<ShowcaseCategory>("all");
  const [selectedOutput, setSelectedOutput] = useState("composition");
  const [provenanceKey, setProvenanceKey] = useState<ProvenanceKey>("composition");

  const c = language === "fr" ? {
    heroK: "Cas d’usage · résultats · provenance",
    heroT: <>Des questions scientifiques<br /><em>aux résultats traçables.</em></>,
    heroP: "BarCodeR ne se limite pas à exposer des méthodes. Le logiciel relie une question, un objet phyloseq, une préparation explicite, des diagnostics et des sorties réutilisables. Cette page montre quatre parcours réalistes et les résultats que l’écosystème peut produire.",
    heroPrimary: "Explorer les cas d’usage",
    heroSecondary: "Voir la galerie",
    metrics: [["4", "cas d’usage scientifiques"], ["11", "familles de résultats illustrées"], ["3", "figures publiques reproductibles"], ["1", "provenance lisible par résultat"]],
    casesK: "Parcours scientifiques",
    casesT: "Commencer par la question, puis enchaîner les contrôles appropriés.",
    casesP: "Chaque cas d’usage combine plusieurs modules. Les étapes proposées constituent un cadre de travail, pas une recette automatique : le plan expérimental et les hypothèses des méthodes restent déterminants.",
    input: "Entrées",
    outputs: "Sorties attendues",
    caution: "Point de vigilance",
    openAnalysis: "Ouvrir le parcours",
    openTutorials: "Ouvrir les tutoriels",
    cases: [
      {
        number: "01", title: "Suivi environnemental", question: "Les communautés diffèrent-elles entre sites, campagnes ou saisons ?",
        audience: "Écologie · biodiversité · surveillance", input: "Un phyloseq avec abondances, taxonomie et métadonnées environnementales.",
        steps: ["Diagnostic", "Filtration", "Composition", "Diversité alpha", "Ordination", "PERMANOVA + dispersion", "MultiView"],
        outputs: ["profils taxonomiques", "indices de diversité", "ordination diagnostiquée", "test global", "planche de synthèse"],
        caution: "Ne pas interpréter une PERMANOVA sans contrôler l’homogénéité des dispersions et la structure du plan d’échantillonnage.",
        image: "app-previews/ordinations.png", href: "#/analyses"
      },
      {
        number: "02", title: "Effet d’une condition", question: "Quels taxons sont associés à un traitement, un habitat ou une condition ?",
        audience: "Expérimentation · biomonitoring · comparaison de groupes", input: "Comptes bruts, variable d’intérêt et covariables documentées.",
        steps: ["Audit des comptes", "Filtration justifiée", "Modèle", "ANCOM-BC2", "ALDEx2", "LinDA / corncob / MaAsLin 3", "Concordance"],
        outputs: ["tailles d’effet", "p-values ajustées", "taxons concordants", "résultats spécifiques aux moteurs", "tableaux exportables"],
        caution: "La présence dans une seule méthode n’est pas une preuve de robustesse. Comparer les hypothèses, tailles d’effet et directions entre moteurs.",
        image: "app-previews/analyses_differentielles.png", href: "#/analyses"
      },
      {
        number: "03", title: "Comparaison de marqueurs", question: "Deux marqueurs ou domaines décrivent-ils une structure écologique cohérente ?",
        audience: "Multi-marqueurs · multi-domaines · intercomparaison", input: "Plusieurs phyloseq avec des échantillons harmonisés et des métadonnées communes.",
        steps: ["Harmonisation", "Distances compatibles", "Ordinations séparées", "Mantel", "Procrustes / PROTEST", "Co-inertie / MCOA", "Restitution"],
        outputs: ["corrélations de matrices", "superposition d’ordinations", "compromis multi-tableaux", "échantillons divergents", "comparaison visuelle"],
        caution: "Une corrélation entre matrices ne signifie pas que les deux marqueurs détectent les mêmes taxons ni qu’ils ont la même sensibilité.",
        image: "app-previews/comparaison_matrices.png", href: "#/analyses"
      },
      {
        number: "04", title: "Du séquençage à la restitution", question: "Comment transformer un run de séquençage en résultats inspectables ?",
        audience: "Plateformes · projets complets · HPC", input: "FASTQ, design, amorces, références et accès à un cluster configuré.",
        steps: ["OpenMetaBar", "Validation", "Slurm / Nextflow", "phyloseq", "Description", "Exploration / Analyse", "MultiView"],
        outputs: ["logs du pipeline", "objet phyloseq", "diagnostics", "figures et tableaux", "scripts R", "composition finale"],
        caution: "L’automatisation du pipeline ne corrige pas un design incomplet, une base inadaptée ou des paramètres biologiquement non justifiés.",
        image: "app-previews/screen-openmetabar.png", href: "#/functioning"
      }
    ],
    galleryK: "Galerie de résultats",
    galleryT: "Voir ce que produit réellement l’application.",
    galleryP: "Les trois premières figures sont générées de manière reproductible à partir du dataset public GlobalPatterns. Les autres visuels montrent les familles de sorties disponibles dans l’interface.",
    filters: { all: "Tout", quality: "Contrôle qualité", exploration: "Exploration", analysis: "Analyse", report: "Restitution" },
    inspect: "Inspecter",
    selectedMethod: "Méthode ou sortie",
    selectedUse: "Ce que cela permet de lire",
    selectedNeeds: "Pré-requis",
    selectedSource: "Origine du visuel",
    openModule: "Ouvrir le module",
    reproducible: "Figure publique reproductible",
    interfacePreview: "Capture de l’application",
    provenanceK: "Démonstration de provenance",
    provenanceT: "Une figure doit pouvoir raconter comment elle a été produite.",
    provenanceP: "Sélectionnez une sortie GlobalPatterns. La chaîne ci-dessous reprend les opérations réellement utilisées par le script public de génération des figures.",
    chooseFigure: "Choisir une figure",
    retained: "Informations conservées",
    downloads: "Ressources vérifiables",
    manifest: "Manifeste de provenance JSON",
    script: "Script R de génération",
    tsv: "Provenance générale TSV",
    reproAction: "Comprendre toute la chaîne de traçabilité",
    limitsK: "Interpréter sans sur-promettre",
    limitsT: "Une belle figure n’est pas une conclusion scientifique.",
    limits: [
      ["Visualisation", "Une séparation graphique peut être descriptive sans être statistiquement étayée."],
      ["Tests", "Une p-value ne remplace ni la taille d’effet, ni les diagnostics, ni le plan expérimental."],
      ["Taxonomie", "La résolution dépend des séquences, du marqueur, de la base et de la stratégie d’assignation."],
      ["Réseaux", "Une association statistique ne démontre pas une interaction biologique directe."],
      ["Filtration", "Chaque seuil modifie l’objet analysé et doit rester justifié, documenté et comparé."],
      ["Comparaison", "Deux méthodes peuvent diverger parce qu’elles ne modélisent pas le même signal ni les mêmes hypothèses."]
    ],
    finalK: "Reproduire le parcours",
    finalT: "Passez de la vitrine à un exemple documenté.",
    finalP: "Les tutoriels utilisent des objets et des sorties vérifiables. La documentation détaille ensuite les paramètres, diagnostics et limites propres à chaque module.",
    finalTutorial: "Tester un tutoriel",
    finalDocs: "Lire la documentation"
  } : {
    heroK: "Use cases · outputs · provenance",
    heroT: <>From scientific questions<br /><em>to traceable results.</em></>,
    heroP: "BarCodeR does more than expose methods. It connects a question, a phyloseq object, explicit preparation, diagnostics and reusable outputs. This page presents four realistic journeys and the results the ecosystem can produce.",
    heroPrimary: "Explore use cases",
    heroSecondary: "View the gallery",
    metrics: [["4", "scientific use cases"], ["11", "illustrated output families"], ["3", "reproducible public figures"], ["1", "readable provenance per result"]],
    casesK: "Scientific journeys",
    casesT: "Start with the question, then connect the appropriate checks.",
    casesP: "Each use case combines several modules. These steps provide a working framework, not an automatic recipe: experimental design and method assumptions remain decisive.",
    input: "Inputs",
    outputs: "Expected outputs",
    caution: "Caution",
    openAnalysis: "Open journey",
    openTutorials: "Open tutorials",
    cases: [
      {
        number: "01", title: "Environmental monitoring", question: "Do communities differ among sites, campaigns or seasons?",
        audience: "Ecology · biodiversity · monitoring", input: "A phyloseq object with abundances, taxonomy and environmental metadata.",
        steps: ["Diagnosis", "Filtering", "Composition", "Alpha diversity", "Ordination", "PERMANOVA + dispersion", "MultiView"],
        outputs: ["taxonomic profiles", "diversity indices", "diagnosed ordination", "global test", "summary panel"],
        caution: "Do not interpret PERMANOVA without checking dispersion homogeneity and the sampling design structure.",
        image: "app-previews/ordinations.png", href: "#/analyses"
      },
      {
        number: "02", title: "Condition effect", question: "Which taxa are associated with a treatment, habitat or condition?",
        audience: "Experiments · biomonitoring · group comparison", input: "Raw counts, a variable of interest and documented covariates.",
        steps: ["Count audit", "Justified filtering", "Model", "ANCOM-BC2", "ALDEx2", "LinDA / corncob / MaAsLin 3", "Concordance"],
        outputs: ["effect sizes", "adjusted p-values", "concordant taxa", "engine-specific results", "exportable tables"],
        caution: "Detection by one method alone is not evidence of robustness. Compare assumptions, effect sizes and directions across engines.",
        image: "app-previews/analyses_differentielles.png", href: "#/analyses"
      },
      {
        number: "03", title: "Marker comparison", question: "Do two markers or domains describe a coherent ecological structure?",
        audience: "Multi-marker · multi-domain · intercomparison", input: "Several phyloseq objects with harmonised samples and shared metadata.",
        steps: ["Harmonisation", "Compatible distances", "Separate ordinations", "Mantel", "Procrustes / PROTEST", "Co-inertia / MCOA", "Reporting"],
        outputs: ["matrix correlations", "ordination overlays", "multi-table compromise", "divergent samples", "visual comparison"],
        caution: "A matrix correlation does not mean both markers detect the same taxa or have the same sensitivity.",
        image: "app-previews/comparaison_matrices.png", href: "#/analyses"
      },
      {
        number: "04", title: "From sequencing to reporting", question: "How can a sequencing run become inspectable results?",
        audience: "Core facilities · complete projects · HPC", input: "FASTQ, design, primers, references and access to a configured cluster.",
        steps: ["OpenMetaBar", "Validation", "Slurm / Nextflow", "phyloseq", "Description", "Exploration / Analysis", "MultiView"],
        outputs: ["pipeline logs", "phyloseq object", "diagnostics", "figures and tables", "R scripts", "final composition"],
        caution: "Pipeline automation cannot correct an incomplete design, an unsuitable database or biologically unjustified parameters.",
        image: "app-previews/screen-openmetabar.png", href: "#/functioning"
      }
    ],
    galleryK: "Output gallery",
    galleryT: "See what the application actually produces.",
    galleryP: "The first three figures are reproducibly generated from the public GlobalPatterns dataset. The remaining visuals show output families available in the interface.",
    filters: { all: "All", quality: "Quality control", exploration: "Exploration", analysis: "Analysis", report: "Reporting" },
    inspect: "Inspect",
    selectedMethod: "Method or output",
    selectedUse: "What it helps read",
    selectedNeeds: "Requirements",
    selectedSource: "Visual source",
    openModule: "Open module",
    reproducible: "Reproducible public figure",
    interfacePreview: "Application screenshot",
    provenanceK: "Provenance demonstration",
    provenanceT: "A figure should be able to explain how it was produced.",
    provenanceP: "Select a GlobalPatterns output. The chain below reflects the operations actually used by the public figure-generation script.",
    chooseFigure: "Choose a figure",
    retained: "Retained information",
    downloads: "Verifiable resources",
    manifest: "JSON provenance manifest",
    script: "R generation script",
    tsv: "General provenance TSV",
    reproAction: "Understand the full traceability chain",
    limitsK: "Interpret without overclaiming",
    limitsT: "A polished figure is not a scientific conclusion.",
    limits: [
      ["Visualisation", "A graphical separation can be descriptive without statistical support."],
      ["Tests", "A p-value does not replace effect size, diagnostics or experimental design."],
      ["Taxonomy", "Resolution depends on sequences, marker, database and assignment strategy."],
      ["Networks", "A statistical association does not demonstrate a direct biological interaction."],
      ["Filtering", "Every threshold changes the analysed object and must remain justified, documented and compared."],
      ["Comparison", "Methods can diverge because they model different signals and assumptions."]
    ],
    finalK: "Reproduce the journey",
    finalT: "Move from the showcase to a documented example.",
    finalP: "Tutorials use verifiable objects and outputs. Documentation then details the parameters, diagnostics and limitations specific to each module.",
    finalTutorial: "Try a tutorial",
    finalDocs: "Read documentation"
  };

  const gallery = [
    { id: "composition", category: "exploration" as ShowcaseCategory, image: "figures/globalpatterns-composition.png", title: { fr: "Composition taxonomique", en: "Taxonomic composition" }, method: { fr: "Abondance relative agrégée au phylum ; huit phyla dominants.", en: "Relative abundance aggregated at phylum level; eight dominant phyla." }, use: { fr: "Comparer les profils dominants entre types d’environnement.", en: "Compare dominant profiles across environment types." }, needs: { fr: "OTU, taxonomie et variable de groupe.", en: "OTU table, taxonomy and grouping variable." }, source: "reproducible", href: "#/application/exploration" },
    { id: "ordination", category: "analysis" as ShowcaseCategory, image: "figures/globalpatterns-ordination.png", title: { fr: "PCoA Bray-Curtis", en: "Bray-Curtis PCoA" }, method: { fr: "PCoA calculée sur les abondances relatives et la dissimilarité de Bray-Curtis.", en: "PCoA computed from relative abundances and Bray-Curtis dissimilarity." }, use: { fr: "Visualiser la structure entre échantillons avant les tests multivariés.", en: "Visualise between-sample structure before multivariate testing." }, needs: { fr: "OTU et métadonnées ; transformation et distance explicites.", en: "OTU and metadata; explicit transformation and distance." }, source: "reproducible", href: "#/application/analyse" },
    { id: "alpha", category: "analysis" as ShowcaseCategory, image: "figures/globalpatterns-alpha-diversity.png", title: { fr: "Diversité alpha", en: "Alpha diversity" }, method: { fr: "Richesse observée et indice de Shannon sur les comptes non nuls.", en: "Observed richness and Shannon index on non-zero counts." }, use: { fr: "Décrire la diversité au sein de chaque échantillon et comparer des groupes.", en: "Describe within-sample diversity and compare groups." }, needs: { fr: "OTU ; profondeur et effort d’échantillonnage à contrôler.", en: "OTU table; depth and sampling effort must be checked." }, source: "reproducible", href: "#/application/exploration" },
    { id: "quality", category: "quality" as ShowcaseCategory, image: "app-previews/qualite_assignation_taxonomique.png", title: { fr: "Qualité des assignations", en: "Assignment quality" }, method: { fr: "Synthèse des rangs atteints et de la complétude taxonomique.", en: "Summary of reached ranks and taxonomic completeness." }, use: { fr: "Repérer les niveaux interprétables et les zones de taxonomie incomplète.", en: "Identify interpretable ranks and incomplete taxonomy." }, needs: { fr: "Table taxonomique structurée.", en: "Structured taxonomy table." }, source: "interface", href: "#/application/exploration" },
    { id: "heat-tree", category: "exploration" as ShowcaseCategory, image: "app-previews/heat_tree.png", title: { fr: "Heat Tree", en: "Heat Tree" }, method: { fr: "Arbre taxonomique coloré et dimensionné par une métrique d’abondance ou de contraste.", en: "Taxonomic tree coloured and sized by an abundance or contrast metric." }, use: { fr: "Localiser visuellement les différences dans la hiérarchie taxonomique.", en: "Locate differences within the taxonomic hierarchy." }, needs: { fr: "Taxonomie multi-rangs et abondances.", en: "Multi-rank taxonomy and abundances." }, source: "interface", href: "#/application/exploration" },
    { id: "venn", category: "exploration" as ShowcaseCategory, image: "app-previews/diagramme_venn.png", title: { fr: "Taxons partagés", en: "Shared taxa" }, method: { fr: "Diagramme de Venn ou UpSet selon le nombre de groupes.", en: "Venn or UpSet diagram depending on the number of groups." }, use: { fr: "Décrire les taxons communs et spécifiques aux groupes.", en: "Describe shared and group-specific taxa." }, needs: { fr: "OTU et variable de groupe ; seuil de présence explicite.", en: "OTU and grouping variable; explicit presence threshold." }, source: "interface", href: "#/application/exploration" },
    { id: "differential", category: "analysis" as ShowcaseCategory, image: "app-previews/analyses_differentielles.png", title: { fr: "Analyse différentielle", en: "Differential analysis" }, method: { fr: "Effets, incertitudes et significativité issus de plusieurs moteurs compatibles avec les comptes.", en: "Effects, uncertainty and significance from several count-compatible engines." }, use: { fr: "Identifier les taxons associés à une condition et comparer la concordance.", en: "Identify taxa associated with a condition and compare concordance." }, needs: { fr: "Comptes bruts, modèle et contrastes documentés.", en: "Raw counts, documented model and contrasts." }, source: "interface", href: "#/application/analyse" },
    { id: "permanova", category: "analysis" as ShowcaseCategory, image: "app-previews/permanova_dispersion.png", title: { fr: "PERMANOVA et dispersion", en: "PERMANOVA and dispersion" }, method: { fr: "Test de structure multivariée accompagné de PERMDISP.", en: "Multivariate structure test accompanied by PERMDISP." }, use: { fr: "Distinguer un effet de localisation d’une différence de dispersion.", en: "Distinguish a location effect from a dispersion difference." }, needs: { fr: "Matrice de distance, formule et permutations adaptées au design.", en: "Distance matrix, formula and permutations suited to the design." }, source: "interface", href: "#/application/analyse" },
    { id: "matrices", category: "analysis" as ShowcaseCategory, image: "app-previews/comparaison_matrices.png", title: { fr: "Comparaison de matrices", en: "Matrix comparison" }, method: { fr: "Mantel, Procrustes, PROTEST, co-inertie et MCOA.", en: "Mantel, Procrustes, PROTEST, co-inertia and MCOA." }, use: { fr: "Évaluer la cohérence entre marqueurs, domaines ou représentations.", en: "Assess coherence across markers, domains or representations." }, needs: { fr: "Plusieurs matrices harmonisées sur les mêmes échantillons.", en: "Several matrices harmonised on the same samples." }, source: "interface", href: "#/application/analyse" },
    { id: "clustering", category: "analysis" as ShowcaseCategory, image: "app-previews/clustering.png", title: { fr: "Clustering et stabilité", en: "Clustering and stability" }, method: { fr: "Dendrogrammes, silhouette, Dunn et diagnostics de stabilité.", en: "Dendrograms, silhouette, Dunn and stability diagnostics." }, use: { fr: "Explorer des regroupements naturels sans les confondre avec des groupes connus.", en: "Explore natural groupings without conflating them with known groups." }, needs: { fr: "Matrice transformée ou distance cohérente avec la question.", en: "Transformed matrix or distance consistent with the question." }, source: "interface", href: "#/application/analyse" },
    { id: "multiview", category: "report" as ShowcaseCategory, image: "app-previews/screen-multiview.png", title: { fr: "Composition MultiView", en: "MultiView composition" }, method: { fr: "Bibliothèque, sélection, glisser-déposer et export de planches.", en: "Library, selection, drag-and-drop and panel export." }, use: { fr: "Assembler plusieurs résultats sans perdre leur dataset ni leurs paramètres.", en: "Assemble several results without losing their dataset or parameters." }, needs: { fr: "Figures préalablement sauvegardées dans le projet.", en: "Figures previously saved in the project." }, source: "interface", href: "#/application/multiview" }
  ];

  const provenance = {
    composition: {
      title: { fr: "Composition taxonomique", en: "Taxonomic composition" }, image: "figures/globalpatterns-composition.png",
      steps: language === "fr" ? [
        ["01", "Dataset", "phyloseq::GlobalPatterns · 26 échantillons · 19 216 taxons source"],
        ["02", "Contrôle", "Suppression des échantillons et taxons de somme nulle · 18 988 taxons analysés"],
        ["03", "Transformation", "Abondance relative calculée indépendamment pour chaque échantillon"],
        ["04", "Agrégation", "tax_glom au rang Phylum · valeurs inconnues conservées comme Unclassified"],
        ["05", "Affichage", "Huit phyla les plus abondants ; les autres sont regroupés dans Other"],
        ["06", "Sortie", "PNG 11 × 7 pouces · 180 dpi · script R public"]
      ] : [
        ["01", "Dataset", "phyloseq::GlobalPatterns · 26 samples · 19,216 source taxa"],
        ["02", "Check", "Zero-sum samples and taxa removed · 18,988 taxa analysed"],
        ["03", "Transformation", "Relative abundance computed independently within each sample"],
        ["04", "Aggregation", "tax_glom at Phylum rank · unknown values retained as Unclassified"],
        ["05", "Display", "Eight most abundant phyla; remaining taxa grouped as Other"],
        ["06", "Output", "11 × 7 inch PNG · 180 dpi · public R script"]
      ],
      retained: language === "fr" ? ["objet source", "effectifs avant/après contrôle", "transformation", "rang taxonomique", "règle Top N", "dimensions et résolution"] : ["source object", "counts before/after checks", "transformation", "taxonomic rank", "Top N rule", "dimensions and resolution"]
    },
    ordination: {
      title: { fr: "PCoA Bray-Curtis", en: "Bray-Curtis PCoA" }, image: "figures/globalpatterns-ordination.png",
      steps: language === "fr" ? [
        ["01", "Dataset", "phyloseq::GlobalPatterns après retrait des sommes nulles"],
        ["02", "Transformation", "Abondance relative par échantillon"],
        ["03", "Distance", "Dissimilarité de Bray-Curtis entre échantillons"],
        ["04", "Ordination", "PCoA ; axes annotés avec la part d’inertie relative"],
        ["05", "Métadonnée", "Coloration par SampleType avec neuf types d’environnement"],
        ["06", "Sortie", "PNG 10 × 7 pouces · 180 dpi · coordonnées calculées par phyloseq"]
      ] : [
        ["01", "Dataset", "phyloseq::GlobalPatterns after removing zero sums"],
        ["02", "Transformation", "Relative abundance within each sample"],
        ["03", "Distance", "Bray-Curtis dissimilarity among samples"],
        ["04", "Ordination", "PCoA; axes labelled with relative inertia"],
        ["05", "Metadata", "Colour mapped to SampleType across nine environments"],
        ["06", "Output", "10 × 7 inch PNG · 180 dpi · coordinates computed with phyloseq"]
      ],
      retained: language === "fr" ? ["dataset actif", "transformation", "distance", "méthode d’ordination", "variable esthétique", "valeurs propres"] : ["active dataset", "transformation", "distance", "ordination method", "aesthetic variable", "eigenvalues"]
    },
    alpha: {
      title: { fr: "Diversité alpha", en: "Alpha diversity" }, image: "figures/globalpatterns-alpha-diversity.png",
      steps: language === "fr" ? [
        ["01", "Dataset", "Comptes GlobalPatterns après retrait des sommes nulles"],
        ["02", "Mesures", "Observed et Shannon calculés avec estimate_richness"],
        ["03", "Métadonnée", "Jointure avec SampleType pour les 26 échantillons"],
        ["04", "Structure", "Deux facettes avec échelles verticales indépendantes"],
        ["05", "Affichage", "Boxplots descriptifs et points individuels avec jitter reproductible"],
        ["06", "Sortie", "PNG 12 × 6,8 pouces · 180 dpi · aucune p-value ajoutée"]
      ] : [
        ["01", "Dataset", "GlobalPatterns counts after removing zero sums"],
        ["02", "Measures", "Observed and Shannon computed with estimate_richness"],
        ["03", "Metadata", "Joined with SampleType for all 26 samples"],
        ["04", "Structure", "Two facets with independent vertical scales"],
        ["05", "Display", "Descriptive boxplots and individual points with reproducible jitter"],
        ["06", "Output", "12 × 6.8 inch PNG · 180 dpi · no p-value added"]
      ],
      retained: language === "fr" ? ["comptes analysés", "indices", "variable de groupe", "graine graphique", "absence de test", "format d’export"] : ["analysed counts", "indices", "grouping variable", "graphical seed", "absence of testing", "export format"]
    }
  };

  const filteredGallery = category === "all" ? gallery : gallery.filter(item => item.category === category);
  const selectCategory = (nextCategory: ShowcaseCategory) => {
    setCategory(nextCategory);
    const nextOutputs = nextCategory === "all" ? gallery : gallery.filter(item => item.category === nextCategory);
    if (!nextOutputs.some(item => item.id === selectedOutput) && nextOutputs[0]) setSelectedOutput(nextOutputs[0].id);
  };
  const currentOutput = gallery.find(item => item.id === selectedOutput) ?? gallery[0];
  const currentProvenance = provenance[provenanceKey];

  return <main>
    <section className="showcase-hero"><div className="page-width showcase-hero-grid"><div className="reveal"><Eyebrow>{c.heroK}</Eyebrow><h1>{c.heroT}</h1><p className="lead">{c.heroP}</p><div className="showcase-hero-actions"><button className="button primary" type="button" onClick={() => document.getElementById("scientific-use-cases")?.scrollIntoView({ behavior: "smooth" })}>{c.heroPrimary}<span>↓</span></button><button className="button secondary" type="button" onClick={() => document.getElementById("output-gallery")?.scrollIntoView({ behavior: "smooth" })}>{c.heroSecondary}<span>↘</span></button></div></div><div className="showcase-hero-visual reveal"><img src={asset("app-previews/screen-multiview.png")} alt={language === "fr" ? "Planche de résultats dans MultiView" : "Result panel in MultiView"} /><span className="showcase-float-card top">Dataset · GlobalPatterns</span><span className="showcase-float-card bottom">Parameters · Code R · Export</span></div></div><div className="page-width showcase-metrics">{c.metrics.map(([number, label]) => <div key={label}><b>{number}</b><span>{label}</span></div>)}</div></section>

    <section className="section page-width showcase-cases" id="scientific-use-cases"><div className="section-heading"><div><Eyebrow>{c.casesK}</Eyebrow><h2>{c.casesT}</h2></div><p>{c.casesP}</p></div><div className="showcase-case-list">{c.cases.map((item, index) => <article className="showcase-case reveal" style={{ "--delay": `${index * 50}ms` } as React.CSSProperties} key={item.number}><div className="showcase-case-image"><img src={asset(item.image)} alt="" /><span>{item.number}</span></div><div className="showcase-case-copy"><small>{item.audience}</small><h3>{item.title}</h3><blockquote>{item.question}</blockquote><div className="showcase-case-input"><b>{c.input}</b><p>{item.input}</p></div><ol>{item.steps.map((step, stepIndex) => <li key={step}><span>{String(stepIndex + 1).padStart(2, "0")}</span>{step}</li>)}</ol><div className="showcase-output-tags"><b>{c.outputs}</b><div>{item.outputs.map(output => <span key={output}>{output}</span>)}</div></div><div className="showcase-caution"><span>!</span><p><b>{c.caution}</b>{item.caution}</p></div><div className="showcase-case-actions"><a href={item.href}>{c.openAnalysis}<span>→</span></a><a href="#/tutorials">{c.openTutorials}<span>↗</span></a></div></div></article>)}</div></section>

    <section className="showcase-gallery-section" id="output-gallery"><div className="page-width"><div className="section-heading light"><div><Eyebrow>{c.galleryK}</Eyebrow><h2>{c.galleryT}</h2></div><p>{c.galleryP}</p></div><div className="showcase-filter-bar" role="group" aria-label={c.galleryK}>{(Object.keys(c.filters) as ShowcaseCategory[]).map(key => <button type="button" className={category === key ? "active" : ""} onClick={() => selectCategory(key)} aria-pressed={category === key} key={key}>{c.filters[key]}</button>)}</div><div className="showcase-gallery-layout"><div className="showcase-gallery-grid">{filteredGallery.map((item, index) => <button type="button" className={`showcase-gallery-card ${selectedOutput === item.id ? "active" : ""}`} onClick={() => setSelectedOutput(item.id)} style={{ "--delay": `${(index % 3) * 45}ms` } as React.CSSProperties} key={item.id}><div><img src={asset(item.image)} alt={tx(item.title, language)} /><span>{item.source === "reproducible" ? c.reproducible : c.interfacePreview}</span></div><h3>{tx(item.title, language)}</h3><b>{c.inspect}<i>→</i></b></button>)}</div><aside className="showcase-output-detail" key={currentOutput.id}><div className="showcase-detail-image"><img src={asset(currentOutput.image)} alt={tx(currentOutput.title, language)} /></div><small>{currentOutput.source === "reproducible" ? c.reproducible : c.interfacePreview}</small><h3>{tx(currentOutput.title, language)}</h3><dl><div><dt>{c.selectedMethod}</dt><dd>{tx(currentOutput.method, language)}</dd></div><div><dt>{c.selectedUse}</dt><dd>{tx(currentOutput.use, language)}</dd></div><div><dt>{c.selectedNeeds}</dt><dd>{tx(currentOutput.needs, language)}</dd></div><div><dt>{c.selectedSource}</dt><dd>{currentOutput.source === "reproducible" ? "phyloseq::GlobalPatterns · public/figures" : "BarCodeR v2.12.8 · app-previews"}</dd></div></dl><a href={currentOutput.href}>{c.openModule}<span>→</span></a></aside></div></div></section>

    <section className="section page-width showcase-provenance"><div className="section-heading"><div><Eyebrow>{c.provenanceK}</Eyebrow><h2>{c.provenanceT}</h2></div><p>{c.provenanceP}</p></div><div className="showcase-provenance-tabs" role="group" aria-label={c.chooseFigure}>{(Object.keys(provenance) as ProvenanceKey[]).map(key => <button type="button" className={provenanceKey === key ? "active" : ""} onClick={() => setProvenanceKey(key)} aria-pressed={provenanceKey === key} key={key}>{tx(provenance[key].title, language)}</button>)}</div><div className="showcase-provenance-grid"><div className="showcase-provenance-figure"><img src={asset(currentProvenance.image)} alt={tx(currentProvenance.title, language)} /><div><span>GlobalPatterns</span><b>{tx(currentProvenance.title, language)}</b></div></div><div className="showcase-provenance-chain">{currentProvenance.steps.map(([number, title, text], index) => <article key={number}><span>{number}</span><div><b>{title}</b><p>{text}</p></div>{index < currentProvenance.steps.length - 1 && <i>↓</i>}</article>)}</div></div><div className="showcase-provenance-footer"><div><small>{c.retained}</small><div>{currentProvenance.retained.map(item => <span key={item}>✓ {item}</span>)}</div></div><div><small>{c.downloads}</small><a href={asset("showcase/globalpatterns-provenance.json")} target="_blank" rel="noreferrer">{c.manifest}<span>↗</span></a><a href="https://github.com/MLPosuphy/site-BarCodeR-R-shiny-application/blob/main/scripts/generate_public_data_figures.R" target="_blank" rel="noreferrer">{c.script}<span>↗</span></a><a href={asset("figures/data-provenance.tsv")} target="_blank" rel="noreferrer">{c.tsv}<span>↗</span></a><a href="#/reproducibility">{c.reproAction}<span>→</span></a></div></div></section>

    <section className="showcase-limits-section"><div className="page-width"><div className="section-heading light"><div><Eyebrow>{c.limitsK}</Eyebrow><h2>{c.limitsT}</h2></div></div><div className="showcase-limits-grid">{c.limits.map(([title, text], index) => <article className="reveal" style={{ "--delay": `${(index % 3) * 45}ms` } as React.CSSProperties} key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="section page-width showcase-final"><div><Eyebrow>{c.finalK}</Eyebrow><h2>{c.finalT}</h2><p>{c.finalP}</p></div><div><a className="button primary" href="#/tutorials">{c.finalTutorial}<span>→</span></a><a className="button secondary" href="#/documentation">{c.finalDocs}<span>↗</span></a></div></section>
  </main>;
}

function ReproducibilityPage({ language }: { language: Language }) {
  const [activeStep, setActiveStep] = useState(0);
  const c = language === "fr" ? {
    k: "Reproductibilité", title: "Un résultat ne devrait jamais être une boîte noire.", p: "BarCodeR × OpenMetaBar conserve le fil entre les fichiers bruts, les transformations, les paramètres et les sorties afin de comprendre, partager et rejouer une analyse.", metrics: [["6", "étapes reliées"], ["14", "familles de sorties avec code R"], ["1", "fil continu du run à la figure"]], explore: "Explorez la chaîne de traçabilité", exploreP: "Cliquez sur une étape pour voir ce qui est conservé et ce que cela rend possible.", steps: [
      { title: "FASTQ & design", kicker: "Le point de départ", description: "Les fichiers bruts et le design du run identifient précisément les échantillons, les marqueurs et les entrées utilisées.", keeps: ["Fichiers FASTQ", "Design expérimental", "Amorces et métadonnées"], outcome: "Un départ identifiable" },
      { title: "OpenMetaBar", kicker: "Le calcul documenté", description: "La configuration du pipeline, le profil d’exécution et les logs décrivent comment les reads ont été traités sur le cluster.", keeps: ["Paramètres du pipeline", "Profil Nextflow", "Logs d’exécution"], outcome: "Un traitement inspectable" },
      { title: "Objet phyloseq", kicker: "Le passage de relais", description: "Les abondances, la taxonomie et les métadonnées sont réunies dans un objet standardisé directement exploitable dans BarCodeR.", keeps: ["Table d’abondance", "Taxonomie", "Métadonnées échantillons"], outcome: "Une entrée standardisée" },
      { title: "Préparation", kicker: "Les transformations visibles", description: "Les opérations d’édition et de filtration produisent des objets dérivés sans effacer le lien avec leur origine.", keeps: ["Filtres appliqués", "Objets dérivés", "Contexte du projet"], outcome: "Des choix retraçables" },
      { title: "Analyse", kicker: "Les calculs paramétrés", description: "Les méthodes, variables, distances, graines et options graphiques restent associées au résultat produit.", keeps: ["Méthode et variables", "Paramètres statistiques", "Graine et versions"], outcome: "Un calcul rejouable" },
      { title: "Sorties", kicker: "La preuve partageable", description: "Figures, tableaux, historiques et scripts R permettent de relire le contexte et de prolonger l’analyse hors de l’interface.", keeps: ["Figure et tableau", "Historique", "Script R compatible"], outcome: "Un résultat transmissible" }
    ], pillarsK: "Quatre réflexes intégrés", pillarsT: "Capturer, relier, rejouer, partager.", pillars: [["01", "Capturer", "Paramètres, versions et choix restent attachés au travail réalisé."], ["02", "Relier", "Chaque transformation conserve un lien avec les objets qui l’ont précédée."], ["03", "Rejouer", "Les historiques et le code R permettent de retrouver la recette d’un résultat."], ["04", "Partager", "Figures, tableaux et contextes peuvent circuler sans perdre leur histoire."]], limits: "La traçabilité éclaire l’analyse — elle ne remplace pas le jugement scientifique.", limitP: "Un historique complet ne rend pas automatiquement un plan expérimental valide. L’interprétation dépend toujours du design, de la qualité des données, de la base taxonomique, des hypothèses des méthodes et des choix de filtrage."
  } : {
    k: "Reproducibility", title: "A result should never be a black box.", p: "BarCodeR × OpenMetaBar preserves the thread between raw files, transformations, parameters and outputs so an analysis can be understood, shared and replayed.", metrics: [["6", "connected steps"], ["14", "output families with R code"], ["1", "continuous thread from run to figure"]], explore: "Explore the traceability chain", exploreP: "Select a step to see what is retained and what it enables.", steps: [
      { title: "FASTQ & design", kicker: "The starting point", description: "Raw files and run design precisely identify the samples, markers and inputs used.", keeps: ["FASTQ files", "Experimental design", "Primers and metadata"], outcome: "An identifiable start" },
      { title: "OpenMetaBar", kicker: "Documented computing", description: "Pipeline configuration, execution profile and logs describe how reads were processed on the cluster.", keeps: ["Pipeline parameters", "Nextflow profile", "Execution logs"], outcome: "Inspectable processing" },
      { title: "Phyloseq object", kicker: "The handover", description: "Abundances, taxonomy and metadata are gathered in a standardised object ready for BarCodeR.", keeps: ["Abundance table", "Taxonomy", "Sample metadata"], outcome: "A standardised input" },
      { title: "Preparation", kicker: "Visible transformations", description: "Editing and filtering operations create derived objects without erasing the link to their origin.", keeps: ["Applied filters", "Derived objects", "Project context"], outcome: "Traceable choices" },
      { title: "Analysis", kicker: "Parameterised calculations", description: "Methods, variables, distances, seeds and graphical options remain associated with the result.", keeps: ["Method and variables", "Statistical parameters", "Seed and versions"], outcome: "A replayable calculation" },
      { title: "Outputs", kicker: "Shareable evidence", description: "Figures, tables, histories and R scripts make it possible to review the context and continue outside the interface.", keeps: ["Figure and table", "History", "Compatible R script"], outcome: "A transferable result" }
    ], pillarsK: "Four built-in habits", pillarsT: "Capture, connect, replay, share.", pillars: [["01", "Capture", "Parameters, versions and choices remain attached to the work performed."], ["02", "Connect", "Every transformation retains a link to the objects that came before it."], ["03", "Replay", "Histories and R code make the recipe behind a result recoverable."], ["04", "Share", "Figures, tables and context can circulate without losing their history."]], limits: "Traceability informs analysis — it does not replace scientific judgement.", limitP: "A complete history does not automatically make an experimental design valid. Interpretation still depends on design, data quality, taxonomic databases, method assumptions and filtering choices."
  };
  const step = c.steps[activeStep];
  return <main><section className="repro-hero"><div className="page-width"><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p className="lead">{c.p}</p><div className="repro-metrics">{c.metrics.map(([number, label]) => <div key={label}><b>{number}</b><span>{label}</span></div>)}</div></div></section><section className="section page-width"><div className="section-heading"><div><Eyebrow>{c.explore}</Eyebrow><h2>{c.explore}</h2></div><p>{c.exploreP}</p></div><div className="repro-explorer"><nav aria-label={c.explore}>{c.steps.map((item, index) => <button className={index === activeStep ? "active" : ""} onClick={() => setActiveStep(index)} aria-pressed={index === activeStep} key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><b>{item.title}</b><i>→</i></button>)}</nav><article className="repro-detail" key={step.title}><div className="repro-progress"><span style={{ width: `${((activeStep + 1) / c.steps.length) * 100}%` }} /></div><small>{step.kicker}</small><h3>{step.title}</h3><p>{step.description}</p><div className="repro-keeps">{step.keeps.map(item => <span key={item}>✓ {item}</span>)}</div><div className="repro-outcome"><small>{language === "fr" ? "Ce que cela permet" : "What this enables"}</small><b>{step.outcome}</b></div></article></div></section><section className="section section-tint"><div className="page-width"><div className="section-intro"><Eyebrow>{c.pillarsK}</Eyebrow><h2>{c.pillarsT}</h2></div><div className="repro-pillars">{c.pillars.map(([number, title, text]) => <article className="reveal" key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section><section className="limits-panel repro-limits page-width"><span>!</span><div><Eyebrow>{c.limits}</Eyebrow><h2>{c.limits}</h2><p>{c.limitP}</p></div></section></main>;
}

function DownloadPage({ language }: { language: Language }) {
  const [copied, setCopied] = useState<string | null>(null);
  const appVersion = "2.12.8";
  const documentationVersion = "1.8.0";
  const sourceCommand = 'shiny::runApp("app.R")';
  const cloneCommand = "git clone https://github.com/MLPosuphy/BarCodeR.git";
  const temporaryCitation = language === "fr"
    ? `Équipe BarCodeR (${new Date().getFullYear()}). BarCodeR v${appVersion} : application R/Shiny pour l’analyse reproductible des données de métabarcoding. Code source : https://github.com/MLPosuphy/BarCodeR.`
    : `BarCodeR team (${new Date().getFullYear()}). BarCodeR v${appVersion}: an R/Shiny application for reproducible metabarcoding data analysis. Source code: https://github.com/MLPosuphy/BarCodeR.`;

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
    k: "Télécharger, installer et citer",
    title: "Choisissez un mode d’accès adapté à votre environnement.",
    p: "BarCodeR peut être lancé depuis ses sources R. Une distribution Windows autonome est prévue pour simplifier l’usage sans installation manuelle, mais aucun binaire public n’est encore inclus dans cette version du site.",
    version: "Version applicative",
    docs: "Documentation",
    languages: "Langues de l’interface",
    sourceAvailable: "Disponible maintenant",
    pending: "À finaliser",
    repository: "Dépôt source",
    sourceTitle: "Lancer depuis les sources R",
    sourceP: "Solution actuelle de référence pour inspecter le code, développer des modules ou déployer l’application dans un environnement R maîtrisé.",
    sourceNeeds: ["R et les dépendances de l’application", "Accès au dépôt GitHub", "Installation locale ou serveur Shiny"],
    sourceAction: "Ouvrir le dépôt BarCodeR",
    clone: "Cloner le dépôt",
    launch: "Lancer l’application",
    copy: "Copier",
    copied: "Copié",
    windowsTitle: "Distribution Windows autonome",
    windowsP: "Format destiné aux utilisateurs qui ne souhaitent pas installer R et l’ensemble des dépendances manuellement.",
    windowsNeeds: ["Archive versionnée", "Somme SHA-256", "Instructions de mise à jour", "Validation sur une installation Windows propre"],
    windowsStatus: "Le paquet Windows n’est pas fourni par le site actuel.",
    serverTitle: "Déploiement serveur",
    serverP: "Installation destinée à une plateforme, une équipe ou un service mutualisé. Le stockage, les droits d’accès et les sauvegardes doivent être configurés par l’administrateur.",
    serverNeeds: ["R et packages système", "Shiny Server ou infrastructure équivalente", "Stockage persistant des projets", "Politique d’accès et de sauvegarde"],
    serverAction: "Consulter l’architecture",
    hpcTitle: "OpenMetaBar sur cluster HPC",
    hpcP: "OpenMetaBar complète BarCodeR lorsque le traitement part de FASTQ. Le cluster et les outils d’exécution ne sont pas fournis avec l’application.",
    hpcNeeds: ["Connexion SSH", "Ordonnanceur Slurm", "Nextflow", "Singularity ou Apptainer", "Bases et ressources de calcul"],
    hpcAction: "Voir le fonctionnement HPC",
    modesK: "Modes d’accès",
    modesT: "Un même logiciel, plusieurs contextes de déploiement.",
    requirementsK: "Compatibilité et prérequis",
    requirementsT: "Ce que chaque mode implique avant de commencer.",
    mode: "Mode",
    rRequired: "R local",
    clusterRequired: "Cluster",
    internet: "Internet",
    suitable: "Contexte recommandé",
    yes: "Oui",
    no: "Non",
    optional: "Optionnel",
    planned: "Prévu",
    rows: [
      ["Sources R", "Oui", "Non", "Pour installation et mises à jour", "Développement, expertise, serveur"],
      ["Windows autonome", "Non", "Non", "Pour téléchargement et mises à jour", "Utilisation locale guidée"],
      ["Serveur mutualisé", "Sur le serveur", "Non", "Selon l’infrastructure", "Plateforme ou équipe"],
      ["OpenMetaBar", "Selon l’installation", "Oui", "Selon le cluster", "Traitement des FASTQ sur HPC"]
    ],
    releasesK: "Versions et statut de publication",
    releasesT: "Distinguer ce qui est exploitable de ce qui doit encore être publié.",
    releaseRows: [
      ["BarCodeR", `v${appVersion}`, "Version détectée dans app.R", "stable"],
      ["Documentation", `v${documentationVersion}`, "90 pages, 9 modules, 5 langues", "stable"],
      ["Site public", "Lot 7", "Refonte éditoriale en cours", "progress"],
      ["Distribution Windows", "Non publiée", "Archive et validation à produire", "pending"],
      ["Licence", "Non déclarée", "À définir avant redistribution externe", "pending"],
      ["DOI / archive", "Non publié", "À produire pour une citation pérenne", "pending"]
    ],
    stable: "Disponible",
    progress: "En cours",
    openScienceK: "Code et science ouverte",
    openScienceT: "Les sources sont consultables ; la licence et l’archive citable doivent encore être formalisées.",
    appRepo: "Code de BarCodeR",
    appRepoP: "Application R/Shiny, modules analytiques, gestion des projets et intégration OpenMetaBar.",
    siteRepo: "Code du site",
    siteRepoP: "Site React/Vite, contenus publics, documentation intégrée et scripts de génération.",
    openGithub: "Ouvrir sur GitHub",
    citationK: "Citation",
    citationT: "Utiliser une citation temporaire tant qu’aucun DOI n’est publié.",
    citationP: "Cette formulation identifie la version et le dépôt, mais elle devra être remplacée par la citation officielle lors de la publication de l’archive versionnée.",
    copyCitation: "Copier la citation",
    publicationWarning: "Avant une diffusion externe formelle",
    publicationWarningP: "Déclarer une licence, synchroniser tous les identifiants de version, produire une archive immuable, publier son DOI et ajouter un fichier CITATION.cff.",
    privacyK: "Confidentialité et télémétrie",
    privacyT: "Les données scientifiques restent locales ; des événements d’usage peuvent être transmis.",
    privacyP: "La télémétrie est configurable depuis Paramètres > Confidentialité. Elle est conçue pour mesurer l’usage et améliorer l’estimation des durées OpenMetaBar sans transmettre le contenu biologique des projets.",
    collected: "Peut être enregistré",
    collectedItems: ["Onglets ouverts", "Analyses lancées", "Durées des traitements OpenMetaBar", "Erreurs rencontrées", "Informations techniques d’exécution"],
    never: "N’est pas transmis",
    neverItems: ["Tables d’abondance", "Métadonnées scientifiques", "Noms d’échantillons", "Séquences", "Nom d’utilisateur de la machine"],
    privacyNote: "Les événements sont placés dans une file locale et peuvent être envoyés ultérieurement lorsque le réseau est disponible. L’envoi peut être désactivé dans l’application et la file peut être vidée.",
    helpK: "Avant de commencer",
    helpT: "Trois ressources pour choisir le bon parcours.",
    helpItems: [
      ["Tutoriels", "Tester BarCodeR sur un jeu de données documenté.", "#/tutorials"],
      ["Documentation", "Consulter les guides méthodologiques et techniques.", "#/documentation"],
      ["Fonctionnement", "Comprendre le lien entre BarCodeR et OpenMetaBar.", "#/functioning"]
    ]
  } : {
    k: "Download, install and cite",
    title: "Choose an access mode suited to your environment.",
    p: "BarCodeR can be launched from its R sources. A standalone Windows distribution is planned to simplify use without manual installation, but no public binary is included in this version of the website.",
    version: "Application version",
    docs: "Documentation",
    languages: "Interface languages",
    sourceAvailable: "Available now",
    pending: "To finalise",
    repository: "Source repository",
    sourceTitle: "Run from the R sources",
    sourceP: "The current reference option for inspecting the code, developing modules or deploying the application in a controlled R environment.",
    sourceNeeds: ["R and the application dependencies", "Access to the GitHub repository", "Local installation or Shiny server"],
    sourceAction: "Open the BarCodeR repository",
    clone: "Clone the repository",
    launch: "Launch the application",
    copy: "Copy",
    copied: "Copied",
    windowsTitle: "Standalone Windows distribution",
    windowsP: "Format intended for users who do not want to install R and all dependencies manually.",
    windowsNeeds: ["Versioned archive", "SHA-256 checksum", "Update instructions", "Validation on a clean Windows installation"],
    windowsStatus: "The Windows package is not provided by the current website.",
    serverTitle: "Server deployment",
    serverP: "Installation intended for a platform, team or shared service. Storage, access rights and backups must be configured by the administrator.",
    serverNeeds: ["R and system packages", "Shiny Server or equivalent infrastructure", "Persistent project storage", "Access and backup policy"],
    serverAction: "Read the architecture",
    hpcTitle: "OpenMetaBar on an HPC cluster",
    hpcP: "OpenMetaBar complements BarCodeR when processing starts from FASTQ. The cluster and execution tools are not provided with the application.",
    hpcNeeds: ["SSH connection", "Slurm scheduler", "Nextflow", "Singularity or Apptainer", "Databases and compute resources"],
    hpcAction: "View the HPC workflow",
    modesK: "Access modes",
    modesT: "One software package, several deployment contexts.",
    requirementsK: "Compatibility and requirements",
    requirementsT: "What each mode requires before getting started.",
    mode: "Mode",
    rRequired: "Local R",
    clusterRequired: "Cluster",
    internet: "Internet",
    suitable: "Recommended context",
    yes: "Yes",
    no: "No",
    optional: "Optional",
    planned: "Planned",
    rows: [
      ["R sources", "Yes", "No", "For installation and updates", "Development, expertise, server"],
      ["Standalone Windows", "No", "No", "For download and updates", "Guided local use"],
      ["Shared server", "On the server", "No", "Depends on infrastructure", "Platform or team"],
      ["OpenMetaBar", "Depends on installation", "Yes", "Depends on cluster", "FASTQ processing on HPC"]
    ],
    releasesK: "Versions and publication status",
    releasesT: "Separate what is usable from what still needs to be published.",
    releaseRows: [
      ["BarCodeR", `v${appVersion}`, "Version detected in app.R", "stable"],
      ["Documentation", `v${documentationVersion}`, "90 pages, 9 modules, 5 languages", "stable"],
      ["Public website", "Lot 7", "Editorial redesign in progress", "progress"],
      ["Windows distribution", "Not published", "Archive and validation to produce", "pending"],
      ["License", "Not declared", "Must be defined before external redistribution", "pending"],
      ["DOI / archive", "Not published", "Must be produced for a persistent citation", "pending"]
    ],
    stable: "Available",
    progress: "In progress",
    openScienceK: "Code and open science",
    openScienceT: "Sources can be inspected; the license and citable archive still need formalisation.",
    appRepo: "BarCodeR source code",
    appRepoP: "R/Shiny application, analytical modules, project management and OpenMetaBar integration.",
    siteRepo: "Website source code",
    siteRepoP: "React/Vite website, public content, embedded documentation and generation scripts.",
    openGithub: "Open on GitHub",
    citationK: "Citation",
    citationT: "Use a temporary citation until a DOI is published.",
    citationP: "This wording identifies the version and repository, but it must be replaced by the official citation once the versioned archive is published.",
    copyCitation: "Copy citation",
    publicationWarning: "Before formal external distribution",
    publicationWarningP: "Declare a license, synchronise all version identifiers, create an immutable archive, publish its DOI and add a CITATION.cff file.",
    privacyK: "Privacy and telemetry",
    privacyT: "Scientific data remain local; usage events may be transmitted.",
    privacyP: "Telemetry is configurable from Settings > Privacy. It is designed to measure usage and improve OpenMetaBar runtime estimation without transmitting the biological content of projects.",
    collected: "May be recorded",
    collectedItems: ["Opened tabs", "Launched analyses", "OpenMetaBar processing durations", "Encountered errors", "Technical runtime information"],
    never: "Is not transmitted",
    neverItems: ["Abundance tables", "Scientific metadata", "Sample names", "Sequences", "Machine username"],
    privacyNote: "Events are queued locally and may be sent later when a network is available. Sending can be disabled in the application and the queue can be cleared.",
    helpK: "Before getting started",
    helpT: "Three resources for selecting the right path.",
    helpItems: [
      ["Tutorials", "Test BarCodeR with a documented dataset.", "#/tutorials"],
      ["Documentation", "Read methodological and technical guides.", "#/documentation"],
      ["How it works", "Understand the relationship between BarCodeR and OpenMetaBar.", "#/functioning"]
    ]
  };

  const statusLabel = (status: string) => status === "stable" ? c.stable : status === "progress" ? c.progress : c.pending;

  return <main className="download-page">
    <section className="download-hero">
      <div className="page-width download-hero-grid">
        <div><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p className="lead">{c.p}</p><div className="download-hero-actions"><a className="button primary" href="https://github.com/MLPosuphy/BarCodeR" target="_blank" rel="noreferrer">{c.sourceAction}<span>↗</span></a><button className="button secondary" type="button" onClick={() => document.getElementById("download-modes")?.scrollIntoView({ behavior: "smooth" })}>{c.modesK}<span>↓</span></button></div></div>
        <div className="download-release-card" aria-label={c.version}><span>BarCodeR</span><strong>v{appVersion}</strong><dl><div><dt>{c.docs}</dt><dd>v{documentationVersion}</dd></div><div><dt>{c.languages}</dt><dd>5</dd></div><div><dt>{c.repository}</dt><dd>GitHub</dd></div></dl></div>
      </div>
    </section>

    <section className="section page-width" id="download-modes">
      <div className="section-heading"><div><Eyebrow>{c.modesK}</Eyebrow><h2>{c.modesT}</h2></div></div>
      <div className="download-mode-grid">
        <article className="download-mode-card featured"><header><span>R</span><b>{c.sourceAvailable}</b></header><h3>{c.sourceTitle}</h3><p>{c.sourceP}</p><ul>{c.sourceNeeds.map((item) => <li key={item}>{item}</li>)}</ul><div className="download-code-stack"><div><small>{c.clone}</small><code>{cloneCommand}</code><button type="button" onClick={() => copyText("clone", cloneCommand)}>{copied === "clone" ? c.copied : c.copy}</button></div><div><small>{c.launch}</small><code>{sourceCommand}</code><button type="button" onClick={() => copyText("launch", sourceCommand)}>{copied === "launch" ? c.copied : c.copy}</button></div></div><a href="https://github.com/MLPosuphy/BarCodeR" target="_blank" rel="noreferrer">{c.sourceAction}<span>↗</span></a></article>
        <article className="download-mode-card pending"><header><span>WIN</span><b>{c.pending}</b></header><h3>{c.windowsTitle}</h3><p>{c.windowsP}</p><ul>{c.windowsNeeds.map((item) => <li key={item}>{item}</li>)}</ul><div className="download-unavailable"><span>!</span><p>{c.windowsStatus}</p></div></article>
        <article className="download-mode-card"><header><span>SRV</span><b>{c.sourceAvailable}</b></header><h3>{c.serverTitle}</h3><p>{c.serverP}</p><ul>{c.serverNeeds.map((item) => <li key={item}>{item}</li>)}</ul><a href="#/functioning">{c.serverAction}<span>→</span></a></article>
        <article className="download-mode-card openmetabar"><header><span>HPC</span><b>OpenMetaBar</b></header><h3>{c.hpcTitle}</h3><p>{c.hpcP}</p><ul>{c.hpcNeeds.map((item) => <li key={item}>{item}</li>)}</ul><a href="#/functioning">{c.hpcAction}<span>→</span></a></article>
      </div>
    </section>

    <section className="section section-tint download-requirements-section"><div className="page-width"><div className="section-heading"><div><Eyebrow>{c.requirementsK}</Eyebrow><h2>{c.requirementsT}</h2></div></div><div className="download-table-wrap"><table><thead><tr><th>{c.mode}</th><th>{c.rRequired}</th><th>{c.clusterRequired}</th><th>{c.internet}</th><th>{c.suitable}</th></tr></thead><tbody>{c.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div></div></section>

    <section className="section page-width download-release-section"><div className="section-heading"><div><Eyebrow>{c.releasesK}</Eyebrow><h2>{c.releasesT}</h2></div></div><div className="download-release-list">{c.releaseRows.map(([name, value, note, status]) => <article key={name}><div><small>{name}</small><strong>{value}</strong></div><p>{note}</p><span className={`status-${status}`}>{statusLabel(status)}</span></article>)}</div></section>

    <section className="download-open-science"><div className="page-width"><div className="download-open-heading"><div><Eyebrow>{c.openScienceK}</Eyebrow><h2>{c.openScienceT}</h2></div></div><div className="download-repository-grid"><a href="https://github.com/MLPosuphy/BarCodeR" target="_blank" rel="noreferrer"><span>R</span><small>github.com/MLPosuphy/BarCodeR</small><h3>{c.appRepo}</h3><p>{c.appRepoP}</p><b>{c.openGithub} ↗</b></a><a href="https://github.com/MLPosuphy/site-BarCodeR-R-shiny-application" target="_blank" rel="noreferrer"><span>WEB</span><small>github.com/MLPosuphy/site-BarCodeR-R-shiny-application</small><h3>{c.siteRepo}</h3><p>{c.siteRepoP}</p><b>{c.openGithub} ↗</b></a></div></div></section>

    <section className="section page-width download-citation-section"><div className="download-citation-grid"><div><Eyebrow>{c.citationK}</Eyebrow><h2>{c.citationT}</h2><p>{c.citationP}</p></div><div className="download-citation-box"><blockquote>{temporaryCitation}</blockquote><button type="button" onClick={() => copyText("citation", temporaryCitation)}>{copied === "citation" ? c.copied : c.copyCitation}</button></div></div><div className="download-publication-warning"><span>!</span><div><strong>{c.publicationWarning}</strong><p>{c.publicationWarningP}</p></div></div></section>

    <section className="download-privacy-section"><div className="page-width"><div className="download-privacy-heading"><Eyebrow>{c.privacyK}</Eyebrow><h2>{c.privacyT}</h2><p>{c.privacyP}</p></div><div className="download-privacy-grid"><article className="collected"><span>+</span><h3>{c.collected}</h3><ul>{c.collectedItems.map((item) => <li key={item}>{item}</li>)}</ul></article><article className="never"><span>−</span><h3>{c.never}</h3><ul>{c.neverItems.map((item) => <li key={item}>{item}</li>)}</ul></article></div><p className="download-privacy-note">{c.privacyNote}</p></div></section>

    <section className="section page-width download-help-section"><div className="section-heading"><div><Eyebrow>{c.helpK}</Eyebrow><h2>{c.helpT}</h2></div></div><div className="download-help-grid">{c.helpItems.map(([title, description, href], index) => <a href={href} key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p><b>→</b></a>)}</div></section>
  </main>;
}

function Footer({ language }: { language: Language }) {
  return <footer><div className="page-width footer-main"><Brand language={language} /><p>{language === "fr" ? "Logiciel scientifique pour le traitement, l’exploration et l’analyse reproductible des données de métabarcoding." : "Scientific software for processing, exploring and reproducibly analysing metabarcoding data."}</p><nav><a href="#/functioning">{language === "fr" ? "Fonctionnement" : "How it works"}</a><a href="#/analyses">{language === "fr" ? "Analyses" : "Analyses"}</a><a href="#/showcase">{language === "fr" ? "Cas d’usage" : "Use cases"}</a><a href="#/tutorials">{language === "fr" ? "Tutoriels" : "Tutorials"}</a><a href="#/documentation">Documentation</a><a href="#/download">{language === "fr" ? "Télécharger" : "Download"}</a></nav></div><div className="footer-bottom page-width"><span>BarCodeR × OpenMetaBar · v2.12.8</span><span>Institut Sophia Agrobiotech · PHYBAC</span></div></footer>;
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
      : route === "/functioning" || route === "/application" ? (language === "fr" ? "Fonctionnement de l’écosystème" : "How the ecosystem works")
      : route === "/download" || route === "/availability" ? (language === "fr" ? "Télécharger et citer" : "Download and cite")
      : route === "/reproducibility" ? (language === "fr" ? "Reproductibilité" : "Reproducibility")
      : (language === "fr" ? "Analyse reproductible du métabarcoding" : "Reproducible metabarcoding analysis");
    document.title = `${label} | BarCodeR × OpenMetaBar`;
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
