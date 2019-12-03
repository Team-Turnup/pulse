import React, {useEffect, useState} from 'react'
import {
  Container,
  Text,
  Content,
  Header,
  Card,
  CardItem,
  View
} from 'native-base'
import {StyleSheet} from 'react-native'
import {dummyClass} from './WaitingScreenComponents'
// import dummyWorkout from '../dummyWorkout.json'
import WorkoutGraph from './WorkoutGraph'
import {useSelector} from 'react-redux'
import {useInterval} from 'use-interval'

let i = 1
const fakeWorkout = dummyWorkout[0].workoutTimestamps.map(d => {
  let timestamp = Date.now() + 1000 * i++
  return {...d, timestamp}
})

const classStart = Date.now()
const intervals = dummyClass.routine.intervals
const totalTime = intervals.reduce((a, b) => a + b.duration, 0)
let intervalStartTime = Date.now()

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

// this component is expecting a socket to be passed as props from the trainer waiting screen
export default ({socket}) => {
  const {routine, attendees, when, name, ..._class} = dummyClass
  const userId = useSelector(({user}) => user.id) || 101

  // timekeeping variables
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0)
  const [currentInterval, setCurrentInterval] = useState(0)
  const [intervalTime, setIntervalTime] = useState(0)

  // when the data is live, useInterval might not be necessary
  useInterval(() => {
    const timeElapsed = Math.round((Date.now() - classStart) / 1000)
    const intervalElapsed = Math.round((Date.now() - intervalStartTime) / 1000)
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
      intervalStartTime = Date.now()
    }
  }, [
    currentInterval < intervals.length - 1 &&
      intervalTime >= intervals[currentInterval].duration
  ])

  return (
    <Container>
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
