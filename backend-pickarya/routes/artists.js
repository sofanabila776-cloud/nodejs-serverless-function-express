const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');

// GET /api/artists
router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/artists/:id
router.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist tidak ditemukan' });
    }
    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;