// Core React/Redux libraries
import React, {useEffect, useState, Fragment} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import useInterval from 'use-interval'
import {
  setReadyAttendees,
  addNewAttendee,
  removeAttendee,
  initializeColorOpacity,
  setUserColors
} from '../store/singleClass'
import {SocketContext} from '../socket'

// Components
import {Container, Header, Content, Text, H3, View} from 'native-base'
import RoutineBarDisplay from '../components/RoutineBarDisplay'
import AppHeader from '../components/AppHeader'

import {
  StartButton,
  StartTime,
  UserList,
  styles
} from './WaitingScreenComponents'

const TrainerWaitingScreen = ({navigation, socket}) => {
  const dispatch = useDispatch()
  const {
    attendees,
    when,
    name,
    id: classId,
    userColors,
    ..._class
  } = useSelector(({singleClass}) => singleClass)

  const routine = useSelector(({routine}) => routine)
  const userName = useSelector(({user}) => user.name)
  const userId = useSelector(({user}) => user.id)
  const [curTime, setCurTime] = useState(Date.now())

  const _onPress = () => {
    console.log('starting the class')
    socket.emit('start', classId, userId, Date.now() + 5000)
    navigation.navigate('TrainerWorkoutScreen')
  }

  useEffect(() => {
    // listen for socket messages
    socket.on('joined', (user, color) => dispatch(addNewAttendee(user, color)))
    socket.on('left', id => dispatch(removeAttendee(id)))
    socket.on('classList', (attendees, userColors) => {
      dispatch(setReadyAttendees(attendees))
      dispatch(setUserColors(userColors))
    })
    return () => {
      socket.off('joined')
      socket.off('left')
      socket.off('classList')
    }
  }, [])

  useEffect(() => {
    if (attendees) dispatch(initializeColorOpacity(attendees))
    // join/create a class when the component sees a valid classId and unsubscribe on unmount
    if (classId) {
      socket.emit('subscribe', classId, userId, true, Date.now())
      return () => socket.emit('unsubscribe', classId, userId, true)
    }
  }, [classId])

  // tick
  useInterval(() => setCurTime(Date.now()), 1000)
  return (
    <Container>
      <AppHeader navigation={this.props.navigation} />
      <Content>
        {name && routine && attendees ? (
          <Fragment>
            <View style={styles.startView}>
              <Text style={styles.text}>This is {name}</Text>
              <Text style={styles.text}>
                You are the Trainer for this Class
              </Text>
              {when < curTime ||
              (attendees.length &&
                attendees.length === attendees.filter(a => a.ready).length) ? (
                <StartButton _onPress={_onPress} />
              ) : (
                <StartTime when={when} />
              )}
            </View>
            <Text
              style={{textAlign: 'center', paddingBottom: 20}}
            >{`Routine: ${routine.name}`}</Text>
            {routine.intervals ? (
              <RoutineBarDisplay routine={routine.intervals} />
            ) : null}
            {attendees && attendees.length ? (
              <UserList
                userColors={userColors}
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
            ) : null}
          </Fragment>
        ) : (
          <Text>Loading...</Text>
        )}
      </Content>
    </Container>
  )
}

export default props => (
  <SocketContext.Consumer>
    {socket => <TrainerWaitingScreen {...props} socket={socket} />}
  </SocketContext.Consumer>
)
