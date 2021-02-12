const { Comment } = require('../../../models');

module.exports = async (req, res) => {
  const { oAuthId } = req.user;
  const { postId, comment, date } = req.body;
  try {
    let newComment = await Comment.create({
      postId: postId,
      userId: oAuthId,
      comment: comment,
      date: date,
    });

    res.json({ writeComment: true, commentId: newComment.id });
  } catch (err) {
    res.status(500).json({ writeComment: false, error: err });
  }
};
