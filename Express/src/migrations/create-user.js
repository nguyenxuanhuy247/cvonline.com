'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            avatar: {
                type: Sequelize.STRING,
            },
            fullName: {
                type: Sequelize.STRING,
            },
            dateOfBirth: {
                type: Sequelize.STRING,
            },
            gender: {
                type: Sequelize.STRING,
            },
            phoneNumber: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
            },
            jobPosition: {
                type: Sequelize.STRING,
            },
            university: {
                type: Sequelize.STRING,
            },
            faculty: {
                type: Sequelize.STRING,
            },
            english: {
                type: Sequelize.STRING,
            },
            japanese: {
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
        await queryInterface.dropTable('users');
    },
};
