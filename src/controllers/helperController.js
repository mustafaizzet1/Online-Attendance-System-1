const studentLists = {
    "1206": [
        { id: '3', name: 'Şükrü Berk Öztaş', courseAttendance: '80%', labAttendance: '75%' },
        { id: '4', name: 'Tyler Durden', courseAttendance: '85%', labAttendance: '80%' }
    ],
    "4436": [
        { id: '3', name: 'Patrick Bateman', courseAttendance: '75%', labAttendance: '70%' },
        { id: '6', name: 'Kanye West', courseAttendance: '70%', labAttendance: '90%' }
    ]
};



var activeAttendances = {
    /*"csa4": { courseId: "1206", sessionId: 1, startTime: "5665465" }*/
};
var attendanceRecords = {
    /*"1206": {

        "1231316":
            ,
            [
                { id: '3', name: 'Şükrü Berk Öztaş' },
                { id: '4', name: 'Şükrü asdasdBerk Öztaş' }
            ]
        ,
        "132321": []

    },
    "4436": {}*/

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
};
exports.startAttendance = (req, res) => {
    const { courseId, type } = req.body; // POST ile gönderilen kurs ID'si ve ders tipi
    const startTime = new Date(); // Yoklama başlangıç zamanı
    const endTime = new Date(startTime.getTime() + 5 * 60000); // 5 dakika sonrası

    const randomCode = generateRandomCode(4); // Rastgele 4 haneli kod üret
    // `code` ekleniyor ve `type` da eklenmiş oluyor
    activeAttendances[randomCode] = { courseId:courseId, endTime:endTime,startTime:startTime, code: randomCode, type };

    // `attendanceRecords` için courseId kontrolü ve yeni yoklama kaydı ekleme
    if (!attendanceRecords[courseId]) {
        attendanceRecords[courseId] = {}; // courseId için yeni bir nesne oluştur
    }

    // Yoklamanın başladığı tarih (ISO formatında, sadece tarih kısmı)
    const attendanceStartTime = startTime;

    // Eğer bu tarih için yoklama kaydı yoksa, yeni bir kayıt oluştur
    if (!attendanceRecords[courseId][attendanceStartTime]) {
        attendanceRecords[courseId][attendanceStartTime] = {
            type: type,
            participants: [] // Katılımcı listesi için boş bir dizi oluşturuluyor
        };
    } else {
        // Eğer bu tarih için zaten bir kayıt varsa, sadece ders tipini güncelle (gerekirse)
        attendanceRecords[courseId][attendanceStartTime].type = type;
    }

    console.log(activeAttendances);
  

    res.status(200).json({ message: 'Yoklama başlatıldı', code: randomCode });
};



exports.joinAttendance = (req, res) => {
    const { code } = req.body; // POST ile gönderilen yoklama kodu
    const name = req.session.user.name;
    const [userPart, _] = name.split('@'); // domainPart kullanılmadığı için "_" ile gösterilmiştir.
    const studentId = userPart;

    // Kodu kullanarak aktif yoklamayı bul
    const attendanceEntry = activeAttendances[code];
    console.log(attendanceEntry,"---",code)

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

    const attendanceDate =attendanceEntry.startTime ;

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

exports.yoklamaSaatleriListesi = (req, res) => {
    const courseId = req.params.courseId;
    const attendanceDates = attendanceRecords[courseId];
    const responseDetails = {
        teorik: [],
        uygulama: []
    };

    // Dersin yoklama tarihleri ve saatleri varsa, detaylarını döndür
    if (attendanceDates) {
        
       

        Object.keys(attendanceDates).forEach(date => {
            const attendanceForDate = attendanceDates[date];
            const type = attendanceForDate.type; // Ders tipi: Teorik veya Uygulama


            // Ders tipine göre ayrı listelere ekle
            if (type === "Teorik") {

                responseDetails.teorik.push(date);
            } else if (type === "Uygulama") {
                responseDetails.uygulama.push(date);

            }
        });

        res.json(responseDetails);
    } else {
        res.status(404).json({ message: `Bu courseId (${courseId}) için yoklama kaydı bulunamadı.` });
    }
};

exports.yoklamaListesi = (req, res) => {
    const { courseId } = req.params;
    const dates =parseInt(req.params.date);
    var date = new Date(dates);
   
 
    const attendanceList = attendanceRecords[courseId] && attendanceRecords[courseId][date];
    console.log(date,attendanceList,attendanceRecords[courseId])
   
    if (attendanceList) {
        let responseDetails = studentLists[courseId].map(student => {
            // Öğrencinin yoklamada olup olmadığını kontrol et
            const isPresent = attendanceList.participants.some(participant => participant.id === student.id);
            return { ...student, attendance: isPresent };
        });

        res.json(responseDetails);
        console.log("--",responseDetails);
    } else {
        res.status(404).json({ message: `Bu courseId (${courseId}) ve tarih (${date}) için liste bulunamadı.` });
    }
};
