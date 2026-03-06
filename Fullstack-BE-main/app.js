const express = require("express");
const cors = require("cors");
const path = require("path");
const loggerMiddleware = require("./src/middleware/logger");
const mainRouter = require("./src/routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:8080',
      'https://monsieurchips.github.io'
    ];
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use(loggerMiddleware);

app.use(express.static(path.join(__dirname, "public")));

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString(), service: "StudyZone Backend" });
});

app.use("/api", mainRouter);

app.use((req, res, next) => {
  res.status(404).send({ message: "Error: Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something broke on the server!" });
});

module.exports = app;
