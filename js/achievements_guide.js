/**
 * Base de données des guides et solutions de déblocage pour The Binding of Isaac: Rebirth / Repentance.
 * Permet d'associer automatiquement les explications de déblocage aux succès Steam importés.
 */

// Données de démonstration avec exemples représentatifs
var ISAAC_DEMO_DATA = [
  {
    id: "1",
    name: "Magdalene",
    description: "Unlocked a new character.",
    achieved: 1,
    unlockTime: 1782723060,
    globalPercent: 88.5,
    icon: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/a36d7e92df7e991758907a75dfa55d36b52548c4.jpg",
    icongray: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/fc5c40f3429120652211c9e95570752ba5810f22.jpg",
    note: "Avoir au moins 7 conteneurs de cœurs rouges en même temps dans une même partie."
  },
  {
    id: "2",
    name: "Cain",
    description: "Unlocked a new character.",
    achieved: 1,
    unlockTime: 1782672180,
    globalPercent: 82.1,
    icon: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/33658122e504ae8670bbb70686468e1276902cc4.jpg",
    icongray: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/fc5c40f3429120652211c9e95570752ba5810f22.jpg",
    note: "Posséder au moins 55 pièces de monnaie en même temps dans une même partie."
  },
  {
    id: "3",
    name: "Judas",
    description: "Unlocked a new character.",
    achieved: 1,
    unlockTime: 1782672000,
    globalPercent: 76.4,
    icon: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/8196f7a0a6ed79c2fbeffa58f17c9508eec99d12.jpg",
    icongray: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/fc5c40f3429120652211c9e95570752ba5810f22.jpg",
    note: "Vaincre Satan au Sheol pour la première fois."
  },
  {
    id: "19",
    name: "A Bandage",
    description: "Unlocked a new item.",
    achieved: 0,
    unlockTime: 0,
    globalPercent: 32.7,
    icon: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/69a73f5ec50e7f6f39a19b0bb9b6a9ab3347783e.jpg",
    icongray: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/fc5c40f3429120652211c9e95570752ba5810f22.jpg",
    note: "Fabriquer une 'Super Bandage Girl' complète en ramassant 4 Ball of Bandages en une seule partie (utiliser Lilith en mode Greed ou Box of Friends/Monster Manual)."
  },
  {
    id: "21",
    name: "A Bag of Pennies",
    description: "Unlocked a new item.",
    achieved: 0,
    unlockTime: 0,
    globalPercent: 41.2,
    icon: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/3bfaae865fdf77e3e8c965f583bb16468b2a6db7.jpg",
    icongray: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/fc5c40f3429120652211c9e95570752ba5810f22.jpg",
    note: "Vaincre Isaac dans la Cathédrale avec Cain."
  },
  {
    id: "38",
    name: "Spelunker Boy",
    description: "Beat caves without taking damage.",
    achieved: 0,
    unlockTime: 0,
    globalPercent: 24.8,
    icon: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/042cfd6dd69abee2934864f940b57d372e7441e1.jpg",
    icongray: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/fc5c40f3429120652211c9e95570752ba5810f22.jpg",
    note: "Compléter les étages Caves I et Caves II (ou Catacombs / Flooded Caves) sans subir aucun dégât. Astuce : Azazel ou The Lost avec Holy Mantle."
  },
  {
    id: "156",
    name: "Godhead",
    description: "Unlocked a new item.",
    achieved: 0,
    unlockTime: 0,
    globalPercent: 12.9,
    icon: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/6b7385966601ea3bead2a991823136274e7fc53b.jpg",
    icongray: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/52c6f376cf20689b9156a6559bc85511e649a3c0.jpg",
    note: "Compléter toutes les marques de complétion en mode Hard avec The Lost."
  },
  {
    id: "636",
    name: "Death Certificate",
    description: "Unlocked a new item.",
    achieved: 0,
    unlockTime: 0,
    globalPercent: 4.1,
    icon: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/ef3410f92501cf40b3c58e578ad456bf2481082c.jpg",
    icongray: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/250900/d77b830d17d58a5c4cfc673199bc489cbe341257.jpg",
    note: "Obtenir TOUTES les marques de complétion en Hard sur l'ensemble des 34 personnages (normaux et Tainted)."
  }
];

// Dictionnaire de solutions et méthodes de déblocage pour The Binding of Isaac
var ISAAC_GUIDES_MAP = {
  // Succès répertoriés par ID Steam et par nom d'affichage
  "1": "Avoir au moins 7 conteneurs de cœurs rouges en même temps dans une même partie.",
  "Magdalene": "Avoir au moins 7 conteneurs de cœurs rouges en même temps dans une même partie.",
  "2": "Posséder au moins 55 pièces de monnaie en même temps dans une même partie.",
  "Cain": "Posséder au moins 55 pièces de monnaie en même temps dans une même partie.",
  "3": "Vaincre Satan au Sheol pour la première fois.",
  "Judas": "Vaincre Satan au Sheol pour la première fois.",
  "4": "Vaincre Mom (Maman) au 6e étage (Depths / Necropolis) pour la première fois.",
  "The Womb": "Vaincre Mom (Maman) au 6e étage (Depths / Necropolis) pour la première fois.",
  "5": "Vaincre Mom's Heart (Cœur de maman) pour la première fois.",
  "The Harbingers": "Vaincre Mom's Heart (Cœur de maman) pour la première fois.",
  "6": "Vaincre Mom's Heart 2 fois.",
  "A Cube of Meat": "Vaincre Mom's Heart 2 fois.",
  "7": "Terminer le jeu (fin 1) ou vaincre Mom's Heart 3 fois.",
  "The Book of Revelations": "Terminer le jeu ou vaincre Mom's Heart 3 fois.",
  "8": "Vaincre Mom's Heart 4 fois.",
  "A Transcendence": "Vaincre Mom's Heart 4 fois.",
  "9": "Vaincre Mom's Heart 5 fois.",
  "The Small Rock": "Détruire 100 rochers marqués (Tinted Rocks).",
  "10": "Vaincre Mom's Heart 6 fois.",
  "Spiders": "Vaincre Mom's Heart 6 fois.",
  "19": "Fabriquer une Super Bandage Girl complète (4 Ball of Bandages en une run). Astuce : Lilith en Greed Mode.",
  "A Bandage": "Fabriquer une Super Bandage Girl complète (4 Ball of Bandages en une run). Astuce : Lilith en Greed Mode.",
  "21": "Vaincre Isaac dans la Cathédrale avec Cain.",
  "A Bag of Pennies": "Vaincre Isaac dans la Cathédrale avec Cain.",
  "34": "Compléter Basement I et Basement II sans subir aucun dégât.",
  "Basement Boy": "Compléter Basement I et Basement II sans subir aucun dégât.",
  "38": "Compléter Caves I et Caves II sans subir aucun dégât.",
  "Spelunker Boy": "Compléter Caves I et Caves II sans subir aucun dégât.",
  "39": "Compléter Depths I et Depths II sans subir aucun dégât.",
  "Dark Boy": "Compléter Depths I et Depths II sans subir aucun dégât.",
  "40": "Compléter Womb I et Womb II sans subir aucun dégât.",
  "Mama's Boy": "Compléter Womb I et Womb II sans subir aucun dégât.",
  "41": "Compléter Chest ou Dark Room sans subir aucun dégât.",
  "Dead Boy": "Compléter Chest ou Dark Room sans subir aucun dégât.",
  "59": "Vaincre Mega Satan pour la première fois.",
  "The gate is open!": "Vaincre Mega Satan pour la première fois.",
  "82": "Acheter 7 objets dans la boutique (Shop).",
  "Blue Map": "Acheter 7 objets dans la boutique (Shop).",
  "83": "Vaincre Chub (boss des Caves / Catacombs).",
  "Lil' Chubby": "Vaincre Chub (boss des Caves / Catacombs).",
  "84": "Vaincre Ultra Pride ou éliminer ??? avec Judas.",
  "The Left Hand": "Vaincre Ultra Pride ou éliminer ??? avec Judas.",
  "85": "Détruire le boss des Basement/Cellar au premier étage.",
  "Monstro's Tooth": "Détruire le boss des Basement/Cellar au premier étage.",
  "156": "Obtenir toutes les marques de complétion en mode Hard avec The Lost.",
  "Godhead": "Obtenir toutes les marques de complétion en mode Hard avec The Lost.",
  "157": "Battre Satan au Sheol avec Judas.",
  "Sacrificial Altar": "Battre Satan au Sheol avec Judas.",
  "340": "Déposer 1 000 pièces dans la machine de don du mode Greed / Greedier.",
  "The Keeper": "Déposer 1 000 pièces dans la machine de don du mode Greed / Greedier.",
  "390": "Reconstituer la pelle brisée et creuser la tombe dans la Dark Room.",
  "The Forgotten": "Reconstituer la pelle brisée et creuser la tombe dans la Dark Room.",
  "400": "Compléter toutes les marques de complétion en Hard avec les 17 personnages réguliers.",
  "Mega Mush": "Compléter toutes les marques de complétion en Hard avec les 17 personnages réguliers.",
  "636": "Obtenir TOUTES les marques de complétion en Hard sur les 34 personnages.",
  "Death Certificate": "Obtenir TOUTES les marques de complétion en Hard sur les 34 personnages.",
  "637": "Compléter absolument tous les secrets, succès et objets de Repentance (637 succès au total).",
  "Dead God": "Compléter absolument tous les secrets, succès et objets de Repentance (637 succès au total)."
};

/**
 * Récupère l'explication / solution pour un succès donné
 * @param {string} id - L'ID de l'API Steam (ex: "19", "38", "ACH_GODHEAD")
 * @param {string} name - Le nom d'affichage du succès (ex: "A Bandage", "Spelunker Boy")
 * @returns {string} L'explication ou une chaîne vide
 */
function getAchievementGuide(id, name) {
  if (id && ISAAC_GUIDES_MAP[id]) return ISAAC_GUIDES_MAP[id];
  if (name && ISAAC_GUIDES_MAP[name]) return ISAAC_GUIDES_MAP[name];
  if (name) {
    const trimmed = name.trim().toLowerCase();
    for (const [key, val] of Object.entries(ISAAC_GUIDES_MAP)) {
      if (key.toLowerCase() === trimmed) return val;
    }
  }
  return "";
}
