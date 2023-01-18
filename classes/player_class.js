class Player {
    constructor(disname, name, did, current_world, current_zone, specter, cards, equipped_rank, ranks, guild, used_codes, owned_cards, completed_quests, total_elemental_damage, total_scenarios_count, is_admin){
        this.DISNAME = disname
        this.NAME = name
        this.DID = did
        this.CURRENT_WORLD = current_world
        this.CURRENT_ZONE = current_zone
        this.SPECTER = specter
        this.CARDS = cards
        this.EQUIPPED_RANK = equipped_rank
        this.RANKS = ranks
        this.GUILD = guild
        this.USED_CODES = used_codes
        this.OWNED_CARDS = owned_cards
        this.COMPLETED_QUESTS = completed_quests
        this.TOTAL_ELEMENTAL_DAMAGE = total_elemental_damage
        this.TOTAL_SCENARIOS_COUNT = total_scenarios_count
        this.IS_ADMIN = is_admin
    }
}

module.exports = {
    player_class: Player
}