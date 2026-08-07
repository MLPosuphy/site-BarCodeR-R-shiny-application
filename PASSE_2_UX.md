# Passe 2 — UX et hiérarchie visuelle

Date : 2026-08-07
Base : refonte éditoriale centrée sur BarCodeR.

## Objectif
Réduire la densité des pages publiques et rendre le parcours de découverte plus évident sans déplacer les détails techniques hors de la documentation.

## Accueil
- Réduction à cinq sections principales.
- Suppression du grand bandeau métrique sombre au profit d'un résumé compact sous l'aperçu de l'application.
- Suppression du bloc dédié aux profils utilisateurs.
- Fusion des avantages de BarCodeR et de la preuve MultiView dans une seule section.
- Deux CTA principaux dans le hero ; l'installation devient un lien secondaire mais reste toujours accessible dans la navigation.
- Deux entrées de données clairement distinctes suivies d'un parcours commun visible.

## Fonctionnement
- Remplacement des deux parcours complets dupliqués par : projet → deux entrées → convergence → parcours commun.
- Entrée A : objet phyloseq complet ou partiel.
- Entrée B : FASTQ via OpenMetaBar.
- Parcours commun : Description → Édition → Filtration → Exploration / Analyses → MultiView → Export.

## Analyses
- Suppression des métriques décoratives du hero.
- Conservation d'un seul mécanisme d'orientation par question scientifique.
- Suppression de la seconde liste de questions typiques, redondante avec le catalogue filtrable.
- Maintien d'une section courte sur les garde-fous et d'un renvoi explicite à la documentation.

## Pages d'onglets
- Suppression du doublon entre « ce que l'onglet permet de faire » et la colonne « vous pouvez ».
- Lecture simplifiée : entrées → actions → résultats.

## Installation
- Distinction claire entre les deux modes d'utilisation (local / serveur partagé) et l'accès aux sources.
- La distribution n'est plus présentée comme un troisième mode d'utilisation.
- Suppression du bloc d'aide final qui répétait les liens déjà proposés dans « Commencer ».

## Navigation et rythme
- Le bouton Installer est visuellement différencié dans la navigation desktop.
- Réduction de l'espacement vertical générique des sections sur desktop.
- Ajout des principes UX à `DOCTRINE_EDITORIALE.md` pour pérenniser les décisions.

## Validation
- `npm run check` : OK.
- Le build Vite complet reste bloqué dans cet environnement par l'absence du binding natif optionnel `@rolldown/binding-linux-x64-gnu`, comme lors de la passe précédente.
