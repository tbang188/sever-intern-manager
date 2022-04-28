"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // ma_phieu_tiep_nhan: DataTypes.INTEGER, //khoa chinh + ngoai
        // giang_vien: DataTypes.STRING //khoa ngoai
        await queryInterface.createTable("Chitietphancongs", {
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
            giang_vien: {
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
        await queryInterface.dropTable("Chitietphancongs");
    },
};
