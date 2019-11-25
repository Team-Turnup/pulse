import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Pedometer } from "expo-sensors";
import {haptic} from '../assets/options/haptics'
import intervals from '../dummyIntervals'
// import { Audio } from "expo-av";
import tick from '../assets/audio/Tick.mp3'
// import Sound from 'react-native-sound';

export default class WorkoutLogic extends Component {
  constructor() {
    super();
    this.state = {
      clearCadence: null,
      // prevStepClearInterval: setInterval(
      //   () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
      //   (60 / goalCadence) * 1000
      // ),
      cadence: 0,
      avgCadence: 0,
      totalTimeElapsed: 0,
      totalTime: intervals.reduce(
        (sum, interval) => sum + interval.duration,
        0
      ),
      intervalTime: 0,
      currentInterval: 0,
      intervals,
      pauseTime: null,
      visualColor: "",
      // soundObject: null,
      isPedometerAvailable: "checking",
      // pastStepCount: 0,
      currentStepCount: 0,
      cadences: [],
      pedometerUpdate: Date.now()
    };
  }

  async componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };

  // _slow = () => {
  //   Accelerometer.setUpdateInterval(200);
  // };

  // _fast = () => {
  //   Accelerometer.setUpdateInterval(16);
  // };

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      // console.log(result.steps, Date.now())
      const pedometerUpdate = Date.now()
      const cadence = (result.steps-this.state.currentStepCount)/(pedometerUpdate-this.state.pedometerUpdate)*60000
      const cadences = [...this.state.cadences]
      cadences.push(cadence)
      if (cadences.length>5) {
        cadences.shift()
      }
      const avgCadence = cadences.reduce((sum, cadence) => sum+cadence/cadences.length, 0)
      console.log(avgCadence)
      this.setState({
        currentStepCount: result.steps,
        pedometerUpdate,
        cadence,
        cadences,
        avgCadence
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

  };

  _startWorkout = async () => {
    // const soundObject = new Audio.Sound();
    //   try {
    //     await soundObject.loadAsync(tick)
    //   } catch (error) {
    //     console.log(error)
    //   }
    const clearCadence = setInterval(async () => {
      // soundObject.stopAsync().then(()=>soundObject.playFromPositionAsync(0))
      // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      haptic(this.state.intervals[this.state.currentInterval].hapticOptions.cadence.what, this.state.intervals[this.state.currentInterval].cadence)()
      this.setState({ visualColor: "blue" });
      setTimeout(
        () => this.setState({ visualColor: "white" }),
        (30 / this.state.intervals[this.state.currentInterval].cadence) * 1000
      );
    }, (60 / this.state.intervals[this.state.currentInterval].cadence) * 1000);
    const pauseTime = setInterval(async () => {
      let {
        totalTimeElapsed,
        intervalTime,
        intervals,
        currentInterval,
        clearCadence,
        pauseTime
      } = this.state;
      totalTimeElapsed++;
      intervalTime++;
      if (intervalTime > intervals[currentInterval].duration - 1) {
        if (currentInterval < intervals.length - 1) {
          currentInterval++;
          intervalTime = 0;
          clearInterval(clearCadence);
          // await soundObject.stopAsync(async () => {
          //   await soundObject.setPositionAsync(0)
          //   await soundObject.playAsync()
          // })
          // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            this.setState({ visualColor: "blue" });
            setTimeout(
              () => this.setState({ visualColor: "white" }),
              (30 / this.state.intervals[this.state.currentInterval].cadence) *
                1000
            );
          clearCadence = setInterval(async () => {
            // await soundObject.stopAsync(async () => {
            //   await soundObject.setPositionAsync(0)
            //   await soundObject.playAsync()
            // })
            haptic(this.state.intervals[this.state.currentInterval].hapticOptions.cadence.what, this.state.intervals[this.state.currentInterval].cadence)()
            this.setState({ visualColor: "blue" });
            setTimeout(
              () => this.setState({ visualColor: "white" }),
              (30 / this.state.intervals[this.state.currentInterval].cadence) *
                1000
            );
          }, (60 / intervals[currentInterval].cadence) * 1000);
        } else {
          clearInterval(clearCadence);
          clearInterval(pauseTime);
        }
      }
      this.setState({
        totalTimeElapsed,
        intervalTime,
        currentInterval,
        clearCadence
      });
    }, 1000);
    this.setState({ pauseTime, clearCadence });
  };

  _pauseWorkout = () => {
    clearInterval(this.state.pauseTime);
    clearInterval(this.state.clearCadence);
  };

  _restartWorkout = () => {
    this._pauseWorkout();
    this.setState({ currentInterval: 0, totalTimeElapsed: 0, intervalTime: 0 });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.sensor}>
        <Text style={styles.text}>Total Time Elapsed</Text>
        <Text style={styles.text}>{this.state.totalTimeElapsed}</Text>
        <Text style={styles.text}>Total Time Left</Text>
        <Text style={styles.text}>
          {this.state.totalTime - this.state.totalTimeElapsed}
        </Text>
        <Text style={styles.text}>Time Left in Interval</Text>
        <Text style={styles.text}>
          {this.state.intervals[this.state.currentInterval].duration -
            this.state.intervalTime}
        </Text>
        <Text style={styles.text}>Target Cadence</Text>
        <Text style={styles.text}>
          {this.state.intervals[this.state.currentInterval].cadence}
        </Text>
        <Text style={styles.text}>Current Cadence</Text>
        <Text style={styles.text}>
          {this.state.cadence}
        </Text>
        <Text style={styles.text}>Avg Cadence</Text>
        <Text style={styles.text}>
          {this.state.avgCadence}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._startWorkout} style={styles.button}>
            <Text>Start workout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._pauseWorkout} style={styles.button}>
            <Text>Pause workout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._restartWorkout}
            style={styles.button}
          >
            <Text>Restart workout</Text>
          </TouchableOpacity>
        </View>
          <View
            style={{
              ...styles.visual,
              backgroundColor: this.state.visualColor
            }}
          ></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc"
  },
  sensor: {
    marginTop: 45,
    paddingHorizontal: 10
  },
  text: {
    textAlign: "center"
  },
  visual: {
    width: '100%',
    height: 200,
  }
});
