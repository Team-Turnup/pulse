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

//hopefully it finds the user's classes
router.get('/myClasses', authenticatedUser, async (req, res, next) => {
  try {
    const myClasses = await Class.findAll({
      // include: [
      //   {
      //     model: User,
      where: {
        userId: req.user.id
      }
      //   }
      // ]
    })
    if (!myClasses) res.status(404).send("can't find user's classes")
    res.json(myClasses)
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
    console.log(req.body)
    const option = await Option.findOne({where: {userId: req.user.id}})
    await option.update(req.body)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

module.exports = router
