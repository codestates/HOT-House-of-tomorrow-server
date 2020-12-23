const { User } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;

  if (!token) {
    res.status(400).json({ message: 'not token' });
  } else {
    let tokenData = jwt.verify(token, SECRET);
    await User.destroy({
      where: { email: tokenData.email },
    });
    res.json({ message: 'success' });
  }
};
