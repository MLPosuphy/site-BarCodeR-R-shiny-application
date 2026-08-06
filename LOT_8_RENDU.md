# Lot 8 — Cas d’usage, galerie de résultats et provenance

## Périmètre

Le Lot 8 ajoute une nouvelle page publique accessible par `#/showcase`. Elle présente les usages scientifiques de BarCodeR × OpenMetaBar à partir de questions concrètes, montre les familles de résultats disponibles et documente la provenance de trois figures reproductibles.

## Cas d’usage scientifiques

Quatre parcours sont décrits :

1. Suivi environnemental.
2. Effet d’une condition.
3. Comparaison de marqueurs ou de domaines.
4. Du séquençage à la restitution avec OpenMetaBar.

Chaque parcours comprend :

- la question scientifique ;
- les entrées nécessaires ;
- les modules et étapes ;
- les sorties attendues ;
- le principal point de vigilance ;
- des liens vers les analyses et tutoriels associés.

## Galerie

Onze familles de résultats sont illustrées :

- composition taxonomique ;
- PCoA Bray-Curtis ;
- diversité alpha ;
- qualité des assignations ;
- Heat Tree ;
- taxons partagés ;
- analyse différentielle ;
- PERMANOVA et dispersion ;
- comparaison de matrices ;
- clustering et stabilité ;
- composition MultiView.

La galerie est filtrable par contrôle qualité, exploration, analyse et restitution. Un panneau d’inspection indique la méthode, l’usage, les prérequis, la source du visuel et le module correspondant.

## Provenance reproductible

Trois sorties GlobalPatterns disposent d’une chaîne détaillée :

- composition taxonomique ;
- PCoA Bray-Curtis ;
- diversité alpha.

La page expose le dataset, le contrôle préalable, la transformation, le calcul, l’affichage et le format d’export. Les ressources vérifiables sont fournies sous trois formes :

- `public/showcase/globalpatterns-provenance.json` ;
- `public/figures/data-provenance.tsv` ;
- `scripts/generate_public_data_figures.R`.

## Intégration

- Accès ajouté depuis la section MultiView de l’accueil.
- Accès ajouté dans le footer.
- La route est visuellement rattachée à l’onglet Analyses sans ajouter un septième lien au menu principal.
- Titre de page bilingue ajouté.
- Les anciennes routes restent inchangées.

## Correction de cohérence

L’ancienne mention de STATIS sur l’accueil a été remplacée par MCOA afin d’aligner le site sur l’application actuelle.

## Validation

- Compilation TypeScript réussie.
- Quatre cas d’usage bilingues.
- Onze entrées de galerie.
- Treize ressources visuelles dynamiques vérifiées, aucune absente.
- Aucun lien vers un module inconnu.
- Aucun identifiant statique dupliqué.
- Aucun lien d’ancrage incompatible avec le routeur hash.
- 91 pages HTML documentaires conservées.
- JSON de provenance valide.
- Manifeste TSV de la galerie valide.
- Structure TSX équilibrée : 1 506 accolades ouvrantes et fermantes.
- Structure CSS équilibrée : 1 541 accolades ouvrantes et fermantes.

Le bundling Vite complet reste bloqué sous Linux par la liaison native Rolldown Windows absente de l’archive d’origine. La compilation TypeScript réussit.
