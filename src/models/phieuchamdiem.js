'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phieuchamdiem extends Model {

    static associate(models) {

    }
  };
  Phieuchamdiem.init({
    ma_phieu_giao_viec : DataTypes.INTEGER, //khoa chinh + ngoai
    format: DataTypes.FLOAT,
    trinh_bay: DataTypes.FLOAT,
    lich_lam_viec: DataTypes.FLOAT,
    so_buoi_thuc_tap: DataTypes.FLOAT,
    ke_hoach_cong_tac: DataTypes.FLOAT,
    hieu_biet_co_quan: DataTypes.FLOAT,
    pp_thuc_hien: DataTypes.FLOAT,
    cung_co_ly_thuyet: DataTypes.FLOAT,
    ky_nang_thuc_hanh: DataTypes.FLOAT,
    kinh_nghiem_thuc_tien: DataTypes.FLOAT,
    dong_gop_co_quan: DataTypes.FLOAT,
    khong_sinh_hoat: DataTypes.FLOAT,
    khong_phieu_giao_viec: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Phieuchamdiem',
  });
  return Phieuchamdiem;
};