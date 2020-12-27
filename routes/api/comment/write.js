const { User, Comment } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;
  const { postId, comment, date } = req.body;

  let tokenData = jwt.verify(token, SECRET);
  let userInfo = await User.findOne({
    attributes: ['nickname'],
    where: { email: tokenData.email },
  });
  
  if (!userInfo) res.status(500).json({ message: 'no nickname' });
  else {
    await Comment.create({
      postId: postId,
      userId: userInfo.nickname,
      comment: comment,
      date: date,
    });
    res.json({ writeComment: true });
  }
};