"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Phieutiepnhan extends Model {
        static associate(models) {
            Phieutiepnhan.hasOne(models.Nguoidung, { foreignKey: "id" });
            Phieutiepnhan.hasOne(models.Sinhvien, { foreignKey: "id" });
            Phieutiepnhan.hasOne(models.Nhanvien, { foreignKey: "id" });
            Phieutiepnhan.hasOne(models.Dangkycoquan, { foreignKey: "id" });
            Phieutiepnhan.belongsTo(models.Chitietphancong, {
                foreignKey: "id",
            });
        }
    }
    Phieutiepnhan.init(
        {
            ma_phieu_tiep_nhan: DataTypes.STRING, //khoa chinh
            phong_lam_viec: DataTypes.STRING,
            noi_dung: DataTypes.STRING,
            gio_1ngay: DataTypes.INTEGER,
            ngay_1tuan: DataTypes.INTEGER,
            tinh_trang: DataTypes.STRING,
            nhan_vien: DataTypes.STRING, //khoa ngoai
            sinh_vien: DataTypes.STRING, //khoa ngoai
        },
        {
            sequelize,
            modelName: "Phieutiepnhan",
        }
    );
    return Phieutiepnhan;
};
