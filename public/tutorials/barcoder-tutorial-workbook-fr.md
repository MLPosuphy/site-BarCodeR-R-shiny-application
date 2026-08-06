# Carnet de parcours BarCodeR

Version du site : Lot 5
Version BarCodeR présentée : 2.12.8

Ce carnet résume les six parcours publiés sur la page **Tutoriels**. Il sert de checklist hors ligne ; les explications méthodologiques détaillées restent dans la documentation intégrée.

## 1. Découvrir BarCodeR avec GlobalPatterns — 15 min

1. Créer un projet de démonstration et importer `GlobalPatterns`.
2. Vérifier dimensions, profondeur, taxonomie et métadonnées dans **Description**.
3. Produire un barplot en abondances relatives au niveau **Phylum**.
4. Calculer **Observed** et **Shannon**.
5. Construire une **PCoA Bray–Curtis** colorée par environnement.
6. Sauvegarder les figures et les réunir dans **MultiView**.

Résultats attendus : diagnostic rapide, barplot, PCoA et composition MultiView.

## 2. Auditer un phyloseq avant toute analyse — 20 min

1. Contrôler la présence et l’orientation des composants.
2. Vérifier la concordance des identifiants.
3. Examiner profondeur, richesse, dominance et sparsité.
4. Mesurer la complétude taxonomique.
5. Repérer les métadonnées manquantes ou inutilisables.
6. Examiner raréfaction et échantillons atypiques sans exclusion automatique.

Résultats attendus : checklist de structure, bilan de qualité et liste des points à examiner.

## 3. Filtrer sans perdre la provenance — 25 min

1. Dupliquer le dataset original.
2. Créer une branche de filtration faible.
3. Créer une branche standard.
4. Créer une branche stricte pour tester la sensibilité.
5. Comparer taxons, reads et profondeurs conservés.
6. Retenir et justifier la branche analytique choisie.

Résultats attendus : trois datasets dérivés et un historique des décisions.

## 4. Comparer composition et diversité alpha — 25 min

1. Choisir un rang taxonomique et mesurer les non-assignés.
2. Définir un top N et le regroupement des autres taxons.
3. Comparer échantillons puis groupes.
4. Calculer Observed, Shannon et Simpson.
5. Vérifier distributions et tailles des groupes.
6. Interpréter séparément composition, richesse et équitabilité.

Résultats attendus : barplot, tableau de composition, indices et comparaison statistique.

## 5. Construire une bêta-diversité complète — 35 min

1. Formuler la variable explicative.
2. Choisir transformation et distance cohérentes.
3. Construire la matrice de distance et la PCoA.
4. Examiner variance expliquée et points atypiques.
5. Lancer la PERMANOVA.
6. Contrôler PERMDISP.
7. Présenter conjointement graphique, taille d’effet, p-value et dispersion.

Résultats attendus : PCoA, diagnostic, PERMANOVA et test de dispersion.

## 6. Construire une planche avec MultiView — 20 min

1. Sauvegarder au moins trois figures.
2. Filtrer la bibliothèque.
3. Ajouter favoris et tags.
4. Choisir une disposition et placer les figures.
5. Vérifier lisibilité et ordre narratif.
6. Exporter la composition et sauvegarder sa configuration.

Résultats attendus : bibliothèque filtrée, grille MultiView et image composite.

## Règle commune

Conserver pour chaque parcours : dataset, version, paramètres, résultat, diagnostics, limites et justification des choix.
