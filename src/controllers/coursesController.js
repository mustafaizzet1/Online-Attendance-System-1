const courses = [[],[
  { id: 1206, name: "CME 1206 TEKNİK İNGİLİZCE" },
  { id: 4436, name: "CME 4436 NESNELERIN INTERNETI" }
],[{ id: 1207, name: "CME 1207 MAT" },
{ id: 4437, name: "CME 4436 FİZİK" }]];



exports.courses = async (req, res) => {
  try {
     
    res.json(courses[req.session.user.name[0]]);
  } catch (error) {
    next(error);
  }
};