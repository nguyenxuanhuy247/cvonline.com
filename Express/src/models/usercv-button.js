'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCVButton extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserCVButton.init({
    key: DataTypes.STRING,
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    version: DataTypes.STRING,
    link: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'UserCVButton',
  });
  return UserCVButton;
};
