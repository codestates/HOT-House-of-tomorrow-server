const { Post, Comment } = require('../../../models');

module.exports = async (req, res) => {
  const { oAuthId } = req.user;
  const { postId } = req.body;

  try {
    let postUserInfo = await Post.findOne({
      attributes: ['userId'],
      where: { id: postId },
    });

    if (oAuthId !== postUserInfo.userId) {
      res.status(400).json({ message: 'You are not the author of the post' });
    } else {
      await Comment.destroy({
        where: { postId },
      });
      await Post.destroy({
        where: { id: postId },
      });
      res.status(200).json({ postDeleted: true });
    }
  } catch (err) {
    res.status(500).json({ postDeleted: false });
  }
};
