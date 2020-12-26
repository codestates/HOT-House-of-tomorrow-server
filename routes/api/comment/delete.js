const { User, Comment } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;
  const { postId, commentId } = req.body;

  let tokenData = jwt.verify(token, SECRET);
  let userInfo = await User.findOne({
    attributes: ['nickname'],
    where: { email: tokenData.email },
  });

  if (!userInfo) res.status(500).json({ message: 'no nickname' });
  else {
    await Comment.destroy({
      where: {
        userId: userInfo.nickname,
        postId: postId,
        id: commentId,
      },
    });
    res.json({
      deleteComment: true,
    });
  }
};
