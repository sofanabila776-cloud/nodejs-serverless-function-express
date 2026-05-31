const mongoose = require('mongoose');
const Artist = require('../models/Artist');
require('dotenv').config();

const artists = [
  {
    name: 'azazarine',
    rating: 4.9,
    duration: '3-5 hari',
    tags: ['Ilustrasi', 'Poster', 'Animation'],
    portfolio: [],
    products: [
      { tag: 'Ilustrasi', price: 'Rp 150.000 - Rp 300.000' },
      { tag: 'Poster', price: 'Rp 100.000 - Rp 200.000' },
      { tag: 'Animation', price: 'Rp 500.000 - Rp 1.000.000' },
    ]
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pickarya');
    console.log('✅ MongoDB Connected');

    await Artist.deleteMany();
    await Artist.insertMany(artists);
    console.log('✅ Artist data seeded!');

    process.exit(0);
  } catch (err) {
    console.log('❌ Error:', err);
    process.exit(1);
  }
};

seed();