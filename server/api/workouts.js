const router = require('express').Router()
const {Workout, WorkoutTimestamp, User, Routine} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {authenticatedUser} = require('./authFunctions')

// Quick and dirty testing DO NOT USE IN PRODUCTION
router.use(async (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    req.login((await Workout.findOne({include: [User]})).user, err =>
      err ? next(err) : 'good!'
    )
  }
  next()
})

// GET logged in user's previous workouts at /api/workouts (workout history-- filter to complete?)
router.get('/', authenticatedUser, async (req, res, next) => {
  try {
    const {user} = req
    const workouts = await Workout.findAll({
      include: [WorkoutTimestamp],
      where: {
        userId: user.id
      }
    })
    res.status(200).json(workouts)
  } catch (err) {
    next(err)
  }
})

// POST and create a new workout /api/workouts with start time
router.post('/', authenticatedUser, async (req, res, next) => {
  try {
    const {
      body: {routineId},
      user
    } = req
    const workout = await Workout.create()
    const routine = await Routine.findByPk(routineId)

    // set user and routine, conditionally add classId if provided
    await Promise.all([
      workout.setUser(user),
      workout.setRoutine(routine),
      // ...((classId && workout.setClass(classId)) || [])
    ])
    res.status(200).json({workout, routine})
  } catch (err) {
    next(err)
  }
})

module.exports = router
