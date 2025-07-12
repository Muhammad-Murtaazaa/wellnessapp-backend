const express = require('express');
const router = express.Router();
const connectDB = require('../db');

// Get water count for a user (for today)
router.get('/:userId', async (req, res) => {
  const db = await connectDB();
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const water = await db.collection('water').findOne({ userId: req.params.userId, date: today });
  res.json({ count: water ? water.count : 0 });
});

// Add a glass of water for a user (for today)
router.post('/:userId', async (req, res) => {
  const db = await connectDB();
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const water = await db.collection('water').findOne({ userId: req.params.userId, date: today });
  let count = 1;
  if (water) {
    count = water.count + 1;
    await db.collection('water').updateOne({ _id: water._id }, { $set: { count } });
  } else {
    await db.collection('water').insertOne({ userId: req.params.userId, date: today, count: 1 });
  }
  res.json({ count });
});

module.exports = router;
