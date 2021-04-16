'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate({Post}) {
      this.hasMany(Post, {foreignKey: 'userId'});
    }

    toJSON() {
      return {...this.get(), id: undefined, password: undefined};
    }
  };
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notNull: {msg: "The first name is required!"},
        notEmpty: {msg: "The first name cannot be empty!"},
      }
    },
    lastName: DataTypes.STRING,
    company: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notNull: {msg: "A valid phone number is required!"},
        notEmpty: {msg: "The phone number cannot be empty!"},
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notNull: {msg: "A valid email is required!"},
        notEmpty: {msg: "The email cannot be empty!"},
        isEmail: {args: true, msg: "The email is invalid!"}
      },
      unique: {
        args:true,
        msg: 'Email address already in use!'
    }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notNull: {msg: "A valid email is required!"},
        notEmpty: {msg: "The email cannot be empty!"},
        len: {
          args: [8],
          msg: "Please provide password with minimum 8 characters.",
        }
      },
    },
    isActive: DataTypes.BOOLEAN
  }, 
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};