import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, TouchableOpacity, Image, Alert} from 'react-native'
import {Button, Container, Content, Item, Label, Input, Text} from 'native-base'
import RNPickerSelect from 'react-native-picker-select'
import {changeUserInfoThunk} from '../store/user'
import {ColorPicker, toHsv, fromHsv} from 'react-native-color-picker'
import {updateOptionThunk} from '../store/option'
import {encode} from 'base-64'
import AppHeader from '../components/AppHeader'

class VisualSettingsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visualWhat: this.props.option.visualWhat || 'blink',
      visualColor: toHsv(this.props.option.visualColor) || {h: 0, s: 1, v: 1},
      opacity: 1,
      visualWhen: this.props.option.visualWhen || 'everybeat'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleVisual = this.handleVisual.bind(this)
    this.handleVisualColor = this.handleVisualColor.bind(this)
    this.clear = []
    this.clearVisual = []
  }

  handleChange(key, value) {
    this.setState({[key]: value})
    if (key !== 'visualColor') {
      this.props.updateOptionThunk({[key]: value})
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
    this.clearVisual.push(
      setInterval(() => {
        this.setState({opacity: 0.3})
        setTimeout(() => this.setState({opacity: 1}), 300)
      }, 600)
    )
    setTimeout(() => clearInterval(this.clearVisual.shift()), 5000)
    // if (value) {
    //     if (this.clear.length) {
    //         clearInterval(this.clear.shift())
    //     }
    // this.clear.push(setInterval(haptic(value, 100), 600))
    // setTimeout(()=>clearInterval(this.clear.shift()), 5000)
    Alert.alert(
      'Done',
      'Your color is saved!',
      [
        {
          text: 'OK'
        }
      ],
      {
        cancelable: false
      }
    )
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
          <Text style={styles.header}>Visual Settings</Text>
          {/* <View
          style={{
            ...styles.visual,
            backgroundColor: fromHsv(this.state.visualColor),
            opacity: this.state.opacity
          }}
          ></View> */}
          <View style={styles.viewDivider}></View>
          <View>
            <Label>Visual Feedback Style</Label>
            <RNPickerSelect
              onValueChange={value => this.handleVisual(value)}
              style={{display: 'flex', alignItems: 'center'}}
              value={this.state.visualWhat}
              items={[{label: 'Blink', value: 'blink'}]}
            />
          </View>
          <View style={styles.viewDivider}></View>
          <View>
            <Label>Visual Feedback Color</Label>
            <Text>(click the center circle to confirm color)</Text>
          </View>
          <ColorPicker
            onColorSelected={color => this.handleVisualColor(color)}
            onColorChange={color => this.handleChange('visualColor', color)}
            style={{height: 400, marginBottom: 100}}
            color={this.state.visualColor}
            // hideSliders={true}
          />
          <View>
            <View style={styles.viewDivider}></View>
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
          </View>
          <View style={styles.viewDivider}></View>
          <Button
            style={{...styles.button, marginTop: 15}}
            onPress={() => this.handleSubmit()}
          >
            <Text style={styles.buttonText}>Save Visual Settings</Text>
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
)(VisualSettingsScreen)
