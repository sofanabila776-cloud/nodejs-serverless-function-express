const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const artistRoutes = require('./routes/artists');

console.log('orderRoutes type:', typeof orderRoutes);
console.log('authRoutes type:', typeof authRoutes);
console.log('artistRoutes type:', typeof artistRoutes); 

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pickarya';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend sudah jalan!' });
});

app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/artists', artistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running di http://localhost:${PORT}`);
});