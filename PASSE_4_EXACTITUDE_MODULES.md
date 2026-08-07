# Passe 4 — Exactitude fonctionnelle des pages d’onglets

Date : 2026-08-07

## Objectif

Aligner les pages publiques consacrées aux onglets de BarCodeR sur le comportement réel de l’application, sans transformer le site vitrine en documentation technique.

Principe appliqué :

> Le site décrit ce que l’utilisateur donne à l’onglet, ce qu’il peut y faire, ce qu’il obtient et les limites importantes. La documentation conserve les paramètres, algorithmes, fonctions R et détails d’implémentation.

## Sources de vérité vérifiées

Les formulations publiques ont été confrontées au code et aux fiches d’architecture de l’application fournie :

- Accueil : `modules/home/` + `.claude/architecture/61-home.md`
- Documentation : `modules/documentation/` + `.claude/architecture/60-documentation.md`
- OpenMetaBar : `modules/openmetabar/` + `.claude/architecture/50-openmetabar.md`
- Input data : `modules/data/` + `.claude/architecture/20-data-loader.md`
- Datasets : `modules/datasets/` + `.claude/architecture/24-datasets.md`
- Description : `modules/description/` + `.claude/architecture/21-description.md`
- Data Edition : `modules/dataedition/` + `.claude/architecture/22-dataedition.md`
- Filtration : `modules/filtration/` + `.claude/architecture/23-filtration.md`
- Exploration : `modules/exploration/` + `.claude/architecture/30-*` à `35-*`
- Analyse : `modules/analyse/` + `.claude/architecture/40-*` à `45-*`
- MultiView : `modules/multiview/` + `.claude/architecture/16-multiview.md`
- App Theme : `modules/theme/` + `.claude/architecture/15-theme.md`
- Paramètres : `modules/settings/` + `.claude/architecture/17-settings.md`
- Reproduction du code : `.claude/architecture/13-repro-code.md`
- Télémétrie : `.claude/architecture/14-telemetry.md`

## Corrections structurantes

### Input data

- Le site parle désormais d’objets phyloseq **complets ou partiels** déjà construits.
- Formats affichés : `.rds`, `.RData`, `.rda`, `.rdata`.
- L’import de plusieurs objets compatibles depuis un même fichier R est explicité.
- Les contrôles et normalisations réalisés au chargement sont annoncés.
- La création d’un phyloseq à partir de tables indépendantes n’est plus attribuée à cet onglet.

### Datasets

- Présenté comme le centre de gestion du dataset actif et du cycle de vie des projets.
- Les opérations sur le registre, les projets et les archives portables sont distinguées.
- La sauvegarde inclut les datasets et les historiques de figures associés au projet.

### Description

- Rôle limité à la compréhension et au contrôle avant analyses approfondies.
- Aucun wording ne laisse entendre que Description modifie les données.
- Les vues Dataset et Projet, la raréfaction et les échantillons atypiques sont correctement représentés.

### Data Edition

- Les modifications des composantes du phyloseq sont explicitées.
- Le journal des transformations est mis en avant.
- La différence entre enregistrer sous le même nom et créer une copie sous un nouveau nom est indiquée.
- La sauvegarde du projet complet reste attribuée à Datasets.

### Filtration

- Les quatre familles de filtres sont regroupées dans un wording utilisateur : taxons, abondances, échantillons, séquences.
- Le recalcul réactif est distingué de l’enregistrement dans le registre.
- La possibilité de remplacer le parent ou de conserver une nouvelle version est indiquée.
- Le journal des filtres et le bilan avant/après sont mis en avant.

### Exploration

- Présenté comme l’espace permettant de comprendre les données et faire émerger les structures à approfondir.
- Le site reconnaît que certains sous-modules proposent déjà des comparaisons ciblées.
- Barplot, Alpha-diversité, Venn/UpSet, Heat Tree, arbre phylogénétique et qualité taxonomique ont été reformulés selon la question utilisateur réelle.
- Les besoins conditionnels en taxonomie, séquences ou arbre phylogénétique sont signalés sans détailler l’implémentation.

### Analyse

- Le rôle est formulé autour des hypothèses et de la confrontation des résultats.
- Les garde-fous sont décrits avec la bonne nuance : vérification de certains prérequis, incompatibilités, avertissements et diagnostics selon le module.
- Aucune promesse de validité statistique automatique n’est faite.
- Les six familles réelles sont représentées : différentiel, ordination, comparaison de matrices, réseaux, PERMANOVA/dispersion, clustering.
- Le catalogue public reste orienté par question ; le nom PERMANOVA est évité comme titre de découverte lorsque la question biologique suffit.

### MultiView

- Présenté comme la bibliothèque transversale des figures **déjà sauvegardées**.
- Recherche, filtres, tags, favoris, comparaison côte à côte et compositions sont représentés.
- Le site précise que MultiView ne relance pas les analyses.

### OpenMetaBar

- Reste un module optionnel lorsque l’entrée est FASTQ.
- Le site décrit le parcours FASTQ → traitement distant → phyloseq → datasets BarCodeR sans exposer les détails Nextflow/Singularity dans la vitrine.
- Le traitement distant et la nécessité d’une infrastructure compatible sont explicités.

### Documentation

- Correction d’un décalage majeur : l’onglet actuel n’embarque plus la documentation détaillée dans Shiny.
- Il est désormais décrit comme un **sommaire de navigation** vers la documentation HTML unifiée.
- Recherche locale, accès rapides, catégories et liens directs vers les guides/références sont représentés.
- L’ancienne capture de l’interface documentaire embarquée a été retirée.

### App Theme / Paramètres / Accueil

- Les formulations existantes ont été confrontées aux modules actuels.
- App Theme reste présenté comme une galerie de 30 presets avec aperçu et contrôle de lisibilité.
- Paramètres couvre autosave, reprise, langue/thème de démarrage, graine proposée, résolution d’export, stockage/rétention et télémétrie.
- Accueil reste présenté comme tableau de bord du projet et non comme une simple page de bienvenue.

## Traçabilité des pages d’onglets

Le panneau générique précédent était trop abstrait et parfois faux. Il a été remplacé par une continuité propre à chaque module lorsque celle-ci est pertinente :

- OpenMetaBar : configuration → run → phyloseq → projet ;
- Input data : fichier → contrôles → dataset → projet ;
- Datasets : datasets → projet → sauvegarde → archive ;
- Description : dataset → vue d’ensemble → contrôle → export ;
- Data Edition : dataset → modification → journal → état enregistré ;
- Filtration : dataset → critères → bilan → version enregistrée ;
- Exploration : dataset → paramètres → figure → code R ;
- Analyse : question → paramètres → résultats → code R ;
- MultiView : figures → sélection → composition → export.

Les pages Accueil, Documentation, App Theme et Paramètres n’affichent plus artificiellement un flux de reproductibilité scientifique qui ne correspondait pas à leur rôle.

## Correction de navigation

Le CTA des cartes de la page Analyses pointait vers :

`documentation/<lang>/analyse/index.html`

Ce fichier n’existe pas. Le lien cible désormais :

`documentation/<lang>/analyse/guides-methodologiques.html`

Les guides directs FR/EN des neuf modules documentés ont été contrôlés sur disque.

## Contrôles effectués

- `npm run check` : OK après les modifications.
- `git diff --check` : aucune erreur de whitespace.
- Présence des captures référencées : contrôlée.
- Présence des guides directs FR/EN : contrôlée.
- Références publiques obsolètes à `screen-documentation.png`, `analyse/index.html`, `BarCodeRShiny`, `BarCoderShiny`, `BarCodeR ×` : aucune occurrence textuelle restante hors documentation générée.
