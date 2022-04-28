'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lop extends Model {

    static associate(models) {

    }
  };
  Lop.init({
    ma_lop: DataTypes.STRING, //khoa chinh
    ten_lop: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lop',
  });
  return Lop;
};