"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // ma_phieu_giao_viec : DataTypes.INTEGER, //khoa chinh + ngoai
        // noi_quy: DataTypes.FLOAT,
        // gio_giac: DataTypes.FLOAT,
        // giao_tiep: DataTypes.FLOAT,
        // tich_cuc: DataTypes.FLOAT,
        // dap_ung_yccv: DataTypes.FLOAT,
        // tt_hoc_tap: DataTypes.FLOAT,
        // de_xuat_sang_tao: DataTypes.FLOAT,
        // bao_cao_tien_do: DataTypes.FLOAT,
        // dong_gop: DataTypes.FLOAT,
        // hoan_thanh: DataTypes.FLOAT,
        // nhan_xet_khac: DataTypes.STRING,
        // ctdt: DataTypes.BOOLEAN,
        // gop_y_ctdt: DataTypes.STRING,
        // ngay_lap: DataTypes.DATE
        await queryInterface.createTable("Phieudanhgiasvs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            ma_phieu_giao_viec: {
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            noi_quy: {
                type: Sequelize.FLOAT,
            },
            gio_giac: {
                type: Sequelize.FLOAT,
            },
            giao_tiep: {
                type: Sequelize.FLOAT,
            },
            tich_cuc: {
                type: Sequelize.FLOAT,
            },
            dap_ung_yccv: {
                type: Sequelize.FLOAT,
            },
            tt_hoc_tap: {
                type: Sequelize.FLOAT,
            },
            de_xuat_sang_tao: {
                type: Sequelize.FLOAT,
            },
            bao_cao_tien_do: {
                type: Sequelize.FLOAT,
            },
            dong_gop: {
                type: Sequelize.FLOAT,
            },
            hoan_thanh: {
                type: Sequelize.FLOAT,
            },
            nhan_xet_khac: {
                type: Sequelize.STRING,
            },
            ctdt: {
                type: Sequelize.STRING,
            },
            gop_y_ctdt: {
                type: Sequelize.STRING,
            },
            ngay_lap: {
                type: Sequelize.STRING,
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Phieudanhgiasvs");
    },
};
