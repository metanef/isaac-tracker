# The Binding of Isaac - Steam Achievements Tracker

Application web de suivi et guide de déblocage des succès Steam pour **The Binding of Isaac: Rebirth / Repentance**.

## 🎮 Présentation

Cette application permet de :

- Consulter l'ensemble des 641 succès de The Binding of Isaac.
- Synchroniser vos succès débloqués et verrouillés depuis votre profil Steam.
- Afficher les méthodes de déblocage et solutions détaillées pour chaque succès à accomplir.
- Filtrer par état (Tous, Verrouillés, Déverrouillés) et rechercher en direct.
- Sauvegarder automatiquement votre progression dans votre navigateur (`localStorage`) ou exporter/importer vos données au format JSON.

## 📁 Architecture du projet

- `isaac_steam_achievements_tracker.html` (ou `index.html`) : Structure HTML de l'application (version française par défaut avec sélecteur de langue).
- `isaac_steam_achievements_tracker_en.html` (ou `index_en.html`) : Version anglaise directe (`lang="en"`).
- `css/style.css` : Feuille de styles CSS personnalisée (thème Steam sombre, responsive, sélecteur FR/EN).
- `js/isaac_schema.js` : Schéma officiel complet des 641 succès (noms, descriptions et icônes officielles Steam).
- `js/achievements_guide.js` : Base de données des succès du jeu et méthodes de déblocage (guides / solutions).
- `js/app.js` : Moteur applicatif (support bilingue i18n FR/EN, filtrage, recherche instantanée, synchronisation Steam API, mode secours direct et sauvegarde LocalStorage).

## 🚀 Utilisation

Ouvrez simplement [isaac_steam_achievements_tracker.html](isaac_steam_achievements_tracker.html) ou [index.html](index.html) (ou [index_en.html](index_en.html) pour la version anglaise) dans n'importe quel navigateur web.

- **Langue** : Basculez à tout moment entre le français (`FR`) et l'anglais (`EN`) via le bouton dans l'en-tête (votre choix est mémorisé).
- Entrez votre **SteamID64** et votre **Clé Web API Steam** via la page d'accueil ou le bouton **Paramètres Steam**.
- Cliquez sur **Récupérer les données JSON de mes succès** pour synchroniser votre compte.
