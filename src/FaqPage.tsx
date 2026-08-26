import { useState } from "react";
import type { Language } from "./content";

type FaqItem = [string, string, string, string];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

export default function FaqPage({ language }: { language: Language }) {
  const [filter, setFilter] = useState("all");
  const c = language === "fr" ? {
    k: "FAQ BarCodeR", title: "Une réponse claire, au bon moment.", p: "Installation, données, projets, analyses, reproductibilité et dépannage : les réponses essentielles sont réunies ici pour avancer sans interrompre le parcours.",
    topics: [["all", "Toutes"], ["installation", "Installation"], ["data", "Données"], ["projects", "Projets"], ["analysis", "Analyses"], ["repro", "Reproductibilité"], ["help", "Dépannage"]],
    filterLabel: "Filtrer les questions", more: "Besoin d’un exemple guidé ?", action: "Ouvrir les tutoriels",
    items: [
      ["Faut-il installer R ou RStudio ?", "Non. La distribution autonome contient l’environnement nécessaire au lancement et à l’utilisation de BarCodeR.", "Installation", "installation"],
      ["Faut-il maintenir les packages R à jour ?", "Non. Les packages et leurs versions compatibles sont assemblés et testés lors de la fabrication de chaque distribution.", "Installation", "installation"],
      ["Comment installer BarCodeR ?", "Télécharger l’archive, la décompresser entièrement, puis double-cliquer sur l’application présente dans le dossier.", "Installation", "installation"],
      ["Des droits administrateur sont-ils nécessaires ?", "En principe non lorsque l’application est placée dans un dossier accessible en écriture. Une politique de sécurité institutionnelle peut toutefois demander l’intervention du service informatique.", "Installation", "installation"],
      ["Pourquoi Windows affiche-t-il parfois un avertissement ?", "Windows peut demander une confirmation pour un programme téléchargé. Vérifier l’origine officielle de l’archive avant de poursuivre.", "Installation", "installation"],
      ["Comment mettre BarCodeR à jour ?", "Télécharger la nouvelle archive et ouvrir la nouvelle version. R, RStudio et les packages ne sont pas mis à jour séparément.", "Installation", "installation"],
      ["Peut-on conserver plusieurs versions ?", "Oui. Des dossiers distincts permettent de conserver temporairement plusieurs distributions et de vérifier un projet avant de retirer l’ancienne version.", "Installation", "installation"],
      ["Quels formats phyloseq peuvent être importés ?", "Les objets phyloseq compatibles peuvent être chargés depuis des fichiers .rds ou .RData. L’application vérifie ensuite leur structure.", "Données", "data"],
      ["Peut-on commencer avec des fichiers FASTQ ?", "Oui. L’onglet OpenMetaBar prépare le traitement des séquences brutes et récupère l’objet phyloseq produit dans le projet.", "Données", "data"],
      ["Les données sont-elles envoyées en ligne ?", "Les objets phyloseq et les projets sont manipulés localement. Le traitement FASTQ peut utiliser l’infrastructure distante configurée pour OpenMetaBar.", "Données", "data"],
      ["Peut-on utiliser plusieurs datasets simultanément ?", "Oui. Un projet peut réunir plusieurs objets phyloseq, les analyser séparément et mobiliser plusieurs datasets dans les analyses inter-datasets compatibles.", "Données", "data"],
      ["Pourquoi un dataset volumineux ralentit-il l’application ?", "Le nombre d’échantillons, de taxons, de séquences et la méthode choisie influencent le temps de calcul. Une filtration scientifiquement justifiée peut réduire cette charge.", "Données", "data"],
      ["Que contient un projet BarCodeR ?", "Un projet organise les datasets et conserve le contexte de travail : états des données, figures sauvegardées, historiques et code R lorsque disponible.", "Projets", "projects"],
      ["Comment transmettre un projet ?", "Exporter l’archive du projet puis la transmettre avec la version de BarCodeR utilisée. Le destinataire peut ainsi reprendre un environnement de travail structuré.", "Projets", "projects"],
      ["Un projet reste-t-il utilisable après une mise à jour ?", "Il est conçu pour être réutilisé. Conserver l’ancienne version jusqu’à l’ouverture et au contrôle d’une copie du projet dans la nouvelle distribution.", "Projets", "projects"],
      ["Une importation écrase-t-elle le dataset initial ?", "Les opérations d’édition et de filtration peuvent produire une nouvelle version nommée afin de conserver l’état initial dans le projet.", "Projets", "projects"],
      ["Quelle différence entre Exploration et Analyse ?", "Exploration décrit les données et révèle leurs structures. Analyse regroupe les méthodes statistiques destinées à tester ou comparer explicitement ces structures.", "Analyses", "analysis"],
      ["Peut-on comparer plusieurs datasets ?", "Oui, lorsque la méthode accepte des objets compatibles ou des échantillons appariés. Les analyses intra-dataset restent également disponibles indépendamment.", "Analyses", "analysis"],
      ["Les figures sont-elles interactives ?", "Les modules compatibles permettent de modifier les paramètres, d’actualiser les résultats et de manipuler les visualisations avant leur sauvegarde.", "Analyses", "analysis"],
      ["À quoi sert MultiView ?", "MultiView rassemble les figures sauvegardées d’un projet et permet de les disposer, redimensionner et comparer dans une composition commune.", "Analyses", "analysis"],
      ["Que faut-il vérifier avant d’interpréter un résultat ?", "Consulter les diagnostics proposés, contrôler les prérequis de la méthode et replacer le résultat dans le plan expérimental et la qualité des données.", "Analyses", "analysis"],
      ["Comment retrouver les paramètres d’une figure ?", "Une figure sauvegardée reste associée au dataset, à sa version, aux paramètres et aux traces disponibles dans le projet.", "Reproductibilité", "repro"],
      ["Le code R est-il disponible pour toutes les actions ?", "Il est conservé lorsque le module peut le générer. Certaines actions d’interface ou visualisations ne produisent pas nécessairement un script complet.", "Reproductibilité", "repro"],
      ["Comment citer BarCodeR ?", "Utiliser la page Citation, sélectionner le format bibliographique adapté et indiquer la version réellement utilisée dans le travail.", "Reproductibilité", "repro"],
      ["Une connexion internet est-elle obligatoire ?", "Non pour les analyses locales. Elle peut être nécessaire pour télécharger l’application, consulter une ressource externe ou utiliser l’infrastructure OpenMetaBar.", "Dépannage", "help"],
      ["Que faire si l’application ne démarre pas ?", "Vérifier que l’archive est entièrement décompressée, que le dossier est complet et accessible, puis retélécharger la même version si nécessaire.", "Dépannage", "help"],
      ["Que faire si l’interface semble figée pendant un calcul ?", "Attendre la fin du calcul, vérifier les ressources de la machine et tester un sous-ensemble ou une filtration adaptée avant de relancer une analyse lourde.", "Dépannage", "help"],
      ["Comment signaler un problème de manière utile ?", "Noter la version de BarCodeR, l’onglet concerné, l’action effectuée, le message affiché et, si possible, utiliser un objet public permettant de reproduire le problème.", "Dépannage", "help"]
    ] as FaqItem[]
  } : {
    k: "BarCodeR FAQ", title: "A clear answer at the right time.", p: "Installation, data, projects, analyses, reproducibility and troubleshooting: essential answers are gathered here so the workflow can continue without interruption.",
    topics: [["all", "All"], ["installation", "Installation"], ["data", "Data"], ["projects", "Projects"], ["analysis", "Analyses"], ["repro", "Reproducibility"], ["help", "Troubleshooting"]],
    filterLabel: "Filter questions", more: "Need a guided example?", action: "Open tutorials",
    items: [
      ["Do I need to install R or RStudio?", "No. The standalone distribution contains the environment required to launch and use BarCodeR.", "Installation", "installation"],
      ["Do I need to maintain R packages?", "No. Compatible package versions are assembled and tested when each distribution is built.", "Installation", "installation"],
      ["How do I install BarCodeR?", "Download the archive, extract it completely, then double-click the application inside the folder.", "Installation", "installation"],
      ["Are administrator rights required?", "Usually not when the application is placed in a writable folder. Institutional security policies may still require IT assistance.", "Installation", "installation"],
      ["Why can Windows display a warning?", "Windows may ask for confirmation before running downloaded software. Check that the archive came from the official source first.", "Installation", "installation"],
      ["How do I update BarCodeR?", "Download the new archive and open the new version. R, RStudio and packages are not updated separately.", "Installation", "installation"],
      ["Can I keep several versions?", "Yes. Separate folders can retain several distributions while a project is checked before the previous version is removed.", "Installation", "installation"],
      ["Which phyloseq formats can be imported?", "Compatible phyloseq objects can be loaded from .rds or .RData files. The application then checks their structure.", "Data", "data"],
      ["Can I start from FASTQ files?", "Yes. The OpenMetaBar tab prepares raw-sequence processing and retrieves the resulting phyloseq object into the project.", "Data", "data"],
      ["Are data sent online?", "Phyloseq objects and projects are handled locally. FASTQ processing may use the remote infrastructure configured for OpenMetaBar.", "Data", "data"],
      ["Can several datasets be used simultaneously?", "Yes. One project can collect several phyloseq objects, analyse them separately and use several datasets in compatible between-dataset analyses.", "Data", "data"],
      ["Why can a large dataset slow the application?", "Sample, taxon and sequence counts and the selected method affect calculation time. Scientifically justified filtering can reduce the load.", "Data", "data"],
      ["What does a BarCodeR project contain?", "A project organises datasets and retains working context: data states, saved figures, histories and R code when available.", "Projects", "projects"],
      ["How can a project be shared?", "Export the project archive and share it with the BarCodeR version used so another person can resume a structured workspace.", "Projects", "projects"],
      ["Will a project work after an update?", "It is designed to be reusable. Keep the previous version until a copy of the project has been opened and checked in the new distribution.", "Projects", "projects"],
      ["Does an import overwrite the original dataset?", "Editing and filtering operations can produce a named new version so the initial state remains available in the project.", "Projects", "projects"],
      ["What is the difference between Exploration and Analysis?", "Exploration describes data and reveals structures. Analysis gathers statistical methods that explicitly test or compare those structures.", "Analyses", "analysis"],
      ["Can several datasets be compared?", "Yes, when a method accepts compatible objects or paired samples. Within-dataset analyses remain independently available.", "Analyses", "analysis"],
      ["Are figures interactive?", "Compatible modules allow settings to be changed, results to update and visualisations to be manipulated before saving.", "Analyses", "analysis"],
      ["What is MultiView for?", "MultiView gathers saved project figures and lets them be arranged, resized and compared in one composition.", "Analyses", "analysis"],
      ["What should be checked before interpreting a result?", "Review available diagnostics, method requirements, experimental design and data quality.", "Analyses", "analysis"],
      ["How can the parameters behind a figure be found?", "A saved figure remains associated with the dataset, its version, parameters and available traces in the project.", "Reproducibility", "repro"],
      ["Is R code available for every action?", "It is retained when a module can generate it. Some interface actions or visualisations may not produce a complete script.", "Reproducibility", "repro"],
      ["How should BarCodeR be cited?", "Use the Citation page, select the appropriate bibliographic format and report the version actually used.", "Reproducibility", "repro"],
      ["Is an internet connection required?", "Not for local analyses. It may be needed to download the application, open an external resource or use OpenMetaBar infrastructure.", "Troubleshooting", "help"],
      ["What if the application does not start?", "Check that the archive was fully extracted, that the folder is complete and accessible, then download the same version again if needed.", "Troubleshooting", "help"],
      ["What if the interface appears frozen during a calculation?", "Wait for the calculation, check machine resources and try a subset or suitable filtering before relaunching a heavy analysis.", "Troubleshooting", "help"],
      ["How can a useful issue report be prepared?", "Record the BarCodeR version, relevant tab, action, displayed message and, where possible, a public object that reproduces the problem.", "Troubleshooting", "help"]
    ] as FaqItem[]
  };
  const visibleItems = filter === "all" ? c.items : c.items.filter(item => item[3] === filter);

  return <main className="faq-page">
    <section className="faq-page-hero"><div className="page-width"><div className="installer-v2-faq-orbit" aria-hidden="true"><span>?</span><i /><i /></div><header><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p>{c.p}</p></header></div></section>
    <section className="faq-page-content"><div className="page-width"><div className="installer-v2-faq-topics" role="group" aria-label={c.filterLabel}>{c.topics.map(([value, label]) => <button type="button" className={filter === value ? "active" : ""} aria-pressed={filter === value} onClick={() => setFilter(value)} key={value}>{label}</button>)}</div><div className="installer-v2-faq-list faq-page-grid">{visibleItems.map(([question, answer, tag], index) => <details className="reveal visible" open={index === 0} key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span><div><small>{tag}</small><b>{question}</b></div><i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}</div><footer className="installer-v2-faq-footer"><span><i aria-hidden="true">→</i>{c.more}</span><a href="#/tutorials">{c.action}<b>↗</b></a></footer></div></section>
  </main>;
}
