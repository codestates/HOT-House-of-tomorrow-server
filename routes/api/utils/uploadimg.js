const express = require('express');
const multer = require('multer');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../../../models');
const config = require('../../../config/index');
const { SECRET } = config;
const stream = require('stream');
const admin = require('firebase-admin');

const serviceAccount = require(config.GOOGLE_APPLICATION_CREDENTIALS);
//firebase초기화//
const firebaseAdmin = admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
    storageBucket: config.STORAGE_BUCKET,
  },
  'storage'
);

var upload = multer({ storage: multer.memoryStorage() });

//이미지 삭제
router.post('/delete', async (req, res) => {
  let token = req.cookies.x_auth;

  if (!token) {
    res.status(400).json({ message: 'not token' });
  } else {
    try {
      if (Number(req.body.postId)) {
        firebaseAdmin
          .storage()
          .bucket()
          .file(`Post/post_${req.body.postId}_200x200`)
          .delete();
        res.status(200).json({ imageUrl: null });
      } else {
        let tokenData = jwt.verify(token, SECRET);
        let userInfo = await User.findOne({
          where : { email: tokenData.email}
        }).then((data) => data.dataValues);

        firebaseAdmin
          .storage()
          .bucket()
          .file(`User/user_${userInfo.oAuthId}_200x200`)
          .delete();
        res.status(200).json({ imageUrl: null });
      }
    } catch (err) {
      res.status(500).json({ deleteImg: false });
    }
  }
});

//이미지 업로드
router.post('/', upload.single('uploadImg'), async (req, res) => {
  let token = req.cookies.x_auth;
  
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
        let tokenData = jwt.verify(token, SECRET);
        let userInfo = await User.findOne({
           where : { email: tokenData.email } 
        }).then((data) => data.dataValues);
        
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
          res.status(200).json({ imageUrl: req.file.originalname});
          return;
        });
    } catch (err) {
      res.status(500).json({ uploadImg: false });
    }
  }
});

module.exports = router;
