# Lot 7 — Télécharger, installer, citer et confidentialité

## Périmètre

Refonte complète de la page `#/download`, avec maintien de l'ancienne route `#/availability`.

## Contenu livré

### Modes d'accès

- Sources R : option actuellement exploitable, avec commandes copiables.
- Distribution Windows autonome : présentée comme prévue mais non publiée.
- Déploiement serveur : prérequis d'administration, stockage et sauvegardes.
- OpenMetaBar sur HPC : prérequis SSH, Slurm, Nextflow et Singularity/Apptainer.

### Compatibilité

Un tableau compare les besoins en R, cluster, réseau et contexte d'utilisation pour chaque mode.

### Versions et statut

La page distingue clairement :

- BarCodeR v2.12.8 ;
- documentation v1.8.0 ;
- refonte du site au Lot 7 ;
- distribution Windows non publiée ;
- licence non déclarée ;
- DOI et archive versionnée non publiés.

### Code et citation

- Accès au dépôt BarCodeR.
- Accès au dépôt du site.
- Citation temporaire copiable.
- Checklist avant diffusion externe : licence, versions, archive immuable, DOI et CITATION.cff.

### Confidentialité

La section est fondée sur le fonctionnement réel de l'application :

- événements d'usage susceptibles d'être enregistrés ;
- données scientifiques explicitement exclues ;
- file locale d'événements ;
- possibilité de désactiver l'envoi et de vider la file depuis l'application.

## Corrections techniques

- Remplacement de l'ancienne page `AvailabilityPage` par `DownloadPage`.
- Suppression des anciennes formulations « Code & disponibilité ».
- Défilement interne compatible avec le routeur par hash.
- Responsive pour ordinateur, tablette et mobile.

## Validation

- Compilation TypeScript réussie.
- 4 modes d'accès présents.
- 6 lignes de statut de publication.
- 91 pages documentaires conservées.
- Aucun identifiant statique dupliqué.
- Aucun lien d'ancrage incompatible avec le routeur.
- TSX équilibré : 1 299 accolades ouvrantes et fermantes.
- CSS équilibré : 1 391 accolades ouvrantes et fermantes.
