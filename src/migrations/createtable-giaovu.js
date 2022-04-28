'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // s_id: DataTypes.STRING, //khoa chinh + ngoai
    // chuc_vu: DataTypes.STRING 
    await queryInterface.createTable('Giaovus', {
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
      chuc_vu: {
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
    await queryInterface.dropTable('Giaovus');
  }
};