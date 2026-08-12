import { useState } from "react";
import type { Language } from "./content";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

type GoalId = "composition" | "alpha" | "structure" | "differential" | "relations";

type AnalysisGoal = {
  id: GoalId;
  number: string;
  nav: string;
  title: string;
  question: string;
  description: string;
  observe: string[];
  methods: string[];
  images: { src: string; label: string }[];
  module: string;
  moduleHref: string;
  note: string;
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

export default function AnalysesPageV2({ language }: { language: Language }) {
  const [activeGoal, setActiveGoal] = useState<GoalId>("composition");

  const c = language === "fr" ? {
    heroK: "Analyses dans BarCodeR",
    heroT: <>Des questions biologiques<br /><em>aux analyses adaptées.</em></>,
    heroP: "Explorez la composition, la diversité et la structure de vos communautés, testez les différences entre groupes et mettez en relation plusieurs jeux de données.",
    heroPrimary: "Choisir un objectif",
    heroSecondary: "Voir la documentation",
    hoverFigure: "Survolez les résultats",
    orientK: "Que cherchez-vous à comprendre ?",
    orientT: "Commencez par votre objectif scientifique, pas par un nom de méthode.",
    orientP: "Sélectionnez une famille pour découvrir les questions couvertes, les analyses disponibles et le type de résultat que BarCodeR peut produire.",
    canObserve: "Ce que vous pouvez examiner",
    available: "Analyses disponibles",
    openModule: "Ouvrir",
    documentation: "Comprendre ces analyses",
    figureLabel: "Exemples de résultats",
    levelsK: "Trois niveaux de lecture",
    levelsT: "Décrire, tester et explorer ne produisent pas le même niveau de preuve.",
    levels: [
      ["01", "Décrire", "Observer ce qui est présent et la manière dont les données s’organisent.", "Barplots · diversité alpha · Venn · Heat Tree"],
      ["02", "Tester", "Évaluer une différence ou une association définie à partir du plan d’étude.", "PERMANOVA · PERMDISP · analyses différentielles"],
      ["03", "Explorer", "Rechercher des structures susceptibles de générer de nouvelles hypothèses.", "Ordinations · réseaux · clustering · multi-matrices"]
    ],
    flagshipK: "Capacités distinctives",
    flagshipT: "Aller au-delà d’une figure ou d’une p-value isolée.",
    flagship: [
      ["Δ", "Comparer plusieurs moteurs différentiels", "Appliquez plusieurs approches sur une préparation partagée, puis examinez significativité corrigée, direction et concordance sans comparer directement des amplitudes exprimées sur des échelles différentes.", "app-previews/analyses_differentielles.png", "#/application/analyse"],
      ["◎", "Relier ordination, test et diagnostic", "Visualisez la structure multivariée, puis interprétez-la avec les contrôles appropriés : qualité de représentation, plan de permutations et dispersion selon l’analyse choisie.", "app-previews/permanova_dispersion.png", "#/application/analyse"],
      ["⇄", "Comparer plusieurs datasets", "Appariez les mêmes unités biologiques et étudiez l’accord entre distances, ordinations ou configurations obtenues pour plusieurs marqueurs ou représentations.", "app-previews/comparaison_matrices.png", "#/application/analyse"]
    ],
    evidenceK: "Lire avec le bon niveau de preuve",
    evidenceT: "Quatre réflexes pour éviter les raccourcis d’interprétation.",
    evidence: [
      ["Ordination", "Une séparation visuelle aide à comprendre la structure, mais ne constitue pas un test statistique."],
      ["PERMANOVA", "Une différence entre groupes doit être lue avec la dispersion et avec un schéma de permutations compatible avec le plan expérimental."],
      ["Réseaux", "Une arête représente une association statistique ; elle ne démontre ni causalité ni interaction biologique directe."],
      ["Clustering", "Un regroupement mathématiquement stable n’est pas automatiquement une entité biologiquement pertinente."]
    ],
    decideK: "Choisir son point de départ",
    decideT: "Trois portes d’entrée simples dans les analyses.",
    decide: [
      ["Je veux décrire mes données", "Commencez par la composition, la diversité et une représentation de la structure générale.", "composition"],
      ["Je veux tester une hypothèse", "Définissez le facteur étudié, les covariables et le plan expérimental avant de choisir le test.", "structure"],
      ["Je veux découvrir des structures inattendues", "Explorez ordinations, réseaux, clustering ou comparaisons de matrices comme outils de génération d’hypothèses.", "relations"]
    ],
    finalK: "Passer à la pratique",
    finalT: "Vous avez identifié l’analyse adaptée à votre question ?",
    finalP: "Ouvrez le module correspondant, suivez un tutoriel pour découvrir le parcours ou consultez la documentation pour examiner les hypothèses et paramètres en détail.",
    finalModule: "Explorer l’application",
    finalTutorial: "Suivre un tutoriel",
    finalDocs: "Consulter la documentation"
  } : {
    heroK: "Analyses in BarCodeR",
    heroT: <>From biological questions<br /><em>to suitable analyses.</em></>,
    heroP: "Explore community composition, diversity and structure, test differences among groups and relate multiple datasets.",
    heroPrimary: "Choose an objective",
    heroSecondary: "View documentation",
    hoverFigure: "Hover over the outputs",
    orientK: "What are you trying to understand?",
    orientT: "Start with your scientific objective, not a method name.",
    orientP: "Select a family to discover covered questions, available analyses and the kind of output BarCodeR can produce.",
    canObserve: "What you can examine",
    available: "Available analyses",
    openModule: "Open",
    documentation: "Understand these analyses",
    figureLabel: "Output examples",
    levelsK: "Three levels of interpretation",
    levelsT: "Describing, testing and exploring do not provide the same level of evidence.",
    levels: [
      ["01", "Describe", "Observe what is present and how the data are organised.", "Bar plots · alpha diversity · Venn · Heat Tree"],
      ["02", "Test", "Assess a difference or association defined from the study design.", "PERMANOVA · PERMDISP · differential analyses"],
      ["03", "Explore", "Search for structures that may generate new hypotheses.", "Ordinations · networks · clustering · multi-matrix"]
    ],
    flagshipK: "Distinctive capabilities",
    flagshipT: "Move beyond an isolated figure or p-value.",
    flagship: [
      ["Δ", "Compare several differential engines", "Apply several approaches to a shared preparation, then review adjusted significance, direction and agreement without directly comparing magnitudes expressed on different scales.", "app-previews/analyses_differentielles.png", "#/application/analyse"],
      ["◎", "Connect ordination, test and diagnostics", "Visualise multivariate structure, then interpret it with appropriate checks: representation quality, permutation design and dispersion depending on the selected analysis.", "app-previews/permanova_dispersion.png", "#/application/analyse"],
      ["⇄", "Compare several datasets", "Match the same biological units and study agreement among distances, ordinations or configurations obtained for several markers or representations.", "app-previews/comparaison_matrices.png", "#/application/analyse"]
    ],
    evidenceK: "Use the right level of evidence",
    evidenceT: "Four habits that prevent interpretation shortcuts.",
    evidence: [
      ["Ordination", "Visual separation helps understand structure but is not a statistical test."],
      ["PERMANOVA", "A group difference must be read with dispersion and a permutation design compatible with the experimental plan."],
      ["Networks", "An edge represents a statistical association; it demonstrates neither causality nor direct biological interaction."],
      ["Clustering", "A mathematically stable grouping is not automatically a biologically relevant entity."]
    ],
    decideK: "Choose a starting point",
    decideT: "Three simple entry points into the analyses.",
    decide: [
      ["I want to describe my data", "Start with composition, diversity and a representation of overall structure.", "composition"],
      ["I want to test a hypothesis", "Define the studied factor, covariates and experimental design before choosing the test.", "structure"],
      ["I want to discover unexpected structures", "Explore ordinations, networks, clustering or matrix comparisons as hypothesis-generating tools.", "relations"]
    ],
    finalK: "Put it into practice",
    finalT: "Have you identified an analysis suited to your question?",
    finalP: "Open the relevant module, follow a tutorial to discover the journey or read the documentation to review assumptions and parameters in detail.",
    finalModule: "Explore the application",
    finalTutorial: "Follow a tutorial",
    finalDocs: "Read documentation"
  };

  const goals: AnalysisGoal[] = language === "fr" ? [
    { id: "composition", number: "01", nav: "Composition", title: "Décrire la composition des communautés", question: "Quels taxons composent mes communautés et comment sont-ils répartis ?", description: "Explorez la composition à différents rangs taxonomiques, les taxons dominants, les ensembles partagés ou spécifiques et la qualité des assignations.", observe: ["Taxons dominants par échantillon ou groupe", "Taxons partagés et spécifiques", "Résolution et complétude taxonomiques", "Organisation dans un arbre ou un Heat Tree"], methods: ["Barplots", "Venn", "UpSet", "Heat Tree", "Phylogénie", "Qualité taxonomique"], images: [{ src: "app-previews/barplot.png", label: "Barplots" }, { src: "app-previews/heat_tree.png", label: "Heat Tree" }, { src: "app-previews/diagramme_venn.png", label: "Venn / UpSet" }], module: "Exploration", moduleHref: "#/application/exploration", note: "Une abondance élevée décrit la composition ; elle ne démontre pas à elle seule une différence statistique." },
    { id: "alpha", number: "02", nav: "Diversité", title: "Étudier la diversité au sein des échantillons", question: "La richesse ou la diversité intra-échantillon varie-t-elle entre mes groupes ?", description: "Calculez plusieurs dimensions complémentaires de la diversité, visualisez leur distribution et examinez les différences entre conditions.", observe: ["Richesse observée et estimée", "Diversité tenant compte des abondances", "Diversité phylogénétique si un arbre est disponible", "Distribution, variabilité et valeurs atypiques"], methods: ["Observed", "Chao1", "ACE", "Shannon", "Simpson", "Inverse Simpson", "Fisher", "Faith PD"], images: [{ src: "app-previews/alpha_diversite.png", label: "Alpha-diversité" }, { src: "app-previews/qualite_assignation_taxonomique.png", label: "Diagnostics" }], module: "Exploration", moduleHref: "#/application/exploration", note: "Un indice unique ne résume pas toutes les dimensions de la diversité et la richesse observée dépend de l’effort d’échantillonnage." },
    { id: "structure", number: "03", nav: "Structure", title: "Comparer la structure des communautés", question: "Mes communautés s’organisent-elles selon une condition ou une variable environnementale ?", description: "Représentez les distances entre échantillons, examinez la qualité de l’ordination et testez séparément les différences de position et de dispersion.", observe: ["Organisation globale des échantillons", "Variables associées aux principaux gradients", "Part de variation expliquée", "Différences de centroïdes et de dispersion"], methods: ["PCA", "PCoA", "NMDS", "CCA", "RDA", "dbRDA", "PERMANOVA", "PERMDISP"], images: [{ src: "app-previews/ordinations.png", label: "Ordinations" }, { src: "app-previews/permanova_dispersion.png", label: "PERMANOVA / dispersion" }], module: "Analyse", moduleHref: "#/application/analyse", note: "Une séparation visuelle n’est pas un test. La transformation, la distance et les permutations doivent rester cohérentes avec le plan d’étude." },
    { id: "differential", number: "04", nav: "Taxons associés", title: "Identifier les taxons associés à une condition", question: "Quels taxons présentent une association robuste avec le facteur étudié ?", description: "Appliquez un ou plusieurs moteurs sur une préparation commune, puis comparez la significativité corrigée et la direction des effets.", observe: ["Taxons significativement associés", "Direction de l’association", "Résultats propres à une méthode", "Concordances et discordances entre moteurs"], methods: ["ANCOM-BC2", "LinDA", "ALDEx2", "corncob", "MaAsLin 3"], images: [{ src: "app-previews/analyses_differentielles.png", label: "Analyses différentielles" }, { src: "app-previews/heat_tree.png", label: "Résultats taxonomiques" }], module: "Analyse", moduleHref: "#/application/analyse", note: "Les moteurs ne reposent pas tous sur la même échelle d’effet. Leur comparaison porte sur la direction et la significativité, pas sur l’amplitude brute." },
    { id: "relations", number: "05", nav: "Relations", title: "Explorer des relations, regroupements et concordances", question: "Plusieurs datasets ou groupes de taxons révèlent-ils une organisation commune ?", description: "Comparez des matrices appariées, explorez des regroupements non supervisés ou construisez des réseaux d’associations lorsque les données s’y prêtent.", observe: ["Concordance entre plusieurs marqueurs", "Échantillons responsables d’accords ou désaccords", "Regroupements d’échantillons ou de taxons", "Associations statistiques et stabilité des arêtes"], methods: ["Mantel", "Procrustes", "PROTEST", "Co-inertie", "MCOA", "Clustering", "SPIEC-EASI", "SparCC", "Proportionnalité"], images: [{ src: "app-previews/comparaison_matrices.png", label: "Comparaison de matrices" }, { src: "app-previews/clustering.png", label: "Clustering" }], module: "Analyse", moduleHref: "#/application/analyse", note: "Une concordance, un cluster ou une arête de réseau aide à générer des hypothèses ; ces structures ne démontrent pas automatiquement un mécanisme biologique." }
  ] : [
    { id: "composition", number: "01", nav: "Composition", title: "Describe community composition", question: "Which taxa compose my communities and how are they distributed?", description: "Explore composition across taxonomic ranks, dominant taxa, shared or specific sets and assignment quality.", observe: ["Dominant taxa by sample or group", "Shared and specific taxa", "Taxonomic resolution and completeness", "Organisation in a tree or Heat Tree"], methods: ["Bar plots", "Venn", "UpSet", "Heat Tree", "Phylogeny", "Taxonomic quality"], images: [{ src: "app-previews/barplot.png", label: "Bar plots" }, { src: "app-previews/heat_tree.png", label: "Heat Tree" }, { src: "app-previews/diagramme_venn.png", label: "Venn / UpSet" }], module: "Exploration", moduleHref: "#/application/exploration", note: "High abundance describes composition; it does not by itself demonstrate a statistical difference." },
    { id: "alpha", number: "02", nav: "Diversity", title: "Study diversity within samples", question: "Does within-sample richness or diversity vary among my groups?", description: "Calculate complementary dimensions of diversity, visualise their distribution and examine differences among conditions.", observe: ["Observed and estimated richness", "Abundance-aware diversity", "Phylogenetic diversity when a tree is available", "Distribution, variability and atypical values"], methods: ["Observed", "Chao1", "ACE", "Shannon", "Simpson", "Inverse Simpson", "Fisher", "Faith PD"], images: [{ src: "app-previews/alpha_diversite.png", label: "Alpha diversity" }, { src: "app-previews/qualite_assignation_taxonomique.png", label: "Diagnostics" }], module: "Exploration", moduleHref: "#/application/exploration", note: "A single index does not summarise all dimensions of diversity, and observed richness depends on sampling effort." },
    { id: "structure", number: "03", nav: "Structure", title: "Compare community structure", question: "Are my communities organised according to a condition or environmental variable?", description: "Represent distances among samples, review ordination quality and separately test differences in location and dispersion.", observe: ["Overall sample organisation", "Variables associated with main gradients", "Share of explained variation", "Centroid and dispersion differences"], methods: ["PCA", "PCoA", "NMDS", "CCA", "RDA", "dbRDA", "PERMANOVA", "PERMDISP"], images: [{ src: "app-previews/ordinations.png", label: "Ordinations" }, { src: "app-previews/permanova_dispersion.png", label: "PERMANOVA / dispersion" }], module: "Analysis", moduleHref: "#/application/analyse", note: "Visual separation is not a test. Transformation, distance and permutations must remain coherent with the study design." },
    { id: "differential", number: "04", nav: "Associated taxa", title: "Identify taxa associated with a condition", question: "Which taxa show a robust association with the studied factor?", description: "Apply one or several engines to a shared preparation, then compare adjusted significance and effect direction.", observe: ["Significantly associated taxa", "Direction of association", "Method-specific results", "Agreement and disagreement among engines"], methods: ["ANCOM-BC2", "LinDA", "ALDEx2", "corncob", "MaAsLin 3"], images: [{ src: "app-previews/analyses_differentielles.png", label: "Differential analyses" }, { src: "app-previews/heat_tree.png", label: "Taxonomic results" }], module: "Analysis", moduleHref: "#/application/analyse", note: "Engines do not all use the same effect scale. Compare direction and significance, not raw magnitude." },
    { id: "relations", number: "05", nav: "Relationships", title: "Explore relationships, groups and agreement", question: "Do several datasets or taxon groups reveal a shared organisation?", description: "Compare matched matrices, explore unsupervised groupings or build association networks when the data are suitable.", observe: ["Agreement among several markers", "Samples responsible for agreement or disagreement", "Sample or taxon groupings", "Statistical associations and edge stability"], methods: ["Mantel", "Procrustes", "PROTEST", "Co-inertia", "MCOA", "Clustering", "SPIEC-EASI", "SparCC", "Proportionality"], images: [{ src: "app-previews/comparaison_matrices.png", label: "Matrix comparison" }, { src: "app-previews/clustering.png", label: "Clustering" }], module: "Analysis", moduleHref: "#/application/analyse", note: "Agreement, clusters and network edges support hypothesis generation; they do not automatically demonstrate a biological mechanism." }
  ];

  const selected = goals.find(goal => goal.id === activeGoal) || goals[0];
  const guidePath = asset(`documentation/${language}/analyse/guides-methodologiques.html`);

  const chooseGoal = (id: GoalId) => {
    setActiveGoal(id);
    window.setTimeout(() => document.getElementById("analysis-v2-goal")?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
  };

  return <main className="analysis-v2-page">
    <section className="analysis-v2-hero">
      <div className="page-width analysis-v2-hero-grid">
        <div className="analysis-v2-hero-copy reveal"><Eyebrow>{c.heroK}</Eyebrow><h1>{c.heroT}</h1><p className="lead">{c.heroP}</p><div className="hero-actions"><a className="button primary" href="#analysis-v2-orient">{c.heroPrimary}<span>↓</span></a><a className="button secondary" href={guidePath} target="_blank" rel="noreferrer">{c.heroSecondary}<span>↗</span></a></div></div>
        <div className="analysis-v2-mosaic reveal delay-1">
          <small>{c.hoverFigure}</small>
          {[{ src: "barplot.png", label: "Barplots" }, { src: "ordinations.png", label: "Ordinations" }, { src: "alpha_diversite.png", label: "Alpha" }, { src: "analyses_differentielles.png", label: "Différentiel" }, { src: "clustering.png", label: "Clustering" }, { src: "comparaison_matrices.png", label: "Multi-matrices" }].map((figure, index) => <figure className={`mosaic-${index + 1}`} key={figure.src}><img src={asset(`app-previews/${figure.src}`)} alt="" /><figcaption>{figure.label}</figcaption></figure>)}
        </div>
      </div>
    </section>

    <section className="section page-width analysis-v2-orient" id="analysis-v2-orient">
      <div className="section-heading reveal"><div><Eyebrow>{c.orientK}</Eyebrow><h2>{c.orientT}</h2></div><p>{c.orientP}</p></div>
      <div className="analysis-v2-tabs" role="tablist" aria-label={c.orientK}>{goals.map(goal => <button type="button" role="tab" aria-selected={activeGoal === goal.id} className={activeGoal === goal.id ? "active" : ""} onClick={() => chooseGoal(goal.id)} onPointerEnter={() => setActiveGoal(goal.id)} key={goal.id}><span>{goal.number}</span><b>{goal.nav}</b><i>→</i></button>)}</div>
      <article className="analysis-v2-goal" id="analysis-v2-goal" key={selected.id}>
        <div className="analysis-v2-goal-copy">
          <span>{selected.number}</span><small>{selected.module}</small><h3>{selected.title}</h3><p className="analysis-v2-question">{selected.question}</p><p>{selected.description}</p>
          <div className="analysis-v2-observe"><b>{c.canObserve}</b><ul>{selected.observe.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div className="analysis-v2-methods"><b>{c.available}</b><div>{selected.methods.map(method => <span key={method}>{method}</span>)}</div></div>
          <aside><span>!</span><p>{selected.note}</p></aside>
          <nav><a href={selected.moduleHref}>{c.openModule} {selected.module}<span>→</span></a><a href={guidePath} target="_blank" rel="noreferrer">{c.documentation}<span>↗</span></a></nav>
        </div>
        <div className={`analysis-v2-goal-figures figures-${selected.images.length}`}><small>{c.figureLabel}</small>{selected.images.map((image, index) => <figure className={`figure-${index + 1}`} key={image.src}><img src={asset(image.src)} alt={image.label} /><figcaption>{image.label}<span>↗</span></figcaption></figure>)}</div>
      </article>
    </section>

    <section className="analysis-v2-levels"><div className="page-width"><div className="section-heading reveal"><div><Eyebrow>{c.levelsK}</Eyebrow><h2>{c.levelsT}</h2></div></div><div className="analysis-v2-level-grid">{c.levels.map(([number, title, text, examples]) => <article className="reveal" key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p><small>{examples}</small></article>)}</div></div></section>

    <section className="section page-width analysis-v2-flagship"><div className="section-heading reveal"><div><Eyebrow>{c.flagshipK}</Eyebrow><h2>{c.flagshipT}</h2></div></div><div>{c.flagship.map(([icon, title, text, image, href], index) => <article className="reveal" key={title}><figure><img src={asset(image)} alt="" /><span>{icon}</span></figure><div><small>0{index + 1}</small><h3>{title}</h3><p>{text}</p><a href={href}>{c.openModule}<span>→</span></a></div></article>)}</div></section>

    <section className="analysis-v2-evidence"><div className="page-width"><div className="section-heading reveal"><div><Eyebrow>{c.evidenceK}</Eyebrow><h2>{c.evidenceT}</h2></div></div><div className="analysis-v2-evidence-grid">{c.evidence.map(([title, text], index) => <article className="reveal" key={title}><span>{String(index + 1).padStart(2, "0")}</span><i>!</i><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="section page-width analysis-v2-decide"><div className="section-heading reveal"><div><Eyebrow>{c.decideK}</Eyebrow><h2>{c.decideT}</h2></div></div><div>{c.decide.map(([title, text, id], index) => <button type="button" className="reveal" onClick={() => { setActiveGoal(id as GoalId); document.getElementById("analysis-v2-orient")?.scrollIntoView({ behavior: "smooth" }); }} key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div><i>→</i></button>)}</div></section>

    <section className="analysis-v2-final"><div className="page-width"><div><Eyebrow>{c.finalK}</Eyebrow><h2>{c.finalT}</h2><p>{c.finalP}</p></div><nav><a className="button primary" href="#/application/analyse">{c.finalModule}<span>→</span></a><a className="button secondary" href="#/tutorials">{c.finalTutorial}<span>→</span></a><a className="button secondary" href="#/documentation">{c.finalDocs}<span>↗</span></a></nav></div></section>
  </main>;
}
