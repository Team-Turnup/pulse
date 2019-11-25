const Sequelize = require('sequelize')
const db = require('../db')

const Playlist = db.define('playlist', {
  name: {
      type: Sequelize.STRING,
      allowNull: false
  },
  songs: {
      type: Sequelize.ARRAY(Sequelize.STRING),
  }
})

module.exports = Playlist