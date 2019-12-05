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

class ClassesScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      page: 1,
      numPerPage: 4,
      numPages: 0,
      filter: null,
      sort: null,
      search: '',
      routineId: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getClassesThunk()
  }

  handleChange(key, value) {
    this.setState({[key]: value})
  }

  /*
  this.props.classes is an array (empty at mount, filled after)
  this.props.classes is an array of attendees objects which is an array of objects with id (prob user)
  this.props.classes is array .userId is the owner id
  this.props.classes is array .routineId
  this.props.enrollClass
  this.props.getClasses

  */

  render() {
    const sorter = sort => {
      if (sort === 'dateCreated') {
        return (A, B) => {
          return A.createdAt < B.createdAt
            ? 1
            : A.createdAt > B.createdAt
            ? -1
            : 0
        }
      } else if (sort === 'durationHighLow') {
        return (A, B) => {
          Aduration = A.intervals.reduce(
            (sum, interval) => sum + interval.duration,
            0
          )
          Bduration = B.intervals.reduce(
            (sum, interval) => sum + interval.duration,
            0
          )
          return Aduration > Bduration ? -1 : Aduration < Bduration ? 1 : 0
        }
      } else if (sort === 'durationLowHigh') {
        return (A, B) => {
          Aduration = A.intervals.reduce(
            (sum, interval) => sum + interval.duration,
            0
          )
          Bduration = B.intervals.reduce(
            (sum, interval) => sum + interval.duration,
            0
          )
          return Aduration > Bduration ? 1 : Aduration < Bduration ? -1 : 0
        }
      } else if (sort === 'ZA') {
        return (A, B) => {
          return A.name.toLowerCase() > B.name.toLowerCase()
            ? -1
            : A.name.toLowerCase() < B.name.toLowerCase()
            ? 1
            : 0
        }
      } else if (sort === 'AZ') {
        return (A, B) => {
          return A.name.toLowerCase() > B.name.toLowerCase()
            ? 1
            : A.name.toLowerCase() < B.name.toLowerCase()
            ? -1
            : 0
        }
      }
    }

    const {page, numPerPage, search, sort, filter, routineId} = this.state
    const {routines} = this.props
    const activityTypeSelects = Object.keys(activityTypes).map(activity => ({
      label: `${activityTypes[activity].icon} ${activityTypes[activity].display}`,
      value: activity
    }))
    let viewRoutines = [...this.props.routines]
    viewRoutines = search.length
      ? viewRoutines.filter(routine =>
          routine.name.toLowerCase().includes(search.toLowerCase())
        )
      : viewRoutines
    viewRoutines = filter
      ? viewRoutines.filter(routine => routine.activityType === filter)
      : viewRoutines
    sort ? viewRoutines.sort(sorter(sort)) : {}
    const numResults = viewRoutines.length
    const numPages = Math.ceil(numResults / numPerPage)
    viewRoutines = viewRoutines.slice(
      (page - 1) * numPerPage,
      page * numPerPage
    )
    return (
      <Container>
        <Content>
          <AppHeader navigation={this.props.navigation} />
          <Text
            style={{
              paddingTop: 15,
              textAlign: 'center',
              fontWeight: '600',
              fontSize: 20,
              color: 'rgb(84, 130, 53)'
            }}
          >
            Start New Solo Workout
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
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
                  <Text style={{fontWeight: '600', marginBottom: 10}}>
                    Select One of Your Previous Routines
                  </Text>
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
                        onValueChange={value =>
                          this.handleChange('sort', value)
                        }
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
                  <Text style={{fontSize: 12, textAlign: 'center'}}>
                    {viewRoutines.length
                      ? `Showing ${(page - 1) * numPerPage + 1}-${Math.min(
                          numResults,
                          page * numPerPage
                        )} of ${numResults}`
                      : ''}
                  </Text>
                  {viewRoutines.length ? (
                    viewRoutines.map((routine, i) => {
                      const duration = routine.intervals.reduce(
                        (sum, interval) => sum + interval.duration,
                        0
                      )
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
                                routineId:
                                  prevState.routineId === routine.id
                                    ? null
                                    : routine.id
                              }))
                            }
                          >
                            <Text style={{textAlign: 'center'}}>
                              Name:{' '}
                              <Text
                                style={{
                                  color: 'rgb(84, 130, 53)',
                                  fontWeight: '600',
                                  fontSize: 18
                                }}
                              >
                                {routine.name}
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
                                Activity:{' '}
                                <Text
                                  style={{
                                    color: 'rgb(84, 130, 53)',
                                    fontStyle: 'italic'
                                  }}
                                >
                                  {activityTypes[routine.activityType].icon}
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
                              routine={routine.intervals}
                              totalDuration={duration}
                              activityType={routine.activityType}
                            />
                          </TouchableOpacity>
                          {routineId === routine.id ? (
                            <View
                              style={{display: 'flex', flexDirection: 'row'}}
                            >
                              <Button
                                onPress={() => {
                                  this.props.setRoutine(
                                    routines.find(
                                      routine => routine.id === routineId
                                    )
                                  )
                                  this.props.navigation.navigate(
                                    'StartRoutineScreen'
                                  )
                                }}
                                style={{
                                  ...styles.button,
                                  width: '47%',
                                  marginLeft: 5,
                                  marginRight: 5
                                }}
                              >
                                <Text>Start Workout</Text>
                              </Button>
                              <Button
                                onPress={() => {
                                  this.props.setRoutine(
                                    routines.find(
                                      routine => routine.id === routineId
                                    )
                                  )
                                  this.props.navigation.navigate(
                                    'BuildRoutineScreen'
                                  )
                                }}
                                style={{
                                  ...styles.button,
                                  width: '47%',
                                  marginLeft: 5,
                                  marginRight: 5
                                }}
                              >
                                <Text>Edit Routine</Text>
                              </Button>
                            </View>
                          ) : null}
                        </View>
                      )
                    })
                  ) : (
                    <Text>- No routines</Text>
                  )}
                </ScrollView>
              </Card>
            </Content>
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
          <Text
            style={{textAlign: 'center', fontStyle: 'italic', fontSize: 13}}
          >
            or
          </Text>
          <Button
            style={styles.button}
            onPress={() => {
              this.props.setRoutine({})
              this.props.navigation.navigate('BuildRoutineScreen')
            }}
          >
            <Text>Create New Routine</Text>
          </Button>
          {/* <Text
          style={{textAlign: 'center', fontStyle: 'italic', fontSize: 13}}
        >
          or
        </Text>
        <Button
          onPress={() => this.props.navigation.navigate('PreviousRoutine')}
          style={styles.button}
        >
          <Text>Search Public Routines</Text>
        </Button> */}
        </Content>
      </Container>
    )
  }
}

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

const mapStateToProps = state => ({
  classes: state.classes,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  enrollClass: (classId, studentId) =>
    dispatch(enrollClass(classId, studentId)),
  getClassesThunk: () => dispatch(getClassesThunk())
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
