const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String },
  age: { type: Number },
  weight: { type: Number },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' },
  healthRecordsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HealthRecord' }],
  lastVisit: { type: Date }
});

const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;
