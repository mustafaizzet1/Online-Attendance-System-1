

exports.courses = async (req, res) => {
  try {
     
    res.json(courses[req.session.user.name[0]]);
  } catch (error) {
    next(error);
  }
};