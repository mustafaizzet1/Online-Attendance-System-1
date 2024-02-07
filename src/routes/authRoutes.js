// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.login);
router.get('/logins', authController.loginPost);  // POST isteği için rota
router.get('/register', authController.register);
router.post('/register', authController.registerPost);  // POST isteği için rota
router.get('/logout', authController.logout);

module.exports = router;  // Boşluklar kaldırıldı
