import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import * as Haptics from "expo-haptics";

const goalCadence = 80;

export default class AccelerometerSensor extends React.Component {
  constructor() {
    super();
    this.state = {
      prevStepClearInterval: setInterval(
        () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
        (60 / goalCadence) * 1000
      ),
      cadence: 0,
      cadence5: [],
      avgCadence5: 0,
      stepTime: Date.now(),
      prevAccelerometerData: {},
      accelerometerData: {},
      stepCount: 0,
      stepTimeOut: false,
      hapticStyle: 'Heavy'
    };
  }

  componentDidMount() {
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

  _slow = () => {
    Accelerometer.setUpdateInterval(50);
  };

  _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };

  // _subscribe = () => {
  //   this._subscription = Accelerometer.addListener(accelerometerData => {
  //     this.setState(prevState => {
  //       let { x, y, z } = accelerometerData;
  //       let { x: prevX, y: prevY, z: prevZ } = prevState.accelerometerData;
  //       let stepCount;
  //       let stepTime;
  //       let cadence;
  //       let stepTimeOut;
  //       let prevStepClearInterval;
  //       // if (prevZ>0 && z<0.1) {
  //       //   console.log('Took a step', prevState.stepCount+1)
  //       //   stepCount = prevState.stepCount+1
  //       //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  //       // } else {
  //       //   stepCount = prevState.stepCount
  //       // }
  //       // if ((Math.sqrt(x*x+y*y)<0.5*Math.sqrt(prevX*prevX+prevY*prevY) || (prevZ>0 && z<0.1)) && !this.state.stepTimeOut) {
  //       // if ((Math.sqrt(x*x+z*z)<0.75*Math.sqrt(prevX*prevX+prevZ*prevZ) &&  Math.sqrt(prevX*prevX+prevZ*prevZ)>0.1 || (prevY<0.8 && y>-0.05 && y<0.05)) && !this.state.stepTimeOut) {
  //       if ((y > 0.02 || (Math.sqrt(x*x+z*z)<0.75*Math.sqrt(prevX*prevX+prevZ*prevZ) &&  Math.sqrt(prevX*prevX+prevZ*prevZ)>0.1)) && !this.state.stepTimeOut) {
  //         console.log('y', y, 'prevY', prevY, 'z', z, 'prevZ', prevZ)
  //         stepCount = prevState.stepCount+1;
  //         stepTime = Date.now();
  //         const stepInterval = (stepTime - prevState.stepTime) / 1000;
  //         cadence = 60 / stepInterval;
  //         stepTimeOut = true;
  //         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  //         clearInterval(this.state.prevStepClearInterval);
  //         prevStepClearInterval = setInterval(
  //           () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
  //           (60 / goalCadence) * 1000
  //         );
  //         console.log(
  //           "Took step #",
  //           prevState.stepCount + 1,
  //           "at time",
  //           stepTime
  //         );
  //         console.log(
  //           "stepInterval (s)",
  //           stepInterval,
  //           "cadence (steps/min)",
  //           cadence
  //         );
  //         setTimeout(() => this.setState({ stepTimeOut: false }), 300);
  //       } else {
  //         stepCount = prevState.stepCount;
  //         stepTime = prevState.stepTime;
  //         cadence = prevState.cadence;
  //         prevStepClearInterval = prevState.prevStepClearInterval;
  //         stepTimeOut = prevState.stepTimeOut;
  //       }
  //       return {
  //         prevAccelerometerData: prevState.accelerometerData,
  //         accelerometerData,
  //         stepCount,
  //         stepTime,
  //         cadence,
  //         prevStepClearInterval,
  //         stepTimeOut
  //       };
  //     });
  //   });
  // };

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      this.setState(prevState => {
        let { x, y, z } = accelerometerData;
        let { x: prevX, y: prevY, z: prevZ } = prevState.accelerometerData;
        let stepCount;
        let stepTime;
        let cadence5;
        let avgCadence5;
        let stepTimeOut;
        let prevStepClearInterval;
        let hapticStyle;
        // if (prevZ>0 && z<0.1) {
        //   console.log('Took a step', prevState.stepCount+1)
        //   stepCount = prevState.stepCount+1
        //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        // } else {
        //   stepCount = prevState.stepCount
        // }
        // if ((Math.sqrt(x*x+y*y)<0.5*Math.sqrt(prevX*prevX+prevY*prevY) || (prevZ>0 && z<0.1)) && !this.state.stepTimeOut) {
        // if ((Math.sqrt(x*x+z*z)<0.75*Math.sqrt(prevX*prevX+prevZ*prevZ) &&  Math.sqrt(prevX*prevX+prevZ*prevZ)>0.1 || (prevY<0.8 && y>-0.05 && y<0.05)) && !this.state.stepTimeOut) {
        if ((y > 0.02 || (Math.sqrt(x*x+z*z)<0.75*Math.sqrt(prevX*prevX+prevZ*prevZ) &&  Math.sqrt(prevX*prevX+prevZ*prevZ)>0.1)) && !this.state.stepTimeOut) {
          // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          stepCount = prevState.stepCount+1;
          stepTime = Date.now();
          const stepInterval = (stepTime - prevState.stepTime) / 1000;
          cadence = 60 / stepInterval;
          cadence5=prevState.cadence5
          cadence5.push(cadence)
          if (cadence5.length>10) {
            cadence5.shift()
          }
          avgCadence5 = cadence5.reduce((sum, cadence) => sum+cadence/cadence5.length, 0)

          if (avgCadence5<goalCadence*1.05 && avgCadence5>goalCadence*0.95) {
            hapticStyle = 'None'
          } else if (avgCadence5<goalCadence*1.2 && avgCadence5>goalCadence*0.8) {
            hapticStyle='Light'
          } else if (avgCadence5<goalCadence*1.3 && avgCadence5>goalCadence*0.7) {
            hapticStyle='Medium'
          } else {
            hapticStyle='Heavy'
          }

          if (hapticStyle!==prevState.hapticStyle) {
            clearInterval(this.state.prevStepClearInterval);
            if (hapticStyle!=='None') {
              prevStepClearInterval = setInterval(
                () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle[hapticStyle]),
                (60 / goalCadence) * 1000
              );
            } else {
              prevStepClearInterval = prevState.prevStepClearInterval
            }
          } else {
            prevStepClearInterval = prevState.prevStepClearInterval
          }
          stepTimeOut = true;
          console.log(
            "Took step #",
            prevState.stepCount + 1,
            "at time",
            stepTime
          );
          console.log(
            "stepInterval (s)",
            stepInterval,
            "cadence (steps/min)",
            cadence,
            'avgCadence',
            avgCadence5
          );
          setTimeout(() => this.setState({ stepTimeOut: false }), 300);
        } else {
          stepCount = prevState.stepCount;
          stepTime = prevState.stepTime;
          cadence = prevState.cadence;
          cadence5 = prevState.cadence5;
          avgCadence5 = prevState.avgCadence5;
          prevStepClearInterval = prevState.prevStepClearInterval;
          stepTimeOut = prevState.stepTimeOut;
          hapticStyle = prevState.hapticStyle
        }
        return {
          prevAccelerometerData: prevState.accelerometerData,
          accelerometerData,
          stepCount,
          stepTime,
          cadence,
          cadence5,
          avgCadence5,
          prevStepClearInterval,
          stepTimeOut,
          hapticStyle
        };
      });
    });
  };

  // _subscribe = () => {
  //   this._subscription = Accelerometer.addListener(accelerometerData => {
  //     let { x, y, z } = accelerometerData;
  //     let { x: prevX, y: prevY, z: prevZ } = this.state.accelerometerData
  //     this.setState(prevState => ({accelerometerData, prevAccelerometerData: prevState.accelerometerData}))
  //     // if ((Math.sqrt(x*x+z*z)<0.75*Math.sqrt(prevX*prevX+prevZ*prevZ) &&  Math.sqrt(prevX*prevX+prevZ*prevZ)>0.1 || (prevY<0.8 && y>-0.05 && y<0.05)) && !this.state.stepTimeOut) {
  //       if ((prevY<0.8 && y>-0.05 && y<0.05) && !this.state.stepTimeOut) {
  //       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  //       const stepTime = Date.now()
  //       const stepInterval = (stepTime-this.state.stepTime)/1000
  //       const cadence = 60/stepInterval
  //       const stepCount = this.state.stepCount+1
  //       clearInterval(this.state.prevStepClearInterval)
  //       const prevStepClearInterval = setInterval(()=>Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 60/goalCadence*1000)
  //       console.log('Took step #', stepCount, 'at time', stepTime)
  //       console.log('stepInterval (s)', stepInterval, 'cadence (steps/min)', cadence)
  //       this.setState({stepTime, cadence, stepCount, prevStepClearInterval, stepTimeOut: true})
  //       setTimeout(()=>this.setState({stepTimeOut: false}), 300)
  //     }
  //   });
  // };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    let { x, y, z } = this.state.accelerometerData;
    let { x: prevX, y: prevY, z: prevZ } = this.state.prevAccelerometerData;
    return (
      <View style={styles.sensor}>
        <Text style={styles.text}>
          Accelerometer: (in Gs where 1 G = 9.81 m s^-2)
        </Text>
        <Text style={styles.text}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>
        <Text style={styles.text}>
          Prev Accelerometer: (in Gs where 1 G = 9.81 m s^-2)
        </Text>
        <Text style={styles.text}>
          x: {round(prevX)} y: {round(prevY)} z: {round(prevZ)}
        </Text>
        <Text style={styles.text}>
          Horizontal component: (in Gs where 1 G = 9.81 m s^-2)
        </Text>
        <Text style={styles.text}>
          Horizontal component: {round(Math.sqrt(x * x + y * y))}
        </Text>
        <Text style={styles.text}>
          Prev Horizontal component: (in Gs where 1 G = 9.81 m s^-2)
        </Text>
        <Text style={styles.text}>
          Horizontal component:{" "}
          {round(Math.sqrt(prevX * prevX + prevY * prevY))}
        </Text>
        <Text style={styles.text}>Step Timeout</Text>
        <Text style={styles.text}>{this.state.stepTimeOut}</Text>
        {prevZ < 0 && z > 0 ? <Text>Took a step</Text> : null}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
            <Text>Toggle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._slow}
            style={[styles.button, styles.middleButton]}
          >
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
        <View>

        </View>
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
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
  }
});
