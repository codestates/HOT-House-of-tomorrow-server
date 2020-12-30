const { User, Post } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;
  if (!token) res.json({ message: 'no token' });
  else {
    try {
      let tokenData = jwt.verify(token, SECRET);
      let userInfo = await User.findOne({
        where: { email: tokenData.email },
      });

      let userPosts = await Post.findAll({
        include: {
          model: User,
          attribute: ['nickname', 'profileImg'],
        },
        where: { userId: userInfo.nickname },
      });

      !userPosts
        ? res.json({ getMyPost: true, message: 'no post' })
        : res.json({ getMyPost: true, userPosts: userPosts });
    } catch (err) {
      res.status(500).json({ getMyPost: false, error: err });
    }
  }
};
