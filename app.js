const express = require('express');


const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const uploadRoutes = require('./routes/upload');
const authRoutes = require('./routes/auth');
const isAuth = require('./middleware/is-auth');


const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, authorization');
    next();
});

app.use('/posts',isAuth, postRoutes);
app.use('/users', isAuth,userRoutes);
app.use('/uploader', uploadRoutes);
app.use('/auth',authRoutes);

app.listen(3000);

