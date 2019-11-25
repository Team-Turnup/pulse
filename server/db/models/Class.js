const Sequelize = require('sequelize')
const db = require('../db')

const Class = db.define('class', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    canEnroll: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    live: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Class