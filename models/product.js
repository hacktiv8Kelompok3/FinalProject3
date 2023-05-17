'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, { foreignKey: "CategoryId" });
      this.hasMany(models.Transactionhistory,{foreignKey:"ProductId"});
    }
  }
  Product.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg:"Title can't be empty!"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg:"Price must be a number!"
        },
        notEmpty: {
          args: true,
          msg:"Price can't be empty!"
        },
        min: {
          args: [0],
          msg: "Price cannot be below 0"
        },
        max: {
          args: [50000000],
          msg: "Price Max is 50000000"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg:"Stock can't be empty!"
        },
        isNumeric: {
          args: true,
          msg:"Stock must be a number!"
        },
        min: {
          args: [5],
          msg: "Stock cannot be below 5"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};