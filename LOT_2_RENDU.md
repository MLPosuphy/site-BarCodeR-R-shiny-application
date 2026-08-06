# Lot 2 — Refonte de la page d’accueil

## Périmètre

Ce lot modifie uniquement la page d’accueil et ses styles associés. Les pages Fonctionnement, Analyses, Tutoriels, Documentation et Télécharger restent dans l’état du Lot 1.

## Modifications intégrées

### Message central

- Nouveau titre : « Du FASTQ à la figure, dans un workflow traçable. »
- Présentation explicite des rôles respectifs d’OpenMetaBar et de BarCodeR.
- Trois appels à l’action : workflow, analyses et téléchargement.

### Indicateurs scientifiques

Les compteurs d’onglets ont été remplacés par :

- 3 technologies de séquençage ;
- 5 moteurs différentiels ;
- 6 familles d’ordination ;
- export et prolongement du code R.

### Deux points d’entrée

- Parcours FASTQ : FASTQ → OpenMetaBar → Nextflow/Slurm → phyloseq → BarCodeR.
- Parcours phyloseq : import → diagnostic → filtration → analyses → MultiView.

### Questions scientifiques

Six entrées orientées par objectif :

- composition ;
- diversité ;
- structure globale ;
- test d’hypothèse multivarié ;
- taxons différentiels ;
- comparaison de matrices ou marqueurs.

### Différenciateurs

- diagnostic avant analyse ;
- lignée des datasets ;
- vérification des hypothèses ;
- continuité hors de l’interface avec le code R.

### Restitution

- Mise en avant de MultiView.
- Explication de la conservation du contexte, des paramètres et de la provenance des figures.

### Profils utilisateurs

- biologistes et écologues ;
- bioinformaticiens ;
- plateformes ;
- équipes de recherche.

### Entrées finales

- tutoriels ;
- documentation ;
- téléchargement ;
- versions, code et citation.

## Adaptation responsive

Des dispositions spécifiques ont été ajoutées pour :

- écrans larges ;
- ordinateurs portables ;
- tablettes ;
- mobiles.

## Contrôles

- Compilation TypeScript : réussie.
- Ressources visuelles référencées : toutes présentes.
- Routes internes du Lot 2 : présentes.
- Accolades CSS : équilibrées.
- Documentation intégrée : conservée.

Le bundling Vite complet ne peut pas être exécuté dans l’environnement Linux de contrôle, car les dépendances fournies dans l’archive d’origine contiennent la liaison native Rolldown pour Windows. Une installation propre des dépendances sur la plateforme cible reste nécessaire avant `npm run build`.
