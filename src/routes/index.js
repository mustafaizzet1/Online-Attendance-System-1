// routes/index.js

const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const HomePage = require('./HomePage'); // Eğer bu rota varsa ve kullanılacaksa

// Tüm alt rotaları burada birleştirin
router.use(authRoutes);
router.use(HomePage); // Eğer bu rota varsa ve kullanılacaksa
const studentHomePage = require('./studentHomePage'); // Eğer bu rota varsa ve kullanılacaksa
const courses = require('./courses');
const qr= require('./Qrcode')

// Tüm alt rotaları burada birleştirin
router.use(authRoutes);
router.use(studentHomePage); // Eğer bu rota varsa ve kullanılacaksa
router.use(courses);
router.use(qr);

module.exports = router;  // Boşluklar kaldırıldı
