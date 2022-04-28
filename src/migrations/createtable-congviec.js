'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // viec_lam: DataTypes.STRING,
    // so_buoi: DataTypes.INTEGER,
    // tuan_thu: DataTypes.INTEGER,
    // ngay_bd: DataTypes.INTEGER,
    // ma_phieu_tiep_nhan: DataTypes.INTEGER, //khoa chinh + ngoai
    // ghi_chu: DataTypes.STRING,
    await queryInterface.createTable('Congviecs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      viec_lam: {
        type: Sequelize.STRING
      },
      so_buoi: {
        type: Sequelize.STRING
      },
      tuan_thu: {
        type: Sequelize.STRING
      },
      ngay_bd: {
        type: Sequelize.STRING
      },
      ma_phieu_tiep_nhan: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      ghi_chu: {
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
    await queryInterface.dropTable('Congviecs');
  }
};