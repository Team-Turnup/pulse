const router = require('express').Router()

module.exports = router

router.use('/routines', require('./routines'))
router.use('/classes', require('./classes'))
//router.use('/users', require('./users'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
