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
import {getClassThunk, setClass} from '../store/singleClass'
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
      pastFilter: null,
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
      ? myClasses.filter(aClass => aClass.routine.activityType === pastFilter)
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
          <View></View>
        </View>
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

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column'
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
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row'
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
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                      fontSize: 14,
                      height: 16,
                      width: '30%',
                      margin: 2
                    }}
                  />
                  <RNPickerSelect
                    placeholder={{label: 'Filter', value: null}}
                    onValueChange={value =>
                      this.handleChange('futureFilter', value)
                    }
                    value={futureFilter}
                    items={activityTypeSelects}
                    userNativeAndroidPickerStyle={false}
                  />
                </View>
              </View>

              {viewFutureClasses.length ? (
                viewFutureClasses.map((aClass, i) => {
                  const duration = aClass.routine.intervals.reduce(
                    (sum, interval) => sum + interval.duration,
                    0
                  )
                  let parseDate = aClass.when.toString().split('GMT')[0].split('T')
                  let parseTime = parseDate[1].split('.')[0]
                  parseDate=parseDate[0].split('-')
                  parseDate=`${parseDate[2]}/${parseDate[1]}/${parseDate[0].slice(2)}`
                  parseDate=`${parseDate} ${parseTime}`
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
                      onPress={ async () => {
                        await this.props.getClassThunk(aClass.id)
                         this.props.navigation.navigate(aClass.userId===this.props.user.id ? 'TrainerWaitingScreen' : 'UserWaitingScreen')
                      }}
                    >
                      <View style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between'}}>
                      <Text>
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
                      <View style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between'}}>
                        <Text>
                          Date:{' '}
                          <Text
                            style={{
                              color: 'rgb(84, 130, 53)',
                              fontStyle: 'italic'
                            }}
                          >
                            {parseDate}
                          </Text>
                        </Text>
                        <Text>
                          Duration:{' '}
                          <Text
                            style={{
                              color: 'rgb(84, 130, 53)',
                              fontStyle: 'italic'
                            }}
                          >
                             {Math.floor(duration / 60)
                                  ? `${Math.floor(duration / 60)}m`
                                  : ''}{' '}
                                {duration % 60 ? `${duration % 60}s` : ''}
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
                <View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-evenly'
                    }}
                  >
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
                        <Text style={{color: 'white', fontSize: 25}}>
                          {'<'}
                        </Text>
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
                        <Text style={{color: 'white', fontSize: 25}}>
                          {'>'}
                        </Text>
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
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row'
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
                        borderBottomColor: 'gray',
                        borderBottomWidth: 1,
                        fontSize: 14,
                        height: 16,
                        width: '30%',
                        margin: 2
                      }}
                    />
                    <RNPickerSelect
                      placeholder={{label: 'Filter', value: null}}
                      onValueChange={value =>
                        this.handleChange('pastFilter', value)
                      }
                      value={pastFilter}
                      items={activityTypeSelects}
                      userNativeAndroidPickerStyle={false}
                    />
                  </View>
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
            onPress={() => navigation.navigate('ClassesScreen')}
          >
            <Text>Enroll in Class</Text>
          </Button>

          <Button
            style={styles.button}
            onPress={() => {
              this.props.setClass({})
              this.props.navigation.navigate('BuildClassScreen')
            }}
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

const mapStateToProps = ({user, workouts, myClasses, routine}) => ({
  user,
  workouts,
  myClasses,
  routine
})

const mapDispatchToProps = {
  getMyClassesThunk,
  getMyWorkoutsThunk,
  getClassThunk,
  setClass,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeClassesScreen)
