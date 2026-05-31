const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    // Informasi dasar
    artistId: { type: String, default: null },
    artist: { type: String, required: true },
    buyer: { type: String, required: true },

    // Informasi buyer
    buyerId: { type: String, default: null },
    buyerEmail: { type: String, default: '' },
    
    // Produk & harga
    product: { type: String, required: true },
    priceRange: { type: String },
    totalPrice: { type: Number, default: null },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },

    // Status
    status: { type: String, default: 'waiting' },

    // Timestamps (kapan terjadi apa)
    createdAt: { type: Date, default: Date.now },
    rejectedAt: { type: Date, default: null },
    cancelledAt: { type: Date, default: null },
    acceptedAt: { type: Date, default: null },
    paymentConfirmedAt: { type: Date, default: null },
    processedAt: { type: Date, default: null },
    resultUploadedAt: { type: Date, default: null },
    revisionRequestedAt: { type: Date, default: null },
    revisionUploadedAt: { type: Date, default: null },
    approvedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },

    // Links & notes
    resultLink: { type: String, default: '' },
    revisionNote: { type: String, default: '' },
    revisionLink: { type: String, default: '' },
    finalLink: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);