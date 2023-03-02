const mongoose = require('mongoose');

const ZoneSchema = new mongoose.Schema({
    ZONE_CODE: {
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
    AVAILABLE: {
        type: Boolean,
        required: false
    },
    ZONE_ELEMENTAL_BUFF: {
        type: String,
        required: false
    },
    REQ_RANK: {
        type: String,
        required: false
    },
    TIMESTAMP: {
        type: Date,
        required: false,
        default: Date.now
    },
});

const collection = "zones";

module.exports = Zone = mongoose.model("zones", ZoneSchema, collection);