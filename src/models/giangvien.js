"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Giangvien extends Model {
        static associate(models) {
            Giangvien.belongsTo(models.Nguoidung, { foreignKey: "id" });
            Giangvien.belongsTo(models.Taikhoan, { foreignKey: "id" });
        }
    }
    Giangvien.init(
        {
            s_id: DataTypes.STRING, //khoa chinh + ngoai
            hoc_ham: DataTypes.STRING,
            hoc_vi: DataTypes.STRING,
            ma_bo_mon: DataTypes.STRING, //khoa ngoai
        },
        {
            sequelize,
            modelName: "Giangvien",
        }
    );
    return Giangvien;
};
