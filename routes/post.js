const express = require('express');
const {body} = require('express-validator');

const postController = require('../controllers/post');

const router = express.Router();
// GET /posts
router.get('/', postController.getPosts);
router.post('/',postController.storePost);

module.exports = router;
