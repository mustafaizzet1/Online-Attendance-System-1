// Kullanıcı girişi için fonksiyon
const { Session } = require("../models");
exports.yoklama = (req, res) => {
   
  
    res.render('yoklama');
    

};
function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};


exports.startAttendance = async (req, res) => {
    const { courseId, type, latitude, longitude,block,lectureinfoid,status} = req.body; // POST ile gönderilen kurs ID'si ve ders tipi
    console.log(lectureinfoid)
    await Session.create({
        duration: block,
        sessiontype:type,
        latitude:latitude,
        longitude:longitude,
        active:1,
        status:status,
        createdby:req.session.user.KULLANICI_KODU,
        LectureinfoId:lectureinfoid
      });


    const startTime = new Date(); // Yoklama başlangıç zamanı
    const endTime = new Date(startTime.getTime() + 5 * 60000); // 5 dakika sonrası

    const randomCode = generateRandomCode(4); // Rastgele 4 haneli kod üret
    // `code` ekleniyor ve `type` da eklenmiş oluyor
    




    res.status(200).json({ message: 'Yoklama başlatıldı', code: randomCode });
};