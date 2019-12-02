import React, {useEffect, useState, useReducer} from 'react'
import {VictoryLine, VictoryChart} from 'victory-native'
import {Text} from 'react-native'
import {DateTime} from 'luxon'
import useInterval from 'use-interval'

// using useReducer since we've got an array of DateTimes
const ADD = 'ADD'
const addInterval = (payload, startTime) => ({type: ADD, payload, startTime})
const reducer = (state, action) => {
  switch (action.type) {
    case ADD:
      const {
        payload: {duration, cadence},
        startTime
      } = action
      // initialize to provided startTime or peek back at previous interval
      const lastInterval =
        (startTime && [DateTime.fromMillis(startTime)]) || state.slice(-1)[0]
      // calculate beginning and end from last interval
      const begin = lastInterval[0].plus({milliseconds: 1})
      const end = begin.plus({seconds: duration})
      // adds two new arrays to state w/ start and cadence, end and cadence
      return [...state, [begin, cadence], [end, cadence]]
    default:
      return state
  }
}

export default ({
  domainSetting = true,
  timeWindow = 30,
  intervals = [],
  workoutData = [],
  startTime
}) => {
  // maybe instead of receiving a routine, we receive a workout?
  // initialize tsIntervals with current DateTime
  const [tsIntervals, dispatch] = useReducer(reducer, [])
  const [domain, setDomain] = useState([
    DateTime.local().minus({seconds: timeWindow}),
    DateTime.local().plus({seconds: timeWindow})
  ])

  useEffect(() => {
    // on mount, convert interval duration data into timestamps for graph
    intervals.forEach((d, i) =>
      dispatch(addInterval(d, i === 0 ? startTime : undefined))
    )
  }, [])

  useInterval(() => {
    // update chart domain every second to keep current time in the middle
    const now = DateTime.local()
    setDomain([
      now.minus({seconds: timeWindow}),
      now.plus({seconds: timeWindow})
    ])
  }, 1000)
  return tsIntervals && tsIntervals.length > 1 ? (
    <VictoryChart
      // animate={{duration: 500, easing: 'quadIn'}}
      domain={domainSetting ? {x: domain, y: [80, 120]} : {}}
      domainPadding={{y: 10}}
      scale={{x: 'time'}}
    >
      <VictoryLine
        x={() => DateTime.local()}
        style={{data: {strokeDasharray: 8}}}
        samples={1}
      />
      <VictoryLine data={tsIntervals} x={0} y={1} />
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
