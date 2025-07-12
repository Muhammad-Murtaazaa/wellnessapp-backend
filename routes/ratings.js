const express = require('express');
const router = express.Router();
const connectDB = require('../db');


// Submit a rating
router.post('/', async (req, res) => {
  const db = await connectDB();
  const rating = { ...req.body, timestamp: new Date() };
  await db.collection('ratings').insertOne(rating);
  res.json({ message: 'Rating submitted', rating });
});

// Get average rating
router.get('/average', async (req, res) => {
  const db = await connectDB();
  const ratings = await db.collection('ratings').find({}).toArray();
  if (ratings.length === 0) return res.json({ average: 0 });
  const avg = ratings.reduce((sum, r) => sum + (r.rating || 0), 0) / ratings.length;
  res.json({ average: avg });
});

module.exports = router;
