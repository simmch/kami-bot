const mongoose = require("mongoose");

const RankSchema = new mongoose.Schema({
    RANK_CODE: {
        type: String,
        required: false
    },
    TITLE: {
        type: String,
        required: false
    },
    WORLD: {
        type: String,
        required: false
    },
    BUFF: {
        type: Object,
        required: false
    },
    REQUIRED_MORALITY: {
        type: Number,
        required: false
    },
    LEVEL_UNLOCKED: {
        type: Number,
        required: false
    },
    QUEST_UNLOCKED: {
        type: Object,
        required: false
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
});

const collection = "ranks"

module.exports = Rank = mongoose.model("ranks", RankSchema, collection);