const { Post, Comment, User } = require('../../../models');

module.exports = async (req, res) => {
  let postId = req.params.postId;
  console.log(postId);
  try {
    await Post.increment('view', { where: { id: postId } });

    let postData = await Post.findOne({
      where: { id: postId },
    });

    let commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
      attributes: {
        exclude: ['userId', 'postId', 'id', 'createdAt', 'updatedAt'],
      },
      where: { postId },
    });

    let finalData = {
      postData: postData,
      comment: commentData,
    };

    res.status(200).json({ results: finalData });
  } catch (err) {
    res.status(500).json({ postRead: false });
  }
};
