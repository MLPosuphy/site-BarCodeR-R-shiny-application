import { useState } from "react";
import type { Language } from "./content";

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
    packagingK: "Une application préparée avec executablePackeR", packagingT: "La complexité de R reste dans la fabrication de l’application, pas dans son utilisation.", packagingP: "executablePackeR transforme l’application Shiny en programme exécutable et permet d’intégrer l’environnement nécessaire à son lancement. La version distribuée de BarCodeR est préparée en amont : les dépendances sont assemblées et testées avant publication.",
    included: "Préparé dans la distribution", includedItems: ["Environnement R utilisé par BarCodeR", "Packages et dépendances compatibles", "Application Shiny et ressources associées", "Lanceur ouvrant l’interface"],
    user: "Ce qui reste à faire", userItems: ["Télécharger la version récente", "Conserver le dossier complet", "Double-cliquer sur l’application", "Télécharger une nouvelle version lors d’une mise à jour"],
    noNeed: "Aucune maintenance technique à assurer", noNeedItems: [["R", "Aucune installation locale de R"], ["RStudio", "Aucun environnement de développement"], ["Packages", "Aucune mise à jour manuelle"], ["Compatibilité", "Aucune résolution de dépendances"]],
    updateK: "Mises à jour", updateT: "Mettre BarCodeR à jour revient à télécharger une nouvelle version.", updateP: "Lorsqu’une version est publiée, le nouveau dossier contient un environnement cohérent avec cette version. Il n’est pas nécessaire de mettre R ou les packages à jour séparément. L’ancienne version peut être conservée temporairement jusqu’à la vérification de la nouvelle.",
    updateSteps: [["01", "Télécharger", "Récupérer le nouveau dossier BarCodeR."], ["02", "Ouvrir", "Lancer la nouvelle application sans modifier l’ancienne."], ["03", "Vérifier", "Ouvrir un projet ou importer un objet de test."], ["04", "Remplacer", "Archiver ou supprimer l’ancienne version lorsque tout est validé."]],
    limitsK: "Disponibilité", limitsT: "Une distribution locale adaptée au système pris en charge.", limitsP: "La distribution mise en avant concerne actuellement Windows. Une version macOS dédiée est prévue. Les disponibilités exactes doivent être vérifiées sur chaque publication.",
    startK: "Premier lancement", startT: "Les premiers repères après l’ouverture.", startItems: [["Créer un projet", "Donner un nom au nouvel espace de travail."], ["Importer un phyloseq", "Charger un fichier .rds ou .RData depuis Input data."], ["Découvrir l’interface", "Suivre les tutoriels d’installation et de prise en main."]],
    tutorials: "Ouvrir les tutoriels", citeK: "Citer BarCodeR", citeT: "Conserver la version utilisée dans les travaux.", copy: "Copier la citation", copied: "Citation copiée",
    faqK: "Questions fréquentes", faqT: "Tout ce qu’il faut savoir avant de commencer.", faqP: "Installation, mises à jour, données ou projets : les réponses essentielles pour utiliser BarCodeR sereinement, sans maintenance technique.",
    faqTopics: ["Installation", "Mises à jour", "Données", "Projets"],
    faqItems: [
      ["Faut-il installer R ou RStudio ?", "Non. La distribution autonome de BarCodeR contient l’environnement nécessaire à son fonctionnement. R et RStudio ne sont pas requis pour lancer et utiliser l’application.", "Installation"],
      ["Faut-il mettre les packages R à jour ?", "Non. Les versions des packages et leurs dépendances sont préparées et testées avec chaque distribution. Le dossier de l’application doit simplement rester complet et inchangé.", "Installation"],
      ["Comment mettre BarCodeR à jour ?", "Il suffit de télécharger le dossier de la nouvelle version et de lancer la nouvelle application. L’ancienne version peut être conservée le temps de vérifier un projet ou un objet de test.", "Mises à jour"],
      ["Peut-on conserver plusieurs versions ?", "Oui. Chaque version peut rester dans un dossier distinct. Cette organisation facilite les transitions et permet de retrouver précisément l’environnement utilisé pour une analyse.", "Mises à jour"],
      ["Les projets restent-ils utilisables après une mise à jour ?", "Les projets exportés et les datasets sont conçus pour être réutilisés. Par précaution, conserver l’ancienne version jusqu’à ce qu’une copie du projet ait été ouverte et contrôlée dans la nouvelle.", "Projets"],
      ["Quels objets phyloseq peuvent être importés ?", "BarCodeR accepte les objets phyloseq enregistrés dans des fichiers .rds ou .RData compatibles. Lors de l’import, l’application vérifie leur structure et applique les corrections prévues par ses conventions lorsque cela est possible.", "Données"],
      ["Où sont traitées les données ?", "Les objets phyloseq et les projets sont manipulés dans l’installation locale. Le traitement de séquences FASTQ avec OpenMetaBar constitue un cas particulier lorsqu’il utilise l’infrastructure distante configurée pour ce service.", "Données"],
      ["Que faire si l’application ne démarre pas ?", "Vérifier que l’archive a été entièrement décompressée, que le dossier contient toujours tous ses fichiers et que son emplacement est accessible. Si nécessaire, télécharger à nouveau la même version plutôt que d’installer R ou de modifier les packages.", "Dépannage"]
    ],
    faqMore: "Besoin d’un parcours guidé ?", faqAction: "Consulter les tutoriels"
  } : {
    k: "Install BarCodeR", title: "Download, open, analyse.", p: "BarCodeR is distributed as a standalone application. The required environment is prepared inside the downloaded folder: daily use requires neither R nor RStudio nor manual package maintenance.",
    release: "Current distribution", system: "Windows", status: "Local version", ready: "Standalone application",
    processK: "Installation", processT: "Three actions are enough to launch BarCodeR.", processP: "The downloaded folder contains the application and its runtime environment. It must remain complete: no internal file needs to be opened or changed.",
    process: [["↓", "Download the folder", "Get the latest published BarCodeR version."], ["↗", "Open the folder", "Extract the archive to an accessible location."], ["▶", "Double-click BarCodeR", "The application initialises its environment and opens the interface."]],
    packagingK: "An application prepared with executablePackeR", packagingT: "R complexity stays in application production, not in its use.", packagingP: "executablePackeR turns the Shiny application into an executable program and can integrate the environment needed to launch it. The distributed BarCodeR version is prepared in advance: dependencies are assembled and tested before publication.",
    included: "Prepared in the distribution", includedItems: ["R environment used by BarCodeR", "Compatible packages and dependencies", "Shiny application and associated resources", "Launcher that opens the interface"],
    user: "What remains to do", userItems: ["Download the recent version", "Keep the complete folder", "Double-click the application", "Download a new version when an update is released"],
    noNeed: "No technical maintenance required", noNeedItems: [["R", "No local R installation"], ["RStudio", "No development environment"], ["Packages", "No manual updates"], ["Compatibility", "No dependency resolution"]],
    updateK: "Updates", updateT: "Updating BarCodeR means downloading a new version.", updateP: "When a version is published, the new folder contains an environment consistent with that version. R and packages do not need to be updated separately. The old version can temporarily be retained until the new one has been checked.",
    updateSteps: [["01", "Download", "Get the new BarCodeR folder."], ["02", "Open", "Launch the new application without changing the old one."], ["03", "Check", "Open a project or import a test object."], ["04", "Replace", "Archive or remove the old version once everything is validated."]],
    limitsK: "Availability", limitsT: "A local distribution suited to the supported system.", limitsP: "The highlighted distribution currently targets Windows. A dedicated macOS version is planned. Exact availability should be checked for each release.",
    startK: "First launch", startT: "The first landmarks after opening.", startItems: [["Create a project", "Give the new workspace a name."], ["Import a phyloseq", "Load an .rds or .RData file from Input data."], ["Discover the interface", "Follow the installation and getting-started tutorials."]],
    tutorials: "Open tutorials", citeK: "Cite BarCodeR", citeT: "Keep the version used in your work.", copy: "Copy citation", copied: "Citation copied",
    faqK: "Frequently asked questions", faqT: "Everything to know before getting started.", faqP: "Installation, updates, data or projects: the essential answers for using BarCodeR confidently, without technical maintenance.",
    faqTopics: ["Installation", "Updates", "Data", "Projects"],
    faqItems: [
      ["Do I need to install R or RStudio?", "No. The standalone BarCodeR distribution includes the environment required to run it. Neither R nor RStudio is needed to launch and use the application.", "Installation"],
      ["Do I need to update R packages?", "No. Package versions and their dependencies are prepared and tested with each distribution. The application folder simply needs to remain complete and unchanged.", "Installation"],
      ["How do I update BarCodeR?", "Download the folder for the new version and launch the new application. The previous version can be kept while you check a project or test object.", "Updates"],
      ["Can several versions be kept?", "Yes. Each version can remain in a separate folder. This makes transitions easier and lets you recover the exact environment used for an analysis.", "Updates"],
      ["Can projects still be used after an update?", "Exported projects and datasets are designed to be reused. As a precaution, keep the previous version until a copy of the project has been opened and checked in the new one.", "Projects"],
      ["Which phyloseq objects can be imported?", "BarCodeR accepts compatible phyloseq objects saved as .rds or .RData files. During import, the application checks their structure and applies corrections required by its conventions whenever possible.", "Data"],
      ["Where is the data processed?", "Phyloseq objects and projects are handled in the local installation. FASTQ processing with OpenMetaBar is a special case when it uses the remote infrastructure configured for that service.", "Data"],
      ["What should I do if the application does not start?", "Check that the archive has been fully extracted, that the folder still contains all its files and that its location is accessible. If necessary, download the same version again rather than installing R or changing packages.", "Troubleshooting"]
    ],
    faqMore: "Need a guided path?", faqAction: "Browse the tutorials"
  };

  return <main className="installer-v2-page">
    <section className="installer-v2-hero"><div className="page-width"><header><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p>{c.p}</p><a className="button primary" href="#installer-process">{language === "fr" ? "Voir l’installation" : "View installation"}<span>↓</span></a></header><aside><div className="installer-v2-app-icon"><span>B</span><i /></div><small>{c.release}</small><h2>BarCodeR <em>v{appVersion}</em></h2><dl><div><dt>{c.system}</dt><dd>Windows</dd></div><div><dt>{c.status}</dt><dd>EXE</dd></div><div><dt>{c.ready}</dt><dd>✓</dd></div></dl></aside></div></section>

    <section className="installer-v2-process" id="installer-process"><div className="page-width"><div className="installer-v2-heading"><Eyebrow>{c.processK}</Eyebrow><h2>{c.processT}</h2><p>{c.processP}</p></div><div className="installer-v2-process-flow">{c.process.map(([icon, title, text], index) => <article className="reveal" key={title}><span>{icon}</span><small>0{index + 1}</small><h3>{title}</h3><p>{text}</p>{index < c.process.length - 1 && <i><em /></i>}</article>)}</div></div></section>

    <section className="installer-v2-packaging"><div className="page-width"><div className="installer-v2-heading reveal"><Eyebrow>{c.packagingK}</Eyebrow><h2>{c.packagingT}</h2><p>{c.packagingP}</p></div><div className="installer-v2-package-grid"><article className="included reveal"><header><span>✓</span><h3>{c.included}</h3></header><ul>{c.includedItems.map(item => <li key={item}>{item}</li>)}</ul></article><div className="installer-v2-package-core reveal"><span>executablePackeR</span><strong>BarCodeR.exe</strong><i><em /></i></div><article className="user reveal"><header><span>→</span><h3>{c.user}</h3></header><ul>{c.userItems.map(item => <li key={item}>{item}</li>)}</ul></article></div><div className="installer-v2-no-need"><h3>{c.noNeed}</h3><div>{c.noNeedItems.map(([title, text]) => <article key={title}><span>×</span><b>{title}</b><small>{text}</small></article>)}</div></div></div></section>

    <section className="installer-v2-update"><div className="page-width"><div className="installer-v2-heading reveal"><Eyebrow>{c.updateK}</Eyebrow><h2>{c.updateT}</h2><p>{c.updateP}</p></div><div className="installer-v2-update-flow">{c.updateSteps.map(([number, title, text]) => <article className="reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="installer-v2-availability"><div className="page-width"><div><Eyebrow>{c.limitsK}</Eyebrow><h2>{c.limitsT}</h2><p>{c.limitsP}</p></div><aside><span>Windows</span><b>Distribution locale</b><i>✓</i></aside></div></section>

    <section className="installer-v2-start"><div className="page-width"><div className="installer-v2-heading"><Eyebrow>{c.startK}</Eyebrow><h2>{c.startT}</h2></div><div className="installer-v2-start-grid">{c.startItems.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><a className="button primary" href="#/tutorials">{c.tutorials}<span>→</span></a></div></section>

    <section className="installer-v2-citation"><div className="page-width"><div><Eyebrow>{c.citeK}</Eyebrow><h2>{c.citeT}</h2></div><blockquote>{citation}</blockquote><button type="button" onClick={copyCitation}>{copied ? c.copied : c.copy}</button></div></section>

    <section className="installer-v2-faq"><div className="page-width"><header className="installer-v2-faq-heading reveal"><div className="installer-v2-faq-orbit" aria-hidden="true"><span>?</span><i /><i /></div><Eyebrow>{c.faqK}</Eyebrow><h2>{c.faqT}</h2><p>{c.faqP}</p><div className="installer-v2-faq-topics">{c.faqTopics.map(topic => <span key={topic}>{topic}</span>)}</div></header><div className="installer-v2-faq-list">{c.faqItems.map(([question, answer, tag], index) => <details className="reveal" open={index === 0} key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span><div><small>{tag}</small><b>{question}</b></div><i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}</div><footer className="installer-v2-faq-footer"><span><i aria-hidden="true">→</i>{c.faqMore}</span><a href="#/tutorials">{c.faqAction}<b>↗</b></a></footer></div></section>
  </main>;
}
