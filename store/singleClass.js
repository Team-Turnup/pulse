import axios from 'axios'
import {ngrok} from '../ngrok'
import {setRoutine} from './routine'

// const GET_EXERCISE = 'GET_EXERCISE';
const GET_CLASS = 'GET_CLASS'
const CREATE_CLASS = 'CREATE_CLASS'
const REMOVE_CLASS = 'REMOVE_CLASS'
const ENROLL_INTO_CLASS = 'ENROLL_INTO_CLASS'
const LEAVE_CLASS = 'LEAVE_CLASS'

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
    const response = await axios.delete(`${ngrok}/api/classes/${classId}`)
    // dispatch(unenrollFromClass(response.data))
  } catch (error) {
    console.error(error)
  }
}

export const enrollClass = (classId, studentId) => async dispatch => {
  try {
    const response = await axios.post(`${ngrok}/api/classes/${classId}`)
    dispatch(enrollIntoClass(response.data))
  } catch (error) {
    console.error(error)
  }
}

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
    dispatch(createClass(data))
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
    case ENROLL_INTO_CLASS:
      return {...state, attendees: [...state.attendees, action.studentId]}
    case LEAVE_CLASS:
      return {
        ...state,
        attendees: state.attendees.filter(
          student => student.id !== action.studentId
        )
      }
    default:
      return state
  }
}
export default classReducer
