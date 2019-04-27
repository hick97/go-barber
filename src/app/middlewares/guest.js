module.exports = (req, res, next) => {
  if (req.session && !req.session.user) {
    return next()
  }
  const isProvider = req.session.user.provider
  return res.redirect(`/app/dashboard/${isProvider}`)
}
