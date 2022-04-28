"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // ma_co_quan: DataTypes.STRING, //khoa chinh
        // ten_co_quan: DataTypes.STRING,
        // ten_day_du: DataTypes.STRING,
        // tinh_tp: DataTypes.STRING,
        // dia_chi: DataTypes.STRING,
        // website: DataTypes.STRING,
        // sdt_co_quan: DataTypes.STRING,
        // email_co_quan: DataTypes.STRING
        await queryInterface.createTable("Coquans", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            ma_co_quan: {
                primaryKey: true,
                type: Sequelize.STRING,
            },
            ten_co_quan: {
                type: Sequelize.STRING,
            },
            ten_day_du: {
                type: Sequelize.STRING,
            },
            tinh_tp: {
                type: Sequelize.STRING,
            },
            dia_chi: {
                type: Sequelize.STRING,
            },
            website: {
                type: Sequelize.STRING,
            },
            sdt_co_quan: {
                type: Sequelize.STRING,
            },
            email_co_quan: {
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
        await queryInterface.dropTable("Coquans");
    },
};
