const { User, Comment } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  const token = req.headers['xauth'];
  const { postId, commentId, comment, date } = req.body;

  try {
    let tokenData = jwt.verify(token, SECRET);
    let userInfo = await User.findOne({
      attributes: ['oAuthId'],
      where: { email: tokenData.email },
    });

    let commentUserInfo = await Comment.findOne({
      attributes: ['userId'],
      where: { id: commentId },
    });

    if (userInfo.oAuthId !== commentUserInfo.userId) {
      res.status(400).json({ message: 'You are not the author of the comment' });
    } else {
      await Comment.update(
        {
          comment: comment,
          date: date,
        },
        {
          where: {
            userId: userInfo.oAuthId,
            postId: postId,
            id: commentId,
          },
        }
      );
      res.json({
        updateComment: true,
      });
    }
  } catch (err) {
    res.status(500).json({ updateComment: false, error: err });
  }
};
