// Kullanıcı girişi için fonksiyon
exports.studentHomePage = (req, res) => {
    const studentCourses = [
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

    res.render('studentHomePage', { studentCourses: studentCourses });

};