import axios from 'axios'
import {ngrok} from '../ngrok'
import {setRoutine} from './routine'

// const GET_EXERCISE = 'GET_EXERCISE';
const GET_CLASS = 'GET_CLASS'
const CREATE_CLASS = 'CREATE_CLASS'
const REMOVE_CLASS = 'REMOVE_CLASS'

const getClass = singleClass => ({
  type: GET_CLASS,
  singleClass
})

const createClass = singleClass => ({
  type: CREATE_CLASS,
  singleClass
})

const removeClass = () => ({
  type: REMOVE_CLASS
})

export const getClassThunk = id => async dispatch => {
  try {
    const {
      data: {routine, ...singleClass}
    } = await axios.get(`${ngrok}/api/classes/${id}`)
    dispatch(getClass(singleClass))
    // dispatch(setRoutine(routine))
  } catch (err) {
    console.error(err)
  }
}

export const createClassThunk = singleClass => async dispatch => {
  try {
    const {data} = await axios.post(`${ngrok}/api/classes/`, singleClass)
    console.log('create class thunk')
    dispatch(createClass(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteRoutineThunk = classId => async dispatch => {
  try {
    await axios.delete(`${ngrok}/api/routines/${classId}`)
    dispatch(removeClass())
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  id: 0,
  name: '',
  canEnroll: true,
  when: new Date(null),
  attendees: []
}

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLASS:
      return action.singleClass
    case CREATE_CLASS:
      return {...state, ...action.singleClass}
    case REMOVE_CLASS:
      return initialState
    default:
      return state
  }
}
export default classReducer
