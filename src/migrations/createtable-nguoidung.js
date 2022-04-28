'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // s_id: DataTypes.STRING, //khoa chinh
    // ho_ten: DataTypes.STRING,
    // dia_chi: DataTypes.STRING,
    // email: DataTypes.STRING,
    // sdt: DataTypes.STRING
    await queryInterface.createTable('Nguoidungs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      s_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      ho_ten: {
        type: Sequelize.STRING
      },
      dia_chi: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      sdt: {
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
    await queryInterface.dropTable('Nguoidungs');
  }
};