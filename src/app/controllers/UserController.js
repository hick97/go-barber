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
  async listUserById (req, res) {
    const { user } = req.session

    console.log(user)

    return res.render('profile/index', { user })
  }

  async update (req, res) {
    const { id } = req.session.user
    const { email, oldPassword } = req.body

    const user = await User.findByPk(id)

    if (email !== user.email) {
      // Checking if email already exists
      const userExists = await User.findOne({
        where: { email }
      })

      if (userExists) {
        req.flash('error', 'Este email já está cadastrado, tente novamente.')
        return res.render('profile/index', { user })
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      req.flash('error', 'Senha antiga inválida, tente novamente')
      return res.redirect('/app/profile')
    }

    await user.update(req.body)

    return res.redirect('/')
  }
}

module.exports = new UserController()
