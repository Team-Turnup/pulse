import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Container, Content, Item, Label, Input, Text} from 'native-base'
import RNPickerSelect from 'react-native-picker-select'
import NumericInput from 'react-native-numeric-input'
import CheckBox from 'react-native-check-box'
import {changeUserInfoThunk} from '../store/user'
import {haptic} from '../assets/options/haptics'
import {ColorPicker, toHsv, fromHsv} from 'react-native-color-picker'
import {updateOptionThunk} from '../store/option'

class OptionsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.user.name || '',
      age: this.props.user.age || 0,
      gender: this.props.user.gender || '',
      weight: this.props.user.weight || 0,
      height: this.props.user.height || 0,
      hapticWhat: this.props.option.hapticWhat || 'singlebeat',
      hapticWhen: this.props.option.hapticWhen || 'everybeat',
      visualWhat: this.props.option.visualWhat || 'blink',
      visualColor: toHsv(this.props.option.visualColor) || {h: 0, s: 1, v: 1},
      opacity: 1,
      visualWhen: this.props.option.visualWhen || 'everybeat'
    }
    this.handleChange = this.handleChange.bind(this)
    this.updateUserInfo = this.updateUserInfo.bind(this)
    this.handleHaptic = this.handleHaptic.bind(this)
    this.handleVisual = this.handleVisual.bind(this)
    this.handleVisualColor = this.handleVisualColor.bind(this)
    this.clear = []
    this.clearVisual = []
  }

  handleChange(key, value) {
    this.setState({[key]: value})
    if (key!=='visualColor') {
      this.props.updateOptionThunk({[key]: value})
    }
  }

  updateUserInfo() {
    const {name, age, gender, height, weight} = this.state
    this.props.changeUserInfoThunk({name, age, gender, height, weight})
  }

  handleHaptic(value) {
    if (value) {
      this.props.updateOptionThunk({hapticWhat: value})
      this.setState({hapticWhat: value})
      // if (value) {
      //     if (this.clear.length) {
      //         clearInterval(this.clear.shift())
      //     }
      this.clear.push(setInterval(haptic(value, 100), 600))
      setTimeout(() => clearInterval(this.clear.shift()), 5000)

    }
  }

  handleVisual(value) {
    this.props.updateOptionThunk({visualWhat: value})
    this.setState({visualWhat: value})
    // if (value) {
    //     if (this.clear.length) {
    //         clearInterval(this.clear.shift())
    //     }
    // this.clear.push(setInterval(haptic(value, 100), 600))
    // setTimeout(()=>clearInterval(this.clear.shift()), 5000)
  }

  handleVisualColor(value) {
    this.props.updateOptionThunk({visualColor: value})
    this.clearVisual.push(setInterval(()=>{
      this.setState({opacity: 0.3})
      setTimeout(()=>this.setState({opacity: 1}), 300)
    }, 600))
    setTimeout(() => clearInterval(this.clearVisual.shift()), 5000)
    // if (value) {
    //     if (this.clear.length) {
    //         clearInterval(this.clear.shift())
    //     }
    // this.clear.push(setInterval(haptic(value, 100), 600))
    // setTimeout(()=>clearInterval(this.clear.shift()), 5000)
  }

  render() {
    return (
      <Container>
        <Content>
          <Text style={styles.sectionHeader}>User Info</Text>
          <Item fixedLabel style={styles.item}>
            <Label>Name</Label>
            <Input
              placeholder=""
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.name}
              onChangeText={name => this.setState({name})}
              style={styles.name}
            />
          </Item>
          <Item fixedLabel style={styles.item}>
            <Label>Age</Label>
            <NumericInput
              value={this.state.age}
              onChange={value => this.handleChange('age', value)}
            />
          </Item>
          <Item fixedLabel style={styles.item}>
            <Label>Height (inches)</Label>
            <NumericInput
              value={this.state.height}
              onChange={value => this.handleChange('height', value)}
            />
          </Item>
          <Item fixedLabel style={styles.item}>
            <Label>Weight (lb)</Label>
            <NumericInput
              value={this.state.weight}
              onChange={value => this.handleChange('weight', value)}
            />
          </Item>
          <Label>Gender</Label>
          <RNPickerSelect
            onValueChange={value => this.handleChange('gender', value)}
            style={{display: 'flex', alignItems: 'center'}}
            value={this.state.gender}
            items={[
              {label: 'Female', value: 'female'},
              {label: 'Male', value: 'male'},
              {label: 'Non-binary', value: 'non-binary'}
            ]}
          />
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: 'blue'
            }}
            onPress={this.updateUserInfo}
          >
            <Text style={styles.buttonText}>Save User Info</Text>
          </TouchableOpacity>
          <Text style={styles.sectionHeader}>Cadence Settings</Text>
          <Text style={styles.sectionHeader}>Vibration Settings</Text>
          <Label>Vibration Feedback Style</Label>
          <RNPickerSelect
            onValueChange={value => this.handleHaptic(value)}
            style={{display: 'flex', alignItems: 'center'}}
            value={this.state.hapticWhat}
            items={[
              {label: 'Single Beat', value: 'singlebeat'},
              {label: 'Heartbeat', value: 'heartbeat'},
              {label: 'Triplet', value: 'triplet'},
              {label: 'Double-time', value: 'doubletime'},
              {label: 'Triple-time', value: 'tripletime'},
              {label: 'Quadruple-time', value: 'quadrupletime'}
            ]}
          />
          <Label>When to Play Vibration Feedback</Label>
          <RNPickerSelect
            onValueChange={value => this.handleChange('hapticWhen', value)}
            style={{display: 'flex', alignItems: 'center'}}
            value={this.state.hapticWhen}
            items={[
              {label: 'Every Beat', value: 'everybeat'},
              {label: 'Mute at Goal', value: 'muteAtGoal'},
              {label: 'Mute', value: 'mute'}
            ]}
          />
          <Text style={styles.sectionHeader}>Visual Settings</Text>
          <View style={{...styles.visual, backgroundColor: fromHsv(this.state.visualColor), opacity: this.state.opacity}}></View>
          <Label>Visual Feedback Style</Label>
          <RNPickerSelect
            onValueChange={value => this.handleVisual(value)}
            style={{display: 'flex', alignItems: 'center'}}
            value={this.state.visualWhat}
            items={[{label: 'Blink', value: 'blink'}]}
          />
          <Label>Visual Feedback Color</Label>
          <Text>(click the center circle to confirm color)</Text>
          <ColorPicker
            onColorSelected={color => this.handleVisualColor(color)}
            onColorChange={color => this.handleChange('visualColor', color)}
            style={{ height: 200, marginBottom: 100}}
            color={this.state.visualColor}
            // hideSliders={true}
          />
          <Label>When to Play Visual Feedback</Label>
          <RNPickerSelect
            onValueChange={value => this.handleChange('visualWhen', value)}
            style={{display: 'flex', alignItems: 'center'}}
            value={this.state.visualWhen}
            items={[
              {label: 'Every Beat', value: 'everybeat'},
              {label: 'Mute at Goal', value: 'muteAtGoal'},
              {label: 'Mute', value: 'mute'}
            ]}
          />
          {/* <Item fixedLabel style={styles.checkBox}>
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
          )} */}
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
  },
  visual: {
    height: 50,
    width: '100%'
  }
})

const mapStateToProps = ({user, option}) => ({user, option})

const mapDispatchToProps = {
  changeUserInfoThunk, updateOptionThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsScreen)
