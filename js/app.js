/**
 * Application Isaac Steam Achievements Tracker
 * Gestion de l'affichage, du filtrage, de la recherche et de la synchronisation Steam.
 * Support bilingue Français / Anglais (i18n).
 */

// Clés de stockage LocalStorage
const STORAGE_KEY_DATA = 'isaac_achievements_list_v1';
const STORAGE_KEY_API = 'steam_tracker_apikey';
const STORAGE_KEY_ID = 'steam_tracker_steamid';
const STORAGE_KEY_LANG = 'isaac_tracker_lang';

// État global
let achievements = [];
let currentFilter = 'all';
let searchQuery = '';
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
    
    // Onboarding
    onboardingTitle: "Connexion Steam Tracker",
    onboardingDesc: "Connectez votre compte pour récupérer vos succès et les guides de déblocage.",
    btnGetSteamId: "Récupérer mon Steam ID",
    placeholderSteamId: "Collez votre SteamID64 ici (17 chiffres)",
    btnGetApiKey: "Récupérer ma Clé API",
    placeholderApiKey: "Collez votre clé API Steam ici",
    btnFetchData: "Récupérer les données JSON de mes succès",
    statusEnterBoth: "Veuillez renseigner à la fois votre Steam ID et votre Clé API.",
    statusAttempting: "Tentative de récupération automatique...",
    statusFallbackCors: "Onglet Steam ouvert dans le navigateur.<br>Faites <strong>Ctrl+A</strong> puis <strong>Ctrl+C</strong> et collez le JSON brut dans la zone ci-dessous.",
    
    // Fallback manuel
    corsTitle: "Lien Steam ouvert dans un nouvel onglet",
    corsDesc: "Sur la page Steam : faites <strong>Ctrl+A</strong> puis <strong>Ctrl+C</strong> pour tout copier, puis collez le contenu ci-dessous :",
    placeholderManualJson: 'Collez tout le texte JSON brut ici (commençant par {"playerstats": ...})',
    reopenSteamLink: "Rouvrir la page Steam API",
    btnProcessJson: "Valider et charger mes succès",
    btnLoadDemo: "Charger les données de démo",
    
    // Dashboard Stats
    progressTitle: "Progression des Succès",
    completed: "Complété",
    unlockedLabel: "Déverrouillés :",
    lockedLabel: "Verrouillés :",
    statsDetail: (unlocked, total, percent) => `${unlocked} sur ${total} (${percent} %) succès accomplis`,
    loadingData: "Chargement des données...",
    
    // Onglets & Recherche
    tabAll: "Tous",
    tabLocked: "Succès Verrouillés",
    tabUnlocked: "Déverrouillés",
    searchPlaceholder: "Rechercher par nom, description ou guide...",
    
    // Cartes
    badgeLocked: "Verrouillé",
    badgeUnlocked: "Débloqué",
    secretAchievement: "Succès secret.",
    playerPercent: (p) => `${p} % des joueurs ont ce succès`,
    toUnlock: "À débloquer",
    guideBtn: "Guide",
    viewGuideBtn: "Voir le guide",
    guideTitleLocked: "Afficher ou masquer la méthode de déblocage",
    guideTitleUnlocked: "Voir la méthode de déblocage",
    guideHeadingLocked: "Comment le débloquer",
    guideHeadingUnlocked: "Méthode de déblocage",
    
    // En-têtes de sections
    sectionLockedHeader: "🎯 Succès Restants à Débloquer",
    sectionUnlockedHeader: "✅ Succès Débloqués",
    
    // État vide
    emptyTitle: "Aucun succès trouvé",
    emptyDesc: "Modifiez vos critères de recherche ou réinitialisez le filtre sélectionné.",
    
    // Toasts & Dialogs
    alertMissingCreds: "Veuillez d'abord renseigner votre Clé API et votre SteamID64 ci-dessus.",
    toastSyncSuccess: (count) => `Synchronisation réussie (${count} succès) !`,
    toastPasteEmpty: "Veuillez coller le texte JSON avant de valider.",
    toastImportSuccess: (count) => `${count} succès importés avec succès !`,
    toastInvalidSchema: "Format invalide : 'playerstats.achievements' introuvable.",
    toastInvalidJson: "Format JSON invalide. Vérifiez d'avoir copié tout le contenu.",
    toastDemoLoaded: "Données d'exemple chargées.",
    toastExported: "Fichier JSON exporté.",
    toastFileReadError: "Erreur lors de la lecture du fichier JSON.",
    
    // Pied de page
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
    
    // Onboarding
    onboardingTitle: "Steam Tracker Connection",
    onboardingDesc: "Connect your account to fetch your achievements and unlock guides.",
    btnGetSteamId: "Find my Steam ID",
    placeholderSteamId: "Paste your SteamID64 here (17 digits)",
    btnGetApiKey: "Get my API Key",
    placeholderApiKey: "Paste your Steam API key here",
    btnFetchData: "Fetch Achievement JSON Data",
    statusEnterBoth: "Please enter both your Steam ID and your API Key.",
    statusAttempting: "Attempting automatic sync...",
    statusFallbackCors: "Steam tab opened in your browser.<br>Press <strong>Ctrl+A</strong> then <strong>Ctrl+C</strong> and paste raw JSON in the box below.",
    
    // Fallback manual paste
    corsTitle: "Steam link opened in a new tab",
    corsDesc: "On the Steam page: press <strong>Ctrl+A</strong> then <strong>Ctrl+C</strong> to copy everything, then paste it below:",
    placeholderManualJson: 'Paste all raw JSON text here (starting with {"playerstats": ...})',
    reopenSteamLink: "Reopen Steam API page",
    btnProcessJson: "Validate & Load Achievements",
    btnLoadDemo: "Load demo data",
    
    // Dashboard Stats
    progressTitle: "Achievements Progress",
    completed: "Completed",
    unlockedLabel: "Unlocked:",
    lockedLabel: "Locked:",
    statsDetail: (unlocked, total, percent) => `${unlocked} of ${total} (${percent}%) achievements completed`,
    loadingData: "Loading data...",
    
    // Tabs & Search
    tabAll: "All",
    tabLocked: "Locked Achievements",
    tabUnlocked: "Unlocked",
    searchPlaceholder: "Search by name, description or guide...",
    
    // Cards
    badgeLocked: "Locked",
    badgeUnlocked: "Unlocked",
    secretAchievement: "Secret achievement.",
    playerPercent: (p) => `${p}% of players unlocked this`,
    toUnlock: "To unlock",
    guideBtn: "Guide",
    viewGuideBtn: "View guide",
    guideTitleLocked: "Show or hide unlock guide",
    guideTitleUnlocked: "View unlock guide",
    guideHeadingLocked: "How to unlock",
    guideHeadingUnlocked: "Unlock method",
    
    // Sections
    sectionLockedHeader: "🎯 Remaining Locked Achievements",
    sectionUnlockedHeader: "✅ Unlocked Achievements",
    
    // Empty state
    emptyTitle: "No achievements found",
    emptyDesc: "Change your search criteria or reset the active filter.",
    
    // Toasts & Alerts
    alertMissingCreds: "Please enter your API Key and SteamID64 above first.",
    toastSyncSuccess: (count) => `Sync successful (${count} achievements)!`,
    toastPasteEmpty: "Please paste JSON text before validating.",
    toastImportSuccess: (count) => `Successfully imported ${count} achievements!`,
    toastInvalidSchema: "Invalid format: 'playerstats.achievements' not found.",
    toastInvalidJson: "Invalid JSON format. Check that you copied the full content.",
    toastDemoLoaded: "Demo data loaded.",
    toastExported: "JSON file exported.",
    toastFileReadError: "Error reading JSON file.",
    
    // Footer
    footerDisclaimer: "© Valve Corporation. Steam and the Steam logo are registered trademarks. The Binding of Isaac is a registered trademark of Edmund McMillen & Nicalis, Inc.",
    footerSub: "Personal tracking app - Steam API synchronization & Unlock guides"
  }
};

function t(key, ...args) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.fr;
  const val = dict[key];
  if (typeof val === 'function') {
    return val(...args);
  }
  return val !== undefined ? val : (TRANSLATIONS.fr[key] || key);
}

function setLanguage(lang) {
  if (lang !== 'fr' && lang !== 'en') lang = 'fr';
  currentLang = lang;
  try {
    localStorage.setItem(STORAGE_KEY_LANG, lang);
  } catch (e) {}
  applyLanguageToDOM();
  if (achievements.length > 0) {
    updateStats();
    renderAchievements();
  }
}

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

  const btnFr = document.getElementById('langFrBtn');
  const btnEn = document.getElementById('langEnBtn');
  if (btnFr) btnFr.classList.toggle('active', currentLang === 'fr');
  if (btnEn) btnEn.classList.toggle('active', currentLang === 'en');
}

/**
 * Initialisation de l'application
 */
function init() {
  // Détection de la langue initiale
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

  // Chargement des identifiants sauvegardés
  const savedKey = localStorage.getItem(STORAGE_KEY_API);
  const savedId = localStorage.getItem(STORAGE_KEY_ID);
  if (savedKey) document.getElementById('steamApiKeyInput').value = savedKey;
  if (savedId) document.getElementById('steamIdInput').value = savedId;

  // Chargement des données de succès
  const stored = localStorage.getItem(STORAGE_KEY_DATA);
  if (stored) {
    try {
      achievements = JSON.parse(stored);
    } catch (e) {
      achievements = [];
    }
  } else {
    achievements = [];
  }

  setupEventListeners();

  if (achievements.length > 0) {
    enrichAchievementsMetadata(achievements);
    showTrackerView();
  } else {
    showOnboardingView();
  }
}

/**
 * Afficher l'interface principale du tracker
 */
function showTrackerView() {
  const onboarding = document.getElementById('onboardingSection');
  const dashboard = document.getElementById('trackerDashboardSection');
  if (onboarding) onboarding.classList.add('hidden');
  if (dashboard) dashboard.classList.remove('hidden');
  renderAll();
}

/**
 * Afficher l'écran d'accueil / connexion
 */
function showOnboardingView() {
  const onboarding = document.getElementById('onboardingSection');
  const dashboard = document.getElementById('trackerDashboardSection');
  if (onboarding) onboarding.classList.remove('hidden');
  if (dashboard) dashboard.classList.add('hidden');
}

/**
 * Enrichit les objets succès avec les noms officiels, icônes réelles et guides
 */
function enrichAchievementsMetadata(list) {
  list.forEach(item => {
    // 1. Récupération des informations du schéma officiel local
    const meta = (typeof ISAAC_OFFICIAL_SCHEMA !== 'undefined' && ISAAC_OFFICIAL_SCHEMA[item.id]) 
      ? ISAAC_OFFICIAL_SCHEMA[item.id] 
      : null;

    if (meta) {
      // Si le nom est absent, égal à l'id ou purement numérique
      if (!item.name || item.name === item.id || /^\d+$/.test(item.name)) {
        item.name = meta.name;
      }
      // Si l'icône est un placeholder ou vide
      if (!item.icon || item.icon.includes('placehold.co') || item.icon === '') {
        item.icon = meta.icon;
      }
      if (!item.icongray || item.icongray.includes('placehold.co') || item.icongray === '') {
        item.icongray = meta.icongray || meta.icon;
      }
      // Si la description est générique
      if (!item.description || item.description === 'Succès verrouillé' || item.description === 'Succès secret') {
        if (meta.description) item.description = meta.description;
      }
      // Si la note FR est vide ou générique, assigner la condition de déblocage (explication FR)
      if (!item.note || item.note.trim() === '' || item.note === 'Succès secret.' || item.note === 'Succès verrouillé') {
        if (meta.explication) item.note = meta.explication;
      }
      // Si la note EN est vide ou générique, assigner la condition de déblocage (explication EN)
      if (!item.note_en || item.note_en.trim() === '' || item.note_en === 'Secret achievement.' || item.note_en === 'Locked achievement.') {
        if (meta.explication_en) item.note_en = meta.explication_en;
      }
    }

    // 2. Guide de secours supplémentaire si note toujours vide
    if (!item.note || item.note.trim() === '') {
      const guide = typeof getAchievementGuide === 'function' ? getAchievementGuide(item.id, item.name, 'fr') : '';
      if (guide) item.note = guide;
    }
    if (!item.note_en || item.note_en.trim() === '') {
      const guideEn = typeof getAchievementGuide === 'function' ? getAchievementGuide(item.id, item.name, 'en') : '';
      if (guideEn) item.note_en = guideEn;
    }
  });
}

/**
 * Sauvegarde dans le localStorage du navigateur
 */
function saveAchievementsToLocal() {
  localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(achievements));
}

/**
 * Formatage des dates Steam (timestamp Unix en secondes)
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
 * Affichage d'un toast informatif
 */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const text = document.getElementById('toastMsg');
  text.innerText = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 2500);
}

/**
 * Mise à jour des compteurs et statistiques
 */
function updateStats() {
  const total = achievements.length;
  const unlocked = achievements.filter(a => a.achieved === 1).length;
  const locked = total - unlocked;
  const percent = total > 0 ? Math.round((unlocked / total) * 100) : 0;

  document.getElementById('statPercent').innerText = `${percent}%`;
  document.getElementById('steamProgressBar').style.width = `${percent}%`;
  document.getElementById('statUnlockedCount').innerText = unlocked;
  document.getElementById('statLockedCount').innerText = locked;
  document.getElementById('statsDetailText').innerText = t('statsDetail', unlocked, total, percent);

  document.getElementById('countAll').innerText = total;
  document.getElementById('countLocked').innerText = locked;
  document.getElementById('countUnlocked').innerText = unlocked;
}

/**
 * Rendu visuel d'une carte de succès
 */
function createCardElement(item) {
  const card = document.createElement('div');
  const isLocked = item.achieved === 0;
  card.className = `steam-card rounded p-3 relative group ${isLocked ? 'is-locked' : 'is-unlocked'}`;
  card.id = `card-${item.id}`;

  const dateText = item.achieved === 1 ? formatSteamDate(item.unlockTime) : '';
  const percentText = item.globalPercent ? t('playerPercent', item.globalPercent) : '';

  // Icône avec fallback vers l'icône normale ou icongray
  const iconUrl = isLocked 
    ? (item.icongray || item.icon || 'https://placehold.co/64x64/232b35/8f98a0?text=?')
    : (item.icon || 'https://placehold.co/64x64/2a475e/ffffff?text=OK');

  const meta = (typeof ISAAC_OFFICIAL_SCHEMA !== 'undefined' && ISAAC_OFFICIAL_SCHEMA[item.id]) 
    ? ISAAC_OFFICIAL_SCHEMA[item.id] 
    : null;

  const guideText = currentLang === 'en'
    ? (item.note_en || (meta && meta.explication_en) || (typeof getAchievementGuide === 'function' ? getAchievementGuide(item.id, item.name, 'en') : '') || item.note || '')
    : (item.note || (meta && meta.explication) || (typeof getAchievementGuide === 'function' ? getAchievementGuide(item.id, item.name, 'fr') : '') || '');
  const hasGuide = Boolean(guideText && guideText.trim());

  // Condition de pliage par défaut :
  // Déplié uniquement pour les succès verrouillés disposant d'un guide.
  // Plié par défaut pour TOUS les succès déjà débloqués.
  const isAutoExpanded = isLocked && hasGuide;

  card.innerHTML = `
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <!-- Gauche : Icône et détails du succès -->
      <div class="flex items-start gap-4 flex-1 min-w-0">
        <!-- Boîte d'icône Steam -->
        <div class="w-16 h-16 flex-shrink-0 bg-[#0d1218] border border-[#3b4b5e]/40 rounded overflow-hidden flex items-center justify-center shadow-inner">
          <img src="${iconUrl}" alt="${item.name}" class="w-full h-full object-cover select-none" onerror="this.onerror=null;this.src='https://placehold.co/64x64/1d2531/8f98a0?text=?';">
        </div>

        <!-- Titre & Description officielle -->
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="text-base font-semibold text-[#ebebeb] tracking-wide">${item.name}</h3>
            ${isLocked 
              ? `<span class="badge-locked guide-badge">${t('badgeLocked')}</span>` 
              : `<span class="badge-unlocked guide-badge">${t('badgeUnlocked')}</span>`}
          </div>
          <p class="text-xs text-[#8f98a0] mt-0.5 leading-relaxed">${item.description || t('secretAchievement')}</p>
          ${percentText ? `<p class="text-[11px] text-[#626a75] mt-1">${percentText}</p>` : ''}
        </div>
      </div>

      <!-- Droite : Date et bouton d'action -->
      <div class="flex flex-row md:flex-col items-end justify-between md:justify-center flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#222d3d]">
        ${dateText 
          ? `<span class="text-xs text-[#8f98a0] font-normal tracking-tight">${dateText}</span>` 
          : `<span class="text-xs text-[#8f98a0] font-normal tracking-tight">${t('toUnlock')}</span>`}
        
        ${hasGuide ? `
        <div class="mt-2">
          <button onclick="toggleNoteEditor('${item.id}')" class="text-xs px-2.5 py-1 rounded bg-[#202936] hover:bg-[#2c394b] text-[#66c0f4] border border-[#2d3a4d] transition flex items-center gap-1.5" title="${isLocked ? t('guideTitleLocked') : t('guideTitleUnlocked')}">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>${isLocked ? t('guideBtn') : t('viewGuideBtn')}</span>
          </button>
        </div>
        ` : ''}
      </div>
    </div>

    <!-- Section Guide & Méthode de déblocage (Pliée par défaut pour les succès débloqués) -->
    ${hasGuide ? `
    <div id="note-section-${item.id}" class="${isAutoExpanded ? 'block' : 'hidden'} mt-3 pt-3 border-t border-[#232f3e]/80">
      <div class="guide-box ${isLocked ? '' : 'is-unlocked-card'} p-3 rounded">
        <div class="flex items-center gap-2 mb-1.5 pb-1 border-b border-white/5">
          <span class="text-xs font-semibold ${isLocked ? 'text-[#66c0f4]' : 'text-[#66e099]'} tracking-wide">
            ${isLocked ? t('guideHeadingLocked') : t('guideHeadingUnlocked')}
          </span>
        </div>
        
        <div class="text-xs text-[#dbe4ee] leading-relaxed py-0.5 px-0.5">
          ${guideText}
        </div>
      </div>
    </div>
    ` : ''}
  `;

  return card;
}

/**
 * En-tête de section (Succès débloqués vs verrouillés)
 */
function renderSectionHeader(container, title, count, extraClass = "") {
  const header = document.createElement('div');
  header.className = `text-xs font-bold text-[#8f98a0] uppercase tracking-wider mb-2 ${extraClass}`;
  header.innerHTML = `<span>${title}</span> <span class="text-[#556375] font-normal">(${count})</span>`;
  container.appendChild(header);
}

/**
 * Rendu de la liste complète selon filtres et recherche
 */
function renderAchievements() {
  const container = document.getElementById('achievementsContainer');
  const emptyState = document.getElementById('emptyState');
  if (!container) return;
  container.innerHTML = '';

  const q = searchQuery.toLowerCase().trim();
  const filtered = achievements.filter(item => {
    const matchesFilter =
      currentFilter === 'all' ? true :
      currentFilter === 'locked' ? item.achieved === 0 :
      currentFilter === 'unlocked' ? item.achieved === 1 : true;

    if (!matchesFilter) return false;

    if (!q) return true;
    const nameMatch = (item.name || '').toLowerCase().includes(q);
    const descMatch = (item.description || '').toLowerCase().includes(q);
    const noteMatch = (item.note || '').toLowerCase().includes(q);
    const noteEnMatch = (item.note_en || '').toLowerCase().includes(q);
    const meta = (typeof ISAAC_OFFICIAL_SCHEMA !== 'undefined' && ISAAC_OFFICIAL_SCHEMA[item.id]) 
      ? ISAAC_OFFICIAL_SCHEMA[item.id] 
      : null;
    const metaMatch = meta ? (
      (meta.explication && meta.explication.toLowerCase().includes(q)) ||
      (meta.explication_en && meta.explication_en.toLowerCase().includes(q))
    ) : false;
    return nameMatch || descMatch || noteMatch || noteEnMatch || metaMatch;
  });

  if (filtered.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  } else {
    if (emptyState) emptyState.classList.add('hidden');
  }

  // Vue scindée automatique si filtre général sans recherche
  const hasSections = (currentFilter === 'all' && !q);
  const unlockedList = filtered.filter(a => a.achieved === 1);
  const lockedList = filtered.filter(a => a.achieved === 0);

  if (hasSections) {
    if (lockedList.length > 0) {
      renderSectionHeader(container, t('sectionLockedHeader'), lockedList.length);
      lockedList.forEach(item => container.appendChild(createCardElement(item)));
    }
    if (unlockedList.length > 0) {
      renderSectionHeader(container, t('sectionUnlockedHeader'), unlockedList.length, "mt-8");
      unlockedList.forEach(item => container.appendChild(createCardElement(item)));
    }
  } else {
    filtered.forEach(item => container.appendChild(createCardElement(item)));
  }
}

/**
 * Ouvrir / Fermer le tiroir d'explication d'un succès
 */
window.toggleNoteEditor = function(id) {
  const section = document.getElementById(`note-section-${id}`);
  if (section) {
    section.classList.toggle('hidden');
  }
};

/**
 * Rafraîchir toute l'interface
 */
function renderAll() {
  updateStats();
  renderAchievements();
}

/**
 * Synchronisation avec l'API Steam
 */
async function syncSteamData() {
  const apiKey = document.getElementById('steamApiKeyInput').value.trim();
  const steamId = document.getElementById('steamIdInput').value.trim();
  const statusEl = document.getElementById('apiStatusMessage');
  const syncBtn = document.getElementById('syncSteamBtn');
  const spinner = document.getElementById('syncSpinner');
  const manualContainer = document.getElementById('manualPasteContainer');

  if (!apiKey || !steamId) {
    statusEl.className = "text-xs text-red-400 block py-1 text-center font-medium";
    statusEl.innerText = t('statusEnterBoth');
    return;
  }

  // Sauvegarde des identifiants
  localStorage.setItem(STORAGE_KEY_API, apiKey);
  localStorage.setItem(STORAGE_KEY_ID, steamId);

  statusEl.className = "text-xs text-[#66c0f4] block py-1 text-center";
  statusEl.innerText = t('statusAttempting');
  if (syncBtn) syncBtn.disabled = true;
  if (spinner) spinner.classList.remove('hidden');

  const appId = '250900'; // The Binding of Isaac: Rebirth
  const directSteamUrl = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${apiKey}&steamid=${steamId}`;

  // Relais proxy pour contourner la politique CORS du navigateur
  async function proxyFetch(targetUrl) {
    const proxies = [
      (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
      (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
      (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
    ];

    for (const proxyGen of proxies) {
      const proxiedUrl = proxyGen(targetUrl);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        const resp = await fetch(proxiedUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (resp.ok) {
          const text = await resp.text();
          try {
            return JSON.parse(text);
          } catch (parseErr) {}
        }
      } catch (e) {}
    }
    throw new Error("Relais CORS indisponibles.");
  }

  try {
    const playerData = await proxyFetch(directSteamUrl);

    if (!playerData.playerstats || !playerData.playerstats.achievements) {
      throw new Error("Profil privé ou clé invalide.");
    }

    applyPlayerAchievementsData(playerData.playerstats.achievements);
    showTrackerView();
    showToast(t('toastSyncSuccess', achievements.length));
  } catch (err) {
    // En cas d'échec CORS : ouverture de la page Steam API et apparition de l'encart sous le bouton
    window.open(directSteamUrl, '_blank');

    if (manualContainer) {
      manualContainer.classList.remove('hidden');
      const textarea = document.getElementById('manualJsonInput');
      if (textarea) textarea.focus();
    }

    statusEl.className = "text-xs text-amber-300 block py-1 text-center";
    statusEl.innerHTML = t('statusFallbackCors');
  } finally {
    if (syncBtn) syncBtn.disabled = false;
    if (spinner) spinner.classList.add('hidden');
  }
}

/**
 * Traitement et fusion des données joueur avec le schéma complet et les guides
 */
function applyPlayerAchievementsData(playerAchievements, schemaMap = new Map()) {
  const existingNotesMap = new Map();
  const existingNotesEnMap = new Map();
  achievements.forEach(a => {
    if (a.note) existingNotesMap.set(a.id, a.note);
    if (a.note_en) existingNotesEnMap.set(a.id, a.note_en);
  });

  achievements = playerAchievements.map(pa => {
    // Schéma local officiel (641 succès avec noms, icônes réelles Steam et descriptions)
    const localInfo = (typeof ISAAC_OFFICIAL_SCHEMA !== 'undefined' && ISAAC_OFFICIAL_SCHEMA[pa.apiname]) 
      ? ISAAC_OFFICIAL_SCHEMA[pa.apiname] 
      : null;

    const remoteSchema = schemaMap.get(pa.apiname) || {};

    const name = (localInfo && localInfo.name) 
      || remoteSchema.displayName 
      || `Succès #${pa.apiname}`;

    const description = (localInfo && localInfo.description) 
      || remoteSchema.description 
      || (pa.achieved === 1 ? (currentLang === 'en' ? 'Unlocked achievement' : 'Succès débloqué') : t('secretAchievement'));

    const icon = (localInfo && localInfo.icon) 
      || remoteSchema.icon 
      || (pa.achieved === 1 ? 'https://placehold.co/64x64/2a475e/ffffff?text=OK' : 'https://placehold.co/64x64/232b35/8f98a0?text=?');

    const icongray = (localInfo && localInfo.icongray) 
      || remoteSchema.icongray 
      || (localInfo && localInfo.icon)
      || icon;

    // Déterminer la note FR : 1. Note existante, 2. Explication du schéma, 3. Base locale de guide
    let note = existingNotesMap.get(pa.apiname) || '';
    if (!note && localInfo && localInfo.explication) {
      note = localInfo.explication;
    }
    if (!note && typeof getAchievementGuide === 'function') {
      note = getAchievementGuide(pa.apiname, name, 'fr');
    }

    // Déterminer la note EN : 1. Note EN existante, 2. Explication EN du schéma, 3. Base locale de guide EN
    let note_en = existingNotesEnMap.get(pa.apiname) || '';
    if (!note_en && localInfo && localInfo.explication_en) {
      note_en = localInfo.explication_en;
    }
    if (!note_en && typeof getAchievementGuide === 'function') {
      note_en = getAchievementGuide(pa.apiname, name, 'en');
    }

    return {
      id: pa.apiname,
      name: name,
      description: description,
      achieved: pa.achieved,
      unlockTime: pa.unlocktime || 0,
      globalPercent: null,
      icon: icon,
      icongray: icongray,
      note: note,
      note_en: note_en
    };
  });

  saveAchievementsToLocal();
  showTrackerView();
}

/**
 * Configuration de l'ensemble des écouteurs d'événements
 */
function setupEventListeners() {
  // Sélecteur de langue (FR / EN)
  const langFrBtn = document.getElementById('langFrBtn');
  const langEnBtn = document.getElementById('langEnBtn');
  if (langFrBtn) langFrBtn.addEventListener('click', () => setLanguage('fr'));
  if (langEnBtn) langEnBtn.addEventListener('click', () => setLanguage('en'));

  // Bascule Affichage Connexion / Paramètres Steam
  const toggleBtn = document.getElementById('toggleConfigBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const onboarding = document.getElementById('onboardingSection');
      if (onboarding) {
        onboarding.classList.toggle('hidden');
        if (!onboarding.classList.contains('hidden')) {
          onboarding.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // Lien direct Steam vers JSON brut
  const openLinkBtn = document.getElementById('openSteamDirectLinkBtn');
  if (openLinkBtn) {
    openLinkBtn.addEventListener('click', () => {
      const apiKey = document.getElementById('steamApiKeyInput').value.trim();
      const steamId = document.getElementById('steamIdInput').value.trim();
      if (!apiKey || !steamId) {
        alert(t('alertMissingCreds'));
        return;
      }
      const url = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=250900&key=${apiKey}&steamid=${steamId}`;
      window.open(url, '_blank');
    });
  }

  // Import JSON brut collé manuellement
  const processBtn = document.getElementById('processManualJsonBtn');
  if (processBtn) {
    processBtn.addEventListener('click', processManualJson);
  }

  // Auto-détection au collage dans le textarea
  const manualTextarea = document.getElementById('manualJsonInput');
  if (manualTextarea) {
    manualTextarea.addEventListener('input', () => {
      const val = manualTextarea.value.trim();
      if (val.startsWith('{') && val.includes('playerstats')) {
        processManualJson();
      }
    });
  }

  function processManualJson() {
    const raw = document.getElementById('manualJsonInput').value.trim();
    if (!raw) {
      showToast(t('toastPasteEmpty'));
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      if (parsed.playerstats && Array.isArray(parsed.playerstats.achievements)) {
        applyPlayerAchievementsData(parsed.playerstats.achievements);
        showToast(t('toastImportSuccess', parsed.playerstats.achievements.length));
        const manualContainer = document.getElementById('manualPasteContainer');
        if (manualContainer) manualContainer.classList.add('hidden');
      } else {
        showToast(t('toastInvalidSchema'));
      }
    } catch (err) {
      showToast(t('toastInvalidJson'));
    }
  }

  // Onglets de filtre
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderAchievements();
    });
  });

  // Recherche en direct
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderAchievements();
    });
  }

  // Bouton de synchronisation Steam
  const syncBtn = document.getElementById('syncSteamBtn');
  if (syncBtn) {
    syncBtn.addEventListener('click', syncSteamData);
  }

  // Bouton de restauration données de démonstration
  const demoBtn = document.getElementById('loadDemoBtn');
  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      achievements = [...ISAAC_DEMO_DATA];
      enrichAchievementsMetadata(achievements);
      saveAchievementsToLocal();
      showTrackerView();
      showToast(t('toastDemoLoaded'));
    });
  }

  // Export JSON
  const exportBtn = document.getElementById('exportNotesBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(achievements, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `isaac_achievements_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast(t('toastExported'));
    });
  }

  // Import JSON sauvegardé
  const importInput = document.getElementById('importFileInput');
  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (Array.isArray(imported)) {
            achievements = imported;
            enrichAchievementsMetadata(achievements);
            saveAchievementsToLocal();
            showTrackerView();
            showToast(t('toastImportSuccess', achievements.length));
          } else {
            showToast(t('toastInvalidSchema'));
          }
        } catch (err) {
          showToast(t('toastFileReadError'));
        }
      };
      reader.readAsText(file);
    });
  }
}

// Initialisation au chargement de la page
window.addEventListener('DOMContentLoaded', init);
