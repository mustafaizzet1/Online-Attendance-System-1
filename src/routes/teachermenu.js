// routes/courses.js

const express = require('express');
const router = express.Router();
const { checkStudent} = require('../middlewares/AuthMiddleware');

const teachermenuController= require('../controllers/teachermenuController');

router.get('/teacher-menu',checkStudent,teachermenuController.teacher);

module.exports = router;  // Boşluklar kaldırıldı