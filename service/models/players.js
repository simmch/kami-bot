const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    DID: {
        type: String,
        required: false
    },
    NAME: {
        type: String,
        required: false
    },
    SPECTER: {
        type: Object,
        required: false
    },
    LVL: {
        type: Number,
        required: false
    },
    XP: {
        type: Number,
        required: false
    },
    CARDS: {
        type: Array,
        required: false
    },
    EQUIPPED_RANK: {
        type: String,
        required: false
    },
    GUILD: {
        type: String,
        required: false
    },
    USED_CODES: {
        type: Array,
        required: false
    },
    OWNED_RANKS: {
        type: Array,
        required: false
    },
    OWNED_CARDS: {
        type: Array,
        required: false
    },
    QUESTS: {
        type: Array,
        required: false
    },
    TOTAL_ELEMENTAL_DAMAGE: {
        type: Array,
        required: false
    },
    TOTAL_SCENARIOS_COUNT: {
        type: Array,
        required: false
    },
    CURRENT_WORLD: {
        type: String,
        required: false
    },
    CURRENT_ZONE: {
        type: String,
        required: false
    },
    BALANCE: {
        type: Object,
        required: false
    },
    MISCELLANEOUS: {    // This is for things like the player's current quest, etc.
        type: Array,
        required: false
    },
    IS_ADMIN: {
        type: Boolean,
        required: false,
        default: false
    },
    TIMESTAMP: {
        type: Date,
        required: false,
        default: Date.now
    }
});

const collection = "players"

module.exports = Player = mongoose.model("players", PlayerSchema, collection);