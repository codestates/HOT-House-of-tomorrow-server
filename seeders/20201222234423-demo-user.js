'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      oAuthId : 1,
      name: 'Doe',
      email: 'example@example.com',
      nickname : 'example',
      profileImg : 'test.png',
      likePosts : 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
