const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

const firebase = require("firebase/app");
const stream = require('stream');
const admin = require('firebase-admin');


const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert({

  })
}, "storage");




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let token = req.cookies.x_auth;
    let userInfo = jwt.verify(token, SECRET);
    
    if (Number(req.body.postId)) {
      fs.mkdir(`./upload/Post/post#${req.body.postId}`, (err) => {
        if (err) console.log('err');
        cb(null, `./upload/Post/post#${req.body.postId}`);
      });
    } else {
      fs.mkdir(`./upload/User/${userInfo.nickname}}`, (err) => {
        if (err) throw err;
        cb(null, `./upload/User/${userInfo.nickname}`);
      });
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('img'), (req, res) => {
  //url보내주기만 하면 됨.
  res.status(200).json({ imageUrl: req.file.originalname });
});

module.exports = router;
