import axios from 'axios'
import {ngrok} from '../ngrok'
import {setRoutine} from './routine'
import {setWorkout} from './workout'

// const GET_EXERCISE = 'GET_EXERCISE';
const GET_CLASS = 'GET_CLASS'
const CREATE_CLASS = 'CREATE_CLASS'
//const UPDATE_CLASS = 'UPDATE_CLASS';
const REMOVE_CLASS = 'REMOVE_CLASS'

const getClass = singleClass => ({
  type: GET_CLASS,
  singleClass
})

const createClass = singleClass => ({
  type: CREATE_CLASS,
  singleClass
})

const removeClass = classId => ({
  type: REMOVE_CLASS,
  classId
})

export const getClassThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`${ngrok}/api/class/${id}`)
    dispatch(getClass(data))
  } catch (err) {
    console.error(err)
  }
}

export const createClassThunk = singleClass => async dispatch => {
  try {
    const {data} = await axios.post(`${ngrok}/api/class/`, singleClass)
    dispatch(getClass(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteRoutineThunk = classId => async dispatch => {
  try {
    await axios.delete(`${ngrok}/api/routines/${classId}`)
    dispatch(removeClass(classId))
  } catch (error) {
    console.error(error)
  }
}

initialState = {
  id: 0,
  name: '',
  canEnroll: true,
  when: new Date(null),
  routine: []
}

//should be a GET_ROUTINES probably
const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLASS:
      return action.singleClass
    case CREATE_CLASS:
      return [...state, action.singleClass]
    case REMOVE_CLASS:
      return state.filter(singleClass => singleClass.id !== action.classId)
    case GET_ALL_ROUTINES:
      return action.routines
    default:
      return state
  }
}
export default classReducer
