import io from 'socket.io-client'
import {ngrok} from './ngrok.js'

const socket = io(ngrok)
socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('message', message => console.log(message))

socket.on('ready', userId => console.log(`${userId} is ready`))

export default socket
