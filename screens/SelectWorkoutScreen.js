import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
//import { connect } from 'react-redux';
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
import { MonoText } from '../components/StyledText';
import PreviousWorkout from '../components/PreviousWorkout';

export default class SelectWorkoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedExercise: '',
    };
    this.onValueChange.bind(this);
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
              onValueChange={value => this.onValueChange(value)}
              items={[
                { label: 'Walking', value: 'walking' },
                { label: 'Running', value: 'running' },
                { label: 'Cycling', value: 'cycling' },
              ]}
            />
          </Form>
          <Button
            onPress={() => this.props.navigation.navigate('BuildWorkoutScreen')}
          >
            <Text>Create New Workout</Text>
          </Button>
          <PreviousWorkout selectedExercise={this.state.selectedExercise} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
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
