import { useEffect, useState } from "react";

type Language = "en" | "fr";

const content = {
  en: {
    status: "Research software · manuscript in preparation",
    navigation: [
      ["Overview", "#overview"],
      ["Architecture", "#architecture"],
      ["Demonstration", "#demonstration"],
      ["Reproducibility", "#reproducibility"],
      ["Availability", "#availability"],
    ],
    title: "OpenMetaBar–BarCodeR",
    subtitle: "A modular software ecosystem for reproducible and interactive metabarcoding analysis",
    authors: "M. Léger-Pigout · S. Marguerit · S. Warot · I.-M. Viciriuc · N. Ris · E. G. J. Danchin · C. Rancurel",
    affiliations: "Institut Sophia Agrobiotech (INRAE, Université Côte d’Azur) · PHYBAC (CNRS, INRAE, Université Côte d’Azur)",
    summaryLabel: "Summary",
    summary:
      "OpenMetaBar–BarCodeR connects reproducible upstream sequence processing with interactive downstream analysis. OpenMetaBar organizes and executes marker-specific workflows in Nextflow; BarCodeR provides the graphical environment used to configure runs, retrieve phyloseq objects, inspect and edit data, perform ecological analyses, and export figures, tables and parameters. The contribution lies in analytical continuity and provenance rather than in a new statistical algorithm.",
    availabilityLabel: "Availability and implementation",
    availability:
      "OpenMetaBar is implemented in Nextflow DSL2. BarCodeR is implemented in R/Shiny and can also analyse compatible phyloseq objects generated elsewhere. Source code and development history are available on GitHub. The software license and archival release DOI must be finalized before manuscript submission.",
    source: "Source code",
    contact: "Correspondence",
    keyFacts: [
      ["UPSTREAM", "Nextflow DSL2", "Structured design file, validated inputs and execution on configured computing infrastructure."],
      ["INTEROPERABILITY", "phyloseq", "A standard object linking abundance, taxonomy, sample metadata and optional sequences or trees."],
      ["DOWNSTREAM", "R / Shiny", "Interactive inspection, filtering, visualization, statistics, multiview composition and exports."],
      ["PROVENANCE", "Two complementary levels", "OpenMetaBar records processing; BarCodeR records downstream choices and generated outputs."],
    ],
    overviewKicker: "Scientific rationale",
    overviewTitle: "The practical gap is between computation and interpretation.",
    overviewBody:
      "Metabarcoding studies often separate upstream processing on a cluster from downstream analysis in R. Files are transferred manually, objects are reconstructed from multiple tables, and the connection between a pipeline run and a final figure can become difficult to recover. OpenMetaBar–BarCodeR was developed to maintain that connection within a project-oriented workflow.",
    contributionTitle: "What the ecosystem contributes",
    contributionItems: [
      ["Explicit project design", "FASTQ files, primers, barcodes, markers and sample metadata are described before computation in a structured design file."],
      ["A controlled handover", "OpenMetaBar generates standardized outputs, including phyloseq objects that BarCodeR can retrieve directly."],
      ["Interactive but traceable analyses", "Downstream modules expose datasets, variables and parameters while preserving analysis histories and exports."],
    ],
    boundaryTitle: "What is not claimed",
    boundaryItems: [
      "The ecosystem does not introduce a new denoising, taxonomic assignment or statistical method.",
      "A graphical interface does not replace experimental design or expert statistical interpretation.",
      "Performance and biological conclusions remain dependent on input quality, reference databases and selected parameters.",
    ],
    architectureKicker: "Software architecture",
    architectureTitle: "A standardized phyloseq object joins two independently usable components.",
    architectureIntro:
      "BarCodeR can launch and monitor OpenMetaBar on a configured remote environment, then retrieve its results. It can also be used independently with external phyloseq objects.",
    architectureCaption: "Figure A. Logical data flow from project inputs to research outputs. The phyloseq object is the interoperability layer, not a proprietary intermediate format.",
    architectureSteps: [
      ["01", "Project inputs", "Design file · FASTQ · primers · barcodes · metadata"],
      ["02", "OpenMetaBar", "Validation · QC · ASV/OTU workflow · taxonomy · reports"],
      ["03", "phyloseq", "Abundance · taxonomy · sample data · sequences / tree"],
      ["04", "BarCodeR", "Inspection · edition · filtering · exploration · statistics"],
      ["05", "Research outputs", "Figures · result tables · parameter sets · histories"],
    ],
    scopeTitle: "Supported analytical scope",
    scopeGroups: [
      ["Input and curation", "Coherence checks, project restoration, metadata/abundance/taxonomy editing, external component import, non-destructive derived datasets."],
      ["Exploration", "Sequencing depth, richness, sparsity, taxonomic completeness, relative composition, alpha diversity and ordination."],
      ["Statistical analysis", "PERMANOVA and dispersion, differential-abundance workflows, matrix comparisons, clustering and association-network exploration."],
      ["Interpretation and reporting", "Heat trees, multiview figure composition, parameter histories, figure/table export and embedded multilingual documentation."],
    ],
    demoKicker: "Reproducible public-data demonstration",
    demoTitle: "Every figure below is computed from a cited public phyloseq dataset.",
    demoIntro:
      "The website uses phyloseq::GlobalPatterns, derived from the cross-environment 16S rRNA survey published by Caporaso et al. (2011). The source object contains 19,216 taxa; 18,988 nonzero taxa remain after the explicit pruning step used for these calculations. The supplied synthetic ps_marine_exotic.rds object is not used in these scientific figures. This demonstration illustrates possible BarCodeR outputs; it is not a software benchmark or a biological reanalysis of the original study.",
    datasetFacts: [["26", "samples"], ["19,216", "source taxa"], ["18,988", "nonzero taxa analysed"], ["9", "environment types"]],
    figures: [
      ["Figure 1", "globalpatterns-composition.png", "Taxonomic composition", "Sample-wise counts were converted to relative abundances, agglomerated at phylum level and collapsed to the eight most abundant phyla overall. Bars show mean composition within each environment type; remaining taxa are grouped as Other."],
      ["Figure 2", "globalpatterns-ordination.png", "Between-sample structure", "Principal coordinates analysis of Bray–Curtis dissimilarities computed on sample-wise relative abundances. Points are individual samples and colours indicate the environment metadata supplied with GlobalPatterns."],
      ["Figure 3", "globalpatterns-alpha-diversity.png", "Within-sample diversity", "Observed richness and Shannon diversity were calculated from the untransformed phyloseq counts. Every point is shown; boxplots are descriptive summaries and no hypothesis test is reported."],
    ],
    methodsTitle: "Exact transformations used on this page",
    scriptLink: "View the figure-generation script",
    methods: [
      ["Composition", "Total-sum scaling per sample → tax_glom(Phylum) → top eight phyla by overall mean abundance → mean within SampleType."],
      ["Ordination", "Total-sum scaling per sample → Bray–Curtis dissimilarity → principal coordinates analysis (PCoA)."],
      ["Alpha diversity", "estimate_richness on raw counts → Observed and Shannon indices → all samples displayed without inferential testing."],
    ],
    reproKicker: "Reproducibility",
    reproTitle: "The figures are outputs of code, not decorative approximations.",
    reproText:
      "A versioned R script loads the public object directly from phyloseq, applies the stated transformations, verifies that composition summaries sum to one and writes the three image files plus a machine-readable provenance manifest. Re-running the script rebuilds the evidence shown here.",
    reproCards: [
      ["Data provenance", "Dataset name, primary DOI, sample count, taxa count and package versions are written to data-provenance.tsv."],
      ["Method visibility", "Captions and a methods table state transformations, distance, ordination and diversity measures without implying unperformed tests."],
      ["Separation of evidence", "Synthetic test objects remain useful for interface testing but are excluded from claims based on public scientific data."],
    ],
    limitationsTitle: "Current limitations and interpretation",
    limitations: [
      "Cluster execution requires an initial configuration of SSH, scheduler profiles, paths and software environments.",
      "Large objects and complex interactive views may require additional computational resources and performance tuning.",
      "Taxonomic results depend on marker choice, database coverage and assignment parameters.",
      "Network and differential results require method-aware interpretation; compositional associations are exploratory.",
      "The public demonstration uses a legacy 16S example dataset for reproducibility and breadth, not to represent every marker supported by OpenMetaBar.",
    ],
    availabilityKicker: "Software availability",
    availabilityTitle: "Public source, documented provenance and a path to an archival release.",
    resources: [
      ["BarCodeR source", "Current R/Shiny application, module history and OpenMetaBar integration.", "https://github.com/MLPosuphy/BarCodeR"],
      ["Website source", "Static academic website, R figure-generation script and GitHub Pages workflow.", "https://github.com/MLPosuphy/site-BarCodeR-R-shiny-application"],
      ["Public demonstration data", "GlobalPatterns object distributed with phyloseq; primary study by Caporaso et al. (2011).", "https://doi.org/10.1073/pnas.1000080107"],
    ],
    roadmapTitle: "Before journal submission",
    roadmap: ["Select and state the software license", "Create a versioned release", "Archive the release and example data", "Add the resulting DOI", "Document tested operating environments"],
    citationTitle: "References and citation",
    references: [
      "Caporaso, J. G. et al. (2011). Global patterns of 16S rRNA diversity at a depth of millions of sequences per sample. Proceedings of the National Academy of Sciences. doi:10.1073/pnas.1000080107.",
      "McMurdie, P. J. & Holmes, S. (2013). phyloseq: An R package for reproducible interactive analysis and graphics of microbiome census data. PLOS ONE 8(4): e61217. doi:10.1371/journal.pone.0061217.",
      "Di Tommaso, P. et al. (2017). Nextflow enables reproducible computational workflows. Nature Biotechnology 35, 316–319. doi:10.1038/nbt.3820.",
    ],
    citeUs: "OpenMetaBar–BarCodeR manuscript",
    citeUsText: "The software manuscript is in preparation. A formatted citation and DOI will be added here after publication; until then, please cite the software version used and the public repository URL.",
    footer: "OpenMetaBar–BarCodeR · research software developed at Institut Sophia Agrobiotech and PHYBAC",
  },
  fr: {
    status: "Logiciel de recherche · manuscrit en préparation",
    navigation: [["Vue d’ensemble", "#overview"], ["Architecture", "#architecture"], ["Démonstration", "#demonstration"], ["Reproductibilité", "#reproducibility"], ["Disponibilité", "#availability"]],
    title: "OpenMetaBar–BarCodeR",
    subtitle: "Un écosystème logiciel modulaire pour l’analyse reproductible et interactive de données de métabarcoding",
    authors: "M. Léger-Pigout · S. Marguerit · S. Warot · I.-M. Viciriuc · N. Ris · E. G. J. Danchin · C. Rancurel",
    affiliations: "Institut Sophia Agrobiotech (INRAE, Université Côte d’Azur) · PHYBAC (CNRS, INRAE, Université Côte d’Azur)",
    summaryLabel: "Résumé",
    summary: "OpenMetaBar–BarCodeR relie le traitement reproductible des séquences à l’analyse interactive en aval. OpenMetaBar organise et exécute des workflows spécifiques aux marqueurs dans Nextflow ; BarCodeR fournit l’environnement graphique pour configurer les runs, récupérer les objets phyloseq, inspecter et éditer les données, mener les analyses écologiques et exporter figures, tables et paramètres. La contribution porte sur la continuité analytique et la provenance, non sur un nouvel algorithme statistique.",
    availabilityLabel: "Disponibilité et implémentation",
    availability: "OpenMetaBar est implémenté en Nextflow DSL2. BarCodeR est développé en R/Shiny et peut également analyser des objets phyloseq compatibles provenant d’autres workflows. Le code source et l’historique de développement sont disponibles sur GitHub. La licence et le DOI d’archivage restent à finaliser avant la soumission du manuscrit.",
    source: "Code source", contact: "Correspondance",
    keyFacts: [["AMONT", "Nextflow DSL2", "Design file structuré, validation des entrées et exécution sur une infrastructure de calcul configurée."], ["INTEROPÉRABILITÉ", "phyloseq", "Un objet standard réunissant abondance, taxonomie, métadonnées et, si disponibles, séquences ou arbre."], ["AVAL", "R / Shiny", "Inspection, filtration, visualisation, statistiques, composition multivue et exports interactifs."], ["PROVENANCE", "Deux niveaux complémentaires", "OpenMetaBar trace le traitement ; BarCodeR enregistre les choix en aval et les sorties générées."]],
    overviewKicker: "Rationnel scientifique", overviewTitle: "Le verrou pratique se situe entre le calcul et l’interprétation.",
    overviewBody: "Les études de métabarcoding séparent souvent le traitement amont sur cluster et l’analyse aval dans R. Les fichiers sont transférés manuellement, les objets reconstruits à partir de plusieurs tables et le lien entre un run de pipeline et une figure finale devient difficile à retrouver. OpenMetaBar–BarCodeR vise à maintenir ce lien dans un workflow organisé par projet.",
    contributionTitle: "Contribution de l’écosystème",
    contributionItems: [["Plan de projet explicite", "FASTQ, amorces, barcodes, marqueurs et métadonnées sont décrits avant le calcul dans un design file structuré."], ["Passage de relais contrôlé", "OpenMetaBar produit des sorties standardisées, dont des objets phyloseq directement récupérables par BarCodeR."], ["Analyses interactives et traçables", "Les modules aval exposent jeux de données, variables et paramètres tout en conservant historiques et exports."]],
    boundaryTitle: "Ce qui n’est pas revendiqué", boundaryItems: ["L’écosystème n’introduit pas de nouvelle méthode de débruitage, d’assignation taxonomique ou de statistique.", "Une interface graphique ne remplace pas la conception expérimentale ni l’interprétation statistique experte.", "Performances et conclusions biologiques restent dépendantes de la qualité des entrées, des bases de référence et des paramètres choisis."],
    architectureKicker: "Architecture logicielle", architectureTitle: "Un objet phyloseq standardisé relie deux composants utilisables indépendamment.",
    architectureIntro: "BarCodeR peut lancer et suivre OpenMetaBar sur un environnement distant configuré, puis en récupérer les résultats. Il peut aussi être utilisé seul avec des objets phyloseq externes.",
    architectureCaption: "Figure A. Flux logique des entrées du projet vers les sorties scientifiques. L’objet phyloseq constitue la couche d’interopérabilité, non un format intermédiaire propriétaire.",
    architectureSteps: [["01", "Entrées du projet", "Design file · FASTQ · amorces · barcodes · métadonnées"], ["02", "OpenMetaBar", "Validation · QC · workflow ASV/OTU · taxonomie · rapports"], ["03", "phyloseq", "Abondance · taxonomie · données échantillons · séquences / arbre"], ["04", "BarCodeR", "Inspection · édition · filtration · exploration · statistiques"], ["05", "Sorties scientifiques", "Figures · tables de résultats · paramètres · historiques"]],
    scopeTitle: "Périmètre analytique", scopeGroups: [["Entrées et curation", "Contrôles de cohérence, restauration de projet, édition des métadonnées/abondances/taxonomie, import de composants et objets dérivés non destructifs."], ["Exploration", "Profondeur de séquençage, richesse, parcimonie, complétude taxonomique, composition relative, diversité alpha et ordination."], ["Analyse statistique", "PERMANOVA et dispersion, abondance différentielle, comparaison de matrices, clustering et réseaux d’association exploratoires."], ["Interprétation et rapport", "Heat trees, composition multivue, historique des paramètres, exports de figures/tables et documentation multilingue embarquée."]],
    demoKicker: "Démonstration reproductible sur données publiques", demoTitle: "Chaque figure ci-dessous est calculée à partir d’un jeu phyloseq public et cité.",
    demoIntro: "Le site utilise phyloseq::GlobalPatterns, dérivé de l’étude 16S multi-environnements publiée par Caporaso et al. (2011). L’objet source contient 19 216 taxons ; 18 988 taxons non nuls restent après l’étape explicite de filtration utilisée pour ces calculs. L’objet synthétique ps_marine_exotic.rds fourni n’est pas utilisé dans ces figures scientifiques. Cette démonstration illustre des sorties possibles de BarCodeR ; elle ne constitue ni un benchmark logiciel ni une réanalyse biologique de l’étude originale.",
    datasetFacts: [["26", "échantillons"], ["19 216", "taxons source"], ["18 988", "taxons non nuls analysés"], ["9", "types d’environnements"]],
    figures: [["Figure 1", "globalpatterns-composition.png", "Composition taxonomique", "Les comptes sont convertis en abondances relatives par échantillon, agglomérés au phylum et regroupés selon les huit phyla les plus abondants. Les barres montrent la composition moyenne par environnement ; les taxons restants sont regroupés dans Other."], ["Figure 2", "globalpatterns-ordination.png", "Structure inter-échantillons", "Analyse en coordonnées principales des dissimilarités de Bray–Curtis calculées sur les abondances relatives. Chaque point représente un échantillon et la couleur indique l’environnement fourni avec GlobalPatterns."], ["Figure 3", "globalpatterns-alpha-diversity.png", "Diversité intra-échantillon", "La richesse observée et l’indice de Shannon sont calculés sur les comptes non transformés. Tous les points sont affichés ; les boîtes sont descriptives et aucun test d’hypothèse n’est rapporté."]],
    methodsTitle: "Transformations exactes utilisées sur cette page", methods: [["Composition", "Normalisation par somme totale → tax_glom(Phylum) → huit phyla dominants selon l’abondance moyenne globale → moyenne par SampleType."], ["Ordination", "Normalisation par somme totale → dissimilarité de Bray–Curtis → analyse en coordonnées principales (PCoA)."], ["Diversité alpha", "estimate_richness sur les comptes bruts → indices Observed et Shannon → tous les échantillons affichés sans test inférentiel."]],
    scriptLink: "Voir le script de génération des figures",
    reproKicker: "Reproductibilité", reproTitle: "Les figures sont des sorties de code, pas des approximations décoratives.",
    reproText: "Un script R versionné charge directement l’objet public depuis phyloseq, applique les transformations annoncées, vérifie que les compositions somment à un et écrit les trois images ainsi qu’un manifeste de provenance lisible par machine. Relancer ce script reconstruit les preuves présentées ici.",
    reproCards: [["Provenance des données", "Nom du jeu, DOI primaire, nombre d’échantillons, nombre de taxons et versions des packages sont écrits dans data-provenance.tsv."], ["Méthodes visibles", "Les légendes et le tableau méthodologique indiquent transformations, distance, ordination et mesures de diversité sans suggérer de tests non réalisés."], ["Séparation des preuves", "Les objets synthétiques restent utiles pour tester l’interface mais sont exclus des affirmations reposant sur des données scientifiques publiques."]],
    limitationsTitle: "Limites actuelles et interprétation", limitations: ["L’exécution sur cluster nécessite une configuration initiale de SSH, du scheduler, des chemins et des environnements logiciels.", "Les gros objets et vues interactives complexes peuvent nécessiter davantage de ressources et d’optimisation.", "Les résultats taxonomiques dépendent du marqueur, de la couverture de la base et des paramètres d’assignation.", "Les réseaux et analyses différentielles exigent une interprétation adaptée ; les associations compositionnelles restent exploratoires.", "La démonstration publique utilise un ancien jeu 16S pour sa reproductibilité et sa diversité, pas pour représenter tous les marqueurs pris en charge."],
    availabilityKicker: "Disponibilité du logiciel", availabilityTitle: "Code public, provenance documentée et trajectoire vers une version archivée.",
    resources: [["Code BarCodeR", "Application R/Shiny actuelle, historique des modules et intégration OpenMetaBar.", "https://github.com/MLPosuphy/BarCodeR"], ["Code du site", "Site académique statique, script R des figures et workflow GitHub Pages.", "https://github.com/MLPosuphy/site-BarCodeR-R-shiny-application"], ["Données publiques", "Objet GlobalPatterns distribué avec phyloseq ; étude primaire de Caporaso et al. (2011).", "https://doi.org/10.1073/pnas.1000080107"]],
    roadmapTitle: "Avant soumission à la revue", roadmap: ["Choisir et déclarer la licence", "Créer une version numérotée", "Archiver version et données d’exemple", "Ajouter le DOI obtenu", "Documenter les environnements testés"],
    citationTitle: "Références et citation", references: ["Caporaso, J. G. et al. (2011). Global patterns of 16S rRNA diversity at a depth of millions of sequences per sample. Proceedings of the National Academy of Sciences. doi:10.1073/pnas.1000080107.", "McMurdie, P. J. & Holmes, S. (2013). phyloseq: An R package for reproducible interactive analysis and graphics of microbiome census data. PLOS ONE 8(4): e61217. doi:10.1371/journal.pone.0061217.", "Di Tommaso, P. et al. (2017). Nextflow enables reproducible computational workflows. Nature Biotechnology 35, 316–319. doi:10.1038/nbt.3820."],
    citeUs: "Manuscrit OpenMetaBar–BarCodeR", citeUsText: "Le manuscrit logiciel est en préparation. Une citation mise en forme et un DOI seront ajoutés après publication ; jusque-là, citez la version logicielle utilisée et l’URL du dépôt public.",
    footer: "OpenMetaBar–BarCodeR · logiciel de recherche développé à l’Institut Sophia Agrobiotech et PHYBAC",
  },
} as const;

const figurePath = (name: string) => `${import.meta.env.BASE_URL}figures/${name}`;

function Wordmark() {
  return <span className="wordmark"><i aria-hidden="true">B|R</i><b>BarCodeR</b><span>+</span><b>OpenMetaBar</b></span>;
}

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = content[language];

  useEffect(() => { document.documentElement.lang = language; }, [language]);

  return (
    <div className="site-shell">
      <div className="utility-bar"><span>{t.affiliations}</span><span>{t.status}</span></div>
      <header className="site-header">
        <a href="#top" aria-label="BarCodeR and OpenMetaBar home"><Wordmark /></a>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          {t.navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <div className="language" role="group" aria-label="Language"><button className={language === "en" ? "selected" : ""} onClick={() => setLanguage("en")}>EN</button><button className={language === "fr" ? "selected" : ""} onClick={() => setLanguage("fr")}>FR</button></div>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="article-type">Application note <span>·</span> Bioinformatics software</div>
          <h1>{t.title}</h1>
          <p className="hero-subtitle">{t.subtitle}</p>
          <p className="authors">{t.authors}</p>
          <p className="affiliations">{t.affiliations}</p>
          <div className="abstract-grid">
            <article><h2>{t.summaryLabel}</h2><p>{t.summary}</p></article>
            <article><h2>{t.availabilityLabel}</h2><p>{t.availability}</p><div className="abstract-links"><a href="https://github.com/MLPosuphy/BarCodeR">{t.source} ↗</a><a href="mailto:corinne.rancurel@inrae.fr">{t.contact} ↗</a></div></article>
          </div>
        </section>

        <section className="facts" aria-label="Implementation summary">
          {t.keyFacts.map(([label, value, detail]) => <article key={label}><span>{label}</span><h3>{value}</h3><p>{detail}</p></article>)}
        </section>

        <section className="section overview" id="overview">
          <div className="section-lead"><p className="kicker">01 — {t.overviewKicker}</p><h2>{t.overviewTitle}</h2><p>{t.overviewBody}</p></div>
          <div className="claims-grid">
            <article><h3>{t.contributionTitle}</h3>{t.contributionItems.map(([title, text], i) => <div className="claim" key={title}><span>{i + 1}</span><p><b>{title}.</b> {text}</p></div>)}</article>
            <article className="boundary"><h3>{t.boundaryTitle}</h3><ul>{t.boundaryItems.map((item) => <li key={item}>{item}</li>)}</ul></article>
          </div>
        </section>

        <section className="section architecture" id="architecture">
          <div className="section-lead narrow"><p className="kicker">02 — {t.architectureKicker}</p><h2>{t.architectureTitle}</h2><p>{t.architectureIntro}</p></div>
          <figure className="architecture-figure">
            <div className="architecture-track">
              {t.architectureSteps.map(([number, title, detail], i) => <article key={number} className={i === 2 ? "bridge" : ""}><span>{number}</span><h3>{title}</h3><p>{detail}</p></article>)}
            </div>
            <figcaption>{t.architectureCaption}</figcaption>
          </figure>
          <div className="scope"><h3>{t.scopeTitle}</h3><div>{t.scopeGroups.map(([title, detail]) => <article key={title}><h4>{title}</h4><p>{detail}</p></article>)}</div></div>
        </section>

        <section className="section demonstration" id="demonstration">
          <div className="section-lead"><p className="kicker">03 — {t.demoKicker}</p><h2>{t.demoTitle}</h2><p>{t.demoIntro}</p></div>
          <div className="dataset-facts">{t.datasetFacts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
          <div className="figures">
            {t.figures.map(([number, file, title, caption]) => <figure key={file}><img src={figurePath(file)} alt={`${title}, generated from phyloseq GlobalPatterns`} loading="lazy" /><figcaption><span>{number}</span><div><h3>{title}</h3><p>{caption}</p><p className="source-note">Data: phyloseq::GlobalPatterns · Caporaso et al. 2011 · <a href="https://doi.org/10.1073/pnas.1000080107">doi:10.1073/pnas.1000080107 ↗</a></p></div></figcaption></figure>)}
          </div>
          <div className="methods"><h3>{t.methodsTitle}</h3><div className="methods-table">{t.methods.map(([name, description]) => <div key={name}><b>{name}</b><p>{description}</p></div>)}</div><a className="text-link" href="https://github.com/MLPosuphy/site-BarCodeR-R-shiny-application/blob/main/scripts/generate_public_data_figures.R">{t.scriptLink} ↗</a></div>
        </section>

        <section className="section reproducibility" id="reproducibility">
          <div className="section-lead narrow"><p className="kicker">04 — {t.reproKicker}</p><h2>{t.reproTitle}</h2><p>{t.reproText}</p></div>
          <div className="repro-grid">{t.reproCards.map(([title, text], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="limitations"><h3>{t.limitationsTitle}</h3><ol>{t.limitations.map((item) => <li key={item}>{item}</li>)}</ol></div>
        </section>

        <section className="section availability" id="availability">
          <div className="section-lead"><p className="kicker">05 — {t.availabilityKicker}</p><h2>{t.availabilityTitle}</h2></div>
          <div className="availability-grid">
            <div className="resource-list">{t.resources.map(([title, detail, url]) => <a key={title} href={url}><span><b>{title}</b><small>{detail}</small></span><i>↗</i></a>)}</div>
            <aside><h3>{t.roadmapTitle}</h3><ol>{t.roadmap.map((item, i) => <li key={item}><span>{String(i + 1).padStart(2, "0")}</span>{item}</li>)}</ol></aside>
          </div>
        </section>

        <section className="section citations">
          <div className="section-lead"><p className="kicker">06 — {t.citationTitle}</p></div>
          <div className="citation-grid"><div>{t.references.map((reference, i) => <p key={reference}><span>[{i + 1}]</span>{reference}</p>)}</div><aside><h3>{t.citeUs}</h3><p>{t.citeUsText}</p><a href="mailto:corinne.rancurel@inrae.fr">corinne.rancurel@inrae.fr ↗</a></aside></div>
        </section>
      </main>

      <footer><Wordmark /><p>{t.footer}</p><div><a href="https://github.com/MLPosuphy/BarCodeR">GitHub</a><a href="#top">↑ Top</a></div></footer>
    </div>
  );
}
