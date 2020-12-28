const { User, Comment } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;
  const { postId, commentId, comment, date } = req.body;

  if (!token) res.json({ message: 'no token' });
  else {
    let tokenData = jwt.verify(token, SECRET);
    let userInfo = await User.findOne({
      attributes: ['nickname'],
      where: { email: tokenData.email },
    });

    let commentUserInfo = await Comment.findOne({
      attributes: ['userId'],
      where: { id: commentId },
    });
    
    if (userInfo.nickname !== commentUserInfo.userId) {
      res.status(400).json({ message: 'You are not the author of the post' });
    } else {
      await Comment.update(
        {
          comment: comment,
          date: date,
        },
        {
          where: {
            userId: userInfo.nickname,
            postId: postId,
            id: commentId,
          },
        }
      );
      res.json({
        updateComment: true,
      });
    }
  }
};
