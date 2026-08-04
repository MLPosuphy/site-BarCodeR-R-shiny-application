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
    kicker: l("Des FASTQ à un objet analysable", "From FASTQ to an analysable object"),
    purpose: l("Préparer, soumettre et suivre un pipeline de métabarcoding sur une infrastructure distante, puis récupérer ses sorties dans BarCodeR.", "Prepare, submit and monitor a metabarcoding pipeline on remote infrastructure, then retrieve its outputs in BarCodeR."),
    question: l("Comment transformer un run de séquençage documenté en objet phyloseq traçable ?", "How can a documented sequencing run become a traceable phyloseq object?"),
    inputs: [l("Fichiers FASTQ", "FASTQ files"), l("Design file", "Design file"), l("Base de référence", "Reference database"), l("Accès SSH/Slurm", "SSH/Slurm access")],
    actions: [l("Valider la connexion au cluster", "Validate the cluster connection"), l("Choisir les fichiers en local ou sur le cluster", "Choose files locally or on the cluster"), l("Configurer technologie, marqueur, moteur et ressources", "Configure technology, marker, engine and resources"), l("Vérifier les aperçus avant soumission", "Review previews before submission"), l("Suivre les étapes, logs et historique du run", "Monitor run steps, logs and history"), l("Récupérer les sorties et importer le phyloseq", "Retrieve outputs and import the phyloseq object")],
    outputs: [l("Run Nextflow DSL2", "Nextflow DSL2 run"), l("Journaux d’exécution", "Execution logs"), l("Historique cluster", "Cluster history"), l("Objet phyloseq avec provenance", "Phyloseq object with provenance")],
    cautions: [l("Une infrastructure SSH/Slurm correctement configurée est nécessaire.", "A properly configured SSH/Slurm infrastructure is required."), l("Les paramètres disponibles dépendent de la technologie, du marqueur et du moteur choisis.", "Available parameters depend on the selected technology, marker and engine.")],
    source: "modules/openmetabar/mod_OpenMetaBar_ui.R"
  },
  {
    key: "input-data", order: "04", group: "input", icon: "↓",
    title: l("Input data", "Input data"),
    kicker: l("Importer un objet ou restaurer un projet", "Import an object or restore a project"),
    purpose: l("Importer un dataset phyloseq ou un projet BarCodeR sauvegardé, avec une détection automatique et un compte rendu des normalisations appliquées.", "Import a phyloseq dataset or saved BarCodeR project, with automatic detection and a report of applied normalizations."),
    question: l("Comment introduire proprement un objet existant dans la session ?", "How can an existing object be cleanly introduced into the session?"),
    inputs: [l("Fichier .rds", ".rds file"), l("Fichier .RData ou .rda", ".RData or .rda file")],
    actions: [l("Détecter dataset unique ou projet complet", "Detect a single dataset or full project"), l("Standardiser les caractères spéciaux des identifiants", "Standardize special characters in identifiers"), l("Remplacer les cellules vides des métadonnées par NA", "Replace empty metadata cells with NA"), l("Examiner le récapitulatif après import", "Review the post-import summary")],
    outputs: [l("Dataset ajouté au registre", "Dataset added to the registry"), l("Projet restauré", "Restored project"), l("Journal des remplacements", "Replacement log")],
    cautions: [l("L’import des tables séparées se fait dans Data Edition, pas dans cet onglet.", "Separate component tables are imported in Data Edition, not in this tab.")],
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
    kicker: l("Contrôler avant d’interpréter", "Check before interpreting"),
    purpose: l("Examiner la structure, la profondeur, la richesse, la complétude et les profils atypiques d’un dataset ou comparer plusieurs objets d’un projet.", "Inspect dataset structure, depth, richness, completeness and atypical profiles, or compare several project objects."),
    question: l("Mes données sont-elles suffisamment cohérentes et documentées pour poursuivre l’analyse ?", "Are my data sufficiently coherent and documented to continue the analysis?"),
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
    kicker: l("Modifier avec une trace", "Edit with a trace"),
    purpose: l("Corriger ou enrichir les métadonnées, l’OTU table, la taxonomie et les composantes phylogénétiques tout en conservant un historique des changements.", "Correct or enrich metadata, the OTU table, taxonomy and phylogenetic components while preserving a history of changes."),
    question: l("Quelles corrections structurelles sont nécessaires avant filtrage ou analyse ?", "Which structural corrections are needed before filtering or analysis?"),
    inputs: [l("Dataset à éditer", "Dataset to edit"), l("Tables CSV/TSV/TXT", "CSV/TSV/TXT tables"), l("RefSeq FASTA", "RefSeq FASTA"), l("Arbre NWK", "NWK tree")],
    actions: [l("Éditer cellules, colonnes et identifiants", "Edit cells, columns and identifiers"), l("Fusionner des données externes", "Merge external data"), l("Renommer automatiquement les ASV", "Automatically rename ASVs"), l("Prévisualiser et remplacer des valeurs taxonomiques", "Preview and replace taxonomic values"), l("Importer, exporter ou supprimer des composantes", "Import, export or remove components"), l("Annuler, réinitialiser et consulter les logs", "Undo, reset and inspect logs")],
    outputs: [l("Dataset corrigé", "Corrected dataset"), l("Nouveau dataset enregistré", "New saved dataset"), l("Historique des modifications", "Modification history")],
    cautions: [l("Ces opérations modifient les tables internes : les logs et le choix du nom d’enregistrement doivent être vérifiés.", "These operations modify internal tables: logs and the saved dataset name must be checked.")],
    source: "modules/dataedition/mod_dataedition_main_ui.R"
  },
  {
    key: "filtration", order: "08", group: "prepare", icon: "≋",
    title: l("Filtration", "Filtering"),
    kicker: l("Construire un sous-dataset explicite", "Build an explicit subset"),
    purpose: l("Combiner des critères taxonomiques, d’abondance, de prévalence, d’échantillons et de séquences pour produire un dataset dérivé dont les modifications restent tracées.", "Combine taxonomic, abundance, prevalence, sample and sequence criteria to produce a derived dataset whose modifications remain traceable."),
    question: l("Quelles observations doivent être conservées pour répondre proprement à la question étudiée ?", "Which observations should be retained to properly address the research question?"),
    inputs: [l("Dataset source", "Source dataset"), l("Taxonomie", "Taxonomy"), l("Métadonnées", "Metadata"), l("Séquences", "Sequences")],
    actions: [l("Garder ou exclure des groupes taxonomiques", "Keep or exclude taxonomic groups"), l("Filtrer les ASV par reads, prévalence ou abondance relative", "Filter ASVs by reads, prevalence or relative abundance"), l("Filtrer les échantillons par profondeur, richesse, nom ou métadonnée", "Filter samples by depth, richness, name or metadata"), l("Combiner plusieurs conditions de métadonnées", "Combine multiple metadata conditions"), l("Filtrer longueur, GC, ambiguïtés et homopolymères", "Filter length, GC, ambiguities and homopolymers"), l("Relire le résumé recalculé", "Review the recalculated summary")],
    outputs: [l("Dataset filtré dérivé", "Derived filtered dataset"), l("Résumé avant/après", "Before/after summary"), l("Log de filtration", "Filtering log")],
    cautions: [l("Les seuils doivent être justifiés biologiquement ou techniquement ; le filtrage ne doit pas devenir une optimisation a posteriori.", "Thresholds require biological or technical justification; filtering should not become post-hoc optimization.")],
    source: "modules/filtration/mod_filtration_ui.R"
  },
  {
    key: "exploration", order: "09", group: "analyse", icon: "◉",
    title: l("Exploration", "Exploration"),
    kicker: l("Décrire les motifs biologiques", "Describe biological patterns"),
    purpose: l("Explorer composition, diversité, partage taxonomique, structure phylogénétique et qualité d’assignation avec des paramètres visibles et des historiques sauvegardés.", "Explore composition, diversity, taxonomic overlap, phylogenetic structure and assignment quality with visible parameters and saved histories."),
    question: l("Quels motifs descriptifs structurent le jeu de données avant les tests confirmatoires ?", "Which descriptive patterns structure the dataset before confirmatory testing?"),
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

export const groups = {
  orient: l("S’orienter", "Orient"),
  input: l("Importer", "Import"),
  prepare: l("Contrôler et préparer", "Check and prepare"),
  analyse: l("Explorer et tester", "Explore and test"),
  report: l("Restituer et configurer", "Report and configure")
};
