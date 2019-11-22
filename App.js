import React from "react";
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View } from "react-native";

export default class App extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      console.log(result.steps, Date.now())
      this.setState({
        currentStepCount: result.steps
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

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
        </Text>
        <Text>
          Steps taken in the last 24 hours: {this.state.pastStepCount}
        </Text>
        <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  }
});

// import React, { Component } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Accelerometer } from "expo-sensors";
// import * as Haptics from "expo-haptics";
// import {haptic} from './hapticOptions'
// import {intervals} from './dummyIntervals'
// // import { Audio } from "expo-av";
// import tick from './assets/Tick.mp3'
// // import Sound from 'react-native-sound';

// export default class AccelerometerSensor extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       clearCadence: null,
//       // prevStepClearInterval: setInterval(
//       //   () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
//       //   (60 / goalCadence) * 1000
//       // ),
//       cadence: 0,
//       cadence5: [],
//       avgCadence5: 0,
//       stepTime: Date.now(),
//       prevPrevAccelerometerData: {},
//       prevAccelerometerData: {},
//       accelerometerData: {},
//       stepCount: 0,
//       stepTimeOut: false,
//       hapticStyle: "Heavy",
//       intervalTime: 0,
//       totalTimeElapsed: 0,
//       totalTime: intervals.reduce(
//         (sum, interval) => sum + interval.duration,
//         0
//       ),
//       currentInterval: 0,
//       intervals,
//       pauseTime: null,
//       visualColor: "",
//       // soundObject: null
//     };
//   }

//   async componentDidMount() {
//     this._toggle();
//   }

//   componentWillUnmount() {
//     this._unsubscribe();
//   }

//   _toggle = () => {
//     if (this._subscription) {
//       this._unsubscribe();
//     } else {
//       this._subscribe();
//     }
//   };

//   _slow = () => {
//     Accelerometer.setUpdateInterval(200);
//   };

//   _fast = () => {
//     Accelerometer.setUpdateInterval(16);
//   };

//   _subscribe = () => {};

//   _startWorkout = async () => {
//     // const soundObject = new Audio.Sound();
//     //   try {
//     //     await soundObject.loadAsync(tick)
//     //   } catch (error) {
//     //     console.log(error)
//     //   }
//     const clearCadence = setInterval(async () => {
//       // soundObject.stopAsync().then(()=>soundObject.playFromPositionAsync(0))
//       // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
//       haptic(this.state.intervals[this.state.currentInterval].hapticOptions.cadence.what, this.state.intervals[this.state.currentInterval].cadence)()
//       this.setState({ visualColor: "blue" });
//       setTimeout(
//         () => this.setState({ visualColor: "white" }),
//         (30 / this.state.intervals[this.state.currentInterval].cadence) * 1000
//       );
//     }, (60 / this.state.intervals[this.state.currentInterval].cadence) * 1000);
//     const pauseTime = setInterval(async () => {
//       let {
//         totalTimeElapsed,
//         intervalTime,
//         intervals,
//         currentInterval,
//         clearCadence,
//         pauseTime
//       } = this.state;
//       totalTimeElapsed++;
//       intervalTime++;
//       if (intervalTime > intervals[currentInterval].duration - 1) {
//         if (currentInterval < intervals.length - 1) {
//           currentInterval++;
//           intervalTime = 0;
//           clearInterval(clearCadence);
//           // await soundObject.stopAsync(async () => {
//           //   await soundObject.setPositionAsync(0)
//           //   await soundObject.playAsync()
//           // })
//           // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
//             this.setState({ visualColor: "blue" });
//             setTimeout(
//               () => this.setState({ visualColor: "white" }),
//               (30 / this.state.intervals[this.state.currentInterval].cadence) *
//                 1000
//             );
//           clearCadence = setInterval(async () => {
//             // await soundObject.stopAsync(async () => {
//             //   await soundObject.setPositionAsync(0)
//             //   await soundObject.playAsync()
//             // })
//             haptic(this.state.intervals[this.state.currentInterval].hapticOptions.cadence.what, this.state.intervals[this.state.currentInterval].cadence)()
//             this.setState({ visualColor: "blue" });
//             setTimeout(
//               () => this.setState({ visualColor: "white" }),
//               (30 / this.state.intervals[this.state.currentInterval].cadence) *
//                 1000
//             );
//           }, (60 / intervals[currentInterval].cadence) * 1000);
//         } else {
//           clearInterval(clearCadence);
//           clearInterval(pauseTime);
//         }
//       }
//       this.setState({
//         totalTimeElapsed,
//         intervalTime,
//         currentInterval,
//         clearCadence
//       });
//     }, 1000);
//     this.setState({ pauseTime, clearCadence });
//   };

//   _pauseWorkout = () => {
//     clearInterval(this.state.pauseTime);
//     clearInterval(this.state.clearCadence);
//   };

//   _restartWorkout = () => {
//     this._pauseWorkout();
//     this.setState({ currentInterval: 0, totalTimeElapsed: 0, intervalTime: 0 });
//   };

//   // _subscribe = () => {
//   //   this._subscription = Accelerometer.addListener(accelerometerData => {
//   //     this.setState(prevState => {
//   //       let { x, y, z} = accelerometerData;
//   //       let t = Date.now()
//   //       let { x: prevX, y: prevY, z: prevZ, t: prevT} = prevState.accelerometerData;
//   //       let { x: prevPrevX, y: prevPrevY, z: prevPrevZ, t: prevPrevT} = prevState.prevAccelerometerData;
//   //       console.log('current', x, y, z, t)
//   //       console.log('prev', prevX, prevY, prevZ, prevT)
//   //       console.log('prevPrev', prevPrevX, prevPrevY, prevPrevZ, prevPrevT)
//   //       let slope = (x*x-prevX*prevX)/(t-prevT)
//   //       let prevSlope = (prevX*prevX-prevPrevX*prevPrevX)/(prevT-prevPrevT)
//   //       console.log('slope', slope, 'prevSlope', prevSlope)
//   //       let stepCount;
//   //       let stepTime;
//   //       let cadence;
//   //       let stepTimeOut;
//   //       let prevStepClearInterval;
//   //       // if (prevZ>0 && z<0.1) {
//   //       //   console.log('Took a step', prevState.stepCount+1)
//   //       //   stepCount = prevState.stepCount+1
//   //       //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
//   //       // } else {
//   //       //   stepCount = prevState.stepCount
//   //       // }
//   //       if (x*x<0.9*x*x && !this.state.stepTimeOut) {
//   //       // if ((Math.sqrt(x*x+z*z)<0.75*Math.sqrt(prevX*prevX+prevZ*prevZ) &&  Math.sqrt(prevX*prevX+prevZ*prevZ)>0.1 || (prevY<0.8 && y>-0.05 && y<0.05)) && !this.state.stepTimeOut) {
//   //       // if (x*x<prevX*prevX && x*x<prevPrevX*prevPrevX && prevX*prevX<prevPrevX*prevPrevX && !this.state.stepTimeOut) {
//   //         stepCount = prevState.stepCount+1;
//   //         stepTime = t
//   //         const stepInterval = (stepTime - prevState.stepTime) / 1000;
//   //         cadence = 60 / stepInterval;
//   //         stepTimeOut = true;
//   //         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//   //         console.log(
//   //           "Took step #",
//   //           prevState.stepCount + 1,
//   //           "at time",
//   //           stepTime
//   //         );
//   //         console.log(
//   //           "stepInterval (s)",
//   //           stepInterval,
//   //           "cadence (steps/min)",
//   //           cadence
//   //         );
//   //         setTimeout(() => this.setState({ stepTimeOut: false }), 500);
//   //       } else {
//   //         stepCount = prevState.stepCount;
//   //         stepTime = prevState.stepTime;
//   //         cadence = prevState.cadence;
//   //         prevStepClearInterval = prevState.prevStepClearInterval;
//   //         stepTimeOut = prevState.stepTimeOut;
//   //       }
//   //       return {
//   //         prevPrevAccelerometerData: prevState.prevAccelerometerData,
//   //         prevAccelerometerData: prevState.accelerometerData,
//   //         accelerometerData: {...accelerometerData, t},
//   //         stepCount,
//   //         stepTime,
//   //         cadence,
//   //         prevStepClearInterval,
//   //         stepTimeOut
//   //       };
//   //     });
//   //   });
//   // };

//   // _subscribe = () => {
//   //   this._subscription = Accelerometer.addListener(accelerometerData => {
//   //     this.setState(prevState => {
//   //       let { x, y, z } = accelerometerData;
//   //       let { x: prevX, y: prevY, z: prevZ } = prevState.accelerometerData;
//   //       let stepCount;
//   //       let stepTime;
//   //       let cadence5;
//   //       let avgCadence5;
//   //       let stepTimeOut;
//   //       let prevStepClearInterval;
//   //       let hapticStyle;
//   //       // if (prevZ>0 && z<0.1) {
//   //       //   console.log('Took a step', prevState.stepCount+1)
//   //       //   stepCount = prevState.stepCount+1
//   //       //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
//   //       // } else {
//   //       //   stepCount = prevState.stepCount
//   //       // }
//   //       // if ((Math.sqrt(x*x+y*y)<0.5*Math.sqrt(prevX*prevX+prevY*prevY) || (prevZ>0 && z<0.1)) && !this.state.stepTimeOut) {
//   //       // if ((Math.sqrt(x*x+z*z)<0.75*Math.sqrt(prevX*prevX+prevZ*prevZ) &&  Math.sqrt(prevX*prevX+prevZ*prevZ)>0.1 || (prevY<0.8 && y>-0.05 && y<0.05)) && !this.state.stepTimeOut) {
//   //       if ((y > 0.02 || (Math.sqrt(x*x+z*z)<0.75*Math.sqrt(prevX*prevX+prevZ*prevZ) &&  Math.sqrt(prevX*prevX+prevZ*prevZ)>0.1)) && !this.state.stepTimeOut) {
//   //         // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//   //         stepCount = prevState.stepCount+1;
//   //         stepTime = Date.now();
//   //         const stepInterval = (stepTime - prevState.stepTime) / 1000;
//   //         cadence = 60 / stepInterval;
//   //         cadence5=prevState.cadence5
//   //         cadence5.push(cadence)
//   //         if (cadence5.length>5) {
//   //           cadence5.shift()
//   //         }
//   //         avgCadence5 = cadence5.reduce((sum, cadence) => sum+cadence/cadence5.length, 0)

//   //         if (avgCadence5<goalCadence*1.05 && avgCadence5>goalCadence*0.95) {
//   //           hapticStyle = 'None'
//   //         } else if (avgCadence5<goalCadence*1.2 && avgCadence5>goalCadence*0.8) {
//   //           hapticStyle='Heavy'
//   //         } else if (avgCadence5<goalCadence*1.3 && avgCadence5>goalCadence*0.7) {
//   //           hapticStyle='Heavy'
//   //         } else {
//   //           hapticStyle='Heavy'
//   //         }

//   //         if (hapticStyle!==prevState.hapticStyle) {
//   //           clearInterval(this.state.prevStepClearInterval);
//   //           if (hapticStyle!=='None') {
//   //             prevStepClearInterval = setInterval(
//   //               () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle[hapticStyle]),
//   //               (60 / goalCadence) * 1000
//   //             );
//   //           } else {
//   //             prevStepClearInterval = prevState.prevStepClearInterval
//   //           }
//   //         } else {
//   //           prevStepClearInterval = prevState.prevStepClearInterval
//   //         }
//   //         stepTimeOut = true;
//   //         console.log(
//   //           "Took step #",
//   //           prevState.stepCount + 1,
//   //           "at time",
//   //           stepTime
//   //         );
//   //         console.log(
//   //           "stepInterval (s)",
//   //           stepInterval,
//   //           "cadence (steps/min)",
//   //           cadence,
//   //           'avgCadence',
//   //           avgCadence5
//   //         );
//   //         setTimeout(() => this.setState({ stepTimeOut: false }), 300);
//   //       } else {
//   //         stepCount = prevState.stepCount;
//   //         stepTime = prevState.stepTime;
//   //         cadence = prevState.cadence;
//   //         cadence5 = prevState.cadence5;
//   //         avgCadence5 = prevState.avgCadence5;
//   //         prevStepClearInterval = prevState.prevStepClearInterval;
//   //         stepTimeOut = prevState.stepTimeOut;
//   //         hapticStyle = prevState.hapticStyle
//   //       }
//   //       return {
//   //         prevAccelerometerData: prevState.accelerometerData,
//   //         accelerometerData,
//   //         stepCount,
//   //         stepTime,
//   //         cadence,
//   //         cadence5,
//   //         avgCadence5,
//   //         prevStepClearInterval,
//   //         stepTimeOut,
//   //         hapticStyle
//   //       };
//   //     });
//   //   });
//   // };

//   // _subscribe = () => {
//   //   this._subscription = Accelerometer.addListener(accelerometerData => {
//   //     let { x, y, z } = accelerometerData;
//   //     let { x: prevX, y: prevY, z: prevZ } = this.state.accelerometerData
//   //     this.setState(prevState => ({accelerometerData, prevAccelerometerData: prevState.accelerometerData}))
//   //     // if ((Math.sqrt(x*x+z*z)<0.75*Math.sqrt(prevX*prevX+prevZ*prevZ) &&  Math.sqrt(prevX*prevX+prevZ*prevZ)>0.1 || (prevY<0.8 && y>-0.05 && y<0.05)) && !this.state.stepTimeOut) {
//   //       if ((prevY<0.8 && y>-0.05 && y<0.05) && !this.state.stepTimeOut) {
//   //       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
//   //       const stepTime = Date.now()
//   //       const stepInterval = (stepTime-this.state.stepTime)/1000
//   //       const cadence = 60/stepInterval
//   //       const stepCount = this.state.stepCount+1
//   //       clearInterval(this.state.prevStepClearInterval)
//   //       const prevStepClearInterval = setInterval(()=>Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 60/goalCadence*1000)
//   //       console.log('Took step #', stepCount, 'at time', stepTime)
//   //       console.log('stepInterval (s)', stepInterval, 'cadence (steps/min)', cadence)
//   //       this.setState({stepTime, cadence, stepCount, prevStepClearInterval, stepTimeOut: true})
//   //       setTimeout(()=>this.setState({stepTimeOut: false}), 300)
//   //     }
//   //   });
//   // };

//   _unsubscribe = () => {
//     this._subscription && this._subscription.remove();
//     this._subscription = null;
//   };

//   render() {
//     let { x, y, z } = this.state.accelerometerData;
//     let { x: prevX, y: prevY, z: prevZ } = this.state.prevAccelerometerData;
//     return (
//       <View style={styles.sensor}>
//         {/* <Text style={styles.text}>
//           Accelerometer: (in Gs where 1 G = 9.81 m s^-2)
//         </Text>
//         <Text style={styles.text}>
//           x: {round(x)} y: {round(y)} z: {round(z)}
//         </Text>
//         <Text style={styles.text}>
//           Prev Accelerometer: (in Gs where 1 G = 9.81 m s^-2)
//         </Text>
//         <Text style={styles.text}>
//           x: {round(prevX)} y: {round(prevY)} z: {round(prevZ)}
//         </Text>
//         <Text style={styles.text}>
//           Horizontal component: (in Gs where 1 G = 9.81 m s^-2)
//         </Text>
//         <Text style={styles.text}>
//           Horizontal component: {round(Math.sqrt(x * x + y * y))}
//         </Text>
//         <Text style={styles.text}>
//           Prev Horizontal component: (in Gs where 1 G = 9.81 m s^-2)
//         </Text>
//         <Text style={styles.text}>
//           Horizontal component:{" "}
//           {round(Math.sqrt(prevX * prevX + prevY * prevY))}
//         </Text>
//         <Text style={styles.text}>Step Timeout</Text>
//         <Text style={styles.text}>{this.state.stepTimeOut}</Text> */}
//         <Text style={styles.text}>Total Time Elapsed</Text>
//         <Text style={styles.text}>{this.state.totalTimeElapsed}</Text>
//         <Text style={styles.text}>Total Time Left</Text>
//         <Text style={styles.text}>
//           {this.state.totalTime - this.state.totalTimeElapsed}
//         </Text>
//         <Text style={styles.text}>Time Left in Interval</Text>
//         <Text style={styles.text}>
//           {this.state.intervals[this.state.currentInterval].duration -
//             this.state.intervalTime}
//         </Text>
//         <Text style={styles.text}>Target Cadence</Text>
//         <Text style={styles.text}>
//           {this.state.intervals[this.state.currentInterval].cadence}
//         </Text>
//         <View style={styles.buttonContainer}>
//           {/* <TouchableOpacity onPress={this._toggle} style={styles.button}>
//             <Text>Toggle</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={this._slow}
//             style={[styles.button, styles.middleButton]}
//           >
//             <Text>Slow</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={this._fast} style={styles.button}>
//             <Text>Fast</Text>
//           </TouchableOpacity> */}
//           <TouchableOpacity onPress={this._startWorkout} style={styles.button}>
//             <Text>Start workout</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={this._pauseWorkout} style={styles.button}>
//             <Text>Pause workout</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={this._restartWorkout}
//             style={styles.button}
//           >
//             <Text>Restart workout</Text>
//           </TouchableOpacity>
//         </View>
//           <View
//             style={{
//               ...styles.visual,
//               backgroundColor: this.state.visualColor
//             }}
//           ></View>
//       </View>
//     );
//   }
// }

// function round(n) {
//   if (!n) {
//     return 0;
//   }

//   return Math.floor(n * 100) / 100;
// }

// const styles = StyleSheet.create({
//   buttonContainer: {
//     flexDirection: "row",
//     alignItems: "stretch",
//     marginTop: 15
//   },
//   button: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#eee",
//     padding: 10
//   },
//   middleButton: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderColor: "#ccc"
//   },
//   sensor: {
//     marginTop: 45,
//     paddingHorizontal: 10
//   },
//   text: {
//     textAlign: "center"
//   },
//   visual: {
//     width: '100%',
//     height: 200,
//   }
// });
