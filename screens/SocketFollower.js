import React, {useState, useEffect} from 'react'
import socket from '../socket.js'
import {StyleSheet, View} from 'react-native'
import NumericInput from 'react-native-numeric-input'
import {Container, Content, Text, Button, Input} from 'native-base'

export default () => {
  const [roomNum, setRoomNum] = useState(1)
  const [userId, setUserId] = useState(1)
  useEffect(() => {
    socket.emit('subscribe', roomNum, userId)
    return () => socket.emit('unsubscribe', roomNum, userId)
  }, [roomNum, userId])

  const sendMessage = () => {
    socket.emit('ready', roomNum, userId)
  }
  return (
    <View>
      <NumericInput value={roomNum} onChange={value => setRoomNum(value)} />
      <NumericInput value={userId} onChange={value => setUserId(value)} />
      <Text>Follower for {roomNum}</Text>
      <Button onPress={sendMessage}>
        <Text>"send message"</Text>
      </Button>
    </View>
  )
}
