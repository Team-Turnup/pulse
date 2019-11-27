import React, {useState} from 'react'
import socket from '../socket.js'
import {StyleSheet, View} from 'react-native'
import NumericInput from 'react-native-numeric-input'
import {Container, Content, Text, Button, Input} from 'native-base'

export default () => {
  const [roomNum, setRoomNum] = useState(1)
  // socket.emit('create', roomNum)
  const sendMessage = () => {
    console.log('here')
    socket.emit('message', roomNum, `I am the leader of ${roomNum}`)
  }
  return (
    <View>
      <NumericInput value={roomNum} onChange={value => setRoomNum(value)} />
      <Text>Leader for {roomNum}</Text>
      <Button onPress={sendMessage}>
        <Text>"send message"</Text>
      </Button>
    </View>
  )
}
