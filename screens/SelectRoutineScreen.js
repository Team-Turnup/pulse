import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
  CheckBox,
  ListItem,
} from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import PreviousRoutine from '../components/PreviousRoutine';
//import { getRoutineThunk } from '../store/routines';
import { createRoutineThunk } from '../store/routines';

//maybe rename to CreateRoutineScreen
class SelectRoutineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedExerciseType: '',
      hapticCheckbox: true,
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleCreateNewRoutine = this.handleCreateNewRoutine.bind(this);
  }
  handleCheck = event => {
    this.setState({
      hapticCheckBox: event.target.hapticCheckBox,
    });
  };
  onValueChange(value) {
    this.setState({
      selectedExerciseType: value,
    });
  }
  handleCreateNewRoutine() {
    //atm it's not sending the selected exercise along with the created routine.
    //this.props.createRoutineThunk();
    this.props.navigation.navigate('BuildRoutineScreen');
    this.setState({
      selectedExerciseType: '',
    });
  }

  static navigationOptions = {
    header:null
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <RNPickerSelect
              onValueChange={value => this.onValueChange(value)}
              items={[
                { label: 'Walking', value: 'walking' },
                { label: 'Running', value: 'running' },
                { label: 'Cycling', value: 'cycling' },
                { label: 'Rowing', value: 'rowing' },
                { label: 'Jumping Jacks', value: 'jumping jacks' },
                { label: 'Pushups', value: 'pushups' },
                { label: 'Breathing', value: 'breathing' },
                { label: 'Dancing', value: 'dancing' },
                { label: 'Playing Music', value: 'playing music' },
              ]}
            />
          </Form>
          <ListItem>
            <CheckBox
              onPress={this.handleCheck}
              checked={this.state.hapticCheckBox}
            />
            <Body>
              <Text>Use Default Haptic Settings</Text>
            </Body>
          </ListItem>
          <Button
            bordered
            style={styles.button}
            onPress={() => this.props.navigation.navigate('BuildRoutineScreen')}
          >
            <Text>Create New Routine</Text>
          </Button>
          <Button bordered style={styles.button}>
            <PreviousRoutine
              selectedExerciseType={this.state.selectedExerciseType}
            />
          </Button>
        </Content>
      </Container>
    );
  }
}

SelectRoutineScreen.navigationOptions = {
  // title:'Select Exercise',
  header:null
}
const styles = StyleSheet.create({
  header: {
    marginTop: 15,
    fontSize: 20,
    textAlign: 'center',
    color: 'rgba(255,255,255, 0.9)',
  },
  button: {
    margin: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  routines: state.routines,
});

const mapDispatchToProps = dispatch => ({
  //getRoutineThunk: routineId => dispatch(getRoutineThunk(routineId)),
  createRoutineThunk: routine => dispatch(createRoutineThunk(routine)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectRoutineScreen);
