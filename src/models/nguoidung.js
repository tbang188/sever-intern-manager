"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Nguoidung extends Model {
        static associate(models) {
            Nguoidung.hasOne(models.Sinhvien, { foreignKey: "id" });
            Nguoidung.hasOne(models.Giangvien, { foreignKey: "id" });
            Nguoidung.hasOne(models.Giaovu, { foreignKey: "id" });
            Nguoidung.hasOne(models.Nhanvien, { foreignKey: "id" });
            Nguoidung.hasOne(models.Taikhoan, { foreignKey: "id" });
            Nguoidung.belongsTo(models.Phieutiepnhan, { foreignKey: "id" });
            Nguoidung.hasOne(models.Chitietphancong, {
                foreignKey: "id",
            });
        }
    }
    Nguoidung.init(
        {
            s_id: DataTypes.STRING, //khoa chinh
            ho_ten: DataTypes.STRING,
            dia_chi: DataTypes.STRING,
            email: DataTypes.STRING,
            sdt: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Nguoidung",
        }
    );
    return Nguoidung;
};
