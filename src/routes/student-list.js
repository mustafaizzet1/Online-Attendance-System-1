// routes/courses.js

const express = require('express');
const router = express.Router();
const { checkStudent} = require('../middlewares/AuthMiddleware');

const ogrlistController= require('../controllers/ogrlistController');

router.get('/student-list',checkStudent,ogrlistController.ogrliste);

module.exports = router;  // Boşluklar kaldırıldı
