const router = require('express').Router()
const User = require('../db/models/User')
const Option = require('../db/models/Option')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    const option = await Option.findOne({where: {userId: user.id}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json({user, option})))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    const option = await Option.findOne({where: {userId: user.id}})
    req.login(user, err => (err ? next(err) : res.json({user, option})))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.sendStatus(200)
})

router.get('/me', (req, res) => {
  console.log(req.user)
  res.json(req.user)
})

router.use('/google', require('./google'))
