import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View} from 'react-native'
import {Container, Content, Text, Button} from 'native-base'
//import InProgressScreen from './InProgressScreen'
import {createWorkoutThunk} from '../store/workout'

//maybe rename to UpdateRoutineScreen
class PrepStartRoutineScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // count: 4,
      // clearCountdown: null
      intervalType: ''
    }
  }

  componentDidMount() {
    //this.props.createWorkoutThunk(this.props.routine.id)
    // const clearCountdown = setInterval(() => {
    //   let {count} = this.state
    //   if (count > 1) {
    //     count = count - 1
    //   } else {
    //     clearInterval(this.state.clearCountdown)
    //     count = 'Go!'
    //   }
    //   this.setState({count})
    // }, 60000 / this.props.routine.intervals[0].cadence)
    // this.setState({clearCountdown})
  }
  // handleChange(key, value) {
  //   this.setState({[key]: value})
  //   if (key === 'routineType' && value !== 'combo') {
  //     const newRoutine = this.state.routine.map(interval => ({
  //       cadence: interval.cadence,
  //       duration: interval.duration,
  //       intervalType: value
  //     }))
  //     this.setState({intervalType: value, routine: newRoutine})
  //   }
  // }

  render() {
    console.log(
      'this.props.routine.activityType',
      this.props.routine.activityType
    )

    return (
      <Container>
        <Content>
          {/* {this.state.count === 'Go!' ? (
            <InProgressScreen routine={this.props.routine} />
          ) : (
            <View style={styles.countdown}>
              <Text style={styles.text}>{this.state.count}</Text>
            </View>
          )} */}
          <Button
            onPress={this.props.navigation.navigate('StartRoutineScreen')}
          ></Button>
        </Content>
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
    color: 'blue'
  }
})

const mapStateToProps = ({routine}) => ({routine})
const mapDispatchToProps = {createWorkoutThunk}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrepStartRoutineScreen)
