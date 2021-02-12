const { User, Post } = require('../../../models');

module.exports = async (req, res) => {
  const { oAuthId } = req.user;

  if (!req.user) res.json({ getlikepost: false, message: 'not token' });
  else {
    try {
      let likes = await User.findOne({
        attributes: ['likePosts'],
        where: { oAuthId: oAuthId },
      });
      let { likePosts } = likes;
      if (likePosts === '0') res.json({ message: 'no like post' });
      else {
        likePosts = likePosts.split(',');
        let results = [];
        for (let postId of likePosts) {
          if (postId === '0') continue;
          let result = await Post.findOne({
            include: {
              model: User,
              attribute: ['nickname', 'profileImg'],
            },
            where: { id: postId },
          });
          results.push(result);
        }

        res.json({ getlikepost: true, post: results });
      }
    } catch (err) {
      res.status(500).json({ getlikepost: false, error: err });
    }
  }
};
