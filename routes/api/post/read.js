const { Post, Comment, User } = require('../../../models');
module.exports = async (req, res) => {
  let postId = req.params.postId;
  try {
    await Post.increment('view', { where: { id: postId } });
    let postData = await Post.findOne({
      include: [
        {
          model: User,
          attributes: ['nickname', 'profileImg', 'introduction'],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: { id: postId },
    });
    let commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['nickname', 'profileImg'],
        },
      ],
      attributes: {
        exclude: ['userId', 'postId', 'id', 'createdAt', 'updatedAt'],
      },
      where: { postId },
    });
    let postUser = postData.dataValues.User.nickname;
    let UserAnotherPosts = await Post.findAll({
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'acreage',
          'housingType',
          'space',
          'color',
          'like',
          'view',
          'data',
          'description',
        ],
      },
      limit: 5,
      where: { userId: postUser },
    });
    UserAnotherPosts = UserAnotherPosts.map((el) => el.dataValues).filter(
      (el) => el.id !== postData.dataValues.id
    );
    let finalData = {
      postData: postData,
      comment: commentData,
      UserAnotherPosts,
    };
    res.status(200).json({ results: finalData });
  } catch (err) {
    res.status(500).json({ postRead: false });
  }
};