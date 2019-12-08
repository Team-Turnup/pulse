import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View} from 'react-native'
import {Container, Content, Item, Button, Text, Label, Input} from 'native-base'
import RNPickerSelect from 'react-native-picker-select'
import DatePicker from 'react-native-datepicker'
import CheckBox from 'react-native-check-box'
import {createClassThunk} from '../store/singleClass'
import {setRoutine} from '../store/routine'
import RoutineBarDisplay from '../components/RoutineBarDisplay'
import {SocketContext} from '../socket'
import AppHeader from '../components/AppHeader'

class BuildClassScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      showRoutineOptions: false,
      canEnroll: true,
      when: new Date(),
      setClassPasscode: false,
      classPasscode: '',
      show: false,
      routine: {}
    }
    this.handleCreateClass = this.handleCreateClass.bind(this)
    this.setDate = this.setDate.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({routine: newProps.navigation.getParam('routine', {})})
  }

  handleCreateClass() {
    const {name, canEnroll, when, classPasscode} = this.state
    const routineId = this.state.routine.id
    this.props.createClassThunk({
      name,
      canEnroll,
      when,
      classPasscode,
      routineId
    })
    if (new Date(when) - new Date() < 10 * 60 * 1000) {
      this.props.navigation.navigate('TrainerWaitingScreen')
    } else {
      this.props.navigation.navigate('HomeClassesScreen')
    }
    this.setState({
      name: '',
      canEnroll: true,
      when: new Date(),
      attendees: [],
      setClassPasscode: false,
      classPasscode: ''
    })
    this.props.socket.emit('classCreated')
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  setDate(newDate) {
    // if (this.mode === 'date') this.setState({mode: 'time'})
    // else {
    this.setState({when: newDate})
    // this.hideDateTimePicker()
    // }
  }

  render() {
    const {routine} = this.state
    return (
      <Container>
        <AppHeader navigation={this.props.navigation} hideNotification={false} />
        <Content>
          <View style={{margin: 15}}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 20,
                color: 'rgb(84, 130, 53)'
              }}
            >
              Create Class
            </Text>
          </View>
          {!this.state.showRoutineOptions ? (
            <View>
              <Item>
                <Label>Class Name</Label>
                <Input
                  placeholder=""
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.state.name}
                  onChangeText={name => this.setState({name})}
                  style={styles.name}
                ></Input>
              </Item>
              <Item>
                <Label>Set Start Time:</Label>
                <DatePicker
                  // defaultDate={new Date(2018, 4, 4)}
                  // minimumDate={new Date(2018, 1, 1)}
                  // maximumDate={new Date(2018, 12, 31)}
                  date={this.state.when}
                  format="M/D/YYYY h:mm a"
                  locale="en"
                  is24Hour={false}
                  mode="datetime"
                  onDateChange={this.setDate}
                />
              </Item>
              <Item style={{height: 50}}>
                <Label>Can Enroll?</Label>
                <CheckBox
                  onClick={() =>
                    this.setState(prevState => ({
                      canEnroll: !prevState.canEnroll
                    }))
                  }
                  isChecked={this.state.canEnroll}
                />
              </Item>
              <Item
                fixedLabel
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 50
                }}
              >
                <View style={styles.checkBox}>
                  <Text>Set Passcode for Class?</Text>
                  <CheckBox
                    onClick={() =>
                      this.setState(prevState => ({
                        setClassPasscode: !prevState.setClassPasscode
                      }))
                    }
                    isChecked={this.state.setClassPasscode}
                  />
                </View>
                {this.state.setClassPasscode ? (
                  <View style={{width: '30%'}}>
                    <Input
                      placeholder="passcode"
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{textAlign: 'right'}}
                      //do we want to secure text entry?
                      value={this.state.classPasscode}
                      onChangeText={classPasscode =>
                        this.setState({classPasscode})
                      }
                    />
                  </View>
                ) : (
                  <View></View>
                )}
              </Item>
            </View>
          ) : (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text>
                Class Name:{' '}
                <Text style={{color: 'rgb(84, 130, 53)', fontWeight: '600'}}>
                  {this.state.name}
                </Text>
              </Text>
              <Text>
                Date:{' '}
                <Text style={{color: 'rgb(84, 130, 53)', fontWeight: '600'}}>
                  {this.state.when.toString().split('GMT')[0]}
                </Text>
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <CheckBox
                  onClick={() =>
                    this.setState(prevState => ({
                      canEnroll: !prevState.canEnroll
                    }))
                  }
                  isChecked={this.state.canEnroll}
                />
                <Text>Can Enroll</Text>
              </View>
              {this.state.classPasscode.length ? (
                <Text>
                  Passcode:{' '}
                  <Text style={{color: 'rgb(84, 130, 53)', fontWeight: '600'}}>
                    {this.state.classPasscode}
                  </Text>
                </Text>
              ) : null}
            </View>
          )}

          {this.state.name.length ? (
            <Button
              style={{
                ...styles.button
              }}
              onPress={() =>
                this.setState(prevState => ({
                  showRoutineOptions: !prevState.showRoutineOptions
                }))
              }
            >
              <Text>
                {this.state.showRoutineOptions
                  ? 'Back to Edit Class Details'
                  : 'Submit Class Details'}
              </Text>
            </Button>
          ) : null}

          {this.state.showRoutineOptions ? (
            !Object.keys(routine).length ? (
              <View>
                <View style={{margin: 15}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '600',
                      fontSize: 20,
                      color: 'rgb(84, 130, 53)'
                    }}
                  >
                    Choose Class Routine
                  </Text>
                </View>
                <Button
                  style={{
                    ...styles.button
                  }}
                  onPress={() => {
                    this.props.setRoutine({})
                    this.props.navigation.navigate('SelectRoutineScreen', {
                      isClass: true
                    })
                  }}
                >
                  <Text>Select Previous Routine</Text>
                </Button>
                <Button
                  style={{
                    ...styles.button
                  }}
                  onPress={() => {
                    this.props.setRoutine({})
                    this.props.navigation.navigate('BuildRoutineScreen', {
                      isClass: true
                    })
                  }}
                >
                  <Text>Create New Routine</Text>
                </Button>
              </View>
            ) : (
              <View>
                <View style={{margin: 15}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '600',
                      fontSize: 20,
                      color: 'rgb(84, 130, 53)'
                    }}
                  >
                    Class Routine
                  </Text>
                </View>
                <RoutineBarDisplay routine={routine.intervals} />
                <Button
                  style={{
                    ...styles.button
                  }}
                  onPress={() => this.setState({routine: {}})}
                >
                  <Text>Choose Different Class Routine</Text>
                </Button>
                <Button
                  style={{
                    ...styles.button
                  }}
                  onPress={this.handleCreateClass}
                >
                  <Text>Create Class</Text>
                </Button>
              </View>
            )
          ) : null}
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
    color: 'rgba(255,255,255, 0.9)'
    //backgroundColor: 'gray'
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
  singleClass: state.singleClass,
  routine: state.routine
})

const mapDispatchToProps = {createClassThunk, setRoutine}

const SocketConnectedBuildClassScreen = props => (
  <SocketContext.Consumer>
    {socket => <BuildClassScreen {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketConnectedBuildClassScreen)
