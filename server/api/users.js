const router = require('express').Router()
const {Routine, Interval, User, Workout, Class} = require('../db/models')
const Sequelize = require('sequelize')
const db = require('../db')
const {leaderValidate, authenticatedUser} = require('./authFunctions')

router.get(`/:id`, async (req, res, next) => {
  try {
    const user = await findById(req.params.id)
    res.json(user)
  } catch (error) {
    console.error(error)
  }
})

//hopefully it finds the user's classes
router.get('/:userId/myClasses', authenticatedUser, async (req, res, next) => {
  try {
    const myClasses = await Class.findAll({
      where: {
        userId: req.params.userId
      }
    })
    if (!myClasses) res.status(404).send("can't find user's classes")
    res.json(myClasses)
  } catch (err) {
    next(err)
  }
})

module.exports = router
