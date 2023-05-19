'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product,{foreignKey:"CategoryId"});
    }
  }
  Category.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Type can't be empty!"
        }
      },
      unique: {
        args: true,
        msg: "Type already exists!"
      }
    },
    sold_product_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Sold Product can't be empty!"
        },
        isNumeric: {
          args: true,
          msg: "Sold Product must be number!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};