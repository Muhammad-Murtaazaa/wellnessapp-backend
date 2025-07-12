// Todo model schema (for reference)
module.exports = {
  collection: 'todos',
  schema: {
    userId: String,
    text: String,
    completed: Boolean,
    createdAt: Date
  }
};
