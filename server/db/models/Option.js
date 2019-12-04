const Sequelize = require('sequelize')
const db = require('../db')

const Option = db.define('option', {
  hapticWhat: {
    type: Sequelize.ENUM([
      'singlebeat',
      'heartbeat',
      'triplet',
      'doubletime',
      'tripletime',
      'quadrupletime'
    ]),
    defaultValue: 'singlebeat'
  },
  hapticWhen: {
    type: Sequelize.ENUM(['everybeat', 'mute', 'muteAtGoal']),
    defaultValue: 'muteAtGoal'
  },
  audioWhat: {
    type: Sequelize.ENUM(['tick', 'chirp', 'bass']),
    defaultValue: 'tick'
  },
  audioWhen: {
    type: Sequelize.ENUM(['everybeat', 'mute', 'muteAtGoal']),
    defaultValue: 'muteAtGoal'
  },
  visualWhat: {
    type: Sequelize.ENUM(['blink']),
    defaultValue: 'blink'
  },
  visualColor: {
    type: Sequelize.STRING,
    defaultValue: '#0000FF'
  },
  visualWhen: {
    type: Sequelize.ENUM(['everybeat', 'mute', 'muteAtGoal']),
    defaultValue: 'muteAtGoal'
  }
})

module.exports = Option
