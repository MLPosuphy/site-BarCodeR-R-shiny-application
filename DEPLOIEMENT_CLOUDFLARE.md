# Déployer gratuitement le site sur Cloudflare Pages

## 1. Préparer le dépôt GitHub

Le contenu de ce dossier doit se trouver à la racine du dépôt GitHub.
Ne jamais envoyer `node_modules/` ni `dist/` dans Git.

```bash
git add .
git commit -m "Prepare website for Cloudflare Pages"
git push origin main
```

## 2. Créer le projet Pages

Dans le tableau de bord Cloudflare :

1. ouvrir **Workers & Pages** ;
2. sélectionner **Create application** ;
3. choisir **Pages** puis **Import an existing Git repository** ;
4. connecter GitHub si nécessaire ;
5. choisir le dépôt du site.

## 3. Paramètres de compilation

Renseigner exactement :

```text
Production branch: main
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: /
```

Le fichier `.node-version` fixe Node.js à `22.16.0`. Aucune variable
d'environnement n'est nécessaire pour le premier déploiement.

Sélectionner ensuite **Save and Deploy**.

## 4. Vérifier le premier déploiement

Cloudflare fournit une adresse de la forme :

```text
https://nom-du-projet.pages.dev
```

Vérifier au minimum :

- l'accueil et les six entrées de navigation ;
- le changement FR/EN ;
- la page Documentation et son lecteur intégré ;
- les figures GlobalPatterns ;
- les téléchargements des carnets et manifestes ;
- l'affichage mobile.

## 5. Ajouter un domaine personnel — facultatif

Dans le projet Pages :

1. ouvrir **Custom domains** ;
2. sélectionner **Set up a domain** ;
3. saisir le domaine ou sous-domaine ;
4. suivre la validation DNS proposée par Cloudflare.

Le sous-domaine `pages.dev` reste gratuit. L'utilisation d'un domaine personnel
est également prise en charge par Pages, mais l'achat éventuel du nom de domaine
n'est pas inclus.

## 6. Déploiements suivants

Chaque envoi sur la branche `main` déclenche automatiquement :

```text
installation npm
→ contrôle TypeScript
→ build Vite
→ publication Cloudflare Pages
```

Commande habituelle :

```bash
git add .
git commit -m "Update website"
git push origin main
```

## 7. Revenir à une version antérieure

Dans **Workers & Pages > projet > Deployments**, ouvrir un ancien déploiement
réussi et utiliser l'action de restauration ou de promotion disponible dans le
tableau de bord.

## 8. Échec de build fréquent

Si le journal mentionne une liaison native Rolldown ou un paquet propre à
Windows :

1. vérifier que `node_modules/` n'est pas suivi par Git ;
2. supprimer localement `node_modules/` ;
3. exécuter `npm ci` ;
4. valider avec `npm run build` ;
5. pousser uniquement le code, `package.json` et `package-lock.json`.

Cloudflare installe lui-même les dépendances Linux pendant le build.
