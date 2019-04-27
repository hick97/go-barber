const { User } = require('../models')

class UserController {
  create (req, res) {
    res.render('auth/signup')
  }
  async store (req, res) {
    // Encontro o filename no req.file
    const { filename: avatar } = req.file
    // const { provider } = req.body.provider

    await User.create({ ...req.body, avatar })

    return res.redirect('/')
  }
}

module.exports = new UserController()
