// routes/courses.js

const express = require('express');
const router = express.Router();
const { checkStudent} = require('../middlewares/AuthMiddleware');

const yoklamasayfasiController= require('../controllers/yoklamasayfasiController');

router.get('/yoklama-sayfasi',checkStudent,yoklamasayfasiController.yoklamasayfa);

module.exports = router;  // Boşluklar kaldırıldı
