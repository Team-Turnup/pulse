const router = require('express').Router()
const {
  Routine,
  Interval,
  User,
  Workout,
  Class,
  Option
} = require('../db/models')
const Sequelize = require('sequelize')
const db = require('../db')
const {leaderValidate, authenticatedUser} = require('./authFunctions')

// router.get(`/:id`, async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id)
//     res.json(user)
//   } catch (error) {
//     console.error(error)
//   }
// })

//GET all classes where user is attendee
router.get('/myClasses', authenticatedUser, async (req, res, next) => {
  try {
    const enrolledClasses = await req.user.getAttendee({
      include: [{model: User}, {model: Routine, include: [{model: Interval}]}]
    })
    const leaderClasses = await req.user.getClasses({
      include: [{model: User}, {model: Routine, include: [{model: Interval}]}]
    })
    if (!enrolledClasses) res.status(404).send("can't find user's classes")
    res.json([...enrolledClasses, ...leaderClasses]).status(200)
  } catch (err) {
    next(err)
  }
})

router.get('/myWorkouts', authenticatedUser, async (req, res, next) => {
  try {
    const myWorkouts = await Workout.findAll({
      where: {
        userId: req.user.id
      },
      include: [{model: Routine, include: [Interval]}],
      order: [['timestamp', 'DESC']]
    })
    if (!myWorkouts) res.status(404).send("can't find user's workouts")
    res.json(myWorkouts)
  } catch (err) {
    next(err)
  }
})

router.get('/myRoutines', authenticatedUser, async (req, res, next) => {
  try {
    const myRoutines = await Routine.findAll({
      where: {
        userId: req.user.id
      },
      include: [Interval]
    })
    // const myClassRoutines = ...
    if (!myRoutines) res.status(404).send("can't find user's routines")
    res.json(myRoutines)
  } catch (err) {
    next(err)
  }
})

router.put('/', authenticatedUser, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    await user.update(req.body)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.put('/options', authenticatedUser, async (req, res, next) => {
  try {
    const option = await Option.findOne({where: {userId: req.user.id}})
    await option.update(req.body)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

module.exports = router
