const Session = require("../models/Session");
const { Attendancelist} = require("../models");
const { Studentlist } = require("../models");















exports.yoklamaListesi = async(req, res) => {
    try {
        const sessionid = req.params.courseId;
        console.log(sessionid);
        const listOfStudents = await Attendancelist.findAll({
            where: { SessionId: sessionid }
            
        });
        const lectureinfosWithStudentListsAndAttendance = await Promise.all(listOfStudents.map(async (student) => {
            // Fetching associated attendance list for the student's session
            const attendanceList = await Attendancelist.findOne({
                where: {
                    StudentlistId: student.StudentlistId,
                    // Additional conditions if needed
                },
                include: {
                    model: Studentlist
                }
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
