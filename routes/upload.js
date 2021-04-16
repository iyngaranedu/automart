const express = require('express');

const uploadController = require('../controllers/upload');

const router = express.Router();

// POST /file-upload
router.post('/single-file-upload', uploadController.uploadSingle);

module.exports = router;