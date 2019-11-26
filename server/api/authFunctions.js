const leaderValidate = (req, res, next) => {
  if (req.user && req.user.role === 'leader') next()
  else next(new Error('User is not a leader'))
}

module.exports = {leaderValidate}
