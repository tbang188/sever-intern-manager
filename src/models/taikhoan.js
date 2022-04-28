"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Taikhoan extends Model {
        static associate(models) {
            Taikhoan.belongsTo(models.Nguoidung, {
                foreignKey: "id",
            });

            Taikhoan.hasOne(models.Sinhvien, { foreignKey: "id" });
            Taikhoan.hasOne(models.Giangvien, { foreignKey: "id" });
            Taikhoan.hasOne(models.Giaovu, { foreignKey: "id" });
            Taikhoan.hasOne(models.Nhanvien, { foreignKey: "id" });
        }
    }
    Taikhoan.init(
        {
            s_id: DataTypes.STRING, //khoa chinh + ngoai
            ten_dang_nhap: DataTypes.STRING,
            mat_khau: DataTypes.STRING,
            loai_tai_khoan: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Taikhoan",
        }
    );
    return Taikhoan;
};
