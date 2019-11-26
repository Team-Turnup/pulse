const router = require('express').Router()
const {Class, Routine, Interval, User} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {leaderValidate} = require('./authFunctions')

// GET all classes at /api/class (for populating the class list for search)
router.get('/', async (req, res, next) => {
  try {
    const classes = await Class.findAll({
      // including users for class counts -- may not need this but including it for now?
      include: [User]
    })
    res.status(200).json(classes)
  } catch (err) {
    next(err)
  }
})

// GET single class /api/class/:classId (for populating class data)
router.get('/:classId', async (req, res, next) => {
  try {
    const {
      params: {classId}
    } = req
    const currentClass = await Class.findByPk(classId, {
      //
      include: [{model: User, attributes: ['id', 'name']}, Routine, Interval]
    })
    res.status(200).json(classes)
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
