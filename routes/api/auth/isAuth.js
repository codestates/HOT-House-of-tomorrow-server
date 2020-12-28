const { User } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;

  if (!token) res.json({ isAuth: false, token: token });
  else {
    let tokenData = jwt.verify(token, SECRET);
    if (!tokenData) res.state(500).json({ isAuth: false });
    else {
      let userInfo = await User.findOne({
        where: { email: tokenData.email },
      });
      res.json({
        name: userInfo.name,
        email: userInfo.email,
        nickname: userInfo.nickname,
        profileImg: userInfo.profileImg,
        introduction: userInfo.introduction,
        isAuth: true,
      });
    }
  }
};
