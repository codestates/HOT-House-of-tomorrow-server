const { User } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;

  if (!token) {
    res.status(400).json({ message: 'not token' });
  } else {
    try {
      let tokenData = jwt.verify(token, SECRET);
      let userInfo = await User.findOne({
        where: { email: tokenData.email },
      });
      res.json({
        updateSeccess: true,
        nickname: userInfo.nickname,
        email: userInfo.email,
        profileImg: userInfo.profileImg,
        introduction: userInfo.introduction,
      });
    } catch (err) {
      res.status(500).json({ updateSeccess: false, error: err });
    }
  }
};
