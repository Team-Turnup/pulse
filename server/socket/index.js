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

    // socket.on('identify', classId => {
    //   classes.push({[classId]: socket.id})
    // })

    socket.on('workoutTimestamp', async ({workoutTimestamp, workoutId}) => {
      const newWorkoutTimestamp = await WorkoutTimestamp.create(
        workoutTimestamp
      )
      newWorkoutTimestamp.setWorkout(workoutId)
    })

    socket.on('subscribe', (classId, userId, isLeader = false) => {
      if (!classes[classId]) {
        classes[classId] = {leader: {...initialLeader}, followers: new Set()}
        console.log(`class ${classId} created`)
      }
      if (
        isLeader &&
        (!classes[classId].leader.userId ||
          classes[classId].leader.userId === userId)
      ) {
        classes[classId].leader.socket = socket.id
        classes[classId].leader.userId = userId
      } else classes[classId].followers.add(userId)
      socket.join(classId)
      informLeader(classId, 'classList', Array.from(classes[classId].followers))
    })

    socket.on('joined', (classId, user) => {
      console.log(`${user.name} has joined ${classId}`)
      informLeader(classId, 'joined', user)
    })

    socket.on('unsubscribe', (classId, userId, isLeader = false) => {
      if (isLeader && classes[classId].leader.socket === socket.id) {
        classes[classId].leader = initialLeader
      }
      socket.leave(classId)
      classes[classId].followers.delete(userId)
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
  })
}
