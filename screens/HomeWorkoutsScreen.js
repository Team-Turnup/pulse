import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, StyleSheet, ScrollView} from 'react-native'
import {Container, Button, Text, Content, Card, CardItem} from 'native-base'
import {me} from '../store/user'
import {getMyClassesThunk} from '../store/myClasses'
import {getMyWorkoutsThunk} from '../store/workouts'
import {fetchWorkoutThunk} from '../store/workout'
import {setRoutine} from '../store/routine'
import MyPreviousWorkouts from '../components/MyPreviousWorkouts'
import AppHeader from '../components/AppHeader'

class HomeWorkoutsScreen extends Component {
  constructor(props) {
    super(props)
    this.selectWorkout = this.selectWorkout.bind(this)
  }
  componentDidMount() {
    this.props.me()
    this.props.getMyClassesThunk()
    this.props.getMyWorkoutsThunk()
  }

  async selectWorkout(workoutId) {
    await this.props.fetchWorkoutThunk(workoutId)
    this.props.navigation.navigate('PreviousWorkoutScreen')
  }

  render() {
    const {navigation} = this.props
    return (
      <Content>
        <AppHeader navigation={this.props.navigation} hideNotification={false} />
        <View
          style={{
            // display: 'flex',
            // flexDirection: 'row',
            // justifyContent: 'center',
            // alignItems: 'center'
            height: 650
          }}
        >
          <Button
            style={styles.button}
            onPress={() => {
              this.props.setRoutine({})
              navigation.navigate('BuildRoutineScreen')
            }}
          >
            <Text>Create New Routine</Text>
          </Button>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('SelectRoutineScreen')}
          >
            <Text>Start New Solo Workout</Text>
          </Button>
          <MyPreviousWorkouts
            selectWorkout={this.selectWorkout}
            workouts={this.props.workouts}
          />
        </View>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 15,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgb(84, 130, 53)'
  }
})

const mapStateToProps = ({user, workouts, myClasses}) => ({
  user,
  workouts,
  myClasses
})

const mapDispatchToProps = {
  me,
  getMyClassesThunk,
  getMyWorkoutsThunk,
  setRoutine,
  fetchWorkoutThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeWorkoutsScreen)
