import React, {useEffect, useState} from 'react'
import {VictoryLine, VictoryChart, VictoryAxis} from 'victory-native'
import {Text} from 'native-base'

export default ({
  workoutHistory = false,
  timeWindow = 30,
  totalTime,
  intervals = [],
  workoutData = [],
  totalTimeElapsed,
  paused
}) => {
  const [domain, setDomain] = useState([0, 30])

  const [routine, setRoutine] = useState([])

  useEffect(() => {
    // on rerender, put the timeline in the right place
    const lower = totalTimeElapsed - timeWindow * (2 / 3)
    const upper = totalTimeElapsed + timeWindow * (1 / 3)
    setDomain([lower < 0 ? 0 : lower, upper < 30 ? 30 : upper])
  })

  useEffect(() => {
    setRoutine(
      intervals.reduce((acc, interval, idx) => {
        return [
          ...acc,
          ...[
            [idx === 0 ? 0 : acc[idx * 2 - 1][0], interval.cadence],
            [
              (idx === 0 ? 0 : acc[idx * 2 - 1][0]) + interval.duration,
              interval.cadence
            ]
          ]
        ]
      }, [])
    )
  }, [])

  return routine && routine.length > 1 ? (
    <VictoryChart
      // animate={{duration: 500, easing: 'quadIn'}}
      domain={workoutHistory ? {} : {x: domain}}
      domainPadding={{y: 50}}
    >
      <VictoryAxis crossAxis label="Workout Time (seconds)" />
      <VictoryAxis
        dependentAxis
        padding={115}
        label="Cadence (bpm)"
        style={{axisLabel: {angle: -90, padding: 37}}}
      />
      {workoutHistory ? null : (
        <VictoryLine
          x={() => totalTimeElapsed}
          style={{data: {strokeDasharray: 8}}}
          samples={1}
        />
      )}
      <VictoryLine data={routine} x={0} y={1} />
      {workoutData.filter(d => d.timestamp / 1000 < totalTimeElapsed).slice(1)
        .length > 2 ? (
        <VictoryLine
          interpolation="catmullRom"
          data={workoutData
            .filter(d => d.timestamp / 1000 < totalTimeElapsed)
            .slice(1)}
          x={d => d.timestamp / 1000}
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
