// Kullanıcı girişi için fonksiyon
const { Lecture, Lectureinfo, Branch } = require("../models");

exports.teacher = (req, res) => {


    res.render('teacher-menu', { name: req.session.user.KULLANICI_KODU });


};
let OGRETIM_DONEMI_KODU = 303;


exports.courses = async (req, res) => {
    try {


        const lectureinfos = await Lectureinfo.findAll({
            where: { OGRETIM_DONEMI_KODU: OGRETIM_DONEMI_KODU, KULLANICI_KODU: "mehmet.ozcanhan@deu.edu.tr" }, //req.session.user.KULLANICI_KODU },
            include: [
                { 
                    model: Lecture, // Include Lecture model first
                   
                    include: [
                        { model: Branch } // Then include Branch model within Lecture
                    ]
                }
            ]
        });





        res.json(lectureinfos);
    } catch (error) {
        res.status(404).json({ message: 'Naneyi yidin' });
    }
};