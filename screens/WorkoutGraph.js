import React, {useEffect, useState} from 'react'
import {VictoryLine, VictoryChart} from 'victory-native'
import {Text} from 'native-base'
// import {DateTime} from 'luxon'
// import useInterval from 'use-interval'

// // using useReducer since we've got an array of DateTimes
// const ADD = 'ADD'
// const addInterval = (payload, startTime) => ({type: ADD, payload, startTime})
// const reducer = (state, action) => {
//   switch (action.type) {
//     case ADD:
//       const {
//         payload: {duration, cadence},
//         startTime
//       } = action
//       // initialize to provided startTime or peek back at previous interval
//       const lastInterval =
//         (startTime && [DateTime.fromMillis(startTime)]) || state.slice(-1)[0]
//       // calculate beginning and end from last interval
//       const begin = lastInterval[0].plus({milliseconds: 1})
//       const end = begin.plus({seconds: duration})
//       // adds two new arrays to state w/ start and cadence, end and cadence
//       return [...state, [begin, cadence], [end, cadence]]
//     default:
//       return state
//   }
// }

export default ({
  // domainSetting = true,
  timeWindow = 30,
  totalTime,
  intervals = [],
  workoutData = [],
  startTime,
  totalTimeElapsed
}) => {
  const [domain, setDomain] = useState([
    totalTimeElapsed - timeWindow * (2 / 3),
    totalTimeElapsed + timeWindow * (1 / 3)
  ])

  const [routine, setRoutine] = useState([])

  useEffect(() => {
    // on rerender, put the timeline in the right place
    setDomain([
      totalTimeElapsed - timeWindow * (2 / 3),
      totalTimeElapsed + timeWindow * (1 / 3)
    ])
  })

  useEffect(() => {
    setRoutine(
      intervals.reduce((acc, interval, idx) => [
        ...acc,
        [
          [acc[idx - 1][1] + 0.001, interval.cadence],
          [acc[idx - 1][1] + interval.duration, interval.cadence]
        ]
      ])
    )
  }, [])
  console.log(routine)

  return routine && routine.length > 1 ? (
    <VictoryChart
      // animate={{duration: 500, easing: 'quadIn'}}
      domain={domainSetting ? {x: domain} : {}}
      domainPadding={{y: 10}}
      scale={{x: 'time'}}
    >
      <VictoryLine
        x={() => elapsedTime}
        style={{data: {strokeDasharray: 8}}}
        samples={1}
      />
      <VictoryLine data={routine} x={0} y={1} />
      {workoutData.length > 2 ? (
        <VictoryLine
          interpolation="catmullRom"
          data={workoutData}
          x={d => d.timestamp}
          y={d => d.cadence}
          style={{data: {stroke: 'red', strokeWidth: 1}}}
        />
      ) : null}
      {/* VictoryAxis gives an error re: children without a key prop when I use tickValues?
      <VictoryAxis
        domain={{ domain }}
        tickValues={[-30,-15,0,15,30]}
        tickFormat={t =>
          DateTime.fromJSDate(t)
            .diffNow("seconds")
            .toObject().seconds
        }
      /> */}
    </VictoryChart>
  ) : (
    <Text>Loading...</Text>
  )
}
