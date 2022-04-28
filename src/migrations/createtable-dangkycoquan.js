"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // ma_co_quan : DataTypes.STRING, //khoa chinh + ngoai
        // ma_sinh_vien : DataTypes.STRING, //khoa chinh + ngoai
        // trang_thai: DataTypes.INTEGER
        await queryInterface.createTable("Dangkycoquans", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            ma_co_quan: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            ma_sinh_vien: {
                primaryKey: true,
                type: Sequelize.STRING,
            },
            trang_thai: {
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
        await queryInterface.dropTable("Dangkycoquans");
    },
};
