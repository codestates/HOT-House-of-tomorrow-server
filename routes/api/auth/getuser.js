const { User } = require('../../../models');

module.exports = async (req, res) => {
  const { oAuthId } = req.user;
  if (!req.user) {
    res.status(500).json({ updateSeccess: false });
  } else {
    try {
      let userInfo = await User.findOne({
        where: { oAuthId: oAuthId },
      });
      res.json({
        updateSeccess: true,
        nickname: userInfo.nickname,
        email: userInfo.email,
        profileImg: userInfo.profileImg,
        introduction: userInfo.introduction,
        likePosts: userInfo.likePosts
      });
    } catch (err) {
      res.status(500).json({ updateSeccess: false, error: err });
    }
  }
};
