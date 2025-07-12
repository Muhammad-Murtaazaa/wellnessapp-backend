// User model schema (for reference)
module.exports = {
  collection: 'users',
  schema: {
    username: String,
    email: String,
    passwordHash: String,
    createdAt: Date
  }
};
