'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // ma_lop: DataTypes.STRING, //khoa chinh
    // ten_lop: DataTypes.STRING
    await queryInterface.createTable('Lops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      ma_lop: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      ten_lop: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Lops');
  }
};