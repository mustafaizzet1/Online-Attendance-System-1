// Kullanıcı girişi için fonksiyon
const { Studentlist, Lectureinfo,Branch } = require("..//models")
exports.studentHomePage = async (req, res) => {
  /*  const studentCourses = [
        {
            name: "Data Structures", attendances: [
                { date: "2024-02-05", type: "Teorik", attended: true },
                { date: "2024-02-12", type: "Uygulama", attended: false },
                { date: "2024-02-05", type: "Teorik", attended: true },
                { date: "2024-02-12", type: "Uygulama", attended: false },
            ]
        },
        { name: "Sofware Engineering" },
        { name: "Data Mining" },
        { name: "Machine Learning" }
    ];
*/
const name = req.session.user.KULLANICI_KODU;
const [userPart, _] = name.split('@'); // domainPart kullanılmadığı için "_" ile gösterilmiştir.
const studentId = userPart;const studentCourses =[]
try {
    // Öğrenci numarasına göre Studentlist'ten LectureinfoId'yi bul
    const studentListEntry = await Studentlist.findOne({
      where: { OGRENCI_NO: studentId },
      include: [{
        model: Lectureinfo,
        
      }]
    });

    if (studentListEntry) {
      console.log('Join işlemi sonucu bulunan veri:', studentListEntry);
    } else {
      console.log('Belirtilen öğrenci numarasına sahip bir kayıt bulunamadı.');
      return null; // Kayıt bulunamadı
    }
  } catch (error) {
    console.error('Join işlemi sırasında bir hata oluştu:', error);
    throw error; // Hata yönetimi
  }
console.log(courses);
    if (req.session.user) {

        res.render('studentHomePage', { studentCourses: studentCourses, baba: null });

    } else {
        res.redirect('/');
    }

};