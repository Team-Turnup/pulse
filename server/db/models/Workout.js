const Sequelize = require('sequelize')
const db = require('../db')

const Workout = db.define('workout', {
    timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
})

module.exports = Workout