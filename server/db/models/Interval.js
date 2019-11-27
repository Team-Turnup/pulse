const Sequelize = require('sequelize')
const db = require('../db')

const Interval = db.define('interval', {
  activityType: {
      type: Sequelize.ENUM(['running', 'walking', 'jumping jacks', 'push-ups', 'stairs', 'rowing', 'swimming', 'dancing', 'playing music', 'breathing', 'jumprope', 'cycling']),
      allowNull: false
  },
  cadence: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
          min: 0,
          max: 999
      }
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
        min: -1,
        max: 999
    }
}
})

module.exports = Interval
