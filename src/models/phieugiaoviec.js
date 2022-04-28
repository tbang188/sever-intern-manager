"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Phieugiaoviec extends Model {
        static associate(models) {}
    }
    Phieugiaoviec.init(
        {
            ma_phieu_tiep_nhan: DataTypes.INTEGER, //khoa chinh + ngoai
            // ngay_bd_thuc_tap: DataTypes.DATEONLY,
            // ngay_kt_thuc_tap: DataTypes.DATEONLY
            ngay_bd_thuc_tap: DataTypes.STRING,
            ngay_kt_thuc_tap: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Phieugiaoviec",
        }
    );
    return Phieugiaoviec;
};
