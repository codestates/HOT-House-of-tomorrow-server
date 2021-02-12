const { User, Comment } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  const { oAuthId } = req.user;
  const { postId, commentId } = req.body;
  try {
    let commentUserInfo = await Comment.findOne({
      attributes: ['userId'],
      where: { id: commentId },
    });

    if (oAuthId !== commentUserInfo.userId) {
      res
        .status(400)
        .json({
          deleteComment: false,
          message: 'You are not the author of the comment',
        });
    } else {
      await Comment.destroy({
        where: {
          userId: oAuthId,
          postId: postId,
          id: commentId,
        },
      });
      res.json({
        deleteComment: true,
      });
    }
  } catch (err) {
    res.status(500).json({ deleteComment: false, error: err });
  }
};
