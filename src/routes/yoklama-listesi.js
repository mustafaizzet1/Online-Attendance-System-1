// routes/courses.js

const express = require('express');
const router = express.Router();
const { checkTeacher} = require('../middlewares/AuthMiddleware');

const yoklamalistesiController= require('../controllers/yoklamalistesiController');

router.get('/yoklama-listesi',checkTeacher,yoklamalistesiController.yoklamaliste);

module.exports = router;  // Boşluklar kaldırıldı
