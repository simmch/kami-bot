class Scenario {
    constructor(scenario_code, title, image, required_level, required_rank, enemy_level, enemies, drops, world, zone, available){
        this.SCENARIO_CODE = scenario_code
        this.TITLE = title
        this.IMAGE = image
        this.REQUIRED_LEVEL = required_level
        this.REQUIRED_RANK = required_rank
        this.ENEMY_LEVEL = enemy_level
        this.ENEMIES = enemies
        this.DROPS = drops
        this.WORLD = world
        this.ZONE = zone
        this.AVAILABLE = available
    }
}

module.exports = {
    scenario_class: Scenario
}