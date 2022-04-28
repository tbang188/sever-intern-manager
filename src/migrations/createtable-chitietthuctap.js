"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // ma_co_quan: DataTypes.STRING,
        // ma_nhan_vien: DataTypes.STRING,
        // noi_dung_cv: DataTypes.STRING,
        // gio_1tuan: DataTypes.STRING,
        // moi_truong_lam_viec: DataTypes.STRING,
        // so_luong_sv: DataTypes.STRING,
        // yeu_cau_sv: DataTypes.STRING,
        // quyen_loi_sv: DataTypes.STRING,
        // ghi_chu: DataTypes.STRING,
        await queryInterface.createTable("Chitietthuctaps", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            ma_co_quan: {
                type: Sequelize.STRING,
            },
            ma_nhan_vien: {
                type: Sequelize.STRING,
            },
            noi_dung_cv: {
                type: Sequelize.STRING,
            },
            gio_1tuan: {
                type: Sequelize.STRING,
            },
            moi_truong_lam_viec: {
                type: Sequelize.STRING,
            },
            so_luong_sv: {
                type: Sequelize.STRING,
            },
            yeu_cau_sv: {
                type: Sequelize.STRING,
            },
            quyen_loi_sv: {
                type: Sequelize.STRING,
            },
            ghi_chu: {
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
        await queryInterface.dropTable("Chitietthuctaps");
    },
};
