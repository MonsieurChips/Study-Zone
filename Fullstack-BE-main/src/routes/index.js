

const express = require("express");
const router = express.Router();

const lessonRoutes = require("./lessons");
const orderRoutes = require("./orders");


router.use("/lessons", lessonRoutes);


router.use("/orders", orderRoutes);

module.exports = router;
