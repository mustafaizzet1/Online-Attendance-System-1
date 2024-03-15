const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./src/routes/index');
const fs = require('fs'); // Dosya sistemi modülünü dahil edin
const https = require('https'); // HTTPS modülünü dahil edin
const WebSocket = require('ws');
var db = require('./src/models/');
require('dotenv').config();

var app = express();

// HTTPS sunucusu için sertifika ve anahtar dosyalarının yollarını belirleyin
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'localhost+2-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'localhost+2.pem'))
};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'gizliAnahtar',
  resave: false,
  saveUninitialized: true
}));
app.use(cors());
app.use('/', routes);

// Veritabanı bağlantısını kontrol edin
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful.');
  })
  .catch(err => {
    console.error('Database connection unsuccessful.:', err);
  });
//ip değişince sertifkayı tekrar değiştir mkcert localhost myapp.local (mevcut ip)
// HTTPS sunucusunu oluştur ve dinlemeye başla
https.createServer(httpsOptions, app).listen(3001, () => {
  console.log("HTTPS server running on port 3001");
});

// 404 ve diğer hataları yönetme
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
