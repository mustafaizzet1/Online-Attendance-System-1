const db = require('../models');



exports.courses = async (req, res, next) => {
  try {
    const lectures = await db.Lecture.findAll();
    res.json(lectures);
  } catch (error) {
    next(error);
  }
};