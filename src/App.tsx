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
        <a className={route === "/analyses" ? "active" : ""} href="#/analyses">{c.analyses}</a>
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
      ["5", "moteurs différentiels", "ANCOM-BC · ANCOM-BC2 · ALDEx2 · LinDA · corncob"],
      ["6", "familles d’ordination", "PCA · PCoA · NMDS · RDA · CCA · CAP"],
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
      ["Matrices", "Deux marqueurs racontent-ils la même histoire ?", "Mantel, Procrustes, RV, co-inertie et STATIS."]
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
      ["5", "differential engines", "ANCOM-BC · ANCOM-BC2 · ALDEx2 · LinDA · corncob"],
      ["6", "ordination families", "PCA · PCoA · NMDS · RDA · CCA · CAP"],
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
      ["Matrices", "Do two markers tell the same story?", "Mantel, Procrustes, RV, co-inertia and STATIS."]
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
        <div className="home-proof-copy"><Eyebrow>{c.proofK}</Eyebrow><h2>{c.proofT}</h2><p>{c.proofP}</p><a className="button secondary" href="#/application/multiview">{c.proofAction}<span>↗</span></a></div>
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
function AnalysesPage({ language }: { language: Language }) {
  const c = language === "fr" ? {
    k: "Capacités scientifiques",
    title: "Choisir une analyse à partir de la question biologique.",
    p: "Cette première vue regroupe les capacités réelles de BarCodeR par objectif scientifique. Les fiches détaillées des modules restent accessibles pour consulter les entrées, les paramètres, les diagnostics et les sorties.",
    groups: [
      ["Explorer les communautés", "Composition taxonomique, diversité alpha, taxons partagés, Heat Tree, phylogénie et qualité des assignations."],
      ["Tester des hypothèses", "Ordinations, PERMANOVA, dispersion multivariée, analyses différentielles et clustering."],
      ["Comparer plusieurs matrices", "Mantel, Procrustes, PROTEST, coefficient RV, co-inertie et STATIS."],
      ["Explorer les associations", "Réseaux taxons-taxons, diagnostics de robustesse et comparaisons de réseaux."]
    ],
    modules: "Accéder aux modules d’analyse"
  } : {
    k: "Scientific capabilities",
    title: "Choose an analysis from the biological question.",
    p: "This first view groups BarCodeR capabilities by scientific objective. Detailed module pages remain available for inputs, parameters, diagnostics and outputs.",
    groups: [
      ["Explore communities", "Taxonomic composition, alpha diversity, shared taxa, Heat Tree, phylogeny and assignment quality."],
      ["Test hypotheses", "Ordinations, PERMANOVA, multivariate dispersion, differential analyses and clustering."],
      ["Compare multiple matrices", "Mantel, Procrustes, PROTEST, RV coefficient, co-inertia and STATIS."],
      ["Explore associations", "Taxon networks, robustness diagnostics and network comparisons."]
    ],
    modules: "Open analysis modules"
  };
  const analysisModules = modules.filter(module => module.group === "analyse");
  return <main><section className="page-hero page-width"><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p className="lead">{c.p}</p></section><section className="section section-tint"><div className="page-width"><div className="action-grid analysis-purpose-grid">{c.groups.map(([title, text], index) => <article className="action-card reveal" key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section><section className="section page-width"><div className="section-intro"><Eyebrow>{c.modules}</Eyebrow><h2>{c.modules}</h2></div><div className="module-grid">{analysisModules.map(module => <a className="module-card" href={moduleHref(module.key)} key={module.key}><div className="module-card-top"><span>{module.order}</span><i>{module.icon}</i></div><h3>{tx(module.title, language)}</h3><p>{tx(module.purpose, language)}</p><b>{language === "fr" ? "Découvrir" : "Discover"}<span>→</span></b></a>)}</div></section></main>;
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

function EvidencePage({ language }: { language: Language }) {
  const c = language === "fr" ? {
    k: "Tutoriels & datasets tests", title: "Apprendre BarCodeR, onglet par onglet.", p: "Cette page est prête à accueillir un tutoriel guidé pour chacun des treize onglets. Chaque emplacement pourra réunir un objectif, un dataset test, les étapes à suivre et le résultat attendu.", tutorials: "Les tutoriels à construire", tutorialP: "Une trame cohérente est déjà prévue pour couvrir tout le processus analytique.", status: "Tutoriel à venir", format: "Parcours guidé · dataset test · résultat attendu", datasetsK: "Datasets tests", datasetsT: "Des jeux de données pour tester, comprendre et reproduire.", available: "Disponible", planned: "À préparer", datasets: [["GlobalPatterns", "Objet phyloseq public utilisé pour illustrer composition, ordination et diversité alpha.", "Disponible"], ["Sortie OpenMetaBar minimale", "Petit jeu de FASTQ et design associé pour rejouer le passage du pipeline vers BarCodeR.", "À préparer"], ["Projet d’analyse complet", "Objet phyloseq et métadonnées conçus pour parcourir filtration, exploration, analyses et restitution.", "À préparer"]], demo: "Aperçu du dataset GlobalPatterns", demoP: "Les trois sorties ci-dessous sont recalculables à partir du script R versionné dans le dépôt.", method: "Méthode", facts: [["26", "échantillons"], ["18 988", "taxons non nuls analysés"], ["9", "types d’environnements"]], trace: "Ressources du dataset", script: "Consulter le script R", data: "Lire la provenance"
  } : {
    k: "Tutorials & test datasets", title: "Learn BarCodeR, one tab at a time.", p: "This page is ready to host one guided tutorial for each of the thirteen tabs. Every slot can combine a goal, a test dataset, step-by-step instructions and an expected result.", tutorials: "Tutorials to build", tutorialP: "A consistent framework is already in place to cover the entire analytical process.", status: "Tutorial coming soon", format: "Guided workflow · test dataset · expected result", datasetsK: "Test datasets", datasetsT: "Datasets for testing, learning and reproducing.", available: "Available", planned: "To prepare", datasets: [["GlobalPatterns", "Public phyloseq object used to illustrate composition, ordination and alpha diversity.", "Available"], ["Minimal OpenMetaBar output", "Small FASTQ set and associated design to replay the handover from the pipeline to BarCodeR.", "To prepare"], ["Complete analysis project", "Phyloseq object and metadata designed to cover filtering, exploration, analysis and reporting.", "To prepare"]], demo: "GlobalPatterns dataset preview", demoP: "The three outputs below can be recomputed from the versioned R script in the repository.", method: "Method", facts: [["26", "samples"], ["18,988", "nonzero taxa analysed"], ["9", "environment types"]], trace: "Dataset resources", script: "View R script", data: "Read provenance"
  };
  return <main><section className="page-hero page-width tutorial-hero"><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p className="lead">{c.p}</p><div className="tutorial-summary"><div><b>{modules.length}</b><span>{language === "fr" ? "tutoriels prévus" : "planned tutorials"}</span></div><div><b>1</b><span>{language === "fr" ? "trame commune" : "shared framework"}</span></div><div><b>3</b><span>{language === "fr" ? "datasets tests planifiés" : "planned test datasets"}</span></div></div></section><section className="section section-tint"><div className="page-width"><div className="section-heading"><div><Eyebrow>{c.tutorials}</Eyebrow><h2>{c.tutorials}</h2></div><p>{c.tutorialP}</p></div><div className="tutorial-grid">{modules.map((module, index) => <article className="tutorial-card reveal" style={{ "--delay": `${(index % 4) * 45}ms` } as React.CSSProperties} key={module.key}><div className="tutorial-card-top"><span>{module.order}</span><i>{module.icon}</i></div><small>{tx(groups[module.group], language)}</small><h3>{tx(module.title, language)}</h3><p>{tx(module.purpose, language)}</p><div className="tutorial-status"><span />{c.status}</div><b>{c.format}</b></article>)}</div></div></section><section className="section page-width"><div className="section-intro"><Eyebrow>{c.datasetsK}</Eyebrow><h2>{c.datasetsT}</h2></div><div className="test-dataset-grid">{c.datasets.map(([title, text, status], index) => <article className={index === 0 ? "available" : ""} key={title}><span>{status}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="dataset-demo"><div><Eyebrow>{c.demo}</Eyebrow><h2>{c.demo}</h2><p>{c.demoP}</p></div><div className="fact-row">{c.facts.map(([n, label]) => <div key={label}><b>{n}</b><span>{label}</span></div>)}</div></div></section><section className="figure-gallery page-width">{publicFigures.map((figure, i) => <figure className="public-figure reveal" style={{ "--delay": `${i * 70}ms` } as React.CSSProperties} key={figure.file}><div><img src={asset(`figures/${figure.file}`)} alt={tx(figure.title, language)} /></div><figcaption><span>0{i + 1}</span><h2>{tx(figure.title, language)}</h2><small>{c.method}</small><p>{tx(figure.method, language)}</p></figcaption></figure>)}</section><section className="section section-tint"><div className="page-width tutorial-resources"><div><Eyebrow>{c.trace}</Eyebrow><h2>{c.trace}</h2></div><div className="evidence-links"><a className="button primary" target="_blank" rel="noreferrer" href="https://github.com/MLPosuphy/site-BarCodeR-R-shiny-application/blob/main/scripts/generate_public_data_figures.R">{c.script}<span>↗</span></a><a className="button secondary" target="_blank" rel="noreferrer" href="https://github.com/MLPosuphy/site-BarCodeR-R-shiny-application/blob/main/public/figures/data-provenance.tsv">{c.data}<span>↗</span></a></div></div></section></main>;
}

type DocumentationManifest = {
  documentation_version: string;
  generated_for_app_version: string;
  generated: string;
  languages: string[];
  modules: string[];
  sections: string[];
};

function DocumentationPage({ language }: { language: Language }) {
  const [manifest, setManifest] = useState<DocumentationManifest | null>(null);
  const documentationUrl = `${asset("documentation/index.html")}?lang=${language}&module=openmetabar&section=guide`;

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
    title: "La documentation complète, directement dans le site.",
    p: "Consultez les guides méthodologiques et les références techniques de BarCodeR sans quitter l’écosystème BarCodeR × OpenMetaBar. La documentation reste autonome, multilingue et utilisable hors connexion dans l’application.",
    modules: "modules documentés",
    sections: "niveaux de documentation",
    languages: "langues disponibles",
    version: "version documentaire",
    open: "Ouvrir en plein écran",
    appTab: "Voir l’onglet dans l’application",
    embedded: "Documentation intégrée",
    embeddedP: "La navigation, la recherche, le sommaire, le changement de langue et le thème restent disponibles dans le lecteur ci-dessous.",
    loading: "Chargement de la documentation BarCodeR",
    source: "Contenu généré pour",
    generated: "Documentation générée le"
  } : {
    k: "BarCodeR documentation",
    title: "Complete documentation, directly inside the website.",
    p: "Browse BarCodeR methodological guides and technical references without leaving the BarCodeR × OpenMetaBar ecosystem. The documentation remains standalone, multilingual and available offline inside the application.",
    modules: "documented modules",
    sections: "documentation levels",
    languages: "available languages",
    version: "documentation version",
    open: "Open full screen",
    appTab: "View the application tab",
    embedded: "Embedded documentation",
    embeddedP: "Navigation, search, table of contents, language switching and theme controls remain available in the reader below.",
    loading: "Loading BarCodeR documentation",
    source: "Content generated for",
    generated: "Documentation generated on"
  };

  const metrics = [
    [String(manifest?.modules.length ?? 9), c.modules],
    [String(manifest?.sections.length ?? 2), c.sections],
    [String(manifest?.languages.length ?? 5), c.languages],
    [manifest?.documentation_version ? `v${manifest.documentation_version}` : "v1.8.0", c.version]
  ];

  return <main className="documentation-page">
    <section className="documentation-hero page-width">
      <div className="documentation-hero-copy">
        <Eyebrow>{c.k}</Eyebrow>
        <h1>{c.title}</h1>
        <p className="lead">{c.p}</p>
        <div className="documentation-actions">
          <a className="button primary" href={documentationUrl} target="_blank" rel="noreferrer">{c.open}<span>↗</span></a>
          <a className="button secondary" href="#/application/documentation">{c.appTab}<span>→</span></a>
        </div>
      </div>
      <div className="documentation-metrics">{metrics.map(([number, label]) => <div key={label}><b>{number}</b><span>{label}</span></div>)}</div>
      {manifest && <p className="documentation-version-line"><span>{c.source} <strong>{manifest.generated_for_app_version}</strong></span><span>{c.generated} <strong>{manifest.generated}</strong></span></p>}
    </section>
    <section className="documentation-reader-section">
      <div className="page-width">
        <div className="documentation-reader-intro">
          <div><Eyebrow>{c.embedded}</Eyebrow><h2>{c.embedded}</h2></div>
          <p>{c.embeddedP}</p>
        </div>
        <div className="documentation-browser">
          <div className="documentation-browser-bar"><span /><span /><span /><b>docs.barcoder.local</b><a href={documentationUrl} target="_blank" rel="noreferrer" aria-label={c.open}>↗</a></div>
          <iframe key={`${language}-${documentationUrl}`} src={documentationUrl} title={c.loading} loading="lazy" />
        </div>
      </div>
    </section>
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

function AvailabilityPage({ language }: { language: Language }) {
  const c = language === "fr" ? { k: "Code & disponibilité", title: "Un logiciel de recherche ouvert, documenté avec prudence.", p: "Le code source de BarCodeR et celui de ce site sont consultables sur GitHub. Le site décrit l’état observé dans la version v2.12.8 et signale les éléments éditoriaux encore à finaliser.", app: "Dépôt BarCodeR", appP: "Application R/Shiny, modules d’analyse, intégration OpenMetaBar et mécanismes de projet.", site: "Dépôt du site", siteP: "Code React/Vite, figures publiques, scripts de génération et déploiement GitHub Pages.", open: "Ouvrir sur GitHub", status: "État éditorial", items: [["Version examinée", "BarCodeR v2.12.8"], ["Hébergement du site", "GitHub Pages"], ["Licence définitive", "À confirmer dans la préparation de la publication"], ["Archive versionnée et DOI", "À produire pour la version citée dans le manuscrit"], ["Infrastructure OpenMetaBar", "Cluster SSH/Slurm requis ; non fourni par ce site"]], contact: "Correspondance scientifique", contactP: "Pour citer, tester ou discuter du logiciel, utiliser le dépôt GitHub et les coordonnées institutionnelles maintenues par le projet." } : { k: "Code & availability", title: "Open research software, documented with care.", p: "BarCodeR source code and this website are available on GitHub. The website describes the state observed in version v2.12.8 and identifies editorial elements that remain to be finalized.", app: "BarCodeR repository", appP: "R/Shiny application, analysis modules, OpenMetaBar integration and project mechanisms.", site: "Website repository", siteP: "React/Vite code, public figures, generation scripts and GitHub Pages deployment.", open: "Open on GitHub", status: "Editorial status", items: [["Version reviewed", "BarCodeR v2.12.8"], ["Website hosting", "GitHub Pages"], ["Final license", "To be confirmed during publication preparation"], ["Versioned archive and DOI", "To be produced for the version cited in the manuscript"], ["OpenMetaBar infrastructure", "SSH/Slurm cluster required; not provided by this website"]], contact: "Scientific correspondence", contactP: "To cite, test or discuss the software, use the GitHub repository and institutional contact details maintained by the project." };
  return <main><section className="page-hero page-width"><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p className="lead">{c.p}</p></section><section className="repository-grid page-width"><a href="https://github.com/MLPosuphy/BarCodeR" target="_blank" rel="noreferrer"><span>R</span><small>github.com/MLPosuphy/BarCodeR</small><h2>{c.app}</h2><p>{c.appP}</p><b>{c.open} ↗</b></a><a href="https://github.com/MLPosuphy/site-BarCodeR-R-shiny-application" target="_blank" rel="noreferrer"><span>WEB</span><small>github.com/MLPosuphy/site-BarCodeR-R-shiny-application</small><h2>{c.site}</h2><p>{c.siteP}</p><b>{c.open} ↗</b></a></section><section className="section section-tint"><div className="page-width availability-status"><div><Eyebrow>{c.status}</Eyebrow><h2>{c.status}</h2></div><dl>{c.items.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}</dl></div></section><section className="contact-band page-width"><span>@</span><div><Eyebrow>{c.contact}</Eyebrow><h2>{c.contact}</h2><p>{c.contactP}</p></div></section></main>;
}

function Footer({ language }: { language: Language }) {
  return <footer><div className="page-width footer-main"><Brand language={language} /><p>{language === "fr" ? "Logiciel scientifique pour le traitement, l’exploration et l’analyse reproductible des données de métabarcoding." : "Scientific software for processing, exploring and reproducibly analysing metabarcoding data."}</p><nav><a href="#/functioning">{language === "fr" ? "Fonctionnement" : "How it works"}</a><a href="#/analyses">{language === "fr" ? "Analyses" : "Analyses"}</a><a href="#/tutorials">{language === "fr" ? "Tutoriels" : "Tutorials"}</a><a href="#/documentation">Documentation</a><a href="#/download">{language === "fr" ? "Télécharger" : "Download"}</a></nav></div><div className="footer-bottom page-width"><span>BarCodeR × OpenMetaBar · v2.12.8</span><span>Institut Sophia Agrobiotech · PHYBAC</span></div></footer>;
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
  else if (route === "/tutorials" || route === "/evidence") page = <EvidencePage language={language} />;
  else if (route === "/documentation") page = <DocumentationPage language={language} />;
  else if (route === "/reproducibility") page = <ReproducibilityPage language={language} />;
  else if (route === "/download" || route === "/availability") page = <AvailabilityPage language={language} />;
  else page = <Landing language={language} />;

  return <div className={activeModule?.key === "openmetabar" ? "site-shell openmetabar-route" : "site-shell"}><Header language={language} setLanguage={setLanguage} route={route} />{page}<Footer language={language} /></div>;
}
