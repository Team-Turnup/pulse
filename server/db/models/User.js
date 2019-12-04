const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Option = require('./Option')

const User = db.define('user', {
  role: {
    type: Sequelize.ENUM(['leader', 'follower']),
    defaultValue: 'follower'
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {isEmail: true}
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING,
    unique: true
  },
  spotifyId: {
    type: Sequelize.STRING
  },
  playlistGenrePrefs: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  playlistArtistPrefs: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  name: Sequelize.STRING,
  age: Sequelize.INTEGER,
  gender: Sequelize.ENUM(['male', 'female', 'non-binary']),
  height: Sequelize.INTEGER,
  weight: Sequelize.INTEGER,
  image: Sequelize.BLOB
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

const createOptions = async user => {
  const option = await Option.create()
  await user.setOption(option)
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})

User.afterCreate(createOptions)
