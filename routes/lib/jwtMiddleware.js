const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const config = require('../../config/index');
const { SECRET } = config;

const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies['x_auth'];
  const error = new Error('The token does not exist.');
  error.status = 401;
  if (!token) next();
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = {
      email: decoded.email,
    };

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findOne({
        where: { email: decoded.email },
      })
      const refreshToken = jwt.sign(
        {
          email: user.email,
        },
        SECRET,
        { expiresIn: '7d' }
      );
      res.cookie('x_auth', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'none',
      });
    }
    return next();
  } catch (err) {
    next(error);
  }
};

module.exports = jwtMiddleware;
