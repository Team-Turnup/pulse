const router = require("express").Router();
const { Routine, Interval } = require("../db/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const routines = await Routine.findAll({
      include: [{ model: Interval }, { model: User }, { model: Workout }]
    });
    res.json(routines);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      user,
      body: { name, activityType, routine }
    } = req;
    console.log(name, activityType, routine);
    if (user) {
      console.log("do things");
    }
    const newRoutine = await Routine.create({
      name,
      activityType
      // userId: user.id
    });
    if (!newRoutine) throw new Error("Routine not created");
    await newRoutine.addIntervals(
      await Promise.all(routine.map(r => Interval.create(r)))
    );
    res.status(201).json(newRoutine);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
