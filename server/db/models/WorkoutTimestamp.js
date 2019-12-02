const Sequelize = require('sequelize')
const db = require('../db')

const WorkoutTimestamp = db.define('workoutTimestamp', {
    cadence: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
  timestamp: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
  },
  goalCadence: {
    type: Sequelize.INTEGER,
    allowNull: false
},
})

module.exports = WorkoutTimestamp