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
      cadence: 0,
      duration: 0,
      //dirty: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    //await this.props.getRoutineThunk(this.props.navigation.params.id);
    //const routine = this.props.routines.routine;
    this.setState({
      // exerciseType: routine.exerciseType,
      // routineName: routine.routineName || '',
      // cadence: routine.cadence || 0,
      // duration: routine.duration || 0,
    });
  }
  onValueChange(value) {
    this.setState({
      exerciseType: value,
    });
  }
  handleSubmit(event) {
    //event.preventDefault();
    console.log(this.props.createRoutineThunk);
    this.props.createRoutineThunk(this.state);
    console.log('running handlesubmit');
    this.setState({
      exerciseType: '',
      routineName: '',
      cadence: 0,
      duration: 0,
    });
    this.props.navigation.navigate('HomeScreen');
  }

  render() {
    let dummyData = [
      { label: 'Walking', value: 'walking', cadence: 1 },
      { label: 'Running', value: 'running', cadence: 5 },
      { label: 'Cycling', value: 'cycling', cadence: 10 },
    ];
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
                onChange={value => this.setState({ value })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Duration</Label>
              <NumericInput
                value={this.state.duration}
                onChange={value => this.setState({ value })}
              />
            </Item>
          </Form>

          <Button
            bordered
            style={styles.button}
            //onPress={() => this.handleSubmit()}
          >
            <Text>Add to Routine</Text>
          </Button>

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
          <RoutineBarGraphic />

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
