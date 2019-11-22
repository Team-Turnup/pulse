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
  Text,
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
} from 'native-base';
//import thunk from store

export default class BuildWorkoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedExercise: '',
      routineName: '',
      cadence: '',
      duration: '',
    };
  }
  componentDidMount() {
    //going to use this to pull up whatever exercise they've previously selected
    this.setState({
      //selectedExercise: this.whatever we get from redux
    });
  }

  // onValueChange(event) {
  //   this.setState({
  //   });
  // }

  handleSubmit() {
    //this.props.navigation.navigate('NextScreen')
    this.setState({
      routineName: '',
      cadence: '',
      duration: '',
    });
  }

  render() {
    return (
      // <View>
      <Container>
        <Header>
          <Text>Build Workout</Text>
        </Header>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Selected Exercise</Label>
              <Input
                //pre-populate the selected exercise field with the chosen exercise
                placeholder=""
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.selectedExercise}
                //onChangeText={routineName => this.setState({ routineName })}
              />
            </Item>
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
            <Item fixedLabel>
              <Label>Cadence</Label>
              <Input
                //pre-populate the cadence field with the default cadence
                placeholder="Default Cadence"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.cadence}
                onChangeText={cadence => this.setState({ cadence })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Duration</Label>
              <Input
                placeholder="0 minutes"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.duration}
                onChangeText={duration => this.setState({ duration })}
              />
            </Item>
            <Button onPress={() => this.handleSubmit()}>
              <Text>Create New Workout</Text>
            </Button>
            <Button
            // onPress={() => this.navigation.navigate('PlaylistScreen')}
            >
              <Text>Generate Playlist</Text>
            </Button>

            <Button
            //onPress={() => this.navigation.navigate('StartRoutineScreen')}
            >
              <Text>Start Routine</Text>
            </Button>
          </Form>
        </Content>
      </Container>
      //</View>
    );
  }
}

// const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(BuildWorkoutScreen);
