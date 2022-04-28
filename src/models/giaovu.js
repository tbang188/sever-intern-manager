"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Giaovu extends Model {
        static associate(models) {
            Giaovu.belongsTo(models.Nguoidung, { foreignKey: "id" });
            Giaovu.belongsTo(models.Taikhoan, { foreignKey: "id" });
        }
    }
    Giaovu.init(
        {
            s_id: DataTypes.STRING, //khoa chinh + ngoai
            chuc_vu: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Giaovu",
        }
    );
    return Giaovu;
};
