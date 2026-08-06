# Lot 5 — Tutoriels et datasets tests

## Périmètre

Ce lot modifie uniquement la page **Tutoriels et datasets tests** et les ressources pédagogiques associées. Les pages Accueil, Fonctionnement, Analyses, Documentation et Télécharger issues des lots précédents sont conservées.

## Refonte éditoriale

L’ancienne logique organisée par onglets est remplacée par des parcours répondant à un objectif concret. Chaque parcours précise :

- le niveau et la durée ;
- le dataset requis ;
- l’objectif ;
- les résultats attendus ;
- les étapes ordonnées ;
- les modules BarCodeR mobilisés ;
- un point de vigilance méthodologique ;
- un lien vers la documentation.

## Parcours publiés

1. Découvrir BarCodeR avec GlobalPatterns — 15 min
2. Auditer un phyloseq avant toute analyse — 20 min
3. Filtrer sans perdre la provenance — 25 min
4. Comparer composition et diversité alpha — 25 min
5. Construire une bêta-diversité complète — 35 min
6. Construire une planche avec MultiView — 20 min

## Parcours avancés planifiés

Les parcours qui dépendent encore de ressources non distribuables ou non validées ne sont pas présentés comme disponibles :

1. comparer les cinq moteurs différentiels ;
2. comparer plusieurs marqueurs ou datasets ;
3. lancer un run OpenMetaBar minimal.

## Bibliothèque de datasets

Six profils pédagogiques sont affichés avec un statut explicite :

- **GlobalPatterns** — disponible ;
- **Diagnostic Challenge** — spécification prête ;
- **Differential Benchmark** — à produire ;
- **Multi-marker Project** — à produire ;
- **OpenMetaBar Mini-run** — à produire ;
- **Complete Analysis Project** — à produire.

Cette présentation évite de confondre une idée de ressource, une spécification pédagogique et un fichier réellement téléchargeable.

## Ressources ajoutées

- `public/tutorials/barcoder-tutorial-workbook-fr.md`
- `public/tutorials/barcoder-tutorial-workbook-en.md`

Les carnets fournissent une checklist hors ligne des six parcours publiés.

## Démonstration publique conservée

La démonstration GlobalPatterns reste associée à trois sorties de référence :

- composition taxonomique ;
- PCoA Bray–Curtis ;
- diversité alpha.

## Contrôles

- compilation TypeScript : réussie ;
- tutoriels : 9 au total, dont 6 publiés et 3 planifiés ;
- profils de datasets : 6 ;
- références vers des modules absents : 0 ;
- figures publiques absentes : 0 ;
- carnets pédagogiques absents : 0 ;
- identifiants HTML statiques dupliqués : 0 ;
- accolades CSS : 1 178 ouvrantes et 1 178 fermantes ;
- pages HTML documentaires conservées : 91 ;
- intégrité ZIP : validée.

## Limite d’environnement

La compilation TypeScript est validée. Le bundling Vite complet sous Linux reste bloqué par la liaison native Rolldown Windows contenue dans l’environnement de dépendances d’origine. Cette limite ne provient pas des modifications du Lot 5.
