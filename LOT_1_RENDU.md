# Refonte BarCodeR × OpenMetaBar — Lot 1

## Périmètre

Ce lot sécurise uniquement l'architecture générale du site. Il ne remplace pas encore les contenus détaillés des tutoriels, de la page d'accueil ou de téléchargement.

## Modifications intégrées

- Nouvelle navigation principale : Accueil, Fonctionnement, Analyses, Tutoriels, Documentation, Télécharger.
- Documentation conservée immédiatement après Tutoriels.
- Nouvelle route `#/functioning` avec maintien de la compatibilité de `#/application`.
- Nouvelle route `#/analyses` avec une première entrée par questions scientifiques.
- Nouvelle route `#/tutorials` avec maintien de la compatibilité de `#/evidence`.
- Nouvelle route `#/download` avec maintien de la compatibilité de `#/availability`.
- Footer aligné sur la nouvelle navigation.
- Titres de pages du navigateur mis à jour.
- Liens vers les fiches détaillées des modules conservés.
- Documentation intégrée conservée sans modification.

## Validation

- Validation TypeScript : réussie avec TypeScript 5.9.3.
- Build Vite complet : non exécutable dans l'environnement Linux courant, car l'archive de dépendances contient la liaison native Rolldown d'une autre plateforme.
- Le problème est limité à la dépendance native de build et ne correspond pas à une erreur TypeScript du code modifié.

## Prochain lot prévu

Refonte de l'accueil : nouveau message central, double parcours FASTQ/phyloseq, indicateurs scientifiques, profils utilisateurs et appels à l'action.
