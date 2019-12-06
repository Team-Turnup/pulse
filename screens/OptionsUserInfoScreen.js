import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native'
import {Container, Content, Item, Label, Input, Text, Button} from 'native-base'
import RNPickerSelect from 'react-native-picker-select'
import NumericInput from 'react-native-numeric-input'
import CheckBox from 'react-native-check-box'
import {changeUserInfoThunk} from '../store/user'
import {haptic} from '../assets/options/haptics'
import {ColorPicker, toHsv, fromHsv} from 'react-native-color-picker'
import {updateOptionThunk} from '../store/option'
import {encode} from 'base-64'

class UserInfoScreen extends Component {
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
    this.updateUserInfo = this.updateUserInfo.bind(this)
    this.handleHaptic = this.handleHaptic.bind(this)
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

  updateUserInfo() {
    const {name, age, gender, height, weight} = this.state
    this.props.changeUserInfoThunk({name, age, gender, height, weight})
  }

  handleHaptic(value) {
    if (value) {
      this.props.updateOptionThunk({hapticWhat: value})
      this.setState({hapticWhat: value})
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
  }

  arrayBufferToBase64(buffer) {
    return btoa(
      new Uint8Array(buffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    )
  }

  render() {
    return (
      <Container>
        <Content>
          <Text style={styles.header}>User Info</Text>
          <View style={styles.viewDivider}></View>
          <View style={styles.viewPicker}>
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
          </View>
          <View style={styles.viewDivider}></View>
          <View style={styles.viewPicker}>
            <Item fixedLabel style={styles.item}>
              <Label>Age</Label>
              <NumericInput
                value={this.state.age}
                onChange={value => this.handleChange('age', value)}
              />
            </Item>
          </View>
          <View style={styles.viewDivider}></View>
          <View style={styles.viewPicker}>
            <Item fixedLabel style={styles.item}>
              <Label>Height (inches)</Label>
              <NumericInput
                value={this.state.height}
                onChange={value => this.handleChange('height', value)}
              />
            </Item>
          </View>
          <View style={styles.viewDivider}></View>
          <View style={styles.viewPicker}>
            <Item fixedLabel style={styles.item}>
              <Label>Weight (lb)</Label>
              <NumericInput
                value={this.state.weight}
                onChange={value => this.handleChange('weight', value)}
              />
            </Item>
          </View>
          <View style={styles.viewDivider}></View>
          <View style={styles.viewPicker}>
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
          </View>
          <View style={styles.viewDivider}></View>
          <Button
            style={{...styles.button, marginTop: 15}}
            onPress={this.updateUserInfo}
          >
            <Text style={styles.buttonText}>Save User Info</Text>
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
  // button: {
  //   width: '30%',
  //   margin: 5,
  //   padding: 2,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 5
  // },
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
  changeUserInfoThunk,
  updateOptionThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoScreen)
