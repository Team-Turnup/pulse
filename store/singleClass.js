import axios from 'axios'
import {ngrok} from '../ngrok'
import {setRoutine} from './routine'

// const GET_EXERCISE = 'GET_EXERCISE';
const SET_CLASS = 'SET_CLASS'
const REMOVE_CLASS = 'REMOVE_CLASS'

const setClass = singleClass => ({
  type: SET_CLASS,
  singleClass
})

const removeClass = () => ({
  type: REMOVE_CLASS
})

export const leaveClass = classId => async dispatch => {
  try {
    await axios.delete(`${ngrok}/api/classes/${classId}`)
    dispatch(removeClass())
  } catch (error) {
    console.error(error)
  }
}

export const enrollClass = classId => async dispatch => {
  try {
    const {
      data: {routine, ..._class}
    } = await axios.post(`${ngrok}/api/classes/${classId}`)
    _class.when = Date.parse(_class.when)
    dispatch(setClass(_class))
    dispatch(setRoutine(routine))
  } catch (error) {
    console.error(error)
  }
}

export const getClassThunk = id => async dispatch => {
  try {
    const {
      data: {routine, ..._class}
    } = await axios.get(`${ngrok}/api/classes/${id}`)
    _class.when = Date.parse(_class.when)
    dispatch(setClass(_class))
    dispatch(setRoutine(routine))
  } catch (err) {
    console.error(err)
  }
}

export const createClassThunk = singleClass => async dispatch => {
  try {
    const {
      data: {routine, ..._class}
    } = await axios.get(`${ngrok}/api/classes/`, singleClass)
    _class.when = Date.parse(_class.when)
    dispatch(setClass(_class))
    dispatch(setRoutine(routine))
  } catch (err) {
    console.error(err)
  }
}

// this no longer means that the instructor is deleting the class now with
// leaveClass thunk sending a DELETE to :classId. May need to clean this up
// export const deleteClassThunk = classId => async dispatch => {
//   try {
//     await axios.delete(`${ngrok}/api/class/${classId}`)
//     dispatch(removeClass())
//   } catch (error) {
//     console.error(error)
//   }
// }

const initialState = {
  id: 0,
  name: '',
  canEnroll: true,
  when: 0,
  attendees: []
}

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLASS:
      return action.singleClass
    case REMOVE_CLASS:
      return initialState
    default:
      return state
  }
}
export default classReducer
