import React from 'react'
import {connect} from 'react-redux'
import {
  Container,
  Button,
  Text,
  Header,
  Title,
  Content,
  Body,
  Card,
  CardItem,
  ListItem,
  CheckBox,
  View
} from 'native-base'
import {StyleSheet} from 'react-native'

import {StartTime} from './TrainerWorkoutScreen'
import RoutineBarDisplay from '../components/RoutineBarDisplay'

import {leaveClass} from '../store/singleClass'

const dummyClass = {
  id: 11,
  name: 'Class # 21459',
  canEnroll: true,
  when: Date.now() + 1000 * 60 * 3,
  routine: {
    id: 21,
    name: 'Eloise',
    activityType: 'pushups',
    intervals: [
      {
        id: 62,
        activityType: 'dancing',
        cadence: 930,
        duration: 10
      },
      {
        id: 61,
        activityType: 'stairs',
        cadence: 829,
        duration: 10
      },
      {
        id: 63,
        activityType: 'dancing',
        cadence: 32,
        duration: 20
      }
    ]
  }
}

class UserWaitingScreen extends React.Component {
  render() {
    const {navigation, leaveClass} = this.props
    let classId = navigation.getParam('classId', 'NA')
    let studentId = navigation.getParam('studentId', 'NA')

    console.log('..................................................')
    console.log('WAITING classId', classId)
    console.log('WAITING studentId', studentId)

    // console.log(JSON.stringify(navigation.getParam('trainerId')))
    return (
      <Container>
        <Header>
          <Text>Trainer's Class</Text>
        </Header>
        <ListItem>
          <CheckBox Checked={true} />
          <Body>
            <Text>Use Class Haptic Settings</Text>
          </Body>
        </ListItem>
        <View style={styles.startView}>
          <StartTime when={dummyClass.when} />
        </View>
        <RoutineBarDisplay routine={dummyClass.routine.intervals} />
        <Button
          block
          danger
          style={{margin: 7}}
          onPress={() => {
            leaveClass(classId, studentId)
            this.props.navigation.navigate('HomeScreen')
          }}
        >
          <Text>Leave Class</Text>
        </Button>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  leaveClass: (classId, studentId) => dispatch(leaveClass(classId, studentId))
})

export default connect(null, mapDispatchToProps)(UserWaitingScreen)

const styles = StyleSheet.create({
  startView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  }
})
