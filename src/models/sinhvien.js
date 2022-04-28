"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Sinhvien extends Model {
        static associate(models) {
            Sinhvien.belongsTo(models.Nguoidung, { foreignKey: "id" });
            Sinhvien.belongsTo(models.Taikhoan, { foreignKey: "id" });
            Sinhvien.belongsTo(models.Phieutiepnhan, { foreignKey: "id" });
        }
    }
    Sinhvien.init(
        {
            s_id: DataTypes.STRING, //khoa chinh + ngoai
            ma_lop: DataTypes.STRING, //khoa chinh
        },
        {
            sequelize,
            modelName: "Sinhvien",
        }
    );
    return Sinhvien;
};
