"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Dangkycoquan extends Model {
        static associate(models) {
            Dangkycoquan.belongsTo(models.Phieutiepnhan, { foreignKey: "id" });
            Dangkycoquan.belongsTo(models.Chitietphancong, {
                foreignKey: "id",
            });
        }
    }
    Dangkycoquan.init(
        {
            ma_co_quan: DataTypes.STRING, //khoa chinh + ngoai
            ma_sinh_vien: DataTypes.STRING, //khoa chinh + ngoai
            trang_thai: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Dangkycoquan",
        }
    );
    return Dangkycoquan;
};
