import io from 'socket.io-client'
import {ngrok} from './ngrok.js'

const socket = io(ngrok)
socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
