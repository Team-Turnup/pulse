import io from 'socket.io-client'
import {ngrok} from './ngrok.js'
import React from 'react'
import store from './store'
import {getClassesThunk} from './store/classes'
import {updateStartTime} from './store/singleClass'

const socket = io(ngrok)
socket.on('classCreated', () => {
  // global event listener for all connected clients
  // fetches new list of classes from the server
  store.dispatch(getClassesThunk())
})
socket.on('classUpdated', when => {
  // global event listener for all connected clients
  // fetches new list of classes from the server
  store.dispatch(updateStartTime(when))
  console.log('class updated!')
})

export const SocketContext = React.createContext()

export default socket
