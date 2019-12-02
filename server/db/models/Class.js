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
  when: {
    type: Sequelize.DATE
  },
  classPasscode: {
    type: Sequelize.STRING,
    defaultValue: ''
  }
})

module.exports = Class
