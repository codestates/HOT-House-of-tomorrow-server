const { User } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  const token = req.headers['xauth'];
  
  const { nickname, profileImg, introduction } = req.body;
  if (!token) {
    res.status(400).json({ message: 'not token' });
  } else {
    try {
      let tokenData = jwt.verify(token, SECRET);
      let userInfo = await User.findOne({
        where: { email: tokenData.email },
      });
      if (userInfo) {
        await User.update(
          {
            nickname: nickname,
            profileImg: profileImg,
            introduction: introduction,
          },
          {
            where: { email: tokenData.email },
          }
        );
        res.json({ updateSuccess: true });
      } else {
        res
          .status(500)
          .json({
            updateSuccess: false,
            message: 'It is an existing nickname',
          });
      }
    } catch (err) {
      res.status(500).json({ updateSuccess: false, error: err });
    }
  }
};
