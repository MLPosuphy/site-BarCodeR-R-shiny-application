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
    k: "Installer BarCodeR",
    title: "Télécharger, ouvrir, analyser.",
    p: "BarCodeR est distribué sous Windows comme une application autonome. L’environnement nécessaire est préparé dans le dossier téléchargé : l’utilisation quotidienne ne demande ni R, ni RStudio, ni maintenance manuelle des packages.",
    release: "Distribution actuelle",
    system: "Windows",
    status: "Version locale",
    ready: "Application autonome",
    processK: "Installation",
    processT: "Trois actions suffisent pour lancer BarCodeR.",
    processP: "Le dossier téléchargé contient l’application et son environnement d’exécution. Il doit rester complet : aucun fichier interne n’a besoin d’être ouvert ou modifié.",
    process: [
      ["↓", "Télécharger le dossier", "Récupérer la dernière version publiée de BarCodeR."],
      ["↗", "Ouvrir le dossier", "Décompresser l’archive dans un emplacement accessible."],
      ["▶", "Double-cliquer sur BarCodeR", "L’application initialise son environnement puis ouvre l’interface."]
    ],
    packagingK: "Une application préparée avec executablePackeR",
    packagingT: "Épargnez-vous la difficulté de maintenir R et de multiples packages à jour pour utiliser l’application.",
    packagingP: "executablePackeR transforme l’application Shiny en programme exécutable et permet d’intégrer l’environnement nécessaire à son lancement. La version distribuée de BarCodeR est préparée en amont : les dépendances sont assemblées et testées avant publication.",
    included: "Préparé dans la distribution",
    includedItems: ["Environnement R utilisé par BarCodeR", "Packages et dépendances compatibles", "Application Shiny et ressources associées", "Lanceur ouvrant l’interface"],
    user: "Ce qui reste à faire",
    userItems: ["Télécharger la version récente", "Conserver le dossier complet", "Double-cliquer sur l’application", "Télécharger une nouvelle version lors d’une mise à jour"],
    noNeed: "Aucune maintenance technique à assurer",
    noNeedItems: [["R", "Aucune installation locale de R"], ["RStudio", "Aucun environnement de développement"], ["Packages", "Aucune mise à jour manuelle"], ["Compatibilité", "Aucune résolution de dépendances"]],
    updateK: "Mises à jour",
    updateT: "Mettre BarCodeR à jour revient à télécharger une nouvelle version.",
    updateP: "Lorsqu’une version est publiée, le nouveau dossier contient un environnement cohérent avec cette version. Il n’est pas nécessaire de mettre R ou les packages à jour séparément. L’ancienne version peut être conservée temporairement jusqu’à la vérification de la nouvelle.",
    updateSteps: [["01", "Télécharger", "Récupérer le nouveau dossier BarCodeR."], ["02", "Ouvrir", "Lancer la nouvelle application sans modifier l’ancienne."], ["03", "Vérifier", "Ouvrir un projet ou importer un objet de test."], ["04", "Remplacer", "Archiver ou supprimer l’ancienne version lorsque tout est validé."]],
    citeK: "Citer BarCodeR",
    citeT: "Conserver la version utilisée dans les travaux.",
    copy: "Copier la citation",
    copied: "Citation copiée",
    citationPage: "Ouvrir la page Citation",
    download: "Tester le téléchargement (.zip)",
    seeProcess: "Voir les trois étapes"
  } : {
    k: "Install BarCodeR",
    title: "Download, open, analyse.",
    p: "BarCodeR is distributed for Windows as a standalone application. The required environment is prepared inside the downloaded folder: daily use requires neither R nor RStudio nor manual package maintenance.",
    release: "Current distribution",
    system: "Windows",
    status: "Local version",
    ready: "Standalone application",
    processK: "Installation",
    processT: "Three actions are enough to launch BarCodeR.",
    processP: "The downloaded folder contains the application and its runtime environment. It must remain complete: no internal file needs to be opened or changed.",
    process: [
      ["↓", "Download the folder", "Get the latest published BarCodeR version."],
      ["↗", "Open the folder", "Extract the archive to an accessible location."],
      ["▶", "Double-click BarCodeR", "The application initialises its environment and opens the interface."]
    ],
    packagingK: "An application prepared with executablePackeR",
    packagingT: "Avoid the difficulty of keeping R and multiple packages up to date just to use the application.",
    packagingP: "executablePackeR turns the Shiny application into an executable program and can integrate the environment needed to launch it. The distributed BarCodeR version is prepared in advance: dependencies are assembled and tested before publication.",
    included: "Prepared in the distribution",
    includedItems: ["R environment used by BarCodeR", "Compatible packages and dependencies", "Shiny application and associated resources", "Launcher that opens the interface"],
    user: "What remains to do",
    userItems: ["Download the recent version", "Keep the complete folder", "Double-click the application", "Download a new version when an update is released"],
    noNeed: "No technical maintenance required",
    noNeedItems: [["R", "No local R installation"], ["RStudio", "No development environment"], ["Packages", "No manual updates"], ["Compatibility", "No dependency resolution"]],
    updateK: "Updates",
    updateT: "Updating BarCodeR means downloading a new version.",
    updateP: "When a version is published, the new folder contains an environment consistent with that version. R and packages do not need to be updated separately. The old version can temporarily be retained until the new one has been checked.",
    updateSteps: [["01", "Download", "Get the new BarCodeR folder."], ["02", "Open", "Launch the new application without changing the old one."], ["03", "Check", "Open a project or import a test object."], ["04", "Replace", "Archive or remove the old version once everything is validated."]],
    citeK: "Cite BarCodeR",
    citeT: "Keep the version used in your work.",
    copy: "Copy citation",
    copied: "Citation copied",
    citationPage: "Open the Citation page",
    download: "Test the download (.zip)",
    seeProcess: "View the three steps"
  };

  return <main className="installer-v2-page">
    <section className="installer-v2-hero"><div className="page-width"><header><Eyebrow>{c.k}</Eyebrow><h1>{c.title}</h1><p>{c.p}</p><div className="installer-v2-hero-actions"><a className="button primary" href={asset("downloads/BarCodeR_telechargement_test.zip")} download>{c.download}<span>↓</span></a><a className="button secondary" href="#installer-process">{c.seeProcess}<span>↓</span></a></div></header><aside><div className="installer-v2-app-icon"><span>B</span><i /></div><small>{c.release}</small><h2>BarCodeR <em>v{appVersion}</em></h2><dl><div><dt>{c.system}</dt><dd>Windows</dd></div><div><dt>{c.status}</dt><dd>EXE</dd></div><div><dt>{c.ready}</dt><dd>✓</dd></div></dl></aside></div></section>

    <section className="installer-v2-process" id="installer-process"><div className="page-width"><div className="installer-v2-heading"><Eyebrow>{c.processK}</Eyebrow><h2>{c.processT}</h2><p>{c.processP}</p></div><div className="installer-v2-process-flow">{c.process.map(([icon, title, text], index) => <article className="reveal" key={title}><span>{icon}</span><small>0{index + 1}</small><h3>{title}</h3><p>{text}</p>{index < c.process.length - 1 && <i><em /></i>}</article>)}</div></div></section>

    <section className="installer-v2-packaging"><div className="page-width"><div className="installer-v2-heading reveal"><Eyebrow>{c.packagingK}</Eyebrow><h2>{c.packagingT}</h2><p>{c.packagingP}</p></div><div className="installer-v2-package-grid"><article className="included reveal"><header><span>✓</span><h3>{c.included}</h3></header><ul>{c.includedItems.map(item => <li key={item}>{item}</li>)}</ul></article><div className="installer-v2-package-core reveal"><span>executablePackeR</span><strong>BarCodeR.exe</strong><i><em /></i></div><article className="user reveal"><header><span>→</span><h3>{c.user}</h3></header><ul>{c.userItems.map(item => <li key={item}>{item}</li>)}</ul></article></div><div className="installer-v2-no-need"><h3>{c.noNeed}</h3><div>{c.noNeedItems.map(([title, text]) => <article key={title}><span>×</span><b>{title}</b><small>{text}</small></article>)}</div></div></div></section>

    <section className="installer-v2-update"><div className="page-width"><div className="installer-v2-heading reveal"><Eyebrow>{c.updateK}</Eyebrow><h2>{c.updateT}</h2><p>{c.updateP}</p></div><div className="installer-v2-update-flow">{c.updateSteps.map(([number, title, text]) => <article className="reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="installer-v2-citation"><div className="page-width"><div><Eyebrow>{c.citeK}</Eyebrow><h2>{c.citeT}</h2></div><blockquote>{citation}</blockquote><div className="installer-v2-citation-actions"><button type="button" onClick={copyCitation}>{copied ? c.copied : c.copy}</button><a href="#/citation">{c.citationPage}<span>→</span></a></div></div></section>
  </main>;
}
