// Kullanıcı girişi için fonksiyon
const { Lecture, Lectureinfo } = require("../models");

exports.teacher = (req, res) => {


    res.render('teacher-menu', { name:req.session.user.KULLANICI_KODU});


};
let OGRETIM_DONEMI_KODU = 303;


exports.courses = async (req, res) => {
    try {
    

        const lectureinfos = await Lectureinfo.findAll({
            where: { OGRETIM_DONEMI_KODU: OGRETIM_DONEMI_KODU, KULLANICI_KODU: req.session.user.KULLANICI_KODU },
            include: [{
                model: Lecture // 'Lecture' modelini include edin, 'as' opsiyonunu kaldırdık
            }]
        });
        
        res.json(lectureinfos);
    } catch (error) {
        res.status(404).json({ message: 'Naneyi yidin' });
    }
};