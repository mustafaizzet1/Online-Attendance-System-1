// Kullanıcı girişi için fonksiyon
const { Studentlist, Lectureinfo, Branch, Lecture, Session, Attendancelist } = require("..//models")
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
  const studentId = userPart;
  const studentCourses = [];
  const studentCoursess = [];

  const studentlistIds = await Studentlist.findAll({
    where: { OGRENCI_NO: studentId },
    include: [{
      model: Lectureinfo,
      include: [{
        model: Lecture
      }]
    }]
  });


  for (const element of studentlistIds) {
    const branchnames = await Branch.findOne({
      where: { 
        SUBE_KODU: element.Lectureinfo.SUBE_KODU,
        OGR_BIRIM_KODU:  element.Lectureinfo.OGR_BIRIM_KODU }
 
    });
    studentCoursess.push(branchnames); // Örnek bir ekleme işlemi
  }

  for (const element of studentlistIds) {
    const sessions = await Session.findAll({
      where: { LectureinfoId: element.LectureinfoId },
      include: [{
        model: Attendancelist,
        where: { StudentlistId: element.id }, // `Attendancelist`'te `StudentlistId` koşulu
        required: false // Bu koşulu sağlamayan sessionlar da dahil edilsin istiyorsanız
      }]
    });
  
    // `sessions` üzerinde işlem yapabilirsiniz, örneğin onları bir listeye ekleyebilirsiniz
    studentCourses.push(...sessions); // Örnek bir ekleme işlemi
  }
  const studentCoursesFormatted = studentlistIds.map((studentlistId) => {
    const { Lectureinfo } = studentlistId;
  
    // Şube adını bul
    const sube = studentCoursess.find(sube => sube.SUBE_KODU === Lectureinfo.SUBE_KODU && sube.OGR_BIRIM_KODU === Lectureinfo.OGR_BIRIM_KODU);
    const subeAdi = sube ? sube.SUBE_ADI : 'Bilinmiyor';
  
    const courseAttendances = studentCourses.filter(course => course.LectureinfoId === Lectureinfo.id)
      .flatMap(course => course.Attendancelists.map(attendance => ({
        date: new Date(attendance.createdAt).toLocaleDateString("en-US"),
        type: course.sessiontype,
        attended: attendance.absence !== 0
      })));
  
    return {
      name: `${Lectureinfo.Lecture.DERS_ADI} - ${subeAdi}`, // Ders adının yanına şube adını da ekle
      attendances: courseAttendances
    };
  });
  

  /* 
  [
   {
       "lectureinfo": {
           "id": 31,
           "OGRENCI_NO": "2018510145",
           "AD": "Ömer Faruk",
           "SOYAD": "KESKİN",
           "CINSIYET": "Erkek",
           "createdAt": "2024-03-17T19:01:30.000Z",
           "updatedAt": "2024-03-17T19:01:30.000Z",
           "LectureinfoId": 5,
           "Lectureinfo": {
               "id": 5,
               "createdAt": "2024-03-15T21:46:57.000Z",
               "updatedAt": "2024-03-15T21:46:57.000Z",
               "SUBE_KODU": 1,
               "OGR_BIRIM_KODU": 132,
               "DERS_KODU": 5887,
               "OGRETIM_DONEMI_KODU": 303,
               "KULLANICI_KODU": "mehmet.ozcanhan@deu.edu.tr",
               "Lecture": {
                   "DERS_KODU": 5887,
                   "DERS_OZEL_KODU": "CSE 5094",
                   "DERS_ADI": "Foundations of Internet of Everything",
                   "createdAt": "2024-03-15T21:46:57.000Z",
                   "updatedAt": "2024-03-15T21:46:57.000Z"
               }
           }
       },
       "branch": {
           "SUBE_KODU": 1,
           "OGR_BIRIM_KODU": 132,
           "SUBE_ADI": "1.Şube",
           "createdAt": "2024-03-15T21:46:57.000Z",
           "updatedAt": "2024-03-15T21:46:57.000Z"
       }
   },
   {
       "lectureinfo": {
           "id": 32,
           "OGRENCI_NO": "2018510145",
           "AD": "Ömer Faruk",
           "SOYAD": "KESKİN",
           "CINSIYET": "Erkek",
           "createdAt": "2024-03-17T19:02:35.000Z",
           "updatedAt": "2024-03-17T19:02:35.000Z",
           "LectureinfoId": 2,
           "Lectureinfo": {
               "id": 2,
               "createdAt": "2024-03-15T21:46:57.000Z",
               "updatedAt": "2024-03-15T21:46:57.000Z",
               "SUBE_KODU": 5,
               "OGR_BIRIM_KODU": 1210,
               "DERS_KODU": 4082,
               "OGRETIM_DONEMI_KODU": 303,
               "KULLANICI_KODU": "mehmet.ozcanhan@deu.edu.tr",
               "Lecture": {
                   "DERS_KODU": 4082,
                   "DERS_OZEL_KODU": "CME 4202",
                   "DERS_ADI": "SENIOR PROJECT",
                   "createdAt": "2024-03-15T21:46:57.000Z",
                   "updatedAt": "2024-03-15T21:46:57.000Z"
               }
           }
       },
       "branch": {
           "SUBE_KODU": 5,
           "OGR_BIRIM_KODU": 1210,
           "SUBE_ADI": "5.Şube",
           "createdAt": "2024-03-15T21:46:57.000Z",
           "updatedAt": "2024-03-15T21:46:57.000Z"
       }
   }
]*/
  if (req.session.user) {

       res.render('studentHomePage', { studentCourses: studentCoursesFormatted, baba: null });

   } else {
       res.redirect('/');
   }

};