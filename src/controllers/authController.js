// controllers/authController.js
const { Users } = require("../models");
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    res.render('loginPage'); // login.ejs dosyasını render et
};




const users = [
    { username: '1@deu.edu.tr', password: '123456' },
    { username: '2@deu.edu.tr', password: '123456' },
    { username: '3@ogr.deu.edu.tr', password: '123456' },
    { username: '4@ogr.deu.edu.tr', password: '123456' },
    { username: '5@ogr.deu.edu.tr', password: '123456' },
    { username: '6@ogr.deu.edu.tr', password: '123456' },
    { username: '7@ogr.deu.edu.tr', password: '123456' }
];


exports.Auth = async (req, res) => {
    const { username, password } = req.body;
    const email = username; // Kullanıcı adı yerine e-posta adresi kullanıyoruz
    let user;

    try {
        const users = await Users.findOne({
            where: { KULLANICI_KODU: email,PAROLA: password },
        });

        if (!users) {
            console.log("Kullanıcı bulunamadı");
            return res.redirect('/login?error=true');
        }


        user = { name: username, role: '' };
        // E-posta adresinin öğrenci veya öğretmen uzantısına göre kullanıcıyı belirle
        if (/^[\w-.]+@ogr\.deu\.edu\.tr$/.test(email)) {
            user.role = 'ogr'; // Öğrenci
        } else if (/^[\w-.]+@deu\.edu\.tr$/.test(email)) {
            user.role = 'deu'; // Öğretim üyesi veya idari personel
        } else {
            // Geçersiz e-posta adresi
            console.log("Geçersiz e-posta adresi");
            return res.redirect('/login?error=true');
        }
    let user;

    try {
        const users = await users.findOne({
            where: { KULLANICI_KODU: email,PAROLA: password },
        });

        if (!users) {
            console.log("Kullanıcı bulunamadı");
            return res.redirect('/login?error=true');
        }


        user = { name: username, role: '' };
        // E-posta adresinin öğrenci veya öğretmen uzantısına göre kullanıcıyı belirle
        if (/^[\w-.]+@ogr\.deu\.edu\.tr$/.test(email)) {
            user.role = 'ogr'; // Öğrenci
        } else if (/^[\w-.]+@deu\.edu\.tr$/.test(email)) {
            user.role = 'deu'; // Öğretim üyesi veya idari personel
        } else {
            // Geçersiz e-posta adresi
            console.log("Geçersiz e-posta adresi");
            return res.redirect('/login?error=true');
        }

        // Kullanıcı bulundu ve rol belirlendi ise, oturumu başlat
        req.session.user = user;

        if (user.role == 'deu')
            res.redirect('/teacher-menu');
        else if (user.role == 'ogr')
            res.redirect('/home');
    } catch (error) {
        console.error("Doğrulama sırasında bir hata oluştu: ", error);
        return res.redirect('/login?error=true');
    }
};



exports.logout = (req, res) => {
    console.log("test")
    req.session.destroy(); // Oturumu sonlandır
    res.redirect('/');

};