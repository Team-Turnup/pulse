const router = require('express').Router();
const { Routine } = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const routines = await Routine.findAll({
      include: [{ model: Interval }, { model: User }, { model: Workout }],
    });
    res.json(routines);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
