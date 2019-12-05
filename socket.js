import io from 'socket.io-client'
import {ngrok} from './ngrok.js'
import React, {createContext} from 'react'

const socket = io(ngrok)
socket.on('connect', () => {
  console.log(`you are ${socket.id}`)
})
socket.on('disconnect', () => {
  console.log(`see you later ${socket.id}`)
})

export const SocketContext = React.createContext()

export default socket
