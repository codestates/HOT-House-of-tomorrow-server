const { Post } = require('../../../models');

module.exports = async (req, res) => {
  const { oAuthId } = req.user;

  try {
    let data = req.body;
    let postId = data.postId;
    delete data.postId;

    let postUserInfo = await Post.findOne({
      attributes: ['userId'],
      where: { id: postId },
    });

    if (oAuthId !== postUserInfo.userId) {
      res.status(400).json({ message: 'You are not the author of the post' });
    } else {
      await Post.update(
        {
          ...data,
        },
        {
          where: { id: postId },
        }
      );
      res.status(200).json({ postUpdate: true });
    }
  } catch (err) {
    res.status(500).json({ postUpdate: false });
  }
};
