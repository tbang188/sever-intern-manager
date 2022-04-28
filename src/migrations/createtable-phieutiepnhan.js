"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // ma_phieu_tiep_nhan: DataTypes.INTEGER, //khoa chinh
        // phong_lam_viec: DataTypes.INTEGER,
        // noi_dung: DataTypes.STRING,
        // gio_1ngay: DataTypes.INTEGER,
        // ngay_1tuan: DataTypes.INTEGER,
        // tinh_trang: DataTypes.INTEGER,
        // nhan_vien: DataTypes.STRING, //khoa ngoai
        // sinh_vien: DataTypes.STRING //khoa ngoai
        await queryInterface.createTable("Phieutiepnhans", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            ma_phieu_tiep_nhan: {
                primaryKey: true,
                type: Sequelize.STRING,
            },
            phong_lam_viec: {
                type: Sequelize.STRING,
            },
            noi_dung: {
                type: Sequelize.STRING,
            },
            gio_1ngay: {
                type: Sequelize.INTEGER,
            },
            ngay_1tuan: {
                type: Sequelize.INTEGER,
            },
            tinh_trang: {
                type: Sequelize.STRING,
            },
            nhan_vien: {
                type: Sequelize.STRING,
            },
            sinh_vien: {
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
        await queryInterface.dropTable("Phieutiepnhans");
    },
};
