const { match_analytics_api } = require("./match_analytics_api")
const { player_api } = require("./player_api")
const { rank_api } = require("./rank_api")
const { scenario_api } = require("./scenario_api")
const { world_api } = require("./world_api")
const specter_api = require("./specter_api")
const card_api = require("./card_api")

module.exports = {
    match_analytics_api,
    player_api,
    rank_api,
    scenario_api,
    world_api,
    specter_api,
    card_api
}
