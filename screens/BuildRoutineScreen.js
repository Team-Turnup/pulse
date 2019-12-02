import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Container, Content, Button, Item, Label, Input, Text} from 'native-base'
import RNPickerSelect from 'react-native-picker-select'
import NumericInput from 'react-native-numeric-input'
import CheckBox from 'react-native-check-box'
import RoutineBarGraphic from '../components/RoutineBarGraphic'
import activityTypes from '../assets/images/activityTypes'
import {
  getRoutineThunk,
  createRoutineThunk,
  createAndStartRoutineThunk,
  updateRoutineThunk
} from '../store/routines'

class BuildRoutineScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routineType: '',
      routineName: '',
      index: 0,
      cadence: 100,
      duration: 60,
      intervalType: '',
      routine: [],
      makePublic: false
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
        intervalType: value
      }))
      this.setState({intervalType: value, routine: newRoutine})
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
    this.props.navigation.navigate('HomeScreen')
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
  }

  addInterval() {
    const {cadence, duration, routine, index, intervalType} = this.state
    const newRoutine = [
      ...routine.slice(0, index + 1),
      {cadence, duration, intervalType},
      ...routine.slice(index + 1)
    ]
    this.setState({
      routine: newRoutine,
      index: routine.length === 0 ? index : index + 1
    })
  }

  saveInterval() {
    const {cadence, duration, routine, index, intervalType} = this.state
    const newRoutine = [
      ...routine.slice(0, index),
      {cadence, duration, intervalType},
      ...routine.slice(index + 1)
    ]
    this.setState({routine: newRoutine})
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
      intervalType: interval.intervalType
    })
  }

  render() {
    const activityTypeSelects = Object.keys(activityTypes).map(activity => ({
      label: `${activityTypes[activity].icon} ${activityTypes[activity].display}`,
      value: activity
    }))

    return (
      <Container>
        {/* <Header>
          <Text style={styles.header}>Build Routine</Text>
        </Header> */}
        <Content>
          <Text style={styles.sectionHeader}>Routine</Text>
          <Item fixedLabel style={styles.item}>
            <Label>Name</Label>
            <Input
              placeholder=""
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.routineName}
              onChangeText={routineName => this.setState({routineName})}
              style={styles.name}
            />
          </Item>
          {/* <Item fixedLabel style={styles.item}> */}
          <Label>Activity Type</Label>
          <RNPickerSelect
            onValueChange={value => this.handleChange('routineType', value)}
            style={{display: 'flex', alignItems: 'center'}}
            value={this.state.routineType}
            items={[{label: 'Combo', value: 'combo'}, ...activityTypeSelects]}
          />
          {/* </Item> */}
          <Item fixedLabel style={styles.checkBox}>
            <CheckBox
              onClick={() =>
                this.setState(prevState => ({
                  makePublic: !prevState.makePublic
                }))
              }
              isChecked={this.state.makePublic}
            />
            <Text>Make Public</Text>
          </Item>

          {this.state.routineName.length && this.state.routineType ? (
            <View>
              <Text style={styles.sectionHeader}>Intervals</Text>
              {this.state.routineType === 'combo' ? (
                <Item fixedLabel style={styles.item}>
                  <Label>Activity Type</Label>
                  <RNPickerSelect
                    onValueChange={value =>
                      this.handleChange('intervalType', value)
                    }
                    value={this.state.intervalType}
                    items={activityTypeSelects}
                  />
                </Item>
              ) : (
                <Item></Item>
              )}
              <Item fixedLabel style={styles.item}>
                <Label>Cadence</Label>
                <NumericInput
                  value={this.state.cadence}
                  onChange={value => this.handleChange('cadence', value)}
                />
              </Item>
              <Item fixedLabel style={styles.item}>
                <Label>Duration</Label>
                <NumericInput
                  value={this.state.duration}
                  onChange={value => this.handleChange('duration', value)}
                />
              </Item>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={{
                    ...styles.button,
                    backgroundColor: this.state.intervalType ? 'blue' : 'gray'
                  }}
                  onPress={() =>
                    this.state.intervalType ? this.addInterval() : {}
                  }
                >
                  <Text style={styles.buttonText}>Insert Next Interval</Text>
                </TouchableOpacity>

                {this.state.index < this.state.routine.length ? (
                  <TouchableOpacity
                    style={{
                      ...styles.button,
                      backgroundColor: this.state.intervalType ? 'blue' : 'gray'
                    }}
                    onPress={() =>
                      this.state.intervalType ? this.saveInterval() : {}
                    }
                  >
                    <Text style={styles.buttonText}>
                      Save Changes to Current Interval
                    </Text>
                  </TouchableOpacity>
                ) : null}

                {this.state.index < this.state.routine.length ? (
                  <TouchableOpacity
                    style={{...styles.button, backgroundColor: 'blue'}}
                    onPress={() => this.removeInterval()}
                  >
                    <Text style={styles.buttonText}>
                      Remove Current Interval
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>

              <View style={styles.barGraphic}>
                {this.state.index < this.state.routine.length ? (
                  <Text style={styles.message}>
                    Current interval is highlighted in blue
                  </Text>
                ) : null}

                <RoutineBarGraphic
                  routine={this.state.routine}
                  changeIndex={this.changeIndex}
                  index={this.state.index}
                />
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={{
                    ...styles.button,
                    backgroundColor: this.state.routine.length ? 'blue' : 'gray'
                  }}
                  disabled={!this.state.routine.length}
                  // onPress={() => this.navigation.navigate('PlaylistScreen')}
                >
                  <Text style={styles.buttonText}>Generate Playlist</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.button,
                    backgroundColor: this.state.routine.length ? 'blue' : 'gray'
                  }}
                  onPress={
                    this.state.routine.length ? this.createRoutine : null
                  }
                >
                  <Text style={styles.buttonText}>
                    Create Routine & Return Home
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.button,
                    backgroundColor: this.state.routine.length ? 'blue' : 'gray'
                  }}
                  onPress={
                    this.state.routine.length
                      ? this.createAndStartRoutine
                      : null
                  }
                >
                  <Text style={styles.buttonText}>
                    Create and Start Routine
                  </Text>
                </TouchableOpacity>
              </View>
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
    width: '30%',
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

const mapStateToProps = ({routines}) => ({routines})

const mapDispatchToProps = {
  getRoutineThunk,
  createRoutineThunk,
  updateRoutineThunk,
  createAndStartRoutineThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildRoutineScreen)
