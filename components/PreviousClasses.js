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

class PreviousClasses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pastClassesPage: 1,
      numPerPage: 3,
      pastClassesPages: 0,
      pastFilter: null,
      sort: null,
      searchPrevious: '',
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
    const {
      pastClassesPage,
      numPerPage,
      searchPrevious,
      pastFilter,
      sort,
      classId
    } = this.state

    let aDate = Date.parse(new Date().toString())

    const activityTypeSelects = Object.keys(activityTypes).map(activity => ({
      label: `${activityTypes[activity].icon} ${activityTypes[activity].display}`,
      value: activity
    }))

    let pastFilteredClasses = pastFilter
      ? myClasses.filter(aClass => aClass.routine.activityType === pastFilter)
      : myClasses

    let searchedPastClasses = pastFilteredClasses.filter(aClass =>
      aClass.name
        .toLowerCase()
        .includes(this.state.searchPrevious.toLowerCase())
    )

    let pastClasses = searchedPastClasses.filter(
      aClass => Date.parse(aClass.when) < aDate
    )

    let viewPastClasses = [...pastClasses]
    let pastClassesResults = viewPastClasses.length
    let pastClassesPages = Math.ceil(pastClassesResults / numPerPage)
    viewPastClasses = viewPastClasses.slice(
      (pastClassesPage - 1) * numPerPage,
      pastClassesPage * numPerPage
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
                flexDirection: 'row'
              }}
            >
              <Input
                placeholder="Search"
                autoCorrect={false}
                value={searchPrevious}
                onChangeText={searchPrevious => this.setState({searchPrevious})}
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                  fontSize: 14,
                  height: 16,
                  width: '30%',
                  margin: 2
                }}
              />
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
                    this.handleChange('pastFilter', value)
                  }
                  value={pastFilter}
                  items={activityTypeSelects}
                  userNativeAndroidPickerStyle={false}
                />
              </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(PreviousClasses)
