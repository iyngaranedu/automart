const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  console.log(req);
  const authHeader = req.get('authorization');
  if (!authHeader) {
    const error = new Error('Not authendicated.')
    error.statusCode = 401
    throw error
  }
  const token = authHeader.split(' ')[1]
  let decodedToken
  try {
    // verify and decode the token
    decodedToken = jwt.verify(token, 'secret')
  } catch (err) {
    err.statusCode = 500
    throw err
  }

  if (!decodedToken) {
    const error = new Error('Not authendicated.')
    error.statusCode = 500
    throw error
  }
  req.userId = decodedToken.userId
  next()
}
