const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  name: { type: String, required: true },
  rating: { type: Number, default: 0 },
  duration: { type: String, default: '' },
  tags: [{ type: String }],
  portfolio: [{ type: String }],
  products: [
    {
      tag: { type: String },
      price: { type: String }
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Artist', artistSchema);