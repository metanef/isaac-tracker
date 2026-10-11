/**
 * Storage & Data Persistence Module
 * Manages browser localStorage caching and JSON import/export operations.
 */

const STORAGE_KEYS = {
  DATA: 'isaac_achievements_list_v1',
  API_KEY: 'steam_tracker_apikey',
  STEAM_ID: 'steam_tracker_steamid'
};

/**
 * Loads saved Steam credentials from localStorage.
 * @returns {{ steamId: string, apiKey: string }}
 */
function loadSavedCredentials() {
  return {
    steamId: localStorage.getItem(STORAGE_KEYS.STEAM_ID) || '',
    apiKey: localStorage.getItem(STORAGE_KEYS.API_KEY) || ''
  };
}

/**
 * Persists Steam credentials to localStorage.
 * @param {string} steamId - 17-digit SteamID64
 * @param {string} apiKey - 32-character Steam Web API Key
 */
function saveCredentials(steamId, apiKey) {
  if (steamId) localStorage.setItem(STORAGE_KEYS.STEAM_ID, steamId.trim());
  if (apiKey) localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey.trim());
}

/**
 * Loads cached achievements list from localStorage.
 * @returns {Array} List of achievement objects or empty array
 */
function loadSavedAchievements() {
  const raw = localStorage.getItem(STORAGE_KEYS.DATA);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to parse cached achievements:', err);
    return [];
  }
}

/**
 * Saves achievements list to localStorage.
 * @param {Array} achievements - List of achievement objects
 */
function saveAchievementsToStorage(achievements) {
  try {
    localStorage.setItem(STORAGE_KEYS.DATA, JSON.stringify(achievements));
  } catch (err) {
    console.error('Failed to save achievements to storage:', err);
  }
}

/**
 * Triggers a browser download of the achievements list formatted as a JSON file.
 * @param {Array} achievements - List of achievement objects
 */
function exportAchievementsToJson(achievements) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(achievements, null, 2));
  const downloadAnchor = document.createElement('a');
  const dateSuffix = new Date().toISOString().slice(0, 10);
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `isaac_achievements_${dateSuffix}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Parses raw JSON text (e.g. from clipboard or file import) and returns valid achievements array or null.
 * Accepts both Steam API raw structure ({ playerstats: { achievements: [...] } }) and exported array format.
 * @param {string} rawJson - Raw JSON string
 * @returns {{ type: 'steam'|'export', achievements: Array }|null}
 */
function parseAchievementsJson(rawJson) {
  if (!rawJson || typeof rawJson !== 'string') return null;
  const parsed = JSON.parse(rawJson.trim());

  // Format 1: Steam API raw response
  if (parsed.playerstats && Array.isArray(parsed.playerstats.achievements)) {
    return {
      type: 'steam',
      achievements: parsed.playerstats.achievements
    };
  }

  // Format 2: Exported tracker array
  if (Array.isArray(parsed)) {
    return {
      type: 'export',
      achievements: parsed
    };
  }

  return null;
}
