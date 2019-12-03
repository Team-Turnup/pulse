//buggy?
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View} from 'react-native'
import {Container, Header, Button, Text} from 'native-base'
//import {getRoutineThunk} from '../store/routines'

class CreateClassScreen extends Component {
  constructor() {
    super()
    this.state = {
      routine: []
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.routine !== prevProps.routine) {
      //this.fetchData(this.props.routine);
      this.setState({
        routine: this.props.navigation.getParam('routine')
      })
    }
  }
  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     routine: this.props.navigation.getParam('routine')
  //   }
  // }

  render() {
    return (
      <Container>
        <Header>
          <Text style={styles.header}>
            How would you like to Create your Class?
          </Text>
        </Header>
        {this.state.routine.length ? (
          <Text>Your Selected Routine is: {this.props.routine}</Text>
        ) : (
          <View />
        )}
        {!this.state.routine.length ? (
          <Button
            style={{
              ...styles.button
            }}
            onPress={() => this.props.navigation.navigate('PreviousRoutine')}
          >
            <Text>Select Previous Routine</Text>
          </Button>
        ) : (
          <View />
        )}
        {!this.state.routine.length ? (
          <Button
            style={{
              ...styles.button
            }}
            onPress={() => this.props.navigation.navigate('BuildRoutineScreen')}
          >
            <Text>Select New Routine</Text>
          </Button>
        ) : (
          <View />
        )}
        {this.state.routine.length ? (
          <Button
            style={{
              ...styles.button
            }}
            onPress={() => this.props.navigation.navigate('BuildClassScreen')}
          >
            <Text>Start Creating Class</Text>
          </Button>
        ) : (
          <View />
        )}
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

const mapStateToProps = state => ({
  routine: state.routine
})

// const mapDispatchToProps = dispatch => ({
//   getRoutineThunk: id => dispatch(getRoutineThunk(id))
// })

export default connect(mapStateToProps)(CreateClassScreen)
