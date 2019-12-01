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
    this.props.getUser()
  }

  render() {
    console.log('HOMEPROPSS.user::', this.props.user)

    const {navigation} = this.props

    return (
      <Container>
        <Content style={{backgroundColor: 'midnightblue'}}>
          <Card>
            <CardItem header>
              <Title>My Classes</Title>
            </CardItem>
            {/* {dummyData.map((workout, i) => {
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
            })} */}
          </Card>
          <Button
            block
            danger
            style={{margin: 7}}
            onPress={() =>
              navigation.navigate('SelectRoutineScreen')
            }
          >
            <Text>Add New Workout</Text>
          </Button>
          <Button
            block
            danger
            style={{margin: 7}}
            onPress={()=> navigation.navigate('ClassesScreen', {
              loggedInUserId: this.props.user.id
            })}
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
