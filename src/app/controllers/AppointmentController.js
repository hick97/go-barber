const { User, Appointment } = require('../models')

class AppointmentController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)

    return res.render('appointments/create', { provider })
  }
  async store (req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body
    const isProvider = req.session.user.provider

    if (!date) {
      req.flash('error', 'Preencha a data do agendamento.')
      return res.redirect(`/app/appointments/new/${provider}`)
    }

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    })
    req.flash('success', 'Agendamento realizado com sucesso.')
    return res.redirect(`/app/dashboard/${isProvider}`)
  }
  async getMarkedAppointments (req, res) {
    const provider = await User.findByPk(req.session.user.id)

    return res.render('appointments/markeds', { provider })
  }
}

module.exports = new AppointmentController()
