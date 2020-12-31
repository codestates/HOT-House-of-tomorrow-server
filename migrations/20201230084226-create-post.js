'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(20),
      },
      userId: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
        references: { model: 'Users', key: 'oAuthId' },
      },
      acreage: {
        type: Sequelize.INTEGER(1),
        allowNull: true,
      },
      housingType: {
        type: Sequelize.INTEGER(1),
        allowNull: true,
      },
      space: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      roomImage: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      color: {
        type: Sequelize.INTEGER(1),
        allowNull: true,
      },
      like: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
        defaultValue: 0,
      },
      view: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
        defaultValue: 0,
      },
      date: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
  },
};