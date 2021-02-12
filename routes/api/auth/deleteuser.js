const { User, Post, Comment } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  const { email } = req.user;

  if (!email) {
    res.status(500).json({ deleteSeccess: false });
  } else {
    let userInfo = await User.findOne({
      where: { email: email },
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
    res.json({ deleteSeccess: true });
  }
};
