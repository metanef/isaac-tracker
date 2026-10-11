# The Binding of Isaac - Steam Achievements Tracker

Modern, responsive web application for tracking and guiding unlock methods for all 641 Steam achievements in **The Binding of Isaac: Rebirth / Repentance**.

## 🎮 Features

- **Complete Database**: All 641 achievements with official names, descriptions, and Steam icons.
- **Bilingual Unlock Guides**: Full English and French guides explaining how to unlock each achievement.
- **Dynamic Localization (i18n)**: Switch seamlessly between English (`EN`) and French (`FR`) in real-time without reloading the page.
- **Steam Profile Sync**: Direct synchronization with your Steam account using Steam Web API and resilient CORS proxies.
- **Manual Fallback**: Built-in raw JSON import if Steam Web API blocks direct cross-origin requests.
- **Search & Filter**: Instant live search across names, descriptions, and guides (in both English and French), plus status tabs (All, Locked, Unlocked).
- **Persistent Storage**: Automatic progress caching in browser `localStorage`, plus manual JSON export and import.

## 📁 Modular Architecture

```
isaactracker/
├── css/
│   └── style.css          # Custom Steam dark theme styles and layout
├── js/
│   ├── isaac_schema.js    # Comprehensive schema of all 641 achievements, demo dataset, and guide lookup
│   ├── i18n.js            # Internationalization engine (EN/FR translations, date formatting, DOM updates)
│   ├── storage.js         # LocalStorage management and JSON import/export utilities
│   ├── steam-api.js       # Steam Web API client with multi-proxy fallback handling
│   └── app.js             # Core UI application controller, event handlers, and card rendering
├── index.html             # Single clean application entry point
├── README.md              # Project documentation
└── .gitignore             # Git ignore file (keeps local credentials private)
```

## 🚀 Usage

Open [index.html](index.html) in any modern web browser:

1. **Language**: Toggle anytime between English (`EN`) and French (`FR`) via the header switch (your choice is preserved automatically). You can also open `index.html?lang=en` directly.
2. **Connect Steam**: Enter your **SteamID64** and **Steam Web API Key** on the onboarding screen (or via the **Steam Settings** button).
3. **Sync Achievements**: Click **Fetch Achievement JSON Data** to retrieve your unlocked and locked achievements.
4. **Offline Demo**: Click **Load demo data** to try the app immediately without entering credentials.

## 📋 Roadmap & TODO

### ✅ Implemented Features
- [x] Complete database of all 641 achievements with official Steam icons and descriptions
- [x] Bilingual unlock guides (English & French) with instant language toggle (`FR` / `EN`)
- [x] Steam Web API synchronization with resilient CORS proxy relays
- [x] Fallback manual JSON import for private networks or CORS restrictions
- [x] Live search across achievement names, descriptions, and unlock guides (EN & FR)
- [x] Filter tabs for All, Locked, and Unlocked achievements
- [x] Automatic section splitting (Locked vs Unlocked) in default view
- [x] Local browser storage caching (`localStorage`) to preserve progress between visits
- [x] JSON export and import capabilities
- [x] Offline demo dataset for quick testing without credentials
- [x] Modular architecture (`i18n.js`, `storage.js`, `steam-api.js`, `app.js`, `isaac_schema.js`)
- [x] Clean codebase with zero redundancy and English comments

### ⏳ Upcoming Features / Backlog
- [ ] **Compact Cards Layout**: Refine and compact achievement cards to reduce vertical footprint and screen space usage.
- [ ] **Dedicated Data Folder**: Move JSON datasets and schemas out of the `js/` directory into a dedicated `data/` directory.
- [ ] **Character & DLC Tagging**: Filter achievements by specific characters (e.g. The Lost, Lilith, Tainted) or game versions (Rebirth, Afterbirth, Repentance).
- [ ] **Global Completion Stats**: Fetch and display global player unlock percentages from Steam Community data.
