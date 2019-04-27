const { User } = require('../models')

class DashboardController {
  async index (req, res) {
    const { isProvider } = req.params

    const providers = await User.findAll({ where: { provider: true } })

    console.log(isProvider)

    return res.render('dashboards/dashboard', { providers, isProvider })
  }
}

module.exports = new DashboardController()
