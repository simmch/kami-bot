const { EmbedBuilder } = require("discord.js")
const { getEmoji } = require("../utilities/elements_common.js")
const { getZoneData } = require("../utilities/zones_common.js")
const { getRankTextForCard } = require("../utilities/ranks_common.js")
const { statusEffectNames } = require("../utilities/status_effects.js")

class Card {
    constructor(name, code, image, variant_name, main_element, card_class, price, world, health, attack, defense, speed, rank, morality, tier, available, moves, quest, zones, weakness, resistant, repel, immune, absorb){
        this.name = name
        this.code = code
        this.image = image
        this.variant_name = variant_name
        this.main_element = main_element
        this.card_class = card_class
        this.price = price
        this.world = world
        this.health = health
        this.attack = attack
        this.defense = defense
        this.speed = speed
        this.rank = rank
        this.morality = morality
        this.tier = tier
        this.available = available
        this.moves = moves
        this.quest = quest
        this.zones = zones
        this.weakness = weakness
        this.resistant = resistant
        this.repel = repel
        this.immune = immune
        this.absorb = absorb
        this.main_element_emoji = getEmoji(this.main_element)

        this.move1_ability_name = this.moves[0].MOVE1_ABILITY
        this.move1_power = this.moves[0].MOVE1_POWER
        this.move1_element = this.moves[0].MOVE1_ELEMENT
        this.move1_emoji = getEmoji(this.move1_element)

        this.move2_ability_name = this.moves[0].MOVE2_ABILITY
        this.move2_power = this.moves[0].MOVE2_POWER
        this.move2_element = this.moves[0].MOVE2_ELEMENT
        this.move2_emoji = getEmoji(this.move2_element)

        this.move3_ability_name = this.moves[0].MOVE3_ABILITY
        this.move3_power = this.moves[0].MOVE3_POWER
        this.move3_element = this.moves[0].MOVE3_ELEMENT
        this.move3_emoji = getEmoji(this.move3_element)

        this.move4_ability_name = this.moves[0].MOVE4_ABILITY
        this.move4_power = this.moves[0].MOVE4_POWER
        this.move4_element = this.moves[0].MOVE4_ELEMENT
        this.move4_emoji = getEmoji(this.move4_element)

        this.quest_type = this.quest[0].TYPE
        this.quest_quantity = this.quest[0].QUANTITY
        this.quest_element = getEmoji(this.quest[0].ELEMENT) || ""

        this.zone_text = ""
        this.rank_text = ""
    }

    getAffinityText() {
        let output = '';
        
        if (this.weakness.length > 0) {
          output += '**Weaknesses**\n';
          output += this.weakness.map(item => getEmoji(item)).join(', ');
          output += '\n';
        }
      
        if (this.resistant.length > 0) {
          output += '**Resistances**\n';
          output += this.resistant.map(item => getEmoji(item)).join(', ');
          output += '\n';
        }
      
        if (this.immune.length > 0) {
          output += '**Immunities**\n';
          output += this.immune.map(item => getEmoji(item)).join(', ');
          output += '\n';
        }
      
        if (this.absorb.length > 0) {
          output += '**Absorbs**\n';
          output += this.absorb.map(item => getEmoji(item)).join(', ');
          output += '\n';
        }
      
        if (this.repel.length > 0) {
          output += '**Repels**\n';
          output += this.repel.map(item => getEmoji(item)).join(', ');
          output += '\n';
        }
      
        return output;
      }

  
    formatMoveWithElement(moveElement, statusEffects) {
        let formattedMove = '';

        const moveInfo = [
          {
            element: this.move1_element,
            emoji: this.move1_emoji,
            ability_name: this.move1_ability_name,
            power: this.move1_power
          },
          {
            element: this.move2_element,
            emoji: this.move2_emoji,
            ability_name: this.move2_ability_name,
            power: this.move2_power
          },
          {
            element: this.move3_element,
            emoji: this.move3_emoji,
            ability_name: this.move3_ability_name,
            power: this.move3_power
          },
          {
            element: this.move4_element,
            emoji: this.move4_emoji,
            ability_name: this.move4_ability_name,
            power: this.move4_power
          }
        ];
      
        for (let i = 0; i < moveInfo.length; i++) {
          const currentMove = moveInfo[i];
          if (currentMove.element.toUpperCase() === moveElement.toUpperCase()) {
            formattedMove += `${currentMove.emoji} **${currentMove.ability_name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}** - `;
            if (statusEffects.includes(moveElement.toUpperCase())) {
              const statusEffectName = moveElement.toUpperCase();
              let suffix = '';
              switch (moveElement.toUpperCase()) {
                case 'ATTACK':
                case 'DEFENSE':
                case 'HEAL':
                case 'BERSERK':
                case 'CRYSTALIZE':
                case 'SOULCHAIN':
                case 'FEAR':
                case 'CREATION':
                case 'DESTRUCTION':
                case 'LIFESTEAL':
                case 'ATTACK STEAL':
                case 'DEFENSE STEAL':
                case 'RAGE':
                case 'BRACE':
                  suffix = '%';
                  break;
                case 'STAMINA':
                  suffix = '';
                  break;
              }
              formattedMove += `${statusEffectName.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())} ${currentMove.power}${suffix}`;
            } else {
              formattedMove += currentMove.power;
            }
            break;
          }
        }
      
        return formattedMove;
      }


    async getCardEmbed() {
        this.rank_text = await getRankTextForCard(this.rank);
        const embed = new EmbedBuilder()
          .setTitle(`${this.main_element_emoji} ${this.variant_name}`)
          .setDescription(`
      ❤️ **Health**: ${this.health}
      ⚔️ **Attack**: ${this.attack}
      🛡️ **Defense**: ${this.defense}
      💨 **Speed**: ${this.speed}
      
      🥋 **Class**: ${this.card_class.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
      🔶 **Rank**: ${this.rank_text}
      🔷 **Tier**: ${this.tier}
      🌎 **World**: ${this.world}
      
      ${this.formatMoveWithElement(this.move1_element, statusEffectNames)}
      ${this.formatMoveWithElement(this.move2_element, statusEffectNames)}
      ${this.formatMoveWithElement(this.move3_element, statusEffectNames)}
      ${this.formatMoveWithElement(this.move4_element, statusEffectNames)}
      
      ${this.getAffinityText()}

      __Resonate Quest__
      ${this.quest_type.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())} - ${this.quest_quantity} ${this.quest_element}`
            .split('\n') // Split the description into lines
            .map((line) => line.trim()) // Remove leading/trailing whitespace from each line
            .join('\n') // Join the lines back into a single string with a newline character
          )
          .setImage(this.image)
          .setFooter({ text: `Card Code: ${this.code}` })
          .setTimestamp();
        return embed;
      }


}




module.exports = {
    card_class: Card
}