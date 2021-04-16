const express = require('express');

const fileUploadController = require('../controllers/fileUpload');

const router = express.Router();

// POST /file-upload
router.post('/single-file-upload', fileUploadController.uploadSingle);

module.exports = router;