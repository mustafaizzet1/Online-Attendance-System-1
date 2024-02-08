// routes/courses.js

const express = require('express');
const router = express.Router();
const { checkStudent} = require('../middlewares/AuthMiddleware');

const yoklamaController= require('../controllers/yoklamaController');

router.get('/yoklama',checkStudent,yoklamaController.yoklama);

module.exports = router;  // Boşluklar kaldırıldı
