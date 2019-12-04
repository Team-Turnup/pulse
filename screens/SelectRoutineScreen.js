import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View} from 'react-native'
import {
  Container,
  Content,
  Button,
  Text,
} from 'native-base'
import AppHeader from '../components/AppHeader'

class SelectRoutineScreen extends Component {

  render() {
    return (
      <Container>
        <Content>
        <AppHeader navigation={this.props.navigation}/>
        <Text style={{
          padding: 15,
          textAlign: 'center',
          fontWeight: "600",
          fontSize: 20,
          color: 'rgb(84, 130, 53)'
        }}>Start New Solo Workout</Text>
          <Button
            style={styles.button}
            onPress={() => this.props.navigation.navigate('BuildRoutineScreen')}
          >
            <Text>Create New Routine</Text>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate('PreviousRoutine')}
            style={styles.button}
          >
            <Text>Select Previous Routine</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 15,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgb(84, 130, 53)'
  },
})

export default SelectRoutineScreen
