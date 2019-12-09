import React, {useEffect, useState} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'
import {
  Container,
  Text,
  Content,
  Card,
  CardItem,
  List,
  ListItem
} from 'native-base'
import WorkoutGraph from './WorkoutGraph'
import {useSelector, useDispatch} from 'react-redux'
import RoutineBarGraphic from '../components/RoutineBarGraphic'
import activityTypes from '../assets/images/activityTypes'
import {DateTime} from 'luxon'
import userData from '../assets/images/userData'
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
  const {intervals, routine} = useSelector(
    ({routine: {intervals, ...routine}}) => ({
      intervals,
      routine
    })
  )

  const [selectedUser, setSelectedUser] = useState(-1)

  const totalTime =
    (intervals &&
      intervals.reduce((sum, interval) => sum + interval.duration, 0)) ||
    0

  const handlePress = id => {
    if (id === selectedUser) setSelectedUser(-1)
    else setSelectedUser(id)
  }

  console.log(
    userTimestamps && selectedUser ? userTimestamps[selectedUser] : 'all data'
  )
  return (
    <Container>
      <AppHeader navigation={navigation} hideNotification={false} />

      {_class && routine ? (
        <ScrollView
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
            <Text style={{textAlign: 'center'}}>
              Routine Length:
              <Text style={{color: 'rgb(84, 130, 53)', fontWeight: '600'}}>
                {Math.floor(workoutTime / 60)
                  ? `${Math.floor(workoutTime / 60)}m`
                  : ''}
                {workoutTime % 60 ? `${workoutTime % 60}s` : ''}{' '}
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
            <List>
              <ListItem itemHeader style={styles.listItem}>
                <Text style={[styles.name, styles.listHeader]}>Name</Text>
                <Text style={[styles.age, styles.listHeader]}>Age</Text>
                <Text style={[styles.gender, styles.listHeader]}>Gender</Text>
              </ListItem>
              {attendees && attendees.length && userOpacities
                ? attendees.map(
                    ({id: userId, name, age, gender, ready = false}) => (
                      <ListItem
                        key={userId}
                        button
                        onPress={() => handlePress(userId)}
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
        </ScrollView>
      ) : (
        <Text>Loading</Text>
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  visual: {
    width: '100%',
    height: 200
  },
  col: {
    width: '50%',
    height: 50,
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    width: '100%',
    height: '100%'
  },
  info: {
    width: '100%',
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listHeader: {
    fontWeight: 'bold'
  },
  name: {flex: 5, textAlign: 'left'},
  age: {flex: 1, textAlign: 'center'},
  gender: {flex: 2, textAlign: 'right'},
  selected: {
    backgroundColor: 'rgba(0,255,0,0.25)'
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    color: 'rgb(84, 130, 53)',
    lineHeight: 30
  },
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
