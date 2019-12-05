import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Container, Text, Content, Card, CardItem, Button} from 'native-base'
import {Pedometer} from 'expo-sensors'
import {haptic} from '../assets/options/haptics'
import WorkoutGraph from './WorkoutGraph'
import {connect} from 'react-redux'
import RoutineBarGraphic from '../components/RoutineBarGraphic'
import activityTypes from '../assets/images/activityTypes'
import {SocketContext} from '../socket'

class InProgressScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startTime: Date.now(),
      clearCadence: null,
      avgCadences: [{timestamp: 0, cadence: 0}],
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
      opacity: 0,
      // soundObject: null,
      isPedometerAvailable: 'checking',
      // pastStepCount: 0,
      currentStepCount: 0,
      cadences: [],
      paused: false
    }
  }

  componentDidMount() {
    if (this.props.proposedStart) {
      const wait = setInterval(() => {
        if (Date.now() >= this.props.proposedStart) {
          this._subscribe()
          this._startWorkout()
          clearInterval(wait)
        }
      }, 10)
    } else {
      this._subscribe()
      this._startWorkout()
    }
  }

  componentWillUnmount() {
    this._endWorkout()
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      let {avgCadences, currentStepCount, cadences} = this.state
      const timestamp = Date.now() - this.state.startTime
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
      this.props.socket.emit(
        'workoutTimestamp',
        this.props.user.id,
        {
          ...workoutTimestamp,
          goalCadence: this.state.intervals[this.state.currentInterval].cadence
        },
        this.props.workout.id,
        this.props.singleClass.id || null
      )
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
      if (this.state.totalTimeElapsed >= this.state.totalTime) {
        console.log('here')
        this._endWorkout()
        return
      }
      // soundObject.stopAsync().then(()=>soundObject.playFromPositionAsync(0))
      // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      const withinGoalCadence =
        this.state.avgCadences[this.state.avgCadences.length - 1].cadence >
          0.85 * this.state.intervals[this.state.currentInterval].cadence &&
        this.state.avgCadences[this.state.avgCadences.length - 1].cadence <
          1.15 * this.state.intervals[this.state.currentInterval].cadence
      if (
        this.props.option.hapticWhen === 'everybeat' ||
        (this.props.option.hapticWhen === 'muteAtGoal' && !withinGoalCadence)
      ) {
        haptic(
          this.props.option.hapticWhat,
          this.state.intervals[this.state.currentInterval].cadence
        )()
      }

      if (
        this.props.option.visualWhen === 'everybeat' ||
        (this.props.option.visualWhen === 'muteAtGoal' && !withinGoalCadence)
      ) {
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
        totalTime,
        pauseTime
      } = this.state
      totalTimeElapsed++
      intervalTime++
      if (this.state.totalTimeElapsed >= this.state.totalTime) {
        console.log('here')
        this._endWorkout()
        return
      }
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
            if (this.state.totalTimeElapsed >= this.state.totalTime) {
              console.log('here')
              this._endWorkout()
              return
            }
            const withinGoalCadence =
              this.state.avgCadences[this.state.avgCadences.length - 1]
                .cadence >
                0.85 *
                  this.state.intervals[this.state.currentInterval].cadence &&
              this.state.avgCadences[this.state.avgCadences.length - 1]
                .cadence <
                1.15 * this.state.intervals[this.state.currentInterval].cadence
            // await soundObject.stopAsync(async () => {
            //   await soundObject.setPositionAsync(0)
            //   await soundObject.playAsync()
            // })
            if (
              this.props.option.hapticWhen === 'everybeat' ||
              (this.props.option.hapticWhen === 'muteAtGoal' &&
                !withinGoalCadence)
            ) {
              haptic(
                this.props.option.hapticWhat,
                this.state.intervals[this.state.currentInterval].cadence
              )()
            }
            if (
              this.props.option.visualWhen === 'everybeat' ||
              (this.props.option.visualWhen === 'muteAtGoal' &&
                !withinGoalCadence)
            ) {
              this.setState({opacity: 1})
              setTimeout(
                () => this.setState({opacity: 0.3}),
                (30 /
                  this.state.intervals[this.state.currentInterval].cadence) *
                  1000
              )
            }
          }, (60 / intervals[currentInterval].cadence) * 1000)
        } else {
          this._endWorkout()
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

  _endWorkout = () => {
    this._unsubscribe()
    clearInterval(this.state.clearCadence)
    clearInterval(this.state.pauseTime)
    this.props.navigation.navigate('PreviousWorkoutScreen')
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove()
    this._subscription = null
  }

  hexToRgb(hex, opacity) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    const rgba = `rgba(${r},${g},${b},${opacity})`
    return rgba
  }

  render() {
    const {
      intervals,
      currentInterval,
      totalTimeElapsed,
      totalTime,
      intervalTime,
      avgCadences,
      paused
    } = this.state
    const totalTimeLeft = totalTime - totalTimeElapsed
    const intervalTimeLeft = intervals[currentInterval].duration - intervalTime
    const withinGoalCadence =
      avgCadences[avgCadences.length - 1].cadence >
        0.85 * intervals[currentInterval].cadence &&
      avgCadences[avgCadences.length - 1].cadence <
        1.15 * intervals[currentInterval].cadence
    return currentInterval > intervals.length ? null : (
      <Container>
        <View
          style={{
            padding: 20,
            backgroundColor: this.hexToRgb(
              this.props.option.visualColor,
              this.state.opacity
            ),
            width: '100%',
            height: '70%'
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: '100%',
              borderRadius: 10,
              opacity: 1
            }}
          >
            <View>
              <Text style={{textAlign: 'center'}}>
                Routine Name:{' '}
                <Text style={{color: 'rgb(84, 130, 53)', fontWeight: '600'}}>
                  {this.props.routine.name}
                </Text>
              </Text>
              <Text style={{textAlign: 'center'}}>
                Activity Type:{' '}
                <Text style={{color: 'rgb(84, 130, 53)', fontWeight: '600'}}>
                  {this.state.routineType !== 'combo'
                    ? activityTypes[this.props.routine.activityType].icon
                    : 'Combo'}
                </Text>
              </Text>
            </View>
            <RoutineBarGraphic
              routine={intervals}
              changeIndex={() => {}}
              index={currentInterval}
              removeInterval={() => {}}
              finished={false}
              routineType={this.props.routine.activityType}
            />
            <View>
              <View style={styles.info}>
                <View style={styles.col}>
                  <Card transparent style={styles.card}>
                    <Text style={{fontSize: 12}}>Total Time Elapsed:</Text>
                    <Text style={{color: 'rgb(84, 130, 53)'}}>
                      {Math.floor(totalTimeElapsed / 60)
                        ? `${Math.floor(totalTimeElapsed / 60)}m`
                        : ''}{' '}
                      {totalTimeElapsed % 60 ? `${totalTimeElapsed % 60}s` : ''}
                    </Text>
                  </Card>
                  <Card transparent style={styles.card}>
                    <Text style={{fontSize: 12}}>Total Time Left:</Text>
                    <Text style={{color: 'rgb(84, 130, 53)'}}>
                      {Math.floor(totalTimeLeft / 60)
                        ? `${Math.floor(totalTimeLeft / 60)}m`
                        : ''}{' '}
                      {totalTimeLeft % 60 ? `${totalTimeLeft % 60}s` : ''}
                    </Text>
                  </Card>
                  <Card transparent style={styles.card}>
                    <Text style={{fontSize: 12}}>Time Left in Interval:</Text>
                    <Text style={{color: 'rgb(84, 130, 53)'}}>
                      {Math.floor(intervalTimeLeft / 60)
                        ? `${Math.floor(intervalTimeLeft / 60)}m`
                        : ''}{' '}
                      {intervalTimeLeft % 60 ? `${intervalTimeLeft % 60}s` : ''}
                    </Text>
                  </Card>
                </View>

                <View style={styles.col}>
                  <Card transparent style={styles.card}>
                    <Text style={{fontSize: 12}}>Goal Cadence:</Text>
                    <Text style={{color: 'rgb(84, 130, 53)'}}>
                      {intervals[currentInterval].cadence} bpm
                    </Text>
                  </Card>
                  <Card transparent style={styles.card}>
                    <Text style={{fontSize: 12}}>Current Cadence:</Text>
                    <Text
                      style={{
                        color: withinGoalCadence ? 'rgb(84, 130, 53)' : 'red'
                      }}
                    >
                      {this.state.avgCadences[
                        this.state.avgCadences.length - 1
                      ].cadence.toFixed(0)}{' '}
                      bpm
                    </Text>
                  </Card>
                  <Card transparent style={styles.card}>
                    <Text style={{fontSize: 12}}>Total Steps:</Text>
                    <Text style={{color: 'rgb(84, 130, 53)'}}>
                      {this.state.currentStepCount} steps
                    </Text>
                  </Card>
                </View>
              </View>
              <WorkoutGraph
                intervals={intervals}
                workoutData={avgCadences}
                totalTimeElapsed={totalTimeElapsed}
                totalTime={totalTime}
                paused={paused}
              />
              <View style={styles.buttonContainer}>
                {this.state.paused ? (
                  <Button
                    onPress={() => {
                      this._startWorkout()
                      this.setState({paused: false})
                    }}
                    style={styles.button}
                  >
                    <Text>Resume</Text>
                  </Button>
                ) : null}
                {!this.state.paused ? (
                  <Button
                    onPress={() => {
                      this._pauseWorkout()
                      this.setState({paused: true})
                    }}
                    style={styles.button}
                  >
                    <Text>Pause</Text>
                  </Button>
                ) : null}
                <Button onPress={this._restartWorkout} style={styles.button}>
                  <Text>Restart</Text>
                </Button>
                <Button onPress={this._endWorkout} style={styles.button}>
                  <Text>End</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 5,
    height: 30,
    width: '30%',
    backgroundColor: 'rgb(84, 130, 53)'
  },
  col: {
    width: '50%',
    height: 35,
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    margin: 0,
    padding: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    width: '100%',
    height: 105,
    display: 'flex',
    flexDirection: 'row'
  }
})

InProgressScreen.navigationOptions = {
  // title:'👟🏃🏽🏋🏽'
  header: null
}

const mapStateToProps = ({routine, option, user, workout, singleClass}) => ({
  routine,
  option,
  user,
  workout,
  singleClass
})

const SocketConnectedInProgressScreen = props => (
  <SocketContext.Consumer>
    {socket => <InProgressScreen {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default connect(mapStateToProps)(SocketConnectedInProgressScreen)
