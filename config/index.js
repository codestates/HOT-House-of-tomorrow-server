const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  SERVER_PORT: process.env.SERVER_PORT,
  USER_NAME: process.env.USER_NAME,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  SECRET: 'fullim24hotsecret',
  GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS
};
