const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// GET /users
router.get('/', userController.getAll);

// POST /users
router.post('/', userController.store);

// GET /users/:uuid
router.get('/:uuid', userController.show);

// PUT /users/:uuid
router.put('/:uuid', userController.update);

// DELETE /users/:uuid
router.delete('/:uuid', userController.destroy);

module.exports = router;