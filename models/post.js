'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    
    static associate({User}) {
      this.belongsTo(User, {foreignKey: 'userId', as: 'user'});
    }

    toJSON() {
      return {...this.get(), id: undefined, userId: undefined};
    }
  };
  Post.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notNull: {msg: "The post must have title."},
        notEmpty: {msg: "The post must have title."},
        len: {
          args: [10, 250],
          msg: "Please provide title within 10 to 250 characters.",
        }
      }
    },
    make: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notNull: {msg: "The post must have make."},
        notEmpty: {msg: "The post must have make."},
      }
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notNull: {msg: "The post must have model."},
        notEmpty: {msg: "The post must have model."},
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { 
        notNull: {msg: "The post must have year."},
        notEmpty: {msg: "The post must have year."},
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: { 
        notNull: {msg: "The post must have price."},
        notEmpty: {msg: "The post must have price."},
        isDecimal: {msg: "The price must have a valid value."},
      }
    },
    negotiable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    defaultImage: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
  });
  return Post;
};