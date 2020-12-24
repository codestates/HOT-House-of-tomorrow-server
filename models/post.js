'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.hasMany(models.Comment);
    }
  }
  Post.init(
    {
      userId: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
      acreage: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
      },
      housingType: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
      },
      space: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      roomImage: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      color: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
      },
      like: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
        defaultValue: 0,
      },
      view: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
        defaultValue: 0,
      },
      date: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
