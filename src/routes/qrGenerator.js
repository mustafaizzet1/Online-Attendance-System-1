// routes/getRoutes.js
const express = require('express');
const router = express.Router();


// routes/authRoutes.js

const qrController = require('../controllers/qrGeneratorController');
const { checkTeacher} = require('../middlewares/AuthMiddleware');

router.get('/qrGenerator', checkTeacher, qrController.createdqr);

module.exports = router;  // Boşluklar kaldırıldı






