const express = require('express');
const multer = require('multer');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;
const stream = require('stream');
const admin = require('firebase-admin');

//firebase초기화
const firebaseAdmin = admin.initializeApp(
  {
    credential: admin.credential.cert(config.GOOGLE_APPLICATION_CREDENTIALS),
    storageBucket: config.STORAGE_BUCKET,
  },
  'storage'
);

var upload = multer({ storage: multer.memoryStorage() });

//이미지 삭제
router.post('/delete', (req, res) => {
  let token = req.cookies.x_auth;
  let userInfo = jwt.verify(token, SECRET);

  if (!token) {
    res.status(400).json({ message: 'not token' });
  } else {
    try {
      if (Number(req.body.postId)) {
        firebaseAdmin
          .storage()
          .bucket()
          .file(`Post/post_${req.body.postId}`)
          .delete();
        res.status(200).json({ imageUrl: null });
      } else {
        firebaseAdmin
          .storage()
          .bucket()
          .file(`User/user_${userInfo.oAuthId}`)
          .delete();
        res.status(200).json({ imageUrl: null });
      }
    } catch (err) {
      res.status(500).json({ deleteImg: false });
    }
  }
});

//이미지 업로드
router.post('/', upload.single('uploadImg'), (req, res) => {
  let token = req.cookies.x_auth;
  let userInfo = jwt.verify(token, SECRET);

  if (!token) {
    res.status(400).json({ message: 'not token' });
  } else {
    try {
      var image = req.file;
      var bufferStream = new stream.PassThrough();
      bufferStream.end(new Buffer.from(image.buffer, 'ascii'));
      let fileName = '';
      let file = '';
      if (Number(req.body.postId)) {
        fileName = 'post_' + req.body.postId;
        file = firebaseAdmin.storage().bucket().file(`Post/${fileName}`);
      } else {
        fileName = 'user_' + userInfo.oAuthId;
        file = firebaseAdmin.storage().bucket().file(`User/${fileName}`);
      }
      bufferStream
        .pipe(
          file.createWriteStream({ metadata: { contentType: image.mimetype } })
        )
        .on('error', (err) => {
          console.log(err);
        })
        .on('finish', () => {
          console.log(fileName + ' finish');
          res.status(200).json({ imageUrl: req.file.originalname });
          return;
        });
    } catch (err) {
      res.status(500).json({ uploadImg: false });
    }
  }
});

module.exports = router;
