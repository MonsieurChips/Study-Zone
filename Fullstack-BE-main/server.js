require("dotenv").config();

const app = require("./app");
const { connectToDb } = require("./src/utils/database");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToDb();
    console.log("Successfully connected to MongoDB Atlas!");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);

    process.exit(1);
  }
}

startServer();
