# Site web BarCodeR

Site public de **BarCodeR**, construit avec React, TypeScript et Vite. Il présente l’application R/Shiny, son parcours utilisateur, ses modules, ses analyses, ses tutoriels, ses cas d’usage et la documentation HTML générée par BarCodeR.

Ce dépôt concerne uniquement le **site vitrine/documentaire**. Le code de l’application Shiny n’est pas contenu ici.

## 1. Technologies

- React 19
- TypeScript
- Vite
- CSS natif (`src/styles.css`)
- déploiement statique sur Cloudflare Pages

Le site n’utilise pas de CMS ni de framework de routage externe.

## 2. Structure du projet

```text
.
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── content.ts
│   ├── styles.css
│   └── vite-env.d.ts
├── public/
│   ├── app-previews/
│   ├── documentation/
│   ├── figures/
│   ├── showcase/
│   ├── _headers
│   └── _redirects
├── scripts/
│   ├── generate_public_data_figures.R
│   └── sync_barcoder_documentation.py
└── .github/
    └── workflows/
        └── validate-site.yml
```

## 3. Point d’entrée et navigation

`src/main.tsx` monte l’application React dans `#root`.

La navigation est gérée directement dans `src/App.tsx` avec un routage basé sur le fragment d’URL (`#`). La fonction `useHashRoute()` lit `window.location.hash` et affiche la page correspondante.

Principales routes :

```text
#/                     Accueil
#/functioning           Fonctionnement
#/analyses              Analyses
#/tutorials             Tutoriels
#/showcase              Cas d’usage / galerie de résultats
#/documentation         Documentation
#/reproducibility       Reproductibilité
#/download              Installation
#/application/<module>  Présentation d’un onglet BarCodeR
```

Ce choix permet de déployer le site comme un ensemble de fichiers statiques sans configuration serveur spécifique pour chaque route.

## 4. Où se trouve le contenu

### `src/content.ts`

C’est la source principale des pages correspondant aux onglets de BarCodeR.

Le tableau `modules` décrit chaque onglet avec :

- `key` : identifiant utilisé dans l’URL ;
- `order` : ordre d’affichage ;
- `group` : groupe fonctionnel ;
- `title` et `kicker` ;
- `purpose` : rôle de l’onglet ;
- `question` : question utilisateur à laquelle il répond ;
- `inputs` : ce dont il part ;
- `actions` : ce que l’utilisateur peut y faire ;
- `outputs` : ce qu’il peut obtenir ;
- `cautions` : points de vigilance ;
- `submodules` : sous-parties affichées lorsque nécessaire ;
- `image` : aperçu associé.

Les pages `#/application/<module>` sont générées à partir de ces données. Pour corriger la description fonctionnelle d’un onglet, il faut donc en priorité modifier `src/content.ts`, et non dupliquer le texte ailleurs.

`moduleScreens` associe certains modules à une capture dédiée utilisée sur leur page publique.

### `src/App.tsx`

Ce fichier contient :

- le header et le footer ;
- la gestion FR/EN ;
- le routage ;
- la page d’accueil ;
- la page Fonctionnement ;
- la page Analyses ;
- les Tutoriels ;
- la page Cas d’usage ;
- la page Documentation ;
- la page Reproductibilité ;
- la page Installation ;
- les composants réutilisés par ces pages.

Les grandes pages éditoriales sont encore centralisées dans ce fichier. Lors d’une refonte importante, il est possible de les déplacer dans des composants séparés sans changer leur contenu ni leurs routes.

### `src/styles.css`

Tous les styles publics du site sont regroupés ici :

- header et navigation ;
- hero sections ;
- cartes ;
- pages modules ;
- tutoriels ;
- cas d’usage ;
- documentation ;
- responsive mobile/tablette ;
- animations et états interactifs.

## 5. Internationalisation du site

Le site public possède actuellement deux langues :

```ts
type Language = "fr" | "en";
```

Les contenus réutilisables utilisent le type :

```ts
type Localized = {
  fr: string;
  en: string;
};
```

Dans `content.ts`, la fonction `l(fr, en)` crée ces objets. Dans `App.tsx`, la fonction `tx(value, language)` récupère la langue active.

Lorsqu’un texte public est ajouté, il faut donc fournir **FR et EN au même endroit**.

La documentation HTML intégrée peut contenir davantage de langues que l’interface du site. Sa gestion est indépendante.

## 6. Positionnement fonctionnel à respecter

Le site doit rester centré sur **BarCodeR**.

Le parcours général est :

```text
Projet
  ↓
Objet phyloseq complet/partiel ─────┐
                                    ├─→ Description
FASTQ → OpenMetaBar → phyloseq ─────┘      ↓
                                         Édition
                                           ↓
                                       Filtration
                                           ↓
                                Exploration / Analyses
                                           ↓
                                        MultiView
                                           ↓
                                         Export
```

Points importants :

- BarCodeR est le produit principal ;
- OpenMetaBar est un module optionnel utilisé lorsque le projet démarre avec des FASTQ ;
- l’import standard reçoit un objet phyloseq complet ou partiel sérialisé dans un fichier R ;
- le site présente prioritairement les usages et les questions scientifiques ;
- les paramètres, algorithmes et détails méthodologiques doivent rester dans la documentation ;
- BarCodeR guide et contrôle certains prérequis mais ne remplace pas l’interprétation scientifique ;
- MultiView réutilise les figures sauvegardées, il ne recalcule pas les analyses.

## 7. Captures et autres assets

### `public/app-previews/`

Contient les captures et aperçus de l’application. Les pages publiques utilisent de préférence de vraies captures de BarCodeR, affichées sans annotations ni recadrage agressif.

Les captures principales de la version actuellement présentée sont :

```text
screen-home-current.png
screen-datasets-current.png
screen-description-current.png
screen-filtration-current.png
screen-exploration-current.png
screen-analyse-current.png
screen-multiview-current.png
screen-openmetabar-current.png
```

`HOME_SCREENSHOT_PATH` dans `src/App.tsx` définit la capture utilisée sur l’accueil. `moduleScreens` dans `src/content.ts` associe les autres captures aux pages d’onglets.

Sur l’accueil, `HomeApplicationVisual` affiche la capture complète dans un cadre interactif. Un clic ouvre une vue agrandie refermable au bouton, au clic sur l’arrière-plan ou avec la touche `Échap`.

L’ordre de l’accueil est volontairement : promesse produit, preuve visuelle, grille des bénéfices, mise en avant de MultiView, convergence FASTQ/phyloseq, questions scientifiques et analyses proposées, tutoriels, puis installation. Les deux entrées doivent toujours converger vers un objet phyloseq avant de rejoindre le même environnement BarCodeR ; ne pas réintroduire sur l’accueil un parcours rigide module par module.

Les interactions propres à l’accueil se trouvent à la fin de `src/styles.css` : révélations progressives au défilement, repère latéral des grandes sections, animation du flux de données, effets de survol des cartes et agrandissement de la capture. Elles respectent `prefers-reduced-motion`. Le composant `HomeScrollRail` dans `src/App.tsx` gère le repère de progression visible sur les grands écrans.

Chaque question scientifique affichée sur l’accueil doit rester associée à une ou plusieurs analyses réellement disponibles dans l’application. Les méthodes proposées sont des pistes d’analyse, pas un assistant automatique de choix statistique.

Les captures sont volontairement proches du rendu réel de l’application : le site ne doit pas ajouter de faux contrôles, de résultats simulés ou d’annotations qui pourraient être confondus avec l’interface.

Lors de la préparation d’une nouvelle release, remplacer les fichiers `*-current.png` par des captures issues de la version réellement publiée puis vérifier que le nom, le logo, la langue et les données de démonstration correspondent à cette release. Conserver les mêmes noms de fichiers évite de modifier les composants React.

### `public/figures/`

Contient les figures publiques générées à partir de données de démonstration.

Le script :

```bash
Rscript scripts/generate_public_data_figures.R
```

permet de régénérer les figures prévues par le site lorsque les dépendances R nécessaires sont disponibles.

### `public/showcase/`

Contient les métadonnées statiques associées à certains exemples publics et à leur provenance.

## 8. Tutoriels et cas d’usage

Les tutoriels sont définis dans `src/App.tsx` dans `tutorialJourneys`.

Ils doivent :

- partir d’un objectif concret ;
- utiliser les vrais onglets BarCodeR ;
- expliquer l’enchaînement des actions ;
- rester compréhensibles sans détailler les algorithmes ;
- renvoyer vers la documentation pour les choix méthodologiques précis.

Les cas d’usage sont gérés dans `ShowcasePage`. Ils servent à montrer comment plusieurs onglets peuvent être combinés pour répondre à une question scientifique, sans devenir des recettes statistiques obligatoires.

Le site ne distribue pas de carnets tutoriels Markdown : les parcours restent directement consultables dans l’interface web.

## 9. Documentation BarCodeR intégrée

La documentation générée par l’application est copiée dans :

```text
public/documentation/
```

Elle possède son propre HTML, CSS, JavaScript, manifeste et arborescence par langue/module.

Pour la resynchroniser depuis une version locale de l’application BarCodeR :

```bash
python scripts/sync_barcoder_documentation.py ../BarCodeR_app/www/documentation
```

Adapter le chemin source si nécessaire.

Après synchronisation, vérifier au minimum :

- `public/documentation/index.html` ;
- `public/documentation/manifest.json` ;
- les liens vers les guides des modules ;
- les langues attendues ;
- les ancres utilisées depuis le site.

La page `#/documentation` du site sert de point d’entrée vers cette documentation. Les détails techniques ne doivent pas être recopiés inutilement dans les pages vitrines.

## 10. Développement local

Version Node attendue : Node 22, conformément à `.node-version`, `.nvmrc` et `package.json`.

Installation :

```bash
npm ci
```

Serveur de développement :

```bash
npm run dev
```

Contrôle TypeScript :

```bash
npm run check
```

Build de production :

```bash
npm run build
```

Aperçu du build :

```bash
npm run preview
```

Le build final est produit dans :

```text
dist/
```

## 11. Vite et chemins publics

`vite.config.ts` utilise :

```ts
base: "/"
```

Le site est donc prévu pour être servi à la racine du domaine Cloudflare Pages.

Dans le code React, les assets publics doivent passer par :

```ts
asset("chemin/du/fichier")
```

Cette fonction utilise `import.meta.env.BASE_URL` et évite de disperser la logique des chemins publics dans les composants.

## 12. Déploiement Cloudflare Pages

Réglages attendus :

```text
Production branch: main
Build command: npm run build
Build output directory: dist
Root directory: /
Node.js: 22.x
```

Le dépôt contient :

```text
public/_headers
public/_redirects
```

qui sont copiés dans le build statique et utilisés par Cloudflare Pages.

Le workflow `.github/workflows/validate-site.yml` sert à vérifier le build lors des changements GitHub ; le déploiement public est réalisé par Cloudflare Pages.

## 13. Modifier ou ajouter un onglet public

Pour mettre à jour un onglet existant :

1. ouvrir `src/content.ts` ;
2. retrouver l’objet portant la bonne `key` ;
3. mettre à jour les textes FR et EN ;
4. vérifier les `inputs`, `actions`, `outputs` et `cautions` ;
5. remplacer ou ajouter la capture dans `public/app-previews/` si nécessaire ;
6. vérifier `moduleScreens` ;
7. lancer `npm run check` ;
8. tester la route `#/application/<key>` sur desktop et mobile.

Pour ajouter un nouvel onglet, utiliser la même structure et vérifier également l’ordre dans `modules` ainsi que son groupe fonctionnel.

## 14. Règles de cohérence avant publication

Avant chaque déploiement :

- vérifier que les textes correspondent à la version actuelle de BarCodeR ;
- ne pas présenter une fonction prévue comme déjà disponible ;
- tester les CTA principaux ;
- tester les liens directs vers la documentation ;
- vérifier les captures d’écran ;
- vérifier FR et EN ;
- lancer `npm run check` puis `npm run build` ;
- vérifier le rendu mobile ;
- vérifier qu’aucun ancien branding n’est visible ;
- garder les explications techniques détaillées dans la documentation plutôt que dans la vitrine.

## 15. Fichiers Markdown

Le projet conserve volontairement **un seul fichier Markdown : `README.md`**.

Les notes de refonte, comptes rendus de lots et checkpoints de travail ne doivent pas être ajoutés au livrable public. L’historique Git doit servir à conserver ces informations de développement.
