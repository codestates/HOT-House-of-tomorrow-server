'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Post, { foreignKey: 'userId', sourceKey: 'oAuthId' });
      this.hasMany(models.Comment, {
        foreignKey: 'userId',
        sourceKey: 'oAuthId',
      });
    }
  }
  User.init(
    {
      oAuthId: {
        type: DataTypes.INTEGER(20),
        primaryKey: true,
        autoIncrement: false,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
      },
      profileImg: {
        type: DataTypes.STRING(100),
      },
      likePosts: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: '0'
      },
      introduction: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
