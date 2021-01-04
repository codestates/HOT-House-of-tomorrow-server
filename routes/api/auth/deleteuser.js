const { User, Post, Comment } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  const token = req.headers['xauth'];

  if (!token) {
    res.status(500).json({ message: 'not token' });
  } else {
    let tokenData = jwt.verify(token, SECRET);
    let userInfo = await User.findOne({
      where: { email: tokenData.email },
    });
    await Comment.destroy({
      where: { userId: userInfo.oAuthId },
    });
    await Post.destroy({
      where: { userId: userInfo.oAuthId },
    });
    await User.destroy({
      where: { oAuthId: userInfo.oAuthId },
    });
    res.json({ message: 'success' });
  }
};
