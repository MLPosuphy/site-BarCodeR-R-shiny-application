# Lot 3 — Refonte de la page Fonctionnement

## Périmètre

Ce lot modifie uniquement la page `#/functioning` et conserve les pages des Lots 1 et 2.
L’ancienne route `#/application` reste compatible.

## Contenu ajouté

### 1. Positionnement de l’écosystème

- distinction explicite entre BarCodeR et OpenMetaBar ;
- objet phyloseq présenté comme point de jonction ;
- rappel que les deux outils restent utilisables séparément.

### 2. Deux parcours utilisateurs

- parcours FASTQ : préparation, configuration, validation, soumission, monitoring, récupération et analyse ;
- parcours phyloseq : import, diagnostic, correction, filtration, analyse et restitution.

### 3. Cycle de vie OpenMetaBar

- configuration ;
- validation ;
- soumission ;
- exécution ;
- monitoring ;
- intégration des résultats.

### 4. Lignée des datasets

- conservation de l’objet original ;
- distinction entre édition et filtration ;
- représentation de plusieurs branches analytiques ;
- filtration faible, standard et stricte.

### 5. Responsabilités scientifiques

- garanties apportées par l’interface ;
- éléments qui restent sous la responsabilité de l’utilisateur ;
- absence de promesse méthodologique excessive.

### 6. Architecture détaillée conservée

Les treize fiches fonctionnelles restent disponibles en bas de page et conservent leurs anciennes URL.

## Validation

- compilation TypeScript : réussie ;
- 9 ressources visuelles référencées : toutes présentes ;
- routes principales : conservées ;
- liens d’ancrage incompatibles avec le routeur hash : aucun ;
- accolades CSS : 905 ouvrantes et 905 fermantes ;
- responsive prévu à 1120, 900 et 620 px.

## Limite d’environnement

Le bundling Vite complet ne peut pas être exécuté dans l’environnement Linux de génération, car les dépendances fournies dans l’archive initiale incluent la liaison Rolldown Windows mais pas `@rolldown/binding-linux-x64-gnu`. La compilation TypeScript, indépendante de cette liaison native, réussit.
