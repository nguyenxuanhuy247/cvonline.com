'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    User.init(
        {
            avatar: DataTypes.BLOB,
            fullName: DataTypes.STRING,
            dateOfBirth: DataTypes.STRING,
            gender: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            gmailPassword: DataTypes.STRING,
            address: DataTypes.STRING,
            jobPosition: DataTypes.STRING,
            languages: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'users',
        },
    );
    return User;
};
