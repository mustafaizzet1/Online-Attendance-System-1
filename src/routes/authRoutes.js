// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
router.get('/', authController.login);
router.post('/auth',authController.Auth)
router.get('/logout',authController.logout)

module.exports = router;  // Boşluklar kaldırıldı
