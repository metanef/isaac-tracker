/**
 * The Binding of Isaac - Steam Achievements Tracker
 * Core application controller: UI management, filtering, search, and data binding.
 */

// Global application state
let achievements = [];
let currentFilter = 'all';
let currentDlcFilter = 'all';
let currentCharacterFilter = 'all';
let searchQuery = '';

/**
 * Asynchronously loads the official schema from data/achievements.json if not already defined globally.
 * Seamlessly supports both web server / GitHub Pages deployment and static script embedding.
 * @returns {Promise<Object>} The official schema dictionary
 */
async function loadOfficialSchema() {
  if (typeof ISAAC_OFFICIAL_SCHEMA !== 'undefined' && Object.keys(ISAAC_OFFICIAL_SCHEMA).length > 0) {
    return ISAAC_OFFICIAL_SCHEMA;
  }
  try {
    const res = await fetch('data/achievements.json');
    if (res.ok) {
      const data = await res.json();
      window.ISAAC_OFFICIAL_SCHEMA = data;
      return data;
    }
  } catch (err) {
    console.warn('Could not load data/achievements.json via fetch:', err);
  }
  return {};
}

/**
 * Asynchronously loads the demo achievements dataset from data/demo.json.
 * Includes embedded resilient fallback so demo works seamlessly offline and on file:// protocol.
 * @returns {Promise<Array>} List of demo achievement objects
 */
async function loadDemoAchievements() {
  try {
    const res = await fetch('data/demo.json');
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Could not fetch data/demo.json, using embedded fallback:', err);
  }
  return [
    {
      "id": "1",
      "name": "Magdalene",
      "description": "Unlocked a new character.",
      "achieved": 1,
      "unlockTime": 1782723060,
      "globalPercent": 88.5,
      "icon": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/a36d7e92df7e991758907a75dfa55d36b52548c4.jpg",
      "icongray": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/fc5c40f3429120652211c9e95570752ba5810f22.jpg",
      "note": "Avoir au moins 7 conteneurs de cœurs rouges en même temps dans une même partie.",
      "note_en": "Have 7 or more Red Heart Containers at one time in a single run.",
      "dlc": "rebirth",
      "character": null
    },
    {
      "id": "2",
      "name": "Cain",
      "description": "Unlocked a new character.",
      "achieved": 1,
      "unlockTime": 1782672180,
      "globalPercent": 82.1,
      "icon": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/33658122e504ae8670bbb70686468e1276902cc4.jpg",
      "icongray": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/fc5c40f3429120652211c9e95570752ba5810f22.jpg",
      "note": "Posséder au moins 55 pièces de monnaie en même temps dans une même partie.",
      "note_en": "Hold 55 Coins at one time in a single run.",
      "dlc": "rebirth",
      "character": null
    },
    {
      "id": "3",
      "name": "Judas",
      "description": "Unlocked a new character.",
      "achieved": 1,
      "unlockTime": 1782672000,
      "globalPercent": 76.4,
      "icon": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/8196f7a0a6ed79c2fbeffa58f17c9508eec99d12.jpg",
      "icongray": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/fc5c40f3429120652211c9e95570752ba5810f22.jpg",
      "note": "Vaincre Satan au Sheol pour la première fois.",
      "note_en": "Defeat Satan in Sheol for the first time.",
      "dlc": "rebirth",
      "character": null
    },
    {
      "id": "19",
      "name": "A Bandage",
      "description": "Unlocked a new item.",
      "achieved": 0,
      "unlockTime": 0,
      "globalPercent": 32.7,
      "icon": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/69a73f5ec50e7f6f39a19b0bb9b6a9ab3347783e.jpg",
      "icongray": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/fc5c40f3429120652211c9e95570752ba5810f22.jpg",
      "note": "Fabriquer une 'Super Bandage Girl' complète en ramassant 4 Ball of Bandages en une seule partie.",
      "note_en": "Make a Super Bandage Girl by collecting 4 Ball of Bandages in a single run.",
      "dlc": "rebirth",
      "character": null
    },
    {
      "id": "21",
      "name": "A Bag of Pennies",
      "description": "Unlocked a new item.",
      "achieved": 0,
      "unlockTime": 0,
      "globalPercent": 41.2,
      "icon": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/3bfaae865fdf77e3e8c965f583bb16468b2a6db7.jpg",
      "icongray": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/fc5c40f3429120652211c9e95570752ba5810f22.jpg",
      "note": "Vaincre Isaac dans la Cathédrale avec Cain.",
      "note_en": "Defeat Isaac in the Cathedral as Cain.",
      "dlc": "rebirth",
      "character": "Cain"
    },
    {
      "id": "38",
      "name": "Spelunker Boy",
      "description": "Beat caves without taking damage.",
      "achieved": 0,
      "unlockTime": 0,
      "globalPercent": 24.8,
      "icon": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/042cfd6dd69abee2934864f940b57d372e7441e1.jpg",
      "icongray": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/fc5c40f3429120652211c9e95570752ba5810f22.jpg",
      "note": "Compléter Caves sans subir de dégâts.",
      "note_en": "Beat Caves without taking damage.",
      "dlc": "rebirth",
      "character": null
    },
    {
      "id": "156",
      "name": "Godhead",
      "description": "Unlocked a new item.",
      "achieved": 0,
      "unlockTime": 0,
      "globalPercent": 12.9,
      "icon": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/6b7385966601ea3bead2a991823136274e7fc53b.jpg",
      "icongray": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/52c6f376cf20689b9156a6559bc85511e649a3c0.jpg",
      "note": "Compléter toutes les marques de complétion en mode Hard avec The Lost.",
      "note_en": "Earn all Hard mode Completion Marks as The Lost.",
      "dlc": "rebirth",
      "character": "The Lost"
    },
    {
      "id": "636",
      "name": "Death Certificate",
      "description": "Unlocked a new item.",
      "achieved": 0,
      "unlockTime": 0,
      "globalPercent": 4.1,
      "icon": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/ef3410f92501cf40b3c58e578ad456bf2481082c.jpg",
      "icongray": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/d77b830d17d58a5c4cfc673199bc489cbe341257.jpg",
      "note": "Obtenir TOUTES les marques de complétion en Hard sur l'ensemble des 34 personnages.",
      "note_en": "Earn all Hard mode Completion Marks for all 34 characters (normal and tainted).",
      "dlc": "repentance",
      "character": null
    }
  ];
}

/**
 * Loads and displays the demo achievements dataset.
 */
async function triggerLoadDemoData() {
  achievements = await loadDemoAchievements();
  enrichAchievementsMetadata(achievements);
  saveAchievementsToStorage(achievements);
  showTrackerView();
  showToast(t('toastDemoLoaded'));
}

/**
 * Initializes the application on DOM ready.
 */
async function init() {
  // Initialize language system (defaults to browser preference or stored choice)
  initLanguage();

  // Load official schema asynchronously if not already in memory
  await loadOfficialSchema();

  // Populate input fields with saved Steam credentials
  const creds = loadSavedCredentials();
  const apiKeyEl = document.getElementById('steamApiKeyInput');
  const steamIdEl = document.getElementById('steamIdInput');
  if (apiKeyEl && creds.apiKey) apiKeyEl.value = creds.apiKey;
  if (steamIdEl && creds.steamId) steamIdEl.value = creds.steamId;

  // Load cached achievements from storage
  achievements = loadSavedAchievements();

  // Attach DOM event listeners
  setupEventListeners();

  // Display tracker if data exists or demo param is requested; otherwise display onboarding setup
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('demo') === 'true') {
    await triggerLoadDemoData();
  } else if (achievements.length > 0) {
    enrichAchievementsMetadata(achievements);
    saveAchievementsToStorage(achievements);
    showTrackerView();
  } else {
    showOnboardingView();
  }
}

/**
 * Displays the main achievements tracker dashboard view.
 */
function showTrackerView() {
  const onboarding = document.getElementById('onboardingSection');
  const dashboard = document.getElementById('trackerDashboardSection');
  if (onboarding) onboarding.classList.add('hidden');
  if (dashboard) dashboard.classList.remove('hidden');
  closeSteamSettingsModal();
  renderAll();
}

/**
 * Displays the onboarding / connection setup view.
 */
function showOnboardingView() {
  const onboarding = document.getElementById('onboardingSection');
  const dashboard = document.getElementById('trackerDashboardSection');
  if (onboarding) onboarding.classList.remove('hidden');
  if (dashboard) dashboard.classList.add('hidden');
}

/**
 * Opens the Steam settings modal pop up.
 */
function openSteamSettingsModal() {
  const modal = document.getElementById('steamSettingsModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');

  const steamIdInput = document.getElementById('steamIdInput');
  if (steamIdInput) {
    setTimeout(() => steamIdInput.focus(), 50);
  }
}

/**
 * Closes the Steam settings modal pop up.
 */
function closeSteamSettingsModal() {
  const modal = document.getElementById('steamSettingsModal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}

/**
 * Enriches raw achievement objects with official metadata (names, real icons, and bilingual guides).
 * @param {Array} list - List of achievement objects
 */
function enrichAchievementsMetadata(list) {
  if (!Array.isArray(list)) return;

  list.forEach(item => {
    const meta = (typeof ISAAC_OFFICIAL_SCHEMA !== 'undefined' && ISAAC_OFFICIAL_SCHEMA[item.id])
      ? ISAAC_OFFICIAL_SCHEMA[item.id]
      : null;

    if (meta) {
      // Fix missing, generic, or purely numerical achievement names
      if (!item.name || item.name === item.id || /^\d+$/.test(item.name)) {
        item.name = meta.name;
      }
      // Replace placeholder icons with authentic Steam icons
      if (!item.icon || item.icon.includes('placehold.co') || item.icon === '') {
        item.icon = meta.icon;
      }
      if (!item.icongray || item.icongray.includes('placehold.co') || item.icongray === '') {
        item.icongray = meta.icongray || meta.icon;
      }
      // Replace generic placeholder descriptions
      if (!item.description || item.description === 'Succès verrouillé' || item.description === 'Succès secret' || item.description === 'Locked achievement') {
        if (meta.description) item.description = meta.description;
      }
      // Assign DLC version
      if (meta.dlc) {
        item.dlc = meta.dlc;
      }
      // Assign Character requirement
      if (meta.character !== undefined) {
        item.character = meta.character;
      }
      // Assign French unlock explanation
      if (!item.note || item.note.trim() === '' || item.note === 'Succès secret.' || item.note === 'Succès verrouillé') {
        if (meta.explication) item.note = meta.explication;
      }
      // Assign English unlock explanation
      if (!item.note_en || item.note_en.trim() === '' || item.note_en === 'Secret achievement.' || item.note_en === 'Locked achievement.') {
        if (meta.explication_en) item.note_en = meta.explication_en;
      }
    }

    // Secondary guide lookup if note is still missing
    if (!item.note || item.note.trim() === '') {
      const guideFr = typeof getAchievementGuide === 'function' ? getAchievementGuide(item.id, item.name, 'fr') : '';
      if (guideFr) item.note = guideFr;
    }
    if (!item.note_en || item.note_en.trim() === '') {
      const guideEn = typeof getAchievementGuide === 'function' ? getAchievementGuide(item.id, item.name, 'en') : '';
      if (guideEn) item.note_en = guideEn;
    }
  });
}

/**
 * Retrieves unlock guide text for an achievement by ID or display name.
 * @param {string} id - Steam API achievement identifier (e.g., "1", "156")
 * @param {string} [name] - Achievement display name
 * @param {string} [lang='fr'] - Target language ('fr' or 'en')
 * @returns {string} Unlock guide text or empty string
 */
function getAchievementGuide(id, name, lang = 'fr') {
  const schema = (typeof ISAAC_OFFICIAL_SCHEMA !== 'undefined')
    ? ISAAC_OFFICIAL_SCHEMA
    : (typeof window !== 'undefined' ? window.ISAAC_OFFICIAL_SCHEMA : null);
  if (!schema) return '';
  let entry = id && schema[id];
  if (!entry && name) {
    const trimmed = name.trim().toLowerCase();
    for (const key in schema) {
      if (schema[key].name && schema[key].name.toLowerCase() === trimmed) {
        entry = schema[key];
        break;
      }
    }
  }
  if (!entry) return '';
  return lang === 'en'
    ? (entry.explication_en || entry.explication || '')
    : (entry.explication || entry.explication_en || '');
}

/**
 * Displays a toast notification with the given message.
 * @param {string} message - Notification text
 */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const text = document.getElementById('toastMsg');
  if (!toast || !text) return;

  text.innerText = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 2500);
}

/**
 * Formats a raw DLC identifier into a display-friendly label.
 * @param {string} dlc - DLC identifier
 * @returns {string} Formatted label
 */
function formatDlcLabel(dlc) {
  if (!dlc) return '';
  switch (dlc.toLowerCase()) {
    case 'rebirth': return 'Rebirth';
    case 'afterbirth': return 'Afterbirth';
    case 'afterbirth+': return 'Afterbirth+';
    case 'repentance': return 'Repentance';
    case 'repentance+': return 'Repentance+';
    default: return dlc;
  }
}

/**
 * Filters a list of achievements by active DLC and Character filters.
 * @param {Array} list - Achievements list
 * @returns {Array} Filtered list
 */
function getFilteredByMeta(list) {
  if (!Array.isArray(list)) return [];
  return list.filter(item => {
    if (currentDlcFilter !== 'all') {
      if ((item.dlc || '').toLowerCase() !== currentDlcFilter.toLowerCase()) {
        return false;
      }
    }
    if (currentCharacterFilter !== 'all') {
      if (currentCharacterFilter === 'none') {
        if (item.character !== null && item.character !== undefined) return false;
      } else {
        if (item.character !== currentCharacterFilter) return false;
      }
    }
    return true;
  });
}

/**
 * Updates dashboard progress counters and progress bar.
 */
function updateStats() {
  const scopedList = getFilteredByMeta(achievements);
  const total = scopedList.length;
  const unlocked = scopedList.filter(a => a.achieved === 1).length;
  const locked = total - unlocked;
  const percent = total > 0 ? Math.round((unlocked / total) * 100) : 0;

  const statPercent = document.getElementById('statPercent');
  const progressBar = document.getElementById('steamProgressBar');
  const unlockedCount = document.getElementById('statUnlockedCount');
  const lockedCount = document.getElementById('statLockedCount');
  const detailText = document.getElementById('statsDetailText');

  if (statPercent) statPercent.innerText = `${percent}%`;
  if (progressBar) progressBar.style.width = `${percent}%`;
  if (unlockedCount) unlockedCount.innerText = unlocked;
  if (lockedCount) lockedCount.innerText = locked;
  if (detailText) detailText.innerText = t('statsDetail', unlocked, total, percent);

  const countAll = document.getElementById('countAll');
  const countLocked = document.getElementById('countLocked');
  const countUnlocked = document.getElementById('countUnlocked');
  if (countAll) countAll.innerText = total;
  if (countLocked) countLocked.innerText = locked;
  if (countUnlocked) countUnlocked.innerText = unlocked;
}

/**
 * Constructs a compact achievement card DOM element.
 * Collapsed by default for all achievements, opens on entire card click.
 * @param {Object} item - Achievement data object
 * @returns {HTMLElement} Card DOM element
 */
function createCardElement(item) {
  const card = document.createElement('div');
  const isLocked = item.achieved === 0;

  const dateText = item.achieved === 1 ? formatSteamDate(item.unlockTime) : '';
  const percentText = item.globalPercent ? t('playerPercent', item.globalPercent) : '';
  const dlcBadge = item.dlc ? `<span class="badge-dlc">${formatDlcLabel(item.dlc)}</span>` : '';
  const charBadge = item.character ? `<span class="badge-character">${item.character}</span>` : '';

  // Icon resolution with fallback to gray icon or placeholder
  const iconUrl = isLocked
    ? (item.icongray || item.icon || 'https://placehold.co/64x64/232b35/8f98a0?text=?')
    : (item.icon || 'https://placehold.co/64x64/2a475e/ffffff?text=OK');

  // Localized guide text resolution
  const meta = (typeof ISAAC_OFFICIAL_SCHEMA !== 'undefined' && ISAAC_OFFICIAL_SCHEMA[item.id])
    ? ISAAC_OFFICIAL_SCHEMA[item.id]
    : null;

  const guideText = currentLang === 'en'
    ? (item.note_en || (meta && meta.explication_en) || (typeof getAchievementGuide === 'function' ? getAchievementGuide(item.id, item.name, 'en') : '') || item.note || '')
    : (item.note || (meta && meta.explication) || (typeof getAchievementGuide === 'function' ? getAchievementGuide(item.id, item.name, 'fr') : '') || '');

  const hasGuide = Boolean(guideText && guideText.trim());

  // Configure card attributes and interactive click behavior
  card.className = `steam-card rounded p-2.5 relative group ${isLocked ? 'is-locked' : 'is-unlocked'} ${hasGuide ? 'cursor-pointer select-none' : ''}`;
  card.id = `card-${item.id}`;

  if (hasGuide) {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-expanded', 'false');
    card.addEventListener('click', () => toggleNoteEditor(item.id));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleNoteEditor(item.id);
      }
    });
  }

  card.innerHTML = `
    <div class="flex items-center justify-between gap-3">
      <!-- Left: Compact 44px Icon and Achievement Details -->
      <div class="flex items-center gap-3 flex-1 min-w-0">
        <div class="w-11 h-11 flex-shrink-0 bg-[#0d1218] border border-[#3b4b5e]/40 rounded overflow-hidden flex items-center justify-center shadow-inner">
          <img src="${iconUrl}" alt="${item.name}" class="w-full h-full object-cover select-none" onerror="this.onerror=null;this.src='https://placehold.co/64x64/1d2531/8f98a0?text=?';">
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-1.5 flex-wrap">
            <h3 class="text-sm font-semibold text-[#ebebeb] tracking-wide truncate max-w-[260px] sm:max-w-none">${item.name}</h3>
            ${isLocked
              ? `<span class="badge-locked guide-badge">${t('badgeLocked')}</span>`
              : `<span class="badge-unlocked guide-badge">${t('badgeUnlocked')}</span>`}
            ${dlcBadge}
            ${charBadge}
            ${percentText ? `<span class="text-[10px] text-[#626a75] hidden sm:inline">• ${percentText}</span>` : ''}
          </div>
          <p class="text-xs text-[#8f98a0] mt-0.5 leading-snug line-clamp-1 sm:line-clamp-none">${item.description || t('secretAchievement')}</p>
          <div class="flex items-center gap-2 mt-0.5 text-[11px] text-[#626a75] sm:hidden">
            <span>${dateText || t('toUnlock')}</span>
            ${percentText ? `<span>• ${percentText}</span>` : ''}
          </div>
        </div>
      </div>

      <!-- Right: Date and Expand Indicator -->
      <div class="flex items-center gap-2 flex-shrink-0">
        <span class="text-xs text-[#8f98a0] font-normal tracking-tight hidden sm:inline">
          ${dateText || t('toUnlock')}
        </span>

        ${hasGuide ? `
        <svg id="chevron-${item.id}" class="w-4 h-4 text-[#556375] group-hover:text-[#66c0f4] transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
        ` : ''}
      </div>
    </div>

    <!-- Compact Unlock Method Box (collapsed by default for all achievements) -->
    ${hasGuide ? `
    <div id="note-section-${item.id}" class="hidden mt-2 pt-2 border-t border-[#232f3e]/60" onclick="event.stopPropagation()">
      <div class="guide-box ${isLocked ? '' : 'is-unlocked-card'} px-2.5 py-1.5 rounded flex items-baseline gap-2">
        <span class="text-[11px] font-bold ${isLocked ? 'text-[#66c0f4]' : 'text-[#66e099]'} uppercase tracking-wider flex-shrink-0 select-none">
          ${isLocked ? t('guideHeadingLocked') : t('guideHeadingUnlocked')}:
        </span>
        <p class="text-xs text-[#dbe4ee] leading-relaxed select-text flex-1">
          ${guideText}
        </p>
      </div>
    </div>
    ` : ''}
  `;

  return card;
}

/**
 * Renders a group section header (e.g. Locked vs Unlocked achievements).
 */
function renderSectionHeader(container, title, count, extraClass = '') {
  const header = document.createElement('div');
  header.className = `text-xs font-bold text-[#8f98a0] uppercase tracking-wider mb-2 ${extraClass}`;
  header.innerHTML = `<span>${title}</span> <span class="text-[#556375] font-normal">(${count})</span>`;
  container.appendChild(header);
}

/**
 * Renders the filtered and searched achievements list.
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

    // DLC version filter
    if (currentDlcFilter !== 'all') {
      if ((item.dlc || '').toLowerCase() !== currentDlcFilter.toLowerCase()) {
        return false;
      }
    }

    // Character requirement filter
    if (currentCharacterFilter !== 'all') {
      if (currentCharacterFilter === 'none') {
        if (item.character !== null && item.character !== undefined) return false;
      } else {
        if (item.character !== currentCharacterFilter) return false;
      }
    }

    if (!q) return true;

    const nameMatch = (item.name || '').toLowerCase().includes(q);
    const descMatch = (item.description || '').toLowerCase().includes(q);
    const noteMatch = (item.note || '').toLowerCase().includes(q);
    const noteEnMatch = (item.note_en || '').toLowerCase().includes(q);
    const charMatch = (item.character || '').toLowerCase().includes(q);
    const dlcMatch = (item.dlc || '').toLowerCase().includes(q);

    const meta = (typeof ISAAC_OFFICIAL_SCHEMA !== 'undefined' && ISAAC_OFFICIAL_SCHEMA[item.id])
      ? ISAAC_OFFICIAL_SCHEMA[item.id]
      : null;
    const metaMatch = meta ? (
      (meta.explication && meta.explication.toLowerCase().includes(q)) ||
      (meta.explication_en && meta.explication_en.toLowerCase().includes(q)) ||
      (meta.character && meta.character.toLowerCase().includes(q)) ||
      (meta.dlc && meta.dlc.toLowerCase().includes(q))
    ) : false;

    return nameMatch || descMatch || noteMatch || noteEnMatch || charMatch || dlcMatch || metaMatch;
  });

  if (filtered.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  } else {
    if (emptyState) emptyState.classList.add('hidden');
  }

  // Automatic split into Locked and Unlocked sections when "All" tab is active without search query
  const hasSections = (currentFilter === 'all' && !q);
  const unlockedList = filtered.filter(a => a.achieved === 1);
  const lockedList = filtered.filter(a => a.achieved === 0);

  if (hasSections) {
    if (lockedList.length > 0) {
      renderSectionHeader(container, t('sectionLockedHeader'), lockedList.length);
      lockedList.forEach(item => container.appendChild(createCardElement(item)));
    }
    if (unlockedList.length > 0) {
      renderSectionHeader(container, t('sectionUnlockedHeader'), unlockedList.length, 'mt-8');
      unlockedList.forEach(item => container.appendChild(createCardElement(item)));
    }
  } else {
    filtered.forEach(item => container.appendChild(createCardElement(item)));
  }
}

/**
 * Toggles the visibility of an achievement guide drawer.
 * @param {string} id - Achievement ID
 */
window.toggleNoteEditor = function(id) {
  const section = document.getElementById(`note-section-${id}`);
  const card = document.getElementById(`card-${id}`);
  const chevron = document.getElementById(`chevron-${id}`);
  if (section) {
    const isNowHidden = section.classList.toggle('hidden');
    if (card) {
      card.setAttribute('aria-expanded', isNowHidden ? 'false' : 'true');
    }
    if (chevron) {
      chevron.classList.toggle('rotate-180', !isNowHidden);
    }
  }
};

/**
 * Re-renders the entire UI (stats and cards).
 */
function renderAll() {
  updateStats();
  renderAchievements();
}

/**
 * Merges raw player achievements with the official schema and saves to storage.
 * @param {Array} playerAchievements - Achievements returned by Steam API
 */
function applyPlayerAchievementsData(playerAchievements) {
  const existingNotesMap = new Map();
  const existingNotesEnMap = new Map();
  achievements.forEach(a => {
    if (a.note) existingNotesMap.set(a.id, a.note);
    if (a.note_en) existingNotesEnMap.set(a.id, a.note_en);
  });

  achievements = playerAchievements.map(pa => {
    const localInfo = (typeof ISAAC_OFFICIAL_SCHEMA !== 'undefined' && ISAAC_OFFICIAL_SCHEMA[pa.apiname])
      ? ISAAC_OFFICIAL_SCHEMA[pa.apiname]
      : null;

    const name = (localInfo && localInfo.name) || `Achievement #${pa.apiname}`;
    const description = (localInfo && localInfo.description)
      || (pa.achieved === 1 ? (currentLang === 'en' ? 'Unlocked achievement' : 'Succès débloqué') : t('secretAchievement'));

    const icon = (localInfo && localInfo.icon)
      || (pa.achieved === 1 ? 'https://placehold.co/64x64/2a475e/ffffff?text=OK' : 'https://placehold.co/64x64/232b35/8f98a0?text=?');
    const icongray = (localInfo && localInfo.icongray) || icon;

    // French note lookup
    let note = existingNotesMap.get(pa.apiname) || '';
    if (!note && localInfo && localInfo.explication) {
      note = localInfo.explication;
    }
    if (!note && typeof getAchievementGuide === 'function') {
      note = getAchievementGuide(pa.apiname, name, 'fr');
    }

    // English note lookup
    let note_en = existingNotesEnMap.get(pa.apiname) || '';
    if (!note_en && localInfo && localInfo.explication_en) {
      note_en = localInfo.explication_en;
    }
    if (!note_en && typeof getAchievementGuide === 'function') {
      note_en = getAchievementGuide(pa.apiname, name, 'en');
    }

    const dlc = (localInfo && localInfo.dlc) || null;
    const character = (localInfo && localInfo.character !== undefined) ? localInfo.character : null;

    return {
      id: pa.apiname,
      name: name,
      description: description,
      achieved: pa.achieved,
      unlockTime: pa.unlocktime || 0,
      globalPercent: null,
      icon: icon,
      icongray: icongray,
      dlc: dlc,
      character: character,
      note: note,
      note_en: note_en
    };
  });

  saveAchievementsToStorage(achievements);
  showTrackerView();
}

/**
 * Handles fetching achievements from Steam API with fallback to manual copy-paste.
 */
async function syncSteamData() {
  const apiKey = document.getElementById('steamApiKeyInput').value.trim();
  const steamId = document.getElementById('steamIdInput').value.trim();
  const statusEl = document.getElementById('apiStatusMessage');
  const syncBtn = document.getElementById('syncSteamBtn');
  const spinner = document.getElementById('syncSpinner');
  const manualContainer = document.getElementById('manualPasteContainer');
  const textarea = document.getElementById('manualJsonInput');
  const openLinkBtn = document.getElementById('openSteamDirectLinkBtn');

  if (!apiKey || !steamId) {
    if (statusEl) {
      statusEl.className = 'text-xs text-rose-400 block py-1 text-center';
      statusEl.innerText = t('statusEnterBoth');
      statusEl.classList.remove('hidden');
    }
    return;
  }

  saveCredentials(steamId, apiKey);

  const directSteamUrl = buildSteamApiUrl(apiKey, steamId);

  // Set URL on direct link button immediately
  if (openLinkBtn) {
    openLinkBtn.href = directSteamUrl;
  }

  // Open Steam tab synchronously during user click to bypass browser popup blockers
  let steamWindow = null;
  try {
    steamWindow = window.open(directSteamUrl, '_blank');
  } catch (e) {
    console.warn('Popup blocked by browser:', e);
  }

  const wasBlocked = !steamWindow || steamWindow.closed || typeof steamWindow.closed === 'undefined';

  // Reveal paste container immediately so user is ready
  if (manualContainer) {
    manualContainer.classList.remove('hidden');
    if (textarea) {
      setTimeout(() => textarea.focus(), 150);
    }
  }

  if (statusEl) {
    statusEl.classList.remove('hidden');
    if (wasBlocked) {
      statusEl.className = 'text-xs text-amber-300 block py-1 text-center';
      statusEl.innerHTML = t('statusPopupBlocked');
    } else {
      statusEl.className = 'text-xs text-[#66c0f4] block py-1 text-center';
      statusEl.innerHTML = t('statusFallbackCors');
    }
  }

  if (syncBtn) syncBtn.disabled = true;
  if (spinner) spinner.classList.remove('hidden');

  try {
    // Attempt fast background proxy fetch
    const rawAchievements = await fetchSteamAchievements(apiKey, steamId);
    if (rawAchievements && rawAchievements.length > 0) {
      applyPlayerAchievementsData(rawAchievements);
      if (steamWindow && !steamWindow.closed) {
        try { steamWindow.close(); } catch (e) {}
      }
      showToast(t('toastSyncSuccess', achievements.length));
    }
  } catch (err) {
    // Expected when CORS proxies are unavailable; Steam tab is already open for copy-pasting
    if (statusEl && wasBlocked) {
      statusEl.innerHTML = t('statusPopupBlocked');
    }
  } finally {
    if (syncBtn) syncBtn.disabled = false;
    if (spinner) spinner.classList.add('hidden');
  }
}

/**
 * Validates and imports raw JSON pasted by the user.
 */
function processManualJson() {
  const manualInput = document.getElementById('manualJsonInput');
  if (!manualInput) return;
  const raw = manualInput.value.trim();
  if (!raw) {
    showToast(t('toastPasteEmpty'));
    return;
  }

  try {
    const parsedData = parseAchievementsJson(raw);
    if (!parsedData) {
      showToast(t('toastInvalidSchema'));
      return;
    }

    if (parsedData.type === 'steam') {
      applyPlayerAchievementsData(parsedData.achievements);
    } else {
      achievements = parsedData.achievements;
      enrichAchievementsMetadata(achievements);
      saveAchievementsToStorage(achievements);
      showTrackerView();
    }

    showToast(t('toastImportSuccess', achievements.length));
    const manualContainer = document.getElementById('manualPasteContainer');
    if (manualContainer) manualContainer.classList.add('hidden');
  } catch (err) {
    showToast(t('toastInvalidJson'));
  }
}

/**
 * Registers all UI event listeners.
 */
function setupEventListeners() {
  // Language toggles
  const langFrBtn = document.getElementById('langFrBtn');
  const langEnBtn = document.getElementById('langEnBtn');
  if (langFrBtn) langFrBtn.addEventListener('click', () => setLanguage('fr', renderAll));
  if (langEnBtn) langEnBtn.addEventListener('click', () => setLanguage('en', renderAll));

  // Open Steam settings modal via header button
  const toggleBtn = document.getElementById('toggleConfigBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', openSteamSettingsModal);
  }

  // Open Steam settings modal via welcome screen button
  const welcomeConnectBtn = document.getElementById('welcomeConnectBtn');
  if (welcomeConnectBtn) {
    welcomeConnectBtn.addEventListener('click', openSteamSettingsModal);
  }

  // Close modal via close button
  const closeBtn = document.getElementById('closeSettingsModalBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSteamSettingsModal);
  }

  // Close modal on backdrop click
  const settingsModal = document.getElementById('steamSettingsModal');
  if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) {
        closeSteamSettingsModal();
      }
    });
  }

  // Close modal on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('steamSettingsModal');
      if (modal && !modal.classList.contains('hidden')) {
        closeSteamSettingsModal();
      }
    }
  });

  // Welcome demo button
  const welcomeDemoBtn = document.getElementById('welcomeDemoBtn');
  if (welcomeDemoBtn) {
    welcomeDemoBtn.addEventListener('click', triggerLoadDemoData);
  }

  // Open direct Steam API link
  const openLinkBtn = document.getElementById('openSteamDirectLinkBtn');
  if (openLinkBtn) {
    openLinkBtn.addEventListener('click', () => {
      const apiKey = document.getElementById('steamApiKeyInput').value.trim();
      const steamId = document.getElementById('steamIdInput').value.trim();
      if (!apiKey || !steamId) {
        alert(t('alertMissingCreds'));
        return;
      }
      window.open(buildSteamApiUrl(apiKey, steamId), '_blank');
    });
  }

  // Process manual JSON button
  const processBtn = document.getElementById('processManualJsonBtn');
  if (processBtn) {
    processBtn.addEventListener('click', processManualJson);
  }

  // Auto-detect JSON pasted into the textarea
  const manualTextarea = document.getElementById('manualJsonInput');
  if (manualTextarea) {
    manualTextarea.addEventListener('input', () => {
      const val = manualTextarea.value.trim();
      if (val.startsWith('{') && val.includes('playerstats')) {
        processManualJson();
      }
    });
  }

  // Filter tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderAchievements();
    });
  });

  // Live search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderAchievements();
    });
  }

  // DLC version filter
  const dlcFilterSelect = document.getElementById('dlcFilterSelect');
  if (dlcFilterSelect) {
    dlcFilterSelect.addEventListener('change', (e) => {
      currentDlcFilter = e.target.value;
      updateStats();
      renderAchievements();
    });
  }

  // Character requirement filter
  const characterFilterSelect = document.getElementById('characterFilterSelect');
  if (characterFilterSelect) {
    characterFilterSelect.addEventListener('change', (e) => {
      currentCharacterFilter = e.target.value;
      updateStats();
      renderAchievements();
    });
  }

  // Steam API sync button
  const syncBtn = document.getElementById('syncSteamBtn');
  if (syncBtn) {
    syncBtn.addEventListener('click', syncSteamData);
  }

  // Load demo data button
  const demoBtn = document.getElementById('loadDemoBtn');
  if (demoBtn) {
    demoBtn.addEventListener('click', triggerLoadDemoData);
  }

  // Export JSON button
  const exportBtn = document.getElementById('exportNotesBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      exportAchievementsToJson(achievements);
      showToast(t('toastExported'));
    });
  }

  // Import JSON file input
  const importInput = document.getElementById('importFileInput');
  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsedData = parseAchievementsJson(event.target.result);
          if (!parsedData) {
            showToast(t('toastInvalidSchema'));
            return;
          }
          if (parsedData.type === 'steam') {
            applyPlayerAchievementsData(parsedData.achievements);
          } else {
            achievements = parsedData.achievements;
            enrichAchievementsMetadata(achievements);
            saveAchievementsToStorage(achievements);
            showTrackerView();
          }
          showToast(t('toastImportSuccess', achievements.length));
        } catch (err) {
          showToast(t('toastFileReadError'));
        }
      };
      reader.readAsText(file);
    });
  }
}

// Bootstrap on DOM ready
window.addEventListener('DOMContentLoaded', init);
