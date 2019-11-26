import React from "react";
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import routine from "../dummyIntervals";
import activityTypes from '../assets/images/activityTypes'

export default RoutineBarGraphic = props => {
    const {routine, changeIndex, index} = props
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
              backgroundColor: i===index ? 'blue' : (i % 2 === 0 ? "rgb(99, 99, 99)" : "gray"),
              width: `${width}%`,
              height: "100%"
            }}
            onPress={()=>changeIndex(i)}
          >
            {width > 10 ? (
              <View style={styles.intervalInfo}>
                  <Text style={styles.text}>{activityTypes[interval.intervalType].icon}</Text>
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
    marginTop: 20,
    marginBottom: 20
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
