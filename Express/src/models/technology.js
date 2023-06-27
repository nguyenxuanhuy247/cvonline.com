'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Technology extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    Technology.init(
        {
            type: DataTypes.STRING,
            key: DataTypes.STRING,
            side: DataTypes.STRING,
            image: DataTypes.BLOB,
            name: DataTypes.STRING,
            version: DataTypes.STRING,
            link: DataTypes.STRING,
            desc: DataTypes.TEXT,
            userId: DataTypes.INTEGER,
            productId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Technology',
        },
    );
    return Technology;
};
