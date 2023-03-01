/**
 * Rank Buffs
 * @type {string[]}
 * @constant
 * ATTACK: Increases Attack by %
 * DEFENSE: Increased Defense by % 
 * STAMINA: Increases Stamina & Max Stamina by Number
 * HEAL: Heals for % of missing health
 * LIFESTEAL: Steals % of opponent missing health
 * ATTACK STEAL: Steals % of opponent attack
 * DEFENSE STEAL: Steals % of opponent defense
 * FEAR: Decrease opponent ap by %
 * GROWTH: Increases ap by %
 * CREATION: Increases max health by % once
 * DESTRUCTION: Lowers opponent max health by % once
 * SPELL SHIELD: Adds Absorb affinity for an element
 * SHIELD: Blocks damage
 */
const rank_buffs = [
    'ATTACK', // Increases Attack by %
    'DEFENSE', // Increased Defense by %
    'STAMINA', // Increases Stamina & Max Stamina by Number
    'HEAL', // Heals for % of missing health
    'LIFESTEAL', // Steals % of opponent missing health
    'ATTACK STEAL', // Steals % of opponent attack 
    'DEFENSE STEAL', // Steals % of opponent defense
    'FEAR', // Decrease opponent ap by %
    'GROWTH', // Increases ap by %
    'CREATION', // Increases max health by % once
    'DESTRUCTION', // Lowers opponent max health by % once
    "SPELL SHIELD", // Adds Absorb affinity for an element
    "SHIELD", // Blocks damage
    "BARRIER", // Blocks attacks until you attack
    "PARRY", // Opponent takes 40% of the damage, you take 60%
    "ELEMENTAL BOOST", // Increases Specific Elemental Damage
]

