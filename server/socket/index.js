module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('create', roomNum => {
      socket.join(roomNum)
    })

    socket.on('messsage', (roomNum, message) => {
      socket.to(roomNum).emit(message)
    })
  })
}
