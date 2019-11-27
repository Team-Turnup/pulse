module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('subscribe', roomNum => {
      console.log(`subscribed to ${roomNum}`)
      socket.join(roomNum)
    })

    socket.on('unsubscribe', roomNum => {
      console.log(`unsubscribed from ${roomNum}`)
      socket.leave(roomNum)
    })

    socket.on('message', (roomNum, message) => {
      console.log(message)
      socket.to(roomNum).emit('message', message)
    })
  })
}
