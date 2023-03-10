
/**
 * Elements are the different types of magic that can be used in the game.
 * @type {string[]}
 * @constant
 * @default
 * @readonly
 */
const elements = [
    "Fire",
    "Water",
    "Earth",
    "Wind",
    "Lightning",
    "Ice",
    "Light",
    "Dark",
    "Poison",
    "BLEED",
    "Siphon",
    "Death",
    "Ranged",
    "Melee",
    "Spirit",
    "Psychic",
    "Time",
    "Gravity",
    "Status Effect"
]

const element_emojis = {
    "FIRE": "๐ฅ",
    "WATER": "๐ง",
    "EARTH": "โฐ๏ธ",
    "WIND": "๐ฌ๏ธ",
    "LIGHTNING": "โก",
    "ICE": "โ๏ธ",
    "LIGHT": "โ๏ธ",
    "DARK": "๐",
    "POISON": "๐งช",
    "BLEED": "๐ฉธ",
    "SIPHON": "โค๏ธโ๐ฅ",
    "DEATH": "โ ๏ธ",
    "RANGED": "๐น",
    "PHYSICAL": "๐",
    "SPIRIT": "๐",
    "PSYCHIC": "๐ฎ",
    "TIME": "โณ",
    "GRAVITY": "๐",
    "Status Effect": "๐ฆ "
}

function getEmoji(element) {
    let emoji = element_emojis[element] || element_emojis["Status Effect"];
    if(!element){
        emoji = ""
    }
    return  emoji
  }

module.exports = {
    getEmoji
}