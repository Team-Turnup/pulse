import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AsyncStorage, StatusBar, StyleSheet, View} from 'react-native'
import {
  Container,
  Button,
  Text,
  Header,
  Title,
  Content,
  Card,
  CardItem
} from 'native-base'
import {removeUserToken} from '../store/auth'

class HomeScreen extends Component {
  _signOutAsync = () => {
    this.props
      .removeUserToken()
      .then(() => {
        this.props.navigation.navigate('Auth')
      })
      .then(console.log('1', this.props))
      .catch(error => {
        this.setState({error})
      })
  }

  render() {
    let dummyData = [
      {name: 'First Workout', duration: 60, date: 'Sept.15.2019'},
      {name: 'Second Workout', duration: 45, date: 'Oct.4.2019'},
      {name: 'Third Workout', duration: 70, date: 'Nov.21.2019'},
      {name: 'Fourth Workout', duration: 80, date: 'Dec.13.2019'}
    ]
    console.log('2', this.props)
    return (
      <Container>
        <Content style={{backgroundColor: 'midnightblue'}}>
          <Card>
            <CardItem header>
              <Title>Recent Workouts</Title>
            </CardItem>
            {dummyData.map((workout, i) => {
              return (
                <CardItem
                  button
                  key={i}
                  onPress={() =>
                    alert(
                      `Duration: ${workout.duration}\nDate: ${workout.date}`
                    )
                  }
                >
                  <Text header>{workout.name}</Text>
                </CardItem>
              )
            })}
          </Card>
          <Card>
            <View style={styles.container}>
              <Button
                title="I'm done, sign me out"
                onPress={this._signOutAsync}
              >
                <Text>Log Out</Text>
              </Button>
              <StatusBar barStyle="default" />
              {/* <Text> Here is the user token {this.props.token.token}</Text> */}
            </View>
          </Card>

          <Button
            block
            danger
            style={{margin: 7}}
            onPress={() =>
              this.props.navigation.navigate('SelectRoutineScreen')
            }
          >
            <Text>Add New Workout</Text>
          </Button>
          <Button
            block
            danger
            style={{margin: 7}}
            onPress={() => this.props.navigation.navigate('ClassesScreen')}
          >
            <Text>Join A Class</Text>
          </Button>

          <Button
            block
            danger
            style={{margin: 7}}
            onPress={() => this.props.navigation.navigate('BuildRoutineScreen')}
          >
            <Text>Create A Class</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

HomeScreen.navigationOptions = {
  title: '⚡️ Stride ⚡️',
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = state => ({
  token: state.token
})

const mapDispatchToProps = dispatch => ({
  removeUserToken: () => dispatch(removeUserToken())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
