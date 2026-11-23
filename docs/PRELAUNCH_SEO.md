# Prépublication de BarCodeR et référencement Google

Le site public présente BarCodeR et sa documentation avant la mise à disposition du logiciel. Cloudflare Pages continue de construire le site à partir de `main` avec `npm run build` et de servir le dossier `dist`. Le ZIP reste dans le bucket R2 privé `barcoder-releases`, lié sous le nom `BARCODER_RELEASES`.

## Régler la disponibilité dans Cloudflare Pages

Dans **Workers & Pages**, ouvrir le projet Pages, puis **Settings → Variables and Secrets**. Choisir l’environnement concerné et créer une variable texte nommée `BARCODER_PUBLIC_RELEASED`.

| Environnement | En prépublication | Après publication officielle |
| --- | --- | --- |
| Production | Variable absente ou valeur `false` | Valeur `true` |
| Preview | Variable absente ou valeur `false` | Variable absente ou valeur `false` |

La fonction exige la chaîne exacte `true`. Une valeur vide, `TRUE`, `1` ou une valeur entourée d’espaces laisse le téléchargement fermé. En prépublication, `GET`, `HEAD` et `GET` avec `Range` sur `/api/download/barcoder` répondent `403` avant toute lecture R2. Le navigateur commence avec « Bientôt disponible ». Il active le lien si `/api/release/status` confirme la publication et la présence de l’archive. Les réponses de ces deux endpoints portent `Cache-Control: private, no-store`.

### Vérifier avant et après un déploiement

Avec Node 22.16.0, lancer `npm ci`, `npm run check`, `npm run build` et `npm test`. Pour une vérification locale fidèle aux Pages Functions, lancer `npx wrangler pages dev dist` depuis ce dépôt. La variable est absente par défaut. La route d’installation et ses variantes peuvent être ouvertes et rafraîchies directement. Vérifier aussi un ancien lien comme `/#/download#installer-process`, ainsi qu’une URL inexistante qui doit répondre `404`.

Sur l’URL du déploiement à contrôler, remplacer `$base` par l’origine sans barre finale. Par exemple, sous PowerShell :

```powershell
$base = 'https://site-barcoder-r-shiny-application.pages.dev'
curl.exe -sS "$base/api/release/status"
curl.exe -sS -I "$base/api/download/barcoder"
curl.exe -sS -D - -H 'Range: bytes=0-15' "$base/api/download/barcoder"
curl.exe -sS -I "$base/fr/analyses"
curl.exe -sS -I "$base/sitemap.xml"
```

Pendant la prépublication, attendre `{"released":false}` et des réponses `403` sur le téléchargement, y compris pour un GET ordinaire. Après publication, attendre `{"released":true,"version":"…"}`, `200` en HEAD avec `Content-Disposition`, `Content-Length`, `ETag` et `Accept-Ranges: bytes`, puis `206` et `Content-Range` sur la requête partielle. Pour vérifier le GET complet en prépublication sans risque de rapatrier un ZIP si la configuration est erronée, utiliser `curl.exe --max-filesize 1024 -sS -D - "$base/api/download/barcoder"`.

Sur une URL Preview, vérifier que la page renvoie `X-Robots-Tag: noindex`, que sa canonique désigne l’origine publique et que l’API reste désactivée. Contrôler aussi dans **Deployments** les anciennes URL de déploiement qui ont pu servir le ZIP. Ces URL peuvent encore exécuter la version de la fonction qui leur est associée. La procédure ci-dessus s’applique à chaque déploiement testé. [Prévisualisations Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/preview-deployments/)

### Publier ou revenir en prépublication

1. Vérifier que le ZIP approuvé existe dans R2 et correspond à la version déclarée dans [functions/_release.js](../functions/_release.js). Le nom et la clé sont calculés à partir de `version`, par exemple `releases/BarCodeR_v2.13.4_Windows.zip`. L’interface reçoit la même version via le statut.
2. Pour publier, passer la variable Production à `true`. Pour suspendre le téléchargement, passer la variable Production à `false` ou la retirer. Conserver le réglage de Preview.
3. Dans **Deployments**, relancer le déploiement de Production du commit approuvé avec la nouvelle configuration. La modification de la variable seule ne met pas à jour les déploiements existants. Un nouveau commit Git est nécessaire uniquement si le code ou la version d’archive change. Pour suspendre, redéployer le commit protégé avec la valeur fermée. [Variables et bindings de Pages Functions](https://developers.cloudflare.com/pages/functions/bindings/)
4. Après déploiement, vérifier le statut, les réponses HTTP et le bouton sur le domaine public. En mode fermé, contrôler également les anciens déploiements ayant distribué le ZIP.

Pour une mise à jour ultérieure du logiciel, déposer le ZIP approuvé dans R2 avec la convention ci-dessus, modifier uniquement `version` dans [functions/_release.js](../functions/_release.js), lancer les tests puis suivre le cycle de validation Git habituel. Le manifeste de la documentation décrit séparément la version pour laquelle les guides ont été générés. Le script `scripts/sync_barcoder_documentation.py` permet de les actualiser depuis leur source.

## Configurer Google Search Console

1. Ajouter une propriété **Préfixe de l’URL** pour `https://site-barcoder-r-shiny-application.pages.dev/`.
2. Choisir **Balise HTML**. Coller la balise `google-site-verification` fournie par Google dans le `<head>` de [index.html](../index.html) à l’emplacement commenté. La balise est copiée dans le HTML statique par la compilation. Après validation et déploiement, vérifier qu’elle est présente dans la source HTML de l’accueil public, puis cliquer sur **Valider**. Conserver la balise pour les vérifications ultérieures. [Valider la propriété d’un site](https://support.google.com/webmasters/answer/9008080?hl=fr)
3. Dans **Sitemaps**, soumettre `sitemap.xml` et vérifier son statut. Le fichier contient les 35 pages du site, le sommaire documentaire et les 90 guides et références. Le domaine de référence est défini dans [src/routes.ts](../src/routes.ts).
4. Dans **Inspection de l’URL**, tester l’URL publiée de l’accueil et quelques rubriques, par exemple `/fr/analyses` et `/download`. Vérifier l’accès de Googlebot, la canonique détectée et le HTML exploré, puis utiliser **Demander une indexation** pour les URL prioritaires. Suivre ensuite **Indexation → Pages** et les URL découvertes via le sitemap. Google décide de l’indexation et de ses délais. [Demander une nouvelle exploration](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl?hl=fr)

## Maintenir les pages et les traductions

- Mettre à jour [src/routes.ts](../src/routes.ts) et [scripts/page-metadata.mjs](../scripts/page-metadata.mjs) lors de l’ajout d’une rubrique. Le build produit les fichiers HTML, les canoniques, les alternatives réciproques `hreflang`, `robots.txt` et `sitemap.xml`. L’anglais utilise les chemins sans préfixe. Les autres langues utilisent `/fr`, `/es`, `/zh` ou `/hi`.
- Les composants contiennent les textes sources anglais et français. Les trois dictionnaires de `src/locales/` traduisent les textes d’interface à partir de l’anglais au build et dans les interactions. Les libellés de disponibilité des cinq langues se trouvent dans [src/release.tsx](../src/release.tsx).
- Le sommaire et les canoniques de la documentation sont produits à partir du manifeste. Les anciens liens `/documentation/?lang=…&module=…` gardent leur comportement. Les anciens fragments `/#/documentation` engagent le même parcours que sur le site précédent, via la page Tutoriels.
- Tenir les métadonnées et les données structurées à jour à partir de faits vérifiés. Les liens de citation utilisent le site du projet à titre provisoire. Ajouter une référence bibliographique définitive lorsque sa publication et son identifiant auront été vérifiés.
