const { User, Post, Comment } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;
  const { postId } = req.body;

  if (!token) {
    res.status(400).json({ message: 'not token' });
  } else {
    try {
      let tokenData = jwt.verify(token, SECRET);
      let userInfo = await User.findOne({
        attributes: ['nickname'],
        where: { email: tokenData.email },
      });

      let postUserInfo = await Post.findOne({
        attributes: ['userId'],
        where: { id: postId },
      });

      if (userInfo.nickname !== postUserInfo.userId) {
        res.status(400).json({ message: 'You are not the author of the post' });
      } else {
        await Comment.destroy({
          where: { postId },
        });
        await Post.destroy({
          where: { id: postId },
        });
        res.status(200).json({ postDeleted: true });
      }
    } catch (err) {
      res.status(500).json({ postDeleted: false });
    }
  }
};
