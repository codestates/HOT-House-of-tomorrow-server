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
      userId: userInfo.oAuthId,
      comment: comment,
      date: date,
    });

    let commentLastId = await Comment.findAll().map((data) => data.dataValues);
    commentLastId  = commentLastId[commentLastId.length-1].id;

    res.json({ writeComment: true, commentId : commentLastId });
  } catch (err) {
    res.status(500).json({ writeComment: false, error: err });
  }
};
