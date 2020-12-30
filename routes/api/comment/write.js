const { User, Comment } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;
  const { postId, comment, date } = req.body;
  try {
    let tokenData = jwt.verify(token, SECRET);
    let userInfo = await User.findOne({
      attributes: ['oAuthId'],
      where: { email: tokenData.email },
    });

    await Comment.create({
      postId: postId,
      userId: userInfo.oAuthid,
      comment: comment,
      date: date,
    });
    res.json({ writeComment: true });
  } catch (err) {
    res.status(500).json({ writeComment: false, error: err });
  }
};
