"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Bomon extends Model {
        static associate(models) {}
    }
    Bomon.init(
        {
            ma_bo_mon: DataTypes.STRING, //khoa chinh
            ten_bo_mon: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Bomon",
        }
    );
    return Bomon;
};
