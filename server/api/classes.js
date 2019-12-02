const router = require('express').Router()
const {Class, Routine, User, Interval, Attendees} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {leaderValidate, authenticatedUser} = require('./authFunctions')

// Quick and dirty testing DO NOT USE IN PRODUCTION
router.use(async (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    req.login((await Class.findOne({include: [User]})).user, err =>
      err ? next(err) : 'good!'
    )
  }
  next()
})
// POST - Enrolling in a class
router.post(`/`, authenticatedUser, async(req,res,next)=>{
  console.log('REQBODY FROM POST---', req.body)

  try{
    let enrollment = await Attendees.create({
      classId:req.body.classId,
      userId:req.body.studentId
    })
    console.log("enrollment", enrollment)
    res.json(enrollment).status(200)
  } catch(error){
    console.error(error)
  }
})
// DELETE - leaving class
router.delete(`/:classId`, authenticatedUser, async (req, res, next) => {
  console.log('REACHING HERE AT DELETING CLASSES', req.user)

  try {
    let ditchedClass = await Attendees.destroy({
      where: {
        classId: req.params.classId,
        userId: req.user.id
      }
    })
    res.json(ditchedClass).status(200)
  } catch (error) {
    console.error(error)
  }
})

// GET all classes at /api/class (for populating the class list for search)
router.get('/',  authenticatedUser, async (req, res, next) => {
  try {
    // are we using req.query with React Native?
    const {
      query: {search}
    } = req
    const classes = await Class.findAll({
      // including users for class counts -- may not need this but including it for now?
      include: [
        {
          model: User,
          as: 'attendees',
          attributes: ['id'],
          through: {
            attributes: []
          }
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
        attributes: ['id', 'email', 'age', 'sex'],
        through: {
          attributes: []
        }
      })
    const currentClass = await Class.findByPk(classId, {
      // include age, sex, role of attendees?
      // used to load up the routine/intervals for every user and class list
      include,
      attributes: ['id', 'name', 'canEnroll', 'when']
    })
    if (!currentClass) throw new Error(`Class with id ${classId} not found.`)
    res.status(200).json(currentClass)
  } catch (err) {
    next(err)
  }
})

module.exports = router
