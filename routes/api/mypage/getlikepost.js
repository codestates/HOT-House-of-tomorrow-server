const { User, Post } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  const token = req.headers['xauth'];

  if (!token) res.json({ message: 'not token' });
  else {
    try {
      let tokenData = jwt.verify(token, SECRET);
      let userInfo = await User.findOne({
        where: { email: tokenData.email },
      });
      let likes = await User.findOne({
        attributes: ['likePosts'],
        where: { email: userInfo.email },
      });
      let { likePosts } = likes;
      if (likePosts === '0') res.json({ message: 'no like post' });
      else {
        likePosts = likePosts.split(',');
        let results = [];
        for (let postId of likePosts) {
          if(postId === '0') continue;
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
