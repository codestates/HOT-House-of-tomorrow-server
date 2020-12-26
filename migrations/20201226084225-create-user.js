'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      oAuthId: {
        autoIncrement: false,
        type: Sequelize.INTEGER(20),
        primaryKey: true,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: true,
      },
      nickname: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: true,
      },
      profileImg: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      likePosts: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};