import React from "react";
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import activityTypes from '../assets/images/activityTypes'

export default RoutineBarGraphic = props => {
    const {routine, changeIndex, index, finished, routineType} = props
  const totalDuration = routine.reduce(
    (sum, interval) => sum + interval.duration,
    0
  );

  return (
    <View style={styles.routine}>
      {routine.map((interval, i) => {
        const width = (interval.duration / totalDuration) * 100;
        return (
          <TouchableOpacity
            key={i}
            value={i}
            style={{
              backgroundColor: finished ? (i % 2 === 0 ? "rgb(84, 130, 53)" : "rgba(84, 130, 53, 0.9)") : (i===index ? 'rgb(84, 130, 53)' : (i % 2 === 0 ? "rgb(160, 160, 160)" : "rgb(175, 175, 175)")),
              width: `${width}%`,
              height: "100%"
            }}
            onPress={()=>changeIndex(i)}
            onLongPress={props.removeInterval}
          >
            {width > 10 ? (
              <View style={styles.intervalInfo}>
      <Text style={styles.text}>Interval #{i+1}</Text>
                  {routineType==='combo' ? <Text style={styles.text}>{activityTypes[interval.intervalType].icon}</Text> : null}
                <Text style={styles.text}>{Math.floor(interval.duration/60) ? `${Math.floor(interval.duration/60)}m` : ''} {interval.duration%60 ? `${interval.duration%60}s` : ''}</Text>
                <Text style={styles.text}>{interval.cadence}bpm</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  routine: {
    //   backgroundColor: 'black',
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
  },
  text: {
    textAlign: "center",
    fontSize: 10,
    color: "white"
  },
  intervalInfo: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});
