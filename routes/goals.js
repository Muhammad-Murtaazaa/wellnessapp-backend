const express = require('express');
const router = express.Router();
const connectDB = require('../db');
const { ObjectId } = require('mongodb');

// Get all goals for a user
router.get('/:userId', async (req, res) => {
  const db = await connectDB();
  const goals = await db.collection('goals').find({ userId: req.params.userId }).toArray();
  res.json(goals);
});

// Add a new goal
router.post('/', async (req, res) => {
  const db = await connectDB();
  const goal = { ...req.body, completed: false, progress: 0, createdAt: new Date() };
  const result = await db.collection('goals').insertOne(goal);
  res.json(result.ops ? result.ops[0] : goal);
});

// Update a goal
router.put('/:id', async (req, res) => {
  const db = await connectDB();
  const { id } = req.params;
  const { completed, progress } = req.body;
  await db.collection('goals').updateOne(
    { _id: new ObjectId(id) },
    { $set: { completed, progress } }
  );
  res.json({ message: 'Goal updated' });
});

// Delete a goal
router.delete('/:id', async (req, res) => {
  const db = await connectDB();
  const { id } = req.params;
  await db.collection('goals').deleteOne({ _id: new ObjectId(id) });
  res.json({ message: 'Goal deleted' });
});

module.exports = router;
