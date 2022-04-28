"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Chitietthuctap extends Model {
        static associate(models) {
            Chitietthuctap.belongsTo(models.Coquan, { foreignKey: "id" });
        }
    }
    Chitietthuctap.init(
        {
            ma_co_quan: DataTypes.STRING,
            ma_nhan_vien: DataTypes.STRING,
            noi_dung_cv: DataTypes.STRING,
            gio_1tuan: DataTypes.STRING,
            moi_truong_lam_viec: DataTypes.STRING,
            so_luong_sv: DataTypes.STRING,
            yeu_cau_sv: DataTypes.STRING,
            quyen_loi_sv: DataTypes.STRING,
            ghi_chu: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Chitietthuctap",
        }
    );
    return Chitietthuctap;
};
