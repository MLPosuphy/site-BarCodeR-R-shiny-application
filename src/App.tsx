import { useEffect, useMemo, useState } from "react";
import { groups, modules, type AppModule, type Language, type Localized } from "./content";

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

function Brand() {
  return (
    <a className="brand" href="#/" aria-label="BarCodeR et OpenMetaBar — accueil du site">
      <img className="brand-barcoder" src={asset("app-previews/barcoder-logo.png")} alt="" />
      <span className="brand-wordmark"><strong>BarCodeR</strong><i>×</i><strong>OpenMetaBar</strong></span>
      <img className="brand-openmetabar" src={asset("app-previews/openmetabar-logo.png")} alt="" />
    </a>
  );
}

function Header({ language, setLanguage, route }: { language: Language; setLanguage: (language: Language) => void; route: string }) {
  const [open, setOpen] = useState(false);
  const c = language === "fr" ? {
    overview: "Vue d’ensemble", application: "Processus analytique", evidence: "Tutoriels & datasets tests", reproducibility: "Reproductibilité", code: "Code & disponibilité"
  } : {
    overview: "Overview", application: "Analytical process", evidence: "Tutorials & test datasets", reproducibility: "Reproducibility", code: "Code & availability"
  };

  useEffect(() => setOpen(false), [route]);

  return (
    <header className="site-header">
      <Brand />
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={language === "fr" ? "Ouvrir le menu" : "Open menu"}>
        <span /><span />
      </button>
      <nav className={open ? "primary-nav open" : "primary-nav"} aria-label="Navigation principale">
        <a className={route === "/" ? "active" : ""} href="#/">{c.overview}</a>
        <a className={route.startsWith("/application") ? "active" : ""} href="#/application">{c.application}</a>
        <a className={route === "/reproducibility" ? "active" : ""} href="#/reproducibility">{c.reproducibility}</a>
        <a className={route === "/evidence" ? "active" : ""} href="#/evidence">{c.evidence}</a>
        <a className={route === "/availability" ? "active" : ""} href="#/availability">{c.code}</a>
        <div className="language-switch" aria-label={language === "fr" ? "Langue" : "Language"}>
          <button className={language === "fr" ? "active" : ""} onClick={() => setLanguage("fr")}>FR</button>
          <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
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
    badge: "Métabarcoding intégré · du calcul HPC à l’analyse interactive",
    title: <>Du read à la figure,<br /><em>sans perdre le fil scientifique.</em></>,
    intro: "OpenMetaBar orchestre le traitement reproductible des séquences sur cluster HPC. Les objets phyloseq générés sont ensuite récupérés dans BarCodeR pour contrôler, explorer et analyser les résultats au sein d’une interface guidée, tout en conservant la traçabilité des choix et des calculs.",
    explore: "Découvrir le processus analytique", proof: "Voir les tutoriels et datasets tests", version: "Versions actuelles : BarCodeR v2.12.8 / OpenMetaBar v1.0.0",
    numbers: [["13", "onglets documentés"], ["12", "modules d’exploration et d’analyse"], ["14", "familles de sorties avec code R"], ["5", "langues dans l’application"]],
    workflowK: "Le parcours analytique de vos données", workflowT: "Deux outils en symbiose pour servir un objectif commun.", workflowP: "Depuis BarCodeR, vous pouvez lancer vos analyses de métabarcoding sur votre propre cluster de calcul avec OpenMetaBar, récupérer les objets phyloseq générés, puis explorer et analyser les résultats au sein de la même application, sans avoir à écrire une seule ligne de code.",
    workflowNote: "Les deux outils restent également disponibles indépendamment : BarCodeR peut analyser des objets phyloseq déjà constitués, tandis qu’OpenMetaBar peut être exécuté directement sur un cluster de calcul à partir de fichiers FASTQ.",
    modulesK: "Dans l’application", modulesT: "Chaque onglet de l’application correspond à une étape du flux analytique de vos données.", modulesP: "Les pages ci-dessous décrivent les entrées, les opérations, les sorties et les points de vigilance observés directement dans le code.",
    audienceK: "Publics visés", audienceT: "Une même application pour relier expertise biologique et analyse bioinformatique.", audienceP: "BarCodeR × OpenMetaBar s’adresse aux personnes qui produisent, accompagnent ou interprètent des données de métabarcoding, qu’elles programment quotidiennement ou non.",
    audienceExeT: "Une application Windows prête à lancer",
    audienceExeP: "La distribution autonome au format .exe réduit la barrière d’installation : l’utilisateur accède à l’interface BarCodeR sans devoir préparer lui-même un environnement R. Le traitement des reads avec OpenMetaBar reste confié à un cluster HPC configuré ; un objet phyloseq existant peut aussi être analysé directement.",
    audienceCards: [["Biologistes & écologues", "Explorer leurs données, tester des hypothèses et produire des figures sans écrire de code pour les analyses courantes."], ["Bioinformaticiens & plateformes", "Standardiser le passage des FASTQ aux objets phyloseq, conserver les paramètres et transmettre des résultats prêts à interpréter."], ["Équipes de recherche", "Partager un cadre commun entre profils techniques et thématiques, documenter les choix et faciliter la reprise d’un projet."]],
    citationK: "Science ouverte · communauté", citationT: "Merci de faire vivre l’écosystème BarCodeR × OpenMetaBar.", citationP: "Si BarCodeR ou OpenMetaBar contribue à vos analyses, à vos résultats ou à vos publications, merci de citer les outils concernés. Chaque citation soutient leur visibilité, leur maintenance et leur développement au service de la communauté scientifique."
  } : {
    badge: "Integrated metabarcoding · from HPC computing to interactive analysis",
    title: <>From reads to figures,<br /><em>without losing the scientific thread.</em></>,
    intro: "OpenMetaBar orchestrates reproducible sequence processing on an HPC cluster. The resulting phyloseq objects are then retrieved in BarCodeR to check, explore and analyse results through a guided interface while preserving the traceability of choices and computations.",
    explore: "Explore the analytical process", proof: "View tutorials and test datasets", version: "Current versions: BarCodeR v2.12.8 / OpenMetaBar v1.0.0",
    numbers: [["13", "documented tabs"], ["12", "exploration and analysis modules"], ["14", "output families with R code"], ["5", "languages in the application"]],
    workflowK: "The analytical journey of your data", workflowT: "Two tools working in symbiosis towards one common goal.", workflowP: "From BarCodeR, you can launch metabarcoding analyses on your own computing cluster with OpenMetaBar, retrieve the generated phyloseq objects, then explore and analyse the results within the same application without writing a single line of code.",
    workflowNote: "Both tools also remain available independently: BarCodeR can analyse previously created phyloseq objects, while OpenMetaBar can run directly on a computing cluster from FASTQ files.",
    modulesK: "Inside the application", modulesT: "Each application tab represents a step in the analytical workflow of your data.", modulesP: "The pages below describe inputs, operations, outputs and cautions observed directly in the code.",
    audienceK: "Intended users", audienceT: "One application connecting biological expertise and bioinformatics analysis.", audienceP: "BarCodeR × OpenMetaBar is designed for people who produce, support or interpret metabarcoding data, whether or not they program every day.",
    audienceExeT: "A ready-to-launch Windows application",
    audienceExeP: "The standalone .exe distribution lowers the installation barrier: users can access the BarCodeR interface without preparing an R environment themselves. Read processing with OpenMetaBar still relies on a configured HPC cluster; existing phyloseq objects can also be analysed directly.",
    audienceCards: [["Biologists & ecologists", "Explore data, test hypotheses and produce figures without writing code for routine analyses."], ["Bioinformaticians & core facilities", "Standardise the path from FASTQ files to phyloseq objects, retain parameters and deliver results ready for interpretation."], ["Research teams", "Share a common framework across technical and domain profiles, document choices and make projects easier to resume."]],
    citationK: "Open science · community", citationT: "Thank you for supporting the BarCodeR × OpenMetaBar ecosystem.", citationP: "If BarCodeR or OpenMetaBar contributes to your analyses, results or publications, please cite the tools you use. Each citation supports their visibility, maintenance and continued development for the scientific community."
  };

  return <main>
    <section className="hero page-width">
      <div className="hero-copy reveal"><Eyebrow>{c.badge}</Eyebrow><h1>{c.title}</h1><p className="lead">{c.intro}</p><div className="hero-actions"><a className="button primary" href="#/application">{c.explore}<span>→</span></a><a className="button secondary" href="#/evidence">{c.proof}<span>↘</span></a></div><p className="version-line"><span />{c.version}</p></div>
      <div className="hero-media reveal delay-1"><div className="ambient-ring" /><HomeApplicationVisual language={language} /><div className="signal-card signal-one"><span>R</span><div><b>{language === "fr" ? "Application R/Shiny" : "R/Shiny application"}</b><small>{language === "fr" ? "Analyse interactive" : "Interactive analysis"}</small></div></div><div className="signal-card signal-two"><span>HPC</span><div><b>{language === "fr" ? "Calcul sur cluster HPC" : "HPC cluster computing"}</b><small>OpenMetaBar · Nextflow</small></div></div><div className="signal-card signal-three"><span>✓</span><div><b>{language === "fr" ? "Traçabilité complète" : "Complete traceability"}</b><small>{language === "fr" ? "Du run à la figure" : "From run to figure"}</small></div></div></div>
    </section>
    <section className="numbers-band"><div className="page-width numbers-grid">{c.numbers.map(([number, label]) => <div key={label}><b>{number}</b><span>{label}</span></div>)}</div></section>
    <section className="section page-width reveal"><div className="section-intro"><Eyebrow>{c.workflowK}</Eyebrow><h2>{c.workflowT}</h2><p>{c.workflowP}</p></div><Workflow language={language} /><p className="workflow-independence"><span>↗</span>{c.workflowNote}</p></section>
    <section className="section section-tint"><div className="page-width"><div className="section-intro reveal"><Eyebrow>{c.modulesK}</Eyebrow><h2>{c.modulesT}</h2><p>{c.modulesP}</p></div><ModuleGrid language={language} limit={13} /></div></section>
    <section className="section audience-section"><div className="page-width audience-frame reveal"><div className="audience-intro"><Eyebrow>{c.audienceK}</Eyebrow><h2>{c.audienceT}</h2><p>{c.audienceP}</p></div><div className="audience-executable"><span>.exe</span><div><h3>{c.audienceExeT}</h3><p>{c.audienceExeP}</p></div></div><div className="audience-grid">{c.audienceCards.map(([title, text], index) => <article style={{ "--delay": `${index * 55}ms` } as React.CSSProperties} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="citation-band"><div className="page-width citation-band-inner reveal"><span className="citation-symbol">×</span><div><Eyebrow>{c.citationK}</Eyebrow><h2>{c.citationT}</h2><p>{c.citationP}</p></div></div></section>
  </main>;
}

function ModuleGrid({ language, limit }: { language: Language; limit?: number }) {
  return <div className="module-grid">{modules.slice(0, limit).map((module, index) => <a href={moduleHref(module.key)} className="module-card reveal" style={{ "--delay": `${(index % 4) * 45}ms` } as React.CSSProperties} key={module.key}><div className="module-card-top"><span>{module.order}</span><i>{module.icon}</i></div><small>{tx(groups[module.group], language)}</small><h3>{tx(module.title, language)}</h3><p>{tx(module.purpose, language)}</p><b>{language === "fr" ? "Ouvrir la page" : "Open page"}<span>↗</span></b></a>)}</div>;
}

function ApplicationIndex({ language }: { language: Language }) {
  const c = language === "fr" ? { k: "Processus analytique au sein de l’application", title: "Tous les onglets, organisés selon le cheminement de vos données.", p: "Cette vue montre comment les treize onglets se complètent pour prendre en main l’outil, importer et préparer les données, explorer les résultats, conduire les analyses puis les restituer.", guide: "Sélectionnez un onglet pour voir ses entrées, ses opérations, ses résultats et ses points de vigilance." } : { k: "Analytical process within the application", title: "Every tab, organised around the journey of your data.", p: "This view shows how the thirteen tabs work together to get started, import and prepare data, explore results, perform analyses and report findings.", guide: "Select a tab to review its inputs, operations, results and cautions." };
  return <main><section className="page-hero page-width"><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p className="lead">{c.p}</p></section><section className="section section-tint process-section"><div className="page-width"><p className="guide-note">{c.guide}</p>{groupOrder.map((group, groupIndex) => <div className="module-group" key={group}><div className="group-heading"><b>0{groupIndex + 1}</b><span>{tx(groups[group], language)}</span><i /></div><div className="module-grid">{modules.filter(m => m.group === group).map(module => <a className="module-card" href={moduleHref(module.key)} key={module.key}><div className="module-card-top"><span>{module.order}</span><i>{module.icon}</i></div><h3>{tx(module.title, language)}</h3><p>{tx(module.purpose, language)}</p><b>{language === "fr" ? "Découvrir" : "Discover"}<span>→</span></b></a>)}</div></div>)}</div></section></main>;
}

function ModuleVisual({ module, language }: { module: AppModule; language: Language }) {
  if (module.image) return <div className="module-visual image"><img src={asset(`app-previews/${module.image}`)} alt={`${tx(module.title, language)} — ${tx(module.kicker, language)}`} /><div><span>{language === "fr" ? "APERÇU ISSU DU DÉPÔT" : "PREVIEW FROM THE REPOSITORY"}</span><b>{tx(module.title, language)}</b></div></div>;
  return <div className={`module-visual schematic theme-${module.group}`} role="img" aria-label={language === "fr" ? `Schéma fonctionnel de l’onglet ${tx(module.title, language)}` : `Functional diagram of the ${tx(module.title, language)} tab`}><div className="schematic-bar"><span /><span /><span /><b>BarCodeR / {tx(module.title, language)}</b></div><div className="schematic-body"><aside><strong>{module.icon}</strong>{modules.slice(0, 8).map((m) => <i className={m.key === module.key ? "active" : ""} key={m.key} />)}</aside><div className="schematic-content"><small>{tx(module.kicker, language)}</small><h3>{tx(module.title, language)}</h3><div className="schematic-cards"><span /><span /><span /></div><div className="schematic-lines"><i /><i /><i /><i /></div></div></div></div>;
}

function ModulePage({ module, language }: { module: AppModule; language: Language }) {
  const index = modules.findIndex(m => m.key === module.key);
  const previous = modules[(index - 1 + modules.length) % modules.length];
  const next = modules[(index + 1) % modules.length];
  const c = language === "fr" ? { app: "Processus analytique", what: "Ce que l’utilisateur peut faire", io: "De l’entrée à la sortie", inputs: "Entrées", operations: "Opérations", outputs: "Sorties", question: "Question directrice", modules: "Sous-modules et questions", vigilance: "Rigueur et points d’attention", source: "Confronté au code source", sourceText: "Le contenu de cette page est dérivé du module ci-dessous, et non d’une description générique du logiciel.", previous: "Onglet précédent", next: "Onglet suivant", reproduce: "Ce qui est conservé", reproText: "Le dataset et les paramètres restent rattachés à la session ou au projet. Lorsqu’un historique est proposé, il sert à relire le contexte de production de la figure ou du résultat." } : { app: "Analytical process", what: "What users can do", io: "From input to output", inputs: "Inputs", operations: "Operations", outputs: "Outputs", question: "Guiding question", modules: "Submodules and questions", vigilance: "Rigour and cautions", source: "Checked against source code", sourceText: "This page content is derived from the module below, not from a generic software description.", previous: "Previous tab", next: "Next tab", reproduce: "What is retained", reproText: "The dataset and parameters remain attached to the session or project. Where histories are available, they support review of the context used to produce a figure or result." };
  return <main>
    <section className="module-hero page-width">
      <div className="module-hero-copy reveal"><div className="breadcrumbs"><a href="#/application">{c.app}</a><span>/</span><b>{tx(module.title, language)}</b></div><Eyebrow>{module.order} · {tx(groups[module.group], language)}</Eyebrow><h1>{tx(module.title, language)}</h1><p className="module-kicker">{tx(module.kicker, language)}</p><p className="lead">{tx(module.purpose, language)}</p><div className="question-callout"><span>?</span><div><small>{c.question}</small><b>{tx(module.question, language)}</b></div></div></div>
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
  return <footer><div className="page-width footer-main"><Brand /><p>{language === "fr" ? "Logiciel scientifique pour le traitement, l’exploration et l’analyse reproductible des données de métabarcoding." : "Scientific software for processing, exploring and reproducibly analysing metabarcoding data."}</p><nav><a href="#/application">{language === "fr" ? "Processus analytique" : "Analytical process"}</a><a href="#/reproducibility">{language === "fr" ? "Reproductibilité" : "Reproducibility"}</a><a href="#/evidence">{language === "fr" ? "Tutoriels & datasets tests" : "Tutorials & test datasets"}</a><a href="#/availability">GitHub</a></nav></div><div className="footer-bottom page-width"><span>BarCodeR × OpenMetaBar · v2.12.8</span><span>Institut Sophia Agrobiotech · PHYBAC</span></div></footer>;
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
    const label = activeModule ? tx(activeModule.title, language) : route === "/evidence" ? (language === "fr" ? "Tutoriels et datasets tests" : "Tutorials and test datasets") : route === "/reproducibility" ? (language === "fr" ? "Reproductibilité" : "Reproducibility") : route === "/availability" ? (language === "fr" ? "Code et disponibilité" : "Code and availability") : route === "/application" ? (language === "fr" ? "Processus analytique au sein de l’application" : "Analytical process within the application") : (language === "fr" ? "Analyse reproductible du métabarcoding" : "Reproducible metabarcoding analysis");
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
  else if (route === "/application") page = <ApplicationIndex language={language} />;
  else if (route === "/evidence") page = <EvidencePage language={language} />;
  else if (route === "/reproducibility") page = <ReproducibilityPage language={language} />;
  else if (route === "/availability") page = <AvailabilityPage language={language} />;
  else page = <Landing language={language} />;

  return <div className="site-shell"><Header language={language} setLanguage={setLanguage} route={route} />{page}<Footer language={language} /></div>;
}
