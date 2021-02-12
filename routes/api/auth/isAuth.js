const { User } = require('../../../models');

module.exports = async (req, res) => {
  const { email } = req.user;

  if (!email) res.status(500).json({ isAuth: false });
  else {
    let userInfo = await User.findOne({
      attributes: {
        exclude: ['updatedAt', 'createdAt'],
      },
      where: { email: email },
    });
    res.json({
      oAuthId: userInfo.oAuthId,
      email: userInfo.email,
      nickname: userInfo.nickname,
      profileImg: userInfo.profileImg,
      introduction: userInfo.introduction,
      likeposts: userInfo.likePosts,
      isAuth: true,
    });
  }
};
