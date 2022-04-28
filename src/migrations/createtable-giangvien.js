"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // s_id: DataTypes.STRING, //khoa chinh + ngoai
        // hoc_ham: DataTypes.STRING,
        // hoc_vi: DataTypes.STRING,
        // ma_bo_mon : DataTypes.INTEGER //khoa ngoai
        await queryInterface.createTable("Giangviens", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            s_id: {
                primaryKey: true,
                type: Sequelize.STRING,
            },
            hoc_ham: {
                type: Sequelize.STRING,
            },
            hoc_vi: {
                type: Sequelize.STRING,
            },
            ma_bo_mon: {
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
        await queryInterface.dropTable("Giangviens");
    },
};
