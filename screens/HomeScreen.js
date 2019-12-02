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
  async componentDidMount() {
    this.props.me()
    // await this.props.me()
    await this.props.getMyClassesThunk()
  }

  render() {
    const {navigation} = this.props
    // console.log('this.props.user', this.props.user)
    console.log('myClasses', this.props.myClasses)
    return (
      <Container>
        <Content style={{backgroundColor: 'midnightblue'}}>
          <Card>
            <CardItem header>
              <Title>My Classes</Title>
            </CardItem>
          </Card>
          <Button
            block
            danger
            style={{margin: 7}}
            onPress={() => navigation.navigate('SelectRoutineScreen')}
          >
            <Text>Add New Workout</Text>
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
            {this.props.myClasses.map((aClass, i) => {
              console.log('aClass', aClass)
              return (
                <CardItem key={i}>
                  <Text>{aClass.name}</Text>
                </CardItem>
              )
            })}
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
  user: state.user,
  myClasses: state.myClasses
})

const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me()),
  getMyClassesThunk: () => dispatch(getMyClassesThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
