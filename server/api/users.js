const router = require('express').Router()
const {Routine, Interval, User, Workout} = require('../db/models')
const Sequelize = require('sequelize')
const db = require('../db')

router.get(`/:id`, async (req, res, next) => {
  try {
    const user = await findById(req.params.id)
    res.json(user)
  } catch (error) {
    console.error(error)
  }
})
