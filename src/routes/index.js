// routes/index.js

const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const HomePage = require('./studentHomePage'); // Eğer bu rota varsa ve kullanılacaksa

// Tüm alt rotaları burada birleştirin
router.use(authRoutes);
router.use(HomePage); // Eğer bu rota varsa ve kullanılacaksa
const courses = require('./courses');
const qrGenerator= require('./qrGenerator')
const qrRoutes= require('./qrRoutes')
const coursedetail=require('./course-details');
router.use(coursedetail);
const yoklama=require('./yoklama');
router.use(yoklama);
const yoklama_sayfasi=require('./yoklama-sayfasi');
router.use(yoklama_sayfasi);
const yoklamalistesi=require('./yoklama-listesi');
router.use(yoklamalistesi);
const studentlist=require('./student-list');
router.use(studentlist);
const teachermenu=require('./lecturerHomePage');
router.use(teachermenu);


// Tüm alt rotaları burada birleştirin
router.use(authRoutes);
router.use(courses);
router.use(qrGenerator);
router.use(qrRoutes);
module.exports = router;  // Boşluklar kaldırıldı
