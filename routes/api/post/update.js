const { Post } = require('../../../models');
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

      jwt.verify(token, SECRET);
      await Post.update(
        {
          ...data,
        },
        {
          where: { id: postId },
        }
      );
      res.status(200).json({ postUpdate: true });
    } catch (err) {
      res.status(500).json({ postUpdate: false });
    }
  }
};
