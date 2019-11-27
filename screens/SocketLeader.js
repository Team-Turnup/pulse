import React, {useState} from 'react'
import socket from '../socket.js'
import {StyleSheet, View} from 'react-native'
import {Container, Content, Text} from 'native-base'

export default () => {
  const [roomNum, setRoomNum] = useState(1)
  socket.emit('create', roomNum)
  socket.emit('message', roomNum, `I am the leader of ${roomNum}`)
  return <Text>Leader for {roomNum}</Text>
}
