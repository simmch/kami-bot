const mongoose = require("mongoose");

const MatchAnalyticsSchema = new mongoose.Schema({
    PLAYERS: {
        type: Array,
        required: false
    },
    ENEMIES: {
        type: Array,
        required: false
    },
    SCENARIO_CODE: {
        type: String,
        required: false
    },
    WORLD: {
        type: String,
        required: false
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now,
    }
});

const collection = "matchanalytics"

module.exports = Matchanalytics = mongoose.model("matchanalytics", MatchAnalyticsSchema, collection);