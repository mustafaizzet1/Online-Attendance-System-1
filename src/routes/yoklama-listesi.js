// routes/courses.js

const express = require('express');
const router = express.Router();
const { checkStudent} = require('../middlewares/AuthMiddleware');

const yoklamalistesiController= require('../controllers/yoklamalistesiController');

router.get('/yoklama-listesi',checkStudent,yoklamalistesiController.yoklamaliste);

module.exports = router;  // Boşluklar kaldırıldı
