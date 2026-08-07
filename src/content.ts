export type Language = "fr" | "en";
export type Localized = { fr: string; en: string };

export const l = (fr: string, en: string): Localized => ({ fr, en });

export type SubModule = {
  title: Localized;
  question: Localized;
  method: Localized;
  image?: string;
};

export type AppModule = {
  key: string;
  order: string;
  group: "orient" | "input" | "prepare" | "analyse" | "report";
  icon: string;
  title: Localized;
  kicker: Localized;
  purpose: Localized;
  question: Localized;
  inputs: Localized[];
  actions: Localized[];
  outputs: Localized[];
  cautions: Localized[];
  source: string;
  image?: string;
  submodules?: SubModule[];
};

export type ModuleScreen = {
  image: string;
  title: Localized;
  description: Localized;
};

export const modules: AppModule[] = [
  {
    key: "accueil", order: "01", group: "orient", icon: "⌂",
    title: l("Accueil", "Home"),
    kicker: l("S’orienter dans la session", "Orient within the session"),
    purpose: l(
      "Lire immédiatement l’état du projet, le dataset actif et les étapes déjà parcourues, puis reprendre le travail au bon endroit.",
      "Immediately read the project state, active dataset and completed steps, then resume work in the right place."
    ),
    question: l("Où en est mon projet et quelle est la prochaine action utile ?", "Where is my project and what is the next useful action?"),
    inputs: [l("Projet ouvert", "Open project"), l("Dataset actif", "Active dataset"), l("Historiques de figures", "Figure histories")],
    actions: [
      l("Contrôler l’état de sauvegarde et la provenance du dataset", "Check save state and dataset provenance"),
      l("Lire les indicateurs de structure du jeu de données", "Read dataset structure indicators"),
      l("Reprendre le dernier onglet utilisé", "Resume the last used tab"),
      l("Choisir une question parmi les analyses proposées", "Choose a question among proposed analyses"),
      l("Parcourir la checklist en six volets avant analyse", "Review the six-part pre-analysis checklist")
    ],
    outputs: [l("Orientation dans le workflow", "Workflow orientation"), l("Accès direct au module pertinent", "Direct access to the relevant module"), l("Vue des quatre dernières figures", "View of the four latest figures")],
    cautions: [l("Les indicateurs résument la session ; ils ne remplacent pas le contrôle détaillé dans Description.", "Indicators summarize the session; they do not replace detailed checks in Description.")],
    source: "modules/home/mod_home_ui.R"
  },
  {
    key: "documentation", order: "02", group: "orient", icon: "?",
    title: l("Documentation", "Documentation"),
    kicker: l("Comprendre avant de paramétrer", "Understand before configuring"),
    purpose: l("Relier chaque zone de l’interface à son rôle méthodologique et distinguer ce qui modifie le calcul de ce qui modifie seulement le rendu.", "Connect each interface area to its methodological role and distinguish computation settings from display settings."),
    question: l("Que règle ce contrôle et quelle conséquence a-t-il sur mon résultat ?", "What does this control set and how does it affect my result?"),
    inputs: [l("Onglet ou méthode à comprendre", "Tab or method to understand"), l("Question analytique", "Analytical question")],
    actions: [l("Parcourir la carte du workflow", "Browse the workflow map"), l("Consulter les interfaces simulées", "Inspect simulated interfaces"), l("Identifier calcul, rendu, navigation, action et téléchargement", "Identify computation, display, navigation, action and download controls"), l("Accéder aux conseils d’interprétation", "Access interpretation guidance")],
    outputs: [l("Guide pratique par onglet", "Practical guide by tab"), l("Référence des paramètres", "Parameter reference"), l("Réflexes de reproductibilité", "Reproducibility practices")],
    cautions: [l("La documentation aide au paramétrage mais ne choisit pas la méthode à la place du scientifique.", "Documentation supports configuration but does not choose the method for the scientist.")],
    source: "modules/documentation/mod_documentation_ui.R"
  },
  {
    key: "openmetabar", order: "03", group: "input", icon: "⇢",
    title: l("OpenMetaBar", "OpenMetaBar"),
    kicker: l("Module optionnel · des FASTQ à un objet analysable", "Optional module · from FASTQ to an analysable object"),
    purpose: l("Préparer, soumettre et suivre un pipeline de métabarcoding sur une infrastructure distante, puis récupérer ses sorties dans BarCodeR.", "Prepare, submit and monitor a metabarcoding pipeline on remote infrastructure, then retrieve its outputs in BarCodeR."),
    question: l("Comment transformer un run de séquençage documenté en objet phyloseq traçable ?", "How can a documented sequencing run become a traceable phyloseq object?"),
    inputs: [l("Fichiers FASTQ", "FASTQ files"), l("Design file", "Design file"), l("Base de référence", "Reference database"), l("Accès SSH/Slurm", "SSH/Slurm access")],
    actions: [l("Valider la connexion au cluster", "Validate the cluster connection"), l("Choisir les fichiers en local ou sur le cluster", "Choose files locally or on the cluster"), l("Configurer technologie, marqueur, moteur et ressources", "Configure technology, marker, engine and resources"), l("Vérifier les aperçus avant soumission", "Review previews before submission"), l("Suivre les étapes, logs et historique du run", "Monitor run steps, logs and history"), l("Récupérer les sorties et importer le phyloseq", "Retrieve outputs and import the phyloseq object")],
    outputs: [l("Run Nextflow DSL2", "Nextflow DSL2 run"), l("Journaux d’exécution", "Execution logs"), l("Historique cluster", "Cluster history"), l("Objet phyloseq avec provenance", "Phyloseq object with provenance")],
    cautions: [l("OpenMetaBar est facultatif : si vous disposez déjà d’un objet phyloseq, vous pouvez l’importer directement dans BarCodeR.", "OpenMetaBar is optional: if you already have a phyloseq object, you can import it directly into BarCodeR."), l("Une infrastructure SSH/Slurm correctement configurée est nécessaire pour utiliser ce module.", "A properly configured SSH/Slurm infrastructure is required to use this module."), l("Le traitement des FASTQ est exécuté à distance ; le reste de l’analyse se poursuit ensuite dans BarCodeR.", "FASTQ processing runs remotely; the rest of the analysis then continues in BarCodeR.")],
    source: "modules/openmetabar/mod_OpenMetaBar_ui.R"
  },
  {
    key: "input-data", order: "04", group: "input", icon: "↓",
    title: l("Input data", "Input data"),
    kicker: l("Ajouter un phyloseq au projet", "Add a phyloseq object to the project"),
    purpose: l("Importer un objet phyloseq complet ou partiel, ou restaurer un projet BarCodeR déjà sauvegardé.", "Import a complete or partial phyloseq object, or restore a previously saved BarCodeR project."),
    question: l("Comment ajouter mes données existantes au projet BarCodeR ?", "How can I add my existing data to a BarCodeR project?"),
    inputs: [l("Objet phyloseq dans un fichier .rds", "Phyloseq object in an .rds file"), l("Objet phyloseq dans un fichier .RData/.rda/.rdata", "Phyloseq object in an .RData/.rda/.rdata file")],
    actions: [l("Charger un objet phyloseq complet ou partiel", "Load a complete or partial phyloseq object"), l("Identifier les composantes présentes", "Identify available components"), l("Contrôler la cohérence de l’objet à l’import", "Check object consistency during import"), l("Restaurer un projet BarCodeR sauvegardé", "Restore a saved BarCodeR project")],
    outputs: [l("Dataset disponible dans le projet", "Dataset available in the project"), l("Projet restauré", "Restored project"), l("Résumé de l’import", "Import summary")],
    cautions: [l("Cet onglet attend un objet phyloseq sérialisé dans un fichier R ; il n’assemble pas plusieurs tables indépendantes en un nouvel objet phyloseq.", "This tab expects a phyloseq object serialized in an R file; it does not assemble several independent tables into a new phyloseq object.")],
    source: "modules/data/mod_data_loader_ui.R"
  },
  {
    key: "datasets", order: "05", group: "prepare", icon: "▦",
    title: l("Datasets", "Datasets"),
    kicker: l("Piloter données et projets", "Manage data and projects"),
    purpose: l("Administrer le registre des datasets, définir l’objet actif à l’échelle de l’application et sauvegarder ou partager un projet complet.", "Manage the dataset registry, define the application-wide active object, and save or share a complete project."),
    question: l("Sur quel objet travaille l’application et comment préserver son état ?", "Which object is the application using and how can its state be preserved?"),
    inputs: [l("Datasets en mémoire", "In-memory datasets"), l("Projet courant", "Current project"), l("Archive de projet", "Project archive")],
    actions: [l("Choisir le dataset actif global", "Choose the global active dataset"), l("Renommer, dupliquer, exporter ou retirer un dataset", "Rename, duplicate, export or remove a dataset"), l("Créer, sauvegarder ou recharger un projet", "Create, save or reload a project"), l("Importer ou exporter une archive ZIP", "Import or export a ZIP archive"), l("Exporter les données seules en RDS", "Export data only as RDS")],
    outputs: [l("Registre organisé", "Organized registry"), l("Projet sauvegardé", "Saved project"), l("Archive partageable", "Shareable archive")],
    cautions: [l("Les actions sur le registre modifient d’abord la session ; seul un export ou une sauvegarde écrit sur disque.", "Registry actions first modify the session; only export or save writes to disk.")],
    source: "modules/datasets/mod_datasets_ui.R"
  },
  {
    key: "description", order: "06", group: "prepare", icon: "◎",
    title: l("Description", "Description"),
    kicker: l("Obtenir une vue d’ensemble", "Get an overview"),
    purpose: l("Comprendre rapidement ce que contient un dataset avant de l’explorer ou de l’analyser plus en profondeur.", "Quickly understand what a dataset contains before exploring or analysing it in more depth."),
    question: l("À quoi ressemble mon dataset avant de commencer les analyses approfondies ?", "What does my dataset look like before deeper analyses begin?"),
    inputs: [l("Dataset sélectionné", "Selected dataset"), l("Variable de groupement", "Grouping variable"), l("Datasets du projet", "Project datasets")],
    actions: [l("Lire la vue d’ensemble, l’abondance et la richesse", "Review overview, abundance and richness"), l("Examiner séquences et complétude taxonomique", "Inspect sequences and taxonomic completeness"), l("Calculer les courbes de raréfaction à la demande", "Compute rarefaction curves on demand"), l("Repérer les outliers par règles IQR", "Detect outliers with IQR rules"), l("Comparer plusieurs datasets par heatmap, dotplot ou référence", "Compare several datasets with heatmaps, dotplots or a baseline"), l("Exporter tables et logs", "Export tables and logs")],
    outputs: [l("Diagnostic descriptif", "Descriptive diagnosis"), l("Liste d’échantillons à surveiller", "Samples to review"), l("Comparaison de datasets", "Dataset comparison"), l("Tables CSV", "CSV tables")],
    cautions: [l("Un profil atypique est un signal à examiner, pas une justification automatique de suppression.", "An atypical profile is a signal to review, not an automatic reason for removal.")],
    source: "modules/description/mod_description_ui.R",
    image: "qualite_assignation_taxonomique.png"
  },
  {
    key: "data-edition", order: "07", group: "prepare", icon: "✎",
    title: l("Data Edition", "Data Edition"),
    kicker: l("Corriger ou enrichir le dataset", "Correct or enrich the dataset"),
    purpose: l("Modifier les informations associées au dataset lorsque des corrections ou enrichissements sont nécessaires avant l’analyse.", "Modify dataset information when corrections or enrichment are needed before analysis."),
    question: l("Quelles informations dois-je corriger ou compléter avant de poursuivre ?", "Which information should I correct or complete before continuing?"),
    inputs: [l("Dataset à éditer", "Dataset to edit"), l("Tables CSV/TSV/TXT", "CSV/TSV/TXT tables"), l("RefSeq FASTA", "RefSeq FASTA"), l("Arbre NWK", "NWK tree")],
    actions: [l("Éditer cellules, colonnes et identifiants", "Edit cells, columns and identifiers"), l("Fusionner des données externes", "Merge external data"), l("Renommer automatiquement les ASV", "Automatically rename ASVs"), l("Prévisualiser et remplacer des valeurs taxonomiques", "Preview and replace taxonomic values"), l("Importer, exporter ou supprimer des composantes", "Import, export or remove components"), l("Annuler, réinitialiser et consulter les logs", "Undo, reset and inspect logs")],
    outputs: [l("Dataset corrigé", "Corrected dataset"), l("Nouveau dataset enregistré", "New saved dataset"), l("Historique des modifications", "Modification history")],
    cautions: [l("Ces opérations modifient les tables internes : les logs et le choix du nom d’enregistrement doivent être vérifiés.", "These operations modify internal tables: logs and the saved dataset name must be checked.")],
    source: "modules/dataedition/mod_dataedition_main_ui.R"
  },
  {
    key: "filtration", order: "08", group: "prepare", icon: "≋",
    title: l("Filtration", "Filtering"),
    kicker: l("Adapter le dataset à la question étudiée", "Adapt the dataset to the research question"),
    purpose: l("Préparer finement les données à analyser en sélectionnant les taxons, échantillons ou caractéristiques pertinents pour la question scientifique.", "Prepare the data for analysis by selecting the taxa, samples or characteristics relevant to the scientific question."),
    question: l("Quel sous-ensemble de mes données répond le mieux à la question étudiée ?", "Which subset of my data best addresses the research question?"),
    inputs: [l("Dataset source", "Source dataset"), l("Taxonomie", "Taxonomy"), l("Métadonnées", "Metadata"), l("Séquences", "Sequences")],
    actions: [l("Garder ou exclure des groupes taxonomiques", "Keep or exclude taxonomic groups"), l("Filtrer les ASV par reads, prévalence ou abondance relative", "Filter ASVs by reads, prevalence or relative abundance"), l("Filtrer les échantillons par profondeur, richesse, nom ou métadonnée", "Filter samples by depth, richness, name or metadata"), l("Combiner plusieurs conditions de métadonnées", "Combine multiple metadata conditions"), l("Filtrer longueur, GC, ambiguïtés et homopolymères", "Filter length, GC, ambiguities and homopolymers"), l("Relire le résumé recalculé", "Review the recalculated summary")],
    outputs: [l("Dataset filtré dérivé", "Derived filtered dataset"), l("Résumé avant/après", "Before/after summary"), l("Log de filtration", "Filtering log")],
    cautions: [l("Les seuils doivent être justifiés biologiquement ou techniquement ; le filtrage ne doit pas devenir une optimisation a posteriori.", "Thresholds require biological or technical justification; filtering should not become post-hoc optimization.")],
    source: "modules/filtration/mod_filtration_ui.R"
  },
  {
    key: "exploration", order: "09", group: "analyse", icon: "◉",
    title: l("Exploration", "Exploration"),
    kicker: l("Explorer les données sous plusieurs angles", "Explore the data from several angles"),
    purpose: l("Visualiser la composition, la diversité, les taxons partagés, la phylogénie et la qualité taxonomique dans des vues interactives et exportables.", "Visualise composition, diversity, shared taxa, phylogeny and taxonomic quality through interactive, exportable views."),
    question: l("Quelles tendances et particularités ressortent de mes données ?", "Which trends and distinctive features emerge from my data?"),
    inputs: [l("Dataset", "Dataset"), l("Groupes de métadonnées", "Metadata groups"), l("Niveau taxonomique", "Taxonomic rank")],
    actions: [l("Composer des barplots taxonomiques", "Build taxonomic barplots"), l("Comparer plusieurs indices de diversité alpha", "Compare multiple alpha diversity indices"), l("Étudier les intersections par Venn ou UpSet", "Study intersections with Venn or UpSet"), l("Localiser les motifs dans la taxonomie ou la phylogénie", "Locate patterns in taxonomy or phylogeny"), l("Évaluer la profondeur d’assignation taxonomique", "Assess taxonomic assignment depth"), l("Sauvegarder figures, paramètres et code R", "Save figures, parameters and R code")],
    outputs: [l("Figures exploratoires", "Exploratory figures"), l("Statistiques descriptives", "Descriptive statistics"), l("Historique", "History"), l("Script R autonome", "Standalone R script")],
    cautions: [l("Une visualisation exploratoire suggère des hypothèses ; elle ne constitue pas à elle seule un test confirmatoire.", "An exploratory visualization suggests hypotheses; it is not by itself a confirmatory test.")],
    source: "modules/exploration/mod_exploration_main_ui.R",
    image: "barplot.png",
    submodules: [
      { title: l("Barplot", "Barplot"), question: l("Comment la composition taxonomique varie-t-elle entre échantillons ou groupes ?", "How does taxonomic composition vary among samples or groups?"), method: l("Agrégation taxonomique, abondances et options de regroupement.", "Taxonomic aggregation, abundances and grouping options."), image: "barplot.png" },
      { title: l("Alpha-diversité", "Alpha diversity"), question: l("Comment la diversité intra-échantillon varie-t-elle entre groupes ?", "How does within-sample diversity vary among groups?"), method: l("Indices de richesse/diversité et statistiques associées.", "Richness/diversity indices and associated statistics."), image: "alpha_diversite.png" },
      { title: l("Diagramme de Venn", "Venn diagram"), question: l("Quels taxons sont partagés ou spécifiques ?", "Which taxa are shared or specific?"), method: l("Ensembles, intersections et représentation Venn/UpSet.", "Sets, intersections and Venn/UpSet representation."), image: "diagramme_venn.png" },
      { title: l("Heat Tree", "Heat Tree"), question: l("À quels niveaux taxonomiques se concentrent les différences ?", "At which taxonomic levels are differences concentrated?"), method: l("Arbre taxonomique coloré par abondance ou contraste.", "Taxonomic tree colored by abundance or contrast."), image: "heat_tree.png" },
      { title: l("Arbre phylogénétique", "Phylogenetic tree"), question: l("Comment les ASV et leurs annotations s’organisent-ils dans la phylogénie ?", "How are ASVs and their annotations organized in the phylogeny?"), method: l("Arbre associé aux données et métadonnées disponibles.", "Tree linked to available data and metadata.") },
      { title: l("Qualité taxonomique", "Taxonomic quality"), question: l("Jusqu’à quel rang les séquences sont-elles informativement assignées ?", "To which rank are sequences informatively assigned?"), method: l("Complétude et résolution des rangs taxonomiques.", "Completeness and resolution across taxonomic ranks."), image: "qualite_assignation_taxonomique.png" }
    ]
  },
  {
    key: "analyse", order: "10", group: "analyse", icon: "∴",
    title: l("Analyse", "Analysis"),
    kicker: l("Tester des structures et associations", "Test structures and associations"),
    purpose: l("Réunir analyses différentielles, ordinations, tests multivariés, comparaisons de matrices, clustering et réseaux dans un même contexte de projet.", "Bring together differential analyses, ordinations, multivariate tests, matrix comparisons, clustering and networks within one project context."),
    question: l("Les structures observées sont-elles associées aux facteurs étudiés et avec quelle robustesse ?", "Are observed structures associated with the studied factors, and how robustly?"),
    inputs: [l("Dataset préparé", "Prepared dataset"), l("Variables explicatives", "Explanatory variables"), l("Matrice ou distance", "Matrix or distance"), l("Graine aléatoire", "Random seed")],
    actions: [l("Tester l’abondance différentielle", "Test differential abundance"), l("Construire et diagnostiquer des ordinations", "Build and diagnose ordinations"), l("Comparer des matrices", "Compare matrices"), l("Explorer des réseaux d’associations", "Explore association networks"), l("Tester PERMANOVA et dispersion", "Test PERMANOVA and dispersion"), l("Rechercher des regroupements", "Search for clusters")],
    outputs: [l("Modèles et tests", "Models and tests"), l("Diagnostics", "Diagnostics"), l("Figures", "Figures"), l("Tables de résultats", "Result tables"), l("Historique reproductible", "Reproducible history")],
    cautions: [l("La validité dépend du plan expérimental, des hypothèses, de la dispersion, de la taille d’échantillon et du traitement des comparaisons multiples.", "Validity depends on experimental design, assumptions, dispersion, sample size and multiple-testing treatment."), l("Les réseaux représentent des associations exploratoires, pas nécessairement des interactions biologiques.", "Networks represent exploratory associations, not necessarily biological interactions.")],
    source: "modules/analyse/mod_analyse_main_ui.R",
    image: "ordinations.png",
    submodules: [
      { title: l("Analyses différentielles", "Differential analyses"), question: l("Quels taxons sont associés à une condition ?", "Which taxa are associated with a condition?"), method: l("ANCOM-BC et contrôle des contrastes.", "ANCOM-BC and contrast control."), image: "analyses_differentielles.png" },
      { title: l("Ordinations", "Ordinations"), question: l("Comment s’organise la structure globale des communautés ?", "How is overall community structure organized?"), method: l("Distances, réduction dimensionnelle et diagnostics.", "Distances, dimensionality reduction and diagnostics."), image: "ordinations.png" },
      { title: l("Comparaison de matrices", "Matrix comparison"), question: l("Plusieurs représentations des données racontent-elles une structure cohérente ?", "Do several data representations reveal a coherent structure?"), method: l("Comparaisons et concordances entre matrices.", "Comparisons and concordance among matrices."), image: "comparaison_matrices.png" },
      { title: l("Réseaux d’associations", "Association networks"), question: l("Quelles associations conditionnelles ou corrélatives émergent entre taxons ?", "Which conditional or correlational associations emerge among taxa?"), method: l("Construction et exploration prudente de réseaux.", "Cautious construction and exploration of networks.") },
      { title: l("PERMANOVA / Dispersion", "PERMANOVA / Dispersion"), question: l("Une variable explique-t-elle une part de la structure multivariée ?", "Does a variable explain part of the multivariate structure?"), method: l("Test par permutations complété par le contrôle de dispersion.", "Permutation test completed by a dispersion check."), image: "permanova_dispersion.png" },
      { title: l("Clustering", "Clustering"), question: l("Des regroupements naturels sont-ils compatibles avec les données ?", "Are natural groupings compatible with the data?"), method: l("Choix de distance, algorithme et diagnostics de partition.", "Choice of distance, algorithm and partition diagnostics."), image: "clustering.png" }
    ]
  },
  {
    key: "multiview", order: "11", group: "report", icon: "▤",
    title: l("MultiView", "MultiView"),
    kicker: l("Comparer et composer les résultats", "Compare and compose results"),
    purpose: l("Retrouver les figures enregistrées, les juxtaposer dans des grilles réutilisables et exporter une composition destinée à la discussion ou à la restitution.", "Retrieve saved figures, arrange them in reusable grids and export a composition for discussion or reporting."),
    question: l("Comment lire plusieurs résultats ensemble sans perdre leur contexte ?", "How can several results be read together without losing their context?"),
    inputs: [l("Figures des historiques", "Figures from histories"), l("Favoris et tags", "Favorites and tags"), l("Composition sauvegardée", "Saved composition")],
    actions: [l("Rechercher, filtrer et trier la bibliothèque", "Search, filter and sort the library"), l("Sélectionner ou glisser-déposer des figures", "Select or drag and drop figures"), l("Choisir une disposition de grille", "Choose a grid layout"), l("Examiner les détails d’une analyse", "Inspect analysis details"), l("Sauvegarder ou importer une composition", "Save or import a composition"), l("Exporter un PNG composite", "Export a composite PNG")],
    outputs: [l("Composition multi-figures", "Multi-figure composition"), l("PNG composite", "Composite PNG"), l("Composition RDS réutilisable", "Reusable RDS composition")],
    cautions: [l("Les favoris et tags sont partagés à l’échelle de l’installation et ne sont pas isolés par utilisateur.", "Favorites and tags are shared at installation level and are not isolated by user.")],
    source: "modules/multiview/mod_multiview_ui.R",
    image: "comparaison_matrices.png"
  },
  {
    key: "app-theme", order: "12", group: "report", icon: "◐",
    title: l("App Theme", "App Theme"),
    kicker: l("Adapter l’interface sans perdre la lisibilité", "Adapt the interface without losing readability"),
    purpose: l("Appliquer l’un des trente presets d’interface, prévisualiser ses composants et contrôler le contraste des couples texte/fond.", "Apply one of thirty interface presets, preview its components and check text/background contrast."),
    question: l("Quelle apparence permet une lecture confortable dans mon contexte de travail ?", "Which appearance supports comfortable reading in my work context?"),
    inputs: [l("30 thèmes prédéfinis", "30 presets"), l("Préférences locales", "Local preferences")],
    actions: [l("Parcourir les familles de thèmes", "Browse theme families"), l("Appliquer immédiatement un preset", "Instantly apply a preset"), l("Prévisualiser navigation, cartes, liens et boutons", "Preview navigation, cards, links and buttons"), l("Contrôler les niveaux WCAG AA et AAA", "Check WCAG AA and AAA levels")],
    outputs: [l("Thème actif", "Active theme"), l("Préférence conservée sur la machine", "Preference retained on the machine"), l("Diagnostic de contraste", "Contrast diagnosis")],
    cautions: [l("Le thème change la présentation de l’interface, pas les données ni les résultats calculés.", "The theme changes interface presentation, not data or computed results.")],
    source: "modules/theme/mod_theme_ui.R"
  },
  {
    key: "parametres", order: "13", group: "report", icon: "⚙",
    title: l("Paramètres", "Settings"),
    kicker: l("Définir les préférences globales", "Define global preferences"),
    purpose: l("Configurer le comportement général de l’application : sauvegarde, reprise, graine, exports, stockage et consentement à la télémétrie.", "Configure general application behavior: saving, resuming, seed, exports, storage and telemetry consent."),
    question: l("Quelles valeurs doivent être constantes entre mes sessions et mes analyses ?", "Which values should remain consistent across sessions and analyses?"),
    inputs: [l("Préférences de session", "Session preferences"), l("Contraintes de stockage", "Storage constraints"), l("Choix de confidentialité", "Privacy choices")],
    actions: [l("Régler l’autosave et son intervalle", "Set autosave and its interval"), l("Restaurer le dernier onglet et les réglages", "Restore the last tab and settings"), l("Définir langue et thème de démarrage", "Set startup language and theme"), l("Fixer la graine aléatoire proposée", "Set the proposed random seed"), l("Choisir la résolution d’export PNG", "Choose PNG export resolution"), l("Gérer rétention, stockage et télémétrie", "Manage retention, storage and telemetry")],
    outputs: [l("Préférences persistantes", "Persistent preferences"), l("Exports cohérents", "Consistent exports"), l("Comportement de session reproductible", "Reproducible session behavior")],
    cautions: [l("La graine globale est une valeur proposée aux modules ; les interfaces déjà ouvertes conservent la valeur avec laquelle elles ont été construites.", "The global seed is proposed to modules; already opened interfaces retain the value used when they were built."), l("La télémétrie porte sur l’usage et les erreurs, jamais sur les tables, métadonnées ou noms d’échantillons.", "Telemetry covers usage and errors, never tables, metadata or sample names.")],
    source: "modules/settings/mod_settings_ui.R"
  }
];

export const moduleScreens: Record<string, ModuleScreen> = {
  accueil: {
    image: "barcoder-home-real.png",
    title: l("Reprendre le projet en un regard", "Resume the project at a glance"),
    description: l(
      "Le tableau de bord rassemble l’état de sauvegarde, le dataset actif et ses indicateurs clés, puis matérialise la progression dans le parcours analytique pour orienter immédiatement la prochaine action.",
      "The dashboard combines save status, the active dataset and its key indicators, then shows progress through the analytical workflow to make the next action immediately clear."
    )
  },
  documentation: {
    image: "screen-documentation.png",
    title: l("Une documentation située dans l’interface", "Documentation embedded in the interface"),
    description: l(
      "L’écran organise l’aide par onglet et sous-module, ici le Barplot d’Exploration, avec deux niveaux complémentaires : un guide méthodologique pour comprendre la logique et une référence pour retrouver chaque règle.",
      "The screen organizes help by tab and submodule, here the Exploration Barplot, with two complementary levels: a methodological guide for understanding the logic and a reference for looking up every rule."
    )
  },
  openmetabar: {
    image: "screen-openmetabar.png",
    title: l("Préparer un run avant sa soumission", "Prepare a run before submission"),
    description: l(
      "Cette première étape verrouille le contexte technique — technologie, marqueur, base de référence et connexion au cluster — avant d’autoriser le choix des FASTQ et la configuration détaillée du pipeline.",
      "This first step locks down the technical context—technology, marker, reference database and cluster connection—before enabling FASTQ selection and detailed pipeline configuration."
    )
  },
  "input-data": {
    image: "screen-input-data.png",
    title: l("Importer un objet existant", "Import an existing object"),
    description: l(
      "L’onglet reçoit un objet phyloseq ou un projet sauvegardé aux formats R, détecte automatiquement son type et annonce les normalisations appliquées aux identifiants et aux métadonnées.",
      "The tab accepts a phyloseq object or saved project in R formats, automatically detects its type and reports the normalizations applied to identifiers and metadata."
    )
  },
  datasets: {
    image: "screen-datasets.png",
    title: l("Piloter le dataset actif et les projets", "Manage the active dataset and projects"),
    description: l(
      "La partie haute définit le dataset de travail global ; le registre inférieur sert à sauvegarder, recharger, dupliquer, importer ou exporter des projets et leurs jeux de données.",
      "The upper area defines the application-wide working dataset; the registry below is used to save, reload, duplicate, import or export projects and their datasets."
    )
  },
  description: {
    image: "screen-description.png",
    title: l("Diagnostiquer la structure du dataset", "Diagnose dataset structure"),
    description: l(
      "Cette vue synthétise immédiatement richesse, nombre d’échantillons, profondeur médiane et sparsité, tout en indiquant les composantes disponibles et les points d’attention avant exploration ou test.",
      "This view immediately summarizes richness, sample count, median depth and sparsity, while indicating available components and points to review before exploration or testing."
    )
  },
  "data-edition": {
    image: "screen-data-edition.png",
    title: l("Organiser les corrections par composante", "Organize corrections by component"),
    description: l(
      "Après le choix du dataset, des panneaux séparés donnent accès aux métadonnées, à l’OTU table, à la taxonomie, aux imports et exports, aux journaux et à l’enregistrement du nouvel état.",
      "After choosing the dataset, separate panels provide access to metadata, the OTU table, taxonomy, imports and exports, logs and saving the new state."
    )
  },
  exploration: {
    image: "screen-exploration.png",
    title: l("Construire un Barplot de façon explicite", "Build a Barplot explicitly"),
    description: l(
      "Le sous-module sépare le contexte du dataset des paramètres qui déclenchent un recalcul : sélection taxonomique, définition des inconnus et regroupement restent visibles avant la génération de la figure.",
      "The submodule separates dataset context from parameters that trigger recalculation: taxonomic selection, unknown-value definition and grouping remain visible before the figure is generated."
    )
  },
  analyse: {
    image: "screen-analyse.png",
    title: l("Paramétrer une analyse différentielle", "Configure a differential analysis"),
    description: l(
      "L’écran réunit le choix des datasets, des moteurs statistiques, du modèle, des corrections multiples, des effets aléatoires et de la graine afin de rendre l’exécution relisible et reproductible.",
      "The screen brings together dataset selection, statistical engines, model settings, multiple-testing corrections, random effects and the seed so execution remains reviewable and reproducible."
    )
  },
  multiview: {
    image: "screen-multiview.png",
    title: l("Retrouver et comparer les figures enregistrées", "Retrieve and compare saved figures"),
    description: l(
      "La bibliothèque combine indicateurs, recherche, période, tri, favoris et filtres par type avec une galerie de résultats, afin de sélectionner plusieurs figures sans perdre leur dataset ni leur contexte analytique.",
      "The library combines indicators, search, date range, sorting, favorites and type filters with a results gallery, allowing several figures to be selected without losing their dataset or analytical context."
    )
  },
  "app-theme": {
    image: "screen-app-theme.png",
    title: l("Choisir un thème en contrôlant sa lisibilité", "Choose a theme while checking readability"),
    description: l(
      "Les presets sont classés par familles chromatiques et accompagnés d’un aperçu des composants ; le panneau de lisibilité vérifie en parallèle les contrastes WCAG des principaux couples texte-fond.",
      "Presets are grouped into color families and paired with a component preview; the readability panel simultaneously checks WCAG contrast for the main text-background pairs."
    )
  },
  parametres: {
    image: "screen-parametres.png",
    title: l("Rendre le comportement de session prévisible", "Make session behavior predictable"),
    description: l(
      "Les préférences globales contrôlent ici la sauvegarde automatique, la reprise du dernier onglet et les choix appliqués au démarrage, notamment la langue et le thème de l’interface.",
      "Global preferences control automatic saving, restoration of the last tab and the choices applied at startup, including interface language and theme."
    )
  }
};

export const groups = {
  orient: l("S’orienter", "Orient"),
  input: l("Importer", "Import"),
  prepare: l("Contrôler et préparer", "Check and prepare"),
  analyse: l("Explorer et tester", "Explore and test"),
  report: l("Restituer et configurer", "Report and configure")
};
