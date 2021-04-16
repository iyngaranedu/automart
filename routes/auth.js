const express = require('express');

const { User } = require('../models');
const authController = require('../controllers/auth');

const router = express.Router();

// POST /file-upload
router.post('/login', authController.login);

module.exports = router;