'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postId: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
        references : {model : 'Posts', key : 'id'}
      },
      userId: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
        references : {model : 'Users', key : 'oAuthId'}
      },
      comment: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      commentId: {
        type: Sequelize.INTEGER(20),
        allowNull: false
      },
      date: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};