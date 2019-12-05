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
import RNPickerSelect from 'react-native-picker-select'

import AppHeader from '../components/AppHeader'

class HomeClassesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      futureClassesPage: 1,
      pastClassesPage: 1,
      numPerPage: 3,
      pastClassesPages: 0,
      futureClassesPages: 0,
      futureFilter: null,
      pastFilter:null,
      sort: null,
      searchUpcoming: '',
      searchPrevious: '',
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

  handleChange(key, value) {
    this.setState({[key]: value})
  }

  render() {
    const {navigation, myClasses} = this.props
    const {
      futureClassesPage,
      pastClassesPage,
      numPerPage,
      searchUpcoming,
      searchPrevious,
      futureFilter,
      pastFilter,
      sort,
      classId
    } = this.state

    let aDate = Date.parse(new Date().toString())

    const activityTypeSelects = Object.keys(activityTypes).map(activity => ({
      label: `${activityTypes[activity].icon} ${activityTypes[activity].display}`,
      value: activity
    }))

    let futureFilteredClasses = futureFilter
      ? myClasses.filter(aClass => aClass.routine.activityType === futureFilter)
      : myClasses

    let pastFilteredClasses = pastFilter
      ? myClasses.filter(aClass => aClass.routine.activityType === futureFilter)
      : myClasses



    let searchedFutureClasses = futureFilteredClasses.filter(aClass =>
      aClass.name
        .toLowerCase()
        .includes(this.state.searchUpcoming.toLowerCase())
    )
    let searchedPastClasses = pastFilteredClasses.filter(aClass =>
      aClass.name
        .toLowerCase()
        .includes(this.state.searchPrevious.toLowerCase())
    )

    let pastClasses = searchedPastClasses.filter(
      aClass => Date.parse(aClass.when) < aDate
    )
    let futureClasses = searchedFutureClasses.filter(
      aClass => Date.parse(aClass.when) > aDate
    )

    let viewPastClasses = [...pastClasses]
    let pastClassesResults = viewPastClasses.length
    let pastClassesPages = Math.ceil(pastClassesResults / numPerPage)
    viewPastClasses = viewPastClasses.slice(
      (pastClassesPage - 1) * numPerPage,
      pastClassesPage * numPerPage
    )

    let viewFutureClasses = [...futureClasses]
    let futureClassesResults = viewFutureClasses.length
    let futureClassesPages = Math.ceil(futureClassesResults / numPerPage)
    viewFutureClasses = viewFutureClasses.slice(
      (futureClassesPage - 1) * numPerPage,
      futureClassesPage * numPerPage
    )

    return (
      <Content>
        <AppHeader />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-evenly'
          }}
        >
          <View>
            <RNPickerSelect
              placeholder={{label: 'Filter', value: null}}
              onValueChange={value => this.handleChange('futureFilter', value)}
              value={futureFilter}
              items={activityTypeSelects}
              userNativeAndroidPickerStyle={false}
            />
          </View>
        </View>
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
                <Input
                  placeholder="Search"
                  autoCorrect={false}
                  value={searchUpcoming}
                  onChangeText={searchUpcoming =>
                    this.setState({searchUpcoming})
                  }
                  style={{
                    backgroundColor: 'lightgray'
                    // width: '50%',
                    // margin: 2
                  }}
                />
                {futureClassesPage > 1 ? (
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
                        futureClassesPage: prevState.futureClassesPage - 1
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
                {futureClassesPage < futureClassesPages ? (
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
                        futureClassesPage: prevState.futureClassesPage + 1
                      }))
                    }
                  >
                    <Text style={{color: 'white', fontSize: 25}}>{'>'}</Text>
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}
              </View>

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
                  <Input
                    placeholder="Search"
                    autoCorrect={false}
                    value={searchPrevious}
                    onChangeText={searchPrevious =>
                      this.setState({searchPrevious})
                    }
                    style={{
                      backgroundColor: 'lightgray'
                      // width: '50%',
                      // margin: 2
                    }}
                  />
                  {pastClassesPage > 1 ? (
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
                          pastClassesPage: prevState.pastClassesPage - 1
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

                  {pastClassesPage < pastClassesPages ? (
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
                          pastClassesPage: prevState.pastClassesPage + 1
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
