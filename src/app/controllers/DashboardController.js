const { User } = require('../models')

class DashboardController {
  async index (req, res) {
    const { isProvider } = req.params
    const loggedUser = req.session.user

    const providers = await User.findAll({ where: { provider: true } })

    console.log(isProvider)

    return res.render('dashboards/dashboard', { loggedUser, providers, isProvider })
  }
}

module.exports = new DashboardController()
