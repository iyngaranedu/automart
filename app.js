const express = require('express');


const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const fileUploadRoutes = require('./routes/fileUpload');


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
app.use('/users', userRoutes);
app.use('/uploader', fileUploadRoutes);

app.listen(3000);

