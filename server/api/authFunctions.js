const leaderValidate = (req, res, next) => {
  if (req.user && req.user.role === 'leader') next()
  else next(new Error('User is not a leader'))
}

const authenticatedUser = (req, res, next) => {
  if (req.user) next()
  else next(new Error('User is not logged in'))
}

module.exports = {leaderValidate, authenticatedUser}
