// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const HomePageController = require('../controllers/studentHomePageController');
const { checkStudent } = require('../middlewares/AuthMiddleware');

router.get('/home', HomePageController.studentHomePage);

module.exports = router;  // Boşluklar kaldırıldı
