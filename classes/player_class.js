class Player {
    constructor(disname, name, did, current_world, current_zone, specter, cards, equipped_rank, ranks, guild, used_codes, owned_cards, completed_quests, total_elemental_damage, total_scenarios_count, is_admin){
        this.disname = disname
        this.name = name
        this.did = did
        this.current_world = current_world
        this.current_zone = current_zone
        this.specter = specter
        this.cards = cards
        this.equipped_rank = equipped_rank
        this.ranks = ranks
        this.guild = guild
        this.used_codes = used_codes
        this.owned_cards = owned_cards
        this.completed_quests = completed_quests
        this.total_elemental_damage = total_elemental_damage
        this.total_scenarios_count = total_scenarios_count
        this.is_admin = is_admin
    }
}

module.exports = {
    player_class: Player
}