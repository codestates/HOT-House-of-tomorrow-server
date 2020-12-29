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
  GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  STORAGE_BUCKET: process.env.STORAGE_BUCKET
};
