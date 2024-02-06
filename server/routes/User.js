const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const {Users,Authorizedpersons} = require("../models");

router.post("/authorization", async (req, res) => {
    const Email = '2010510041@deu.edu.tr';
    const sesionid=1;
   Authorizedpersons.create({
    UserUserId: Email,
    Sessionid: sesionid,
    });
    res.json("SUCCESS");

  });
  module.exports=router;
  