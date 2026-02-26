const { getDb } = require("../utils/database");
const { ObjectId } = require("mongodb");

const LESSONS_COLLECTION = "Lessons";

exports.getAllLessons = async (req, res) => {
  try {
    const db = getDb();
    console.log(await db.collections());
    const lessons = await db.collection(LESSONS_COLLECTION).find({}).toArray();
    res.status(200).json(lessons);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch lessons", error: error.message });
  }
};


exports.searchLessons = async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const db = getDb();

    const searchRegex = new RegExp(query, "i");

    const lessons = await db
      .collection(LESSONS_COLLECTION)
      .find({

        $or: [
          { name: searchRegex },
          { location: searchRegex },
          { category: searchRegex },
          { description: searchRegex },
        ],
      })
      .toArray();

    res.status(200).json(lessons);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to search for lessons", error: error.message });
  }
};



exports.updateLesson = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid lesson ID format" });
  }

  try {
    const db = getDb();
    const result = await db
      .collection(LESSONS_COLLECTION)
      .updateOne({ _id: id }, { $set: updateData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json({ message: "Lesson updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update lesson", error: error.message });
  }
};
