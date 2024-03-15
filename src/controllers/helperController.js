const studentLists = {
    "1206": [
        { id: '3', name: 'Şükrü Berk Öztaş', courseAttendance: '80%', labAttendance: '75%' },
        { id: '4', name: 'Mustafa İzzet Yumuşak', courseAttendance: '85%', labAttendance: '80%' },
        { id: '5', name: 'Ömer Faruk Keskin', courseAttendance: '85%', labAttendance: '80%' },
        { id: '6', name: 'Mustafa Efe Demir', courseAttendance: '85%', labAttendance: '80%' },
        { id: '7', name: 'Ramazan Hakan Cankul', courseAttendance: '85%', labAttendance: '80%' }
    ],
    "4436": [
        { id: '3', name: 'Şükrü Berk Öztaş', courseAttendance: '80%', labAttendance: '75%' },
        { id: '4', name: 'Mustafa İzzet Yumuşak', courseAttendance: '85%', labAttendance: '80%' },
        { id: '5', name: 'Ömer Faruk Keskin', courseAttendance: '85%', labAttendance: '80%' },
        { id: '6', name: 'Mustafa Efe Demir', courseAttendance: '85%', labAttendance: '80%' },
        { id: '7', name: 'Ramazan Hakan Cankul', courseAttendance: '85%', labAttendance: '80%' }
    ]
};



var activeAttendances = {
    /*"csa4": { courseId: "1206", sessionId: 1, startTime: "5665465" }*/
};
var attendanceRecords = {
    "1206": {

        'Fri Mar 06 2024 12:23:09 GMT+0300 (GMT+03:00)': {
            type: 'Teorik', participants: [

                { id: '3', name: 'Şükrü Berk Öztaş' },
                { id: '4', name: 'Mustafa İzzet Yumuşak' },
                { id: '5', name: 'Ömer Faruk Keskin' },
                { id: '6', name: 'Mustafa Efe Demir' }
            ]
        },
        'Fri Mar 03 2024 12:23:09 GMT+0300 (GMT+03:00)': {
            type: 'Teorik', participants: [

                { id: '3', name: 'Şükrü Berk Öztaş' },
                { id: '4', name: 'Mustafa İzzet Yumuşak' },
                { id: '5', name: 'Ömer Faruk Keskin' },
                { id: '6', name: 'Mustafa Efe Demir' }
            ]
        },
        'Fri Mar 01 2024 12:23:09 GMT+0300 (GMT+03:00)': {
            type: 'Uygulama', participants: [

                { id: '3', name: 'Şükrü Berk Öztaş' },
                { id: '4', name: 'Mustafa İzzet Yumuşak' },
                { id: '5', name: 'Ömer Faruk Keskin' },
                { id: '6', name: 'Mustafa Efe Demir' }
            ]
        }

    }, "4436": {

        'Fri Mar 06 2024 12:23:09 GMT+0300 (GMT+03:00)': {
            type: 'Teorik', participants: [

                { id: '3', name: 'Şükrü Berk Öztaş' },
                { id: '4', name: 'Mustafa İzzet Yumuşak' },
                { id: '5', name: 'Ömer Faruk Keskin' },
                { id: '6', name: 'Mustafa Efe Demir' }
            ]
        },
        'Fri Mar 03 2024 12:23:09 GMT+0300 (GMT+03:00)': {
            type: 'Uygulama', participants: [

                { id: '3', name: 'Şükrü Berk Öztaş' },
                { id: '4', name: 'Mustafa İzzet Yumuşak' },
                { id: '5', name: 'Ömer Faruk Keskin' },
                { id: '6', name: 'Mustafa Efe Demir' }
            ]
        },
        'Fri Mar 01 2024 12:23:09 GMT+0300 (GMT+03:00)': {
            type: 'Teorik', participants: [

                { id: '3', name: 'Şükrü Berk Öztaş' },
                { id: '4', name: 'Mustafa İzzet Yumuşak' },
                { id: '5', name: 'Ömer Faruk Keskin' },
                { id: '6', name: 'Mustafa Efe Demir' }
            ]
        }

    }

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
    const dates = parseInt(req.params.date);
    var date = new Date(dates);


    const attendanceList = attendanceRecords[courseId] && attendanceRecords[courseId][date];
    console.log(date, attendanceList, attendanceRecords[courseId])

    if (attendanceList) {
        let responseDetails = studentLists[courseId].map(student => {
            // Öğrencinin yoklamada olup olmadığını kontrol et
            const isPresent = attendanceList.participants.some(participant => participant.id === student.id);
            return { ...student, attendance: isPresent };
        });

        res.json(responseDetails);
        console.log("--", responseDetails);
    } else {
        res.status(404).json({ message: `Bu courseId (${courseId}) ve tarih (${date}) için liste bulunamadı.` });
    }
};
