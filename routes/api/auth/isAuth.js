const { User } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  const token = req.headers['xauth'];

  if (!token) res.status(500).json({ isAuth: false, token: 'not token' });
  else {
    let tokenData = jwt.verify(token, SECRET);
    if (!tokenData) res.state(500).json({ isAuth: false });
    else {
      let userInfo = await User.findOne({
        where: { email: tokenData.email },
      });
      res.json({
        token,
        oAuthId: userInfo.oAuthId,
        email: userInfo.email,
        nickname: userInfo.nickname,
        profileImg: userInfo.profileImg,
        introduction: userInfo.introduction,
        likeposts: userInfo.likePosts,
        isAuth: true,
      });
    }
  }
};
