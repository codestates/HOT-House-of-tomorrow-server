const { User } = require('../../../models');

module.exports = async (req, res) => {
  const { email } = req.user;
  if (!email) {
    res.status(500).json({ updateSeccess: false });
  } else {
    try {
      let userInfo = await User.findOne({
        where: { email: email },
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
