// Habit model schema (for reference)
module.exports = {
  collection: 'habits',
  schema: {
    userId: String,
    habitName: String,
    streak: Number,
    lastCompleted: Date
  }
};
