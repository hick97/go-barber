const { User, Appointment } = require('../models')
const moment = require('moment')

class AppointmentController {
  async listByUser (req, res) {
    const result = await Appointment.findAll({
      where: {
        user_id: req.session.user.id
      },
      include: [
        {
          model: User,
          as: 'client'
        },
        {
          model: User,
          as: 'barber'
        }
      ]
    })
    const appointments = []

    for (var i = 0; i < Object.keys(result).length; i++) {
      var { id } = result[i]
      var { name, email, avatar } = result[i].barber
      var hour = moment(result[i].date).format('HH:mm')
      var date = moment(result[i].date).format('DD/MM/YYYY')

      await appointments.push({ id, name, email, avatar, hour, date })
    }
    // return res.json({ appointments })
    return res.render('appointments/index', { appointments })
  }
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

    const appointmentExists = await Appointment.findOne({
      where: {
        provider_id: provider,
        date: date
      }
    })

    if (appointmentExists) {
      req.flash('error', 'Esta horário não está disponível no momento.')
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
  async cancel (req, res) {
    const { id } = req.params

    const appointment = await Appointment.findByPk(id)

    await appointment.destroy()

    return res.redirect('/app/appointments')
  }
}

module.exports = new AppointmentController()
