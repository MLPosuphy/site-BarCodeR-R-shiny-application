# Lot 6 — Refonte de la page Documentation

## Périmètre

Le Lot 6 modifie uniquement la page `#/documentation`. Les pages Accueil, Fonctionnement, Analyses, Tutoriels et Télécharger héritées du Lot 5 sont conservées.

## Changements intégrés

### Moteur d’orientation documentaire

La page permet maintenant d’entrer dans la documentation par besoin concret :

- importer un objet phyloseq ;
- comprendre les datasets et projets ;
- auditer les données ;
- corriger ou compléter un objet ;
- filtrer sans perdre la provenance ;
- explorer les communautés ;
- choisir une analyse ;
- lancer OpenMetaBar ;
- composer les résultats avec MultiView ;
- inspecter les paramètres techniques.

La recherche filtre ces parcours à partir des noms de méthodes, modules et opérations. Des termes comme Bray-Curtis, Aitchison, ANCOM-BC2, ALDEx2, MaAsLin 3, Slurm ou phyloseq sont pris en charge.

### Entrées par profil

Quatre profils peuvent être sélectionnés :

- biologiste ou écologue ;
- bioinformaticien ;
- plateforme ;
- développeur.

### Navigation par module

Les neuf modules documentés sont accessibles directement. Pour chacun, deux niveaux sont proposés :

- guide méthodologique ;
- référence technique.

### Liens profonds

Chaque parcours charge directement le module, le niveau et l’ancre correspondante dans le lecteur intégré. Les ancres ont été contrôlées dans les versions française et anglaise.

### Lecteur synchronisé

Le lecteur affiche la sélection courante et permet :

- de basculer entre guide méthodologique et référence technique ;
- d’ouvrir la page sélectionnée en plein écran ;
- de conserver le sommaire, la recherche interne, le changement de langue et le thème documentaire.

### Présentation des niveaux documentaires

La page distingue explicitement :

- la documentation méthodologique, consacrée aux questions scientifiques, prérequis, diagnostics, limites et interprétation ;
- la référence technique, consacrée aux entrées, paramètres, dépendances, sorties et mécanismes internes.

## Contrôles

- compilation TypeScript : réussie ;
- pages HTML documentaires : 91 ;
- combinaisons langue × module × niveau attendues : toutes présentes ;
- ancres profondes françaises et anglaises manquantes : 0 ;
- modules inconnus dans les parcours : 0 ;
- assets statiques manquants : 0 ;
- identifiants statiques dupliqués : 0 ;
- accolades CSS : 1 253 ouvrantes et 1 253 fermantes ;
- accolades TSX : 1 196 ouvrantes et 1 196 fermantes ;
- archive ZIP : validée.

Le build Vite complet reste dépendant de la liaison native Rolldown correspondant à la plateforme d’exécution. La validation TypeScript des sources modifiées réussit.
