const router = require('express').Router()

module.exports = router

router.use('/routines', require('./routines'))
router.use('/classes', require('./classes'))
router.use('/workouts', require('./workouts'))
//router.use('/myClasses', require('./myClasses'))
router.use('/users', require('./users'))
router.use('/class', require('./class'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
