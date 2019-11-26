import React, {useEffect, useState, useReducer} from 'react'
import {VictoryLine, VictoryChart} from 'victory-native'
import {Text} from 'react-native'
import {DateTime} from 'luxon'
import useInterval from 'use-interval'

// using useReducer since we've got an array of DateTimes
// why would anyone use useReducer instead of redux? idk
// seems kinda like redux without the benefit of getting to use react-redux
// oh well who am i to judge
// I think we'll just convert this to redux at some point in time
const initialState = []
const ADD = 'ADD'
const addInterval = payload => ({type: ADD, payload})
const reducer = (state, action) => {
  switch (action.type) {
    case ADD:
      const {
        payload: {duration, cadence}
      } = action
      // peek back at last interval or initialize to current dateTime
      const lastInterval = state.slice(-1)[0] || [DateTime.local()]
      // calculate beginning and end from last interval
      const begin = lastInterval[0].plus({milliseconds: 1})
      const end = begin.plus({seconds: duration})
      // adds two new arrays to state w/ start and cadence, end and cadence
      return [...state, [begin, cadence], [end, cadence]]
    default:
      return state
  }
}

export default ({domainSetting = true, timeWindow = 30, routine = []}) => {
  // maybe instead of receiving a routine, we receive a workout?
  // initialize intervals with current DateTime
  const [intervals, dispatch] = useReducer(reducer, initialState)
  const [domain, setDomain] = useState([
    DateTime.local().minus({seconds: timeWindow}),
    DateTime.local().plus({seconds: timeWindow})
  ])

  useEffect(() => {
    // on mount, calculate interval start and end times based off previous interval
    routine.forEach(d => dispatch(addInterval(d)))
  }, [])

  useInterval(() => {
    // update chart domain every second to keep current time in the middle
    const now = DateTime.local()
    setDomain([
      now.minus({seconds: timeWindow}),
      now.plus({seconds: timeWindow})
    ])
  }, 1000)

  return intervals && intervals.length ? (
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
      <VictoryLine data={intervals} x={0} y={1} />
      {fakeActuals.filter(([d]) => d.diffNow('seconds').toObject().seconds < 0)
        .length > 2 ? (
        <VictoryLine
          interpolation="catmullRom"
          data={fakeActuals.filter(
            ([d]) => d.diffNow('seconds').toObject().seconds < 0
          )}
          x={0}
          y={1}
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
