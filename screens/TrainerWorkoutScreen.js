import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import useInterval from 'use-interval'
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
import faker from 'faker'
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

// const fakeUserTimestamps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce(
//   (a, b) => ({
//     ...a,
//     [b]: Array.from({length: 60}, (_, i) => ({
//       cadence: faker.random.number({min: 100, max: 110}),
//       timestamp: i * 1000 + Math.random() * 4000
//     }))
//   }),
//   {}
// )

const generateWorkoutData = (userTimestamps = {}) => {
  // currently aggregates all workout data as a single array of data, potentially
  // change this so that it is some kind of binned average?
  let workoutData = []
  for (let timestamps of Object.values(userTimestamps))
    workoutData.push(...timestamps)
  return workoutData
}

export const OverviewStats = ({
  totalTime,
  totalTimeElapsed,
  intervals,
  currentInterval,
  intervalTime,
  workoutData,
  userLatest
}) => {
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
            <Text>
              {Object.values(userLatest).reduce((a, b) => a + b.cadence, 0) /
                Object.values(userLatest).length}
            </Text>
          </CardItem>
        </Card>
        {/* <Card transparent style={styles.card}>
          <CardItem>
            <Text>Total Steps:</Text>
            <Text>Hello</Text>
          </CardItem>
        </Card> */}
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
  const {intervals, routine} = useSelector(({routine}) => ({
    intervals,
    ...routine
  }))
  const userId = useSelector(({user}) => user.id)

  // timekeeping variables -- maybe should be on store?
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0)
  const [currentInterval, setCurrentInterval] = useState(0)
  const [intervalTime, setIntervalTime] = useState(0)

  const totalTime = intervals.reduce(
    (sum, interval) => sum + interval.duration,
    0
  )
  const workoutData = generateWorkoutData(fakeUserTimestamps)

  // set up event listeners for WS
  useEffect(() => {
    socket.on('workoutTimestamp', (userId, timestamps, latest) => {
      dispatch(updateTimestamps(userId, timestamps, latest))
      dispatch(setUserOpacity(userId, 1))
      setTimeout(() => dispatch(setUserOpacity(userId, 0.3)), 50)
    })
    return () => socket.off('workoutTimestamp')
  }, [userOpacities])

  useInterval(() => {
    const timeElapsed = Math.round((Date.now() - when) / 1000)
    const intervalElapsed = timeElapsed - totalTimeElapsed
    setTotalTimeElapsed(timeElapsed > totalTime ? totalTime : timeElapsed)
    setIntervalTime(
      intervalElapsed > intervals[currentInterval].duration
        ? intervals[currentInterval].duration
        : intervalElapsed
    )
  }, 1000)

  // update interval whenever interval time is greater than the duration
  useEffect(() => {
    if (intervalTime < intervals[currentInterval].duration) {
      /* do nothing - happens whenever interval changes */
    } else {
      setCurrentInterval(currentInterval + 1)
    }
  }, [
    currentInterval < intervals.length - 1 &&
      intervalTime >= intervals[currentInterval].duration
  ])

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
      {intervals && intervals.length ? (
        <View>
          <OverviewStats
            totalTime={totalTime}
            totalTimeElapsed={totalTimeElapsed}
            intervals={intervals}
            currentInterval={currentInterval}
            intervalTime={intervalTime}
            workoutData={generateWorkoutData(userTimestamps)}
            userLatest={userLatest}
          />
          <WorkoutGraph
            intervals={intervals}
            workoutData={generateWorkoutData(userTimestamps)}
            totalTimeElapsed={totalTimeElapsed}
          />
        </View>
      ) : null}
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
