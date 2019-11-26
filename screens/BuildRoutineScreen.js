import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Form,
  Item,
  Picker,
  List,
  Label,
  Input,
  ListItem,
  Left,
  Right,
  Icon,
  Text,
  CheckBox,
} from 'native-base';
import { VictoryChart, VictoryBar } from 'victory-native';
import RNPickerSelect from 'react-native-picker-select';
import NumericInput from 'react-native-numeric-input';
import RoutineBarGraphic from '../components/RoutineBarGraphic';

import {
  getRoutineThunk,
  createRoutineThunk,
  updateRoutineThunk,
} from '../store/routines';

//maybe rename to UpdateRoutineScreen
class BuildRoutineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseType: '',
      routineName: '',
      index: 0,
      cadence: 100,
      duration: 60,
      routine: []
      //dirty: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addInterval = this.addInterval.bind(this)
    this.saveInterval = this.saveInterval.bind(this)
    this.changeIndex = this.changeIndex.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  // async componentDidMount() {
  //   //await this.props.getRoutineThunk(this.props.navigation.params.id);
  //   //const routine = this.props.routines.routine;
  //   this.setState({
  //     // exerciseType: routine.exerciseType,
  //     // routineName: routine.routineName || '',
  //     // cadence: routine.cadence || 0,
  //     // duration: routine.duration || 0,
  //   });
  // }

  onValueChange(value) {
    this.setState({
      exerciseType: value,
    });
  }

  handleChange(key, value) {
    this.setState({[key]: value})
  }

  handleSubmit() {
    this.props.createRoutineThunk(this.state);
    this.setState({
      exerciseType: '',
      routineName: '',
      cadence: 0,
      duration: 0,
    });
    this.props.navigation.navigate('HomeScreen');
  }

  addInterval() {
    const {cadence, duration, routine, index} = this.state
    const newRoutine = [...routine.slice(0, index), {cadence, duration}, ...routine.slice(index)]
    this.setState({routine: newRoutine, index: routine.length===0 ? index : index+1})
  }

  saveInterval() {
    const {cadence, duration, routine, index} = this.state
    const newRoutine = [...routine.slice(0, index), {cadence, duration}, ...routine.slice(index+1)]
    this.setState({routine: newRoutine})
  }

  changeIndex(index) {
    const interval = this.state.routine[index]
    this.setState({index, cadence: interval.cadence, duration: interval.duration})
  }

  render() {
    let dummyData = [
      { label: 'Walking', value: 'walking', cadence: 1 },
      { label: 'Running', value: 'running', cadence: 5 },
      { label: 'Cycling', value: 'cycling', cadence: 10 },
    ];
    console.log(this.state)

    return (
      <Container>
        <Header>
          <Text style={styles.header}>Build Routine</Text>
        </Header>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Routine Name</Label>
              <Input
                placeholder=""
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.routineName}
                onChangeText={routineName => this.setState({ routineName })}
              />
            </Item>
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
            {/* <Item fixedLabel>
              <Label>Exercise Type</Label>
              <Input
                //pre-populate the selected exercise field with the chosen exercise
                //placeholder={this.state.exerciseType}
                autoCapitalize="none"
                autoCorrect={false}
                value={this.props.exerciseType}
                //onChangeText={exerciseType => this.setState({ exerciseType })}
              />
            </Item> */}

            <Item fixedLabel>
              <Label>Cadence</Label>
              <NumericInput
                value={this.state.cadence}
                onChange={value => this.handleChange('cadence', value)}
              />
            </Item>
            <Item fixedLabel>
              <Label>Duration</Label>
              <NumericInput
                value={this.state.duration}
                onChange={value => this.handleChange('duration', value)}
              />
            </Item>
          </Form>

          <Button
            bordered
            style={styles.button}
            onPress={() => this.addInterval()}
          >
            <Text>Insert Next Interval</Text>
          </Button>

          {this.state.index<this.state.routine.length ? <Button
            bordered
            style={styles.button}
            onPress={() => this.saveInterval()}
          >
            <Text>Save Changes to Current Interval</Text>
          </Button> : null }

          {this.state.index<this.state.routine.length ? <Text style={styles.message}>Current interval is highlighted in blue</Text> : null}

          <RoutineBarGraphic routine={this.state.routine} changeIndex={this.changeIndex} index={this.state.index}/>

          {/* display chart component here */}
          {/* <VictoryChart domainPadding={5}>
            <VictoryBar
              style={{ data: { fill: 'gold', width: 20 } }}
              alignment="start"
              data={dummyData}
              y={data => data.cadence}
              x={data => data.value}
            />
          </VictoryChart> */}

          <Button
            bordered
            style={styles.button}
            // onPress={() => this.navigation.navigate('PlaylistScreen')}
          >
            <Text>Generate Playlist</Text>
          </Button>
          <Button
            bordered
            style={styles.button}
            //need to actually save stuff via thunk

            onPress={() => this.handleSubmit()}
          >
            <Text>Save Routine & Return Home</Text>
          </Button>
          <Button
            bordered
            style={styles.button}
            //onPress={() => this.navigation.navigate('StartRoutineScreen')}
          >
            <Text>Save and Start Routine</Text>
          </Button>
        </Content>
      </Container>
    );
  }
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
  message: {
    fontSize: 10,
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

export default connect(mapStateToProps, mapDispatchToProps)(BuildRoutineScreen);
