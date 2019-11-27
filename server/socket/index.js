module.exports = io => {
  let roomLeaders = {}
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    // socket.on('identify', roomNum => {
    //   roomLeaders.push({[roomNum]: socket.id})
    // })

    socket.on('subscribe', roomNum, isLeader => {
      if (isLeader) {
        console.log('hello leader')
        roomLeaders[roomNum] = socket.id
      }
      socket.join(roomNum)
    })

    socket.on('unsubscribe', roomNum, isLeader => {
      if (isLeader) {
        console.log('bye leader')
        delete roomLeaders[roomNum]
      }
      socket.leave(roomNum)
    })

    socket.on('message', (roomNum, message) => {
      console.log(message)
      socket.to(roomLeaders[roomNum]).emit('message', message)
    })
  })
}
