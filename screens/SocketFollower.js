import React, {useState} from 'react'
import socket from '../socket.js'
import {StyleSheet, View} from 'react-native'
import {Container, Content, Text} from 'native-base'

export default () => {
  const [roomNum, setRoomNum] = useState(1)
  socket.emit('message', roomNum, `I am the follower of ${roomNum}`)
  return <Text>Follower for {roomNum}</Text>
}
