const router = require('express').Router()
const {
  Workout,
  WorkoutTimestamp,
  Routine,
  Interval,
  Class
} = require('../db/models')
// const Sequelize = require('sequelize')
// const Op = Sequelize.Op
const {authenticatedUser} = require('./authFunctions')

// GET a previous workout /api/workouts/:workoutId
router.get('/:workoutId', authenticatedUser, async (req, res, next) => {
  try {
    const {
      params: {workoutId}
    } = req
    const workout = await Workout.findByPk(workoutId, {
      attributes: ['id', 'timestamp'],
      include: [
        {
          model: WorkoutTimestamp,
          attributes: ['id', 'timestamp', 'cadence', 'goalCadence']
        },
        {
          model: Routine,
          attributes: ['id', 'name', 'activityType'],
          include: [
            {
              model: Interval,
              attributes: ['id', 'cadence', 'duration', 'activityType']
            }
          ]
        },
        {
          model: Class,
          attributes: ['id', 'name']
        }
      ]
    })
    res.status(200).json(workout)
  } catch (err) {
    next(err)
  }
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
      workout.setRoutine(routine)
      // ...((classId && workout.setClass(classId)) || [])
    ])
    res.status(200).json({workout, routine})
  } catch (err) {
    next(err)
  }
})

module.exports = router
