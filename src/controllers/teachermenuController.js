// Kullanıcı girişi için fonksiyon
var name = ["","Doç. Dr. Sümeyye BAŞKAN","ORD. PROF. DR. Ramazan Hakan CANKUL"]
exports.teacher = (req, res) => {
   
  
    res.render('teacher-menu', {name:name[req.session.user.name[0]]});
    

};