const router = require('express').Router()
const {Class, Routine, User, Interval, Attendees} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {leaderValidate, authenticatedUser} = require('./authFunctions')

// POST - Enrolling in a class
router.post(`/:classId`, authenticatedUser, async (req, res, next) => {
  let enrolledClass
  try {
    const {
      user,
      params: {classId}
    } = req
    enrolledClass = await Class.findByPk(classId, {
    attributes: ['id', 'name', 'canEnroll', 'when'],
    include: [
      {
        model: Routine,
        attributes: ['id', 'name', 'activityType'],
        include: [
          {
            model: Interval,
            attributes: ['id', 'activityType', 'cadence', 'duration']
          }
        ]
      }
    ]
  })
    await user.addAttendee(classId)
    res.status(200).json(enrolledClass)
  } catch (error) {
    console.error(error)
    if (error.name==='SequelizeUniqueConstraintError') {
      res.status(200).json(enrolledClass)
    }
  }
})
// DELETE - leaving class
router.delete(`/:classId`, authenticatedUser, async (req, res, next) => {
  try {
    const {
      user,
      params: {classId}
    } = req
    const deleteConfirm = await user.removeAttendee(classId)
    if (!deleteConfirm)
      throw new Error(`User is not enrolled in class ${classId}`)
    res.status(200).send('Deleted')
  } catch (error) {
    console.error(error)
  }
})

// GET all classes at /api/class (for populating the class list for search)
router.get('/', authenticatedUser, async (req, res, next) => {
  try {
    // are we using req.query with React Native?
    const {
      query: {search}
    } = req
    const classes = await Class.findAll({
      // including users for class counts -- may not need this but including it for now?
      include: [
        User,
        {
          model: User,
          as: 'attendees',
          attributes: ['id'],
          through: {
            attributes: []
          }
        },
        {
          model: Routine,
          include: [
            {
              model: Interval,
              attributes: ['id', 'activityType', 'cadence', 'duration']
            }
          ]
        }
      ],
      ...(search && {
        where: {
          name: {[Op.iLike]: `%${search}%`}
        }
      })
    })
    res.json(classes).status(200)
  } catch (err) {
    next(err)
  }
})

// GET single class /api/class/:classId (for populating class data)
// Currently assuming live class and that attendees and leaders don't need different data
router.get('/:classId', authenticatedUser, async (req, res, next) => {
  try {
    const {
      params: {classId},
      user
    } = req
    const include = [
      {
        model: Routine,
        attributes: ['id', 'name', 'activityType'],
        include: [
          {
            model: Interval,
            attributes: ['id', 'activityType', 'cadence', 'duration']
          }
        ]
      }
    ]
    if (await user.hasClass(classId))
      include.push({
        model: User,
        as: 'attendees',
        attributes: ['id', 'name', 'age', 'gender'],
        through: {
          attributes: []
        }
      })
    const currentClass = await Class.findByPk(classId, {
      include,
      attributes: ['id', 'name', 'canEnroll', 'when']
    })
    if (!currentClass) throw new Error(`Class with id ${classId} not found.`)
    res.status(200).json(currentClass)
  } catch (err) {
    next(err)
  }
})

router.post('/', authenticatedUser, (req, res, next) => {
  const {body, user} = req
  const {name, canEnroll, when, classPasscode, routineId} = body
  Class.create(
    {
      name,
      canEnroll,
      when,
      classPasscode
    }
    // {
    //   include: [
    //     {
    //       model: Routine,
    //       attributes: ['id', 'name', 'activityType'],
    //       include: [
    //         {
    //           model: Interval,
    //           attributes: ['id', 'activityType', 'cadence', 'duration']
    //         }
    //       ]
    //     },
    //     {
    //       model: User,
    //       as: 'attendees',
    //       attributes: ['id', 'email', 'age', 'gender'],
    //       through: {
    //         attributes: []
    //       }
    //     }
    //   ]
    // }
  )
    .then(async c => {
      await c.setUser(user.id)
      await c.setRoutine(routineId)
      if (!c) throw new Error(`Class not found.`)
      return c.id
    })
    .then(id =>
      Class.findByPk(id, {
        attributes: ['id', 'name', 'canEnroll', 'when'],
        include: [
          {
            model: Routine,
            attributes: ['id', 'name', 'activityType'],
            include: [
              {
                model: Interval,
                attributes: ['id', 'activityType', 'cadence', 'duration']
              }
            ]
          },
          {
            model: User,
            as: 'attendees',
            attributes: ['id', 'name', 'age', 'gender'],
            through: {
              attributes: []
            }
          }
        ]
      })
    )
    .then(currentClass => {
      res.status(200).json(currentClass)
    })
    .catch(e => next(e))
})

module.exports = router
