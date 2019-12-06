import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, TouchableOpacity, Image, Alert} from 'react-native'
import {Button, Container, Content, Item, Label, Input, Text} from 'native-base'
import RNPickerSelect from 'react-native-picker-select'
import NumericInput from 'react-native-numeric-input'
import CheckBox from 'react-native-check-box'
import {changeUserInfoThunk} from '../store/user'
import {haptic} from '../assets/options/haptics'
import {ColorPicker, toHsv, fromHsv} from 'react-native-color-picker'
import {updateOptionThunk} from '../store/option'
import {encode} from 'base-64'
import AppHeader from '../components/AppHeader'

class CadenceVibrationSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.user.name || '',
      age: this.props.user.age || 0,
      gender: this.props.user.gender || null,
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
    this.handleHaptic = this.handleHaptic.bind(this)
    this.clear = []
    this.clearVisual = []
  }

  handleChange(key, value) {
    this.setState({[key]: value})
    if (key !== 'visualColor') {
      this.props.updateOptionThunk({[key]: value})
    }
  }

  handleHaptic(value) {
    if (value) {
      this.props.updateOptionThunk({hapticWhat: value})
      this.setState({hapticWhat: value})
      this.clear.push(setInterval(haptic(value, 100), 600))
      setTimeout(() => clearInterval(this.clear.shift()), 5000)
    }
  }

  arrayBufferToBase64(buffer) {
    return btoa(
      new Uint8Array(buffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    )
  }

  handleSubmit() {
    Alert.alert(
      'Done',
      'Your settings are saved!',
      [
        {
          text: 'OK',
          onPress: () => this.props.navigation.navigate('Settings')
        }
      ],
      {
        cancelable: false
      }
    )
  }

  render() {
    // console.log(this.props.user.image.data)
    // console.log(encode(this.props.user.image)
    // const imageSrc = `data:image/jpeg;base64,${encode(this.props.user.image)}`
    // const arrayBufferView = new Uint8Array(this.props.user.image.data)
    // const imageSrc = new Blob( [arrayBufferView], {type: "image/jpeg"})
    // // const imageSrc =this.props.user.image
    // console.log(imageSrc.slice(0,50))
    return (
      <Container>
        <Content>
          <AppHeader navigation={this.props.navigation} />

          {/* <Button
          info
          onPress={()=> this.props.navigation.navigate('UserInfo')}
          >
            <Text>Edit User Info</Text>
          </Button> */}

          <Text style={styles.header}>Vibration Settings</Text>
          <View style={styles.viewDivider}></View>
          <View style={styles.viewPicker}>
            <Label>Vibration Feedback Style</Label>
            <RNPickerSelect
              onValueChange={value => this.handleHaptic(value)}
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
          </View>
          <View style={styles.viewDivider}></View>
          <View style={styles.viewPicker}>
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
          </View>
          <View style={styles.viewDivider}></View>
          <Button
            style={{...styles.button, marginTop: 15}}
            onPress={() => this.handleSubmit()}
          >
            <Text style={styles.buttonText}>Save Vibration Settings</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 15,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    color: 'rgb(84, 130, 53)',
    marginBottom: 25
  },
  viewPicker: {
    width: '100%',
    margin: 5,
    // borderWidth: 1,
    // borderColor: 'gray',
    // borderRadius: 5,
    display: 'flex',
    alignItems: 'center'
  },
  viewDivider: {
    width: '100%',
    // margin: 5,
    //borderWidth: 1,
    borderColor: 'gray',
    borderBottomWidth: 1
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white'
  },
  button: {
    margin: 15,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgb(84, 130, 53)'
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
  changeUserInfoThunk,
  updateOptionThunk
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CadenceVibrationSettings)
