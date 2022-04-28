"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Coquan extends Model {
        static associate(models) {
            Coquan.hasOne(models.Chitietthuctap, { foreignKey: "id" });
            Coquan.hasOne(models.Nhanvien, { foreignKey: "ma_co_quan" });

        }
    }
    Coquan.init(
        {
            ma_co_quan: DataTypes.STRING, //khoa chinh
            ten_co_quan: DataTypes.STRING,
            ten_day_du: DataTypes.STRING,
            tinh_tp: DataTypes.STRING,
            dia_chi: DataTypes.STRING,
            website: DataTypes.STRING,
            sdt_co_quan: DataTypes.STRING,
            email_co_quan: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Coquan",
        }
    );
    return Coquan;
};
