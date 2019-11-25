const Sequelize = require('sequelize')
const db = require('../db')

const WorkoutTimestamp = db.define('workoutTimestamp', {
    cadence: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
  timestamp: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
  },
})

module.exports = WorkoutTimestamp