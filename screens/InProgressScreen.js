import React from 'react'
import {View, StyleSheet} from 'react-native'
import {
  Container,
  Text,
  Content,
  Card,
  CardItem,
} from 'native-base'
import {Pedometer} from 'expo-sensors'
import {haptic} from '../assets/options/haptics'
import WorkoutGraph from './WorkoutGraph'
import {connect} from 'react-redux'
import socket from '../socket'

class InProgressScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clearCadence: null,
      avgCadences: [{timestamp: Date.now(), cadence: 0}],
      totalTimeElapsed: 0,
      totalTime: props.routine.intervals.reduce(
        (sum, interval) => sum + interval.duration,
        0
      ),
      intervalTime: 0,
      currentInterval: 0,
      intervals: props.routine.intervals,
      pauseTime: null,
      // visualColor: '',
      opacity: 0.3,
      // soundObject: null,
      isPedometerAvailable: 'checking',
      // pastStepCount: 0,
      currentStepCount: 0,
      cadences: []
    }
  }

  componentDidMount() {
    this._subscribe()
    this._startWorkout()
  }

  componentWillUnmount() {
    this._unsubscribe()
    clearInterval(this.state.pauseTime)
    clearInterval(this.state.clearCadence)
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      let {avgCadences, currentStepCount, cadences} = this.state
      const timestamp = Date.now()
      const cadence =
        ((result.steps - currentStepCount) /
          (timestamp - avgCadences[avgCadences.length - 1].timestamp)) *
        60000
      cadences = [...cadences]
      cadences.push(cadence)
      if (cadences.length > 10) {
        cadences.shift()
      }
      const avgCadence = cadences.reduce(
        (sum, cadence) => sum + cadence / cadences.length,
        0
      )
      const workoutTimestamp = {timestamp, cadence: avgCadence}
      avgCadences = [...avgCadences, workoutTimestamp]
      this.setState({
        currentStepCount: result.steps,
        cadences,
        avgCadences
      })
      socket.emit('workoutTimestamp', {workoutTimestamp: {...workoutTimestamp, goalCadence: this.state.intervals[this.state.currentInterval].cadence}, workoutId: this.props.workout.id})
    })

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        })
      },
      error => {
        this.setState({
          isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error
        })
      }
    )
  }

  _startWorkout = async () => {

    // const soundObject = new Audio.Sound();
    //   try {
    //     await soundObject.loadAsync(tick)
    //   } catch (error) {
    //     console.log(error)
    //   }
    const clearCadence = setInterval(async () => {
      // soundObject.stopAsync().then(()=>soundObject.playFromPositionAsync(0))
      // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      const withinGoalCadence = this.state.avgCadences[this.state.avgCadences.length-1].cadence>0.85*this.state.intervals[this.state.currentInterval].cadence && this.state.avgCadences[this.state.avgCadences.length-1].cadence<1.15*this.state.intervals[this.state.currentInterval].cadence
      if (this.props.option.hapticWhen==='everybeat' || (this.props.option.hapticWhen==='muteAtGoal' && !withinGoalCadence)) {
        haptic(
        this.props.option.hapticWhat,
        this.state.intervals[this.state.currentInterval].cadence
      )()
        }

        if (this.props.option.visualWhen==='everybeat' || (this.props.option.visualWhen==='muteAtGoal' && !withinGoalCadence)) {
      this.setState({opacity: 1})
      setTimeout(
        () => this.setState({opacity: 0.3}),
        (30 / this.state.intervals[this.state.currentInterval].cadence) * 1000
      )
        }
    }, (60 / this.state.intervals[this.state.currentInterval].cadence) * 1000)

    const pauseTime = setInterval(async () => {
      let {
        totalTimeElapsed,
        intervalTime,
        intervals,
        currentInterval,
        clearCadence,
        pauseTime
      } = this.state
      totalTimeElapsed++
      intervalTime++
      if (intervalTime > intervals[currentInterval].duration - 1) {
        if (currentInterval < intervals.length - 1) {
          currentInterval++
          intervalTime = 0
          clearInterval(clearCadence)
          // await soundObject.stopAsync(async () => {
          //   await soundObject.setPositionAsync(0)
          //   await soundObject.playAsync()
          // })
          // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          // this.setState({opacity: 1})
          // setTimeout(
          //   () => this.setState({opacity: 0.3}),
          //   (30 / this.state.intervals[this.state.currentInterval].cadence) *
          //     1000
          // )
          clearCadence = setInterval(async () => {
            // await soundObject.stopAsync(async () => {
            //   await soundObject.setPositionAsync(0)
            //   await soundObject.playAsync()
            // })
            if (this.props.option.hapticWhen==='everybeat' || (this.props.option.hapticWhen==='muteAtGoal' && !withinGoalCadence)) {
            haptic(
              this.props.option.hapticWhat,
              this.state.intervals[this.state.currentInterval].cadence
            )()
            }
            if (this.props.option.visualWhen==='everybeat' || (this.props.option.visualWhen==='muteAtGoal' && !withinGoalCadence)) {
            this.setState({opacity: 1})
            setTimeout(
              () => this.setState({opacity: 0.3}),
              (30 / this.state.intervals[this.state.currentInterval].cadence) *
                1000
            )
            }
          }, (60 / intervals[currentInterval].cadence) * 1000)
        } else {
          clearInterval(clearCadence)
          clearInterval(pauseTime)
        }
      }
      this.setState({
        totalTimeElapsed,
        intervalTime,
        currentInterval,
        clearCadence
      })
    }, 1000)
    this.setState({pauseTime, clearCadence})
  }

  _pauseWorkout = () => {
    clearInterval(this.state.pauseTime)
    clearInterval(this.state.clearCadence)
  }

  _restartWorkout = () => {
    this._pauseWorkout()
    this.setState({currentInterval: 0, totalTimeElapsed: 0, intervalTime: 0})
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove()
    this._subscription = null
  }

  render() {
    return (
      <Container>
              <Content
              >
                <View style={styles.info}>
                <View style={styles.col}>
                <Card transparent style={styles.card}>
                  <CardItem>
                      <Text>Total Time Elapsed:</Text>
                      <Text>{this.state.totalTimeElapsed}</Text>
                  </CardItem>
                </Card>
                <Card transparent style={styles.card}>
                  <CardItem>
                      <Text>Total Time Left:</Text>
                      <Text>
                        {this.state.totalTime - this.state.totalTimeElapsed}
                      </Text>
                  </CardItem>
                </Card>
                <Card transparent style={styles.card}>
                  <CardItem>
                        <Text>Time Left in Interval:</Text>
                      <Text>
                        {this.state.intervals[this.state.currentInterval]
                          .duration - this.state.intervalTime}
                      </Text>
                  </CardItem>
                </Card>
                </View>

                <View style={styles.col}>
                <Card transparent style={styles.card}>
                  <CardItem>
                        <Text>Goal Cadence:</Text>
                      <Text>
                        {
                          this.state.intervals[this.state.currentInterval]
                            .cadence
                        }
                      </Text>
                  </CardItem>
                </Card>
                <Card transparent style={styles.card}>
                  <CardItem>
                        <Text>Current Cadence:</Text>
                      <Text>
                        {
                          this.state.avgCadences[
                            this.state.avgCadences.length - 1
                          ].cadence.toFixed(0)
                        }
                      </Text>
                  </CardItem>
                </Card>
                <Card transparent style={styles.card}>
                  <CardItem>
                      <Text>Total Steps:</Text>
                      <Text>{this.state.currentStepCount}</Text>
                  </CardItem>
                </Card>
                </View>
                </View>
          {/* <Row size={4} style={{justifyContent: 'center'}}> */}
            <WorkoutGraph intervals={this.state.intervals} workoutData={this.state.avgCadences} startTime={this.state.avgCadences[0].timestamp}/>
          <View
            style={{
              ...styles.visual,
              backgroundColor: this.props.option.visualColor,
              opacity: this.state.opacity
            }}
          ></View>
          {/* </Row> */}
              </Content>
          {/* </Row> */}


          {/* <Row
            size={1.5}
            style={{
              flex: 1,
              justifyContent: 'space-evenly'
            }}
          > */}
          {/* </Row> */}
        {/* </Grid> */}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  visual: {
    width: '100%',
    height: 200,
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

InProgressScreen.navigationOptions = {
  // title:'👟🏃🏽🏋🏽'
  header: null
}

const mapStateToProps = ({routine, option, user, workout}) => ({routine, option, user, workout})

export default connect(mapStateToProps)(InProgressScreen)
