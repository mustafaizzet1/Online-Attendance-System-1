// routes/courses.js

const express = require('express');
const router = express.Router();
const { checkTeacher} = require('../middlewares/AuthMiddleware');

const ogrlistController= require('../controllers/ogrlistController');

router.get('/student-list',checkTeacher,ogrlistController.ogrliste);

module.exports = router;  // Boşluklar kaldırıldı
