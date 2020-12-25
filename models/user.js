'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post, { foreignKey: 'userId' });
      this.hasMany(models.Comment, { foreignKey: 'userId' });
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
      name: {
        type: DataTypes.STRING(20),
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
        type: DataTypes.STRING(20),
      },
      likePosts: {
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