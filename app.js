const express = require('express');


const postRoutes = require('./routes/post');
const sequelize = require('./util/database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorzation');
    next();
});


app.use('/posts', postRoutes);

app.listen(3000);

