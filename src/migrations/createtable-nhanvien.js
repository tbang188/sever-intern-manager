'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // s_id: DataTypes.STRING, //khoa chinh + ngoai
    // chuc_vu: DataTypes.STRING,
    // bo_phan_lam_viec: DataTypes.STRING,
    // ma_co_quan : DataTypes.STRING //khoa ngoai
    await queryInterface.createTable('Nhanviens', {
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
      bo_phan_lam_viec: {
        type: Sequelize.STRING
      },
      ma_co_quan: {
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
    await queryInterface.dropTable('Nhanviens');
  }
};