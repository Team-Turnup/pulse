import React from 'react'
import {connect} from 'react-redux'
import {View, StyleSheet, ScrollView} from 'react-native'
import {
  Container,
  Button,
  Text,
  Header,
  Title,
  Content,
  Card,
  CardItem,
  List,
  ListItem,
  Form,
  Input,
  Item,
  Label
} from 'native-base'
import {enrollClass} from '../store/singleClass'
import {getClassesThunk} from '../store/classes'
import {SocketContext} from '../socket'
import activityTypes from '../assets/images/activityTypes'
import AppHeader from '../components/AppHeader'
import RoutineBarMini from '../components/RoutineBarMini'
import {TouchableOpacity} from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select'
import {setClass} from '../store/singleClass'

class ClassesScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      page: 1,
      numPerPage: 4,
      numPages: 0,
      filter: null,
      sort: 'liveDateRemoteRecent',
      search: '',
      classId: null,
      classPasscode: '',
      passcodeMessage: 'passcode'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getClassesThunk()
  }

  handleChange(key, value) {
    this.setState({[key]: value})
  }

  render() {
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

    const {page, numPerPage, search, sort, filter, classId} = this.state
    const {classes} = this.props
    const activityTypeSelects = Object.keys(activityTypes).map(activity => ({
      label: `${activityTypes[activity].icon} ${activityTypes[activity].display}`,
      value: activity
    }))

    let viewClasss = [...this.props.classes]
    viewClasss = search.length
      ? viewClasss.filter(
          aClass =>
            aClass.name.toLowerCase().includes(search.toLowerCase()) ||
            aClass.user.name.toLowerCase().includes(search.toLowerCase())
        )
      : viewClasss
    viewClasss = filter
      ? filter === 'instructor'
        ? viewClasss.filter(aClass => aClass.user.id === this.props.user.id)
        : viewClasss.filter(aClass => aClass.activityType === futureFilter)
      : viewClasss

    sort ? viewClasss.sort(sorter(sort)) : {}
    const numResults = viewClasss.length
    const numPages = Math.ceil(numResults / numPerPage)
    viewClasss = viewClasss.slice((page - 1) * numPerPage, page * numPerPage)
    return (
      <Container>
        <Content>
          <AppHeader
            navigation={this.props.navigation}
            hideNotification={false}
          />
          <Text
            style={{
              paddingTop: 15,
              textAlign: 'center',
              fontWeight: '600',
              fontSize: 20,
              color: 'rgb(84, 130, 53)'
            }}
          >
            Enroll in a Class
          </Text>
          <Content style={{marginTop: 0, marginBottom: 5}}>
            <Card
              style={{
                borderRadius: 10,
                overflow: 'hidden',
                padding: 15,
                margin: 15,
                height: 435
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
                    <Text style={{fontWeight: '600'}}>
                      Select a Class to Enroll in
                    </Text>
                    <Text style={{fontSize: 12, textAlign: 'center'}}>
                      {viewClasss.length
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
                      onValueChange={value =>
                        this.handleChange('filter', value)
                      }
                      value={filter}
                      items={[
                        {label: 'I am instructor', value: 'instructor'},
                        ...activityTypeSelects
                      ]}
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
                          label: 'Live Date (past>future)',
                          value: 'liveDateRemoteRecent'
                        },
                        {
                          label: 'Live Date (future>past)',
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

                {viewClasss.length ? (
                  viewClasss.map((aClass, i) => {
                    const duration = aClass.routine.intervals
                      ? aClass.routine.intervals.reduce(
                          (sum, interval) => sum + interval.duration,
                          0
                        )
                      : 0
                    let parseDate = aClass.when
                      .toString()
                      .split('GMT')[0]
                      .split('T')
                    let parseTime = parseDate[1].split('.')[0]
                    parseDate = parseDate[0].split('-')
                    parseDate = `${parseDate[2]}/${
                      parseDate[1]
                    }/${parseDate[0].slice(2)}`
                    parseDate = `${parseDate} ${parseTime}`
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
                          onPress={() =>
                            this.setState(prevState => ({
                              classPasscode: '',
                              passcodeMessage: 'passcode',
                              classId:
                                prevState.classId === aClass.id
                                  ? null
                                  : aClass.id
                            }))
                          }
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
                                {
                                  activityTypes[aClass.routine.activityType]
                                    .icon
                                }
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
                                {aClass.user.id === this.props.user.id
                                  ? 'Me'
                                  : aClass.user.name.split(' ')[0]}
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
                          {aClass.routine.intervals ? (
                            <RoutineBarMini
                              routine={aClass.routine.intervals}
                              totalDuration={duration}
                              activityType={aClass.routine.activityType}
                            />
                          ) : null}
                        </TouchableOpacity>
                        {classId === aClass.id ? (
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <Button
                              onPress={async () => {
                                // this.props.setClass(
                                //   classes.find(
                                //     aClass => aClass.id === classId
                                //   )
                                // )
                                if (
                                  aClass.classPasscode.length &&
                                  aClass.classPasscode !==
                                    this.state.classPasscode
                                ) {
                                  this.setState({
                                    classPasscode: '',
                                    passcodeMessage: 'incorrect'
                                  })
                                  return
                                }
                                await this.props.enrollClass(aClass.id)
                                console.log('classId', aClass.id)
                                this.props.socket.emit(
                                  'joined',
                                  aClass.id,
                                  this.props.user
                                )
                                this.props.navigation.navigate(
                                  new Date(aClass.when) - new Date() <
                                    10 * 60 * 1000
                                    ? 'UserWaitingScreen'
                                    : 'HomeClassesScreen'
                                )
                              }}
                              style={{
                                ...styles.button,
                                width: '47%',
                                marginLeft: 5,
                                marginRight: 5
                              }}
                            >
                              <Text>Join Class</Text>
                            </Button>
                            {aClass.classPasscode.length ? (
                              <View style={{width: '30%', margin: 2}}>
                                <Input
                                  placeholder={this.state.passcodeMessage}
                                  autoCapitalize="none"
                                  autoCorrect={false}
                                  value={this.state.classPasscode}
                                  onChangeText={classPasscode =>
                                    this.setState({classPasscode})
                                  }
                                  style={{
                                    borderBottomColor: 'gray',
                                    borderBottomWidth: 1,
                                    fontSize: 14,
                                    height: 16
                                  }}
                                />
                              </View>
                            ) : null}
                          </View>
                        ) : null}
                      </View>
                    )
                  })
                ) : (
                  <Text>- No classes</Text>
                )}
              </ScrollView>
            </Card>
          </Content>
        </Content>
      </Container>
    )
  }
}

// //below is the original join or enroll classes render
//   render() {
//     const {classes, user} = this.props
//     let allClasses = classes.filter(aClass =>
//       aClass.name.toLowerCase().includes(this.state.search.toLowerCase())
//     )
//     return (
//       <Container>
//         <Content style={{backgroundColor: 'midnightblue'}}>
//           <Form style={{backgroundColor: 'pink'}}>
//             <Item floatingLabel>
//               <Label>Search Classes</Label>
//               <Input
//                 autoCapitalize="none"
//                 name="search"
//                 value={this.state.search}
//                 onChangeText={this.handleChange}
//               />
//             </Item>
//           </Form>
//           <Card>
//             <CardItem>
//               <Title>Classes</Title>
//             </CardItem>
//             <Card>
//               {allClasses.map((aClass, i) => {
//                 return (
//                   <CardItem
//                     onPress={async () => {
//                       this.props.socket.emit('joined', aClass.id, user)
//                       await this.props.enrollClass(aClass.id, user.id),
//                         this.props.navigation.navigate('UserWaitingScreen')
//                     }}
//                     button
//                     key={i}
//                   >
//                     <Text header>
//                       {i + 1}. {aClass.name}
//                     </Text>
//                   </CardItem>
//                 )
//               })}
//             </Card>
//           </Card>
//         </Content>
//       </Container>
//     )
//   }
// }

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

const mapStateToProps = state => ({
  classes: state.classes,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  enrollClass: (classId, studentId) =>
    dispatch(enrollClass(classId, studentId)),
  getClassesThunk: () => dispatch(getClassesThunk())
  //setClass: () => dispatch(setClass())
})

const SocketConnectedClassesScreen = props => (
  <SocketContext.Consumer>
    {socket => <ClassesScreen {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketConnectedClassesScreen)
