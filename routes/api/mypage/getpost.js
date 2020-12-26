const { User, Post } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;
  if (!token) res.json({ message: 'no token' });
  else {
    let tokenData = jwt.verify(token, SECRET);
    let userInfo = await User.findOne({
      where: { email: tokenData.email },
    });

    let userPosts = await Post.findAll({
      include: {
        model: User,
        attribute: ['nickname'],
      },
      where: { userId: userInfo.nickname },
    });

    !userPosts
      ? res.json({ message: 'no post' })
      : res.json({ userPosts: userPosts });
  }
};
