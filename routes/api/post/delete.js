const { Post, Comment } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;
  const { userId, postId } = req.body;

  if (!token) {
    res.status(400).json({ message: 'not token' });
  } else {
    try {
      jwt.verify(token, SECRET);
      await Comment.destroy({
        where: { postId },
      });
      await Post.destroy({
        where: { userId },
      });
      res.status(200).json({ postDeleted: true });
    } catch (err) {
      res.status(500).json({ postDeleted: false });
    }
  }
};
