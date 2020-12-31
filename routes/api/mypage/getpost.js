const { User, Post } = require('../../../models');
const config = require('../../../config/index');

module.exports = async (req, res) => {
  let userId = req.params.userId;
  try {
    let userPosts = await Post.findAll({
      include: {
        model: User,
        attributes: ['nickname', 'profileImg', 'introduction'],
      },
      where: { userId: userId },
    });

    !userPosts
      ? res.json({ getMyPost: true, message: 'no post' })
      : res.json({ getMyPost: true, userPosts: userPosts });
  } catch (err) {
    res.status(500).json({ getMyPost: false, error: err });
  }
};
