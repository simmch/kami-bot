const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    NAME: {
        type: String,
        required: false
    },
    CARD_CODE: {
        type: String,
        required: false
    },
    CARD_IMAGE: {
        type: String,
        required: false
    },
    VARIANT: {
        type: String,
        required: false
    },
    CARD_VARIANT_NAME: {
        type: String,
        required: false
    },
    MAIN_ELEMENT: {
        type: String,
        required: false
    },
    CLASS: {
        type: String,
        required: false
    },
    PRICE: {
        type: Number,
        required: false
    },
    WORLD: {
        type: String,
        required: false
    },
    HEALTH: {
        type: Number,
        required: false
    },
    ATTACK: {
        type: Number,
        required: false
    },
    DEFENSE: {
        type: Number,
        required: false
    },
    SPEED: {
        type: Number,
        required: false
    },
    ACCURACY: {
        type: Number,
        required: false
    },
    EVASION: {
        type: Number,
        required: false
    },
    RANK: {
        type: String,
        required: false
    },
    MORALITY: {
        type: Number,
        required: false
    },
    TIER: {
        type: Number,
        required: false
    },
    AVAILABLE: {
        type: Boolean,
        required: false
    },
    TIMESTAMP: {
        type: Date,
        required: false,
        default: Date.now
    }
})

const collection = "cards"

module.exports = Card =  mongoose.model('cards', CardSchema, collection)