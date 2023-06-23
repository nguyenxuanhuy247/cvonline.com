'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Product.belongsTo(User);
            Product.hasMany(Technology, { foreignKey: 'productId' });
        }
    }
    Product.init(
        {
            name: DataTypes.STRING,
            desc: DataTypes.TEXT,
            image: DataTypes.BLOB,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Product',
        },
    );
    return Product;
};
