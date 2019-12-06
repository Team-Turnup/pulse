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
import {setUserOpacity, updateTimestamps} from '../store/singleClass'

const cadenceEval = ({cadence, goalCadence}) => {
  const timeDiff = Math.abs(cadence - goalCadence)
  const red = goalCadence * 0.15
  const yellow = goalCadence * 0.075

  if (timeDiff >= red) return '#ff0000'
  else if (timeDiff >= yellow) return '#ffff00'
  else return '#00ff00'
}

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
  console.log('intervals', intervals)
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

const TrainerWorkoutScreen = ({socket}) => {
  // initialize react-redux data:
  const dispatch = useDispatch()
  const {
    attendees,
    when,
    name,
    userColors,
    userOpacities,
    userTimestamps,
    userLatest,
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
    socket.on('workoutTimestamp', (userId, timestamps, latest) => {
      dispatch(updateTimestamps(userId, timestamps, latest))
      dispatch(setUserOpacity(userId, 1))
      setTimeout(() => dispatch(setUserOpacity(userId, 0.3)), 50)
    })
    return () => socket.off('workoutTimestamp')
  }, [userOpacities])

  return (
    <Container>
      <Content>
        <List>
          <ListItem itemHeader style={styles.listItem}>
            <Text style={[styles.name, styles.listHeader]}>Name</Text>
            <Text style={[styles.age, styles.listHeader]}>Age</Text>
            <Text style={[styles.gender, styles.listHeader]}>Gender</Text>
          </ListItem>
          {attendees && attendees.length && userOpacities
            ? attendees.map(
                ({id: userId, name, age, gender, ready = false}) => (
                  <ListItem
                    key={userId}
                    style={[
                      styles.listItem,
                      userLatest
                        ? {
                            backgroundColor: cadenceEval(userLatest[userId]),
                            opacity: userOpacities[userId] || 1
                          }
                        : {}
                    ]}
                  >
                    <Text style={styles.name}>{name} </Text>
                    <Text style={styles.age}>{age}</Text>
                    <Text style={styles.gender}>{userData[gender].icon}</Text>
                  </ListItem>
                )
              )
            : null}
        </List>
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
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listHeader: {
    fontWeight: 'bold'
  },
  name: {flex: 5, textAlign: 'left'},
  age: {flex: 1, textAlign: 'center'},
  gender: {flex: 2, textAlign: 'right'},
  selected: {
    backgroundColor: 'rgba(0,255,0,0.25)'
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    color: 'rgb(84, 130, 53)',
    lineHeight: 30
  },
  button: {
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 15,
    marginRight: 15,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgb(84, 130, 53)'
  }
})

export default props => (
  <SocketContext.Consumer>
    {socket => <TrainerWorkoutScreen {...props} socket={socket} />}
  </SocketContext.Consumer>
)
