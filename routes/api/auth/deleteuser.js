const { User, Post, Comment } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;

  if (!token) {
    res.status(500).json({ message: 'not token' });
  } else {
    let tokenData = jwt.verify(token, SECRET);
    await Comment.destroy({
      where: { userId: tokenData.oAuthId },
    });
    await Post.destroy({
      where: { userId: tokenData.oAuthId },
    });
    await User.destroy({
      where: { oAuthId: tokenData.oAuthId },
    });
    res.json({ message: 'success' });
  }
};
