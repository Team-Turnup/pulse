import io from 'socket.io-client'
import {ngrok} from './ngrok.js'
import React from 'react'
import store from './store'
import getClassesThunk from './store/classes'

const socket = io(ngrok)
socket.on('classCreated', () => {
  store.dispatch(getClassesThunk)
})

export const SocketContext = React.createContext()

export default socket
