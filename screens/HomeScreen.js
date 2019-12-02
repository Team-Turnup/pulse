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
import {me} from '../store/user'
import {getMyClassesThunk} from '../store/myClasses'
import {getMyWorkoutsThunk} from '../store/workouts'
import MyPreviousWorkouts from '../components/MyPreviousWorkouts'

class HomeScreen extends Component {
  componentDidMount() {
    this.props.me()
    this.props.getMyClassesThunk()
    this.props.getMyWorkoutsThunk()
  }

  render() {
    const {navigation} = this.props
    console.log('this.props.myClasses', this.props.myClasses)
    return (
      <Container>
        <Content style={{backgroundColor: 'midnightblue'}}>
          <Button
            block
            danger
            style={{margin: 7}}
            onPress={() => navigation.navigate('SelectRoutineScreen')}
          >
            <Text>Start New Solo Workout</Text>
          </Button>
          <Button
            block
            danger
            style={{margin: 7}}
            onPress={() =>
              navigation.navigate('ClassesScreen', {
                loggedInUserId: this.props.user.id
              })
            }
          >
            <Text>Join Class</Text>
          </Button>

          <Button
            block
            danger
            style={{margin: 7}}
            onPress={() => this.props.navigation.navigate('CreateClassScreen')}
          >
            <Text>Create Class</Text>
          </Button>
          <Card>
          <CardItem header>
            <Text>My Upcoming Classes (follower)</Text>
            </CardItem>
            {this.props.myClasses.map((aClass, i) => {
              return (
                <CardItem key={i}>
                  <Text>{aClass.name}</Text>
                </CardItem>
              )
            })}
          </Card>

          <Card>
          <CardItem header>
            <Text>My Upcoming Classes (leader)</Text>
            </CardItem>
            {/* {this.props.myClasses.map((aClass, i) => {
              return (
                <CardItem key={i}>
                  <Text>{aClass.name}</Text>
                </CardItem>
              )
            })} */}
          </Card>

          <MyPreviousWorkouts workouts={this.props.workouts} />
        </Content>
      </Container>
    )
  }
}

HomeScreen.navigationOptions = {
  title: '⚡️ Stride ⚡️',
  header: null
}

const mapStateToProps = ({user, workouts, myClasses}) => ({
  user,
  workouts,
  myClasses
})

const mapDispatchToProps = {me, getMyClassesThunk, getMyWorkoutsThunk}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
