<div align="center">

  <img src="public/logo.svg" width="110" height="110" alt="isaac-tracker Logo" />

# isaac-tracker - steam achievements & unlocks

**Modern, interactive tracker and unlock guide for all 641 achievements in The Binding of Isaac: Rebirth & Repentance.**

[![Demo](https://img.shields.io/badge/Live_Demo-play_online-10b981?style=for-the-badge&logo=githubpages&logoColor=white)](https://metanef.github.io/isaac-tracker/)
[![v1.0](https://img.shields.io/badge/VERSION-1.0_STABLE-10b981?style=for-the-badge)](#)

  <br />

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](#)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-CDN-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](#)
[![Steam API](https://img.shields.io/badge/Steam_Web_API-Sync-1b2838?style=flat-square&logo=steam&logoColor=white)](#)
[![Achievements](https://img.shields.io/badge/Achievements-641_Total-66c0f4?style=flat-square)](#)
[![Theme](https://img.shields.io/badge/Theme-Steam_Dark_Mode-171a21?style=flat-square)](#)
[![i18n](https://img.shields.io/badge/i18n-FR_%7C_EN-a4d007?style=flat-square)](#)
[![Google Fonts](https://img.shields.io/badge/Google_Fonts-Motiva_Sans_|_Segoe_UI-4285F4?style=flat-square&logo=googlefonts&logoColor=white)](#)

</div>

---

## 🎮 Features

- **Complete 641 Achievement Database**: All official achievements from Rebirth, Afterbirth, Afterbirth+, and Repentance with official names, descriptions, and Steam icons.
- **Bilingual Unlock Guides**: Comprehensive English and French unlock methods for every secret and item.
- **Dynamic Localization (i18n)**: Switch seamlessly between French (`FR`) and English (`EN`) at any time without page reloads (choice is automatically persisted in `localStorage`).
- **Steam Web API Synchronization**: Synchronize achievements directly with your Steam account using resilient multi-proxy CORS relays.
- **Resilient Fallback Mode**: Manual raw JSON input drawer for private profiles or restricted networks.
- **Live Search & Multidimensional Filtering**: Instant search across achievement names, descriptions, and unlock tips, with filters for status (All, Locked, Unlocked), DLC versions, and character assignments.
- **Compact & Interactive Cards**: Streamlined UI with 44px icons, collapsible unlock guide drawers, and pixel-perfect baseline typography.
- **Persistent Local Storage**: Progress and configuration are cached in browser `localStorage`, with full JSON export and import capabilities.
- **Zero-Dependency Offline Demo**: Includes a pure JSON demo dataset for instant onboarding and evaluation without credentials.

## 📁 Architecture

```
isaactracker/
├── css/
│   └── style.css          # Steam-inspired dark theme stylesheet and custom components
├── data/
│   ├── achievements.json  # Complete pure JSON dataset of all 641 achievements
│   └── demo.json          # Pure JSON demo dataset for quick offline testing
├── js/
│   ├── i18n.js            # Internationalization engine (FR/EN translations and formatters)
│   ├── storage.js         # LocalStorage management and JSON export/import utilities
│   ├── steam-api.js       # Steam Web API client with multi-proxy fallback handling
│   └── app.js             # Core application controller, search/filter logic, and card rendering
├── public/
│   └── logo.svg           # Vector application logo & browser favicon
├── index.html             # Application entry point with Steam settings pop-up modal
├── 404.html               # Custom Isaac-themed "I AM ERROR" 404 page
├── README.md              # Project documentation
└── .gitignore             # Git ignore file (prevents committing private credentials)
```

## 🚀 Getting started

Open [index.html](index.html) in any modern web browser, or host with any static web server:

1. **Language Selection**: Toggle between English (`EN`) and French (`FR`) via the header switch, or open `index.html?lang=en` directly.
2. **Steam Connection**: Open **Steam Settings** and enter your **SteamID64** and **Steam Web API Key**.
3. **Synchronize**: Click **Fetch Achievement JSON Data** to sync your profile.
4. **Try the Demo**: Click **Load demo data** to test all features immediately with sample progress.

## 📋 Roadmap

### ✅ Implemented Features

- [x] Complete database of all 641 achievements with official Steam icons and descriptions
- [x] Bilingual unlock guides (English & French) with instant language toggle (`FR` / `EN`)
- [x] Compact cards layout with reduced vertical footprint and sleek 44px icons
- [x] Dedicated `data/` folder separating raw datasets and schemas from JavaScript logic
- [x] Steam Web API synchronization with resilient CORS proxy relays
- [x] Fallback manual JSON import for private networks or CORS restrictions
- [x] Live search across achievement names, descriptions, and unlock guides (EN & FR)
- [x] Filter tabs for All, Locked, and Unlocked achievements
- [x] Automatic section splitting (Locked vs Unlocked) in default view
- [x] Local browser storage caching (`localStorage`) to preserve progress between visits
- [x] JSON export and import capabilities
- [x] Offline demo dataset for quick testing without credentials
- [x] **Character & DLC Tagging**: Filter achievements by specific characters (e.g. The Lost, Lilith, Tainted) or game versions (Rebirth, Afterbirth, Repentance)
- [x] **Steam Settings Modal**: Steam settings pop-up dialog with background blur overlay, close button, and Escape key dismissal
- [x] **Custom 404 Error Page**: Isaac-themed "I AM ERROR" 404 page matching the Steam design with bilingual localization and quick navigation
- [x] **Modular Architecture**: Clean separation (`i18n.js`, `storage.js`, `steam-api.js`, `app.js`, `achievements.json`, `demo.json`)
- [x] **Clean Codebase**: English comments, zero redundancy, and full code hygiene
- [x] **Unlock Condition Text Alignment**: Pixel-perfect baseline alignment between "Comment débloquer :" label and unlock guide text
- [x] **100% Pure JSON Data Layer**: Removed `isaac_schema.js`, decoupled guide logic into `js/app.js`, and standardized all datasets as pure JSON (`achievements.json` & `demo.json`)
- [x] **Documentation & Header Refresh**: Standardized README with centered badge header, project logo, and updated architecture guide

### ⏳ Upcoming Features / Backlog

- [ ] **Deploy**: Deploy the application to a github page.
- [ ] **Global Completion Stats**: Fetch and display global player unlock percentages from Steam Community data.
- [ ] **Autofetch stats**

## 🛡️ Privacy & Security

- All Steam API keys and player IDs are stored strictly on the client side in your browser's `localStorage`.
- No credentials or personal tracking data are transmitted to any private server or committed to Git (`credentials.txt` is strictly ignored).

## ⚖️ Disclaimer

© Valve Corporation. Steam and the Steam logo are registered trademarks of Valve Corporation. *The Binding of Isaac: Rebirth* is a registered trademark of Edmund McMillen and Nicalis, Inc. This application is an open-source, non-commercial fan tool.
