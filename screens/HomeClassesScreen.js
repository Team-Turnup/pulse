import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, StyleSheet} from 'react-native'
import {Container, Button, Text, Content, Card, CardItem} from 'native-base'
import {getMyClassesThunk} from '../store/myClasses'
import {getMyWorkoutsThunk} from '../store/workouts'
import {getClassThunk} from '../store/singleClass'
import AppHeader from '../components/AppHeader'

class HomeClassesScreen extends Component {
  componentDidMount() {
    this.props.getMyClassesThunk()
    this.props.getClassThunk(1)
    // this.props.getMyWorkoutsThunk()
  }

  render() {
    const {navigation, myClasses} = this.props
    const upcomingClasses = myClasses.upcoming
    const previousClasses = myClasses.previous
    return (
      <Content>
        <AppHeader navigation={navigation} />
        <View>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('TrainerWaitingScreen')}
          >
            <Text>Start Test Class</Text>
          </Button>
          <Content style={{margin: 15}}>
            <Card
              style={{
                borderRadius: 10,
                overflow: 'hidden',
                padding: 15,
                margin: 15
              }}
            >
              <Text style={{fontWeight: '600', marginBottom: 10}}>
                My Upcoming Classes
              </Text>
              {upcomingClasses.length ? (
                upcomingClasses.map((aClass, i) => {
                  return <Text key={i}>{aClass.name}</Text>
                })
              ) : (
                <Text>- No upcoming classes</Text>
              )}
            </Card>

            <Card
              style={{
                borderRadius: 10,
                overflow: 'hidden',
                padding: 15,
                margin: 15
              }}
            >
              <Text style={{fontWeight: '600', marginBottom: 10}}>
                My Previous Classes
              </Text>
              {previousClasses.length ? (
                previousClasses.map((aClass, i) => {
                  return <Text key={i}>{aClass.name}</Text>
                })
              ) : (
                <Text>- No previous classes</Text>
              )}
            </Card>
          </Content>
          <Button
            style={styles.button}
            onPress={() =>
              navigation.navigate('ClassesScreen', {
                loggedInUserId: this.props.user.id
              })
            }
          >
            <Text>Enroll in Class</Text>
          </Button>

          <Button
            style={styles.button}
            onPress={() => this.props.navigation.navigate('CreateClassScreen')}
          >
            <Text>Create Class</Text>
          </Button>
          {/* <Card>
            <CardItem header>
              <Text>My Upcoming Classes</Text>
            </CardItem>
            {this.props.myClasses.map((aClass, i) => {
              return (
                <CardItem
                  button
                  onPress={() => {
                    console.log('aClass.id', aClass.id)
                    navigation.navigate('UserWaitingScreen', {
                      classId: aClass.id
                    })
                  }}
                  key={i}
                >
                  <Text>{aClass.name}</Text>
                </CardItem>
              )
            })}
          </Card>

          <Card>
            <CardItem header>
              <Text>My Previous Classes</Text>
            </CardItem>
          </Card> */}
        </View>
      </Content>
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
  }
})

const mapStateToProps = ({user, workouts, myClasses}) => ({
  user,
  workouts,
  myClasses
})

const mapDispatchToProps = {
  getMyClassesThunk,
  getMyWorkoutsThunk,
  getClassThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeClassesScreen)
