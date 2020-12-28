'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'introduction', { type:Sequelize.STRING(50) });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'introduction');
  }
};
