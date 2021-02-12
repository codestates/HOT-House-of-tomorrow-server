const { User } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

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
