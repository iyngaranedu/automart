const express = require('express');

const postController = require('../controllers/post');


const router = express.Router();

// GET /posts
router.get('/', postController.getAll);

// POST /posts
router.post('/',postController.store);

// GET /posts/:uuid
router.get('/:uuid',postController.show);

// PUT /posts/:uuid
router.put('/:uuid',postController.update);

// DELETE /posts/:uuid
router.delete('/:uuid',postController.destroy);

module.exports = router;
