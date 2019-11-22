import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  //Text,
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
} from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import { VictoryLine, VictoryBar } from 'victory-native';
import { MonoText } from '../components/StyledText';
import PreviousWorkout from '../components/PreviousWorkout';

export default class SelectWorkoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedExercise: '',
    };
  }
  onValueChange(value) {
    this.setState({
      selectedExercise: value,
    });
  }
  render() {
    return (
      <Container>
        <Header>
          <Text styles={styles.headerStyle}> Select Exercise </Text>
        </Header>
        <Content>
          <Form>
            <RNPickerSelect
              onValueChange={this.onValueChange.bind(this)}
              items={[
                { label: 'Walking', value: 'key0' },
                { label: 'Running', value: 'key1' },
                { label: 'Cycling', value: 'key2' },
              ]}
            />
            {/*
              <Item picker>
              <Picker
                mode="dropdown"
                selectedValue={this.state.selectedExercise}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="Walking" value="key0" />
                <Picker.Item label="Running" value="key1" />
                <Picker.Item label="Cycling" value="key2" />
                <Picker.Item label="Sleepwalking" value="key3" />
                <Picker.Item label="Speed-Eating" value="key4" />
                <Picker.Item label="Air-Punching" value="key5" />
              </Picker>
                </Item>
               */}
          </Form>

          <Button
            onPress={() => this.props.navigation.navigate('BuildWorkoutScreen')}
          >
            <Text>Create New Workout</Text>
          </Button>

          {/* <Button
          //onPress={() => this.props.navigation.navigate('Previous Workout')}
          >
            <Text>Use Previous Workout: </Text>
          </Button> */}
          <PreviousWorkout />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
    // flex:1,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
