const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String },
  animals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }]
});

const Owner = mongoose.model('Owner', ownerSchema);
module.exports = Owner;
