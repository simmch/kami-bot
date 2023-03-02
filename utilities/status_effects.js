const statusEffectNames = [
'ATTACK', // Increases Attack by %
'DEFENSE', // Increased Defense by %
'STAMINA', // Increases Stamina & Max Stamina by Number
'HEAL', // Heals for % of missing health
'HEALTH', // Increase Health and Max Health %
'LIFESTEAL', // Steals % of opponent missing health
'ATTACK STEAL', // Steals % of opponent attack 
'DEFENSE STEAL', // Steals % of opponent defense
'RAGE', // Lowers defense by % and increase attack by that same amount once
'BRACE', // Lowers attack by % and increases defense by that same amount once
'BERSERK', // Lowers health by % and increase attack by that amount once
'CRYSTALIZE', // Lowers defense by % and increase defense by that amount once
'SOULCHAIN', // Attack & Defense sync together to 500 / 500
'FEAR', // Decrease opponent attack and defense by % once
'CREATION', // Increases max health by % once
'DESTRUCTION', // Lowers opponent max health by % once
];

module.exports = {
    statusEffectNames,
};
