import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, StyleSheet} from 'react-native'
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
import {me} from '../store/users'


class HomeScreen extends Component {
  componentDidMount(){
    // console.log('HELLOFROMHOMESCREEN', this.props.navigation.getParam('email','NA'))
    // console.log('....................................')
    // console.log('PROPS', this.props)
    this.props.getUser()
  }

  render() {
    console.log('HOMEPROPSS', this.props.user)

    const {navigation} = this.props

    let dummyData = [
      {name: 'First Workout', duration: 60, date: 'Sept.15.2019'},
      {name: 'Second Workout', duration: 45, date: 'Oct.4.2019'},
      {name: 'Third Workout', duration: 70, date: 'Nov.21.2019'},
      {name: 'Fourth Workout', duration: 80, date: 'Dec.13.2019'}
    ]
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

const mapStateToProps = state =>({
  user: state.users
})

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(me())
})

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)
