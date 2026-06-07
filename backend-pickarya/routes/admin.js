const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'pickarya2024';

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({ success: true, token: 'pickarya-admin-token' });
  }
  return res.status(401).json({ success: false, message: 'Username atau password salah' });
});

// GET /api/admin/orders — semua order
router.get('/orders', adminGuard, async (req, res) => {
  try {
    const User = require('../models/User');
    const orders = await Order.find().sort({ createdAt: -1 });
    
    // ambil nomor telepon buyer dari User collection
    const ordersWithPhone = await Promise.all(orders.map(async (order) => {
      const orderObj = order.toObject();
       console.log('buyerId:', order.buyerId)
      if (order.buyerId) {
        const buyer = await User.findById(order.buyerId).select('phone');
        console.log('buyer found:', buyer)
        orderObj.buyerPhone = buyer?.phone || '-';
      }
      return orderObj;
    }));

    res.json(ordersWithPhone);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// PATCH /api/admin/orders/:id/confirm-payment
router.patch('/orders/:id/confirm-payment', adminGuard, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'paid_confirmed', processedAt: new Date() },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function adminGuard(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (token === 'pickarya-admin-token') return next();
  return res.status(403).json({ error: 'Unauthorized' });
}

module.exports = router;