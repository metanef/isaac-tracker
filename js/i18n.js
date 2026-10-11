/**
 * Internationalization (i18n) Module
 * Handles English and French translations, UI text updates, and language persistence.
 */

const STORAGE_KEY_LANG = 'isaac_tracker_lang';

let currentLang = 'fr';

const TRANSLATIONS = {
  fr: {
    appTitle: "The Binding of Isaac: Rebirth",
    appSubtitle: "Suivi des succès et guide des déblocages",
    metaTitle: "Succès Steam - The Binding of Isaac: Rebirth",
    steamSettings: "Paramètres Steam",
    exportJson: "Exporter JSON",
    exportTitle: "Sauvegarder vos données en fichier JSON",
    importJson: "Importer JSON",
    importTitle: "Importer un fichier JSON de succès",
    
    // Onboarding & Welcome view
    welcomeTitle: "Bienvenue sur Isaac Tracker",
    welcomeDesc: "Suivez vos 641 succès, consultez les guides de déblocage bilingues et filtrez par personnage ou DLC.",
    btnConnectSteam: "Connecter mon compte Steam",
    closeModal: "Fermer",
    onboardingTitle: "Connexion Steam Tracker",
    onboardingDesc: "Connectez votre compte pour récupérer vos succès et les guides de déblocage.",
    btnGetSteamId: "Récupérer mon Steam ID",
    placeholderSteamId: "Collez votre SteamID64 ici (17 chiffres)",
    btnGetApiKey: "Récupérer ma Clé API",
    placeholderApiKey: "Collez votre clé API Steam ici",
    btnFetchData: "Récupérer les données JSON de mes succès",
    statusEnterBoth: "Veuillez renseigner à la fois votre Steam ID et votre Clé API.",
    statusAttempting: "Tentative de récupération automatique...",
    statusFallbackCors: "Onglet Steam ouvert dans le navigateur !<br>Faites <strong>Ctrl+A</strong> puis <strong>Ctrl+C</strong> sur la page Steam et collez le JSON brut ci-dessous.",
    statusPopupBlocked: "⚠️ Votre navigateur a bloqué l'ouverture automatique de l'onglet.<br>Cliquez sur <strong>Ouvrir la page Steam API</strong> ci-dessous pour l'ouvrir manuellement.",
    
    // Manual JSON fallback
    corsTitle: "Lien Steam ouvert dans un nouvel onglet",
    corsDesc: "Sur la page Steam : faites <strong>Ctrl+A</strong> puis <strong>Ctrl+C</strong> pour tout copier, puis collez le contenu ci-dessous :",
    placeholderManualJson: 'Collez tout le texte JSON brut ici (commençant par {"playerstats": ...})',
    reopenSteamLink: "Ouvrir la page Steam API",
    btnProcessJson: "Valider et charger mes succès",
    btnLoadDemo: "Charger les données de démo",
    
    // Dashboard stats
    progressTitle: "Progression des Succès",
    completed: "Complété",
    unlockedLabel: "Déverrouillés :",
    lockedLabel: "Verrouillés :",
    statsDetail: (unlocked, total, percent) => `${unlocked} sur ${total} (${percent}%) succès complétés`,
    loadingData: "Chargement des données...",
    
    // Tabs & Filters
    tabAll: "Tous",
    tabLocked: "Succès Verrouillés",
    tabUnlocked: "Déverrouillés",
    searchPlaceholder: "Rechercher par nom, description ou guide...",
    dlcAll: "Tous les DLCs",
    charAll: "Tous les personnages",
    charNone: "Général & Défis",
    charRegular: "Personnages Réguliers",
    charTainted: "Personnages Tainted",
    
    // Cards
    badgeLocked: "Verrouillé",
    badgeUnlocked: "Débloqué",
    secretAchievement: "Succès secret.",
    playerPercent: (p) => `${p}% des joueurs ont ce succès`,
    toUnlock: "À débloquer",
    guideHeadingLocked: "Comment débloquer",
    guideHeadingUnlocked: "Méthode de déblocage",
    
    // Sections
    sectionLockedHeader: "Succès Restants à Débloquer",
    sectionUnlockedHeader: "Succès Déjà Débloqués",
    
    // Empty state
    emptyTitle: "Aucun succès trouvé",
    emptyDesc: "Modifiez vos critères de recherche ou réinitialisez le filtre sélectionné.",
    
    // Alerts & Notifications
    alertMissingCreds: "Veuillez d'abord renseigner votre Steam ID et votre Clé API.",
    toastSyncSuccess: (count) => `Synchronisation réussie ! ${count} succès chargés.`,
    toastImportSuccess: (count) => `${count} succès importés avec succès.`,
    toastPasteEmpty: "Veuillez coller le contenu JSON copié depuis Steam.",
    toastInvalidSchema: "Format invalide : 'playerstats.achievements' introuvable.",
    toastInvalidJson: "Format JSON invalide. Vérifiez d'avoir copié tout le contenu.",
    toastDemoLoaded: "Données d'exemple chargées.",
    toastExported: "Fichier JSON exporté.",
    toastFileReadError: "Erreur lors de la lecture du fichier JSON.",
    
    // Footer
    footerDisclaimer: "© Valve Corporation. Steam et le logo Steam sont des marques déposées. The Binding of Isaac est une marque déposée par Edmund McMillen & Nicalis, Inc.",
    footerSub: "Application de suivi personnel - Synchronisation API Steam & Guides de déblocage"
  },
  en: {
    appTitle: "The Binding of Isaac: Rebirth",
    appSubtitle: "Achievements tracker and unlock guide",
    metaTitle: "Steam Achievements - The Binding of Isaac: Rebirth",
    steamSettings: "Steam Settings",
    exportJson: "Export JSON",
    exportTitle: "Save your data as a JSON file",
    importJson: "Import JSON",
    importTitle: "Import achievements JSON file",
    
    // Onboarding & Welcome view
    welcomeTitle: "Welcome to Isaac Tracker",
    welcomeDesc: "Track all 641 achievements, browse bilingual unlock guides, and filter by character or DLC.",
    btnConnectSteam: "Connect Steam Account",
    closeModal: "Close",
    onboardingTitle: "Steam Tracker Connection",
    onboardingDesc: "Connect your account to fetch your achievements and unlock guides.",
    btnGetSteamId: "Find my Steam ID",
    placeholderSteamId: "Paste your SteamID64 here (17 digits)",
    btnGetApiKey: "Get my API Key",
    placeholderApiKey: "Paste your Steam API key here",
    btnFetchData: "Fetch Achievement JSON Data",
    statusEnterBoth: "Please enter both your Steam ID and your API Key.",
    statusAttempting: "Attempting automatic sync...",
    statusFallbackCors: "Steam tab opened in your browser!<br>Press <strong>Ctrl+A</strong> then <strong>Ctrl+C</strong> on the Steam page and paste raw JSON in the box below.",
    statusPopupBlocked: "⚠️ Your browser blocked the automatic tab popup.<br>Click <strong>Open Steam API Page</strong> below to open it manually.",
    
    // Manual JSON fallback
    corsTitle: "Steam link opened in a new tab",
    corsDesc: "On the Steam page: press <strong>Ctrl+A</strong> then <strong>Ctrl+C</strong> to copy everything, then paste it below:",
    placeholderManualJson: 'Paste all raw JSON text here (starting with {"playerstats": ...})',
    reopenSteamLink: "Open Steam API page",
    btnProcessJson: "Validate & Load Achievements",
    btnLoadDemo: "Load demo data",
    
    // Dashboard stats
    progressTitle: "Achievements Progress",
    completed: "Completed",
    unlockedLabel: "Unlocked:",
    lockedLabel: "Locked:",
    statsDetail: (unlocked, total, percent) => `${unlocked} of ${total} (${percent}%) achievements completed`,
    loadingData: "Loading data...",
    
    // Tabs & Filters
    tabAll: "All",
    tabLocked: "Locked Achievements",
    tabUnlocked: "Unlocked",
    searchPlaceholder: "Search by name, description or guide...",
    dlcAll: "All DLCs",
    charAll: "All Characters",
    charNone: "General & Challenges",
    charRegular: "Regular Characters",
    charTainted: "Tainted Characters",
    
    // Cards
    badgeLocked: "Locked",
    badgeUnlocked: "Unlocked",
    secretAchievement: "Secret achievement.",
    playerPercent: (p) => `${p}% of players unlocked this`,
    toUnlock: "To unlock",
    guideHeadingLocked: "How to unlock",
    guideHeadingUnlocked: "Unlock method",
    
    // Sections
    sectionLockedHeader: "Remaining Locked Achievements",
    sectionUnlockedHeader: "Unlocked Achievements",
    
    // Empty state
    emptyTitle: "No achievements found",
    emptyDesc: "Try adjusting your search criteria or reset the selected filter.",
    
    // Alerts & Notifications
    alertMissingCreds: "Please enter your Steam ID and your API Key first.",
    toastSyncSuccess: (count) => `Synchronization successful! ${count} achievements loaded.`,
    toastImportSuccess: (count) => `${count} achievements imported successfully.`,
    toastPasteEmpty: "Please paste the raw JSON copied from Steam.",
    toastInvalidSchema: "Invalid format: 'playerstats.achievements' not found.",
    toastInvalidJson: "Invalid JSON format. Make sure you copied the entire content.",
    toastDemoLoaded: "Demo data loaded.",
    toastExported: "JSON file exported.",
    toastFileReadError: "Error reading the JSON file.",
    
    // Footer
    footerDisclaimer: "© Valve Corporation. Steam and the Steam logo are registered trademarks. The Binding of Isaac is a registered trademark of Edmund McMillen & Nicalis, Inc.",
    footerSub: "Personal tracking application - Steam API sync & Unlock guides"
  }
};

/**
 * Returns the localized string for a given key, with optional formatting arguments.
 * @param {string} key - Translation key
 * @param {...any} args - Formatting parameters if the translation is a function
 * @returns {string} Localized string
 */
function t(key, ...args) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.fr;
  const val = dict[key];
  if (typeof val === 'function') {
    return val(...args);
  }
  return val !== undefined ? val : (TRANSLATIONS.fr[key] || key);
}

/**
 * Sets the active language ('fr' or 'en') and updates the DOM.
 * @param {string} lang - 'fr' or 'en'
 * @param {Function} [onLanguageChanged] - Optional callback triggered on switch
 */
function setLanguage(lang, onLanguageChanged) {
  if (lang !== 'fr' && lang !== 'en') lang = 'fr';
  currentLang = lang;
  try {
    localStorage.setItem(STORAGE_KEY_LANG, lang);
  } catch (e) {
    // Storage access may be restricted in private browsing
  }
  applyLanguageToDOM();
  if (typeof onLanguageChanged === 'function') {
    onLanguageChanged(currentLang);
  }
}

/**
 * Updates all DOM elements with data-i18n, data-i18n-placeholder, and data-i18n-title.
 */
function applyLanguageToDOM() {
  document.documentElement.lang = currentLang;
  document.title = t('metaTitle');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    if (text) el.innerHTML = text;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const text = t(key);
    if (text) el.placeholder = text;
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const text = t(key);
    if (text) el.title = text;
  });

  document.querySelectorAll('[data-i18n-label]').forEach(el => {
    const key = el.getAttribute('data-i18n-label');
    const text = t(key);
    if (text) el.label = text;
  });

  const btnFr = document.getElementById('langFrBtn');
  const btnEn = document.getElementById('langEnBtn');
  if (btnFr) btnFr.classList.toggle('active', currentLang === 'fr');
  if (btnEn) btnEn.classList.toggle('active', currentLang === 'en');
}

/**
 * Formats a Unix timestamp into a localized unlock date string.
 * @param {number} unixSeconds - Steam timestamp in seconds
 * @returns {string} Formatted date string
 */
function formatSteamDate(unixSeconds) {
  if (!unixSeconds) return '';
  const date = new Date(unixSeconds * 1000);
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const mins = String(date.getMinutes()).padStart(2, '0');

  if (currentLang === 'en') {
    const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `Unlocked on ${monthsEn[date.getMonth()]} ${day}, ${year} at ${hours}:${mins}`;
  } else {
    const monthsFr = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
    return `Débloqué le ${day} ${monthsFr[date.getMonth()]} ${year}, à ${hours}:${mins}`;
  }
}

/**
 * Initializes language preference from URL params, storage, or html tag.
 */
function initLanguage() {
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  const storedLang = localStorage.getItem(STORAGE_KEY_LANG);
  const docLang = document.documentElement.lang;

  if (urlLang === 'en' || urlLang === 'fr') {
    currentLang = urlLang;
  } else if (storedLang === 'en' || storedLang === 'fr') {
    currentLang = storedLang;
  } else if (docLang === 'en') {
    currentLang = 'en';
  } else {
    currentLang = 'fr';
  }

  applyLanguageToDOM();
}
