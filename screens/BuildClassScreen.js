import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View} from 'react-native'
import {Container, Content, Item, Button, Text, Label, Input} from 'native-base'
import RNPickerSelect from 'react-native-picker-select'
import DatePicker from 'react-native-datepicker'
import CheckBox from 'react-native-check-box'
import {DateTime} from 'luxon'
import {createClassThunk} from '../store/singleClass'

class BuildClassScreen extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      canEnroll: true,
      when: new Date(),
      attendees: [],
      setClassPasscode: false,
      classPasscode: '',
      show: false,
      mode: 'date'
    }
    this.handleCreateClass = this.handleCreateClass.bind(this)
    this.showDateTimePicker = this.showDateTimePicker.bind(this)
    this.hideDateTimePicker = this.hideDateTimePicker.bind(this)
    this.setDate = this.setDate.bind(this)
  }

  showDateTimePicker() {
    this.setState({show: true})
  }

  hideDateTimePicker() {
    this.setState({show: true})
  }

  async handleCreateClass() {
    const {name, canEnroll, when, attendees, classPasscode} = this.state
    const routineId = this.props.routine.id
    await this.props.createClassThunk({
      name,
      canEnroll,
      when,
      attendees,
      classPasscode,
      routineId
    })
    this.props.navigation.navigate('TrainerWaitingScreen')
    //below is causing a crash because you're trying to start routine without a routine
    //this.props.navigation.navigate('StartRoutineScreen')
    this.setState({
      name: '',
      canEnroll: true,
      when: new Date(),
      attendees: [],
      setClassPasscode: false,
      classPasscode: ''
    })
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
    return (
      <Container>
        <Content>
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
          {/* <Item> */}
          <Label>Can Enroll?</Label>
          <RNPickerSelect
            onValueChange={value => this.handleChange('canEnroll', value)}
            style={{display: 'flex', alignItems: 'center'}}
            value={this.state.canEnroll}
            items={[
              {label: 'True', value: 'True'},
              {label: 'False', value: 'False'}
            ]}
          />
          {/* </Item> */}
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
          <Item fixedLabel style={styles.checkBox}>
            <CheckBox
              onClick={() =>
                this.setState(prevState => ({
                  setClassPasscode: !prevState.setClassPasscode
                }))
              }
              isChecked={this.state.setClassPasscode}
            />
            <Text>Set Passcode for Class?</Text>
          </Item>
          {this.state.setClassPasscode ? (
            <View>
              <Item fixedLabel style={styles.item}>
                <Label>Passcode</Label>
                <Input
                  placeholder=""
                  autoCapitalize="none"
                  autoCorrect={false}
                  //do we want to secure text entry?
                  secureTextEntry={false}
                  value={this.state.classPasscode}
                  onChangeText={classPasscode => this.setState({classPasscode})}
                  //style={styles.name}
                />
              </Item>
            </View>
          ) : (
            <View></View>
          )}
        </Content>
        <Button
          style={{
            ...styles.button
          }}
          onPress={() => this.handleCreateClass()}
        >
          <Text>Create a Class using a New Routine</Text>
        </Button>
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
  singleClass: state.singleClass,
  routine: state.routine
})

const mapDispatchToProps = dispatch => ({
  createClassThunk: singleClass => dispatch(createClassThunk(singleClass))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuildClassScreen)
