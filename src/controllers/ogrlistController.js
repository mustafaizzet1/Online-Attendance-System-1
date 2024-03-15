const { Studentlist } = require("../models");
exports.ogrliste = (req, res) => {
   
  
    res.render('student-list');
    

};


exports.helper = async (req, res) => {
    try {
        const courseId = req.params.id;
        console.log(courseId);
        const listOfStudents = await Studentlist.findAll({
            where: { LectureinfoId: courseId },
        });
        res.json(listOfStudents);
    } catch (error) {
        console.error('Error fetching student list:', error);
        res.status(500).json({ error: 'Error fetching student list' });
    }
};