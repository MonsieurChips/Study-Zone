

const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");


router.get("/search", lessonController.searchLessons);


router.get("/", lessonController.getAllLessons);

router.put("/:id", lessonController.updateLesson);

module.exports = router;
