const { verify } = require('jsonwebtoken');
const { Post } = require('../../../models');
const dotenv = require('dotenv');

dotenv.config();

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;

  if (!token) {
    return res.json({ code: 400, message: 'not token' });
  } else {
    try {
      let isVerify = verify(token, process.env.SECRET);
      await Post.increment(
        { like: 1 },
        { where: { userId: isVerify.oAuthId } }
      );
      res.json({ code: 200, updateSuccess: true });
    } catch (err) {
      res.json({ code: 500, updateSuccess: false });
    }
  }
};
