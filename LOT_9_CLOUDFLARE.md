# Lot 9 — Mise en production Cloudflare Pages

## Objectif

Adapter le site BarCodeR × OpenMetaBar à un hébergement statique gratuit sur
Cloudflare Pages, tout en conservant GitHub comme dépôt source.

## Modifications réalisées

- base Vite déplacée du sous-chemin GitHub Pages vers `/` ;
- suppression de `.nojekyll` ;
- remplacement du workflow de déploiement GitHub Pages par un workflow de
  validation uniquement ;
- ajout de `.node-version` et `.nvmrc` avec Node.js 22.16.0 ;
- séparation standard entre dépendances d'exécution et de développement ;
- ajout des fichiers Cloudflare `_headers` et `_redirects` ;
- cache long pour les assets Vite fingerprintés ;
- en-têtes de sécurité compatibles avec le lecteur documentaire en iframe ;
- conservation d'une redirection pour l'ancien sous-chemin GitHub Pages ;
- suppression des anciennes métadonnées absolues `github.io` ;
- ajout du guide `DEPLOIEMENT_CLOUDFLARE.md` ;
- mise à jour du README ;
- exclusion de `node_modules`, `dist` et des fichiers TypeScript temporaires.

## Paramètres Cloudflare

```text
Production branch: main
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: /
```

Aucune fonction Cloudflare et aucune ressource payante ne sont nécessaires.

## Validation

- compilation TypeScript réussie ;
- 130 fichiers dans `public/` ;
- plus gros fichier : environ 1,06 MiB ;
- limite Cloudflare Pages de 25 MiB par fichier respectée ;
- limite de 20 000 fichiers respectée ;
- dépendance Rolldown Linux présente dans `package-lock.json` ;
- archive testée sans erreur ;
- aucun dossier `node_modules` ou `dist` dans la livraison.

## Limite de l'environnement de validation

Le build Vite complet n'a pas pu télécharger Vite 8 depuis le miroir npm interne
de l'environnement de travail. Ce miroir renvoie une erreur 404 alors que le
paquet et sa dépendance Linux sont publiés dans le registre npm public. Le
workflow GitHub et Cloudflare Pages exécuteront `npm ci` dans leur environnement
Linux à partir du registre public.
