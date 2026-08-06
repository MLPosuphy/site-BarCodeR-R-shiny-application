# Lot 4 — Refonte de la page Analyses

## Périmètre

Ce lot modifie principalement la route `#/analyses` et corrige deux libellés méthodologiques obsolètes sur l’accueil afin de maintenir la cohérence avec la version actuelle de BarCodeR.

## Contenu ajouté

### Orientation par question scientifique

- décrire les données ;
- tester une hypothèse ;
- comparer plusieurs datasets ;
- générer des hypothèses.

### Catalogue interactif

Huit familles sont présentées :

1. composition et taxons partagés ;
2. diversité alpha ;
3. ordinations ;
4. PERMANOVA et dispersion ;
5. analyses différentielles ;
6. comparaison de matrices ;
7. réseaux d’associations ;
8. clustering.

Les filtres permettent de sélectionner un objectif et un prérequis : métadonnées, arbre, plusieurs datasets ou comptes bruts.

Chaque fiche précise :

- la question biologique ;
- les méthodes disponibles ;
- les entrées ;
- la préparation ;
- les diagnostics ;
- les sorties ;
- les points de vigilance ;
- le lien vers le module et le guide méthodologique.

### Méthodes alignées sur l’application

- différentiel : ANCOM-BC2, LinDA, ALDEx2, corncob et MaAsLin 3 ;
- ordination : PCA, PCoA, NMDS, CCA, RDA et dbRDA ;
- multi-matrices : Mantel, Procrustes, PROTEST, co-inertie et MCOA ;
- PERMANOVA et PERMDISP ;
- réseaux d’associations ;
- clustering et diagnostics de partition.

### Aide méthodologique

- matrice transformation × distance ;
- combinaisons à éviter ;
- parcours recommandé en sept étapes ;
- six limites d’interprétation.

## Correction de cohérence

Les indicateurs de l’accueil utilisent maintenant :

- `ANCOM-BC2 · LinDA · ALDEx2 · corncob · MaAsLin 3` ;
- `PCA · PCoA · NMDS · CCA · RDA · dbRDA`.

## Contrôles

- compilation TypeScript réussie ;
- 8 familles d’analyse détectées ;
- aucune capture manquante ;
- aucune route de module manquante ;
- guides français et anglais présents ;
- aucun identifiant statique dupliqué ;
- aucun lien d’ancrage incompatible avec le routeur hash ;
- accolades TSX et CSS équilibrées ;
- intégrité ZIP vérifiée.

Le bundling Vite complet reste indisponible sous Linux avec les dépendances Windows de l’archive initiale, en raison de l’absence de la liaison native `@rolldown/binding-linux-x64-gnu`. Cette limitation est identique aux lots précédents et ne concerne pas la compilation TypeScript.
