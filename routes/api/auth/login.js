const { User } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  const { oAuthId, email } = req.body;
  if (!oAuthId || !email) {
    res.json({
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
      res
        .cookie('x_auth', token)
        .status(200)
        .json({ loginSuccess: true, token: token });
    } else {
      let newUser = await User.create({
        email: email,
        oAuthId: oAuthId,
      });
      let token = jwt.sign({ email: email }, SECRET);
      res
        .cookie('x_auth', token)
        .status(200)
        .json({ loginSuccess: true, token: token, userInfo: newUser });
    }
  }
};
