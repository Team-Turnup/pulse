const Class = require('./Class')
const Interval = require('./Interval')
const Option = require('./Option')
const Playlist = require('./Playlist')
const Routine = require('./Routine')
const User = require('./User')
const Workout = require('./Workout')
const WorkoutTimestamp = require('./WorkoutTimestamp')

Class.hasMany(Workout) ///
Class.belongsTo(Routine) //
Class.belongsTo(User) // class leader
Class.belongsToMany(User, {as: 'attendees', through: 'Attendees'})

Interval.belongsTo(Routine) ///

Option.belongsTo(User)
Option.belongsTo(Routine)
Option.belongsTo(Interval)

Playlist.belongsTo(Class)
Playlist.belongsTo(Routine)
Playlist.belongsTo(Workout)

Routine.hasMany(Class)
Routine.hasMany(Interval)
Routine.belongsTo(User)
Routine.hasMany(Workout)

User.belongsToMany(User, {as: 'friend', through: 'Friends'})
User.hasMany(Workout)
User.hasMany(Routine)
User.hasMany(Class) // class leader
User.belongsToMany(Class, {as: 'attendee', through: 'Attendees'})
User.hasOne(Option)

Workout.belongsTo(Class)
Workout.belongsTo(User)
Workout.belongsTo(Routine)
Workout.hasMany(WorkoutTimestamp) ///

WorkoutTimestamp.belongsTo(Workout)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  Class,
  Interval,
  Option,
  Playlist,
  Routine,
  User,
  Workout,
  WorkoutTimestamp
}
