// routes/courses.js

const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');
const { checkTeacher } = require('../middlewares/AuthMiddleware');
router.get('/courses',checkTeacher, coursesController.courses);

module.exports = router;  // Boşluklar kaldırıldı
