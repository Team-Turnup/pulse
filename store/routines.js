import axios from 'axios'
import {ngrok} from '../ngrok'
import {setRoutine} from './routine'
import {setWorkout} from './workout'

// const GET_EXERCISE = 'GET_EXERCISE';
const GET_ROUTINE = 'GET_ROUTINE'
const CREATE_ROUTINE = 'CREATE_ROUTINE'
//const UPDATE_ROUTINE = 'UPDATE_ROUTINE';
const REMOVE_ROUTINE = 'REMOVE_ROUTINE'

const GET_ALL_ROUTINES = 'GET_ALL_ROUTINES'

const getRoutine = routine => ({
  type: GET_ROUTINE,
  routine
})

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

export const getRoutineThunk = id => async dispatch => {
  try {
    const response = await axios.get(`/api/routines/${id}`)
    dispatch(getRoutine(response.data))
  } catch (err) {
    console.error(err)
  }
}

export const createRoutineThunk = routine => async dispatch => {
  try {
    const response = await axios.post(`${ngrok}/api/routines/`, routine)
    dispatch(createRoutine(response.data))
  } catch (err) {
    console.error(err)
  }
}

export const createAndStartRoutineThunk = routine => async dispatch => {
  try {
    const response = await axios.post(`${ngrok}/api/routines/`, routine)
    dispatch(createRoutine(response.data))
    dispatch(setRoutine(response.data))
    dispatch(setWorkout(response.data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteRoutineThunk = routineId => async dispatch => {
  try {
    const respone = await axios.delete(`api/routines/${routineId}`)
    dispatch(removeRoutine(routineId))
  } catch (error) {
    console.error(error)
  }
}

export const getAllRoutinesThunk = () => async dispatch => {
  try {
    const response = await axios.get(`${ngrok}/api/routines`)
    console.log("response.data", response.data)
    dispatch(getAllRoutines(response.data))
  } catch (err) {
    console.error(err)
  }
}

initialState = []

//should be a GET_ROUTINES probably
const routinesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROUTINE:
      return action.routine
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
