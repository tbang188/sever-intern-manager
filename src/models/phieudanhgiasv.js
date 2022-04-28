"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Phieudanhgiasv extends Model {
        static associate(models) {}
    }
    Phieudanhgiasv.init(
        {
            ma_phieu_giao_viec: DataTypes.INTEGER, //khoa chinh + ngoai
            noi_quy: DataTypes.FLOAT,
            gio_giac: DataTypes.FLOAT,
            giao_tiep: DataTypes.FLOAT,
            tich_cuc: DataTypes.FLOAT,
            dap_ung_yccv: DataTypes.FLOAT,
            tt_hoc_tap: DataTypes.FLOAT,
            de_xuat_sang_tao: DataTypes.FLOAT,
            bao_cao_tien_do: DataTypes.FLOAT,
            dong_gop: DataTypes.FLOAT,
            hoan_thanh: DataTypes.FLOAT,
            nhan_xet_khac: DataTypes.STRING,
            ctdt: DataTypes.STRING,
            gop_y_ctdt: DataTypes.STRING,
            ngay_lap: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Phieudanhgiasv",
        }
    );
    return Phieudanhgiasv;
};
