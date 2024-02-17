// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const coursedetailController = require('../controllers/coursedetailController');
const { checkTeacher } = require('../middlewares/AuthMiddleware');

router.get('/course-details',checkTeacher,coursedetailController.coursedetail);

module.exports = router;  // Boşluklar kaldırıldı
