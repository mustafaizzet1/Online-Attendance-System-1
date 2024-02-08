// controllers/authController.js

exports.login = (req, res) => {
    res.render('loginPage'); // login.ejs dosyasını render et
};




const users = [
    { username: '1@deu.edu.tr', password: '123456' },
    { username: '2@deu.edu.tr', password: '123456' },
    { username: '3@ogr.deu.edu.tr', password: '123456' },
    { username: '4@ogr.deu.edu.tr', password: '123456' }
];

exports.Auth = (req, res) => {
    const { username, password } = req.body;
    const email = username; // Kullanıcı adı yerine e-posta adresi kullanıyoruz
    const user = {};

    // E-posta adresinin öğrenci veya öğretmen uzantısına göre kullanıcıyı belirle
    if (/^[\w-]+@ogr\.deu\.edu\.tr$/.test(email)) {
        user.role = 'ogr';
    } else if (/^[\w-]+@deu\.edu\.tr$/.test(email)) {
        user.role = 'deu';
    } else {
        // Geçersiz e-posta adresi
        console.log("Geçersiz e-posta adresi");
        return res.redirect('/login?error=true');
    }

    // Diğer kullanıcı bilgileri kontrolü (örneğin, şifre) burada devam eder

    // Kullanıcı bulundu ve rol belirlendi ise, oturumu başlat
    req.session.user = user;
    res.redirect('/home');
};


exports.logout = (req, res) => {
    console.log("test")
    req.session.destroy(); // Oturumu sonlandır
    res.redirect('/');
  
};