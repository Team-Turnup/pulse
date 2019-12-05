import io from 'socket.io-client'
import {ngrok} from './ngrok.js'
import React, {createContext} from 'react'

const socket = io(ngrok)

export const SocketContext = React.createContext()

export default socket
