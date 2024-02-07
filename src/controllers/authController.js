// controllers/authController.js

const surnamevaliditor = require('../validations/authControllerValidation')
// Kullanıcı girişi için fonksiyon
exports.login = (req, res) => {
    const surname = surnamevaliditor( req.body.nsurnmae);
    const name = "omer";
    res.render('index', {name:name});
};

// Kullanıcı giriş işlemi
exports.loginPost = (req, res) => {
    const name = "test";
    res.render('test', {name:name});
};

// Kullanıcı kaydı için fonksiyon
exports.register = (req, res) => {
    res.render('register');
};

// Kullanıcı kayıt işlemi
exports.registerPost = (req, res) => {
    // Kullanıcı kayıt işlemleri burada yapılır
    // Örneğin, kullanıcı bilgilerini veritabanına kaydetme
    // Kayıt başarılıysa, kullanıcıya yönlendirme yapma veya başka bir işlem
};

// Kullanıcı çıkış işlemi
exports.logout = (req, res) => {
    // Kullanıcı çıkış işlemleri burada yapılır
    // Örneğin, oturum bilgilerini temizleme
    // Çıkış sonrası kullanıcıya yönlendirme yapma
};
