const { User, Post, Comment } = require('../../../models');

module.exports = async (req, res) => {
  const { email, oAuthId } = req.user;
  if (!email) {
    res.status(500).json({ deleteSeccess: false });
  } else {
    await Comment.destroy({
      where: { userId: oAuthId },
    });
    await Post.destroy({
      where: { userId: oAuthId },
    });
    await User.destroy({
      where: { oAuthId: oAuthId },
    });
    res.json({ deleteSeccess: true });
  }
};
