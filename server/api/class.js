const router = require('express').Router()
const {Class, Routine, User, Interval} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {leaderValidate, authenticatedUser} = require('./authFunctions')

//should modify more
router.post('/', authenticatedUser, async (req, res, next) => {
  try {
    const {user, body} = req
    const {name, canEnroll, when, attendees, classPasscode} = body
    let currentClass = await Class.create({
      name: name,
      canEnroll: canEnroll,
      when,
      attendees,
      classPasscode
    })
    if (!currentClass) throw new Error(`Class not found.`)
    res.status(200).json(currentClass)
  } catch (err) {
    next(err)
  }
})

module.exports = router
