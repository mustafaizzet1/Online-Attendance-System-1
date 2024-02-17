// routes/getRoutes.js
const express = require('express');
const router = express.Router();


// routes/authRoutes.js

const qrController = require('../controllers/qrController');
const { checkStudent} = require('../middlewares/AuthMiddleware');

router.get('/qr', checkStudent, qrController.qr);

module.exports = router;  // Boşluklar kaldırıldı






