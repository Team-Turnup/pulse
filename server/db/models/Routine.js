const Sequelize = require('sequelize')
const db = require('../db')

const Routine = db.define('routine', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
  activityType: {
    type: Sequelize.ENUM(['running', 'walking', 'jumpingJacks', 'pushups', 'stairs', 'rowing', 'swimming', 'dancing', 'playingMusic', 'breathing', 'combo']),
      allowNull: false
  },
    public: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
})

module.exports = Routine