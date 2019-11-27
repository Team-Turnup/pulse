import React, {useState} from 'react'
import socket from '../socket.js'
import {StyleSheet, View} from 'react-native'
import {Container, Content, Text, Button} from 'native-base'

export default () => {
  const [roomNum, setRoomNum] = useState(1)
  const sendMessage = () => {
    console.log('here')
    socket.emit('message', roomNum, `I am the follower of ${roomNum}`)
  }
  return (
    <View>
      <NumericInput value={roomNum} onChange={value => setRoomNum(value)} />
      <Text>Follower for {roomNum}</Text>
      <Button onPress={sendMessage}>
        <Text>"send message"</Text>
      </Button>
    </View>
  )
}
