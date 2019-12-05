import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, StyleSheet} from 'react-native'
import {
  Container,
  Button,
  Text,
  Content,
  Card,
  Input,
  CardItem
} from 'native-base'
import {getMyClassesThunk} from '../store/myClasses'
import {getMyWorkoutsThunk} from '../store/workouts'
import {TouchableOpacity} from 'react-native-gesture-handler'
import activityTypes from '../assets/images/activityTypes'
import RoutineBarMini from '../components/RoutineBarMini'

import AppHeader from '../components/AppHeader'

class HomeClassesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      numPerPage: 4,
      pastClassesPages: 0,
      futureClassesPages: 0,
      sort: null,
      search: '',
      classId: null
    }
    this.handleChange = this.handleChange.bind(this)
  }
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    this.props.getMyClassesThunk()
  }

  handleChange(event) {}

  render() {
    const {navigation, myClasses} = this.props
    const {page, numPerPage, search, sort, classId} = this.state

    let aDate = Date.parse(new Date().toString())

    let pastClasses = myClasses.filter(
      aClass => Date.parse(aClass.when) < aDate
    )
    let futureClasses = myClasses.filter(
      aClass => Date.parse(aClass.when) > aDate
    )

    console.log('FUTURECLASSES', futureClasses)
    console.log('PASTCLASSES', pastClasses)

    let viewPastClasses = [...pastClasses]
    let pastClassesResults = viewPastClasses.length
    let pastClassesPages = Math.ceil(pastClassesResults / numPerPage)
    viewPastClasses = viewPastClasses.slice(
      (page - 1) * numPerPage,
      page * numPerPage
    )

    let viewFutureClasses = [...futureClasses]
    let futureClassesResults = viewFutureClasses.length
    let futureClassesPages = Math.ceil(futureClassesResults / numPerPage)
    viewFutureClasses = viewFutureClasses.slice(
      (page - 1) * numPerPage,
      page * numPerPage
    )

    return (
      <Content>
        <AppHeader />
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
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-evenly'
                }}
              >
                {page > 1 ? (
                  <TouchableOpacity
                    style={{
                      width: 25,
                      height: 35,
                      backgroundColor: 'rgb(84, 130, 53)',
                      borderRadius: 5,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    onPress={() =>
                      this.setState(prevState => ({
                        page: prevState.page - 1
                      }))
                    }
                  >
                    <Text style={{color: 'white', fontSize: 25}}>{'<'}</Text>
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}

                <Text style={{fontWeight: '600', marginBottom: 10}}>
                  My Upcoming Classes
                </Text>
                {page < pastClassesPages ? (
                  <TouchableOpacity
                    style={{
                      width: 25,
                      height: 35,
                      backgroundColor: 'rgb(84, 130, 53)',
                      borderRadius: 5,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    onPress={() =>
                      this.setState(prevState => ({
                        page: prevState.page + 1
                      }))
                    }
                  >
                    <Text style={{color: 'white', fontSize: 25}}>{'>'}</Text>
                  </TouchableOpacity>
                ) : (
                  <View
                  // style={{
                  //   width: 25,
                  //   height: 35
                  // }}
                  ></View>
                )}
              </View>
              {/* <View style={{width: '30%', margin: 2}}>
                    <Input
                      placeholder="Search"
                      autoCorrect={false}
                      value={search}
                      onChangeText={search => this.setState({search})}
                      style={{
                        borderBottomColor: 'gray',
                        borderBottomWidth: 1,
                        fontSize: 14,
                        height: 16
                      }}
                    />
                  </View> */}
              {viewFutureClasses.length ? (
                viewFutureClasses.map((aClass, i) => {
                  const duration = aClass.routine.intervals.reduce(
                    (sum, interval) => sum + interval.duration,
                    0
                  )
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
                        <Text
                          style={{
                            color: 'rgb(84, 130, 53)',
                            fontWeight: '600',
                            fontSize: 18
                          }}
                        >
                          {aClass.name}{' '}
                          {activityTypes[aClass.routine.activityType].icon}
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
                      <RoutineBarMini
                        routine={aClass.routine.intervals}
                        totalDuration={duration}
                        activityType={aClass.routine.activityType}
                      />
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
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-evenly'
                  }}
                >
                  {page > 1 ? (
                    <TouchableOpacity
                      style={{
                        width: 25,
                        height: 35,
                        backgroundColor: 'rgb(84, 130, 53)',
                        borderRadius: 5,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      onPress={() =>
                        this.setState(prevState => ({
                          page: prevState.page - 1
                        }))
                      }
                    >
                      <Text style={{color: 'white', fontSize: 25}}>{'<'}</Text>
                    </TouchableOpacity>
                  ) : (
                    <View></View>
                  )}

                  <Text style={{fontWeight: '600', marginBottom: 10}}>
                    My Previous Classes
                  </Text>

                  {page < pastClassesPages ? (
                    <TouchableOpacity
                      style={{
                        width: 25,
                        height: 35,
                        backgroundColor: 'rgb(84, 130, 53)',
                        borderRadius: 5,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      onPress={() =>
                        this.setState(prevState => ({
                          page: prevState.page + 1
                        }))
                      }
                    >
                      <Text style={{color: 'white', fontSize: 25}}>{'>'}</Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                    // style={{
                    //   width: 25,
                    //   height: 35
                    // }}
                    ></View>
                  )}
                </View>

                <View>
                  {viewPastClasses.length ? (
                    viewPastClasses.map((aClass, i) => {
                      const duration = aClass.routine.intervals.reduce(
                        (sum, interval) => sum + interval.duration,
                        0
                      )
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
                            <Text
                              style={{
                                color: 'rgb(84, 130, 53)',
                                fontWeight: '600',
                                fontSize: 18
                              }}
                            >
                              {aClass.name}{' '}
                              {activityTypes[aClass.routine.activityType].icon}
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
                          <RoutineBarMini
                            routine={aClass.routine.intervals}
                            totalDuration={duration}
                            activityType={aClass.routine.activityType}
                          />
                        </TouchableOpacity>
                      )
                    })
                  ) : (
                    <Text>- No previous classes</Text>
                  )}
                </View>
              </View>
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
            onPress={() => navigation.navigate('CreateClassScreen')}
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
