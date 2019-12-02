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

class HomeScreen extends Component {
  constructor() {
    super()
    this.state = {}
  }
  async componentDidMount() {
    // await this.props.me()
    await this.props.getMyClassesThunk()
  }

  render() {
    return (
      <Container>
        <Content style={{backgroundColor: 'midnightblue'}}>
          <Card>
            <CardItem header>
              <Title>Recent Workouts</Title>
            </CardItem>
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
            onPress={() => this.props.navigation.navigate('CreateClassScreen')}
          >
            <Text>Create A Class</Text>
          </Button>
          <Card>
            <Text>My Classes List</Text>
            {/* I need to be able to persist user information to be able to call on user's classes */}
            {/* {this.props.user.classes.map((aClass, i) => { */}
            {/* {this.props.myClasses.map((aClass, i) => {
              return (
                <CardItem key={i}>
                  <Text>{aClass.name}</Text>
                </CardItem>
              )
            })} */}
          </Card>
        </Content>
      </Container>
    )
  }
}

HomeScreen.navigationOptions = {
  title: '⚡️ Stride ⚡️',
  header: null
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me()),
  getMyClassesThunk: () => dispatch(getMyClassesThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
