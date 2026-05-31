const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const Artist = require('../models/Artist');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const userResponse = (user) => ({
  id: user._id,
  email: user.email,
  username: user.username,
  role: user.role,
  artistLevel: user.artistLevel,
  phone: user.phone,
  gender: user.gender,
});

// POST /api/auth/check-email
router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    res.json({ exists: !!user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, username, role, artistLevel } = req.body;

    const emailExists = await User.findOne({ email: email.toLowerCase() });
    if (emailExists) {
      return res.status(400).json({ message: 'Email sudah terdaftar/digunakan' });
    }

    const usernameExists = await User.findOne({ username: username.toLowerCase() });
    if (usernameExists) {
      return res.status(400).json({ message: 'Username sudah digunakan' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      username: username.toLowerCase(),
      role,
      artistLevel: artistLevel || null,
    });

    if (role === 'artist') {
      await Artist.create({
        userId: user._id,
        name: username.toLowerCase(),
        rating: 0,
        duration: '',
        tags: [],
        portfolio: [],
        products: [],
      });
    }

    const token = generateToken(user);

    res.status(201).json({
      token,
      user: userResponse(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'Password/email salah' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password/email salah' });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: userResponse(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }
    res.json({ user: userResponse(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/auth/me
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const { phone, gender, username } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { phone, gender, username },
      { new: true }
    );

    res.json({ user: userResponse(updatedUser) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// DELETE /api/auth/me
router.delete('/me', authMiddleware, async (req, res) => {
  try {
    // ✅ Hapus dokumen Artist juga kalau rolenya artist
    const user = await User.findById(req.user.id)
    if (user && user.role === 'artist') {
      await Artist.findOneAndDelete({ userId: req.user.id })
    }

    await User.findByIdAndDelete(req.user.id);
    res.json({ message: 'Akun berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;