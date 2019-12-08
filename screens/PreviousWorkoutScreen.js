import React, {useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {Container, Text, Content, Card, CardItem} from 'native-base'
import WorkoutGraph from './WorkoutGraph'
import {useSelector, useDispatch} from 'react-redux'
import {removeWorkout} from '../store/workout'
import RoutineBarGraphic from '../components/RoutineBarGraphic'
import activityTypes from '../assets/images/activityTypes'
import {DateTime} from 'luxon'
import AppHeader from '../components/AppHeader'

export default ({navigation}) => {
  const dispatch = useDispatch()
  const {
    workout: {
      id = null,
      timestamp: startTime = null,
      workoutTimestamps = [],
      class: _class,
      currentStepCount = 0
    },
    routine: {name: routineName = null, activityType = null, intervals = []}
  } = useSelector(({workout, routine}) => ({workout, routine}))
  const totalTime =
    (intervals &&
      intervals.reduce((sum, interval) => sum + interval.duration, 0)) ||
    0
  const className = (_class && _class.name) || null

  const workoutTime = workoutTimestamps[workoutTimestamps.length-1].timestamp/1000

  useEffect(() => () => dispatch(removeWorkout(id)), [])
  return (
    <Container>
      <AppHeader navigation={navigation} />
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
              Workout Performed on:{' '}
              <Text style={{color: 'rgb(84, 130, 53)', fontWeight: '600'}}>
                {DateTime.fromJSDate(new Date(startTime)).toLocaleString(
                  DateTime.DATE_SHORT
                )}
              </Text>
            </Text>
            {!className ? null : (
              <Text style={{textAlign: 'center'}}>
                As a part of the class{' '}
                <Text style={{color: 'rgb(84, 130, 53)', fontWeight: '600'}}>
                  {className}
                </Text>
              </Text>
            )}
            <Text style={{textAlign: 'center'}}>
              Routine Name:{' '}
              <Text style={{color: 'rgb(84, 130, 53)', fontWeight: '600'}}>
                {routineName}
              </Text>
            </Text>
            <Text style={{textAlign: 'center'}}>
              Activity Type:{' '}
              <Text style={{color: 'rgb(84, 130, 53)', fontWeight: '600'}}>
                {activityType !== 'combo'
                  ? activityTypes[activityType].icon
                  : 'Combo'}
              </Text>
            </Text>
          </View>
          <RoutineBarGraphic
            routine={intervals}
            changeIndex={() => {}}
            removeInterval={() => {}}
            finished={true}
            routineType={activityType}
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
                    {Math.floor(workoutTime % 60) ? `${Math.floor(workoutTime % 60)}s` : ''} </Text>
                  <Text style={{color: 'rgb(84, 130, 53)'}}><Text style={{color:'black'}}>/</Text> {Math.floor(totalTime / 60)
                      ? `${Math.floor(totalTime / 60)}m`
                      : ''}
                    {totalTime % 60 ? `${totalTime % 60}s` : ''} <Text style={{color:'black', fontStyle:'italic'}}>total</Text>
                  </Text>
                </Card>
              </View>
              <View style={styles.col}>
                <Card transparent style={styles.card}>
                  <Text style={{fontSize: 12}}>Total Steps:</Text>
                  <Text style={{color: 'rgb(84, 130, 53)'}}>
                    {currentStepCount} steps
                  </Text>
                </Card>
              </View>
            </View>
            <WorkoutGraph
              workoutHistory={true}
              intervals={intervals}
              workoutData={workoutTimestamps}
              totalTimeElapsed={totalTime}
              totalTime={totalTime}
            />
          </View>
        </View>
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
    height: 150,
    display: 'flex',
    flexDirection: 'row'
  }
})
