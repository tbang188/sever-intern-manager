"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // ma_phieu_tiep_nhan : DataTypes.INTEGER, //khoa chinh + ngoai
        // ngay_bd_thuc_tap: DataTypes.DATEONLY,
        // ngay_kt_thuc_tap: DataTypes.DATEONLY
        await queryInterface.createTable("Phieugiaoviecs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            ma_phieu_tiep_nhan: {
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            // ngay_bd_thuc_tap: {
            //   type: Sequelize.DATEONLY
            // },
            // ngay_kt_thuc_tap: {
            //   type: Sequelize.DATEONLY
            // },
            ngay_bd_thuc_tap: {
                type: Sequelize.STRING,
            },
            ngay_kt_thuc_tap: {
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
        await queryInterface.dropTable("Phieugiaoviecs");
    },
};
