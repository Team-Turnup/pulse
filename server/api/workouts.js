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
router.get('/:workoutId', async (req, res, next) => {
  try {
    const {
      params: {workoutId}
    } = req
    const workout = await Workout.findByPk(workoutId, {
      attributes: ['id', 'timestamp', 'currentStepCount'],
      include: [
        {
          model: WorkoutTimestamp,
          attributes: ['id', 'timestamp', 'cadence', 'goalCadence'],
          orderBy: [['timestamp', 'ASC']]
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
      body: {routineId, classStart, classId},
      user
    } = req
    const workout = await Workout.create()
    const routine = await Routine.findByPk(routineId, {include: [Interval]})
    await Promise.all([
      workout.setUser(user),
      workout.setRoutine(routine)
      // ...((classId && workout.setClass(classId)) || [])
    ])

    if (classStart) {
      const _class = await Class.findByPk(classId)
      await workout.setClass(_class)
      const {name, activityType, intervals} = routine
      let newRoutine = await Routine.create({
        name,
        activityType,
        makePublic: false
      })
      await newRoutine.setUser(user.id)
      if (!newRoutine) throw new Error('Routine not created')
      await newRoutine.setIntervals(
        await Promise.all(
          intervals.map(interval =>
            Interval.create({
              cadence: interval.cadence,
              duration: interval.duration,
              activityType: interval.activityType
            })
          )
        )
      )
      routine = await Routine.findByPk(newRoutine.id, {include: [Interval]})
    }

    // set user and routine, conditionally add classId if provided
    res.status(200).json({workout, routine})
  } catch (err) {
    next(err)
  }
})

module.exports = router
