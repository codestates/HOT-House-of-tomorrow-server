const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../../../models');
const config = require('../../../config/index');
const { SECRET } = config;
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: config.AWS_ACCESSKEYID,
  secretAccessKey: config.AWS_SECRET_KEY,
  region : 'ap-northeast-2'
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: "hot-server", 
      acl: 'public-read-write', 
      key: async (req, file, cb) => {
            if(Number(req.params.postId)) {
              cb(null, `Post/post_${req.params.postId}`)
            } else {
              let token = req.cookies.x_auth;
              let tokenData = jwt.verify(token, SECRET);
              let userInfo = await User.findOne({
                where : { email: tokenData.email } 
              }).then((data) => data.dataValues);
              cb(null, `User/user_${userInfo.oAuthId}`)
            }
      },
  }),
});

//이미지 삭제
router.post('/delete/:postId',  async (req, res) => {
  const token = req.headers['xauth'];

  if (!token) {
    res.status(400).json({ message: 'not token' });
  } else {
    try {
      if (Number(req.params.postId)) {
        const params = {
          Bucket: 'hot-image',
          Key: `Post/post_${req.params.postId}`
        }
        s3.deleteObject(params, function(err, data) {
          if (err) {
            console.log(err, err.stack);
          } else {
            res.status(200).json({ imageUrl: null });
          }
        })
        res.status(200).json({ imageUrl: null });
      } else {
        let tokenData = jwt.verify(token, SECRET);
        let userInfo = await User.findOne({
          where : { email: tokenData.email}
        }).then((data) => data.dataValues);
        const params = {
          Bucket: 'hot-image',
          Key: `User/user_${userInfo.oAuthId}`
        }
        s3.deleteObject(params, function(err, data) {
          if (err) {
            console.log(err, err.stack);
          } else {
            res.status(200).json({ imageUrl: null });
          }
        })
      }
    } catch (err) {
      res.status(500).json({ deleteImg: false });
    }
  }
});

//이미지 업로드
router.post('/:postId', upload.single('uploadImg'), async (req, res) => {
  res.status(200).json({imageUrl : req.file.location});
});

module.exports = router;
