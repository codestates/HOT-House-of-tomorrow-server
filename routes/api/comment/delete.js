const { User, Comment } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  const token = req.headers['xauth'];
  
  const { postId, commentId } = req.body;
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
      res
        .status(400)
        .json({ message: 'You are not the author of the comment' });
    } else {
      await Comment.destroy({
        where: {
          userId: userInfo.oAuthId,
          postId: postId,
          id: commentId,
        },
      });
      res.json({
        deleteComment: true,
      });
    }
  } catch (err) {
    res.status(500).json({ deleteComment: false, error: err });
  }
};
