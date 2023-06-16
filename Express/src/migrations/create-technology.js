'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('technologies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            type: {
                type: Sequelize.STRING,
            },
            key: {
                type: Sequelize.STRING,
            },
            side: {
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.BLOB,
            },
            name: {
                type: Sequelize.STRING,
            },
            version: {
                type: Sequelize.STRING,
            },
            link: {
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
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('technologies');
    },
};