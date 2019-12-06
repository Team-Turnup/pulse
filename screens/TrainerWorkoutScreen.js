import React, {useEffect, useState, Fragment} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  Container,
  Text,
  Content,
  Header,
  Card,
  CardItem,
  View,
  List,
  ListItem
} from 'native-base'
import {StyleSheet} from 'react-native'
import WorkoutGraph from './WorkoutGraph'
import {SocketContext} from '../socket'
import userData from '../assets/images/userData'
import {
  setUserColor,
  setUserOpacity,
  initializeColorOpacity
} from '../store/singleClass'

export const OverviewStats = ({
  totalTime,
  totalTimeElapsed,
  intervals,
  currentInterval,
  intervalTime,
  workoutData
}) => {
  useEffect(() => {
    console.log('I sense a change')
  }, [workoutData])
  return (
    <View style={styles.info}>
      <View style={styles.col}>
        <Card transparent style={styles.card}>
          <CardItem>
            <Text>Total Time Elapsed:</Text>
            <Text>{totalTimeElapsed}</Text>
          </CardItem>
        </Card>
        <Card transparent style={styles.card}>
          <CardItem>
            <Text>Total Time Left:</Text>
            <Text>{totalTime - totalTimeElapsed}</Text>
          </CardItem>
        </Card>
        <Card transparent style={styles.card}>
          <CardItem>
            <Text>Time Left in Interval:</Text>
            <Text>{intervals[currentInterval].duration - intervalTime}</Text>
          </CardItem>
        </Card>
      </View>

      <View style={styles.col}>
        <Card transparent style={styles.card}>
          <CardItem>
            <Text>Goal Cadence:</Text>
            <Text>{intervals[currentInterval].cadence}</Text>
          </CardItem>
        </Card>
        <Card transparent style={styles.card}>
          <CardItem>
            <Text>Average Cadence:</Text>
            <Text>Hello</Text>
          </CardItem>
        </Card>
        <Card transparent style={styles.card}>
          <CardItem>
            <Text>Total Steps:</Text>
            <Text>World</Text>
          </CardItem>
        </Card>
      </View>
    </View>
  )
}

const TrainerWorkoutScreen = () => {
  // initialize react-redux data:
  const dispatch = useDispatch()
  const {
    attendees,
    when,
    name,
    userColors,
    userOpacities,
    ..._class
  } = useSelector(({singleClass}) => singleClass)
  const routine = useSelector(({intervals, ...routine}) => routine)
  const userId = useSelector(({user}) => user.id)

  // timekeeping variables -- maybe should be on store?
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0)
  const [currentInterval, setCurrentInterval] = useState(0)
  const [intervalTime, setIntervalTime] = useState(0)

  // set up event listeners for WS
  useEffect(() => {
    dispatch(initializeColorOpacity(attendees))
    socket.on('workoutTimestamp', (userId, workoutTimestamp, color) => {
      console.log('getting data!', userColors, userOpacities)
      if (userColors[userId] === 'rgba(0,0,0,0)')
        dispatch(setUserColors({...userColors, [userId]: color}))
      dispatch(setUserOpacities({...userOpacities, [userId]: 1}))
      const wait = setInterval(
        () => () => {
          console.log('blink blink!')
          clearInterval(wait)
          return dispatch(setUserOpacities({...userOpacities, [userId]: 0.3}))
        },
        50
      )
    })
  }, [])

  return (
    <Container>
      <Content>
        {attendees &&
        attendees.lenght &&
        userColors &&
        Object.keys(userColors).length &&
        userOpacities &&
        Object.keys(userOpacities).length
          ? attendees.map(a => (
              <Text key={a.id}>
                {a.name} - {userColors[a.id]} - {userOpacities[a.id]}
              </Text>
            ))
          : null}
      </Content>
      {/* {intervals && (
        <Content>
          <OverviewStats
            totalTime={totalTime}
            totalTimeElapsed={totalTimeElapsed}
            intervals={intervals}
            currentInterval={currentInterval}
            intervalTime={intervalTime}
            workoutData={fakeWorkout.filter(d => Date.now() > d.timestamp)}
          />
          <WorkoutGraph
            startTime={classStart}
            intervals={intervals}
            workoutData={fakeWorkout.filter(d => Date.now() > d.timestamp)}
          />
        </Content>
      )} */}
    </Container>
  )
}

const styles = StyleSheet.create({
  visual: {
    width: '100%',
    height: 200
  },
  col: {
    width: '50%',
    height: 50,
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    width: '100%',
    height: '100%'
  },
  info: {
    width: '100%',
    height: 150,
    display: 'flex',
    flexDirection: 'row'
  }
})

export default props => (
  <SocketContext.Consumer>
    {socket => <TrainerWorkoutScreen {...props} socket={socket} />}
  </SocketContext.Consumer>
)
