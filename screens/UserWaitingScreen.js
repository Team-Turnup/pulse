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
import AppHeader from '../components/AppHeader'

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
    socket.emit('subscribe', _class.id, user.id, false, Date.now())
    return () => socket.emit('unsubscribe', _class.id, user.id)
  }, [_class.id])

  useEffect(() => {
    socket.on('start', (proposedStart, followers) => {
      console.log('start signal received')
      navigation.navigate('StartRoutineScreen', {
        classStart: proposedStart + followers[user.id]
      })
      // const startCheck = setInterval(() => {
      //   console.log(Platform.OS, 'func Calls', ++funcCalls, 'date', Date.now())
      //   if (Date.now() >= proposedStart + followers[user.id]) {
      //     clearInterval(startCheck)
      //   }
      // }, 10)
    })
  }, [])

  // this triggers onPress and sends user to edit this routine so they can save if they want it
  const navigateRoutine = () => {
    navigation.navigate('BuildRoutineScreen', {
      routine: routine
    })
  }

  useInterval(() => setCurTime(Date.now()), 1000)

  return (
    <Container>
      <AppHeader navigation={this.props.navigation} />
      <Content>
        <View style={styles.startView}>
          <Text style={styles.text}>This is {name}</Text>
          {/* below is displaying logged in user name not trainer name */}
          {/* <Text style={styles.text}>The Trainer is: {user.name}</Text> */}
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
          <Text
            onPress={() => navigateRoutine()}
            style={{textAlign: 'center', paddingBottom: 20}}
          >{`Routine: ${routine.name}`}</Text>
          <Text style={styles.text}>Please strap your phone</Text>
          {routineActivityTypes.includes('breathing') ? (
            <Text style={styles.text}>
              to your chest for breathing intervals
            </Text>
          ) : null}
          {routineActivityTypes.includes('cycling') ? (
            <Text style={styles.text}>to your ankle for cycling intervals</Text>
          ) : null}
          {routineActivityTypes.filter(
            type => type !== 'breathing' && type !== 'cycling'
          ).length ? (
            <Text style={styles.text}>
              {routineActivityTypes.includes('breathing') ||
              routineActivityTypes.includes('cycling')
                ? 'and '
                : ''}
              to your wrist{' '}
              {routineActivityTypes.includes('breathing') ||
              routineActivityTypes.includes('cycling')
                ? 'for all other intervals'
                : ''}
            </Text>
          ) : null}
        </Content>
        <Button
          block
          danger
          style={styles.button}
          onPress={() => {
            socket.emit('left', _class.id, user.id)
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
