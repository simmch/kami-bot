class Scenario {
    constructor(scenario_code, title, image, required_level, required_rank, enemy_level, enemies, drops, world, zone, available){
        this.scenario_code = scenario_code
        this.title = title
        this.image = image
        this.required_level = required_level
        this.required_rank = required_rank
        this.enemy_level = enemy_level
        this.enemies = enemies
        this.drops = drops
        this.world = world
        this.zone = zone
        this.available = available
    }
}

module.exports = {
    scenario_class: Scenario
}