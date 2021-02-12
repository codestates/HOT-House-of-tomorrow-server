const { User, Comment } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  const { oAuthId } = req.user;
  const { postId, commentId, comment, date } = req.body;

  try {
    let commentUserInfo = await Comment.findOne({
      attributes: ['userId'],
      where: { id: commentId },
    });

    if (oAuthId !== commentUserInfo.userId) {
      res.status(400).json({ updateComment: false, message: 'You are not the author of the comment' });
    } else {
      await Comment.update(
        {
          comment: comment,
          date: date,
        },
        {
          where: {
            userId: oAuthId,
            postId: postId,
            id: commentId,
          },
        }
      );
      res.json({
        updateComment: true,
      });
    }
  } catch (err) {
    res.status(500).json({ updateComment: false, error: err });
  }
};
