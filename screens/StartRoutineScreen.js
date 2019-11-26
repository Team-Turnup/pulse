import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Item,
  Label,
  Input,
  Text,
} from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import NumericInput from 'react-native-numeric-input';
import CheckBox from 'react-native-check-box'
import RoutineBarGraphic from '../components/RoutineBarGraphic';
import activityTypes from '../assets/images/activityTypes'

import {
  getRoutineThunk,
  createRoutineThunk,
  updateRoutineThunk,
} from '../store/routines';

//maybe rename to UpdateRoutineScreen
class StartRoutineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const activityTypeSelects = Object.keys(activityTypes).map(activity => ({label: `${activityTypes[activity].icon} ${activityTypes[activity].display}`, value: activity}))

    return (
      <Container>
        <Content>
            <Text>Hello</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    textAlign: 'center',
    width: "100%",
    color: 'rgba(255,255,255, 0.9)',
    backgroundColor: 'gray'
  },
  buttons: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    width: "30%",
    margin: 5,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 12,
    textAlign: "center",
    color: "white"
  },
  message: {
    fontSize: 10,
    textAlign: 'center'
  },
  item: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignContent: "center",
    justifyContent: 'space-between'
  },
  checkBox: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignContent: "center",
    justifyContent: 'center'
  },
  name: {
    textAlign: "right"
  },
  sectionHeader: {
    width: '100%',
    backgroundColor: "blue",
    color: "white",
    textAlign: 'center'
  }
});

const mapStateToProps = state => ({
  routines: state.routines,
});

const mapDispatchToProps = dispatch => ({
  getRoutineThunk: routineId => dispatch(getRoutineThunk(routineId)),
  createRoutineThunk: routine => dispatch(createRoutineThunk(routine)),
  updateRoutineThunk: routine => dispatch(updateRoutineThunk(routine)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartRoutineScreen);
