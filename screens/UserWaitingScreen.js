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
import {StartTime, styles} from './WaitingScreenComponents'
import RoutineBarDisplay from '../components/RoutineBarDisplay'
import {leaveClass} from '../store/singleClass'
import {SocketContext} from '../socket'

const UserWaitingScreen = ({navigation, socket}) => {
  // get user from store
  const user = useSelector(({user}) => user)
  // get dummy data for class right now
  const {attendees, when, name, ..._class} = useSelector(
    ({singleClass}) => singleClass
  )
  const routine = useSelector(({routine}) => routine)

  const routineActivityTypes = routine.intervals.map(
    interval => interval.activityType
  )

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
        <View style={styles.startView}>
          {when < curTime ? (
            <Text>Waiting for Trainer</Text>
          ) : (
            <StartTime when={when} />
          )}
        </View>
        {routine && routine.intervals && routine.intervals.length ? (
          <RoutineBarDisplay routine={routine.intervals} />
        ) : (
          <Text>Loading Routine</Text>
        )}
        <Content>
        <Text style={styles.text}>Please strap your phone</Text>
          {routineActivityTypes.includes('breathing') ? (
            <Text style={styles.text}>
              to your chest for breathing intervals
            </Text>
          ) : null}
          {routineActivityTypes.includes('cycling') ? (
            <Text style={styles.text}>to your ankle for cycling intervals</Text>
          ) : null}
          {routineActivityTypes.filter(type=>type!=='breathing'&&type!=='cycling').length ? <Text style={styles.text}>
            {routineActivityTypes.includes('breathing') ||
            routineActivityTypes.includes('cycling')
              ? 'and '
              : ''}
            to your wrist{' '}
            {routineActivityTypes.includes('breathing') ||
            routineActivityTypes.includes('cycling')
              ? 'for all other intervals'
              : ''}
          </Text>: null}
        </Content>
        <Button
          block
          danger
          style={{margin: 7}}
          onPress={() => {
            dispatch(leaveClass(_class.id, user.id))
            navigation.navigate('HomeClassesScreen')
          }}
        >
          <Text>Leave Class</Text>
        </Button>
      </Content>
    </Container>
  )
}

export default props => (
  <SocketContext.Consumer>
    {socket => <UserWaitingScreen {...props} socket={socket} />}
  </SocketContext.Consumer>
)
