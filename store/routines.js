import axios from 'axios'
import {ngrok} from '../ngrok'
import {setRoutine} from './routine'
// import {setWorkout} from './workout'

// const GET_EXERCISE = 'GET_EXERCISE';
const CREATE_ROUTINE = 'CREATE_ROUTINE'
//const UPDATE_ROUTINE = 'UPDATE_ROUTINE';
const REMOVE_ROUTINE = 'REMOVE_ROUTINE'

const GET_ALL_ROUTINES = 'GET_ALL_ROUTINES'

const createRoutine = routine => ({
  type: CREATE_ROUTINE,
  routine
})

const removeRoutine = routineId => ({
  type: REMOVE_ROUTINE,
  routineId
})

// const updateRoutine = routine => ({
//   type: UPDATE_ROUTINE,
//   routine,
// });

const getAllRoutines = routines => ({
  type: GET_ALL_ROUTINES,
  routines
})

export const createRoutineThunk = routine => async dispatch => {
  try {
    const response = await axios.post(`${ngrok}/api/routines/`, routine)
    dispatch(createRoutine(response.data))
    return response.data
  } catch (err) {
    console.error(err)
  }
}

export const createAndStartRoutineThunk = routine => async dispatch => {
  try {
    const response = await axios.post(`${ngrok}/api/routines/`, routine)
    dispatch(createRoutine(response.data))
    dispatch(setRoutine(response.data))
    // dispatch(setWorkout(response.data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteRoutineThunk = routineId => async dispatch => {
  try {
    const response = await axios.delete(`${ngrok}/api/routines/${routineId}`)
    dispatch(removeRoutine(routineId))
  } catch (error) {
    console.error(error)
  }
}

export const getMyRoutinesThunk = () => async dispatch => {
  try {
    const response = await axios.get(`${ngrok}/api/users/myRoutines`)
    dispatch(getAllRoutines(response.data))
  } catch (err) {
    console.error(err)
  }
}

const initialState = []

//should be a GET_ROUTINES probably
const routinesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ROUTINE:
      return [...state, action.routine]
    case REMOVE_ROUTINE:
      return state.filter(routine => routine.id !== action.routineId)
    case GET_ALL_ROUTINES:
      return action.routines
    default:
      return state
  }
}
export default routinesReducer
