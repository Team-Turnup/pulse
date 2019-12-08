import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View} from 'react-native'
import {Container, Content, Text, Button} from 'native-base'
import InProgressScreen from './InProgressScreen'
import {createWorkoutThunk} from '../store/workout'
import PrepStartRoutine from './PrepStartRoutine'
import AppHeader from '../components/AppHeader'

class StartRoutineScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {count: 4, clearCountdown: null, startPressed: false}
    this.handleStart = this.handleStart.bind(this)
    this.classStart = this.props.navigation.getParam('classStart', null)
    this.classId = this.props.navigation.getParam('classId', null)
  }

  componentDidMount() {
    if (this.classStart) {
      this.setState({startPressed: true, count: 'Go!'})
      // const clearCountdown = setInterval(() => {
      //   if (Date.now() >= this.classStart)
      //     this.setState({startPressed: true, count: 'Go!'})
      // }, 10)
      // this.setState({clearCountdown})
    }
    // this.props.createWorkoutThunk(this.props.routine.id)
    //     const clearCountdown = setInterval(() => {
    //         let {count} = this.state
    //         if (count>1) {
    //             count=count-1
    //         } else {
    //             clearInterval(this.state.clearCountdown)
    //             count='Go!'
    //       }
    //       this.setState({count})
    //     }, 60000/this.props.routine.intervals[0].cadence)
    //     this.setState({clearCountdown})
  }
  handleStart() {
    this.setState({startPressed: true})
    console.log(this.props.routine.id, this.classStart)
    this.props.createWorkoutThunk(this.props.routine.id, this.classStart, this.classId)
    const clearCountdown = setInterval(() => {
      let {count} = this.state
      if (count > 1) {
        count = count - 1
      } else {
        clearInterval(this.state.clearCountdown)
        count = 'Go!'
      }
      this.setState({count})
    }, 60000 / this.props.routine.intervals[0].cadence)
    this.setState({clearCountdown})
  }

  render() {
    return (
      <Container>
        <AppHeader navigation={this.props.navigation} hideNotification={true} />
        {!this.state.startPressed ? (
          <Container style={{marginTop: 75, marginBottom: 75, margin: 15}}>
            <PrepStartRoutine navigation={this.props.navigation} />
            <Button style={styles.button} onPress={() => this.handleStart()}>
              <Text style={styles.smallText}>Start</Text>
            </Button>
          </Container>
        ) : (
          <Container>
            <Content>
              {this.state.count === 'Go!' ? (
                <InProgressScreen
                  proposedStart={this.classStart}
                  routine={this.props.routine}
                  navigation={this.props.navigation}
                />
              ) : (
                <View style={styles.countdown}>
                  <Text style={styles.text}>{this.state.count}</Text>
                </View>
              )}
            </Content>
          </Container>
        )}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  countdown: {
    marginTop: '60%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  text: {
    fontSize: 75,
    color: 'rgb(84, 130, 53)'
  },
  smallText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    color: 'white'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    margin: 15,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgb(84, 130, 53)'
  }
})

const mapStateToProps = ({routine}) => ({routine})
const mapDispatchToProps = {createWorkoutThunk}

export default connect(mapStateToProps, mapDispatchToProps)(StartRoutineScreen)
