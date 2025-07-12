const express = require('express');
const router = express.Router();
const connectDB = require('../db');

const { ObjectId } = require('mongodb');

// Get all habits for a user
router.get('/:userId', async (req, res) => {
  const db = await connectDB();
  const habits = await db.collection('habits').find({ userId: req.params.userId }).toArray();
  res.json(habits);
});

// Add a new habit
router.post('/', async (req, res) => {
  const db = await connectDB();
  const habit = { ...req.body, streak: 0, lastCompleted: null };
  const result = await db.collection('habits').insertOne(habit);
  res.json(result.ops ? result.ops[0] : habit);
});

// Update a habit streak
router.put('/:id', async (req, res) => {
  const db = await connectDB();
  const { id } = req.params;
  const { streak, lastCompleted } = req.body;
  await db.collection('habits').updateOne(
    { _id: new ObjectId(id) },
    { $set: { streak, lastCompleted } }
  );
  res.json({ message: 'Habit updated' });
});

// Delete a habit
router.delete('/:id', async (req, res) => {
  const db = await connectDB();
  const { id } = req.params;
  await db.collection('habits').deleteOne({ _id: new ObjectId(id) });
  res.json({ message: 'Habit deleted' });
});

module.exports = router;
