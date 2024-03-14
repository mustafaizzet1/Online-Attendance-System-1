// routes/courses.js

const express = require('express');
const router = express.Router();
const { checkTeacher} = require('../middlewares/AuthMiddleware');

const yoklamaController= require('../controllers/yoklamaController');

router.get('/yoklama',checkTeacher,yoklamaController.yoklama);
router.post('/yoklama/yoklamabaslat',yoklamaController.startAttendance);

module.exports = router;  // Boşluklar kaldırıldı
