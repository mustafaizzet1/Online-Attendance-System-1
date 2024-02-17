// routes/courses.js

const express = require('express');
const router = express.Router();
const { checkTeacher} = require('../middlewares/AuthMiddleware');

const yoklamaController= require('../controllers/yoklamaController');

router.get('/yoklama',checkTeacher,yoklamaController.yoklama);

module.exports = router;  // Boşluklar kaldırıldı
