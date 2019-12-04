import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, StyleSheet} from 'react-native'
import {Container, Button, Text, Content, Card, CardItem} from 'native-base'
import {getMyClassesThunk} from '../store/myClasses'
import {getMyWorkoutsThunk} from '../store/workouts'
import {TouchableOpacity} from 'react-native-gesture-handler'
import activityTypes from '../assets/images/activityTypes'


import AppHeader from '../components/AppHeader'

class HomeClassesScreen extends Component {
  componentDidMount() {
    this.props.getMyClassesThunk()
    // this.props.getMyWorkoutsThunk()
  }

  render() {
    console.log("this.props", this.props)
    const {navigation} = this.props
    return (
      <Content>
        <AppHeader navigation={this.props.navigation} />
        <View>
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
              {this.props.myClasses.length ? (
                this.props.myClasses.map((aClass, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={{
                        marginTop: 5,
                        marginBottom: 5,
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 10,
                        overflow: 'hidden'
                      }}
                    >
                      <Text style={{textAlign: 'center'}}>
                        {/* Name:{' '} */}
                        <Text
                          style={{
                            color: 'rgb(84, 130, 53)',
                            fontWeight: '600',
                            fontSize: 18
                          }}
                        >
                          {aClass.name}
                        </Text>
                      </Text>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-evenly'
                        }}
                      >
                        <Text>
                          Class Activity :{' '}
                          <Text
                            style={{
                              color: 'rgb(84, 130, 53)',
                              fontStyle: 'italic'
                            }}
                          >
                            {activityTypes[aClass.routine.activityType].icon}

                          </Text>
                        </Text>
                        <Text>
                          Trainer:{' '}
                          <Text
                            style={{
                              color: 'rgb(84, 130, 53)',
                              fontStyle: 'italic'
                            }}
                          >
                            {aClass.user.name.split(' ')[0]}
                          </Text>
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
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
              {this.props.myClasses.length ? (
                this.props.myClasses.map((aClass, i) => {
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
            <Text>Join Class</Text>
          </Button>

          <Button
            style={styles.button}
            onPress={() => this.props.navigation.navigate('CreateClassScreen')}
          >
            <Text>Create Class</Text>
          </Button>
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

const mapDispatchToProps = {getMyClassesThunk, getMyWorkoutsThunk}

export default connect(mapStateToProps, mapDispatchToProps)(HomeClassesScreen)
