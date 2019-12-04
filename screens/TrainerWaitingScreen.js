// Core React/Redux libraries
import React, {useEffect, useState, Fragment} from 'react'
import {useSelector} from 'react-redux'
import useInterval from 'use-interval'

// Components
import {Container, Header, Content, Text, H3, View} from 'native-base'
import RoutineBarDisplay from '../components/RoutineBarDisplay'
import {
  StartButton,
  StartTime,
  UserList,
  dummyClass,
  styles
} from './WaitingScreenComponents'

// Utility libraries
import socket from '../socket'
// assuming for right now that the class was already fetched from server and is in store?
// import {getClassThunk} from '../store/singleClass'

export default () => {
  const {attendees, when, name, id: classId, ..._class} = useSelector(
    ({singleClass}) => singleClass
  )

  const routine = useSelector(({routine}) => routine)

  // const {routine, attendees, when, name, ..._class} = dummyClass
  const userId = useSelector(({user}) => user.id) || 101
  const [curTime, setCurTime] = useState(Date.now())

  useEffect(() => {
    if (classId) {
      socket.emit('subscribe', classId, userId, true)
      return () => socket.emit('unsubscribe', classId, userId, true)
    }
  }, [classId])

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
              {when < curTime ? <StartButton /> : <StartTime when={when} />}
            </View>
            <H3
              style={{textAlign: 'center', paddingBottom: 20}}
            >{`Routine: ${routine.name}`}</H3>
            <RoutineBarDisplay routine={routine.intervals} />
            <UserList attendees={attendees} />
          </Fragment>
        ) : (
          <Text>Loading...</Text>
        )}
      </Content>
    </Container>
  )
}
