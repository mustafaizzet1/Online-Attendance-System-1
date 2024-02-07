// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const studentHomePageController = require('../controllers/studentHomePageController');

router.get('/home', studentHomePageController.studentHomePage);

module.exports = router;  // Boşluklar kaldırıldı
