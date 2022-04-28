"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Nhanvien extends Model {
        static associate(models) {
            Nhanvien.belongsTo(models.Nguoidung, { foreignKey: "id" });
            Nhanvien.belongsTo(models.Taikhoan, { foreignKey: "id" });
            Nhanvien.belongsTo(models.Coquan, { foreignKey: "ma_co_quan" });
            Nhanvien.belongsTo(models.Phieutiepnhan, { foreignKey: "id" });
        }
    }
    Nhanvien.init(
        {
            s_id: DataTypes.STRING, //khoa chinh + ngoai
            chuc_vu: DataTypes.STRING,
            bo_phan_lam_viec: DataTypes.STRING,
            ma_co_quan: DataTypes.STRING, //khoa ngoai
        },
        {
            sequelize,
            modelName: "Nhanvien",
        }
    );
    return Nhanvien;
};
