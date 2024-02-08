// routes/getRoutes.js
const express = require('express');
const router = express.Router();


// routes/authRoutes.js

const qrController = require('../controllers/qrController');
const { checkStudent} = require('../middlewares/AuthMiddleware');

router.get('/qrcode', checkStudent, qrController.createdqr);

module.exports = router;  // Boşluklar kaldırıldı






