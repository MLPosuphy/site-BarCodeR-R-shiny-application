
# BarCodeR — Site web

Ce dépôt contient le code source du [site web de BarCodeR](https://site-barcoder-r-shiny-application.pages.dev/), une application développée avec R et Shiny pour l'exploration, la visualisation et l'analyse de données de métabarcoding.

Le site présente le logiciel, ses principales fonctionnalités, ses modalités d'utilisation et les ressources nécessaires à sa prise en main.

## Contenu du site

Le site regroupe les informations suivantes :

- **Présentation de BarCodeR** : objectifs, organisation et principaux cas d'utilisation.
- **Fonctionnement** : importation et analyse d'objets `phyloseq`, ou traitement de fichiers FASTQ avec le pipeline OpenMetaBar.
- **Analyses** : aperçu des outils d'édition des données, des analyses statistiques et des visualisations interactives proposés par l'application.
- **Tutoriels** : ressources destinées à accompagner l'utilisation du logiciel.
- **Installation** : informations relatives au téléchargement et à la mise en place de BarCodeR.
- **FAQ** : réponses aux questions courantes.

## Organisation du projet

BarCodeR repose sur trois composants distincts :

- **Le site web**, dont les sources sont conservées dans ce dépôt, assure la présentation du projet et l'accès à sa documentation.
- **L'application BarCodeR**, développée avec R/Shiny, permet d'importer, de modifier et d'analyser des données de métabarcoding.
- **OpenMetaBar**, développé avec Nextflow, prend en charge le traitement bioinformatique des données de séquençage.

Le site ne réalise pas lui-même les analyses. Les évolutions de l'application et du pipeline sont suivies dans leurs dépôts respectifs.

## Développement et déploiement

Le site est hébergé sur **Cloudflare Pages**. Son déploiement est automatisé à partir de la branche `main` du dépôt.

Les modifications sont développées et vérifiées avant leur intégration. Une fois les changements validés, les commits sont poussés sur `main`, ce qui déclenche la reconstruction et la publication du site.

Après chaque déploiement, une vérification du rendu, de la navigation et des liens est effectuée.

Les mises à jour du site doivent rester cohérentes avec les versions publiées de BarCodeR et d'OpenMetaBar, en particulier pour la documentation, les captures d'écran, les fonctionnalités présentées et les liens de téléchargement.

## Signalement des problèmes

Les erreurs concernant le site (contenu, affichage ou liens) peuvent être signalées dans les *Issues* du dépôt, lorsqu'elles sont activées. Les problèmes propres à l'application BarCodeR ou au pipeline OpenMetaBar doivent être adressés à leurs dépôts respectifs.

## Licence

Les conditions de réutilisation du site sont définies par la licence associée à ce dépôt, lorsqu'elle est disponible. Les licences de BarCodeR et d'OpenMetaBar sont indépendantes de celle du site.

---

**Site web :** https://site-barcoder-r-shiny-application.pages.dev/
