// routes/index.js

const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const studentHomePage = require('./studentHomePage'); // Eğer bu rota varsa ve kullanılacaksa

// Tüm alt rotaları burada birleştirin
router.use(authRoutes);
router.use(studentHomePage); // Eğer bu rota varsa ve kullanılacaksa

module.exports = router;  // Boşluklar kaldırıldı
