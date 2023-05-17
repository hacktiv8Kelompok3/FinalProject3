'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactionhistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, { foreignKey: 'ProductId' });
      this.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  Transactionhistory.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg:"Quantity can't be empty"
        },
        isNumeric: {
          args: true,
          msg:"Quantity must be number!"
        }
      }
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg:"Total Price can't be empty!"
        },
        isNumeric: {
          args: true,
          msg:"Total Price must be number!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Transactionhistory',
  });
  return Transactionhistory;
};