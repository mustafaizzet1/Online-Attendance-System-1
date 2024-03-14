// Kullanıcı girişi için fonksiyon
const { Lecture, Lectureinfo, Branch } = require("../models");

exports.teacher = (req, res) => {


    res.render('teacher-menu', { name: req.session.user.KULLANICI_KODU });


};
let OGRETIM_DONEMI_KODU = 303;


exports.courses = async (req, res) => {
    try {
        // Fetch Lectureinfos
        const lectureinfos = await Lectureinfo.findAll({
            where: { OGRETIM_DONEMI_KODU: OGRETIM_DONEMI_KODU, KULLANICI_KODU: "mehmet.ozcanhan@deu.edu.tr" },
            include: [
                { 
                    model: Lecture
                }
            ]
        });

        // Fetch corresponding Branch information based on matching SUBE_KODU and OGR_BIRIM_KODU
        const lectureinfosWithBranch = await Promise.all(lectureinfos.map(async (lectureinfo) => {
            const branch = await Branch.findOne({
                where: {
                    SUBE_KODU: lectureinfo.SUBE_KODU,
                    OGR_BIRIM_KODU: lectureinfo.OGR_BIRIM_KODU,
                   // Additional condition if needed
                }
            });
            return {
                lectureinfo,
                branch
            };
        }));

        res.json(lectureinfosWithBranch);
    } catch (error) {
        res.status(404).json({ message: 'Error occurred' });
    }
};

