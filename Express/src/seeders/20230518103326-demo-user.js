'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('user_info', [
            {
                fullName: 'John Doe',
                email: 'example@example.com',
                password: 123456,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('user_info', null, {});
    },
};
