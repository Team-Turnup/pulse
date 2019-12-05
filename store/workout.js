import axios from 'axios'
import {ngrok} from '../ngrok'
import {addWorkout} from './workouts'
import {setRoutine} from './routine'

const SET_WORKOUT = 'SET_WORKOUT'

export const setWorkout = workout => ({
  type: SET_WORKOUT,
  workout
})

export const createWorkoutThunk = routineId => async dispatch => {
  try {
    const response = await axios.post(`${ngrok}/api/workouts/`, {routineId})
    const {workout, routine} = response.data
    dispatch(setWorkout(workout))
    const workoutWithRoutine = workout
    workoutWithRoutine.routine = routine
    dispatch(addWorkout(workoutWithRoutine))
  } catch (err) {
    console.error(err)
  }
}

export const fetchWorkoutThunk = workoutId => async dispatch => {
  try {
    const {
      data: {
        workout: {routine, ...workout}
      }
    } = await axios.get(`${ngrok}/api/workouts/${workoutId}`)
    dispatch(setWorkout(workout))
    dispatch(setRoutine(routine))
  } catch (err) {
    console.error(err)
  }
}

initialState = {}

//should be a GET_WORKOUTS probably
const workoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WORKOUT:
      return action.workout
    default:
      return state
  }
}
export default workoutReducer
