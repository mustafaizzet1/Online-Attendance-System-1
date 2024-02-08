// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const HomePageController = require('../controllers/HomePageController');
const { checkStudent } = require('../middlewares/AuthMiddleware');

router.get('/home',checkStudent, HomePageController.studentHomePage);

module.exports = router;  // Boşluklar kaldırıldı
