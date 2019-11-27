import React, {useState, useEffect} from 'react'
import socket from '../socket.js'
import {StyleSheet, View} from 'react-native'
import NumericInput from 'react-native-numeric-input'
import {Container, Content, Text, Button, Input} from 'native-base'

export default () => {
  const [roomNum, setRoomNum] = useState(1)
  const [currMessage, setCurrMessage] = useState('')
  useEffect(() => {
    socket.emit('subscribe', roomNum)
    return () => socket.emit('unsubscribe', roomNum)
  }, [roomNum])

  const sendMessage = () => {
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
