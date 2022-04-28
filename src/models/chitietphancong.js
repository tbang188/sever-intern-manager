"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Chitietphancong extends Model {
        static associate(models) {
            Chitietphancong.hasOne(models.Dangkycoquan, {
                foreignKey: "id",
            });
            Chitietphancong.belongsTo(models.Nguoidung, {
                foreignKey: "id",
            });
            Chitietphancong.hasOne(models.Phieutiepnhan, { foreignKey: "id" });
        }
    }
    Chitietphancong.init(
        {
            ma_phieu_tiep_nhan: DataTypes.STRING, //khoa chinh + ngoai
            giang_vien: DataTypes.STRING, //khoa ngoai
        },
        {
            sequelize,
            modelName: "Chitietphancong",
        }
    );
    return Chitietphancong;
};
