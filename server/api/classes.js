const router = require('express').Router()
const {Class, Routine, Interval, User} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {leaderValidate} = require('./authFunctions')

// GET all classes at /api/class (for populating the class list for search)
router.get('/', async (req, res, next) => {
  try {
    // are we using req.query with React Native?
    const {
      query: {search}
    } = req
    const classes = await Class.findAll({
      // including users for class counts -- may not need this but including it for now?
      include: [User],
      where: {
        name: {[Op.iLike]: `%${search}%`}
      }
    })
    res.status(200).json(classes)
  } catch (err) {
    next(err)
  }
})

// GET single class /api/class/:classId (for populating class data)
// Currently assuming live class and that attendees and leaders don't need different data
router.get('/:classId', async (req, res, next) => {
  try {
    const {
      params: {classId}
    } = req
    const currentClass = await Class.findByPk(classId, {
      // include age, sex, role of attendees?
      // used to load up the routine/intervals for every user and class list
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
          through: {
            /* I want the attendees not the owner */
          }
        },
        Routine,
        Interval
      ]
    })
    if (!currentClass) throw new Error(`Class with id ${classId} not found.`)
    res.status(200).json(currentClass)
  } catch (err) {
    next(err)
  }
})

// router.post('/', async (req, res, next) => {
//   try {
//     const {
//       user,
//       body: {name, activityType, routine}
//     } = req
//     console.log(name, activityType, routine)
//     if (user) {
//       console.log('do things')
//     }
//     const newRoutine = await Routine.create({
//       name,
//       activityType
//       // userId: user.id
//     })
//     if (!newRoutine) throw new Error('Routine not created')
//     await newRoutine.addIntervals(
//       await Promise.all(routine.map(r => Interval.create(r)))
//     )
//     res.status(201).json(newRoutine)
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router
