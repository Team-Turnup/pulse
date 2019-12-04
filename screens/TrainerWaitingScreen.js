// Core React/Redux libraries
import React, {useEffect, useState, Fragment} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import useInterval from 'use-interval'
import {setReadyAttendees} from '../store/singleClass'

// Components
import {Container, Header, Content, Text, H3, View} from 'native-base'
import RoutineBarDisplay from '../components/RoutineBarDisplay'
import {
  StartButton,
  StartTime,
  UserList,
  styles
} from './WaitingScreenComponents'

// Utility libraries
import socket from '../socket'

export default ({navigation}) => {
  const dispatch = useDispatch()
  const {attendees, when, name, id: classId, ..._class} = useSelector(
    ({singleClass}) => singleClass
  )

  const routine = useSelector(({routine}) => routine)

  const userId = useSelector(({user}) => user.id)
  const [curTime, setCurTime] = useState(Date.now())

  const _onPress = () => {
    socket.emit('start', classId, userId)
    navigation.navigate('TrainerWorkoutScreen')
  }

  useEffect(() => {
    // join/create a class when the component sees a valid classId and unsubscribe on unmount
    if (classId) {
      socket.emit('subscribe', classId, userId, true)
      return () => socket.emit('unsubscribe', classId, userId, true)
    }
  }, [classId])

  useEffect(() => {
    // listen for socket messages
    socket.on('classList', attendees => {
      dispatch(setReadyAttendees(attendees))
    })
  }, [])

  // tick
  useInterval(() => setCurTime(Date.now()), 1000)

  return (
    <Container>
      <Header>
        <Text style={{fontWeight: 'bold'}}>{name}</Text>
      </Header>
      <Content>
        {name && routine && attendees ? (
          <Fragment>
            <View style={styles.startView}>
              {when < curTime ||
              attendees.length === attendees.filter(a => a.ready).length ? (
                <StartButton _onPress={_onPress} />
              ) : (
                <StartTime when={when} />
              )}
            </View>
            <H3
              style={{textAlign: 'center', paddingBottom: 20}}
            >{`Routine: ${routine.name}`}</H3>
            <RoutineBarDisplay routine={routine.intervals} />
            {attendees && attendees.length && (
              <UserList
                attendees={attendees.sort((a, b) =>
                  !a.ready && b.ready
                    ? 1
                    : a.ready && !b.ready
                    ? -1
                    : a.name.toUpperCase() < b.name.toUpperCase()
                    ? -1
                    : a.name.toUpperCase() > b.name.toUpperCase()
                    ? 1
                    : 0
                )}
              />
            )}
          </Fragment>
        ) : (
          <Text>Loading...</Text>
        )}
      </Content>
    </Container>
  )
}
