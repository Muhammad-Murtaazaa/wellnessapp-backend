const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectDB() {
  if (db) return db;
  await client.connect();
  db = client.db('Health'); // Use your DB name
  console.log('Connected to MongoDB Atlas!');
  return db;
}

module.exports = connectDB;
