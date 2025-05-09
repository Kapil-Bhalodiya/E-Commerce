const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

router.get('/kpis', auth, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const admins = await User.countDocuments({ role: 'admin' });
    res.json({
      totalUsers: users,
      totalAdmins: admins,
      sales: Math.floor(Math.random() * 10000), // Mock sales data
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/users', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;