import React, { Component } from 'react';
//import { connect } from 'react-redux';
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
  ListItem,
  Left,
  Right,
  Icon,
  Text,
} from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
//import { getRoutineThunk } from '../store/routines';
//import { updateRoutineThunk } from '../store/routines';

export default class PreviousRoutine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      previousRoutines: [],
      selectedRoutine: {},
    };
    this.handleSubmitPreviousRoutine = this.handleSubmitPreviousRoutine.bind(
      this
    );
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  onValueChange(value) {
    this.setState({
      selectedRoutine: value,
    });
  }
  handleSubmitPreviousRoutine() {
    //navigation throwing error
    //this.props.updateRoutineThunk();
    //this.props.navigation.navigate('BuildRoutineScreen');
    this.setState({
      selectedExerciseType: {},
    });
  }
  render() {
    const yesterday = { name: yesterday };
    const thursday = { name: thursday };
    const sunday = { name: sunday };
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Select From Your Previous Workouts</Text>
              {/* <List>
                <ListItem selected>
                  <Left>
                    <Text>Yesterday</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem>
                  <Left>
                    <Text>Thursday</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem>
                  <Left>
                    <Text>Sunday</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              </List> */}
              <RNPickerSelect
                onValueChange={this.onValueChange.bind(this)}
                items={[
                  { label: 'Yesterday', value: 'yesterday' },
                  { label: 'Thursday', value: 'thursday' },
                  { label: 'Sunday', value: 'sunday' },
                ]}
              />
              <Button
                bordered
                style={styles.button}
                onPress={() => this.handleSubmitPreviousRoutine()}
              >
                <Text>Finalize Selection</Text>
              </Button>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Button
          style={styles.button}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Select From Previous Routine</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 15,
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    margin: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// const mapStateToProps = state => ({
//   routine: state.routine,
// });

// const mapDispatchToProps = dispatch => ({
//   //getRoutineThunk: routineId => dispatch(getRoutineThunk(routineId)),
//   updateRoutineThunk: routine => dispatch(updateRoutineThunk(routine)),
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PreviousRoutine);
