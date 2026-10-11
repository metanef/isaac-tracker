/**
 * Steam Web API Client Module
 * Manages Steam API request generation and resilient CORS proxy relays.
 */

const STEAM_APP_ID = '250900';

/**
 * Builds the official Steam Web API endpoint URL for player achievements.
 * @param {string} apiKey - Steam Web API Key
 * @param {string} steamId - 17-digit SteamID64
 * @returns {string} Fully qualified Steam API URL
 */
function buildSteamApiUrl(apiKey, steamId) {
  return `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${STEAM_APP_ID}&key=${encodeURIComponent(apiKey)}&steamid=${encodeURIComponent(steamId)}`;
}

/**
 * Attempts to fetch player achievements through various public CORS proxy relays.
 * Throws an error if all relays fail or time out (requiring manual browser fallback).
 * @param {string} apiKey - Steam Web API Key
 * @param {string} steamId - 17-digit SteamID64
 * @returns {Promise<Array>} List of raw Steam achievements
 */
async function fetchSteamAchievements(apiKey, steamId) {
  const targetUrl = buildSteamApiUrl(apiKey, steamId);

  const proxies = [
    (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
    (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
  ];

  for (const proxyGen of proxies) {
    const proxiedUrl = proxyGen(targetUrl);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const resp = await fetch(proxiedUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (resp.ok) {
        const text = await resp.text();
        const parsed = JSON.parse(text);
        if (parsed.playerstats && Array.isArray(parsed.playerstats.achievements)) {
          return parsed.playerstats.achievements;
        }
      }
    } catch (e) {
      // Continue to next proxy relay
    }
  }

  throw new Error('CORS_RELAY_UNAVAILABLE');
}
