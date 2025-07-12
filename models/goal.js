// Goal model schema (for reference)
module.exports = {
  collection: 'goals',
  schema: {
    userId: String,
    goalText: String,
    type: String, // 'daily' or 'weekly'
    completed: Boolean,
    progress: Number,
    createdAt: Date
  }
};
