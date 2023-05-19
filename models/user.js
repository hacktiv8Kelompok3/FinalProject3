'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helpers/bcrypt")
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
      validate: {
        isEmpty: {
          args: true,
          msg:"Role can't be empty!"
        },
        isIn:{
          args: [['admin', 'customer']],
          msg: "Role has to be 'admin' or 'customer'"
        }
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg:"Balance can't be empty!"
        },
        isNumeric: {
          args: true,
          msg:"Balance must be a number!"
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
    modelName: 'User',
    hooks: {
      beforeCreate: (user, opt) => {
        const hashedPass = hashPassword(user.password)
        user.password = hashedPass
        user.role ="customer";
        user.balance = 0;
      },
      beforeUpdate: (user, opt) => {
        const hashedPass = hashPassword(user.dataValues.password)
        user.dataValues.password = hashedPass
      }
    }
  });
  return User;
};