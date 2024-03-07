// routes/courses.js

const express = require('express');
const router = express.Router();
const helperController = require('../controllers/helperController');
const { checkTeacher } = require('../middlewares/AuthMiddleware');
router.get('/helper/courses/:id',checkTeacher, helperController.helper);
router.post('/helper/yoklamakatil',helperController.joinAttendance);
router.post('/helper/yoklamabaslat',helperController.startAttendance);
router.get('/baba/:id',helperController.yoklamasaati);
module.exports = router;  // Boşluklar kaldırıldı
