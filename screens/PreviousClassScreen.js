import React, {useEffect, useState} from 'react'
import {View, StyleSheet} from 'react-native'
import {Container, Text, Content, Card, CardItem} from 'native-base'
import WorkoutGraph from './WorkoutGraph'
import {useSelector, useDispatch} from 'react-redux'
import RoutineBarGraphic from '../components/RoutineBarGraphic'
import activityTypes from '../assets/images/activityTypes'
import {DateTime} from 'luxon'
import AppHeader from '../components/AppHeader'

const generateWorkoutData = (userTimestamps = {}) => {
  // currently aggregates all workout data as a single array of data, potentially
  // change this so that it is some kind of binned average?
  let workoutData = []
  for (let timestamps of Object.values(userTimestamps))
    workoutData.push(...timestamps)
  return workoutData
}

export default ({navigation}) => {
  //   const dispatch = useDispatch()
  const {
    attendees = [],
    when,
    name: className,
    userOpacities = {},
    userTimestamps = {},
    userLatest = {},
    workoutTime,
    ..._class
  } = useSelector(({singleClass}) => singleClass)
  const {intervals, routine} = useSelector(({routine}) => ({
    intervals,
    ...routine
  }))

  const [selectedUser, setSelectedUser] = useState(-1)

  const totalTime =
    (intervals &&
      intervals.reduce((sum, interval) => sum + interval.duration, 0)) ||
    0

  const handlePress = id => {
    if (id === selectedUser) setSelectedUser(-1)
    else setSelectedUser(id)
  }

  return (
    <Container>
      <AppHeader navigation={navigation} hideNotification={false} />
      <View
        style={{
          padding: 20,
          // backgroundColor: this.hexToRgb(
          //   this.props.option.visualColor,
          //   this.state.opacity
          // ),
          width: '100%',
          height: '70%'
        }}
      >
        {_class && routine ? (
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: '100%',
              borderRadius: 10,
              opacity: 1
            }}
          >
            <View>
              <Text style={{textAlign: 'center'}}>
                Class {className ? className : ''} On:{' '}
                <Text style={{color: 'rgb(84, 130, 53)', fontWeight: '600'}}>
                  {DateTime.fromMillis(Date.parse(when)).toLocaleString(
                    DateTime.DATE_SHORT
                  )}
                </Text>
              </Text>
              <Text style={{textAlign: 'center'}}>
                Routine Name:{' '}
                <Text style={{color: 'rgb(84, 130, 53)', fontWeight: '600'}}>
                  {routine ? routine.name : ''}
                </Text>
              </Text>
              <Text style={{textAlign: 'center'}}>
                Activity Type:{' '}
                <Text style={{color: 'rgb(84, 130, 53)', fontWeight: '600'}}>
                  {routine && routine.activityType !== 'combo'
                    ? activityTypes[routine.activityType].icon
                    : 'Combo'}
                </Text>
              </Text>
            </View>
            <RoutineBarGraphic
              routine={intervals}
              changeIndex={() => {}}
              removeInterval={() => {}}
              finished={true}
              routineType={routine.activityType}
            />
            <View>
              <View style={styles.info}>
                <View style={styles.col}>
                  <Card transparent style={styles.card}>
                    <Text style={{fontSize: 12}}>Routine Length:</Text>
                    <Text style={{color: 'rgb(84, 130, 53)'}}>
                      {Math.floor(workoutTime / 60)
                        ? `${Math.floor(workoutTime / 60)}m`
                        : ''}{' '}
                      {Math.floor(workoutTime % 60)
                        ? `${Math.floor(workoutTime % 60)}s`
                        : ''}{' '}
                    </Text>
                    <Text style={{color: 'rgb(84, 130, 53)'}}>
                      <Text style={{color: 'black'}}>/</Text>{' '}
                      {Math.floor(totalTime / 60)
                        ? `${Math.floor(totalTime / 60)}m`
                        : ''}
                      {totalTime % 60 ? `${totalTime % 60}s` : ''}{' '}
                      <Text style={{color: 'black', fontStyle: 'italic'}}>
                        total
                      </Text>
                    </Text>
                  </Card>
                </View>
                <View>
                  <List>
                    <ListItem itemHeader style={styles.listItem}>
                      <Text style={[styles.name, styles.listHeader]}>Name</Text>
                      <Text style={[styles.age, styles.listHeader]}>Age</Text>
                      <Text style={[styles.gender, styles.listHeader]}>
                        Gender
                      </Text>
                    </ListItem>
                    {attendees && attendees.length && userOpacities
                      ? attendees.map(
                          ({id: userId, name, age, gender, ready = false}) => (
                            <ListItem
                              key={userId}
                              button
                              onPress={userId => handlePress(userId)}
                              style={styles.listItem}
                            >
                              <Text style={styles.name}>{name} </Text>
                              <Text style={styles.age}>{age}</Text>
                              <Text style={styles.gender}>
                                {userData[gender].icon}
                              </Text>
                            </ListItem>
                          )
                        )
                      : null}
                  </List>
                </View>
                <WorkoutGraph
                  workoutHistory={true}
                  intervals={intervals}
                  workoutData={
                    selectedUser > 0
                      ? userTimestamps[selectedUser]
                      : generateWorkoutData(userTimestamps)
                  }
                  totalTimeElapsed={workoutTime}
                />
              </View>
            </View>
          </View>
        ) : (
          <Text>Loading</Text>
        )}
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 5,
    height: 30,
    width: '30%',
    backgroundColor: 'rgb(84, 130, 53)'
  },
  col: {
    width: '50%',
    height: 80,
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    margin: 0,
    padding: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    width: '100%',
    height: 75,
    display: 'flex',
    flexDirection: 'row'
  }
})
