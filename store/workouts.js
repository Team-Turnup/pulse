import axios from 'axios'
import {ngrok} from '../ngrok'

// const GET_EXERCISE = 'GET_EXERCISE';
const SET_WORKOUTS = 'SET_WORKOUTS'
const ADD_WORKOUT = 'ADD_WORKOUT'

export const setWorkouts = workouts => ({
  type: SET_WORKOUTS,
  workouts
})

export const addWorkout = workout => ({
  type: ADD_WORKOUT,
  workout
})

export const getMyWorkoutsThunk = () => async dispatch => {
  try {
    const response = await axios.get(`${ngrok}/api/users/myWorkouts`)
    dispatch(setWorkouts(response.data))
  } catch (err) {
    console.error(err)
  }
}
const initialState = []

const workoutsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WORKOUTS:
      return action.workouts
    case ADD_WORKOUT:
      return [action.workout, ...state]
    default:
      return state
  }
}
export default workoutsReducer
