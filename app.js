var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const cors = require('cors');

const bodyParser = require('body-parser');
const routes = require('./src/routes/index');

var db = require('./src/models/');
require('dotenv').config();




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//silinebilir bölge{
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'gizliAnahtar',
  resave: false,
  saveUninitialized: true
}));
app.use(cors());
//silinebilir bölge}
app.use('/', routes);


//Connection to database
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful.');
  })
  .catch(err => {
    console.error('Database connection unsuccessful.:', err);
  });
if (process.env.NODE_ENV !== 'production') {
  db.sequelize.sync().then(() => {
    console.log("Veritabanı senkronizasyonu tamamlandı.");
  });
}

app.listen(3001, () => {
  console.log("Server running on port 3001");
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
