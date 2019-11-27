import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {
  Container,
  Button,
  Text,
  Header,
  Grid,
  Title,
  Content,
  Card,
  CardItem,
  Row,
  Col
} from 'native-base'
import {Pedometer} from 'expo-sensors'
import {haptic} from '../assets/options/haptics'
import WorkoutGraph from './WorkoutGraph'
import {connect} from 'react-redux'
import routine from '../dummyIntervals'
import socket from '../socket'

class InProgressScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      clearCadence: null,
      avgCadences: [{timestamp: Date.now(), cadence: 0}],
      totalTimeElapsed: 0,
      totalTime: routine.intervals.reduce(
        (sum, interval) => sum + interval.duration,
        0
      ),
      intervalTime: 0,
      currentInterval: 0,
      intervals: routine.intervals,
      pauseTime: null,
      visualColor: '',
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
      socket.emit('workoutTimestamp', workoutTimestamp)
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
      haptic(
        this.state.intervals[this.state.currentInterval].hapticOptions.cadence
          .what,
        this.state.intervals[this.state.currentInterval].cadence
      )()
      this.setState({visualColor: 'blue'})
      setTimeout(
        () => this.setState({visualColor: 'white'}),
        (30 / this.state.intervals[this.state.currentInterval].cadence) * 1000
      )
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
          this.setState({visualColor: 'blue'})
          setTimeout(
            () => this.setState({visualColor: 'white'}),
            (30 / this.state.intervals[this.state.currentInterval].cadence) *
              1000
          )
          clearCadence = setInterval(async () => {
            // await soundObject.stopAsync(async () => {
            //   await soundObject.setPositionAsync(0)
            //   await soundObject.playAsync()
            // })
            haptic(
              this.state.intervals[this.state.currentInterval].hapticOptions
                .cadence.what,
              this.state.intervals[this.state.currentInterval].cadence
            )()
            this.setState({visualColor: 'blue'})
            setTimeout(
              () => this.setState({visualColor: 'white'}),
              (30 / this.state.intervals[this.state.currentInterval].cadence) *
                1000
            )
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
        <Grid>
          <Row size={4}>
            <Col>
              <Content
                contentContainerStyle={{
                  justifyContent: 'space-evenly'
                  // alignItems: "center"
                }}
              >
                <Card transparent>
                  <CardItem>
                    <Content
                      contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Text>{this.state.totalTimeElapsed}</Text>
                      <Text>Total Time Elapsed</Text>
                    </Content>
                  </CardItem>
                </Card>
                <Card transparent>
                  <CardItem>
                    <Content
                      contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Text>
                        {this.state.totalTime - this.state.totalTimeElapsed}
                      </Text>
                      <Text>Total Time Left</Text>
                    </Content>
                  </CardItem>
                </Card>
                <Card transparent>
                  <CardItem>
                    <Content
                      contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Text>
                        {this.state.intervals[this.state.currentInterval]
                          .duration - this.state.intervalTime}
                      </Text>
                      <Text>Time Left in Interval</Text>
                    </Content>
                  </CardItem>
                </Card>
              </Content>
            </Col>
            <Col>
              <Content
                contentContainerStyle={{
                  justifyContent: 'space-evenly'
                  // alignItems: "center"
                }}
              >
                <Card transparent>
                  <CardItem>
                    <Content
                      contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Text>
                        {
                          this.state.intervals[this.state.currentInterval]
                            .cadence
                        }
                      </Text>
                      <Text>Goal Cadence</Text>
                    </Content>
                  </CardItem>
                </Card>
                <Card transparent>
                  <CardItem>
                    <Content
                      contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Text>
                        {
                          this.state.avgCadences[
                            this.state.avgCadences.length - 1
                          ].cadence.toFixed(0)
                        }
                      </Text>
                      <Text>Current Cadence</Text>
                    </Content>
                  </CardItem>
                </Card>
                <Card transparent>
                  <CardItem>
                    <Content
                      contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Text>{this.state.currentStepCount}</Text>
                      <Text>Total Steps</Text>
                    </Content>
                  </CardItem>
                </Card>
              </Content>
            </Col>
          </Row>

          <Row size={5.5} style={{justifyContent: 'center'}}>
            <WorkoutGraph intervals={routine.intervals} workoutData={this.state.avgCadences} startTime={this.state.avgCadences[0].timestamp}/>
          </Row>

          <Row
            size={1.5}
            style={{
              flex: 1,
              justifyContent: 'space-evenly'
            }}
          >
            <View
              style={{
                ...styles.visual,
                backgroundColor: this.state.visualColor
              }}
            ></View>
          </Row>
        </Grid>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  visual: {
    width: '100%',
    height: 200
  }
})

InProgressScreen.navigationOptions = {
  // title:'👟🏃🏽🏋🏽'
  header: null
}

const mapStateToProps = ({routine}) => ({routine})

export default connect(mapStateToProps)(InProgressScreen)
