import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Container, Text, Content, Card, CardItem} from 'native-base'
import WorkoutGraph from './WorkoutGraph'
import {connect} from 'react-redux'
import RoutineBarGraphic from '../components/RoutineBarGraphic'
import activityTypes from '../assets/images/activityTypes'
import {DateTime} from 'luxon'

const PreviousWorkoutScreen = ({
  navigator,
  workout: {
    timestamp: startTime,
    workoutTimestamps,
    class: {name: className}
  },
  routine: {name: routineName, activityType, intervals}
}) => {
  const totalTime = intervals.reduce(
    (sum, interval) => sum + interval.duration,
    0
  )
  return (
    <Container>
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
                {DateTime.fromJSDate(startTime).toLocaleString(
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
                    {Math.floor(totalTime / 60)
                      ? `${Math.floor(totalTime / 60)}m`
                      : ''}{' '}
                    {totalTime % 60 ? `${totalTime % 60}s` : ''}
                  </Text>
                </Card>
              </View>
              <View style={styles.col}>
                <Card transparent style={styles.card}>
                  <Text style={{fontSize: 12}}>Total Steps:</Text>
                  <Text style={{color: 'rgb(84, 130, 53)'}}>
                    {workoutTimestamps.length} steps
                  </Text>
                </Card>
              </View>
            </View>
            <WorkoutGraph
              intervals={intervals}
              workoutData={workoutTimestamps}
              totalTimeElapsed={totalTime}
              totalTime={totalTime}
              paused={paused}
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
    height: 35,
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
    height: 105,
    display: 'flex',
    flexDirection: 'row'
  }
})

const mapStateToProps = ({routine, user, workout}) => ({
  routine,
  user,
  workout
})

export default connect(mapStateToProps)(PreviousWorkoutScreen)
