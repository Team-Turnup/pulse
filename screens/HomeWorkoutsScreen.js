import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, StyleSheet, ScrollView} from 'react-native'
import {Container, Button, Text, Content, Card, CardItem} from 'native-base'
import {me} from '../store/user'
import {getMyClassesThunk} from '../store/myClasses'
import {getMyWorkoutsThunk} from '../store/workouts'
import {setRoutine} from '../store/routine'
import MyPreviousWorkouts from '../components/MyPreviousWorkouts'
import AppHeader from '../components/AppHeader'

class HomeWorkoutsScreen extends Component {
  componentDidMount() {
    this.props.me()
    this.props.getMyClassesThunk()
    this.props.getMyWorkoutsThunk()
  }

  render() {
    const {navigation} = this.props
    return (
      <Content>
        <AppHeader navigation={this.props.navigation} />
        <View
          style={{
            // display: 'flex',
            // flexDirection: 'row',
            // justifyContent: 'center',
            // alignItems: 'center'
            height: 650
          }}
        >
          <MyPreviousWorkouts workouts={this.props.workouts} />
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

const mapDispatchToProps = {me, getMyClassesThunk, getMyWorkoutsThunk, setRoutine}

export default connect(mapStateToProps, mapDispatchToProps)(HomeWorkoutsScreen)
