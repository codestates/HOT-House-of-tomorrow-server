'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post);
      this.hasMany(models.Comment);
    }
  };
  User.init({
    oAuthId: {
      type: DataTypes.INTEGER(20),
      primaryKey: true,
    },
    name: {
      type : DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type : DataTypes.STRING(100),
      allowNull: false,
      unique : true
    },
    nickname: {
      type : DataTypes.STRING(20),
      allowNull: false,
      unique : true
    },
    profileImg: {
      type : DataTypes.STRING(20),
      allowNull: true
    },
    likePosts: {
      type : DataTypes.STRING(100),
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};