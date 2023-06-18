'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('technologies', 'image', {
            type: DataTypes.BLOB('long'),
            allowNull: true,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('technologies', 'image', {
            type: DataTypes.STRING,
            allowNull: true,
        });
    },
};
