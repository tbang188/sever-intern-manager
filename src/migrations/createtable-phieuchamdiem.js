'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // ma_phieu_giao_viec : DataTypes.INTEGER, //khoa chinh + ngoai
    // format: DataTypes.FLOAT,
    // trinh_bay: DataTypes.FLOAT,
    // lich_lam_viec: DataTypes.FLOAT,
    // so_buoi_thuc_tap: DataTypes.FLOAT,
    // ke_hoach_cong_tac: DataTypes.FLOAT,
    // hieu_biet_co_quan: DataTypes.FLOAT,
    // pp_thuc_hien: DataTypes.FLOAT,
    // cung_co_ly_thuyet: DataTypes.FLOAT,
    // ky_nang_thuc_hanh: DataTypes.FLOAT,
    // kinh_nghiem_thuc_tien: DataTypes.FLOAT,
    // dong_gop_co_quan: DataTypes.FLOAT,
    // khong_sinh_hoat: DataTypes.FLOAT,
    // khong_phieu_giao_viec: DataTypes.FLOAT
    await queryInterface.createTable('Phieuchamdiems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      ma_phieu_giao_viec: {
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      format: {
        type: Sequelize.FLOAT
      },
      trinh_bay: {
        type: Sequelize.FLOAT
      },
      lich_lam_viec: {
        type: Sequelize.FLOAT
      },
      so_buoi_thuc_tap: {
        type: Sequelize.FLOAT
      },
      ke_hoach_cong_tac: {
        type: Sequelize.FLOAT
      },
      hieu_biet_co_quan: {
        type: Sequelize.FLOAT
      },
      pp_thuc_hien: {
        type: Sequelize.FLOAT
      },
      cung_co_ly_thuyet: {
        type: Sequelize.FLOAT
      },
      ky_nang_thuc_hanh: {
        type: Sequelize.FLOAT
      },
      kinh_nghiem_thuc_tien: {
        type: Sequelize.FLOAT
      },
      dong_gop_co_quan: {
        type: Sequelize.FLOAT
      },
      khong_sinh_hoat: {
        type: Sequelize.FLOAT
      },
      khong_phieu_giao_viec: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Phieuchamdiems');
  }
};