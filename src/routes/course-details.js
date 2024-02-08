// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const coursedetailController = require('../controllers/coursedetailController');
const { checkStudent } = require('../middlewares/AuthMiddleware');

router.get('/course-details',checkStudent,coursedetailController.coursedetail);

module.exports = router;  // Boşluklar kaldırıldı
