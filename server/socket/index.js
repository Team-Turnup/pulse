const {WorkoutTimestamp, Workout, Class} = require('../db/models')

const _generateTimestamp = async (workoutId, workoutTimestamp, currentStepCount) => {
  try {
    const newWorkoutTimestamp = await WorkoutTimestamp.create(workoutTimestamp)
    await newWorkoutTimestamp.setWorkout(workoutId)
    const workout = await Workout.findByPk(workoutId)
    await workout.update({...workoutTimestamp, currentStepCount})
  } catch (err) {
    console.error('Failed to create timestamp', err)
  }
}

module.exports = io => {
  let classes = {}
  const initialLeader = {socket: null, userId: null}
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    const informLeader = (classId, event, ...payload) => {
      // generic helper function for telling the leader of a class that something has happened
      if (classes[classId] && classes[classId].leader) {
        console.log(`Leader of ${classId} is being informed of ${event}`)
        socket.to(classes[classId].leader.socket).emit(event, ...payload)
      }
    }

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on(
      'workoutTimestamp',
      (userId, workoutTimestamp, workoutId, classId, currentStepCount) => {
        // workout data is coming over from the followers
        if (classId) {
          const _class = classes[classId]
          const timestamps = _class.userTimestamps.get(userId)

          _class.userLastTimestamp.set(userId, workoutTimestamp)

          // if the list of timestamps exists, add to it, otherwise create it
          if (timestamps && timestamps.length) {
            timestamps.push(workoutTimestamp)
          } else {
            _class.userTimestamps.set(userId, [workoutTimestamp])
          }
          informLeader(
            classId,
            'workoutTimestamp',
            userId,
            timestamps,
            workoutTimestamp
          )
        }
        _generateTimestamp(workoutId, workoutTimestamp, currentStepCount)
      }
    )

    socket.on('start', (classId, userId, proposedStart) => {
      // the leader starts the class
      const when = Date.now()
      if (classes[classId] && classes[classId].leader.userId === userId) {
        socket
          .to(classId)
          .emit(
            'start',
            proposedStart,
            Object.fromEntries(classes[classId].followers.entries())
          )
      }
      Class.findByPk(classId)
        .then(c => c.update({when}))
        .then(() => socket.in('classId').emit('classUpdated', when))
        .catch(e => console.error(e))
    })

    socket.on(
      'subscribe',
      (classId, userId, isLeader = false, now, color = '#ffffff') => {
        // case 1: the first user has entered the class, create the class structure
        if (!classes[classId]) {
          classes[classId] = {
            leader: {...initialLeader},
            followers: new Map(),
            colors: new Map(),
            userTimestamps: new Map(),
            userLastTimestamp: new Map()
          }
          console.log(`class ${classId} created`)
        }
        if (
          isLeader &&
          (!classes[classId].leader.userId ||
            classes[classId].leader.userId === userId)
        ) {
          // case 2: the class exists and the socket is coming from the leader, set the leader
          classes[classId].leader.socket = socket.id
          classes[classId].leader.userId = userId
        } else {
          // case 3: a regular user has joined the class, find their offset
          classes[classId].followers.set(userId, now - Date.now())
          classes[classId].colors.set(userId, color)
        }
        // always have the socket subscribe to the channel and inform the leader of the change
        socket.join(classId)
        informLeader(
          classId,
          'classList',
          Array.from(classes[classId].followers.keys()),
          Object.fromEntries(classes[classId].colors.entries())
        )
      }
    )
    socket.on('joined', (classId, user) => {
      console.log(`${user.name} has joined ${classId}`)
      informLeader(classId, 'joined', user)
      if (classes[classId] && classes[classId].followers.has(user.id))
        informLeader(
          classId,
          'classList',
          Array.from(classes[classId].followers)
        )
    })

    socket.on('left', (classId, userId) => {
      // a follower has left the class
      console.log(`${userId} has left ${classId}`)
      informLeader(classId, 'left', userId)
    })

    socket.on('unsubscribe', (classId, userId, isLeader = false) => {
      // a client has unmounted from the waiting for workout screen
      if (isLeader && classes[classId].leader.socket === socket.id) {
        classes[classId].leader = initialLeader
      }
      socket.leave(classId)
      classes[classId].followers.delete(userId)
      classes[classId].colors.delete(userId)
      informLeader(classId, 'classList', Array.from(classes[classId].followers))
      if (
        !classes[classId].leader.socket &&
        !classes[classId].leader.userId &&
        !classes[classId].followers.size
      ) {
        delete classes[classId]
        console.log(`class ${classId} deleted`)
      }
    })

    socket.on('classCreated', () => {
      // inform all other clients that the class has been created
      socket.emit('classCreated')
    })
  })
}
