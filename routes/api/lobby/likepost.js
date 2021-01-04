const { verify } = require('jsonwebtoken');
const { Post, User } = require('../../../models');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  const token = req.headers['xauth'];
  let postId = req.body.postId;

  if (!token) {
    return res.status(400).json({ message: 'not token' });
  } else {
    try {
      let isVerify = verify(token, SECRET);

      let prevLikePostValue = await User.findOne({
        where: { email: isVerify.email },
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
            where: { email: isVerify.email },
          }
        );
        // 테스트용 user 정보 출력//
        let userInfo = await User.findOne({
          where: { email: isVerify.email },
        });
        res.status(200).json({ dislikeSuccess: true, userInfo: userInfo });
      } else {
        // 좋아요
        await Post.increment({ like: 1 }, { where: { id: postId } });
        await User.update(
          {
            likePosts: prevLikePostValue + ',' + postId,
          },
          {
            where: { email: isVerify.email },
          }
        );
        // 테스트용 user 정보 출력
        let userInfo = await User.findOne({
          where: { email: isVerify.email },
        });
        res.status(200).json({ updateSuccess: true, userInfo: userInfo });
      }
    } catch (err) {
      res.status(500).json({ updateSuccess: false, err: err });
    }
  }
};
