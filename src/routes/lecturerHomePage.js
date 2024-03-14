// routes/courses.js

const express = require('express');
const router = express.Router();
const { checkStudent,checkTeacher} = require('../middlewares/AuthMiddleware');

const teachermenuController= require('../controllers/teachermenuController');

router.get('/teacher-menu',checkTeacher,teachermenuController.teacher);
router.get('/courses', teachermenuController.courses);

module.exports = router;  // Boşluklar kaldırıldı