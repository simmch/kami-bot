const mongoose = require("mongoose");

const SpecterSchema = new mongoose.Schema({
    CODE: {
        type: String,
        required: false
    },
    BASE_IMAGE: {
        type: String,
        required: false
    },
    BATTLE_IMAGE: {
        type: String,
        required: false
    },
    EVIL_IMAGE: {
        type: String,
        required: false
    },
});

const collection = "specters"

module.exports = Specter = mongoose.model("specters", SpecterSchema, collection);