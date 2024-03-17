// routes/courses.js

const express = require('express');
const router = express.Router();
const helperController = require('../controllers/helperController');
const { checkTeacher } = require('../middlewares/AuthMiddleware');




router.get('/helper/liste/:courseId',helperController.yoklamaListesi);
module.exports = router;  // Boşluklar kaldırıldı
