
// Kullanıcı girişi için fonksiyon
exports.login = (req, res) => {
    const ders = "fizk";
    const bolum = "pc";
    res.render('index', {ders:ders,bolum:bolum});
};

// Kullanıcı giriş işlemi
exports.loginPost = (req, res) => {
    const name = "omer";
    const surname = "keskin"
    res.render('test', {name:name,surname:surname});
};

