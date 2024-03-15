const Session = require("../models/Session");
const { Attendancelist} = require("../models");
const { Studentlist } = require("../models");















exports.yoklamaListesi = async(req, res) => {
    try {
        const courseId = req.params.courseId;
        console.log(courseId)
        
        const listOfStudents = await Attendancelist.findAll({
            where: { Sessionid: courseId },
            
        });
        const lectureinfosWithStudentListsAndAttendance = await Promise.all(listOfStudents.map(async (student) => {
            // Fetching associated attendance list for the student's session
            const attendanceList = await Studentlist.findOne({
                where: {
                    OGRENCI_NO: student.StudentlistOGRENCINO,
                    // Additional conditions if needed
                },
                 // Adjust according to your schema
            });
        
            return {
                attendanceList
               
            };
        }));
        
        res.json(lectureinfosWithStudentListsAndAttendance);
    } catch (error) {
        console.error('Error fetching student list:', error);
        res.status(500).json({ error: 'Error fetching student list' });
    }
};
