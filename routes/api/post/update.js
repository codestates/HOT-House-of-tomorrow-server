const { User, Post } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;

  if (!token) {
    res.status(400).json({ message: 'not token' });
  } else {
    try {
      let data = req.body;
      let postId = data.postId;
      delete data.postId;

      let tokenData = jwt.verify(token, SECRET);
      let userInfo = await User.findOne({
        attributes: ['oAuthId'],
        where: { email: tokenData.email },
      });

      let postUserInfo = await Post.findOne({
        attributes: ['userId'],
        where: { id: postId },
      });

      if (userInfo.oAuthId !== postUserInfo.userId) {
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
  }
};
