const express = require('express');
const router = express.Router();
const connectDB = require('../db');

// Register user
router.post('/register', async (req, res) => {
  const db = await connectDB();
  const { username, email, passwordHash } = req.body;
  const user = { username, email, passwordHash, createdAt: new Date() };
  await db.collection('users').insertOne(user);
  res.json({ message: 'User registered', user });
});

// Login user (simple, for demo)
router.post('/login', async (req, res) => {
  const db = await connectDB();
  const { email, passwordHash } = req.body;
  const user = await db.collection('users').findOne({ email, passwordHash });
  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
