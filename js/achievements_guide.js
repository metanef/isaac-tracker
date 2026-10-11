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
    note: "Avoir au moins 7 conteneurs de cœurs rouges en même temps dans une même partie.",
    note_en: "Have 7 or more Red Heart Containers at one time in a single run."
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
    note: "Posséder au moins 55 pièces de monnaie en même temps dans une même partie.",
    note_en: "Hold 55 Coins at one time in a single run."
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
    note: "Vaincre Satan au Sheol pour la première fois.",
    note_en: "Defeat Satan in Sheol for the first time."
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
    note: "Fabriquer une 'Super Bandage Girl' complète en ramassant 4 Ball of Bandages en une seule partie (utiliser Lilith en mode Greed ou Box of Friends/Monster Manual).",
    note_en: "Make a Super Bandage Girl by collecting 4 Ball of Bandages in a single run (Tip: use Lilith in Greed Mode or Box of Friends)."
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
    note: "Vaincre Isaac dans la Cathédrale avec Cain.",
    note_en: "Defeat Isaac in the Cathedral as Cain."
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
    note: "Compléter les étages Caves I et Caves II (ou Catacombs / Flooded Caves) sans subir aucun dégât. Astuce : Azazel ou The Lost avec Holy Mantle.",
    note_en: "Beat Caves I and Caves II without taking damage. Tip: Azazel or The Lost with Holy Mantle."
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
    note: "Compléter toutes les marques de complétion en mode Hard avec The Lost.",
    note_en: "Earn all Hard mode Completion Marks as The Lost."
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
    note: "Obtenir TOUTES les marques de complétion en Hard sur l'ensemble des 34 personnages (normaux et Tainted).",
    note_en: "Earn all Hard mode Completion Marks for all 34 characters (normal and tainted)."
  }
];

// Dictionnaire français de guides de secours
var ISAAC_GUIDES_MAP_FR = {
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
  "19": "Fabriquer une Super Bandage Girl complète (4 Ball of Bandages en une run).",
  "A Bandage": "Fabriquer une Super Bandage Girl complète (4 Ball of Bandages en une run).",
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
  "637": "Compléter absolument tous les secrets, succès et objets de Repentance.",
  "Dead God": "Compléter absolument tous les secrets, succès et objets de Repentance."
};

// Dictionnaire anglais de guides de secours
var ISAAC_GUIDES_MAP_EN = {
  "1": "Have 7 or more Red Heart Containers at one time in a single run.",
  "Magdalene": "Have 7 or more Red Heart Containers at one time in a single run.",
  "2": "Hold 55 Coins at one time in a single run.",
  "Cain": "Hold 55 Coins at one time in a single run.",
  "3": "Defeat Satan in Sheol for the first time.",
  "Judas": "Defeat Satan in Sheol for the first time.",
  "4": "Defeat Mom on Chapter 3 (Depths / Necropolis) for the first time.",
  "The Womb": "Defeat Mom on Chapter 3 (Depths / Necropolis) for the first time.",
  "5": "Defeat Mom's Heart for the first time.",
  "The Harbingers": "Defeat Mom's Heart for the first time.",
  "6": "Defeat Mom's Heart 2 times.",
  "A Cube of Meat": "Defeat Mom's Heart 2 times.",
  "7": "Complete the game or defeat Mom's Heart 3 times.",
  "The Book of Revelations": "Complete the game or defeat Mom's Heart 3 times.",
  "8": "Defeat Mom's Heart 4 times.",
  "A Transcendence": "Defeat Mom's Heart 4 times.",
  "9": "Destroy 100 Tinted Rocks.",
  "The Small Rock": "Destroy 100 Tinted Rocks.",
  "10": "Defeat Mom's Heart 6 times.",
  "Spiders": "Defeat Mom's Heart 6 times.",
  "19": "Make a Super Bandage Girl by collecting 4 Ball of Bandages in one run.",
  "A Bandage": "Make a Super Bandage Girl by collecting 4 Ball of Bandages in one run.",
  "21": "Defeat Isaac in the Cathedral as Cain.",
  "A Bag of Pennies": "Defeat Isaac in the Cathedral as Cain.",
  "34": "Complete Basement without taking damage.",
  "Basement Boy": "Complete Basement without taking damage.",
  "38": "Complete Caves without taking damage.",
  "Spelunker Boy": "Complete Caves without taking damage.",
  "39": "Complete Depths without taking damage.",
  "Dark Boy": "Complete Depths without taking damage.",
  "40": "Complete Chapter 4 without taking damage.",
  "Mama's Boy": "Complete Chapter 4 without taking damage.",
  "41": "Complete Chest or Dark Room without taking damage.",
  "Dead Boy": "Complete Chest or Dark Room without taking damage.",
  "59": "Defeat Mega Satan for the first time.",
  "The gate is open!": "Defeat Mega Satan for the first time.",
  "82": "Purchase 7 items from the shop.",
  "Blue Map": "Purchase 7 items from the shop.",
  "83": "Defeat Chub (Caves / Catacombs boss).",
  "Lil' Chubby": "Defeat Chub (Caves / Catacombs boss).",
  "84": "Defeat Ultra Pride or defeat ??? as Judas.",
  "The Left Hand": "Defeat Ultra Pride or defeat ??? as Judas.",
  "85": "Defeat the Chapter 1 boss.",
  "Monstro's Tooth": "Defeat the Chapter 1 boss.",
  "156": "Earn all Hard mode Completion Marks as The Lost.",
  "Godhead": "Earn all Hard mode Completion Marks as The Lost.",
  "157": "Defeat Satan in Sheol as Judas.",
  "Sacrificial Altar": "Defeat Satan in Sheol as Judas.",
  "340": "Donate 1,000 Coins to the Greed Donation Machine.",
  "The Keeper": "Donate 1,000 Coins to the Greed Donation Machine.",
  "390": "Assemble the Broken Shovel and dig up the dirt patch in the Dark Room.",
  "The Forgotten": "Assemble the Broken Shovel and dig up the dirt patch in the Dark Room.",
  "400": "Complete all Hard mode Completion Marks with all 17 regular characters.",
  "Mega Mush": "Complete all Hard mode Completion Marks with all 17 regular characters.",
  "636": "Earn all Hard mode Completion Marks for all 34 characters (normal and tainted).",
  "Death Certificate": "Earn all Hard mode Completion Marks for all 34 characters (normal and tainted).",
  "637": "Unlock all achievements, find every item, and complete all Repentance collection pages.",
  "Dead God": "Unlock all achievements, find every item, and complete all Repentance collection pages."
};

/**
 * Récupère l'explication / solution pour un succès donné
 * @param {string} id - L'ID de l'API Steam (ex: "19", "38")
 * @param {string} name - Le nom d'affichage du succès (ex: "A Bandage", "Spelunker Boy")
 * @param {string} lang - La langue souhaitée ('fr' ou 'en')
 * @returns {string} L'explication ou une chaîne vide
 */
function getAchievementGuide(id, name, lang = 'fr') {
  const map = lang === 'en' ? ISAAC_GUIDES_MAP_EN : ISAAC_GUIDES_MAP_FR;
  const fallbackMap = lang === 'en' ? ISAAC_GUIDES_MAP_FR : ISAAC_GUIDES_MAP_EN;

  if (id && map[id]) return map[id];
  if (name && map[name]) return map[name];
  if (name) {
    const trimmed = name.trim().toLowerCase();
    for (const [key, val] of Object.entries(map)) {
      if (key.toLowerCase() === trimmed) return val;
    }
  }

  // Fallback
  if (id && fallbackMap[id]) return fallbackMap[id];
  if (name && fallbackMap[name]) return fallbackMap[name];
  return "";
}
