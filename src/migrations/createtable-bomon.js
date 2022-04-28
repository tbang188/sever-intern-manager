"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // ma_bo_mon: DataTypes.INTEGER, //khoa chinh
        // ten_bo_mon: DataTypes.STRING
        await queryInterface.createTable("Bomons", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            ma_bo_mon: {
                primaryKey: true,
                type: Sequelize.STRING,
            },
            ten_bo_mon: {
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
        await queryInterface.dropTable("Bomons");
    },
};
