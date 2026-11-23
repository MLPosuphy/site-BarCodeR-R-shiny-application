
<div align="center">

# BarCodeR — Site web

**Présentation · Documentation · Ressources**

Site web du projet **BarCodeR**, une application R/Shiny consacrée à l'exploration, à l'analyse et à la visualisation interactive de données de métabarcoding.

[**Consulter le site web**](https://site-barcoder-r-shiny-application.pages.dev/)

</div>

---

## À propos

Ce dépôt contient le code source du site web de BarCodeR. Il présente le fonctionnement de l'application, ses principales fonctionnalités et les ressources destinées à ses utilisateurs.

Le site web est distinct de l'application R/Shiny et du pipeline de traitement bioinformatique OpenMetaBar, qui constituent des composants indépendants du projet.

## Contenu du site

| Rubrique | Description |
| :--- | :--- |
| **Accueil** | Présentation de BarCodeR et de son écosystème. |
| **Fonctionnement** | Utilisation à partir de données `phyloseq` ou de fichiers FASTQ traités avec OpenMetaBar. |
| **Analyses** | Présentation des outils d'édition des données, des analyses statistiques et des visualisations interactives. |
| **Tutoriels** | Ressources de prise en main et exemples d'utilisation. |
| **Installation** | Téléchargement et installation de l'application. |
| **FAQ** | Réponses aux questions fréquentes. |

## Écosystème logiciel

```mermaid
flowchart TB
    subgraph SOURCES["Sources de données"]
        FASTQ["Fichiers FASTQ"]
        PHYLO["Objet phyloseq existant"]
    end

    subgraph PREP["Traitement bioinformatique"]
        OMB["OpenMetaBar (Nextflow)"]
        PHYLO_OUT["Objet phyloseq généré"]
    end

    subgraph ANALYSIS["Analyse interactive"]
        BCR["BarCodeR (R / Shiny)"]
        RESULTS["Édition des données · Analyses · Visualisations"]
    end

    FASTQ --> OMB --> PHYLO_OUT --> BCR
    PHYLO --> BCR
    BCR --> RESULTS

    classDef input fill:#EFF6FF,stroke:#3B82F6,color:#1E3A8A,stroke-width:1px;
    classDef pipeline fill:#F0FDFA,stroke:#0D9488,color:#134E4A,stroke-width:1px;
    classDef app fill:#F3E8FF,stroke:#9333EA,color:#581C87,stroke-width:2px;
    classDef output fill:#F8FAFC,stroke:#64748B,color:#334155,stroke-width:1px;

    class FASTQ,PHYLO,PHYLO_OUT input;
    class OMB pipeline;
    class BCR app;
    class RESULTS output;
```

- **OpenMetaBar** : traitement bioinformatique des données de séquençage.
- **BarCodeR** : importation, édition, exploration, analyses et visualisations interactives des données.
- **Ce site web** : présentation du projet, documentation, tutoriels et informations d'installation.

## Développement et déploiement

La [procédure de prépublication et de référencement](docs/PRELAUNCH_SEO.md) détaille le contrôle du ZIP Windows, les tests et la configuration de Google Search Console.

Le site est hébergé sur **Cloudflare Pages**. La publication est automatisée à partir de la branche `main` du dépôt.

```mermaid
flowchart TB
    DEV["Développement, tests techniques et commits"]
    REVIEW["Tests et validation manuelle"]
    VALID{"Modifications validées ?"}
    MAIN["Push sur main"]
    BUILD["Cloudflare Pages : build et déploiement automatiques"]
    ONLINE["Site publié"]
    CONTROL["Vérification après publication"]

    DEV --> REVIEW --> VALID
    VALID -->|Non : corrections| DEV
    VALID -->|Oui| MAIN --> BUILD --> ONLINE --> CONTROL

    classDef development fill:#EFF6FF,stroke:#3B82F6,color:#1E3A8A,stroke-width:1px;
    classDef review fill:#FFF7ED,stroke:#EA580C,color:#7C2D12,stroke-width:1px;
    classDef deployment fill:#F0FDFA,stroke:#0D9488,color:#134E4A,stroke-width:1px;

    class DEV,MAIN development;
    class REVIEW,VALID review;
    class BUILD,ONLINE,CONTROL deployment;
```

Les évolutions du site sont développées à l'aide de Claude Code et de Codex, avec des tests techniques et des commits successifs. Les modifications sont ensuite contrôlées manuellement ; des corrections supplémentaires peuvent être demandées avant le `push` sur `main`.

Après le déploiement automatique, le rendu des pages, la navigation et les liens sont vérifiés.

La documentation, les captures d'écran et les liens de téléchargement sont maintenus en cohérence avec les versions publiées de BarCodeR et d'OpenMetaBar.

## Signaler un problème

Les erreurs de contenu, d'affichage ou de navigation peuvent être signalées dans les *Issues* de ce dépôt, lorsqu'elles sont activées. Les problèmes relatifs au fonctionnement de BarCodeR ou au traitement des séquences par OpenMetaBar doivent être adressés dans les dépôts correspondants.

## Licences

Le code source du site et ses contenus documentaires originaux relèvent de licences distinctes :

| Élément | Licence | Conditions principales |
| :--- | :--- | :--- |
| **Code source original du site** | [MIT](LICENSE) | Utilisation, modification et redistribution autorisées sous réserve de conserver les mentions de copyright et de licence. |
| **Contenus documentaires originaux** | [Creative Commons CC BY 4.0](LICENSE-CONTENT.md) | Reproduction, adaptation et exploitation commerciale autorisées avec attribution et indication des modifications. |

Les logos, marques, ressources tierces et éléments relevant d'une licence particulière ne sont pas automatiquement couverts par ces autorisations. Le périmètre et les exceptions sont détaillés dans [`LICENSE-CONTENT.md`](LICENSE-CONTENT.md).

**Titulaire des droits :** INRAE  
**Conception et développement du site :** Matéo Léger-Pigout  
**Année :** 2026

La diffusion sous ces licences doit être autorisée par les titulaires des droits et, le cas échéant, par les services institutionnels compétents. Ces licences concernent uniquement le site web ; celles de l'application **BarCodeR** et du pipeline **OpenMetaBar** sont indépendantes.

---

<div align="center">

[Site web de BarCodeR](https://site-barcoder-r-shiny-application.pages.dev/)

</div>
