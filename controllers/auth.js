const bcrypt = require('bcryptjs')

const { User } = require('../models')

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({ where: { email: email } })

    if (user) {
      console.log('came here.....0')
      const match = await bcrypt.compare(password, user.password)
      if (match) {
        return res.status(200).json({
          user: user
        });
      }
    }
    return res.status(401).json({ error: 'not authendicated.' })
  } catch (ex) {
    return res.status(500).json(ex)
  }
}
