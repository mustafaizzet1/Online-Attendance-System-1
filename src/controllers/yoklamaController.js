// Kullanıcı girişi için fonksiyon
const { Session, Studentlist, Attendancelist } = require("../models");
exports.yoklama = (req, res) => {


    res.render('yoklama');


};
function generateRandomCode(length, sessionid) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    activeQRCode[sessionid] = result;
    return result;
};

exports.joinAttendance = async (req, res) => {
    const { longitude, latitude, sessionCode } = req.body; // POST ile gönderilen yoklama kodu
    const name = req.session.user.KULLANICI_KODU;
    const [userPart, _] = name.split('@'); // domainPart kullanılmadığı için "_" ile gösterilmiştir.
    const studentId = userPart;

    // Öğrenci numarasına göre Studentlist kayıtlarını bul
    const studentLists = await Studentlist.findOne({
        where: { OGRENCI_NO: studentId }
    });
    console.log("fvgsfvbsbfsgb", studentId)
    var sessionId = null;
    console.log(studentLists);
    console.log("+++++++++ studentLists.LectureinfoId:", studentLists.LectureinfoId);
    try {
        for (const session_id of Object.keys(activeQRCode)) {
            if (activeQRCode[session_id] === sessionCode) {
                sessionId = session_id;
            }
        }
        const sessionLectureinfoId = await Session.findOne({
            where: { id: sessionId }
        });
        console.log("+++++++++++ sessionid:", sessionId);

        console.log("+++++++++++ sessionLectureinfoId.LectureinfoId:", sessionLectureinfoId.LectureinfoId);

        console.log("+++++++++++ studentLists.LectureinfoId:", studentLists.LectureinfoId);

        if (sessionLectureinfoId.LectureinfoId === studentLists.LectureinfoId) {
            console.log("Bu öğrenci bu derse kayıtlıdır.");
        } else {
            console.log("Bu öğrenci bu derse kayıtlı değildir.");
            res.status(405).json({ message: 'Kendi dersine git.' });
            return;
        }
    } catch {
        console.log("kanka nabıyon");
        res.status(401).json({ message: 'Bu kodla aktif yoklama bulunmamaktadır.' });
        return;
    }
    if (!await gps_check(sessionId, latitude, longitude)) {
        res.status(402).json({ message: 'Sınıfta değilmişim.' });
        return;
    }
    //öğrenci yoklamaya kayıtlı mı
    try {
        // Belirli bir sessionId ve studentId ile eşleşen kaydı ara
        const record = await Attendancelist.findOne({
            where: {
                Sessionid: sessionId, // Tablonuzda Session ID'yi tutan sütunun adı
                StudentlistOGRENCINO: studentId // Öğrenci numarasını tutan sütunun adı
            }
        });

        if (!record) {
            console.log('Kayıt bulundu:', record);
        } else {
            res.status(403).json({ message: 'Zaten giriş yaptın knk' });
            return; // Kayıt bulunamadı
        }
    } catch (error) {
        console.error('Kayıt kontrolü sırasında bir hata oluştu:', error);
        throw error; // Hata yönetimi
    }
    try {
        const newAttendance = await Attendancelist.create({
            Sessionid: sessionId, // Session ID
            StudentlistOGRENCINO: studentId, // Öğrenci ID
            absence: 1,
            latitude: latitude,
            longitude: longitude,
            SubmissionTypeId: 2

        });
        res.status(201).json(newAttendance); // Başarılı bir şekilde oluşturulan kaydı döndür
    } catch (error) {
        console.error('Attendancelist kaydı oluşturulurken bir hata oluştu:', error);
        res.status(500).send('Sunucu hatası');
    }





    //res.status(200).json({ message: 'Yoklamaya katılım kaydedildi.' });
};
async function gps_check(sessionId, latitude, longitude) {
    const session = await Session.findOne({
        where: { id: sessionId }
    });
    const R = 6371e3; // Dünyanın ortalama yarıçapı metre cinsinden
    const φ1 = session.latitude * Math.PI / 180; // φ, λ radyan cinsinden
    const φ2 = latitude * Math.PI / 180;
    const Δφ = (latitude - session.latitude) * Math.PI / 180;
    const Δλ = (longitude - session.longitude) * Math.PI / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Metre cinsinden mesafe
    return distance <= 3; // 3 metre veya daha az mı

};
/* function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Dünyanın ortalama yarıçapı metre cinsinden
    const φ1 = lat1 * Math.PI/180; // φ, λ radyan cinsinden
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = R * c; // Metre cinsinden mesafe
    return distance;
}

function isWithin3Meters(lat1, lon1, lat2, lon2) {
    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    return distance <= 3; // 3 metre veya daha az mı
}

// Örnek kullanım:
const lat1 = 51.5074;
const lon1 = -0.1278;
const lat2 = 51.5075; // Yaklaşık olarak lat1 ve lon1'e çok yakın bir nokta
const lon2 = -0.1279;

if (isWithin3Meters(lat1, lon1, lat2, lon2)) {
    console.log('Belirtilen nokta, 3 metre içinde.');
} else {
    console.log('Belirtilen nokta, 3 metre dışında.');
}*/


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
    const { courseId, type, latitude, longitude, block, lectureinfoid, status } = req.body; // POST ile gönderilen kurs ID'si ve ders tipi
    console.log(lectureinfoid)
    const session = await Session.create({//
        duration: block,
        sessiontype: type,
        latitude: latitude,
        longitude: longitude,
        active: 1,
        status: status,
        createdby: req.session.user.KULLANICI_KODU,
        LectureinfoId: lectureinfoid
    });


    const startTime = new Date(); // Yoklama başlangıç zamanı
    const endTime = new Date(startTime.getTime() + 5 * 60000); // 5 dakika sonrası

    const sessionId = session.id;


    const randomCode = generateRandomCode(4, sessionId); // Rastgele 4 haneli kod üret
    // `code` ekleniyor ve `type` da eklenmiş oluyor

    console.log(sessionId)

    activeQRCode[sessionId] = randomCode;
    console.log("+++++++", activeQRCode)

    res.status(200).json({ message: 'Yoklama başlatıldı', code: randomCode, sessionId });
    setTimeout(() => expireSession(sessionId), 150000);
};

var activeQRCode = {};

async function expireSession(sessionId) {
    delete activeQRCode[sessionId];
    console.log("------", "iyisiiiinnn", sessionId);
    try {
        const result = await Session.update(
            { active: 0 }, // Güncellenecek alan ve değer
            { where: { id: sessionId } } // Güncelleme koşulu
        );

        console.log(`${result} sessions were deactivated.`);
    } catch (error) {
        console.error('An error occurred while updating sessions:', error);
    }
};