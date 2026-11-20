
<div align="center">

# BarCodeR — Site web

**Présentation · Documentation · Ressources**

Site officiel de présentation de **BarCodeR**, une application R/Shiny dédiée à l'exploration, à l'analyse et à la visualisation interactive de données de métabarcoding.

[**Consulter le site web**](https://site-barcoder-r-shiny-application.pages.dev/)

</div>

---

## À propos

Ce dépôt contient les sources du site web de BarCodeR. Il présente les fonctionnalités du logiciel, ses modalités d'utilisation et les ressources destinées aux utilisateurs.

Le site est distinct de l'application d'analyse et du pipeline de traitement bioinformatique, qui disposent de leurs propres dépôts.

## Contenu du site

| Rubrique | Description |
| :--- | :--- |
| **Accueil** | Présentation générale de BarCodeR et de son écosystème. |
| **Fonctionnement** | Parcours d'utilisation à partir de fichiers FASTQ ou de données `phyloseq`. |
| **Analyses** | Aperçu des outils d'édition des données, des analyses et des visualisations interactives. |
| **Tutoriels** | Ressources pour découvrir et prendre en main l'application. |
| **Installation** | Informations sur le téléchargement et l'installation de BarCodeR. |
| **FAQ** | Réponses aux questions fréquentes. |

## Écosystème logiciel

BarCodeR s'inscrit dans un ensemble de composants complémentaires :

```text
Fichiers FASTQ ──► OpenMetaBar (Nextflow) ──► Données phyloseq
                                                  │
Objets phyloseq ───────────────────────────────────┤
                                                  ▼
                                         BarCodeR (R/Shiny)
                                                  │
                                                  ▼
                                    Analyses et visualisations
```

- **OpenMetaBar** assure le traitement bioinformatique des données de séquençage.
- **BarCodeR** permet l'importation, l'édition, l'exploration et l'analyse des données.
- **Le présent site** centralise la présentation du projet et les ressources de prise en main.

## Développement et déploiement

Le site est hébergé sur **Cloudflare Pages** et publié automatiquement après une mise à jour de la branche `main`.

```text
Développement → Vérification → Commit → Push sur main → Cloudflare Pages → Publication
```

Les modifications sont vérifiées avant leur intégration. Après publication, le rendu du site, la navigation et les liens doivent être contrôlés.

La documentation, les captures d'écran et les liens de téléchargement doivent rester cohérents avec les versions publiées de BarCodeR et d'OpenMetaBar.

## Signaler un problème

Les erreurs de contenu, d'affichage ou de navigation peuvent être signalées dans les *Issues* de ce dépôt, si elles sont activées. Les problèmes concernant les analyses ou le traitement des séquences doivent être signalés dans les dépôts des logiciels concernés.

## Licence

Les conditions de réutilisation du code du site sont celles définies dans la licence de ce dépôt, lorsqu'elle est publiée. BarCodeR et OpenMetaBar peuvent relever de licences distinctes.

---

<div align="center">

[Site web de BarCodeR](https://site-barcoder-r-shiny-application.pages.dev/)

</div>
