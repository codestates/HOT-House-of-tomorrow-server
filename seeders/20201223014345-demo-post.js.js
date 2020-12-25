'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [
      {
        id: 1,
        userId: 'example',
        acreage: 2,
        housingType: 3,
        space: 2,
        description: 'exapmle description',
        roomImage: 'example.png',
        color: 0,
        like: 1,
        view: 1,
        date: '2020-12-23',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 'example',
        acreage: 2,
        housingType: 4,
        space: 2,
        description: 'exapmle22',
        roomImage: 'example2222.png',
        color: 2,
        like: 1,
        view: 1,
        date: '2020-12-23',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  },
};
