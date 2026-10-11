# The Binding of Isaac - Steam Achievements Tracker

Web application for tracking and guiding unlock methods for Steam achievements in **The Binding of Isaac: Rebirth / Repentance**.

## 🎮 Features

This application lets you:

- Browse all 641 achievements for The Binding of Isaac.
- Synchronize your unlocked and locked achievements directly from your Steam profile.
- View detailed unlock methods and solutions for every achievement.
- Filter by status (All, Locked, Unlocked) with instant live search.
- Automatically save your progress in the browser (`localStorage`) or export/import your data in JSON format.
- Switch seamlessly between English and French at any time.

## 📁 Project Architecture

- `index.html` (or `isaac_steam_achievements_tracker.html`): Main HTML structure with built-in language switcher (defaults to French or browser preference).
- `index_en.html` (or `isaac_steam_achievements_tracker_en.html`): Direct English entry point (`lang="en"`).
- `css/style.css`: Custom Steam dark theme CSS with responsive layout and language switcher styles.
- `js/isaac_schema.js`: Complete official schema of all 641 achievements (official names, descriptions, and Steam icons).
- `js/achievements_guide.js`: Unlock guides and solutions dataset.
- `js/app.js`: Application logic (bilingual i18n support, filtering, live search, Steam API synchronization, direct CORS fallback, and LocalStorage management).

## 🚀 Usage

Open [index.html](index.html) or [index_en.html](index_en.html) (or [isaac_steam_achievements_tracker.html](isaac_steam_achievements_tracker.html)) in any modern web browser.

- **Language**: Switch anytime between English (`EN`) and French (`FR`) via the header button (your preference is automatically saved).
- Enter your **SteamID64** and **Steam Web API Key** on the onboarding page or through the **Steam Settings** button.
- Click **Fetch Achievement JSON Data** to sync your profile.
