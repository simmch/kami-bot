const mongoose = require('mongoose');

const SpecterSchema = new mongoose.Schema({
  IMAGE: {
    type: String,
    required: false
  },
  WORLD: {
    type: String,
    required: false
  },
  AGE: {
    type: Number,
    required: false
  },
  PERSONALITY: {
    type: String,
    required: false
  },
  RACE: {
    type: String,
    required: false
  },
  CLASS: {
    type: String,
    required: false
  },
  GENDER: {
    type: String,
    required: false
  },
  AGE_GROUP: {
    type: String,
    required: false
},
});

const collection = "specters"

const Specter = mongoose.model('specters', SpecterSchema, collection);

module.exports = Specter;