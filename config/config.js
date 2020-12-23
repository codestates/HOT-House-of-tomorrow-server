const config = require('./index');
const {USER_NAME, PASSWORD, DATABASE,HOST} = config;


module.exports = {
  "development": {
    "username": USER_NAME,
    "password": PASSWORD,
    "database": DATABASE,
    "host": HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": USER_NAME,
    "password": PASSWORD,
    "database": DATABASE,
    "host": HOST,
    "dialect": "mysql"
  }
}
