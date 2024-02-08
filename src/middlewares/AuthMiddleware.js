
function authenticate(req, res, next) {
   
    if (req.session && req.session.user) {
       
        next();
    } else {
     
        res.redirect('/login');
    }
}
function checkTeacher(req, res, next) {
    if (req.session.user && req.session.user.role === 'deu') {
      next();
    } else {
      res.status(403).send('Erişim reddedildi');
    }
  }
  
  function checkStudent(req, res, next) {
    if (req.session.user && req.session.user.role === 'ogr') {
      next();
    } else {
      res.status(403).send('Erişim reddedildi');
    }
  }
  



module.exports = {
    authenticate,
    checkTeacher,
    checkStudent
};
