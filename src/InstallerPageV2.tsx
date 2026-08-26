import { useState } from "react";
import type { Language } from "./content";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

export default function InstallerPageV2({ language }: { language: Language }) {
  const [copied, setCopied] = useState(false);
  const appVersion = "2.12.8";
  const citation = language === "fr"
    ? `Équipe BarCodeR (${new Date().getFullYear()}). BarCodeR v${appVersion} : plateforme pour l’exploration et l’analyse reproductible de données de métabarcoding.`
    : `BarCodeR team (${new Date().getFullYear()}). BarCodeR v${appVersion}: a platform for reproducible exploration and analysis of metabarcoding data.`;
  const copyCitation = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const c = language === "fr" ? {
    k: "Installer BarCodeR", title: "Télécharger, ouvrir, analyser.", p: "BarCodeR est distribué comme une application autonome. L’environnement nécessaire est préparé dans le dossier téléchargé : l’utilisation quotidienne ne demande ni R, ni RStudio, ni maintenance manuelle des packages.",
    release: "Distribution actuelle", system: "Windows", status: "Version locale", ready: "Application autonome",
    processK: "Installation", processT: "Trois actions suffisent pour lancer BarCodeR.", processP: "Le dossier téléchargé contient l’application et son environnement d’exécution. Il doit rester complet : aucun fichier interne n’a besoin d’être ouvert ou modifié.",
    process: [["↓", "Télécharger le dossier", "Récupérer la dernière version publiée de BarCodeR."], ["↗", "Ouvrir le dossier", "Décompresser l’archive dans un emplacement accessible."], ["▶", "Double-cliquer sur BarCodeR", "L’application initialise son environnement puis ouvre l’interface."]],
    packagingK: "Une application préparée avec executablePackeR", packagingT: "Épargnez-vous la difficulté de maintenir R et de multiples packages à jour pour utiliser l’application.", packagingP: "executablePackeR transforme l’application Shiny en programme exécutable et permet d’intégrer l’environnement nécessaire à son lancement. La version distribuée de BarCodeR est préparée en amont : les dépendances sont assemblées et testées avant publication.",
    included: "Préparé dans la distribution", includedItems: ["Environnement R utilisé par BarCodeR", "Packages et dépendances compatibles", "Application Shiny et ressources associées", "Lanceur ouvrant l’interface"],
    user: "Ce qui reste à faire", userItems: ["Télécharger la version récente", "Conserver le dossier complet", "Double-cliquer sur l’application", "Télécharger une nouvelle version lors d’une mise à jour"],
    noNeed: "Aucune maintenance technique à assurer", noNeedItems: [["R", "Aucune installation locale de R"], ["RStudio", "Aucun environnement de développement"], ["Packages", "Aucune mise à jour manuelle"], ["Compatibilité", "Aucune résolution de dépendances"]],
    updateK: "Mises à jour", updateT: "Mettre BarCodeR à jour revient à télécharger une nouvelle version.", updateP: "Lorsqu’une version est publiée, le nouveau dossier contient un environnement cohérent avec cette version. Il n’est pas nécessaire de mettre R ou les packages à jour séparément. L’ancienne version peut être conservée temporairement jusqu’à la vérification de la nouvelle.",
    updateSteps: [["01", "Télécharger", "Récupérer le nouveau dossier BarCodeR."], ["02", "Ouvrir", "Lancer la nouvelle application sans modifier l’ancienne."], ["03", "Vérifier", "Ouvrir un projet ou importer un objet de test."], ["04", "Remplacer", "Archiver ou supprimer l’ancienne version lorsque tout est validé."]],
    limitsK: "Disponibilité", limitsT: "Une distribution locale adaptée au système pris en charge.", limitsP: "La distribution mise en avant concerne actuellement Windows. Une version macOS dédiée est prévue. Les disponibilités exactes doivent être vérifiées sur chaque publication.",
    startK: "Premier lancement", startT: "Les premiers repères après l’ouverture.", startItems: [["Créer un projet", "Donner un nom au nouvel espace de travail."], ["Importer un phyloseq", "Charger un fichier .rds ou .RData depuis Input data."], ["Découvrir l’interface", "Suivre les tutoriels d’installation et de prise en main."]],
    tutorials: "Ouvrir les tutoriels", citeK: "Citer BarCodeR", citeT: "Conserver la version utilisée dans les travaux.", copy: "Copier la citation", copied: "Citation copiée", citationPage: "Ouvrir la page Citation", download: "Télécharger l’archive test v2.12.7 (.zip)", seeProcess: "Voir les trois étapes",
    faqK: "Questions fréquentes", faqT: "Tout ce qu’il faut savoir avant de commencer.", faqP: "Installation, mises à jour, données, projets ou dépannage : des réponses concrètes pour comprendre le fonctionnement de BarCodeR et résoudre les situations courantes.",
    faqTopics: [["all", "Toutes"], ["installation", "Installation"], ["updates", "Mises à jour"], ["data", "Données"], ["projects", "Projets"], ["usage", "Utilisation"]],
    faqItems: [
      ["Faut-il installer R ou RStudio ?", "Non. La distribution autonome de BarCodeR contient l’environnement nécessaire à son fonctionnement. R et RStudio ne sont pas requis pour lancer et utiliser l’application.", "Installation", "installation"],
      ["Faut-il installer ou mettre à jour des packages R ?", "Non. Les versions des packages et leurs dépendances sont préparées et testées avec chaque distribution. Le dossier de l’application doit simplement rester complet et inchangé.", "Installation", "installation"],
      ["Des droits administrateur sont-ils nécessaires ?", "L’application est conçue pour être ouverte depuis un dossier accessible à l’utilisateur. Certaines politiques de sécurité propres à un établissement peuvent néanmoins limiter l’exécution d’un programme téléchargé et nécessiter l’intervention du service informatique.", "Installation", "installation"],
      ["Pourquoi Windows peut-il afficher un avertissement ?", "Selon les paramètres de sécurité du poste, Windows peut demander une confirmation avant l’ouverture d’une application téléchargée. Il faut alors vérifier que le dossier provient bien de la source officielle de distribution de BarCodeR avant de poursuivre.", "Installation", "installation"],
      ["Comment mettre BarCodeR à jour ?", "Il suffit de télécharger le dossier de la nouvelle version et de lancer la nouvelle application. Aucune mise à jour séparée de R, de RStudio ou des packages n’est nécessaire.", "Mises à jour", "updates"],
      ["Les mises à jour sont-elles automatiques ?", "Non. Le téléchargement d’une nouvelle distribution reste volontaire. Cette organisation permet de choisir le moment de la transition et de vérifier la nouvelle version avant de remplacer l’ancienne.", "Mises à jour", "updates"],
      ["Peut-on conserver plusieurs versions ?", "Oui. Chaque version peut rester dans un dossier distinct. Cette organisation facilite les transitions et permet de retrouver précisément l’environnement utilisé pour une analyse.", "Mises à jour", "updates"],
      ["Quels objets phyloseq peuvent être importés ?", "BarCodeR accepte les objets phyloseq enregistrés dans des fichiers .rds ou .RData compatibles. Lors de l’import, l’application vérifie leur structure et applique les corrections prévues par ses conventions lorsque cela est possible.", "Données", "data"],
      ["Peut-on commencer directement avec des fichiers FASTQ ?", "Oui. L’onglet OpenMetaBar permet d’initier le traitement de séquences brutes afin de produire un objet phyloseq structuré, qui rejoint ensuite le même parcours analytique que les objets importés.", "Données", "data"],
      ["Où sont traitées les données ?", "Les objets phyloseq et les projets sont manipulés dans l’installation locale. Le traitement de séquences FASTQ avec OpenMetaBar constitue un cas particulier lorsqu’il utilise l’infrastructure distante configurée pour ce service.", "Données", "data"],
      ["Les datasets volumineux peuvent-ils ralentir l’application ?", "Oui. Le temps de calcul et la réactivité dépendent notamment du nombre d’échantillons, de taxons, de séquences, des analyses demandées et des ressources disponibles sur le poste. Des filtrations adaptées peuvent réduire la charge lorsque cela est scientifiquement pertinent.", "Données", "data"],
      ["Que contient un projet BarCodeR ?", "Un projet organise les datasets utilisés dans une même session de travail et conserve les éléments nécessaires à sa continuité, notamment les données, les figures sauvegardées, les historiques et le code R généré par les actions compatibles.", "Projets", "projects"],
      ["Un projet peut-il être transmis à une autre personne ?", "Oui. L’archive de projet permet de transmettre un environnement de travail structuré afin de reprendre les données, les résultats et leur contexte dans une autre installation compatible de BarCodeR.", "Projets", "projects"],
      ["Les projets restent-ils utilisables après une mise à jour ?", "Les projets exportés et les datasets sont conçus pour être réutilisés. Par précaution, il est recommandé de conserver l’ancienne version jusqu’à ce qu’une copie du projet ait été ouverte et contrôlée dans la nouvelle.", "Projets", "projects"],
      ["Une connexion internet est-elle toujours nécessaire ?", "Non pour les opérations réalisées localement sur les objets phyloseq et les projets. Une connexion peut toutefois être nécessaire pour télécharger l’application, consulter des ressources externes ou utiliser un service distant associé à OpenMetaBar.", "Utilisation", "usage"],
      ["BarCodeR est-il disponible sur macOS ou Linux ?", "La distribution autonome mise en avant concerne actuellement Windows. Une version macOS dédiée est prévue ; la disponibilité exacte des distributions doit être vérifiée pour chaque publication.", "Utilisation", "usage"],
      ["Que faire si l’application ne démarre pas ?", "Vérifier que l’archive a été entièrement décompressée, que le dossier contient toujours tous ses fichiers et que son emplacement est accessible. Si nécessaire, télécharger à nouveau la même version plutôt que d’installer R ou de modifier les packages.", "Dépannage", "usage"]
    ],
    faqFilterLabel: "Filtrer les questions", faqCount: "questions affichées", faqMore: "Besoin d’un parcours guidé ?", faqAction: "Consulter les tutoriels"
  } : {
    k: "Install BarCodeR", title: "Download, open, analyse.", p: "BarCodeR is distributed as a standalone application. The required environment is prepared inside the downloaded folder: daily use requires neither R nor RStudio nor manual package maintenance.",
    release: "Current distribution", system: "Windows", status: "Local version", ready: "Standalone application",
    processK: "Installation", processT: "Three actions are enough to launch BarCodeR.", processP: "The downloaded folder contains the application and its runtime environment. It must remain complete: no internal file needs to be opened or changed.",
    process: [["↓", "Download the folder", "Get the latest published BarCodeR version."], ["↗", "Open the folder", "Extract the archive to an accessible location."], ["▶", "Double-click BarCodeR", "The application initialises its environment and opens the interface."]],
    packagingK: "An application prepared with executablePackeR", packagingT: "Avoid the difficulty of keeping R and multiple packages up to date just to use the application.", packagingP: "executablePackeR turns the Shiny application into an executable program and can integrate the environment needed to launch it. The distributed BarCodeR version is prepared in advance: dependencies are assembled and tested before publication.",
    included: "Prepared in the distribution", includedItems: ["R environment used by BarCodeR", "Compatible packages and dependencies", "Shiny application and associated resources", "Launcher that opens the interface"],
    user: "What remains to do", userItems: ["Download the recent version", "Keep the complete folder", "Double-click the application", "Download a new version when an update is released"],
    noNeed: "No technical maintenance required", noNeedItems: [["R", "No local R installation"], ["RStudio", "No development environment"], ["Packages", "No manual updates"], ["Compatibility", "No dependency resolution"]],
    updateK: "Updates", updateT: "Updating BarCodeR means downloading a new version.", updateP: "When a version is published, the new folder contains an environment consistent with that version. R and packages do not need to be updated separately. The old version can temporarily be retained until the new one has been checked.",
    updateSteps: [["01", "Download", "Get the new BarCodeR folder."], ["02", "Open", "Launch the new application without changing the old one."], ["03", "Check", "Open a project or import a test object."], ["04", "Replace", "Archive or remove the old version once everything is validated."]],
    limitsK: "Availability", limitsT: "A local distribution suited to the supported system.", limitsP: "The highlighted distribution currently targets Windows. A dedicated macOS version is planned. Exact availability should be checked for each release.",
    startK: "First launch", startT: "The first landmarks after opening.", startItems: [["Create a project", "Give the new workspace a name."], ["Import a phyloseq", "Load an .rds or .RData file from Input data."], ["Discover the interface", "Follow the installation and getting-started tutorials."]],
    tutorials: "Open tutorials", citeK: "Cite BarCodeR", citeT: "Keep the version used in your work.", copy: "Copy citation", copied: "Citation copied", citationPage: "Open the Citation page", download: "Download test archive v2.12.7 (.zip)", seeProcess: "View the three steps",
    faqK: "Frequently asked questions", faqT: "Everything to know before getting started.", faqP: "Installation, updates, data, projects or troubleshooting: practical answers to understand how BarCodeR works and resolve common situations.",
    faqTopics: [["all", "All"], ["installation", "Installation"], ["updates", "Updates"], ["data", "Data"], ["projects", "Projects"], ["usage", "Use"]],
    faqItems: [
      ["Do I need to install R or RStudio?", "No. The standalone BarCodeR distribution includes the environment required to run it. Neither R nor RStudio is needed to launch and use the application.", "Installation", "installation"],
      ["Do I need to install or update R packages?", "No. Package versions and their dependencies are prepared and tested with each distribution. The application folder simply needs to remain complete and unchanged.", "Installation", "installation"],
      ["Are administrator rights required?", "The application is designed to open from a folder accessible to the user. Security policies specific to an institution may nevertheless restrict downloaded programs and require assistance from its IT department.", "Installation", "installation"],
      ["Why might Windows display a warning?", "Depending on the workstation's security settings, Windows may request confirmation before opening a downloaded application. Check that the folder comes from the official BarCodeR distribution source before proceeding.", "Installation", "installation"],
      ["How do I update BarCodeR?", "Download the folder for the new version and launch the new application. No separate update of R, RStudio or packages is required.", "Updates", "updates"],
      ["Are updates automatic?", "No. Downloading a new distribution remains voluntary. This lets users choose when to transition and check the new version before replacing the previous one.", "Updates", "updates"],
      ["Can several versions be kept?", "Yes. Each version can remain in a separate folder. This makes transitions easier and lets you recover the exact environment used for an analysis.", "Updates", "updates"],
      ["Which phyloseq objects can be imported?", "BarCodeR accepts compatible phyloseq objects saved as .rds or .RData files. During import, the application checks their structure and applies corrections required by its conventions whenever possible.", "Data", "data"],
      ["Can I start directly from FASTQ files?", "Yes. The OpenMetaBar tab initiates raw-sequence processing to produce a structured phyloseq object, which then joins the same analytical journey as imported objects.", "Data", "data"],
      ["Where is the data processed?", "Phyloseq objects and projects are handled in the local installation. FASTQ processing with OpenMetaBar is a special case when it uses the remote infrastructure configured for that service.", "Data", "data"],
      ["Can large datasets slow the application down?", "Yes. Calculation time and responsiveness depend on the numbers of samples, taxa and sequences, the requested analyses and the workstation's available resources. Appropriate filtering can reduce the load when scientifically relevant.", "Data", "data"],
      ["What does a BarCodeR project contain?", "A project organises datasets used in the same work session and retains the elements required for continuity, including data, saved figures, histories and R code generated by compatible actions.", "Projects", "projects"],
      ["Can a project be shared with someone else?", "Yes. A project archive transfers a structured working environment so that data, results and their context can be resumed in another compatible BarCodeR installation.", "Projects", "projects"],
      ["Can projects still be used after an update?", "Exported projects and datasets are designed to be reused. As a precaution, keep the previous version until a copy of the project has been opened and checked in the new one.", "Projects", "projects"],
      ["Is an internet connection always required?", "No for operations performed locally on phyloseq objects and projects. A connection may nevertheless be required to download the application, consult external resources or use a remote service associated with OpenMetaBar.", "Use", "usage"],
      ["Is BarCodeR available on macOS or Linux?", "The highlighted standalone distribution currently targets Windows. A dedicated macOS version is planned; exact distribution availability should be checked for each release.", "Use", "usage"],
      ["What should I do if the application does not start?", "Check that the archive has been fully extracted, that the folder still contains all its files and that its location is accessible. If necessary, download the same version again rather than installing R or changing packages.", "Troubleshooting", "usage"]
    ],
    faqFilterLabel: "Filter questions", faqCount: "questions shown", faqMore: "Need a guided path?", faqAction: "Browse the tutorials"
  };

  return <main className="installer-v2-page">
    <section className="installer-v2-hero"><div className="page-width"><header><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p>{c.p}</p><div className="installer-v2-hero-actions"><a className="button primary" href={asset("downloads/BarCodeR_v2.12.7.zip")} download>{c.download}<span>↓</span></a><a className="button secondary" href="#installer-process">{c.seeProcess}<span>↓</span></a></div></header><aside><div className="installer-v2-app-icon"><span>B</span><i /></div><small>{c.release}</small><h2>BarCodeR <em>v{appVersion}</em></h2><dl><div><dt>{c.system}</dt><dd>Windows</dd></div><div><dt>{c.status}</dt><dd>EXE</dd></div><div><dt>{c.ready}</dt><dd>✓</dd></div></dl></aside></div></section>

    <section className="installer-v2-process" id="installer-process"><div className="page-width"><div className="installer-v2-heading"><Eyebrow>{c.processK}</Eyebrow><h2>{c.processT}</h2><p>{c.processP}</p></div><div className="installer-v2-process-flow">{c.process.map(([icon, title, text], index) => <article className="reveal" key={title}><span>{icon}</span><small>0{index + 1}</small><h3>{title}</h3><p>{text}</p>{index < c.process.length - 1 && <i><em /></i>}</article>)}</div></div></section>

    <section className="installer-v2-packaging"><div className="page-width"><div className="installer-v2-heading reveal"><Eyebrow>{c.packagingK}</Eyebrow><h2>{c.packagingT}</h2><p>{c.packagingP}</p></div><div className="installer-v2-package-grid"><article className="included reveal"><header><span>✓</span><h3>{c.included}</h3></header><ul>{c.includedItems.map(item => <li key={item}>{item}</li>)}</ul></article><div className="installer-v2-package-core reveal"><span>executablePackeR</span><strong>BarCodeR.exe</strong><i><em /></i></div><article className="user reveal"><header><span>→</span><h3>{c.user}</h3></header><ul>{c.userItems.map(item => <li key={item}>{item}</li>)}</ul></article></div><div className="installer-v2-no-need"><h3>{c.noNeed}</h3><div>{c.noNeedItems.map(([title, text]) => <article key={title}><span>×</span><b>{title}</b><small>{text}</small></article>)}</div></div></div></section>

    <section className="installer-v2-update"><div className="page-width"><div className="installer-v2-heading reveal"><Eyebrow>{c.updateK}</Eyebrow><h2>{c.updateT}</h2><p>{c.updateP}</p></div><div className="installer-v2-update-flow">{c.updateSteps.map(([number, title, text]) => <article className="reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="installer-v2-availability"><div className="page-width"><div><Eyebrow>{c.limitsK}</Eyebrow><h2>{c.limitsT}</h2><p>{c.limitsP}</p></div><aside><span>Windows</span><b>Distribution locale</b><i>✓</i></aside></div></section>

    <section className="installer-v2-start"><div className="page-width"><div className="installer-v2-heading"><Eyebrow>{c.startK}</Eyebrow><h2>{c.startT}</h2></div><div className="installer-v2-start-grid">{c.startItems.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><a className="button primary" href="#/tutorials">{c.tutorials}<span>→</span></a></div></section>

    <section className="installer-v2-citation"><div className="page-width"><div><Eyebrow>{c.citeK}</Eyebrow><h2>{c.citeT}</h2></div><blockquote>{citation}</blockquote><div className="installer-v2-citation-actions"><button type="button" onClick={copyCitation}>{copied ? c.copied : c.copy}</button><a href="#/citation">{c.citationPage}<span>→</span></a></div></div></section>

  </main>;
}
