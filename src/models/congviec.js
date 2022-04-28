'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Congviec extends Model {

    static associate(models) {

    }
  };
  Congviec.init({
    viec_lam: DataTypes.STRING,
    so_buoi: DataTypes.INTEGER,
    tuan_thu: DataTypes.INTEGER,
    ngay_bd: DataTypes.INTEGER,
    ma_phieu_tiep_nhan: DataTypes.INTEGER, //khoa chinh + ngoai
    ghi_chu: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Congviec',
  });
  return Congviec;
};