// routes/courses.js

const express = require('express');
const router = express.Router();
const { checkTeacher} = require('../middlewares/AuthMiddleware');

const yoklamaController= require('../controllers/yoklamaController');

router.get('/yoklama',checkTeacher,yoklamaController.yoklama);//
router.post('/yoklama/yoklamabaslat',yoklamaController.startAttendance);
router.post('/yoklama/yoklamakatil',yoklamaController.joinAttendance);
router.get('/yoklama/:courseId',yoklamaController.yoklamaSaatleriListesi);

module.exports = router;  // Boşluklar kaldırıldı
