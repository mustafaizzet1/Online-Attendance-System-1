// Kullanıcı girişi için fonksiyon
exports.yoklama = (req, res) => {
   
  
    res.render('yoklama');
    

};



exports.startAttendance = (req, res) => {
    const { courseId, type, latitude, longitude,block} = req.body; // POST ile gönderilen kurs ID'si ve ders tipi

    console.log(latitude, "--", longitude)
    console.log("fasf",block)
    const startTime = new Date(); // Yoklama başlangıç zamanı
    const endTime = new Date(startTime.getTime() + 5 * 60000); // 5 dakika sonrası

    const randomCode = generateRandomCode(4); // Rastgele 4 haneli kod üret
    // `code` ekleniyor ve `type` da eklenmiş oluyor
    activeAttendances[randomCode] = { courseId: courseId, endTime: endTime, startTime: startTime, code: randomCode, type };

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




    res.status(200).json({ message: 'Yoklama başlatıldı', code: randomCode });
};