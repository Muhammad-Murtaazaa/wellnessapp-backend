const express = require('express');
const router = express.Router();
const connectDB = require('../db');

const { ObjectId } = require('mongodb');

// Get all todos for a user
router.get('/:userId', async (req, res) => {
  const db = await connectDB();
  const todos = await db.collection('todos').find({ userId: req.params.userId }).toArray();
  res.json(todos);
});

// Add a new todo
router.post('/', async (req, res) => {
  const db = await connectDB();
  const todo = { ...req.body, createdAt: new Date() };
  const result = await db.collection('todos').insertOne(todo);
  res.json(result.ops ? result.ops[0] : todo);
});

// Update a todo
router.put('/:id', async (req, res) => {
  const db = await connectDB();
  const { id } = req.params;
  const { completed } = req.body;
  await db.collection('todos').updateOne(
    { _id: new ObjectId(id) },
    { $set: { completed } }
  );
  res.json({ message: 'Todo updated' });
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  const db = await connectDB();
  const { id } = req.params;
  await db.collection('todos').deleteOne({ _id: new ObjectId(id) });
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
