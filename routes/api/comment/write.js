const { User, Comment } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  const token = req.headers['xauth'];
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

    let commentLastId = await Comment.findAll().then((data) =>
      data.map((el) => el.dataValues)
    );
    commentLastId = commentLastId[commentLastId.length - 1].id;

    res.json({ writeComment: true, commentId: commentLastId });
  } catch (err) {
    res.status(500).json({ writeComment: false, error: err });
  }
};
