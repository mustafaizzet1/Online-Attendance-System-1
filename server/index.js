const express = require("express");
const cors = require("cors");
const xss=require("xss-clean")
const app = express();
const socketIo = require('socket.io');
const qr = require('qrcode');
const http = require('http');
const WebSocket = require('ws');
const server = http.createServer(express);
const wss = new WebSocket.Server({ server })
app.use(cors());
app.use(express.json());
app.use(xss());








app.use(express.static('public'));
//const mediaRouter = require("./routes/Media");

//app.use("/medias", mediaRouter);




const db = require("./models");
const usersRouter = require('./routes/User');
app.use("/auth", usersRouter);
const qrRoutes=require('./routes/Qrcode');
app.use('/getQR', qrRoutes);






db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});