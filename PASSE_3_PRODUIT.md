# Passe 3 — finition produit

Date : 2026-08-07

## Objectif

Faire disparaître les derniers marqueurs de prototype ou de site académique et rendre les actions publiques plus directes, sans ajouter de technicité méthodologique.

## Modifications principales

1. L'accueil utilise désormais un aperçu schématique cohérent avec BarCodeR au lieu de la capture complète contenant l'ancien branding.
2. Les cartes des onglets affichent la question à laquelle chaque module répond plutôt qu'une description fonctionnelle longue.
3. Les captures d'application sont recadrées sur leur contenu ; le lien vers la pleine résolution a été supprimé tant que les captures conservent l'ancien wordmark BarCodeRShiny.
4. Le header conserve uniquement l'icône graphique de l'ancien asset et affiche le wordmark public « BarCodeR » séparément.
5. Les anciennes métadonnées sociales pointant vers une capture obsolète ont été retirées ; la description SEO est recentrée sur BarCodeR.
6. La page Cas d'usage ne repose plus sur des métriques décoratives et introduit directement trois situations concrètes.
7. Les tutoriels utilisent une formulation tournée vers l'usage plutôt que vers l'état du chantier éditorial.
8. GlobalPatterns dispose maintenant d'une action directe vers le tutoriel de prise en main.
9. Les pages d'onglets ouvrent directement leur guide méthodologique quand il existe.
10. La commande de lancement a été corrigée en `shiny::runApp()` depuis `BarCodeR_app`, conformément au contrôle présent dans `app.R`.
11. Les cartes Cas d'usage et Installation ont été légèrement compactées pour réduire les hauteurs artificielles.
12. La page Reproductibilité est désormais accessible depuis le footer comme élément de confiance du produit.

## Validation

- `npm run check` : OK avec les dépendances de la passe précédente montées localement.
- Le build Vite reste non testable dans cet environnement à cause de la dépendance native Rolldown absente (`@rolldown/binding-linux-x64-gnu`).
- Les changements ont été enregistrés par checkpoints Git locaux.
