'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Post, { foreignKey: 'postId'});
      this.belongsTo(models.User, { foreignKey: 'userId', targetKey : 'oAuthId' });
    }
  }
  Comment.init(
    {
      postId: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  );
  return Comment;
};
