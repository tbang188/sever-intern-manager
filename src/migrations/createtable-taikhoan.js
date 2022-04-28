'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // s_id: DataTypes.STRING, //khoa chinh + ngoai
    // ten_dang_nhap: DataTypes.STRING,
    // mat_khau: DataTypes.STRING,
    // loai_tai_khoan: DataTypes.STRING
    await queryInterface.createTable('Taikhoans', {
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
      ten_dang_nhap: {
        type: Sequelize.STRING
      },
      mat_khau: {
        type: Sequelize.STRING
      },
      loai_tai_khoan: {
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
    await queryInterface.dropTable('Taikhoans');
  }
};