'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    avatar: DataTypes.STRING,
    fullName: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    gender: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    jobPosition: DataTypes.STRING,
    languages: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
