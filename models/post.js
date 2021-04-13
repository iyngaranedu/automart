const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Post = sequelize.define('product', {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNUll: false,
        primaryKey: true
    },
    title: {
        type:Sequelize.STRING,
        allowNUll: false,
    },
    make: {
        type:Sequelize.STRING,
        allowNUll: false,
    },
    model: {
        type:Sequelize.STRING,
        allowNUll: false,
    },
    year: {
        type:Sequelize.INTEGER,
        allowNUll: false,
    },
    price: {
        type:Sequelize.DOUBLE,
        allowNUll: false,
    },
    negotiable: {
        type:Sequelize.BOOLEAN,
        allowNUll: false,
    },
    defaultImage: {
        type:Sequelize.STRING
    },

});

module.exports = Post;