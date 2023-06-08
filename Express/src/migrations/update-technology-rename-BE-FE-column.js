'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.renameColumn('technologies', 'FE/BE', 'FEorBE');
        await queryInterface.removeColumn('technologies', 'FE/BE');
    },
    async down(queryInterface, Sequelize) {},
};
