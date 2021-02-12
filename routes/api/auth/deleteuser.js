const { User, Post, Comment } = require('../../../models');

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
