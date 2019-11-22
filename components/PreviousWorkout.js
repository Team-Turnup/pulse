import React, { Component } from 'react';
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
  ListItem,
  Left,
  Right,
  Icon,
} from 'native-base';
import RNPickerSelect from 'react-native-picker-select';

const yesterday = { name: yesterday };
const thursday = { name: thursday };
const sunday = { name: sunday };

// export default class PreviousWorkout extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       previousWorkout: [yesterday, thursday, sunday],
//       selectedWorkout: {},
//     };
//   }
//   onValueChange(value) {
//     this.setState({
//       selectedWorkout: value,
//     });
//   }
//   render() {
//     return (
//       <Container>
//         <Content>
//           <Form>
//             <Header>
//               <Text styles={styles.headerStyle}> Use Previous Workout: </Text>
//             </Header>
//             <RNPickerSelect
//               onValueChange={this.onValueChange.bind(this)}
//               items={[
//                 { label: 'Yesterday', value: 'yesterday' },
//                 { label: 'Thursday', value: 'thursday' },
//                 { label: 'Sunday', value: 'sunday' },
//               ]}
//             />
//             {/* <Item picker>
//               <Picker
//                 mode="dropdown"
//                 selectedValue={this.state.selectedWorkout}
//                 onValueChange={this.onValueChange.bind(this)}
//               >
//                 <Picker.Item label="Yesterday" value="key0" />
//                 <Picker.Item
//                   label={this.state.previousWorkout[0]}
//                   value="key0"
//                 />
//               </Picker>
//             </Item> */}
//           </Form>
//         </Content>
//       </Container>
//     );
//   }
// }

export default class PreviousWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      previousWorkout: [yesterday, thursday, sunday],
      selectedWorkout: {},
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  onValueChange(value) {
    this.setState({
      selectedWorkout: value,
    });
  }
  render() {
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
              <Text>Hello World!</Text>
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
                onPress={() =>
                  this.props.navigation.navigate('BuildWorkoutScreen')
                }
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
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Select From Previous Workout</Text>
        </Button>
      </View>
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
