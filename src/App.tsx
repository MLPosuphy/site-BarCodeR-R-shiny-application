import { useEffect, useMemo, useState } from "react";
import { groups, modules, type AppModule, type Language, type Localized } from "./content";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const tx = (value: Localized, language: Language) => value[language];
const moduleHref = (key: string) => `#/application/${key}`;

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
      <img src={asset("app-previews/barcoder-logo.png")} alt="" />
      <span><strong>BarCodeR</strong><i>×</i><strong>OpenMetaBar</strong></span>
    </a>
  );
}

function Header({ language, setLanguage, route }: { language: Language; setLanguage: (language: Language) => void; route: string }) {
  const [open, setOpen] = useState(false);
  const c = language === "fr" ? {
    overview: "Vue d’ensemble", application: "Parcours de l’application", evidence: "Données publiques", reproducibility: "Reproductibilité", code: "Code & disponibilité", appLabel: "Onglets de BarCodeR"
  } : {
    overview: "Overview", application: "Application workflow", evidence: "Public data", reproducibility: "Reproducibility", code: "Code & availability", appLabel: "BarCodeR tabs"
  };

  useEffect(() => setOpen(false), [route]);

  useEffect(() => {
    const activeTab = document.querySelector<HTMLElement>(".app-tabs a.active");
    if (!activeTab) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    activeTab.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center"
    });
  }, [route]);

  return (
    <>
      <header className="site-header">
        <Brand />
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={language === "fr" ? "Ouvrir le menu" : "Open menu"}>
          <span /><span />
        </button>
        <nav className={open ? "primary-nav open" : "primary-nav"} aria-label="Navigation principale">
          <a className={route === "/" ? "active" : ""} href="#/">{c.overview}</a>
          <a className={route.startsWith("/application") ? "active" : ""} href="#/application">{c.application}</a>
          <a className={route === "/evidence" ? "active" : ""} href="#/evidence">{c.evidence}</a>
          <a className={route === "/reproducibility" ? "active" : ""} href="#/reproducibility">{c.reproducibility}</a>
          <a className={route === "/availability" ? "active" : ""} href="#/availability">{c.code}</a>
          <div className="language-switch" aria-label={language === "fr" ? "Langue" : "Language"}>
            <button className={language === "fr" ? "active" : ""} onClick={() => setLanguage("fr")}>FR</button>
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
          </div>
        </nav>
      </header>
      <nav className="app-tabs" aria-label={c.appLabel}>
        <span className="app-tabs-label">{c.appLabel}</span>
        <div className="app-tabs-scroll">
          {modules.map((module) => (
            <a key={module.key} href={moduleHref(module.key)} className={route === `/application/${module.key}` ? "active" : ""}>
              <span>{module.order}</span>{tx(module.title, language)}
            </a>
          ))}
        </div>
      </nav>
    </>
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

function Workflow({ language, compact = false }: { language: Language; compact?: boolean }) {
  const items = [
    ["FASTQ", "OpenMetaBar", "01"], ["phyloseq", language === "fr" ? "Objet scientifique" : "Scientific object", "02"],
    [language === "fr" ? "Préparer" : "Prepare", language === "fr" ? "Édition & filtration" : "Edition & filtering", "03"],
    [language === "fr" ? "Explorer" : "Explore", language === "fr" ? "Description & figures" : "Description & figures", "04"],
    [language === "fr" ? "Tester" : "Test", language === "fr" ? "Modèles & diagnostics" : "Models & diagnostics", "05"],
    [language === "fr" ? "Restituer" : "Report", "MultiView", "06"]
  ];
  return <div className={compact ? "workflow compact" : "workflow"}>{items.map(([name, detail, number], index) => <div className="workflow-step" key={number}><span>{number}</span><div><b>{name}</b><small>{detail}</small></div>{index < items.length - 1 && <i />}</div>)}</div>;
}

function Landing({ language }: { language: Language }) {
  const c = language === "fr" ? {
    badge: "Logiciel scientifique · R/Shiny + Nextflow DSL2",
    title: <>Du read à la figure,<br /><em>sans perdre le fil scientifique.</em></>,
    intro: "OpenMetaBar organise le traitement amont des séquences. BarCodeR transforme les objets phyloseq en projets explorables, analysables et documentés, avec des choix méthodologiques visibles.",
    explore: "Parcourir les 13 onglets", proof: "Examiner la démonstration publique", version: "Code examiné · BarCodeR v2.12.8",
    numbers: [["13", "onglets documentés"], ["12", "modules d’exploration et d’analyse"], ["14", "familles de sorties avec code R"], ["5", "langues dans l’application"]],
    workflowK: "Le parcours", workflowT: "Deux composants, un même historique analytique.", workflowP: "Le site suit la logique réelle de l’application : produire ou importer un objet, le contrôler, le préparer, explorer ses structures, tester des hypothèses puis restituer les résultats.",
    modulesK: "Dans l’application", modulesT: "Chaque onglet a désormais sa propre page.", modulesP: "Les pages ci-dessous décrivent les entrées, les opérations, les sorties et les points de vigilance observés directement dans le code.",
    evidenceK: "Démonstration publique", evidenceT: "Les figures sont calculées, pas inventées.", evidenceP: "La démonstration utilise l’objet public GlobalPatterns de phyloseq. Le dataset synthétique de test n’est pas utilisé comme preuve scientifique.", details: "Voir les données et les méthodes",
    rigourK: "Conception", rigourT: "Attractif ne veut pas dire promotionnel.", rigourCards: [["Méthodes visibles", "Les paramètres de calcul sont distingués des options de rendu."], ["Limites explicites", "Chaque module indique ses prérequis et ses risques d’interprétation."], ["Traçabilité", "Dataset, provenance, historiques et scripts restent reliés."], ["Interface réelle", "Les contenus suivent les modules effectivement présents dans BarCodeR."]]
  } : {
    badge: "Scientific software · R/Shiny + Nextflow DSL2",
    title: <>From reads to figures,<br /><em>without losing the scientific thread.</em></>,
    intro: "OpenMetaBar organizes upstream sequence processing. BarCodeR turns phyloseq objects into explorable, analysable and documented projects with visible methodological choices.",
    explore: "Browse the 13 tabs", proof: "Inspect the public demonstration", version: "Code reviewed · BarCodeR v2.12.8",
    numbers: [["13", "documented tabs"], ["12", "exploration and analysis modules"], ["14", "output families with R code"], ["5", "languages in the application"]],
    workflowK: "The workflow", workflowT: "Two components, one analytical history.", workflowP: "The website follows the real application logic: produce or import an object, check it, prepare it, explore its structure, test hypotheses and report results.",
    modulesK: "Inside the application", modulesT: "Every tab now has its own page.", modulesP: "The pages below describe inputs, operations, outputs and cautions observed directly in the code.",
    evidenceK: "Public demonstration", evidenceT: "Figures are computed, not invented.", evidenceP: "The demonstration uses the public phyloseq GlobalPatterns object. The synthetic test dataset is not used as scientific evidence.", details: "View data and methods",
    rigourK: "Design", rigourT: "Engaging does not mean promotional.", rigourCards: [["Visible methods", "Computation parameters are separated from display options."], ["Explicit limits", "Every module states prerequisites and interpretation risks."], ["Traceability", "Dataset, provenance, histories and scripts remain connected."], ["Real interface", "Content follows modules actually present in BarCodeR."]]
  };

  return <main>
    <section className="hero page-width">
      <div className="hero-copy reveal"><Eyebrow>{c.badge}</Eyebrow><h1>{c.title}</h1><p className="lead">{c.intro}</p><div className="hero-actions"><a className="button primary" href="#/application">{c.explore}<span>→</span></a><a className="button secondary" href="#/evidence">{c.proof}<span>↘</span></a></div><p className="version-line"><span />{c.version}</p></div>
      <div className="hero-media reveal delay-1"><div className="ambient-ring" /><AppPreview language={language} /><div className="signal-card signal-one"><span>R</span><div><b>{language === "fr" ? "Code reproductible" : "Reproducible code"}</b><small>14 output families</small></div></div><div className="signal-card signal-two"><span>✓</span><div><b>{language === "fr" ? "Provenance attachée" : "Provenance attached"}</b><small>FASTQ → phyloseq → figure</small></div></div></div>
    </section>
    <section className="numbers-band"><div className="page-width numbers-grid">{c.numbers.map(([number, label]) => <div key={label}><b>{number}</b><span>{label}</span></div>)}</div></section>
    <section className="section page-width reveal"><div className="section-intro"><Eyebrow>{c.workflowK}</Eyebrow><h2>{c.workflowT}</h2><p>{c.workflowP}</p></div><Workflow language={language} /></section>
    <section className="section section-tint"><div className="page-width"><div className="section-intro reveal"><Eyebrow>{c.modulesK}</Eyebrow><h2>{c.modulesT}</h2><p>{c.modulesP}</p></div><ModuleGrid language={language} limit={13} /></div></section>
    <section className="section page-width evidence-teaser reveal"><div className="evidence-copy"><Eyebrow>{c.evidenceK}</Eyebrow><h2>{c.evidenceT}</h2><p>{c.evidenceP}</p><a className="text-link" href="#/evidence">{c.details}<span>→</span></a></div><div className="evidence-figure"><img src={asset("figures/globalpatterns-ordination.png")} alt={language === "fr" ? "Ordination PCoA calculée sur le dataset GlobalPatterns" : "PCoA ordination computed on the GlobalPatterns dataset"} /><span>GlobalPatterns · Bray–Curtis · PCoA</span></div></section>
    <section className="section dark-section"><div className="page-width"><div className="section-intro light reveal"><Eyebrow>{c.rigourK}</Eyebrow><h2>{c.rigourT}</h2></div><div className="rigour-grid">{c.rigourCards.map(([title, text], index) => <article className="reveal" style={{ "--delay": `${index * 55}ms` } as React.CSSProperties} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
  </main>;
}

function ModuleGrid({ language, limit }: { language: Language; limit?: number }) {
  return <div className="module-grid">{modules.slice(0, limit).map((module, index) => <a href={moduleHref(module.key)} className="module-card reveal" style={{ "--delay": `${(index % 4) * 45}ms` } as React.CSSProperties} key={module.key}><div className="module-card-top"><span>{module.order}</span><i>{module.icon}</i></div><small>{tx(groups[module.group], language)}</small><h3>{tx(module.title, language)}</h3><p>{tx(module.purpose, language)}</p><b>{language === "fr" ? "Ouvrir la page" : "Open page"}<span>↗</span></b></a>)}</div>;
}

function ApplicationIndex({ language }: { language: Language }) {
  const c = language === "fr" ? { k: "Parcours de l’application", title: "Treize onglets, une progression scientifique lisible.", p: "Cette carte reprend l’ordre de la barre latérale de BarCodeR. Les modules transversaux restent accessibles à tout moment, tandis que le dataset actif relie le travail de préparation aux analyses.", guide: "Choisissez un onglet pour examiner ce que l’utilisateur peut y faire, ce qu’il doit fournir et ce qu’il peut en retirer." } : { k: "Application workflow", title: "Thirteen tabs, one readable scientific progression.", p: "This map follows the BarCodeR sidebar order. Cross-cutting modules remain available at all times, while the active dataset connects preparation work to analyses.", guide: "Choose a tab to inspect what users can do, what they must provide and what they can obtain." };
  return <main><section className="page-hero page-width"><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p className="lead">{c.p}</p><Workflow language={language} compact /></section><section className="section section-tint"><div className="page-width"><p className="guide-note">{c.guide}</p>{groupOrder.map(group => <div className="module-group" key={group}><div className="group-heading"><span>{tx(groups[group], language)}</span><i /></div><div className="module-grid">{modules.filter(m => m.group === group).map(module => <a className="module-card" href={moduleHref(module.key)} key={module.key}><div className="module-card-top"><span>{module.order}</span><i>{module.icon}</i></div><h3>{tx(module.title, language)}</h3><p>{tx(module.purpose, language)}</p><b>{language === "fr" ? "Découvrir" : "Discover"}<span>→</span></b></a>)}</div></div>)}</div></section></main>;
}

function ModuleVisual({ module, language }: { module: AppModule; language: Language }) {
  if (module.image) return <div className="module-visual image"><img src={asset(`app-previews/${module.image}`)} alt={`${tx(module.title, language)} — ${tx(module.kicker, language)}`} /><div><span>{language === "fr" ? "APERÇU ISSU DU DÉPÔT" : "PREVIEW FROM THE REPOSITORY"}</span><b>{tx(module.title, language)}</b></div></div>;
  return <div className={`module-visual schematic theme-${module.group}`} role="img" aria-label={language === "fr" ? `Schéma fonctionnel de l’onglet ${tx(module.title, language)}` : `Functional diagram of the ${tx(module.title, language)} tab`}><div className="schematic-bar"><span /><span /><span /><b>BarCodeR / {tx(module.title, language)}</b></div><div className="schematic-body"><aside><strong>{module.icon}</strong>{modules.slice(0, 8).map((m) => <i className={m.key === module.key ? "active" : ""} key={m.key} />)}</aside><div className="schematic-content"><small>{tx(module.kicker, language)}</small><h3>{tx(module.title, language)}</h3><div className="schematic-cards"><span /><span /><span /></div><div className="schematic-lines"><i /><i /><i /><i /></div></div></div></div>;
}

function ModulePage({ module, language }: { module: AppModule; language: Language }) {
  const index = modules.findIndex(m => m.key === module.key);
  const previous = modules[(index - 1 + modules.length) % modules.length];
  const next = modules[(index + 1) % modules.length];
  const c = language === "fr" ? { app: "Application", what: "Ce que l’utilisateur peut faire", io: "De l’entrée à la sortie", inputs: "Entrées", operations: "Opérations", outputs: "Sorties", question: "Question directrice", modules: "Sous-modules et questions", vigilance: "Rigueur et points d’attention", source: "Confronté au code source", sourceText: "Le contenu de cette page est dérivé du module ci-dessous, et non d’une description générique du logiciel.", previous: "Onglet précédent", next: "Onglet suivant", reproduce: "Ce qui est conservé", reproText: "Le dataset et les paramètres restent rattachés à la session ou au projet. Lorsqu’un historique est proposé, il sert à relire le contexte de production de la figure ou du résultat." } : { app: "Application", what: "What users can do", io: "From input to output", inputs: "Inputs", operations: "Operations", outputs: "Outputs", question: "Guiding question", modules: "Submodules and questions", vigilance: "Rigour and cautions", source: "Checked against source code", sourceText: "This page content is derived from the module below, not from a generic software description.", previous: "Previous tab", next: "Next tab", reproduce: "What is retained", reproText: "The dataset and parameters remain attached to the session or project. Where histories are available, they support review of the context used to produce a figure or result." };
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
  const c = language === "fr" ? { k: "Données publiques", title: "Une démonstration qui peut être recalculée.", p: "Ces trois figures proviennent de l’objet public GlobalPatterns distribué avec phyloseq et dérivé de l’étude de Caporaso et al. (2011). Elles sont produites par un script R versionné dans le dépôt du site.", synthetic: "L’objet synthétique ps_marine_exotic.rds n’est pas utilisé dans cette démonstration.", method: "Méthode", facts: [["26", "échantillons"], ["18 988", "taxons non nuls analysés"], ["9", "types d’environnements"]], trace: "Traçabilité de la démonstration", items: [["Objet source", "phyloseq::GlobalPatterns (19 216 taxons)"], ["Prétraitement", "Filtrage des taxons nuls ; abondances relatives selon la figure"], ["Script", "scripts/generate_public_data_figures.R"], ["Provenance", "public/figures/data-provenance.tsv"]], script: "Consulter le script R", data: "Lire la provenance" } : { k: "Public data", title: "A demonstration that can be recomputed.", p: "These three figures come from the public GlobalPatterns object distributed with phyloseq and derived from Caporaso et al. (2011). They are produced by a versioned R script in the website repository.", synthetic: "The synthetic ps_marine_exotic.rds object is not used in this demonstration.", method: "Method", facts: [["26", "samples"], ["18,988", "nonzero taxa analysed"], ["9", "environment types"]], trace: "Demonstration traceability", items: [["Source object", "phyloseq::GlobalPatterns (19,216 taxa)"], ["Pre-processing", "Zero-taxa filtering; relative abundance according to figure"], ["Script", "scripts/generate_public_data_figures.R"], ["Provenance", "public/figures/data-provenance.tsv"]], script: "View R script", data: "Read provenance" };
  return <main><section className="page-hero page-width evidence-hero"><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p className="lead">{c.p}</p><p className="honesty-note"><span>✓</span>{c.synthetic}</p><div className="fact-row">{c.facts.map(([n, label]) => <div key={label}><b>{n}</b><span>{label}</span></div>)}</div></section><section className="figure-gallery page-width">{publicFigures.map((figure, i) => <figure className="public-figure reveal" style={{ "--delay": `${i * 70}ms` } as React.CSSProperties} key={figure.file}><div><img src={asset(`figures/${figure.file}`)} alt={tx(figure.title, language)} /></div><figcaption><span>0{i + 1}</span><h2>{tx(figure.title, language)}</h2><small>{c.method}</small><p>{tx(figure.method, language)}</p></figcaption></figure>)}</section><section className="section section-tint"><div className="page-width provenance-evidence"><div><Eyebrow>{c.trace}</Eyebrow><h2>{c.trace}</h2></div><dl>{c.items.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}</dl><div className="evidence-links"><a className="button primary" target="_blank" rel="noreferrer" href="https://github.com/MLPosuphy/site-BarCodeR-R-shiny-application/blob/main/scripts/generate_public_data_figures.R">{c.script}<span>↗</span></a><a className="button secondary" target="_blank" rel="noreferrer" href="https://github.com/MLPosuphy/site-BarCodeR-R-shiny-application/blob/main/public/figures/data-provenance.tsv">{c.data}<span>↗</span></a></div></div></section></main>;
}

function ReproducibilityPage({ language }: { language: Language }) {
  const c = language === "fr" ? { k: "Reproductibilité", title: "Retrouver comment un résultat a été produit.", p: "BarCodeR traite la reproductibilité comme un chemin continu : l’objet source et ses dérivés, les paramètres, l’historique de la figure et, pour les sorties compatibles, un script R autonome.", chain: [["FASTQ", "Fichiers et design du run"], ["OpenMetaBar", "Configuration, moteur et logs"], ["phyloseq", "Objet et provenance importée"], ["Dataset dérivé", "Édition et filtration journalisées"], ["Analyse", "Paramètres, seed et versions"], ["Figure", "Historique, export et code R"]], practices: "Mécanismes observés dans le code", cards: [["Projets", "Un projet regroupe les datasets, le dataset actif et les historiques de figures."], ["Lignage", "Les objets dérivés peuvent être reliés au dataset dont ils proviennent."], ["Historiques", "Les figures sauvegardées restent associées à leurs paramètres et à leur contexte."], ["Code R", "Le dispatcher couvre quatorze familles de sorties d’Exploration et d’Analyse."], ["Préférences", "Graine, résolution d’export et reprise de session sont configurables."], ["MultiView", "Les figures enregistrées peuvent être recomposées sans perdre leur identité."]], limits: "Ce que cela ne garantit pas", limitP: "Un historique complet ne rend pas automatiquement un plan expérimental valide. La qualité de l’interprétation dépend toujours du design, des données, de la base taxonomique, des hypothèses de la méthode et des choix de filtrage." } : { k: "Reproducibility", title: "Recover how a result was produced.", p: "BarCodeR treats reproducibility as a continuous path: source and derived objects, parameters, figure history and, for compatible outputs, a standalone R script.", chain: [["FASTQ", "Run files and design"], ["OpenMetaBar", "Configuration, engine and logs"], ["phyloseq", "Object and imported provenance"], ["Derived dataset", "Logged edition and filtering"], ["Analysis", "Parameters, seed and versions"], ["Figure", "History, export and R code"]], practices: "Mechanisms observed in the code", cards: [["Projects", "A project groups datasets, the active dataset and figure histories."], ["Lineage", "Derived objects can be linked to their source dataset."], ["Histories", "Saved figures remain associated with their parameters and context."], ["R code", "The dispatcher covers fourteen Exploration and Analysis output families."], ["Preferences", "Seed, export resolution and session resume are configurable."], ["MultiView", "Saved figures can be recomposed without losing their identity."]], limits: "What this does not guarantee", limitP: "A complete history does not automatically make an experimental design valid. Interpretation still depends on design, data, taxonomic database, method assumptions and filtering choices." };
  return <main><section className="page-hero page-width"><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p className="lead">{c.p}</p></section><section className="provenance-chain page-width">{c.chain.map(([title, text], i) => <article className="reveal" style={{ "--delay": `${i * 60}ms` } as React.CSSProperties} key={title}><span>{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p>{i < c.chain.length - 1 && <i>→</i>}</article>)}</section><section className="section section-tint"><div className="page-width"><div className="section-intro"><Eyebrow>{c.practices}</Eyebrow><h2>{c.practices}</h2></div><div className="practice-grid">{c.cards.map(([title, text], i) => <article className="reveal" style={{ "--delay": `${(i % 3) * 55}ms` } as React.CSSProperties} key={title}><span>{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section><section className="limits-panel page-width"><span>!</span><div><Eyebrow>{c.limits}</Eyebrow><h2>{c.limits}</h2><p>{c.limitP}</p></div></section></main>;
}

function AvailabilityPage({ language }: { language: Language }) {
  const c = language === "fr" ? { k: "Code & disponibilité", title: "Un logiciel de recherche ouvert, documenté avec prudence.", p: "Le code source de BarCodeR et celui de ce site sont consultables sur GitHub. Le site décrit l’état observé dans la version v2.12.8 et signale les éléments éditoriaux encore à finaliser.", app: "Dépôt BarCodeR", appP: "Application R/Shiny, modules d’analyse, intégration OpenMetaBar et mécanismes de projet.", site: "Dépôt du site", siteP: "Code React/Vite, figures publiques, scripts de génération et déploiement GitHub Pages.", open: "Ouvrir sur GitHub", status: "État éditorial", items: [["Version examinée", "BarCodeR v2.12.8"], ["Hébergement du site", "GitHub Pages"], ["Licence définitive", "À confirmer dans la préparation de la publication"], ["Archive versionnée et DOI", "À produire pour la version citée dans le manuscrit"], ["Infrastructure OpenMetaBar", "Cluster SSH/Slurm requis ; non fourni par ce site"]], contact: "Correspondance scientifique", contactP: "Pour citer, tester ou discuter du logiciel, utiliser le dépôt GitHub et les coordonnées institutionnelles maintenues par le projet." } : { k: "Code & availability", title: "Open research software, documented with care.", p: "BarCodeR source code and this website are available on GitHub. The website describes the state observed in version v2.12.8 and identifies editorial elements that remain to be finalized.", app: "BarCodeR repository", appP: "R/Shiny application, analysis modules, OpenMetaBar integration and project mechanisms.", site: "Website repository", siteP: "React/Vite code, public figures, generation scripts and GitHub Pages deployment.", open: "Open on GitHub", status: "Editorial status", items: [["Version reviewed", "BarCodeR v2.12.8"], ["Website hosting", "GitHub Pages"], ["Final license", "To be confirmed during publication preparation"], ["Versioned archive and DOI", "To be produced for the version cited in the manuscript"], ["OpenMetaBar infrastructure", "SSH/Slurm cluster required; not provided by this website"]], contact: "Scientific correspondence", contactP: "To cite, test or discuss the software, use the GitHub repository and institutional contact details maintained by the project." };
  return <main><section className="page-hero page-width"><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p className="lead">{c.p}</p></section><section className="repository-grid page-width"><a href="https://github.com/MLPosuphy/BarCodeR" target="_blank" rel="noreferrer"><span>R</span><small>github.com/MLPosuphy/BarCodeR</small><h2>{c.app}</h2><p>{c.appP}</p><b>{c.open} ↗</b></a><a href="https://github.com/MLPosuphy/site-BarCodeR-R-shiny-application" target="_blank" rel="noreferrer"><span>WEB</span><small>github.com/MLPosuphy/site-BarCodeR-R-shiny-application</small><h2>{c.site}</h2><p>{c.siteP}</p><b>{c.open} ↗</b></a></section><section className="section section-tint"><div className="page-width availability-status"><div><Eyebrow>{c.status}</Eyebrow><h2>{c.status}</h2></div><dl>{c.items.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}</dl></div></section><section className="contact-band page-width"><span>@</span><div><Eyebrow>{c.contact}</Eyebrow><h2>{c.contact}</h2><p>{c.contactP}</p></div></section></main>;
}

function Footer({ language }: { language: Language }) {
  return <footer><div className="page-width footer-main"><Brand /><p>{language === "fr" ? "Logiciel scientifique pour le traitement, l’exploration et l’analyse reproductible des données de métabarcoding." : "Scientific software for processing, exploring and reproducibly analysing metabarcoding data."}</p><nav><a href="#/application">{language === "fr" ? "Application" : "Application"}</a><a href="#/evidence">{language === "fr" ? "Données" : "Data"}</a><a href="#/reproducibility">{language === "fr" ? "Reproductibilité" : "Reproducibility"}</a><a href="#/availability">GitHub</a></nav></div><div className="footer-bottom page-width"><span>BarCodeR × OpenMetaBar · v2.12.8</span><span>Institut Sophia Agrobiotech · PHYBAC</span></div></footer>;
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
    const label = activeModule ? tx(activeModule.title, language) : route === "/evidence" ? (language === "fr" ? "Données publiques" : "Public data") : route === "/reproducibility" ? (language === "fr" ? "Reproductibilité" : "Reproducibility") : route === "/availability" ? (language === "fr" ? "Code et disponibilité" : "Code and availability") : route === "/application" ? (language === "fr" ? "Parcours de l’application" : "Application workflow") : (language === "fr" ? "Analyse reproductible du métabarcoding" : "Reproducible metabarcoding analysis");
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
