import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View} from 'react-native'
import {Container, Content, Button, Text, Card} from 'native-base'
import AppHeader from '../components/AppHeader'
import {getMyRoutinesThunk} from '../store/routines'
import activityTypes from '../assets/images/activityTypes'
import RoutineBarMini from '../components/RoutineBarMini'
import {TouchableOpacity} from 'react-native-gesture-handler'

class SelectRoutineScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      numPerPage: 4,
      filter: null,
      sort: null,
      search: ''
    }
  }

  componentDidMount() {
    this.props.getMyRoutinesThunk()
  }

  render() {
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
              onPress={()=>this.setState(prevState=>({page: prevState.page-1}))}
            >
              <Text style={{color: 'white', fontSize: 25}}>{'<'}</Text>
            </TouchableOpacity>
            <Content style={{marginTop: 15, marginBottom: 15}}>
              <Card
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  padding: 15,
                  margin: 15
                }}
              >
                <Text style={{fontWeight: '600', marginBottom: 10}}>
                  Select One of Your Previous Routines
                </Text>
                {this.props.routines.length ? (
                  this.props.routines.map((routine, i) => {
                    const duration = routine.intervals.reduce(
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
                    )
                  })
                ) : (
                  <Text>- No upcoming classes</Text>
                )}
              </Card>
            </Content>
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
              onPress={()=>this.setState(prevState=>({page: prevState.page+1}))}
            >
              <Text style={{color: 'white', fontSize: 25}}>{'>'}</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{textAlign: 'center', fontStyle: 'italic', fontSize: 13}}
          >
            or
          </Text>
          <Button
            style={styles.button}
            onPress={() => this.props.navigation.navigate('BuildRoutineScreen')}
          >
            <Text>Create New Routine</Text>
          </Button>
          <Text
            style={{textAlign: 'center', fontStyle: 'italic', fontSize: 13}}
          >
            or
          </Text>
          <Button
            onPress={() => this.props.navigation.navigate('PreviousRoutine')}
            style={styles.button}
          >
            <Text>Search Public Routines</Text>
          </Button>
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

const mapStateToProps = ({routines}) => ({routines})
const mapDispatchToProps = {getMyRoutinesThunk}

export default connect(mapStateToProps, mapDispatchToProps)(SelectRoutineScreen)
