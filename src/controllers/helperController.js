const studentLists = {
    "1206": [
        { id: '3', name: 'Şükrü Berk Öztaş', courseAttendance: '80%', labAttendance: '75%' },
        { id: '4', name: 'Tyler Durden', courseAttendance: '85%', labAttendance: '80%' }
    ],
    "4436": [
        { id: '5', name: 'Patrick Bateman', courseAttendance: '75%', labAttendance: '70%' },
        { id: '6', name: 'Kanye West', courseAttendance: '70%', labAttendance: '90%' }
    ]
};



var activeAttendances = {
    "csa4": { lectureId: "1206", sessionId: 1, startTime: ""}
};
var attendanceRecords = {
    "1206": {

        1: {
            time: "12121",
            yoklelsit:
                [
                    { id: '3', name: 'Şükrü Berk Öztaş' },
                    { id: '4', name: 'Şükrü asdasdBerk Öztaş' }
                ]
        }

    },
    "4436": {}

};




exports.helper = (req, res) => {
    const studentListId = req.params.id.toString(); // URL'den gelen öğrenci listesi kimliğini al ve sayıya çevir

    const studentList = studentLists[studentListId]; // Öğrenci listesini al
    if (studentList) {
        res.json(studentList); // Öğrenci listesini JSON olarak dön
    } else {
        res.status(404).json({ message: 'Öğrenci listesi bulunamadı' }); // Öğrenci listesi bulunamadığında 404 hatası dön
    }
};

function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.startAttendance = (req, res) => {
    const courseId = req.body.courseId; // POST ile gönderilen kurs ID'si
    const startTime = new Date(); // Yoklama başlangıç zamanı
    const endTime = new Date(startTime.getTime() + 5 * 60000); // 5 dakika sonrası

    const randomCode = generateRandomCode(4); // Rastgele 4 haneli kod üret
    const attendanceId = randomCode; // Kurs ID'si yerine kullan

    activeAttendances[attendanceId] = { courseId, endTime, code: randomCode };

    res.status(200).json({ message: 'Yoklama başlatıldı', code: randomCode }); // Kurs ID'si yerine kodu döndür
};


exports.joinAttendance = (req, res) => {
    const { code } = req.body; // POST ile gönderilen yoklama kodu ve öğrenci ID'si
    const name = req.session.user.name;
    const [userPart, domainPart] = name.split('@');
    const studentId = userPart;
    // Kodu kullanarak aktif yoklamayı bul
    const attendanceEntry = Object.values(activeAttendances).find(entry => entry.code === code);

    if (!attendanceEntry) {
        return res.status(400).json({ message: 'Aktif yoklama bulunamadı veya süresi doldu.' });
    }

    const now = new Date();
    if (now > attendanceEntry.endTime) {
        // Yoklama süresi dolduysa, katılım kabul edilmez
        return res.status(400).json({ message: 'Yoklama süresi doldu.' });
    }

    // Yoklama süresi içinde ve öğrenci kayıtlıysa katılımı kaydet
    const { courseId } = attendanceEntry;
    if (studentLists[courseId] && studentLists[courseId].some(student => student.id === studentId)) {
        // Yoklama kayıtlarına öğrenci katılımını ekle
        const attendanceId = Object.keys(activeAttendances).find(key => activeAttendances[key].code === code);
        if (!attendanceRecords[attendanceId]) {
            attendanceRecords[attendanceId] = [];
        }
        attendanceRecords[attendanceId].push({ studentId, time: now });
        console.log(activeAttendances)
        console.log(attendanceRecords)
        res.status(200).json({ message: 'Yoklamaya katılım kaydedildi.' });

    } else {
        // Öğrenci kursa kayıtlı değilse
        res.status(404).json({ message: 'Öğrenci bu kurs için kayıtlı değil.' });
    }
};

exports.yoklamasaati = (req, res) => {

    const code = req.params.id;
    const attendanceDetails = attendanceRecords[code];

    // attendanceDetails varsa, katılım detaylarını döndür
    if (attendanceDetails) {
        const responseDetails = attendanceDetails.map(detail => {
            // Öğrenci detaylarını studentLists'ten al
            const studentDetail = studentLists[activeAttendances[code].courseId].find(student => student.id === detail.studentId);
            return {
                studentId: detail.studentId,
                name: studentDetail ? studentDetail.name : "Bilinmeyen Öğrenci",
                time: detail.time,
            };
        });

        res.json(responseDetails);
    } else {
        res.status(404).send(`Bu kod için yoklama kaydı bulunamadı.`);
    }
};