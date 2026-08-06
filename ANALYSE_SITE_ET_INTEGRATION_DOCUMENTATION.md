# Analyse du site BarCodeR × OpenMetaBar et intégration de la documentation

## 1. Périmètre analysé

L’analyse repose sur les deux archives fournies :

- le site React/Vite `site-BarCodeR-R-shiny-application` ;
- l’application BarCodeR et sa documentation générée dans `www/documentation/`.

Fichiers structurants examinés :

- `src/App.tsx` : navigation, routage et pages du site ;
- `src/content.ts` : contenu des modules analytiques ;
- `src/styles.css` : identité visuelle et responsive design ;
- `index.html` : métadonnées générales ;
- `vite.config.ts` et `.github/workflows/deploy-pages.yml` : publication GitHub Pages ;
- `public/documentation/manifest.json` : version, langues et modules documentaires.

## 2. Diagnostic général

### Points forts

1. **Identité claire de l’écosystème**  
   Le lien entre BarCodeR et OpenMetaBar est visible dès l’en-tête et dans le parcours analytique.

2. **Architecture statique adaptée à GitHub Pages**  
   React/Vite et le routage par fragment `#/...` évitent les erreurs de route lors d’un accès direct sur GitHub Pages.

3. **Présentation scientifique structurée**  
   Le site distingue le processus analytique, la reproductibilité, les modules, les jeux de données publics et la disponibilité du code.

4. **Bilinguisme déjà fonctionnel**  
   Les principales pages sont disponibles en français et en anglais, avec conservation du choix dans le navigateur.

5. **Traçabilité des figures publiques**  
   Les scripts de génération et les données de provenance sont explicitement reliés aux figures affichées.

### Faiblesses principales

1. **La page Tutoriels est essentiellement une page d’attente**  
   La majorité des cartes affichent « Tutoriel à venir ». Cela crée un décalage entre une interface très aboutie et un contenu encore incomplet.

2. **La documentation complète n’était pas accessible depuis le site**  
   Elle existait déjà dans BarCodeR, mais restait séparée du site public.

3. **Les versions sont répétées en dur**  
   `v2.12.8` est répétée dans plusieurs composants, le pied de page et le README. Une mise à jour de BarCodeR peut donc laisser des informations incohérentes.

4. **La disponibilité scientifique reste incomplète**  
   La licence définitive, le DOI et l’archive versionnée sont encore indiqués comme éléments à produire.

5. **La séparation entre Tutoriels et Documentation n’est pas encore explicitée**  
   Les deux onglets risquent de sembler redondants tant que la page Tutoriels ne propose pas de véritables parcours pratiques.

6. **Le routage par fragment limite le référencement page par page**  
   Les contenus React sont accessibles, mais les moteurs de recherche disposent d’une seule URL HTML principale pour toutes les pages du site.

## 3. Intégration réalisée

### Résultat fonctionnel

Un nouvel onglet **Documentation** est ajouté dans la navigation principale, immédiatement après **Tutoriels & datasets tests**.

Nouvelle route :

```text
#/documentation
```

La page comprend :

- une introduction dédiée ;
- les métriques extraites dynamiquement du manifeste documentaire ;
- la version de la documentation et la version BarCodeR associée ;
- un bouton d’ouverture en plein écran ;
- un lien vers l’onglet Documentation de l’application Shiny ;
- un lecteur intégré contenant la documentation complète ;
- la navigation, la recherche, le sommaire, les thèmes et les langues de la documentation originale.

### Contenu documentaire intégré

Le dossier généré par BarCodeR est publié dans :

```text
public/documentation/
```

Le manifeste actuellement intégré décrit :

- 9 modules ;
- 2 niveaux documentaires ;
- 5 langues : français, anglais, espagnol, chinois et hindi ;
- documentation `v1.8.0` ;
- contenu généré pour `BarCodeR_v2.12.8` le 5 août 2026.

### Choix technique

La documentation est conservée comme un mini-site HTML autonome et affichée dans un `iframe` de même origine.

Ce choix évite :

- de réécrire les 90 pages dans React ;
- de dupliquer la logique de recherche et de sommaire ;
- de créer deux documentations divergentes ;
- de casser l’utilisation autonome de la documentation dans l’application Shiny.

Le bouton « Retour à BarCodeR » est automatiquement retiré uniquement lorsque la documentation est intégrée dans le site. Il reste disponible lorsque la documentation est ouverte seule.

### Responsive design

L’ajout d’un sixième lien principal provoquait un risque de débordement sur les ordinateurs portables. Le menu compact est maintenant utilisé jusqu’à `1180 px` au lieu de `920 px`.

La page documentaire possède également des adaptations spécifiques pour :

- les tablettes ;
- les petits écrans ;
- la hauteur du lecteur intégré ;
- l’empilement des boutons et métriques.

### Synchronisation des futures versions

Le script suivant a été ajouté :

```text
scripts/sync_barcoder_documentation.py
```

Utilisation :

```bash
python scripts/sync_barcoder_documentation.py /chemin/vers/BarCodeR_app/www/documentation
```

Il réalise automatiquement :

1. la validation du dossier source ;
2. la suppression de l’ancienne documentation publiée ;
3. la copie de la nouvelle documentation ;
4. l’adaptation du bouton de retour pour le mode intégré ;
5. l’affichage des versions synchronisées.

## 4. Avant / après

### Navigation principale

#### Avant

```tsx
<a href="#/evidence">{c.evidence}</a>
<a href="#/availability">{c.code}</a>
```

#### Après

```tsx
<a href="#/evidence">{c.evidence}</a>
<a href="#/documentation">{c.documentation}</a>
<a href="#/availability">{c.code}</a>
```

### Routage

#### Avant

```tsx
else if (route === "/evidence") page = <EvidencePage language={language} />;
else if (route === "/reproducibility") page = <ReproducibilityPage language={language} />;
```

#### Après

```tsx
else if (route === "/evidence") page = <EvidencePage language={language} />;
else if (route === "/documentation") page = <DocumentationPage language={language} />;
else if (route === "/reproducibility") page = <ReproducibilityPage language={language} />;
```

### Publication de la documentation

#### Avant

```text
public/
├── app-previews/
├── figures/
└── og.png
```

#### Après

```text
public/
├── app-previews/
├── documentation/
│   ├── index.html
│   ├── manifest.json
│   ├── assets/
│   ├── fr/
│   ├── en/
│   ├── es/
│   ├── zh/
│   └── hi/
├── figures/
└── og.png
```

## 5. Validations effectuées

- compilation TypeScript avec `tsc -b` : réussie ;
- validation syntaxique du script Python : réussie ;
- contrôle de `git diff --check` : aucune erreur ;
- 90 pages documentaires attendues : toutes présentes ;
- 91 fichiers HTML contrôlés, index compris ;
- liens et ressources locales manquants : 0.

Le build Vite complet n’a pas pu être exécuté dans l’environnement d’analyse, car l’archive contenait le module natif Rolldown pour Windows et non son équivalent Linux. Le code TypeScript est valide. Une installation propre avec `npm ci` sur la machine de développement ou dans GitHub Actions doit installer le module natif correspondant à la plateforme avant `npm run build`.

## 6. Améliorations recommandées

### Priorité 1 — Transformer réellement l’onglet Tutoriels

La Documentation doit être une **référence exhaustive**, alors que les Tutoriels doivent être des **parcours orientés vers une tâche**.

Structure recommandée pour chaque tutoriel :

1. objectif concret ;
2. jeu de données utilisé ;
3. prérequis ;
4. clics et paramètres ;
5. résultat attendu ;
6. erreurs fréquentes ;
7. lien vers la section documentaire détaillée.

Premiers tutoriels à produire :

- importer et valider un objet phyloseq ;
- filtrer les échantillons et taxons ;
- produire une description taxonomique ;
- réaliser une ordination ;
- comparer la diversité alpha ;
- construire et exporter une MultiView ;
- lancer OpenMetaBar depuis BarCodeR et récupérer le résultat.

### Priorité 1 — Centraliser les versions et métadonnées

Créer par exemple :

```text
src/site.config.ts
```

Ce fichier contiendrait :

- version BarCodeR ;
- version OpenMetaBar ;
- version du site ;
- URL des dépôts ;
- DOI ;
- licence ;
- établissement et équipe ;
- date de dernière révision scientifique.

Le pied de page, la page Disponibilité et les autres composants utiliseraient cette source unique.

### Priorité 1 — Finaliser citation, licence et DOI

La page **Code & disponibilité** devrait proposer directement :

- une citation humaine ;
- un bloc BibTeX copiable ;
- le DOI Zenodo de la version ;
- la licence du code ;
- la licence de la documentation ;
- la licence des jeux de données de démonstration.

### Priorité 1 — Clarifier OpenMetaBar

Ajouter une carte spécifique pour OpenMetaBar dans la page Disponibilité :

- dépôt ou emplacement du pipeline ;
- version compatible ;
- profil d’exécution ;
- dépendances HPC ;
- relation exacte avec BarCodeR ;
- limites de ce qui est fourni publiquement.

### Priorité 2 — Relier Tutoriels et Documentation

Chaque carte de tutoriel devrait contenir deux actions :

```text
Commencer le tutoriel
Consulter la référence technique
```

Les liens documentaires peuvent cibler précisément :

```text
documentation/index.html?lang=fr&module=analyse&section=guide&anchor=...
```

### Priorité 2 — Automatiser la documentation dans le déploiement

À terme, éviter de copier manuellement les fichiers générés. Deux solutions :

1. publier la documentation lors d’une release BarCodeR, puis la récupérer dans le workflow du site ;
2. conserver les deux projets dans une organisation commune et déclencher le déploiement du site lorsqu’une documentation versionnée est publiée.

La version de la documentation doit toujours être associée à une version précise de BarCodeR.

### Priorité 2 — Réduire le poids et améliorer le chargement

La documentation ajoute environ `6,7 MB` au site.

Actions recommandées :

- conserver le chargement différé du lecteur ;
- activer une stratégie de cache longue pour les ressources versionnées ;
- minifier les ressources générées lorsque cela est possible ;
- vérifier les images inutilisées ;
- héberger localement les polices ou utiliser une pile système pour éviter la dépendance à Google Fonts.

### Priorité 2 — Renforcer l’accessibilité

Ajouter ou vérifier :

- un lien « Aller au contenu » ;
- un focus visible sur tous les contrôles ;
- l’ouverture et la fermeture du menu au clavier avec `Escape` ;
- la restitution correcte du changement de page par lecteur d’écran ;
- les contrastes en thème clair et sombre ;
- la navigation clavier dans la documentation intégrée.

### Priorité 3 — Améliorer le référencement

Le routage par `#/...` est robuste pour GitHub Pages, mais moins performant pour le référencement précis des pages.

Évolution possible :

- génération statique d’une page HTML par route ;
- URLs réelles comme `/documentation/`, `/tutorials/`, `/reproducibility/` ;
- sitemap XML ;
- URL canonique ;
- métadonnées Open Graph spécifiques aux pages ;
- données structurées `SoftwareApplication` et `ScholarlyArticle`.

### Priorité 3 — Mettre en place une validation automatique

Ajouter au workflow GitHub Actions :

- compilation TypeScript ;
- build Vite ;
- contrôle des liens de documentation ;
- validation du manifeste ;
- test de présence des 90 pages attendues ;
- test responsive ou capture Playwright ;
- audit Lighthouse périodique.

## 7. Ordre de travail recommandé

1. publier cette intégration documentaire ;
2. produire trois tutoriels réellement utilisables ;
3. centraliser les versions et URLs ;
4. finaliser licence, DOI et citation ;
5. ajouter la carte OpenMetaBar ;
6. automatiser la synchronisation documentaire ;
7. traiter SEO, accessibilité et performance avancée.
