import React from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Label, ScrollView} from 'react-native'
import activityTypes from '../assets/images/activityTypes'
import {
  Container,
  Button,
  Text,
  Header,
  Title,
  Content,
  Card,
  CardItem,
  Input
} from 'native-base'
import AppHeader from '../components/AppHeader'
import {getMyWorkoutsThunk} from '../store/workouts'
import RoutineBarMini from '../components/RoutineBarMini'
import {TouchableOpacity} from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select'
import {fetchWorkoutThunk} from '../store/workout'

//this.props.workouts is an array of objects, each object has a workout

class MyPreviousWorkouts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      numPerPage: 4,
      numPages: 0,
      filter: null,
      sort: null,
      search: '',
      workoutId: null
      //showAll: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getMyWorkoutsThunk()
  }

  handleChange(key, value) {
    this.setState({[key]: value})
  }

  render() {
    const sorter = sort => {
      if (sort === 'dateCreated') {
        return (A, B) => {
          return A.routine.createdAt < B.routine.createdAt
            ? 1
            : A.routine.createdAt > B.routine.createdAt
            ? -1
            : 0
        }
      } else if (sort === 'durationHighLow') {
        return (A, B) => {
          Aduration = A.routine.intervals.reduce(
            (sum, interval) => sum + interval.duration,
            0
          )
          Bduration = B.routine.intervals.reduce(
            (sum, interval) => sum + interval.duration,
            0
          )
          return Aduration > Bduration ? -1 : Aduration < Bduration ? 1 : 0
        }
      } else if (sort === 'durationLowHigh') {
        return (A, B) => {
          Aduration = A.routine.intervals.reduce(
            (sum, interval) => sum + interval.duration,
            0
          )
          Bduration = B.routine.intervals.reduce(
            (sum, interval) => sum + interval.duration,
            0
          )
          return Aduration > Bduration ? 1 : Aduration < Bduration ? -1 : 0
        }
      } else if (sort === 'ZA') {
        return (A, B) => {
          return A.routine.name.toLowerCase() > B.routine.name.toLowerCase()
            ? -1
            : A.routine.name.toLowerCase() < B.routine.name.toLowerCase()
            ? 1
            : 0
        }
      } else if (sort === 'AZ') {
        return (A, B) => {
          return A.routine.name.toLowerCase() > B.routine.name.toLowerCase()
            ? 1
            : A.routine.name.toLowerCase() < B.routine.name.toLowerCase()
            ? -1
            : 0
        }
      }
    }

    const {page, numPerPage, search, sort, filter, workoutId} = this.state
    const {workouts} = this.props
    const activityTypeSelects = Object.keys(activityTypes).map(activity => ({
      label: `${activityTypes[activity].icon} ${activityTypes[activity].display}`,
      value: activity
    }))
    let viewWorkouts = [...this.props.workouts]
    viewWorkouts = search.length
      ? viewWorkouts.filter(workout =>
          workout.routine.name.toLowerCase().includes(search.toLowerCase())
        )
      : viewWorkouts
    viewWorkouts = filter
      ? viewWorkouts.filter(workout => workout.routine.activityType === filter)
      : viewWorkouts
    sort ? viewWorkouts.sort(sorter(sort)) : {}
    const numResults = viewWorkouts.length
    const numPages = Math.ceil(numResults / numPerPage)
    viewWorkouts = viewWorkouts.slice(
      (page - 1) * numPerPage,
      page * numPerPage
    )
    return (
      <Container
        style={{
          height: 415
        }}
      >
        <Content style={{marginTop: 0, marginBottom: 5}}>
          <Card
            style={{
              borderRadius: 10,
              overflow: 'hidden',
              padding: 15,
              margin: 15,
              height: 650
              //height: 405 for iOS
            }}
          >
            <ScrollView>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
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
                      this.setState(prevState => ({page: prevState.page - 1}))
                    }
                  >
                    <Text style={{color: 'white', fontSize: 25}}>{'<'}</Text>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={{
                      width: 25,
                      height: 35
                    }}
                  ></View>
                )}
                <View>
                  <Text style={{fontWeight: '600'}}>My Previous Workouts</Text>
                  <Text style={{fontSize: 12, textAlign: 'center'}}>
                    {viewWorkouts.length
                      ? `Showing ${Math.min(
                          (page - 1) * numPerPage + 1,
                          numResults
                        )}-${Math.min(
                          numResults,
                          page * numPerPage
                        )} of ${numResults}`
                      : ''}
                  </Text>
                </View>
                {page < numPages ? (
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
                      this.setState(prevState => ({page: prevState.page + 1}))
                    }
                  >
                    <Text style={{color: 'white', fontSize: 25}}>{'>'}</Text>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={{
                      width: 25,
                      height: 35
                    }}
                  ></View>
                )}
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <View style={{width: '30%', margin: 2}}>
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
                </View>
                <View
                  style={{
                    width: '30%',
                    margin: 2,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 5
                  }}
                >
                  <RNPickerSelect
                    placeholder={{label: 'Filter', value: null}}
                    onValueChange={value => this.handleChange('filter', value)}
                    value={filter}
                    items={activityTypeSelects}
                    userNativeAndroidPickerStyle={false}
                  />
                </View>
                <View
                  style={{
                    width: '30%',
                    margin: 2,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 5
                  }}
                >
                  <RNPickerSelect
                    placeholder={{label: 'Sort', value: null}}
                    onValueChange={value => this.handleChange('sort', value)}
                    value={sort}
                    items={[
                      {label: 'Date created', value: 'dateCreated'},
                      {
                        label: 'Duration (low>high)',
                        value: 'durationLowHigh'
                      },
                      {
                        label: 'Duration (high>low)',
                        value: 'durationHighLow'
                      },
                      {label: 'Name (A>Z)', value: 'AZ'},
                      {label: 'Name (Z>A)', value: 'ZA'}
                      // {label:'Most used', value:'mostUsed'}
                    ]}
                    userNativeAndroidPickerStyle={false}
                  />
                </View>
              </View>
              {viewWorkouts.length ? (
                viewWorkouts.map((workout, i) => {
                  const duration = workout.routine.intervals
                    ? workout.routine.intervals.reduce(
                        (sum, interval) => sum + interval.duration,
                        0
                      )
                    : 0
                  return (
                    <View key={i}>
                      <TouchableOpacity
                        style={{
                          marginTop: 5,
                          marginBottom: 5,
                          borderColor: 'gray',
                          borderWidth: 1,
                          borderRadius: 10,
                          overflow: 'hidden'
                        }}
                        onPress={() => this.props.selectWorkout(workout.id)}
                      >
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Text
                          //style={{width: 100}}
                          >
                            Name:{' '}
                            <Text
                              style={{
                                color: 'rgb(84, 130, 53)',
                                fontWeight: '600',
                                fontSize: 18
                              }}
                            >
                              {workout.routine.name}
                            </Text>
                          </Text>
                          <Text>
                            Date:{' '}
                            <Text
                              style={{
                                color: 'rgb(84, 130, 53)',
                                fontStyle: 'italic'
                              }}
                            >
                              {workout.timestamp.split('T')[0]}
                            </Text>
                          </Text>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Text>
                            Activity:{' '}
                            <Text
                              style={{
                                color: 'rgb(84, 130, 53)',
                                fontStyle: 'italic'
                              }}
                            >
                              {activityTypes[workout.routine.activityType].icon}
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
                        {workout.routine.intervals ? (
                          <RoutineBarMini
                            routine={workout.routine.intervals}
                            totalDuration={duration}
                            activityType={workout.routine.activityType}
                          />
                        ) : null}
                      </TouchableOpacity>
                    </View>
                  )
                })
              ) : (
                <Text>- No previous workouts</Text>
              )}
            </ScrollView>
          </Card>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 15,
    marginRight: 15,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgb(84, 130, 53)'
  }
})

const mapStateToProps = ({workouts}) => ({workouts})
const mapDispatchToProps = {getMyWorkoutsThunk, fetchWorkoutThunk}

export default connect(mapStateToProps, mapDispatchToProps)(MyPreviousWorkouts)
