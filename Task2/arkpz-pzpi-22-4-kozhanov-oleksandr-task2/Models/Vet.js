const mongoose = require('mongoose');

const vetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String },
  contactInfo: { type: String },
  healthRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HealthRecord' }]
});

const Vet = mongoose.model('Vet', vetSchema);
module.exports = Vet;
