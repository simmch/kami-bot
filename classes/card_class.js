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
    }   

}

module.exports = {
    card_class: Card
}