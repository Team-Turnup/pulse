import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
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
  ListItem
} from 'native-base'

class CreateClassScreen extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <Container>
        <Header>
          <Text style={styles.header}>
            How would you like to Create your Class?
          </Text>
        </Header>
        <Button
          style={{
            ...styles.button
            //backgroundColor: this.state.intervalType ? 'blue' : 'gray'
          }}
          onPress={() => this.props.navigation.navigate('PreviousRoutine')}
        >
          <Text>Create a Class using a Previous Routine</Text>
        </Button>
        <Button
          style={{
            ...styles.button
            //backgroundColor: this.state.intervalType ? 'blue' : 'gray'
          }}
          //this should lead to BuildClass instead
          onPress={() => this.props.navigation.navigate('BuildClassScreen')}
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

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CreateClassScreen)
