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
    kicker: l("Trouver rapidement la bonne documentation", "Quickly find the right documentation"),
    purpose: l("Servir de point d’entrée vers la documentation BarCodeR unifiée en orientant l’utilisateur vers le bon module, le bon guide ou la bonne référence sans dupliquer le contenu dans l’application.", "Act as the entry point to the unified BarCodeR documentation by directing users to the right module, guide or reference without duplicating content inside the application."),
    question: l("Où trouver l’explication correspondant à l’onglet, à l’action ou à la méthode que j’utilise ?", "Where can I find the explanation for the tab, action or method I am using?"),
    inputs: [l("Une question sur l’utilisation de BarCodeR", "A question about using BarCodeR"), l("Un onglet, un sous-module ou un terme à retrouver", "A tab, submodule or term to find")],
    actions: [l("Utiliser les accès rapides pour les besoins fréquents", "Use quick links for common needs"), l("Rechercher localement dans le sommaire", "Search locally within the table of contents"), l("Parcourir les catégories et cartes organisées par objectif", "Browse categories and cards organised by goal"), l("Ouvrir directement le guide ou la référence du module concerné", "Open the guide or reference for the relevant module directly")],
    outputs: [l("Accès au guide méthodologique adapté", "Access to the relevant methodological guide"), l("Accès à la référence technique lorsque nécessaire", "Access to the technical reference when needed"), l("Lien direct vers la rubrique recherchée", "Direct link to the requested section")],
    cautions: [l("La recherche de l’onglet filtre le sommaire et ses mots-clés ; elle ne recherche pas dans l’intégralité du texte des pages documentaires.", "The tab search filters the table of contents and its keywords; it does not search the full text of documentation pages.")],
    source: "modules/documentation/mod_documentation_ui.R"
  },
  {
    key: "openmetabar", order: "03", group: "input", icon: "⇢",
    title: l("OpenMetaBar", "OpenMetaBar"),
    kicker: l("Module optionnel · partir directement des FASTQ", "Optional module · start directly from FASTQ"),
    purpose: l("Prendre en charge l’étape qui précède l’analyse lorsque le projet démarre avec des FASTQ : préparer le traitement OpenMetaBar, le lancer sur l’infrastructure de calcul configurée, suivre son avancement puis intégrer le phyloseq obtenu dans BarCodeR.", "Handle the step before analysis when a project starts from FASTQ: prepare the OpenMetaBar processing, launch it on the configured compute infrastructure, monitor progress and then integrate the resulting phyloseq into BarCodeR."),
    question: l("Comment passer de mes FASTQ à un objet phyloseq prêt à être analysé dans BarCodeR ?", "How can I go from FASTQ files to a phyloseq object ready for analysis in BarCodeR?"),
    inputs: [l("Fichiers FASTQ et design expérimental", "FASTQ files and experimental design"), l("Base de référence adaptée au projet", "Reference database suited to the project"), l("Accès à une infrastructure de calcul compatible", "Access to compatible compute infrastructure")],
    actions: [l("Vérifier l’accès à l’infrastructure et sélectionner les fichiers nécessaires", "Check infrastructure access and select the required files"), l("Configurer puis relire le traitement avant son lancement", "Configure and review processing before launch"), l("Lancer le run et suivre son avancement ainsi que ses journaux", "Launch the run and monitor its progress and logs"), l("Récupérer le phyloseq obtenu et l’ajouter aux datasets BarCodeR", "Retrieve the resulting phyloseq and add it to BarCodeR datasets")],
    outputs: [l("Traitement bioinformatique suivi depuis BarCodeR", "Bioinformatics processing monitored from BarCodeR"), l("Journaux et état du run", "Run logs and status"), l("Résultats conservés sur l’infrastructure configurée", "Results retained on the configured infrastructure"), l("Objet phyloseq intégré au projet avec sa provenance", "Phyloseq object integrated into the project with its provenance")],
    cautions: [l("OpenMetaBar est facultatif : si vous disposez déjà d’un objet phyloseq, importez-le directement dans BarCodeR sans passer par cet onglet.", "OpenMetaBar is optional: if you already have a phyloseq object, import it directly into BarCodeR without using this tab."), l("Ce module nécessite une infrastructure distante compatible et correctement configurée pour votre installation.", "This module requires compatible remote infrastructure correctly configured for your installation."), l("Les FASTQ utilisés par OpenMetaBar sont traités sur cette infrastructure distante ; les analyses réalisées ensuite dans BarCodeR utilisent le phyloseq récupéré.", "FASTQ files used by OpenMetaBar are processed on this remote infrastructure; subsequent BarCodeR analyses use the retrieved phyloseq object.")],
    source: "modules/openmetabar/mod_openmetabar_ui.R"
  },
  {
    key: "input-data", order: "04", group: "input", icon: "↓",
    title: l("Input data", "Input data"),
    kicker: l("Importer des données déjà préparées", "Import already prepared data"),
    purpose: l("Ajouter au projet un ou plusieurs objets phyloseq complets ou partiels déjà construits à partir d’un fichier R, avec un contrôle de cohérence et un récapitulatif des ajustements effectués à l’import.", "Add one or more complete or partial existing phyloseq objects from an R file, with consistency checks and a summary of adjustments made during import."),
    question: l("Comment intégrer un objet phyloseq existant dans mon projet BarCodeR ?", "How can I bring an existing phyloseq object into my BarCodeR project?"),
    inputs: [l("Fichier .rds contenant un objet phyloseq complet ou partiel", ".rds file containing a complete or partial phyloseq object"), l("Fichier .RData/.rda/.rdata contenant un ou plusieurs objets phyloseq compatibles", ".RData/.rda/.rdata file containing one or more compatible phyloseq objects")],
    actions: [l("Déposer le fichier et sélectionner l’objet lorsqu’il en contient plusieurs", "Upload the file and select the object when it contains several"), l("Contrôler les composantes et la cohérence des identifiants", "Check components and identifier consistency"), l("Relire les normalisations proposées avant validation", "Review proposed normalisations before validation"), l("Ajouter ou remplacer les datasets dans le registre du projet", "Add or replace datasets in the project registry")],
    outputs: [l("Un ou plusieurs datasets disponibles dans BarCodeR", "One or more datasets available in BarCodeR"), l("Dataset actif mis à jour", "Updated active dataset"), l("Rapport d’import et des éventuelles normalisations", "Import and normalisation report")],
    cautions: [l("BarCodeR peut standardiser certains identifiants d’échantillons et convertir les cellules de métadonnées vides en valeurs manquantes ; ces changements sont récapitulés à l’import.", "BarCodeR may standardise some sample identifiers and convert empty metadata cells to missing values; these changes are summarised during import."), l("Cet onglet importe des objets phyloseq déjà construits : il n’assemble pas plusieurs tables indépendantes pour créer un nouvel objet.", "This tab imports already constructed phyloseq objects; it does not assemble independent tables into a new object.")],
    source: "modules/data/mod_data_loader_ui.R"
  },
  {
    key: "datasets", order: "05", group: "prepare", icon: "▦",
    title: l("Datasets", "Datasets"),
    kicker: l("Organiser datasets et projets", "Organise datasets and projects"),
    purpose: l("Centraliser les datasets d’un projet, choisir celui qui sert de référence dans l’application et gérer la sauvegarde, la reprise ou le partage du projet.", "Centralise project datasets, choose the one used as the application-wide reference and manage project saving, resuming or sharing."),
    question: l("Sur quel dataset est-ce que je travaille et comment conserver l’ensemble du projet ?", "Which dataset am I working on and how can I preserve the whole project?"),
    inputs: [l("Datasets présents dans le projet", "Datasets present in the project"), l("Projet courant ou projets sauvegardés", "Current or saved projects"), l("Archive BarCodeR .zip à importer", "BarCodeR .zip archive to import")],
    actions: [l("Définir le dataset actif pour toute l’application", "Set the active dataset for the whole application"), l("Renommer, annoter, dupliquer, réordonner, exporter ou supprimer des datasets", "Rename, annotate, duplicate, reorder, export or delete datasets"), l("Créer, ouvrir, renommer, dupliquer ou supprimer des projets", "Create, open, rename, duplicate or delete projects"), l("Sauvegarder le projet et importer ou exporter une archive portable", "Save the project and import or export a portable archive")],
    outputs: [l("Dataset actif clairement identifié", "Clearly identified active dataset"), l("Projet sauvegardé avec ses datasets et historiques de figures", "Saved project with its datasets and figure histories"), l("Archive .zip partageable ou archivable", "Shareable or archivable .zip file")],
    cautions: [l("Les modifications du registre vivent d’abord dans la session. Elles sont conservées sur disque lorsque le projet est sauvegardé, manuellement ou par l’autosave si celui-ci a été activé dans Paramètres.", "Registry changes first live in the session. They are persisted to disk when the project is saved, manually or by autosave if enabled in Settings.")],
    source: "modules/datasets/mod_datasets_ui.R"
  },
  {
    key: "description", order: "06", group: "prepare", icon: "◎",
    title: l("Description", "Description"),
    kicker: l("Obtenir une vue d’ensemble", "Get an overview"),
    purpose: l("Obtenir une vue d’ensemble d’un dataset ou du projet avant les analyses approfondies, sans modifier les données.", "Get an overview of a dataset or the project before deeper analyses, without modifying the data."),
    question: l("Que contient mon dataset et quels points méritent d’être examinés avant l’analyse ?", "What does my dataset contain and which points deserve review before analysis?"),
    inputs: [l("Dataset sélectionné", "Selected dataset"), l("Variable de groupement facultative", "Optional grouping variable"), l("Autres datasets du projet pour les comparaisons", "Other project datasets for comparisons")],
    actions: [l("Résumer la structure, les composantes et la provenance du dataset", "Summarise dataset structure, components and provenance"), l("Explorer profondeur, richesse, séquences et complétude des données", "Explore depth, richness, sequences and data completeness"), l("Examiner raréfaction et échantillons atypiques lorsque nécessaire", "Review rarefaction and atypical samples when needed"), l("Comparer plusieurs datasets du projet sur des indicateurs communs", "Compare several project datasets using common indicators")],
    outputs: [l("Vue d’ensemble du dataset", "Dataset overview"), l("Points d’attention à examiner avant l’analyse", "Points to review before analysis"), l("Comparaisons entre datasets du projet", "Comparisons among project datasets"), l("Tables et journaux exportables", "Exportable tables and logs")],
    cautions: [l("Description ne modifie pas le dataset. Un échantillon atypique ou un indicateur inhabituel est un signal à examiner, pas une justification automatique de suppression.", "Description does not modify the dataset. An atypical sample or unusual indicator is a signal to review, not an automatic reason for removal.")],
    source: "modules/description/mod_description_ui.R",
    image: "qualite_assignation_taxonomique.png"
  },
  {
    key: "data-edition", order: "07", group: "prepare", icon: "✎",
    title: l("Data Edition", "Data Edition"),
    kicker: l("Corriger ou enrichir le dataset", "Correct or enrich the dataset"),
    purpose: l("Corriger ou enrichir les composantes d’un dataset avant l’analyse, tout en conservant un journal des transformations appliquées.", "Correct or enrich dataset components before analysis while keeping an audit trail of applied transformations."),
    question: l("Quelles informations dois-je corriger, compléter ou remplacer avant de poursuivre ?", "Which information should I correct, complete or replace before continuing?"),
    inputs: [l("Dataset à éditer", "Dataset to edit"), l("Fichiers CSV/TSV/TXT pour les tables", "CSV/TSV/TXT files for tables"), l("Séquences de référence FASTA", "FASTA reference sequences"), l("Arbre phylogénétique NWK", "NWK phylogenetic tree")],
    actions: [l("Modifier les métadonnées, l’OTU table ou la taxonomie dans des tableaux éditables", "Edit metadata, the OTU table or taxonomy in editable tables"), l("Ajouter, supprimer ou renommer des variables, échantillons ou rangs selon la composante", "Add, remove or rename variables, samples or ranks depending on the component"), l("Importer, exporter ou retirer des composantes optionnelles du phyloseq", "Import, export or remove optional phyloseq components"), l("Annuler, réinitialiser et relire le journal des modifications", "Undo, reset and review the modification log")],
    outputs: [l("Dataset édité dans le registre", "Edited dataset in the registry"), l("Possibilité de conserver l’état sous le même nom ou sous un nouveau nom", "Option to keep the state under the same name or a new name"), l("Journal détaillé des modifications", "Detailed modification log"), l("Composantes exportables séparément", "Components exportable separately")],
    cautions: [l("Les modifications sont appliquées au dataset sélectionné dans la session au fur et à mesure. Lors de l’enregistrement, conserver le même nom met à jour ce dataset ; choisir un autre nom crée une copie de l’état édité.", "Changes are applied to the selected dataset in the session as you edit. When saving, keeping the same name updates that dataset; choosing another name creates a copy of the edited state."), l("La sauvegarde du projet complet se fait dans l’onglet Datasets.", "Saving the complete project is handled in the Datasets tab.")],
    source: "modules/dataedition/mod_dataedition_main_ui.R"
  },
  {
    key: "filtration", order: "08", group: "prepare", icon: "≋",
    title: l("Filtration", "Filtering"),
    kicker: l("Adapter le dataset à la question étudiée", "Adapt the dataset to the research question"),
    purpose: l("Préparer un dataset adapté à la question scientifique en appliquant des critères de sélection sur les taxons, les abondances, les échantillons ou les séquences.", "Prepare a dataset suited to the scientific question by applying selection criteria to taxa, abundances, samples or sequences."),
    question: l("Quelles données dois-je conserver pour répondre au mieux à la question étudiée ?", "Which data should I retain to best address the research question?"),
    inputs: [l("Dataset source", "Source dataset"), l("Taxonomie et métadonnées lorsqu’elles sont disponibles", "Taxonomy and metadata when available"), l("Séquences de référence pour les filtres techniques", "Reference sequences for technical filters")],
    actions: [l("Activer les filtres taxonomiques, d’abondance, d’échantillons ou de séquences nécessaires", "Enable the required taxonomy, abundance, sample or sequence filters"), l("Ajuster les seuils en observant immédiatement leur effet sur les distributions", "Adjust thresholds while immediately seeing their effect on distributions"), l("Combiner plusieurs conditions sur les métadonnées lorsque le plan d’étude le demande", "Combine several metadata conditions when required by the study design"), l("Relire les éléments supprimés, les paramètres et le bilan avant/après avant d’enregistrer", "Review removed items, parameters and the before/after summary before saving")],
    outputs: [l("Aperçu filtré recalculé en direct", "Filtered preview recalculated live"), l("Version filtrée enregistrable sous le même nom ou comme nouveau dataset", "Filtered version that can be saved under the same name or as a new dataset"), l("Journal détaillé des filtres et des éléments supprimés", "Detailed log of filters and removed items"), l("Exports des tables filtrées et BIOM lorsque disponible", "Exports of filtered tables and BIOM when available")],
    cautions: [l("Le recalcul des filtres est immédiat, mais le registre n’est modifié qu’au moment de l’enregistrement. Laisser le nom vide remplace alors le dataset parent ; utilisez un nouveau nom pour conserver les deux versions.", "Filters recalculate immediately, but the registry changes only when the filtered result is saved. Leaving the name empty then replaces the parent dataset; use a new name to keep both versions."), l("Les seuils doivent rester justifiés biologiquement ou techniquement et ne pas être choisis uniquement pour améliorer un résultat a posteriori.", "Thresholds should remain biologically or technically justified and not be chosen solely to improve a result after the fact.")],
    source: "modules/filtration/mod_filtration_ui.R"
  },
  {
    key: "exploration", order: "09", group: "analyse", icon: "◉",
    title: l("Exploration", "Exploration"),
    kicker: l("Faire émerger les structures à approfondir", "Reveal patterns worth investigating"),
    purpose: l("Explorer la composition, la diversité, les éléments partagés, la phylogénie et la qualité des assignations à travers des visualisations interactives, avec des comparaisons ciblées lorsque l’onglet le permet.", "Explore composition, diversity, shared features, phylogeny and assignment quality through interactive visualisations, with targeted comparisons where supported."),
    question: l("Quelles structures, différences ou limites de qualité méritent d’être approfondies ?", "Which patterns, differences or quality limits deserve deeper investigation?"),
    inputs: [l("Un dataset du projet", "A project dataset"), l("Des métadonnées lorsque des groupes doivent être comparés", "Metadata when groups need to be compared"), l("Taxonomie, séquences ou arbre selon la vue utilisée", "Taxonomy, sequences or tree depending on the selected view")],
    actions: [l("Explorer la composition taxonomique et cibler un taxon d’intérêt", "Explore taxonomic composition and target a taxon of interest"), l("Comparer richesse et diversité au sein des échantillons", "Compare richness and diversity within samples"), l("Identifier les taxons ou séquences partagés et spécifiques", "Identify shared and specific taxa or sequences"), l("Parcourir la structure taxonomique ou phylogénétique et la qualité des assignations", "Explore taxonomic or phylogenetic structure and assignment quality"), l("Sauvegarder les figures et retrouver leur contexte pour les comparer ou les reproduire", "Save figures and retain their context for comparison or reproduction")],
    outputs: [l("Visualisations interactives", "Interactive visualisations"), l("Comparaisons ciblées lorsque disponibles", "Targeted comparisons where available"), l("Tables et figures exportables", "Exportable tables and figures"), l("Historique des figures avec code R reproductible", "Figure history with reproducible R code")],
    cautions: [l("L’Exploration sert d’abord à comprendre les données et à faire émerger des hypothèses. Les comparaisons proposées dans certains sous-modules ne remplacent pas les analyses globales adaptées à une question multivariée ou à l’ensemble des taxons.", "Exploration is primarily used to understand the data and generate hypotheses. Comparisons available in some submodules do not replace global analyses suited to multivariate questions or the full taxon set."), l("Certaines vues nécessitent des composantes spécifiques du phyloseq, comme une taxonomie, des séquences de référence ou un arbre phylogénétique.", "Some views require specific phyloseq components such as taxonomy, reference sequences or a phylogenetic tree.")],
    source: "modules/exploration/mod_exploration_main_ui.R",
    image: "barplot.png",
    submodules: [
      { title: l("Barplot", "Barplot"), question: l("Comment se compose chaque communauté et un taxon ciblé varie-t-il entre groupes ?", "How is each community composed, and does a targeted taxon vary among groups?"), method: l("Composition taxonomique et comparaison ciblée d’un taxon.", "Taxonomic composition and targeted comparison of a taxon."), image: "barplot.png" },
      { title: l("Alpha-diversité", "Alpha diversity"), question: l("Comment richesse et diversité intra-échantillon varient-elles entre groupes ?", "How do within-sample richness and diversity vary among groups?"), method: l("Indices de richesse et diversité avec comparaisons entre groupes.", "Richness and diversity indices with group comparisons."), image: "alpha_diversite.png" },
      { title: l("Venn / UpSet", "Venn / UpSet"), question: l("Quels taxons ou séquences sont partagés ou propres à mes ensembles ?", "Which taxa or sequences are shared or specific to my sets?"), method: l("Comparaison des ensembles et de leurs intersections.", "Comparison of sets and their intersections."), image: "diagramme_venn.png" },
      { title: l("Heat Tree", "Heat Tree"), question: l("Où se concentrent abondances ou différences dans la hiérarchie taxonomique ?", "Where are abundances or differences concentrated across the taxonomic hierarchy?"), method: l("Vue globale de la hiérarchie taxonomique colorée par abondance ou différence.", "Global view of the taxonomic hierarchy coloured by abundance or difference."), image: "heat_tree.png" },
      { title: l("Arbre phylogénétique", "Phylogenetic tree"), question: l("Comment les taxons s’organisent-ils dans la phylogénie et comment leur diversité évolue-t-elle entre groupes ?", "How are taxa organised in the phylogeny and how does their diversity vary among groups?"), method: l("Visualisation phylogénétique et diversité de Faith lorsque l’arbre est disponible.", "Phylogenetic visualisation and Faith diversity when a tree is available."), image: "arbre_phylogenetique.png" },
      { title: l("Qualité taxonomique", "Taxonomic quality"), question: l("Jusqu’à quel rang les données sont-elles assignées et quelle part reste peu résolue ?", "To which rank are the data assigned, and what share remains poorly resolved?"), method: l("Résolution des assignations et repérage d’éléments à contrôler.", "Assignment resolution and identification of elements to review."), image: "qualite_assignation_taxonomique.png" }
    ]
  },
  {
    key: "analyse", order: "10", group: "analyse", icon: "∴",
    title: l("Analyse", "Analysis"),
    kicker: l("Tester les hypothèses et confronter les résultats", "Test hypotheses and compare results"),
    purpose: l("Tester explicitement des différences ou associations, décrire les structures multivariées et comparer plusieurs représentations des données dans un même projet, avec les diagnostics nécessaires à une interprétation prudente.", "Explicitly test differences or associations, describe multivariate structures and compare several data representations within the same project, with diagnostics supporting cautious interpretation."),
    question: l("Les structures observées sont-elles soutenues par des analyses adaptées à mon plan d’étude ?", "Are the observed patterns supported by analyses suited to my study design?"),
    inputs: [l("Un ou plusieurs datasets préparés", "One or more prepared datasets"), l("Des métadonnées et variables explicatives selon la question", "Metadata and explanatory variables depending on the question"), l("Un arbre phylogénétique lorsque l’analyse choisie en dépend", "A phylogenetic tree when required by the selected analysis")],
    actions: [l("Identifier les taxons associés aux conditions étudiées", "Identify taxa associated with the studied conditions"), l("Visualiser et expliquer l’organisation globale des communautés", "Visualise and explain overall community organisation"), l("Tester les différences multivariées et contrôler la dispersion", "Test multivariate differences and check dispersion"), l("Comparer plusieurs datasets ou représentations des mêmes échantillons", "Compare several datasets or representations of the same samples"), l("Explorer des regroupements et réseaux d’associations", "Explore clusters and association networks")],
    outputs: [l("Résultats statistiques et diagnostics", "Statistical results and diagnostics"), l("Visualisations interactives", "Interactive visualisations"), l("Tables détaillées exportables", "Detailed exportable tables"), l("Figures sauvegardées avec paramètres et code R", "Saved figures with parameters and R code")],
    cautions: [l("BarCodeR vérifie plusieurs prérequis, signale certaines incompatibilités et fournit des diagnostics, mais la validité d’une analyse dépend toujours du plan expérimental, de la qualité des données et de l’interprétation scientifique.", "BarCodeR checks several prerequisites, flags some incompatibilities and provides diagnostics, but analysis validity still depends on experimental design, data quality and scientific interpretation."), l("Les réseaux décrivent des associations statistiques et ne doivent pas être interprétés automatiquement comme des interactions biologiques.", "Networks describe statistical associations and should not automatically be interpreted as biological interactions.")],
    source: "modules/analyse/mod_analyse_main_ui.R",
    image: "ordinations.png",
    submodules: [
      { title: l("Analyses différentielles", "Differential analyses"), question: l("Quels taxons sont associés à une condition et les résultats convergent-ils entre approches ?", "Which taxa are associated with a condition, and do results converge across approaches?"), method: l("Plusieurs approches peuvent être confrontées dans un même cadre.", "Several approaches can be compared within the same framework."), image: "analyses_differentielles.png" },
      { title: l("Ordinations", "Ordinations"), question: l("Comment les échantillons s’organisent-ils et quelles variables sont liées à cette structure ?", "How are samples organised, and which variables are associated with this structure?"), method: l("Représentation multivariée avec diagnostics et variables explicatives.", "Multivariate representation with diagnostics and explanatory variables."), image: "ordinations.png" },
      { title: l("Comparaison de matrices", "Matrix comparison"), question: l("Plusieurs datasets mesurés sur des échantillons communs décrivent-ils une organisation concordante ?", "Do several datasets measured on shared samples describe a concordant organisation?"), method: l("Comparaison de structures entre matrices appariées.", "Comparison of structures among matched matrices."), image: "comparaison_matrices.png" },
      { title: l("Réseaux d’associations", "Association networks"), question: l("Quelles associations émergent entre taxons et comment leur organisation varie-t-elle ?", "Which associations emerge among taxa, and how does their organisation vary?"), method: l("Construction, exploration et comparaison prudente de réseaux.", "Cautious network construction, exploration and comparison."), image: "reseaux_associations.png" },
      { title: l("PERMANOVA / Dispersion", "PERMANOVA / Dispersion"), question: l("Les groupes diffèrent-ils en composition sans confondre position et dispersion ?", "Do groups differ in composition without confusing location and dispersion?"), method: l("Test multivarié accompagné d’un contrôle de dispersion.", "Multivariate test accompanied by a dispersion check."), image: "permanova_dispersion.png" },
      { title: l("Clustering", "Clustering"), question: l("Des regroupements non supervisés d’échantillons ou de taxons émergent-ils de mes données ?", "Do unsupervised groups of samples or taxa emerge from my data?"), method: l("Regroupements hiérarchiques et diagnostics associés.", "Hierarchical grouping and associated diagnostics."), image: "clustering.png" }
    ]
  },
  {
    key: "multiview", order: "11", group: "report", icon: "▤",
    title: l("MultiView", "MultiView"),
    kicker: l("Mettre les résultats en regard", "View results side by side"),
    purpose: l("Centraliser les figures sauvegardées dans les différents modules de BarCodeR, les retrouver facilement et les organiser côte à côte pour comparer plusieurs datasets, traitements ou analyses.", "Centralise figures saved across BarCodeR modules, retrieve them easily and arrange them side by side to compare datasets, treatments or analyses."),
    question: l("Comment comparer plusieurs résultats sans perdre le dataset et le contexte qui les ont produits ?", "How can several results be compared without losing the dataset and context that produced them?"),
    inputs: [l("Figures préalablement sauvegardées dans les modules scientifiques", "Figures previously saved in scientific modules"), l("Favoris et tags de la bibliothèque", "Library favourites and tags"), l("Compositions sauvegardées ou importées", "Saved or imported compositions")],
    actions: [l("Rechercher, filtrer et organiser la bibliothèque de figures", "Search, filter and organise the figure library"), l("Marquer des figures comme favorites ou leur attribuer des tags", "Mark figures as favourites or assign tags"), l("Sélectionner plusieurs figures et les disposer dans une grille de comparaison", "Select several figures and arrange them in a comparison grid"), l("Sauvegarder, rouvrir ou importer une composition", "Save, reopen or import a composition"), l("Exporter la composition obtenue", "Export the resulting composition")],
    outputs: [l("Comparaison visuelle de plusieurs figures", "Visual comparison of several figures"), l("Composition réutilisable", "Reusable composition"), l("Export composite pour la restitution", "Composite export for reporting")],
    cautions: [l("MultiView réutilise les figures déjà sauvegardées : il ne relance pas les analyses qui les ont produites.", "MultiView reuses figures that have already been saved: it does not rerun the analyses that produced them."), l("Les favoris et tags sont partagés à l’échelle de l’installation et ne sont pas isolés par utilisateur.", "Favorites and tags are shared at installation level and are not isolated by user.")],
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
    image: "screen-home-current.png",
    title: l("Reprendre le projet en un regard", "Resume the project at a glance"),
    description: l(
      "Le tableau de bord rassemble l’état de sauvegarde, le dataset actif et ses indicateurs clés, puis matérialise la progression dans le parcours analytique pour orienter immédiatement la prochaine action.",
      "The dashboard combines save status, the active dataset and its key indicators, then shows progress through the analytical workflow to make the next action immediately clear."
    )
  },
  openmetabar: {
    image: "screen-openmetabar-current.png",
    title: l("Préparer un run avant sa soumission", "Prepare a run before submission"),
    description: l(
      "L’onglet guide la préparation du traitement à partir des FASTQ, vérifie le contexte du run et permet ensuite de lancer puis suivre OpenMetaBar sur l’infrastructure de calcul configurée.",
      "The tab guides processing setup from FASTQ files, checks the run context and then lets users launch and monitor OpenMetaBar on the configured compute infrastructure."
    )
  },
  "input-data": {
    image: "screen-input-data.png",
    title: l("Importer un objet existant", "Import an existing object"),
    description: l(
      "L’onglet importe un ou plusieurs objets phyloseq depuis un fichier R, contrôle la cohérence de leurs composantes et récapitule les éventuels ajustements appliqués avant leur ajout au projet.",
      "The tab imports one or more phyloseq objects from an R file, checks component consistency and summarises any adjustments applied before adding them to the project."
    )
  },
  datasets: {
    image: "screen-datasets-current.png",
    title: l("Piloter le dataset actif et les projets", "Manage the active dataset and projects"),
    description: l(
      "La partie haute définit le dataset de travail global ; le registre inférieur sert à sauvegarder, recharger, dupliquer, importer ou exporter des projets et leurs jeux de données.",
      "The upper area defines the application-wide working dataset; the registry below is used to save, reload, duplicate, import or export projects and their datasets."
    )
  },
  description: {
    image: "screen-description-current.png",
    title: l("Repérer les échantillons atypiques", "Identify atypical samples"),
    description: l(
      "L’onglet Description permet notamment de repérer les profils atypiques sur plusieurs signaux comme la profondeur, la richesse ou la dominance, puis de revenir aux autres vues descriptives pour replacer ces alertes dans le contexte du dataset.",
      "The Description tab can notably flag atypical profiles across signals such as depth, richness or dominance, then return to the other descriptive views to place those alerts in the dataset context."
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
  filtration: {
    image: "screen-filtration-current.png",
    title: l("Construire un filtrage en observant son effet", "Build filtering while observing its effect"),
    description: l(
      "Les filtres taxonomiques et d’abondance peuvent être réglés côte à côte avec des distributions mises à jour pour aider à mesurer l’effet des seuils avant d’enregistrer la version filtrée du dataset.",
      "Taxonomic and abundance filters can be adjusted side by side with updated distributions to help assess threshold effects before saving the filtered dataset version."
    )
  },
  exploration: {
    image: "screen-exploration-current.png",
    title: l("Comparer la diversité de façon interactive", "Compare diversity interactively"),
    description: l(
      "Cette vue d’alpha-diversité montre comment BarCodeR associe paramétrage, visualisation interactive et comparaison de plusieurs datasets dans un même écran, avec sauvegarde de la figure lorsqu’elle doit être réutilisée ou comparée.",
      "This alpha-diversity view shows how BarCodeR combines settings, interactive visualisation and comparison of several datasets in the same screen, with figure saving when it needs to be reused or compared."
    )
  },
  analyse: {
    image: "screen-analyse-current.png",
    title: l("Explorer une structure multivariée en 3D", "Explore multivariate structure in 3D"),
    description: l(
      "Le module Analyse permet notamment de construire des ordinations interactives en deux ou trois dimensions, d’ajuster leur rendu et de confronter visuellement la structure des groupes avant d’interpréter les résultats associés.",
      "The Analysis module can notably build interactive two- or three-dimensional ordinations, adjust their rendering and visually compare group structure before interpreting the associated results."
    )
  },
  multiview: {
    image: "screen-multiview-current.png",
    title: l("Retrouver et comparer les figures enregistrées", "Retrieve and compare saved figures"),
    description: l(
      "La bibliothèque rassemble les figures sauvegardées dans les autres modules, permet de les retrouver par recherche, filtres, tags ou favoris, puis d’en sélectionner plusieurs pour les comparer dans une même composition.",
      "The library gathers figures saved in other modules, lets users retrieve them through search, filters, tags or favourites, then select several for comparison in a single composition."
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
