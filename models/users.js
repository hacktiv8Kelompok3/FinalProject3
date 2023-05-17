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
      this.hasMany(models.Category, { foreignKey: "id" });
    }
  }
  Users.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg:"Full Name can't be empty!"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg:"Format email not valid!"
        },
        notEmpty: {
          args: true,
          msg:"Email can't be empty!"
        },
      },
      unique: {
        args: true,
        msg:"Email already use!"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          args: true,
          msg:"Password can't be empty!"
        },
        len: {
          msg: "Password length 6 - 10 character",
          args:[6,10]
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg:"Gender can't be empty!"
        },
        isIn: {
          args: [['male', 'female']],
          msg: "Gender has to be 'male' or 'female'"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmpty: {
          args: true,
          msg:"Role can't be empty!"
        },
        isIn:{
          args: [['admin', 'customer']],
          msg: "Gender has to be 'admin' or 'customer'"
        }
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg:"Balance must be a number!"
        },
        notEmpty: {
          args: true,
          msg:"Balance can't be empty!"
        },
        min: {
          args: [0],
          msg:"Balance can't below 0"
        },
        max: {
          args: [100000000],
          msg:"Balance max is 100000000"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};