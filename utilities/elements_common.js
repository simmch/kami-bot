
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
    "FIRE": "🔥",
    "WATER": "💧",
    "EARTH": "⛰️",
    "WIND": "🌬️",
    "LIGHTNING": "⚡",
    "ICE": "❄️",
    "LIGHT": "☀️",
    "DARK": "🌑",
    "POISON": "🧪",
    "BLEED": "🩸",
    "SIPHON": "❤️‍🔥",
    "DEATH": "☠️",
    "RANGED": "🏹",
    "PHYSICAL": "👊",
    "SPIRIT": "💙",
    "PSYCHIC": "🔮",
    "TIME": "⏳",
    "GRAVITY": "🌌",
    "Status Effect": "🦠"
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