module.exports = io => {
  let classes = {
    /* [classId]: {leader: socketId, followers: []}*/
  }
  const initialLeader = {socket: null, userId: null}
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    // socket.on('identify', classId => {
    //   classes.push({[classId]: socket.id})
    // })

    socket.on('subscribe', (classId, userId, isLeader = false) => {
      if (!classes[classId]) {
        classes[classId] = {leader: {...initialLeader}, followers: []}
        console.log(`class ${classId} created`)
      }
      console.log('classId', classId, 'userId', userId, 'isLeader', isLeader)
      if (
        isLeader &&
        (!classes[classId].leader.userId ||
          classes[classId].leader.userId === userId)
      ) {
        console.log(userId)
        classes[classId].leader.socket = socket.id
        classes[classId].leader.userId = userId
        socket.to(socket.id).emit('classList', classes[classId].followers)
      } else classes[classId].followers.push(userId)
      socket.join(classId)
      console.log(classes)
    })

    socket.on('unsubscribe', (classId, userId, isLeader = false) => {
      if (isLeader && classes[classId].leader.socket === socket.id) {
        console.log('bye leader')
        classes[classId].leader = initialLeader
      }
      socket.leave(classId)
      classes[classId].followers = classes[classId].followers.filter(
        d => d !== userId
      )
      if (
        !classes[classId].leader.socket &&
        !classes[classId].leader.userId &&
        !classes[classId].followers.length
      )
        delete classes[classId]
      console.log(classes)
    })

    socket.on('message', (classId, message) => {
      console.log(message)
      socket.to(classes[classId].leader.socket).emit('message', message)
    })
  })
}
