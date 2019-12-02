import axios from 'axios'
import {ngrok} from '../ngrok'
import {setRoutine} from './routine'

// const GET_EXERCISE = 'GET_EXERCISE';
const GET_CLASS = 'GET_CLASS'
//const UPDATE_CLASS = 'UPDATE_CLASS';
const REMOVE_CLASS = 'REMOVE_CLASS'
const ENROLL_INTO_CLASS = 'ENROLL_INTO_CLASS'
const LEAVE_CLASS = 'LEAVE_CLASS'

const getClass = singleClass => ({
  type: GET_CLASS,
  singleClass
})

const removeClass = () => ({
  type: REMOVE_CLASS
})

const enrollIntoClass = (classId, studentId) => ({
  type: ENROLL_INTO_CLASS,
  classId,
  studentId
})

const unenrollFromClass = (classId, studentId) => ({
  type: LEAVE_CLASS,
  classId,
  studentId
})

export const leaveClass = (classId, studentId) => async dispatch => {
  try {
    console.log('CLASSID from THUNK', classId)
    console.log('STUDENTID from THUNK', studentId)

    const response = await axios.delete(`${ngrok}/api/classes/`, {
      classId,
      studentId
    })
    console.log('response.dataAaaa', response.data)
    // dispatch(unenrollFromClass(response.data))
  } catch (error) {
    console.error(error)
  }
}

export const enrollClass = (classId, studentId) => async dispatch => {
  try {

      const response = await axios.post(`${ngrok}/api/classes/`, {
      classId,
      studentId
    })
    dispatch(enrollIntoClass(response.data))
  } catch (error) {
    console.error(error)
  }
}

export const getClassThunk = id => async dispatch => {
  try {
    const {
      data: {routine, ...singleClass}
    } = await axios.get(`${ngrok}/api/class/${id}`)
    dispatch(getClass(singleClass))
    dispatch(setRoutine(routine))
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

//should be a GET_ROUTINES probably
const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLASS:
      return action.singleClass
    case REMOVE_CLASS:
      return initialState
    case ENROLL_INTO_CLASS:
      return {...state, attendees: [...state.attendees, action.studentId]}
    case LEAVE_CLASS:
      return {
        ...state,
        attendees: state.attendees.filter(
          student => student.id !== action.studentId
        )}
    default:
      return state
  }
}
export default classReducer
