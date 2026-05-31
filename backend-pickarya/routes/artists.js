const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const authMiddleware = require('../middleware/authMiddleware');

// GET semua artist yang sudah published
router.get('/', async (req, res) => {
  try {
    const { all } = req.query;
    const filter = all ? {} : { isPublished: true };
    const artists = await Artist.find(filter);
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ HARUS di atas /:id
router.get('/user/:userId', async (req, res) => {
  try {
    const artist = await Artist.findOne({ userId: req.params.userId });
    if (!artist) return res.status(404).json({ message: 'Artist tidak ditemukan' });
    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET artist by ID — di bawah /user/:userId
router.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist tidak ditemukan' });
    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT upload/update portfolio
router.put('/:id/portfolio', authMiddleware, async (req, res) => {
  try {
    const { title, durationMin, durationMax, pages, products } = req.body;

    const tags = [...new Set(
      (products || []).map(p => {
        const cleanTag = String(p.tag || '').replace('#', '').trim();
        return cleanTag.charAt(0).toUpperCase() + cleanTag.slice(1).toLowerCase();
      })
    )];

    const coverImageUrl = pages?.[0]?.imageUrl || '';

    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      {
        title,
        durationMin,
        durationMax,
        duration: `${durationMin}-${durationMax} hari`,
        portfolioPages: pages,
        coverImageUrl,
        tags,
        products: products || [],
      },
      { new: true }
    );

    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH publish portfolio
router.patch('/:id/publish', authMiddleware, async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      { isPublished: true },
      { new: true }
    );
    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH unpublish portfolio
router.patch('/:id/unpublish', authMiddleware, async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      { isPublished: false },
      { new: true }
    );
    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// PATCH clear/reset portfolio (hapus konten tapi tidak hapus dokumen Artist)
router.patch('/:id/clear', authMiddleware, async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      {
        isPublished: false,
        portfolioPages: [],
        products: [],
        tags: [],
        coverImageUrl: '',
        title: '',
      },
      { new: true }
    );
    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;