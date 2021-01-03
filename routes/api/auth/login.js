const { User } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  const { oAuthId, email } = req.body;
  if (!oAuthId || !email) {
    res.status(500).json({
      loginSuccess: false,
      text: 'lack of information',
    });
  } else {
    let userInfo = await User.findOne({
      where: {
        oAuthId: oAuthId,
        email: email,
      },
    });
    if (userInfo) {
      let token = jwt.sign({ email: email }, SECRET);
      // res
      //   .cookie('x_auth', token)
      //   .status(200)
      //   .json({ loginSuccess: true, token: token, userInfo: userInfo });
      console.log("login.js token1:", token);
        res.cookie('x_auth', token, { secure:false }).json({ loginSuccess: true, token: token, userInfo: userInfo });
    } else {
      let newUser = await User.create({
        email: email,
        oAuthId: oAuthId,
        profileImg : 'https://avatars1.githubusercontent.com/u/47313528?s=88&v=4',
        nickname : 'user'+oAuthId,
      });
      let token = jwt.sign({ email: email }, SECRET);
      // res
      //   .cookie('x_auth', token)
      //   .status(200)
      //   .json({ loginSuccess: true, token: token, userInfo: newUser });
      console.log("login.js token2:", token);
      res.cookie('x_auth', token, { secure:false }).json({ loginSuccess: true, token: token, userInfo: newUser });
    }
  }
};
