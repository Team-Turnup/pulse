import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import {
  Container,
  Header,
  Title,
  Form,
  Content,
  Picker,
  Item,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  ListItem
} from 'native-base'
import RNPickerSelect from 'react-native-picker-select'
import PreviousRoutine from '../screens/PreviousRoutine'
import CheckBox from 'react-native-check-box'
//import { getRoutineThunk } from '../store/routines';
import {createRoutineThunk} from '../store/routines'
import activityTypes from '../assets/images/activityTypes'

//maybe rename to CreateRoutineScreen
class SelectRoutineScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routineType: '',
      hapticCheckbox: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCreateNewRoutine = this.handleCreateNewRoutine.bind(this)
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

  handleChange(value) {
    this.setState({
      routineType: value
    })
  }
  handleCreateNewRoutine() {
    //atm it's not sending the selected exercise along with the created routine.
    //this.props.createRoutineThunk();
    this.props.navigation.navigate('BuildRoutineScreen')
    this.setState({
      routineType: ''
    })
  }

  static navigationOptions = {
    header: null
  }

  render() {
    const activityTypeSelects = Object.keys(activityTypes).map(activity => ({
      label: `${activityTypes[activity].icon} ${activityTypes[activity].display}`,
      value: activity
    }))
    return (
      <Container>
        <Content>
          <Form>
            <RNPickerSelect
              onValueChange={value => this.handleChange(value)}
              style={{display: 'flex', alignItems: 'center'}}
              value={this.state.routineType}
              items={[{label: 'Combo', value: 'combo'}, ...activityTypeSelects]}
            />
          </Form>
          <ListItem>
            <CheckBox
              onClick={() =>
                this.setState(prevState => ({
                  hapticCheckBox: !prevState.hapticCheckBox
                }))
              }
              isChecked={this.state.hapticCheckBox}
            />
            <Body>
              <Text>Use Default Haptic Settings</Text>
            </Body>
          </ListItem>
          <Button
            bordered
            style={styles.button}
            onPress={() => this.handleCreateNewRoutine()}
          >
            <Text>Create New Routine</Text>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate('PreviousRoutine')}
            bordered
            style={styles.button}
          >
            <Text>Select A Previous Routine</Text>
            {/* <PreviousRoutine
            //routineType={this.state.routineType}
            /> */}
          </Button>
        </Content>
      </Container>
    )
  }
}

SelectRoutineScreen.navigationOptions = {
  // title:'Select Exercise',
  header: null
}
const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
    color: 'rgba(255,255,255, 0.9)',
    backgroundColor: 'gray'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    //width: '30%',
    margin: 5,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white'
  },
  message: {
    fontSize: 10,
    textAlign: 'center'
  },
  item: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  checkBox: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center'
  },
  name: {
    textAlign: 'right'
  },
  sectionHeader: {
    width: '100%',
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center'
  },
  barGraphic: {
    marginTop: 20,
    marginBottom: 20
  }
})

const mapStateToProps = state => ({
  routines: state.routines
})

const mapDispatchToProps = dispatch => ({
  //getRoutineThunk: routineId => dispatch(getRoutineThunk(routineId)),
  createRoutineThunk: routine => dispatch(createRoutineThunk(routine))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectRoutineScreen)
