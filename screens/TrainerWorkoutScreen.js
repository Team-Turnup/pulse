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
import WorkoutGraph from './WorkoutGraph'
import {useSelector} from 'react-redux'
import {useInterval} from 'use-interval'

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
  const {attendees, when, name, ..._class} = useSelector(
    ({singleClass}) => singleClass
  )
  const routine = useSelector(({routine}) => routine)
  const userId = useSelector(({user}) => user.id)
  let intervals
  // timekeeping variables
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0)
  const [currentInterval, setCurrentInterval] = useState(0)
  const [intervalTime, setIntervalTime] = useState(0)

  useEffect()

  // when the data is live, useInterval might not be necessary
  // useInterval(() => {
  //   const timeElapsed = Math.round((Date.now() - classStart) / 1000)
  //   const intervalElapsed = Math.round((Date.now() - intervalStartTime) / 1000)
  //   setTotalTimeElapsed(timeElapsed > totalTime ? totalTime : timeElapsed)
  //   setIntervalTime(
  //     intervalElapsed > intervals[currentInterval].duration
  //       ? intervals[currentInterval].duration
  //       : intervalElapsed
  //   )
  // }, 1000)

  // // update interval whenever interval time is greater than the duration
  // useEffect(() => {
  //   if (intervalTime < intervals[currentInterval].duration) {
  //     /* do nothing - happens whenever interval changes */
  //   } else {
  //     setCurrentInterval(currentInterval + 1)
  //     intervalStartTime = Date.now()
  //   }
  // }, [
  //   currentInterval < intervals.length - 1 &&
  //     intervalTime >= intervals[currentInterval].duration
  // ])

  return (
    <Container>
      {intervals && (
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
      )}
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
