const {WorkoutTimestamp, User} = require('../db/models')

module.exports = io => {
  let classes = {
    /* [classId]: {leader: socketId, followers: []}*/
  }
  const initialLeader = {socket: null, userId: null}
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    const informLeader = (classId, event, ...payload) => {
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
      async (userId, workoutTimestamp, workoutId, classId, color) => {
        const newWorkoutTimestamp = await WorkoutTimestamp.create(
          workoutTimestamp
        )
        newWorkoutTimestamp.setWorkout(workoutId)
        if (classId)
          informLeader(
            classId,
            'workoutTimestamp',
            userId,
            workoutTimestamp,
            color
          )
      }
    )

    socket.on('start', (classId, userId, proposedStart) => {
      if (classes[classId] && classes[classId].leader.userId === userId) {
        socket
          .to(classId)
          .emit(
            'start',
            proposedStart,
            Object.fromEntries(classes[classId].followers.entries())
          )
      }
    })

    socket.on(
      'subscribe',
      (classId, userId, isLeader = false, now, color = '#ffffff') => {
        if (!classes[classId]) {
          classes[classId] = {
            leader: {...initialLeader},
            followers: new Map(),
            colors: new Map()
          }
          console.log(`class ${classId} created`)
        }
        if (
          isLeader &&
          (!classes[classId].leader.userId ||
            classes[classId].leader.userId === userId)
        ) {
          classes[classId].leader.socket = socket.id
          classes[classId].leader.userId = userId
        } else {
          classes[classId].followers.set(userId, now - Date.now())
          classes[classId].colors.set(userId, color)
        }
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
      console.log(`${userId} has left ${classId}`)
      informLeader(classId, 'left', userId)
    })

    socket.on('unsubscribe', (classId, userId, isLeader = false) => {
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
      socket.emit('classCreated')
    })
  })
}
