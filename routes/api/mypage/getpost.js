const { User, Post } = require('../../../models');

module.exports = async (req, res) => {
  let userId = req.query.userId;
  let userPosts = await Post.findAll({
    include: {
      model: User,
      attribute: ['oAuthId'],
    },
    where: { userId: userId },
  });

  !userPosts
    ? res.json({ message: 'no post' })
    : res.json({ userPosts: userPosts });
};
