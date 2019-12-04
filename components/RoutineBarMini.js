import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import activityTypes from '../assets/images/activityTypes'

export default RoutineBarDisplay = props => {
  const {routine, totalDuration, activityType} = props

  return (
    <View style={styles.routine}>
      {routine.map((interval, i) => {
        const width = (interval.duration / totalDuration) * 100
        return (
          <TouchableOpacity
            key={i}
            value={i}
            style={{
              backgroundColor: i % 2 === 0 ? 'rgb(99, 99, 99)' : 'gray',
              width: `${width}%`,
              height: '100%'
            }}
          >
            {width > 10 ? (
              <View style={styles.intervalInfo}>
                {activityType==='combo' ? <Text style={styles.text}>
                  {activityTypes[interval.activityType].icon}
                </Text> : null }
                <Text style={styles.text}>{interval.cadence}bpm</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  routine: {
    //   backgroundColor: 'black',
    width: '100%',
    height: 25,
    display: 'flex',
    flexDirection: 'row'
  },
  text: {
    textAlign: 'center',
    fontSize: 10,
    color: 'white'
  },
  intervalInfo: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
