import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Container, Content, Button, Item, Label, Input, Text} from 'native-base'
import RNPickerSelect from 'react-native-picker-select'
import NumericInput from 'react-native-numeric-input'
import CheckBox from 'react-native-check-box'
import RoutineBarGraphic from '../components/RoutineBarGraphic'
import activityTypes from '../assets/images/activityTypes'
import activityTypesNoCombo from '../assets/images/activityTypesNoCombo'
import {
  getRoutineThunk,
  createRoutineThunk,
  createAndStartRoutineThunk,
  updateRoutineThunk
} from '../store/routines'
import AppHeader from '../components/AppHeader'
import {Platform} from '@unimodules/core'

class BuildRoutineScreen extends Component {
  constructor(props) {
    super(props)
    const {routine} = props
    this.state = {
      routineType: routine.activityType || '',
      routineName: routine.name || '',
      index: 0,
      cadence: 100,
      duration: 60,
      activityType: '',
      routine: routine.intervals || [],
      makePublic: routine.makePublic || false,
      showAddIntervals: (routine.activityType && routine.name) || false,
      addAnotherInterval: false,
      finished: false
      //dirty: false,
    }
    this.createRoutine = this.createRoutine.bind(this)
    this.createAndStartRoutine = this.createAndStartRoutine.bind(this)
    this.addInterval = this.addInterval.bind(this)
    this.removeInterval = this.removeInterval.bind(this)
    this.saveInterval = this.saveInterval.bind(this)
    this.changeIndex = this.changeIndex.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(key, value) {
    this.setState({[key]: value})
    if (key === 'routineType' && value !== 'combo') {
      const newRoutine = this.state.routine.map(interval => ({
        cadence: interval.cadence,
        duration: interval.duration,
        activityType: value
      }))
      this.setState({activityType: value, routine: newRoutine})
    }
  }

  createRoutine() {
    const {routineName, routineType, routine, makePublic} = this.state
    this.props.createRoutineThunk({
      routineName,
      routineType,
      routine,
      makePublic
    })
    this.props.navigation.navigate('HomeWorkoutsScreen')
  }

  async createAndStartRoutine() {
    const {routineName, routineType, routine, makePublic} = this.state
    await this.props.createAndStartRoutineThunk({
      routineName,
      routineType,
      routine,
      makePublic
    })
    this.props.navigation.navigate('StartRoutineScreen')
    //this.props.navigation.navigate('PrepStartRoutine')
  }

  addInterval() {
    const {cadence, duration, routine, index, activityType} = this.state
    const newRoutine = [
      ...routine.slice(0, index + 1),
      {cadence, duration, activityType},
      ...routine.slice(index + 1)
    ]
    this.setState({
      routine: newRoutine,
      index: routine.length === 0 ? index : index + 1,
      addAnotherInterval: false
    })
  }

  saveInterval() {
    const {cadence, duration, routine, index, activityType} = this.state
    const newRoutine = [
      ...routine.slice(0, index),
      {cadence, duration, activityType},
      ...routine.slice(index + 1)
    ]
    this.setState({routine: newRoutine, addAnotherInterval: false})
  }

  removeInterval() {
    const {routine, index} = this.state
    const newRoutine = [...routine.slice(0, index), ...routine.slice(index + 1)]
    this.setState({routine: newRoutine, index: index === 0 ? index : index - 1})
  }

  changeIndex(index) {
    const interval = this.state.routine[index]
    this.setState({
      index,
      cadence: interval.cadence,
      duration: interval.duration,
      activityType: interval.activityType
    })
  }

  render() {
    const activityTypeSelects = Object.keys(activityTypes).map(activity => ({
      label: `${activityTypes[activity].icon} ${activityTypes[activity].display}`,
      value: activity
    }))

    const activityTypeNoComboSelects = Object.keys(activityTypesNoCombo).map(
      activity => ({
        label: `${activityTypes[activity].icon} ${activityTypes[activity].display}`,
        value: activity
      })
    )

    return (
      <Container>
        <AppHeader navigation={this.props.navigation} />
        <View style={{margin: 15}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '600',
              fontSize: 20,
              color: 'rgb(84, 130, 53)'
            }}
          >
            Create Routine{'\n'}for New Solo Workout
          </Text>
          <Text
            style={{
              textAlign: 'center',
              ...styles.message
            }}
          >
            You can reuse your routines for future workouts
          </Text>
        </View>
        {/* <Header>
          <Text style={styles.header}>Build Routine</Text>
        </Header> */}
        <Content>
          {!this.state.showAddIntervals ? (
            <View>
              <Item
                fixedLabel
                //style={styles.item}
              >
                <Text>Name</Text>
                <Input
                  placeholder="(ex. Marathon Prep - Week 5)"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.state.routineName}
                  onChangeText={routineName => this.setState({routineName})}
                  style={styles.name}
                />
              </Item>
              {/* <Item fixedLabel style={styles.item}> */}
              <View
                fixedLabel
                //style={styles.item}
              >
                <Text>Activity Type</Text>
                <RNPickerSelect
                  onValueChange={value =>
                    this.handleChange('routineType', value)
                  }
                  value={this.state.routineType}
                  items={activityTypeSelects}
                />
              </View>
              {/* </Item> */}
              <Item fixedLabel style={styles.item}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 125,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}
                >
                  <Text>Make Public</Text>
                  <CheckBox
                    onClick={() =>
                      this.setState(prevState => ({
                        makePublic: !prevState.makePublic
                      }))
                    }
                    isChecked={this.state.makePublic}
                  />
                </View>
                <Text style={{fontSize: 10, width: 200, textAlign: 'right'}}>
                  Allows other users to search for and workout to your routine
                </Text>
              </Item>
            </View>
          ) : null}

          {this.state.routineName.length &&
          this.state.routineType &&
          !this.state.showAddIntervals ? (
            <Button
              style={styles.button}
              onPress={() => this.setState({showAddIntervals: true})}
            >
              <Text>Submit</Text>
            </Button>
          ) : null}

          {this.state.showAddIntervals ? (
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: 10
                }}
              >
                <Text>
                  Routine Name:{' '}
                  <Text style={{color: 'rgb(84, 130, 53)', fontWeight: '600'}}>
                    {this.state.routineName}
                  </Text>
                </Text>
                <Text>
                  Activity Type:{' '}
                  <Text style={{color: 'rgb(84, 130, 53)', fontWeight: '600'}}>
                    {activityTypes[this.state.routineType].icon}
                  </Text>
                </Text>

                <View style={styles.barGraphic}>
                  {this.state.index < this.state.routine.length &&
                  !this.state.finished ? (
                    <View>
                      <Text style={styles.message}>
                        Click to select an interval - Hold to delete an interval
                      </Text>
                      <Text style={styles.message}>
                        Currently selected interval is highlighted in green
                      </Text>
                    </View>
                  ) : null}

                  {this.state.routine.length ? (
                    <RoutineBarGraphic
                      routine={this.state.routine}
                      changeIndex={this.changeIndex}
                      index={this.state.index}
                      removeInterval={this.removeInterval}
                      finished={this.state.finished}
                      routineType={this.state.routineType}
                    />
                  ) : (
                    <Text style={{color: 'rgb(84, 130, 53)'}}>
                      Your routine doesn't have any intervals yet!
                    </Text>
                  )}
                </View>
              </View>

              {!this.state.finished ? (
                <View style={{marginBottom: 15}}>
                  {this.state.routineType === 'combo' ? (
                    <View
                      fixedLabel
                      //style={styles.item}
                    >
                      <Text>Activity Type</Text>
                      <RNPickerSelect
                        onValueChange={value =>
                          this.handleChange('activityType', value)
                        }
                        value={this.state.intervalType}
                        items={activityTypeNoComboSelects}
                      />
                    </View>
                  ) : (
                    <Item></Item>
                  )}
                  <Item fixedLabel style={styles.item}>
                    <Text>
                      Cadence <Text style={{fontStyle: 'italic'}}>(bpm)</Text>
                    </Text>
                    <NumericInput
                      value={this.state.cadence}
                      onChange={value => this.handleChange('cadence', value)}
                    />
                  </Item>
                  <Item fixedLabel style={styles.item}>
                    <Text>
                      Duration <Text style={{fontStyle: 'italic'}}>(s)</Text>
                    </Text>
                    <NumericInput
                      value={this.state.duration}
                      onChange={value => this.handleChange('duration', value)}
                    />
                  </Item>
                </View>
              ) : null}

              {!this.state.routine.length ||
              (this.state.addAnotherInterval && !this.state.finished) ? (
                <View>
                  <Button
                    style={styles.button}
                    onPress={() => {
                      console.log(this.state.activityType)
                      this.state.activityType ? this.addInterval() : {}
                    }}
                  >
                    <Text>
                      Insert {this.state.routine.length ? 'Next ' : ''}Interval
                    </Text>
                  </Button>

                  {this.state.index < this.state.routine.length ? (
                    <Button
                      style={styles.button}
                      onPress={() =>
                        this.state.intervalType ? this.saveInterval() : {}
                      }
                    >
                      <Text>Save Changes to Current Interval</Text>
                    </Button>
                  ) : null}
                </View>
              ) : !this.state.finished ? (
                <View>
                  <Button
                    style={styles.button}
                    onPress={() => this.setState({addAnotherInterval: true})}
                  >
                    <Text>Continue Editing Routine</Text>
                  </Button>
                  <Button
                    style={styles.button}
                    onPress={() => this.setState({finished: true})}
                  >
                    <Text>Finished Editing Routine</Text>
                  </Button>
                </View>
              ) : null}

              {this.state.finished ? (
                <View>
                  {/* <Button
                  style={styles.button}
                >
                  <Text>Generate Playlist</Text>
                </Button> */}
                  <Button
                    style={styles.button}
                    onPress={
                      this.state.routine.length ? this.createRoutine : null
                    }
                  >
                    <Text>Create Routine & Return Home</Text>
                  </Button>
                  <Button
                    style={styles.button}
                    onPress={
                      this.state.routine.length
                        ? this.createAndStartRoutine
                        : null
                    }
                  >
                    <Text>Create and Start Routine</Text>
                  </Button>
                </View>
              ) : null}
            </View>
          ) : (
            <View></View>
          )}
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
    color: 'rgba(255,255,255, 0.9)',
    backgroundColor: 'gray'
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
    justifyContent: 'space-between',
    borderBottomColor: 'gray',
    borderBottomWidth: 1
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

const mapStateToProps = ({routine}) => ({routine})

const mapDispatchToProps = {
  getRoutineThunk,
  createRoutineThunk,
  updateRoutineThunk,
  createAndStartRoutineThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildRoutineScreen)
