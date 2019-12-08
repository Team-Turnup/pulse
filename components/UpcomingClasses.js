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

import {sorter} from '../screens/ClassesScreen'

class UpcomingClasses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      futureClassesPage: 1,
      numPerPage: 3,
      futureClassesPages: 0,
      futureFilter: null,
      sort: 'liveDateRemoteRecent',
      searchUpcoming: '',
      classId: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getMyClassesThunk()
  }

  handleChange(key, value) {
    this.setState({[key]: value})
  }

  render() {
    const {navigation, myClasses} = this.props
    const sorter = sort => {
      if (sort === 'classNameAZ') {
        return (A, B) => {
          return A.name.toLowerCase() > B.name.toLowerCase()
            ? 1
            : A.name.toLowerCase() < B.name.toLowerCase()
            ? -1
            : 0
        }
      } else if (sort === 'classNameZA') {
        return (A, B) => {
          return A.name.toLowerCase() < B.name.toLowerCase()
            ? 1
            : A.name.toLowerCase() > B.name.toLowerCase()
            ? -1
            : 0
        }
      } else if (sort === 'userAZ') {
        return (A, B) => {
          return A.user.name.toLowerCase() > B.user.name.toLowerCase()
            ? 1
            : A.user.name.toLowerCase() < B.user.name.toLowerCase()
            ? -1
            : 0
        }
      } else if (sort === 'userZA') {
        return (A, B) => {
          return A.user.name.toLowerCase() < B.user.name.toLowerCase()
            ? 1
            : A.user.name.toLowerCase() > B.user.name.toLowerCase()
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
      } else if (sort === 'liveDateRecentRemote') {
        return (A, B) => {
          return new Date(A.when) < new Date(B.when)
            ? 1
            : new Date(A.when) > new Date(B.when)
            ? -1
            : 0
        }
      } else if (sort === 'liveDateRemoteRecent') {
        return (A, B) => {
          return new Date(A.when) > new Date(B.when)
            ? 1
            : new Date(A.when) < new Date(B.when)
            ? -1
            : 0
        }
      }
    }
    const {
      futureClassesPage,
      numPerPage,
      searchUpcoming,
      futureFilter,
      sort,
      classId
    } = this.state

    let aDate = Date.parse(new Date().toString())

    const activityTypeSelects = Object.keys(activityTypes).map(activity => ({
      label: `${activityTypes[activity].icon} ${activityTypes[activity].display}`,
      value: activity
    }))

    let futureFilteredClasses = futureFilter
      ? futureFilter==='instructor' 
      ? myClasses.filter(aClass=> aClass.user.id===this.props.user.id)
      : myClasses.filter(aClass => aClass.routine.activityType === futureFilter)
      : myClasses

    sort ? futureFilteredClasses.sort(sorter(sort)) : {}

    let searchedFutureClasses = futureFilteredClasses.filter(aClass =>
      aClass.name
        .toLowerCase()
        .includes(this.state.searchUpcoming.toLowerCase()) ||
      aClass.user.name
        .toLowerCase()
        .includes(this.state.searchUpcoming.toLowerCase())
    )

    let futureClasses = searchedFutureClasses.filter(
      aClass => Date.parse(aClass.when) > aDate
    )

    let viewFutureClasses = [...futureClasses]

    let futureClassesResults = viewFutureClasses.length
    let futureClassesPages = Math.ceil(futureClassesResults / numPerPage)
    viewFutureClasses = viewFutureClasses.slice(
      (futureClassesPage - 1) * numPerPage,
      futureClassesPage * numPerPage
    )

    return (
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
              alignItems: 'center',
              justifyContent: 'space-between'
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
              <View style={{
                width: 25,
                height: 35}}></View>
            )}
            <View>
              <Text style={{fontWeight: '600'}}>My Upcoming Classes</Text>
              <Text style={{fontSize: 12, textAlign: 'center'}}>
                {viewFutureClasses.length
                  ? `Showing ${Math.min((futureClassesPage - 1) * numPerPage + 1,futureClassesResults)}-${Math.min(
                    futureClassesResults,
                      futureClassesPage * numPerPage
                    )} of ${futureClassesResults}`
                  : ''}
              </Text>
            </View>

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
              <View style={{
                width: 25,
                height: 35}}></View>
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
                value={searchUpcoming}
                onChangeText={searchUpcoming => this.setState({searchUpcoming})}
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
                onValueChange={value =>
                  this.handleChange('futureFilter', value)
                }
                value={futureFilter}
                items={[{label: "I am instructor", value: 'instructor'},...activityTypeSelects]}
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
                  {label: 'Class Name (A>Z)', value: 'classNameAZ'},
                  {label: 'Class Name (Z>A)', value: 'classNameZA'},
                  {label: 'Instructor Name (A>Z)', value: 'userAZ'},
                  {label: 'Instructor Name (Z>A)', value: 'userZA'},
                  {
                    label: 'Live Date (soonest>latest)',
                    value: 'liveDateRemoteRecent'
                  },
                  {
                    label: 'Live Date (latest>soonest)',
                    value: 'liveDateRecentRemote'
                  },
                  {
                    label: 'Duration (low>high)',
                    value: 'durationLowHigh'
                  },
                  {
                    label: 'Duration (high>low)',
                    value: 'durationHighLow'
                  }
                ]}
                userNativeAndroidPickerStyle={false}
              />
            </View>
          </View>
        </View>

        {viewFutureClasses.length ? (
          viewFutureClasses.map((aClass, i) => {
            const duration = aClass.routine.intervals.reduce(
              (sum, interval) => sum + interval.duration,
              0
            )
            let parseDate = aClass.when
              .toString()
              .split('GMT')[0]
              .split('T')
            let parseTime = parseDate[1].split('.')[0]
            parseDate = parseDate[0].split('-')
            parseDate = `${parseDate[1]}/${parseDate[2]}/${parseDate[0].slice(
              2
            )}`
            parseDate = `${parseDate} ${parseTime}`
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
                onPress={async () => {
                  await this.props.getClassThunk(aClass.id)
                  navigation.navigate(
                    aClass.userId === this.props.user.id
                      ? 'TrainerWaitingScreen'
                      : 'UserWaitingScreen'
                  )
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
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
                      {aClass.user.id===this.props.user.id ? 'Me' : aClass.user.name.split(' ')[0]}
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
  setClass
}

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingClasses)
