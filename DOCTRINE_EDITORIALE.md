# Doctrine éditoriale du site BarCodeR

Ce document fixe le positionnement public du site afin d'éviter que les textes futurs s'éloignent du fonctionnement réel de l'application.

## 1. Produit présenté

**BarCodeR est le produit.**

BarCodeR est présenté comme une plateforme R/Shiny modulaire pour préparer, explorer, analyser, comparer et restituer des données de métabarcoding dans un même environnement de projet.

Le site ne présente pas BarCodeR comme :

- une simple interface graphique autour de `phyloseq` ;
- un catalogue de packages R ;
- un outil réservé aux utilisateurs d'OpenMetaBar ;
- un produit co-marqué « BarCodeR × OpenMetaBar ».

`phyloseq` est une caractéristique technique importante du format de données, mais pas la définition marketing du produit.

## 2. Points d'entrée réels

Deux parcours sont présentés au public :

1. **Objet phyloseq existant** : objet complet ou partiel sérialisé dans un fichier `.rds`, `.RData`, `.rda` ou `.rdata`.
2. **Fichiers FASTQ** : traitement via l'onglet optionnel OpenMetaBar sur une infrastructure HPC distante, puis récupération du phyloseq produit dans BarCodeR.

Ne jamais annoncer que l'onglet Input data assemble directement plusieurs tables indépendantes en un nouvel objet phyloseq.

## 3. Place d'OpenMetaBar

OpenMetaBar est un **module optionnel de BarCodeR pour le parcours FASTQ**.

Il peut être mentionné :

- lorsque le site explique le point d'entrée FASTQ ;
- dans la page de l'onglet OpenMetaBar ;
- dans la documentation OpenMetaBar ;
- lorsque la confidentialité ou l'infrastructure distante doivent être expliquées.

Il ne doit pas être utilisé comme seconde marque du site ni comme passage obligatoire pour utiliser BarCodeR.

## 4. Parcours de référence

Le récit général suit cette logique :

`Projet → Import → Description → Édition éventuelle → Filtration → Exploration / Analyses → MultiView → Export`

Ce parcours sert de repère. Il ne doit pas être décrit comme un assistant rigide : les modules restent utilisables selon les besoins du projet.

### Description

Donner une vue d'ensemble du dataset avant les analyses approfondies : structure, abondances, taxonomie, métadonnées et points d'attention.

### Édition

Corriger ou enrichir les informations associées au dataset lorsque cela est nécessaire avant l'analyse.

### Filtration

Préparer un dataset adapté à la question scientifique en sélectionnant les taxons, échantillons ou caractéristiques pertinents.

### Exploration et analyses

Explorer les tendances puis tester les questions pertinentes avec les garde-fous et diagnostics disponibles dans chaque module.

### MultiView

Centraliser les figures sauvegardées, les retrouver, les comparer côte à côte, construire des compositions et les exporter.

## 5. Positionnement statistique

La promesse n'est jamais que BarCodeR garantit automatiquement la validité d'une analyse ou choisit la meilleure méthode à la place du scientifique.

Formulation de référence :

> BarCodeR accompagne les choix analytiques en vérifiant certains prérequis, en signalant des incompatibilités ou points d'attention et en fournissant les éléments utiles à l'interprétation, tout en laissant à l'utilisateur la maîtrise de ses choix.

Le comportement varie selon les modules : blocage, avertissement, exclusion d'une option incompatible, diagnostic complémentaire ou conseil d'interprétation.

## 6. Site public vs documentation

### Le site public répond surtout à

- Qu'est-ce que BarCodeR ?
- À quoi peut-il me servir ?
- Avec quelles données puis-je commencer ?
- Quel est le parcours dans l'application ?
- Quelles questions scientifiques puis-je aborder ?
- Comment découvrir, installer ou documenter mon utilisation ?

### La documentation porte les détails

- noms et comparaison des méthodes ;
- paramètres ;
- transformations et distances ;
- hypothèses statistiques ;
- formats détaillés ;
- dépendances ;
- comportement réactif ;
- implémentation ;
- limites et dépannage détaillé.

Sur le site, privilégier une formulation par **question scientifique** plutôt que par nom d'algorithme.

## 7. Ton

Ton scientifique accessible, avec quelques formulations directes de produit.

À privilégier :

- phrases courtes ;
- bénéfice utilisateur concret ;
- transparence sur ce que fait l'application ;
- vocabulaire scientifique lorsqu'il apporte réellement de l'information ;
- distinction claire entre exploration, test et interprétation.

À éviter :

- « sans aucune compétence » ;
- « BarCodeR choisit automatiquement la bonne méthode » ;
- « validité statistique garantie » ;
- « tout est automatique » ;
- formulations qui transforment une fonctionnalité prévue en fonctionnalité disponible ;
- jargon d'architecture ou de développement sur les pages vitrines.

La formulation « sans écrire soi-même toute l'implémentation R » peut être utilisée lorsque le contexte l'exige, à condition de rappeler que les choix analytiques restent visibles et reproductibles.

## 8. Valeurs à faire ressortir

Ordre de priorité éditorial recommandé :

1. **Simplicité d'usage sans masquer les choix scientifiques** ;
2. **Rigueur statistique guidée** ;
3. **Interactivité et visualisation** ;
4. **Reproductibilité et traçabilité** ;
5. **Contrôle des données**.

## 9. Reproductibilité

Éviter d'utiliser « reproductible » comme simple slogan.

Le site peut expliquer concrètement que BarCodeR conserve, lorsque le module le permet, le dataset utilisé, les choix de l'analyse, les historiques, les résultats sauvegardés et le code R associé aux figures couvertes par le système de reproduction.

Ne pas affirmer que chaque interaction de l'interface possède un script R autonome si ce n'est pas le cas.

## 10. Confidentialité

Formulation de référence :

> Les données scientifiques utilisées par les modules d'analyse restent dans l'installation BarCodeR choisie par l'utilisateur.

Ne jamais écrire que BarCodeR « ne communique jamais avec Internet » :

- une télémétrie technique optionnelle existe et peut être désactivée dans Paramètres > Confidentialité ;
- OpenMetaBar exécute volontairement les traitements FASTQ sur l'infrastructure HPC distante configurée par l'utilisateur.

Les contenus scientifiques des projets ne doivent pas être présentés comme faisant partie de la télémétrie.

## 11. Maturité

BarCodeR est présenté comme un logiciel fonctionnel destiné à un usage réel, pas comme un prototype ou un chantier éditorial.

Les informations internes de développement (« lot », « à produire », « refonte en cours », checklist de publication, etc.) ne doivent pas apparaître dans la vitrine publique.

Une fonctionnalité ou ressource non disponible n'est pas affichée comme une fonctionnalité actuelle.

## 12. Priorité du site

1. Convaincre d'utiliser BarCodeR.
2. Expliquer clairement ce qu'est BarCodeR.
3. Fournir un accès simple à la documentation.
4. Permettre l'installation ou l'accès à la distribution lorsqu'une URL publique existe.
5. Présenter le projet scientifique.
6. Aider les utilisateurs existants.
7. Servir de support de discussion avec des plateformes ou institutions.
8. Valoriser le travail de l'équipe sans en faire le message principal.

## Passe UX — 7 août 2026

### Hiérarchie des pages publiques
- Une page ne doit pas répéter la même promesse sous plusieurs formes successives.
- L'accueil suit cinq temps : comprendre BarCodeR → choisir son entrée → identifier sa question → comprendre la valeur → agir.
- Les profils utilisateurs ne nécessitent pas un bloc dédié sur l'accueil : le produit doit être compréhensible sans segmenter artificiellement les visiteurs.
- Les métriques décoratives ne doivent pas occuper une section entière si elles n'apportent pas une preuve supplémentaire.

### Fonctionnement
- Le modèle mental public est : **un projet → deux entrées possibles → un parcours BarCodeR commun**.
- Ne jamais dupliquer tout le parcours pour FASTQ et phyloseq : OpenMetaBar ne change que l'étape d'entrée des données.
- Le parcours commun à mettre en avant est : Description → Édition → Filtration → Exploration / Analyses → MultiView → Export.
- Ce parcours est une représentation du fonctionnement, pas un assistant rigide ni un ordre obligatoire.

### Analyses
- Un seul mécanisme d'orientation par question scientifique doit être visible sur la page Analyses.
- Ne pas répéter ensuite une seconde liste de questions équivalentes.
- Les méthodes sont des informations de second niveau ; leur fonctionnement détaillé appartient à la documentation.

### Pages d'onglets
- Éviter de présenter deux fois les mêmes actions.
- La lecture prioritaire est : **vous partez de → vous pouvez → vous obtenez**.
- Les sous-fonctionnalités, points de vigilance et liens vers la documentation viennent ensuite.

### Installation
- Distinguer les modes d'utilisation (local / serveur partagé) du canal de distribution des sources.
- Ne jamais présenter un dépôt ou un téléchargement comme disponible tant que le lien public n'est pas fonctionnel.
- Éviter de répéter plusieurs blocs « aide / commencer » contenant les mêmes destinations.

### Rythme visuel
- Préférer des sections de 90–100 px de respiration verticale sur desktop plutôt que 110+ px lorsque plusieurs sections s'enchaînent.
- Réserver les grands aplats sombres aux messages réellement structurants.
- Un CTA principal par intention ; les liens secondaires doivent être visuellement moins dominants.

## Passe produit — 7 août 2026

### Identité publique
- Le shell public (header, footer, SEO, cartes sociales) doit afficher **BarCodeR** uniquement.
- L'ancien wordmark « BarCodeRShiny » présent dans certains assets de l'application ne doit pas être exposé comme identité du site.
- Tant que les captures de l'application conservent cet ancien wordmark, les aperçus publics peuvent être recadrés pour privilégier le contenu fonctionnel de l'écran.
- Ne jamais réutiliser une ancienne image Open Graph co-marquée BarCodeR + OpenMetaBar.

### Preuves visuelles
- L'accueil privilégie un aperçu cohérent avec le positionnement actuel plutôt qu'une capture datée montrant une ancienne identité.
- Les captures réelles restent utiles sur les pages d'onglets et la galerie, mais elles doivent servir à montrer une fonction précise, pas toute la navigation de l'application.
- Les visuels de démonstration doivent être identifiés comme tels ; ne pas présenter une capture statique comme une démo interactive.

### Micro-copy et CTA
- Une carte de module doit d'abord répondre à une question utilisateur, pas recopier une description fonctionnelle longue.
- Préférer des CTA spécifiques : « Découvrir l'onglet », « Commencer avec GlobalPatterns », « Ouvrir le guide ».
- Lorsqu'un guide dédié existe, le CTA Documentation d'une page d'onglet doit pointer directement vers ce guide plutôt que vers le hub générique.
- Les indicateurs chiffrés décoratifs sont retirés lorsqu'ils n'aident pas à prendre une décision ou à comprendre le produit.

### Installation
- Les commandes affichées doivent être vérifiées contre le code de l'application.
- Pour la version 2.12.8, la commande de lancement de référence est `shiny::runApp()` depuis le dossier `BarCodeR_app` contenant `app.R` et `modules/`.
- Ne pas afficher une commande de lancement simplement plausible si l'application impose un dossier de travail particulier.
