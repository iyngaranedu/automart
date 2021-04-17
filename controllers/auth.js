const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ where: { email: email } });

    if (user) {
     
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
            {
              email: user.email,
              userId: user.id
            }, 
            'secret', 
            {expiresIn: '1h'}
        );
        return res.status(200).json({
          user: user,
          'token': token
        });
      }
    }
    return res.status(401).json({ error: 'not authendicated.' })
  } catch (ex) {
    return res.status(500).json(ex)
  }
}
