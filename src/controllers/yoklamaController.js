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

exports.joinAttendance = (req, res) => {
    const { code } = req.body; // POST ile gönderilen yoklama kodu
    const name = req.session.user.name;
    const [userPart, _] = name.split('@'); // domainPart kullanılmadığı için "_" ile gösterilmiştir.
    const studentId = userPart;

    // Kodu kullanarak aktif yoklamayı bul
    const attendanceEntry = activeAttendances[code];
    console.log(attendanceEntry, "---", code)

    if (!attendanceEntry) {
        return res.status(404).json({ message: 'Bu kod ile ilişkilendirilmiş bir yoklama bulunamadı.' });
    }

    const now = new Date();
    const endTime = new Date(attendanceEntry.endTime);
    if (now > endTime) {
        return res.status(400).json({ message: 'Yoklama süresi doldu.' });
    }

    const courseId = attendanceEntry.courseId;
    // Öğrenci kaydını kontrol et
    if (!(studentLists[courseId] && studentLists[courseId].some(student => student.id === studentId))) {
        return res.status(404).json({ message: 'Öğrenci bu kurs için kayıtlı değil.' });
    }

    const attendanceDate = attendanceEntry.startTime;

    console.log(attendanceDate)
    if (!attendanceRecords[courseId]) {
        attendanceRecords[courseId] = {}; // Eğer courseId için bir kayıt yoksa, yeni bir obje oluştur
    }

    if (!attendanceRecords[courseId][attendanceDate]) {
        // Eğer o tarih için bir kayıt yoksa, katılımcı listesi ile birlikte yeni bir kayıt oluştur
        attendanceRecords[courseId][attendanceDate] = { type: attendanceEntry.type, participants: [] };
    }

    // Yoklama kaydına öğrenci katılımını ekle
    attendanceRecords[courseId][attendanceDate].participants.push({ id: studentId, name: name, time: now.toISOString() });

    console.log(attendanceRecords);
    res.status(200).json({ message: 'Yoklamaya katılım kaydedildi.' });
};



exports.yoklamaSaatleriListesi = async(req, res) => {
    const courseId = req.params.courseId;

    const listOfSession = await Session.findAll({
        where: { LectureinfoId: courseId },
    });
    
    const responseDetails = {
        teorik: [],
        uygulama: []
    };

    // Dersin yoklama tarihleri ve saatleri varsa, detaylarını döndür
   



  

   listOfSession.forEach(session => {
    // Ders tipine göre ayrı listelere ekle
    if (session.sessiontype === "Teorik") {
        responseDetails.teorik.push([session.createdAt,session.id]);
    } else if (session.sessiontype === "Uygulama") {
        responseDetails.uygulama.push([session.createdAt,session.id]);
    }
});

res.json(responseDetails);
    

};

exports.startAttendance = async (req, res) => {
    const { courseId, type, latitude, longitude,block,lectureinfoid,status} = req.body; // POST ile gönderilen kurs ID'si ve ders tipi
    console.log(lectureinfoid)
   const session= await Session.create({
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
    const sessionId = session.id;
  
    console.log(sessionId)




    res.status(200).json({ message: 'Yoklama başlatıldı', code: randomCode,sessionId});
};