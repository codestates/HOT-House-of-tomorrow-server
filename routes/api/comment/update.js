const { User, Comment } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;
  const { postId, commentId, comment, date } = req.body;

  if (!token) res.json({ isAuth: false, token: token });
  else {
    let tokenData = jwt.verify(token, SECRET);
    let userInfo = await User.findOne({
      where: { email: tokenData.email },
    });
    console.log(userInfo)
    await Comment.update(
      {
        comment: comment,
        date: date,
      },
      {
        where: {
          userId: userInfo.nickname,
          postId: postId,
          id: commentId,
        },
      }
    );
    res.json({
      updateComment: true,
    });
  }
};
