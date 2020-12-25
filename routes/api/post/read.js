const { Post, Comment } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;
  let postId = req.params.postId;

  if (!token) {
    res.status(400).json({ message: 'not token' });
  } else {
    try {
      jwt.verify(token, SECRET);
      let postData = await Post.findOne({
        where: { id: postId },
      });
      let commentData = await Comment.findOne({
        where: { postId },
      });

      let postInfo = postData.dataValues;
      let commentInfo = {
        userId : { nickname : null},
        comment : null,
        data : null,
        postId : null
      };
      
      if(commentData) {
        commentInfo = commentData.dataValues;
      }
      delete postInfo.like;
      delete postInfo.view;

      res.status(200).json({
        ...postInfo,
        postId: commentInfo.postId,
        comment: {
          nickname: commentInfo.userId.nickname,
          comment: commentInfo.comment,
          date: commentInfo.date,
        },
      });
    } catch (err) {
      res.status(500).json({ postRead: false });
    }
  }
};
