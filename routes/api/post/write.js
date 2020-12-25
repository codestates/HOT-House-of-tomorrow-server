const { Post } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;
  let data = req.body;

  if (!token) {
    res.status(400).json({ message: 'not token' });
  } else {
    try {
      jwt.verify(token, SECRET);
      await Post.create({
        ...data,
      });
      res.status(200).json({ posting: true });
    } catch (err) {
      res.status(500).json({ posting: false });
    }
  }
};
