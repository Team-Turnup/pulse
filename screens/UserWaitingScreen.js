import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import useInterval from 'use-interval'
import {
  Container,
  Button,
  Text,
  Header,
  Content,
  Body,
  ListItem,
  CheckBox,
  View
} from 'native-base'

import {StartTime, styles, dummyClass} from './WaitingScreenComponents'
import RoutineBarDisplay from '../components/RoutineBarDisplay'

import socket from '../socket'
import {leaveClass} from '../store/singleClass'

export default ({navigation}) => {
  // get user from store
  const user = useSelector(({user}) => user)
  // get dummy data for class right now
  const {routine, attendees, when, name, ..._class} = dummyClass
  const dispatch = useDispatch()
  const [curTime, setCurTime] = useState(Date.now())

  useEffect(() => {
    socket.emit('subscribe', _class.id, user.id)
    return () => socket.emit('unsubscribe', _class.id, user.id)
  }, [])

  useInterval(() => setCurTime(Date.now()), 1000)

  return (
    <Container>
      <Header>
        <Text style={{fontWeight: 'bold'}}>{name}</Text>
      </Header>
      <Content>
        <ListItem>
          <CheckBox Checked={true} />
          <Body>
            <Text>Use Class Haptic Settings</Text>
          </Body>
        </ListItem>
        <View style={styles.startView}>
          {when < curTime ? (
            <Text>Waiting for Trainer</Text>
          ) : (
            <StartTime when={dummyClass.when} />
          )}
        </View>
        <RoutineBarDisplay routine={dummyClass.routine.intervals} />
        <Button
          block
          danger
          style={{margin: 7}}
          onPress={() => {
            dispatch(leaveClass(_class.id, user.id))
            navigation.navigate('HomeScreen')
          }}
        >
          <Text>Leave Class</Text>
        </Button>
      </Content>
    </Container>
  )
}
