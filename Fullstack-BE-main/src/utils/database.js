

const { MongoClient, ServerApiVersion } = require("mongodb");


const uri = process.env.MONGODB_URI;

// Validate that we have the connection string
if (!uri) {
  console.error("MONGODB_URI environment variable is not set");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;


async function connectToDb() {
  if (db) {
    return db;
  }
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected to MongoDB successfully");

    db = client.db("StudyZone");
    return db;
  } catch (error) {
    console.error("Could not connect to the database:", error);
    throw error;
  }
}

/**
 * Returns the database instance.
 * Throws an error if the database is not connected.
 * @returns {Db} 
 */
function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call connectToDb first.");
  }
  return db;
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Closing MongoDB connection...');
  await client.close();
  process.exit(0);
});

module.exports = { connectToDb, getDb };
