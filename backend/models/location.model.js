const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  photo: { type: String, required: true },
  availableUnits: { type: Number, required: true },
  wifi: { type: Boolean, required: true },
  laundry: { type: Boolean, required: true }
}, {
  timestamps: true,
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;