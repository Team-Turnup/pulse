const router = require('express').Router()
const {User, Class} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      //attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// router.put('/login', async (req, res, next) => {
//   try {
//     const user = await User.findOne({
//       where: {
//         email: req.body.email
//       }
//     })
//     if (!user) {
//       console.log('No such user found:', req.body.email)
//       res.status(401).send('Wrong email and/or password')
//     } else if (!user.correctPassword(req.body.password)) {
//       console.log('Incorrect password for user:', req.body.email)
//       res.status(401).send('Wrong email and/or password')
//     } else {
//       res.json(user)
//     }
//   } catch (err) {
//     console.log('failing in api/users.put')
//     next(err)
//   }
// })

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {email: req.body.email},
      include: [
        {
          model: Class
        }
      ]
    })
    console.log(user)
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})
