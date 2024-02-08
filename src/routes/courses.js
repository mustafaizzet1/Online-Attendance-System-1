// routes/courses.js

const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');

router.get('/courses', coursesController.courses);

module.exports = router;  // Boşluklar kaldırıldı
