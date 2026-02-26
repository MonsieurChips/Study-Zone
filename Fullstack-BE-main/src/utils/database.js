

const { MongoClient, ServerApiVersion } = require("mongodb");


const uri = process.env.MONGODB_URI;


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

    await client.connect();

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

module.exports = { connectToDb, getDb };
