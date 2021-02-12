const { Post, User } = require('../../../models');

module.exports = async (req, res) => {
  const { oAuthId, email } = req.user;
  let postId = req.body.postId;

  try {
    let prevLikePostValue = await User.findOne({
      where: { email: email },
    }).then((data) => data.dataValues.likePosts);

    let preLikePosts = prevLikePostValue
      .split(',')
      .map((item) => parseInt(item));

    if (preLikePosts.includes(postId)) {
      // 좋아요 취소
      let results = '0';
      for (let el of preLikePosts) {
        if (el !== postId && el !== 0) {
          results = results + ',' + el;
        }
      }
      await Post.decrement(['like'], { where: { id: postId } });
      await User.update(
        {
          likePosts: results,
        },
        {
          where: { oAuthId: oAuthId },
        }
      );

      res.status(200).json({ dislikeSuccess: true });
    } else {
      // 좋아요
      await Post.increment({ like: 1 }, { where: { id: postId } });
      await User.update(
        {
          likePosts: prevLikePostValue + ',' + postId,
        },
        {
          where: { oAuthId: oAuthId },
        }
      );

      res.status(200).json({ updateSuccess: true });
    }
  } catch (err) {
    res.status(500).json({ updateSuccess: false, err: err });
  }
};
