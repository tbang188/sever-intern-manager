"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // key: DataTypes.STRING, //khoa chinh
        // type: DataTypes.STRING,
        // valueEn: DataTypes.STRING,
        // valueVi: DataTypes.STRING,
        await queryInterface.createTable("Allcodes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            key: {
                primaryKey: true,
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            },
            valueEn: {
                type: Sequelize.STRING,
            },
            valueVi: {
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
        await queryInterface.dropTable("Allcodes");
    },
};
