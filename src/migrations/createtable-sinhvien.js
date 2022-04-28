'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // s_id: DataTypes.STRING, //khoa chinh + ngoai
    // ma_lop: DataTypes.STRING //khoa chinh
    await queryInterface.createTable('Sinhviens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      s_id: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      ma_lop: {
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
    await queryInterface.dropTable('Sinhviens');
  }
};