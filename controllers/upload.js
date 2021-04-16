const multer = require('multer')

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/uploads/cars/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

exports.uploadSingle = async (req, res, next) => {
  try {
    const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
      'image'
    )

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({
          error: 'A Multer error occurred when uploading.',
          msg: err
        })
      } else if (err) {
        return res.status(500).json({
          error: 'An unknown error occurred when uploading.',
          msg: err
        })
      }
      return res.status(200).json(req.file)
    })
  } catch (ex) {
    return res.status(500).json(ex)
  }
}
