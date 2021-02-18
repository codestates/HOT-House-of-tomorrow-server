const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  SERVER_PORT: process.env.SERVER_PORT,
  USER_NAME: process.env.USER_NAME,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
  AWS_ACCESSKEYID: process.env.AWSAccessKeyId,
  AWS_SECRET_KEY: process.env.AWSSecretKey,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
};
