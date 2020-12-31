const { User, Post } = require('../../../models');

module.exports = async (req, res) => {
  let userId = req.params.userId;
  try {
    let userInfo = await User.findOne({
      attributes: ['nickname', 'profileImg', 'introduction'],
      where: { oAuthId: userId },
    });
    console.log(userInfo)
    let userPosts = await Post.findAll({
      where: { userId: userId },
    });

    !userPosts
      ? res.json({ getMyPost: true, message: 'no post' })
      : res.json({ getMyPost: true, userPosts: userPosts, userInfo: userInfo  });
  } catch (err) {
    res.status(500).json({ getMyPost: false, error: err });
  }
};
