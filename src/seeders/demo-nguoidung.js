'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Nguoidungs', [{
      s_id: 'admin',
      ho_ten: 'Khoang WoangBee',
      dia_chi: 'Can Tho',
      email: 'phoanganh148@gmail.com',
      sdt: '0123456789'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
