/**
 * Class constants
 * @type {string[]}
 * @constant
 * Fighter: Starts each fight with 3 Parrys
 * Mage: Increases elemental damage by 25%
 * Tank: Starts each fight with Rarity * 150 Shield
 * Ranger: Starts each fight with 2 barriers
 * Healer: Stores 10% of damage taken and heals for the total amount each focus
 */
const classes = [
    'FIGHTER', 
    'MAGE', 
    'TANK',
    'RANGER', 
    'HEALER', 
]

function setFighterEffects(player) {
    player.parry = player.parry + 3;
}

function setMageEffects(player) {
    player.elementalDamage = player.elementalDamage + 0.25;
}

function setTankEffects(player) {
    player.shield = player.shield + (player.tier * 100);
}

function setRangerEffects(player) {
    player.barrier = player.barrier + 2;
}

function setHealerEffects(player) {
    player.heal = player.heal + 0.1;
}

function setClassEffects(player) {
    switch (player.class) {
        case 'FIGHTER':
            setFighterEffects(player);
            break;
        case 'MAGE':
            setMageEffects(player);
            break;
        case 'TANK':
            setTankEffects(player);
            break;
        case 'RANGER':
            setRangerEffects(player);
            break;
        case 'HEALER':
            setHealerEffects(player);
            break;
    }
}

