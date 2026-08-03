import { useEffect, useState } from "react";

type Language = "fr" | "en";
type Localized = { fr: string; en: string };

const tr = (value: Localized, language: Language) => value[language];
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const moduleGroups = [
  {
    key: "prepare",
    eyebrow: { fr: "01 · Préparer", en: "01 · Prepare" },
    title: { fr: "Un projet propre avant toute statistique", en: "A clean project before any statistics" },
    text: {
      fr: "Importer un objet phyloseq ou les tables qui le composent, contrôler leur cohérence, éditer les métadonnées et produire des jeux dérivés sans écraser l’original.",
      en: "Import a phyloseq object or its component tables, check their consistency, edit metadata and create derived datasets without overwriting the original.",
    },
    bullets: {
      fr: ["Import phyloseq et tables séparées", "Édition OTU, taxonomie et métadonnées", "Filtration taxonomique, ASV, échantillons et séquences", "Registre de jeux de données par projet"],
      en: ["phyloseq and component-table import", "OTU, taxonomy and metadata edition", "Taxonomic, ASV, sample and sequence filtering", "Project-level dataset registry"],
    },
    code: "modules/data · datasets · dataedition · filtration",
    image: "app-previews/qualite_assignation_taxonomique.png",
  },
  {
    key: "explore",
    eyebrow: { fr: "02 · Explorer", en: "02 · Explore" },
    title: { fr: "Lire la structure biologique des données", en: "Read the biological structure of the data" },
    text: {
      fr: "Composer des barplots, comparer la diversité alpha, explorer les intersections, la taxonomie et les arbres — avec paramètres visibles et historiques sauvegardés.",
      en: "Build barplots, compare alpha diversity, explore intersections, taxonomy and trees—with visible parameters and saved histories.",
    },
    bullets: {
      fr: ["Barplots taxonomiques configurables", "Diversité alpha et statistiques associées", "Venn / UpSet, Heat Tree et arbre phylogénétique", "Qualité d’assignation taxonomique"],
      en: ["Configurable taxonomic barplots", "Alpha diversity and associated statistics", "Venn / UpSet, Heat Tree and phylogenetic tree", "Taxonomic-assignment quality"],
    },
    code: "modules/exploration/*",
    image: "app-previews/barplot.png",
  },
  {
    key: "test",
    eyebrow: { fr: "03 · Analyser", en: "03 · Analyse" },
    title: { fr: "Tester les hypothèses, pas seulement produire des graphiques", en: "Test hypotheses, not only generate plots" },
    text: {
      fr: "Les modules d’analyse réunissent ordinations, PERMANOVA et dispersion, ANCOM-BC, clustering, comparaison de matrices et réseaux d’association exploratoires.",
      en: "Analysis modules bring together ordinations, PERMANOVA and dispersion, ANCOM-BC, clustering, matrix comparison and exploratory association networks.",
    },
    bullets: {
      fr: ["Ordinations et diagnostics", "PERMANOVA / dispersion", "Abondance différentielle ANCOM-BC", "Clustering, matrices et réseaux"],
      en: ["Ordinations and diagnostics", "PERMANOVA / dispersion", "ANCOM-BC differential abundance", "Clustering, matrices and networks"],
    },
    code: "modules/analyse/*",
    image: "app-previews/ordinations.png",
  },
  {
    key: "compose",
    eyebrow: { fr: "04 · Restituer", en: "04 · Report" },
    title: { fr: "Transformer les analyses en résultats traçables", en: "Turn analyses into traceable results" },
    text: {
      fr: "MultiView retrouve les figures du projet, les organise en compositions et exporte un rendu composite. Les historiques conservent paramètres, provenance et, pour 14 familles de sorties, un script R reproductible.",
      en: "MultiView retrieves project figures, arranges them into compositions and exports a composite. Histories preserve parameters, provenance and, for 14 output families, reproducible R code.",
    },
    bullets: {
      fr: ["Bibliothèque de figures par projet", "Grilles et compositions sauvegardées", "Export PNG composite", "Code R et provenance rattachés aux historiques"],
      en: ["Project-level figure library", "Saved grids and compositions", "Composite PNG export", "R code and provenance attached to histories"],
    },
    code: "modules/multiview · _shared/_provenance.R",
    image: "app-previews/comparaison_matrices.png",
  },
] as const;

const gallery = [
  { image: "barplot.png", title: { fr: "Composition taxonomique", en: "Taxonomic composition" }, group: "Exploration" },
  { image: "alpha_diversite.png", title: { fr: "Diversité alpha", en: "Alpha diversity" }, group: "Exploration" },
  { image: "heat_tree.png", title: { fr: "Heat Tree", en: "Heat Tree" }, group: "Exploration" },
  { image: "ordinations.png", title: { fr: "Ordinations", en: "Ordinations" }, group: "Analyse" },
  { image: "analyses_differentielles.png", title: { fr: "Abondance différentielle", en: "Differential abundance" }, group: "Analyse" },
  { image: "permanova_dispersion.png", title: { fr: "PERMANOVA / dispersion", en: "PERMANOVA / dispersion" }, group: "Analyse" },
] as const;

const publicFigures = [
  {
    image: "globalpatterns-composition.png",
    title: { fr: "Composition taxonomique", en: "Taxonomic composition" },
    method: { fr: "Abondances relatives · agglomération au phylum · moyenne par environnement", en: "Relative abundance · phylum agglomeration · mean by environment" },
  },
  {
    image: "globalpatterns-ordination.png",
    title: { fr: "Structure inter-échantillons", en: "Between-sample structure" },
    method: { fr: "Bray–Curtis sur abondances relatives · PCoA", en: "Bray–Curtis on relative abundances · PCoA" },
  },
  {
    image: "globalpatterns-alpha-diversity.png",
    title: { fr: "Diversité intra-échantillon", en: "Within-sample diversity" },
    method: { fr: "Richesse observée et Shannon sur comptes bruts", en: "Observed richness and Shannon on raw counts" },
  },
] as const;

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand ${compact ? "brand--compact" : ""}`} href="#top" aria-label="BarCodeR + OpenMetaBar">
      <img src={asset("app-previews/barcoder-logo.png")} alt="" />
      <span><b>BarCodeR</b><i>+</i><b>OpenMetaBar</b></span>
    </a>
  );
}

function AppPreview({ language }: { language: Language }) {
  const steps = language === "fr"
    ? ["Données", "Description", "Édition", "Filtration", "Exploration", "Analyse"]
    : ["Input", "Description", "Edition", "Filtering", "Exploration", "Analysis"];

  return (
    <div className="app-window" aria-label={language === "fr" ? "Aperçu du tableau de bord BarCodeR" : "BarCodeR dashboard preview"}>
      <div className="window-top"><span /><span /><span /><b>BarCodeR · GlobalPatterns</b><em>FR⌄</em></div>
      <div className="window-body">
        <aside className="mini-sidebar">
          <div className="mini-mark">B|R</div>
          {["⌂", "◫", "▦", "✎", "⌁", "◉", "⌬", "▤"].map((icon, index) => <span className={index === 0 ? "active" : ""} key={`${icon}-${index}`}>{icon}</span>)}
        </aside>
        <div className="mini-main">
          <div className="project-line"><span>{language === "fr" ? "PROJET ACTIF" : "ACTIVE PROJECT"}</span><b>Public demo · GlobalPatterns</b><i>● {language === "fr" ? "enregistré" : "saved"}</i></div>
          <div className="dataset-panel">
            <div><small>{language === "fr" ? "JEU ACTIF" : "ACTIVE DATASET"}</small><strong>GlobalPatterns</strong><p>phyloseq · public dataset</p></div>
            <div className="mini-stats"><span><b>26</b><small>{language === "fr" ? "échantillons" : "samples"}</small></span><span><b>19 216</b><small>taxa</small></span><span><b>9</b><small>{language === "fr" ? "milieux" : "environments"}</small></span></div>
          </div>
          <div className="journey-title"><b>{language === "fr" ? "Parcours d’analyse" : "Analysis journey"}</b><span>4 / 6</span></div>
          <div className="journey-grid">{steps.map((step, index) => <div className={index < 4 ? "done" : ""} key={step}><span>{index < 4 ? "✓" : index + 1}</span><b>{step}</b></div>)}</div>
          <div className="recent-row"><div><small>{language === "fr" ? "FIGURES RÉCENTES" : "RECENT FIGURES"}</small><b>{language === "fr" ? "Reprendre là où vous étiez" : "Resume where you left off"}</b></div><img src={asset("app-previews/ordinations.png")} alt="" /><img src={asset("app-previews/alpha_diversite.png")} alt="" /></div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>(() => navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en");
  const [activeModule, setActiveModule] = useState("prepare");
  const [activeGallery, setActiveGallery] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const currentModule = moduleGroups.find((item) => item.key === activeModule) ?? moduleGroups[0];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "fr"
      ? "BarCodeR + OpenMetaBar | Analyse reproductible du métabarcoding"
      : "BarCodeR + OpenMetaBar | Reproducible metabarcoding analysis";
  }, [language]);

  const c = language === "fr" ? {
    nav: [["Parcours", "#workflow"], ["Dans l’application", "#inside"], ["Données publiques", "#evidence"], ["Open source", "#availability"]],
    badge: "Logiciel scientifique · R/Shiny + Nextflow",
    heroTitle: <>Du <em>read</em> à la figure,<br />un parcours scientifique continu.</>,
    heroText: "OpenMetaBar automatise le traitement des séquences. BarCodeR transforme les objets phyloseq en un espace de travail interactif, organisé par projet et conçu pour garder les choix analytiques visibles.",
    primary: "Explorer le parcours",
    secondary: "Voir le code",
    version: "Version observée dans le code : v2.12.8",
    facts: [["5", "langues intégrées"], ["30", "thèmes d’interface"], ["14", "familles de sorties avec code R"], ["2", "composants indépendants et connectés"]],
    workflowKicker: "Une chaîne cohérente",
    workflowTitle: "Deux outils, une même histoire analytique.",
    workflowText: "Le code de l’application ne présente pas BarCodeR comme un simple catalogue de graphiques : il organise le passage entre calcul amont, objet scientifique, décisions en aval et restitution.",
    insideKicker: "Dans BarCodeR",
    insideTitle: "Une interface guidée, sans masquer les méthodes.",
    insideText: "Ces fonctionnalités et intitulés proviennent directement des modules de l’application. Sélectionnez une étape pour découvrir le parcours réel.",
    inspectCode: "Inspecter le module source",
    galleryKicker: "Sorties disponibles",
    galleryTitle: "Voir ce que l’application sait réellement produire.",
    galleryNote: "Aperçus présents dans le dépôt de l’application. Ils illustrent les interfaces et familles de sorties ; les preuves scientifiques fondées sur données publiques sont présentées ensuite.",
    previous: "Précédent",
    next: "Suivant",
    evidenceKicker: "Démonstration reproductible",
    evidenceTitle: "L’attractivité ne remplace pas la preuve.",
    evidenceText: "Cette section est calculée par un script R versionné à partir de phyloseq::GlobalPatterns, issu de l’étude publique de Caporaso et al. (2011). L’objet synthétique fourni pour tester BarCodeR n’est pas utilisé ici.",
    sourceData: "Données et méthode",
    script: "Script de génération",
    sourceObject: "objet source",
    nonzero: "taxons non nuls analysés",
    environments: "types d’environnements",
    samples: "échantillons",
    provenanceTitle: "La traçabilité est une fonctionnalité de l’application.",
    provenanceText: "Le code actuel rattache les objets dérivés à leur projet, enregistre les historiques de figures, restaure l’état de navigation et injecte la provenance du chemin FASTQ → phyloseq → figure dans les scripts reproductibles.",
    provenanceItems: [["Objets dérivés", "L’original reste disponible pendant que filtration et édition créent des jeux identifiés."], ["Historique", "Figures, paramètres et versions restent associés au projet."], ["Code R", "Le dispatcher couvre 14 familles de sorties d’Exploration et d’Analyse."], ["MultiView", "La bibliothèque rassemble, compare et compose les figures sauvegardées."]],
    availabilityKicker: "Disponibilité",
    availabilityTitle: "Un logiciel de recherche ouvert, encore en préparation éditoriale.",
    availabilityText: "Le code source est public. La licence définitive, une version numérotée archivée et son DOI restent à finaliser avant la soumission du manuscrit.",
    appSource: "Code de BarCodeR",
    websiteSource: "Code de ce site",
    correspondence: "Correspondance",
    limitations: "Périmètre et limites",
    limitationText: "L’exécution OpenMetaBar nécessite une infrastructure distante configurée. Les résultats dépendent de la qualité des données, des bases taxonomiques et des paramètres. Les analyses différentielles, multivariées et de réseaux demandent une interprétation experte.",
    footer: "Logiciel de recherche développé à l’Institut Sophia Agrobiotech et PHYBAC.",
  } : {
    nav: [["Workflow", "#workflow"], ["Inside the app", "#inside"], ["Public data", "#evidence"], ["Open source", "#availability"]],
    badge: "Scientific software · R/Shiny + Nextflow",
    heroTitle: <>From <em>reads</em> to figures,<br />one continuous scientific workflow.</>,
    heroText: "OpenMetaBar automates sequence processing. BarCodeR turns phyloseq objects into an interactive, project-based workspace designed to keep analytical choices visible.",
    primary: "Explore the workflow",
    secondary: "View source",
    version: "Version observed in source: v2.12.8",
    facts: [["5", "integrated languages"], ["30", "interface themes"], ["14", "output families with R code"], ["2", "independent, connected components"]],
    workflowKicker: "A coherent chain",
    workflowTitle: "Two tools, one analytical history.",
    workflowText: "The application code does not present BarCodeR as a simple plot catalogue: it structures the path from upstream computing to scientific object, downstream decisions and reporting.",
    insideKicker: "Inside BarCodeR",
    insideTitle: "A guided interface that keeps methods visible.",
    insideText: "These features and labels come directly from application modules. Select a step to explore the actual workflow.",
    inspectCode: "Inspect the source module",
    galleryKicker: "Available outputs",
    galleryTitle: "See what the application can actually produce.",
    galleryNote: "Previews stored in the application repository. They illustrate interfaces and output families; evidence based on public scientific data follows below.",
    previous: "Previous",
    next: "Next",
    evidenceKicker: "Reproducible demonstration",
    evidenceTitle: "Visual appeal does not replace evidence.",
    evidenceText: "This section is computed by a versioned R script from phyloseq::GlobalPatterns, derived from the public study by Caporaso et al. (2011). The synthetic object supplied to test BarCodeR is not used here.",
    sourceData: "Data and method",
    script: "Figure-generation script",
    sourceObject: "source object",
    nonzero: "nonzero taxa analysed",
    environments: "environment types",
    samples: "samples",
    provenanceTitle: "Traceability is an application feature.",
    provenanceText: "Current code links derived objects to their project, records figure histories, restores navigation state and injects FASTQ → phyloseq → figure provenance into reproducible scripts.",
    provenanceItems: [["Derived objects", "The original remains available while filtering and edition create identified datasets."], ["History", "Figures, parameters and versions remain associated with the project."], ["R code", "The dispatcher covers 14 output families across Exploration and Analysis."], ["MultiView", "The library collects, compares and composes saved figures."]],
    availabilityKicker: "Availability",
    availabilityTitle: "Open research software, still in editorial preparation.",
    availabilityText: "Source code is public. A final license, archived versioned release and DOI remain to be completed before manuscript submission.",
    appSource: "BarCodeR source",
    websiteSource: "Website source",
    correspondence: "Correspondence",
    limitations: "Scope and limitations",
    limitationText: "OpenMetaBar execution requires a configured remote infrastructure. Results depend on data quality, taxonomic databases and parameters. Differential, multivariate and network analyses require expert interpretation.",
    footer: "Research software developed at Institut Sophia Agrobiotech and PHYBAC.",
  };

  const moveGallery = (direction: number) => setActiveGallery((activeGallery + direction + gallery.length) % gallery.length);

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <Logo compact />
        <button className="menu-button" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        <nav className={menuOpen ? "open" : ""}>
          {c.nav.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <div className="language-switch" aria-label="Language"><button className={language === "fr" ? "active" : ""} onClick={() => setLanguage("fr")}>FR</button><button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button></div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-glow" />
          <div className="hero-copy">
            <p className="eyebrow"><span />{c.badge}</p>
            <h1>{c.heroTitle}</h1>
            <p className="hero-text">{c.heroText}</p>
            <div className="hero-actions"><a className="button button--primary" href="#workflow">{c.primary}<span>↓</span></a><a className="button button--ghost" href="https://github.com/MLPosuphy/BarCodeR">{c.secondary}<span>↗</span></a></div>
            <div className="tech-line"><span>R / Shiny</span><span>phyloseq</span><span>Nextflow DSL2</span></div>
            <small className="version-note">{c.version}</small>
          </div>
          <div className="hero-visual"><AppPreview language={language} /><div className="floating-card floating-card--one"><span>✓</span><div><b>{language === "fr" ? "Provenance attachée" : "Provenance attached"}</b><small>FASTQ → phyloseq → figure</small></div></div><div className="floating-card floating-card--two"><span>R</span><div><b>{language === "fr" ? "Code reproductible" : "Reproducible code"}</b><small>14 output families</small></div></div></div>
        </section>

        <section className="facts" aria-label="Code-derived facts">{c.facts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</section>

        <section className="section workflow" id="workflow">
          <div className="section-heading"><p className="eyebrow"><span />{c.workflowKicker}</p><h2>{c.workflowTitle}</h2><p>{c.workflowText}</p></div>
          <div className="workflow-track">
            <article><span className="step-icon">01</span><small>INPUT</small><h3>FASTQ + design file</h3><p>{language === "fr" ? "Échantillons, marqueurs, amorces et métadonnées structurés avant calcul." : "Samples, markers, primers and metadata structured before computation."}</p></article>
            <i>→</i>
            <article className="workflow-accent"><span className="step-icon">02</span><small>OPENMETABAR</small><h3>Nextflow DSL2</h3><p>{language === "fr" ? "Configuration, lancement distant, suivi SLURM et récupération des résultats." : "Configuration, remote launch, SLURM monitoring and result retrieval."}</p></article>
            <i>→</i>
            <article><span className="step-icon">03</span><small>INTEROPERABILITY</small><h3>phyloseq</h3><p>{language === "fr" ? "Abondances, taxonomie, métadonnées, séquences et arbre dans un objet standard." : "Abundance, taxonomy, metadata, sequences and tree in a standard object."}</p></article>
            <i>→</i>
            <article className="workflow-accent-alt"><span className="step-icon">04</span><small>BARCODER</small><h3>R / Shiny</h3><p>{language === "fr" ? "Curation, exploration, tests, historiques, compositions et exports." : "Curation, exploration, tests, histories, compositions and exports."}</p></article>
          </div>
          <p className="source-strip"><span>{language === "fr" ? "Vérifié dans" : "Verified in"}</span><a href="https://github.com/MLPosuphy/BarCodeR/blob/main/BarCodeR_app/app.R">app.R ↗</a><a href="https://github.com/MLPosuphy/BarCodeR/tree/main/BarCodeR_app/modules/openmetabar">modules/openmetabar ↗</a><a href="https://github.com/MLPosuphy/BarCodeR/blob/main/BarCodeR_app/modules/_shared/_provenance.R">_provenance.R ↗</a></p>
        </section>

        <section className="section inside" id="inside">
          <div className="section-heading section-heading--split"><div><p className="eyebrow"><span />{c.insideKicker}</p><h2>{c.insideTitle}</h2></div><p>{c.insideText}</p></div>
          <div className="module-explorer">
            <div className="module-tabs" role="tablist">{moduleGroups.map((item) => <button role="tab" aria-selected={activeModule === item.key} className={activeModule === item.key ? "active" : ""} onClick={() => setActiveModule(item.key)} key={item.key}><small>{tr(item.eyebrow, language)}</small><b>{tr(item.title, language)}</b><span>→</span></button>)}</div>
            <div className="module-detail" role="tabpanel">
              <div className="module-copy"><p className="eyebrow"><span />{tr(currentModule.eyebrow, language)}</p><h3>{tr(currentModule.title, language)}</h3><p>{tr(currentModule.text, language)}</p><ul>{currentModule.bullets[language].map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul><a href={`https://github.com/MLPosuphy/BarCodeR/tree/main/BarCodeR_app/${currentModule.code.split(" · ")[0].replace("/*", "")}`}>{c.inspectCode} <span>↗</span></a><code>{currentModule.code}</code></div>
              <div className="module-image"><img src={asset(currentModule.image)} alt={tr(currentModule.title, language)} /><span>{language === "fr" ? "Aperçu issu de l’application" : "Preview from the application"}</span></div>
            </div>
          </div>
        </section>

        <section className="gallery-section">
          <div className="gallery-head"><div><p className="eyebrow"><span />{c.galleryKicker}</p><h2>{c.galleryTitle}</h2></div><div className="gallery-controls"><button onClick={() => moveGallery(-1)} aria-label={c.previous}>←</button><span>{String(activeGallery + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span><button onClick={() => moveGallery(1)} aria-label={c.next}>→</button></div></div>
          <div className="gallery-stage">
            <div className="gallery-main"><img src={asset(`app-previews/${gallery[activeGallery].image}`)} alt={tr(gallery[activeGallery].title, language)} /></div>
            <div className="gallery-caption"><span>{gallery[activeGallery].group}</span><h3>{tr(gallery[activeGallery].title, language)}</h3><p>{c.galleryNote}</p><div className="gallery-dots">{gallery.map((item, index) => <button aria-label={tr(item.title, language)} className={index === activeGallery ? "active" : ""} onClick={() => setActiveGallery(index)} key={item.image} />)}</div></div>
          </div>
        </section>

        <section className="section evidence" id="evidence">
          <div className="section-heading section-heading--split"><div><p className="eyebrow"><span />{c.evidenceKicker}</p><h2>{c.evidenceTitle}</h2></div><div><p>{c.evidenceText}</p><div className="inline-links"><a href="https://doi.org/10.1073/pnas.1000080107">{c.sourceData} ↗</a><a href="https://github.com/MLPosuphy/site-BarCodeR-R-shiny-application/blob/main/scripts/generate_public_data_figures.R">{c.script} ↗</a></div></div></div>
          <div className="evidence-stats"><div><strong>26</strong><span>{c.samples}</span></div><div><strong>19 216</strong><span>taxa · {c.sourceObject}</span></div><div><strong>18 988</strong><span>{c.nonzero}</span></div><div><strong>9</strong><span>{c.environments}</span></div></div>
          <div className="evidence-grid">{publicFigures.map((figure, index) => <figure key={figure.image}><div className="figure-image"><img src={asset(`figures/${figure.image}`)} alt={tr(figure.title, language)} /></div><figcaption><span>0{index + 1}</span><div><h3>{tr(figure.title, language)}</h3><p>{tr(figure.method, language)}</p></div></figcaption></figure>)}</div>
          <p className="evidence-note"><b>GlobalPatterns</b> · Caporaso et al. 2011 · <a href="https://doi.org/10.1073/pnas.1000080107">doi:10.1073/pnas.1000080107 ↗</a> · {language === "fr" ? "aucun test inférentiel ajouté aux figures descriptives" : "no inferential test added to descriptive figures"}</p>
        </section>

        <section className="provenance-section">
          <div className="provenance-copy"><p className="eyebrow"><span />PROVENANCE</p><h2>{c.provenanceTitle}</h2><p>{c.provenanceText}</p><a className="button button--light" href="https://github.com/MLPosuphy/BarCodeR/blob/main/BarCodeR_app/modules/exploration/barplot/fct_barplot_repro_code.R">{c.inspectCode}<span>↗</span></a></div>
          <div className="provenance-list">{c.provenanceItems.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </section>

        <section className="section availability" id="availability">
          <div className="availability-main"><p className="eyebrow"><span />{c.availabilityKicker}</p><h2>{c.availabilityTitle}</h2><p>{c.availabilityText}</p><div className="availability-links"><a className="resource-card" href="https://github.com/MLPosuphy/BarCodeR"><small>01 · GITHUB</small><b>{c.appSource}</b><span>R / Shiny · OpenMetaBar · modules ↗</span></a><a className="resource-card" href="https://github.com/MLPosuphy/site-BarCodeR-R-shiny-application"><small>02 · GITHUB PAGES</small><b>{c.websiteSource}</b><span>React · figures publiques · déploiement ↗</span></a><a className="resource-card" href="mailto:corinne.rancurel@inrae.fr"><small>03 · EMAIL</small><b>{c.correspondence}</b><span>corinne.rancurel@inrae.fr ↗</span></a></div></div>
          <aside className="availability-aside"><details open><summary>{c.limitations}<span>+</span></summary><p>{c.limitationText}</p></details><details><summary>{language === "fr" ? "Références principales" : "Core references"}<span>+</span></summary><ol><li>Caporaso et al. (2011), PNAS. doi:10.1073/pnas.1000080107</li><li>McMurdie & Holmes (2013), PLOS ONE. doi:10.1371/journal.pone.0061217</li><li>Di Tommaso et al. (2017), Nature Biotechnology. doi:10.1038/nbt.3820</li></ol></details><details><summary>{language === "fr" ? "Avant publication" : "Before publication"}<span>+</span></summary><p>{language === "fr" ? "Déclarer la licence, créer une release versionnée, l’archiver et ajouter son DOI ainsi que les environnements testés." : "Declare the license, create and archive a versioned release, then add its DOI and tested environments."}</p></details></aside>
        </section>
      </main>

      <footer><Logo compact /><p>{c.footer}<br />M. Léger-Pigout · S. Marguerit · S. Warot · I.-M. Viciriuc · N. Ris · E. G. J. Danchin · C. Rancurel</p><div><a href="https://github.com/MLPosuphy/BarCodeR">GitHub ↗</a><a href="#top">↑ Top</a></div></footer>
    </div>
  );
}

export default App;
