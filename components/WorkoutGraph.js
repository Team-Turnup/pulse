import React, { useEffect, useState, useReducer } from "react";
import { VictoryLine, VictoryChart, VictoryAxis } from "victory-native";
import { Text } from "react-native";
import { DateTime } from "luxon";
import useInterval from "use-interval";

// using useReducer since we've got an array of DateTimes
const initialState = [];
// why would anyone use useReducer instead of redux? idk
const ADD = "ADD";
// seems kinda like redux without the benefit of getting to use react-redux
const addInterval = payload => ({ type: ADD, payload });
// oh well who am i to judge
const reducer = (state, action) => {
  switch (action.type) {
    case ADD:
      const {
        payload: { duration, cadence }
      } = action;
      // peek back at last interval or initialize to current dateTime
      const lastInterval = state.slice(-1)[0] || [DateTime.local()];
      // calculate beginning and end from last interval
      const begin = lastInterval[0].plus({ milliseconds: 1 });
      const end = begin.plus({ seconds: duration });
      // adds two new arrays to state w/ start and cadence, end and cadence
      return [...state, [begin, cadence], [end, cadence]];
    default:
      return state;
  }
};

// dummy data
let i = 1;
const fakeRoutine = Array.from({ length: 5 }, () => ({
  id: i++,
  cadence: 10 * (Math.floor(Math.random() * (12 - 8 + 1)) + 8),
  duration: 60 * Math.floor(Math.random() * 5 + 1)
}));

// params
const timeWindow = 30; // seconds (to calc range of graph)

export default () => {
  // initialize intervals with current DateTime
  const [intervals, dispatch] = useReducer(reducer, initialState);
  const [domain, setDomain] = useState([
    DateTime.local().minus({ seconds: timeWindow }),
    DateTime.local().plus({ seconds: timeWindow })
  ]);

  useEffect(() => {
    // on mount, calculate interval start and end times based off previous interval
    fakeRoutine.forEach(d => dispatch(addInterval(d)));
  }, []);

  useInterval(() => {
    // update chart domain every second to keep current time in the middle
    const now = DateTime.local();
    setDomain([
      now.minus({ seconds: timeWindow }),
      now.plus({ seconds: timeWindow })
    ]);
  }, 1000);

  return intervals && intervals.length ? (
    <VictoryChart
      domain={{ x: domain }}
      domainPadding={{ y: 10 }}
      scale={{ x: "time" }}
    >
      <VictoryLine data={intervals} x={0} y={1} />
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
  );
};
