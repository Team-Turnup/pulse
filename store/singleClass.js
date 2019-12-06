import axios from 'axios'
import {ngrok} from '../ngrok'
import {setRoutine} from './routine'
import {getMyClassesThunk} from './myClasses'

const SET_CLASS = 'SET_CLASS'
const REMOVE_CLASS = 'REMOVE_CLASS'
const SET_READY_ATTENDEES = 'SET_READY_ATTENDEES'
const ADD_NEW_ATTENDEE = 'ADD_NEW_ATTENDEE'
const REMOVE_ATTENDEE = 'REMOVE_ATTENDEE'
const SET_USER_COLORS = 'SET_USER_COLORS'
const SET_USER_OPACITY = 'SET_USER_OPACITY'
const INITIALIZE_COLOR_OPACITY = 'INITIALIZE_COLOR_OPACITY'
const UPDATE_START_TIME = 'UPDATE_START_TIME'
const UPDATE_TIMESTAMPS = 'UPDATE_TIMESTAMPS'

export const setClass = singleClass => ({
  type: SET_CLASS,
  singleClass
})

export const removeClass = () => ({
  type: REMOVE_CLASS
})

export const setReadyAttendees = attendees => ({
  type: SET_READY_ATTENDEES,
  attendees
})

export const addNewAttendee = (attendee, color) => ({
  type: ADD_NEW_ATTENDEE,
  attendee,
  color
})

export const removeAttendee = id => ({
  type: REMOVE_ATTENDEE,
  id
})

export const setUserColors = userColors => ({
  type: SET_USER_COLORS,
  userColors
})

export const setUserOpacity = (userId, opacity) => ({
  type: SET_USER_OPACITY,
  userId,
  opacity
})

export const initializeColorOpacity = attendees => ({
  type: INITIALIZE_COLOR_OPACITY,
  attendees
})

export const updateStartTime = when => ({
  type: UPDATE_START_TIME,
  when
})

export const updateTimestamps = (userId, timestamps, latest) => ({
  type: UPDATE_TIMESTAMPS,
  userId,
  timestamps,
  latest
})

export const leaveClass = classId => async dispatch => {
  try {
    await axios.delete(`${ngrok}/api/classes/${classId}`)
    dispatch(removeClass())
    dispatch(getMyClassesThunk())
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
    dispatch(getMyClassesThunk())
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
    } = await axios.post(`${ngrok}/api/classes/`, singleClass)

    _class.when = Date.parse(_class.when)
    dispatch(setClass(_class))
    dispatch(setRoutine(routine))
    dispatch(getMyClassesThunk())
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  id: 0,
  name: '',
  canEnroll: true,
  when: 0,
  attendees: [],
  userColors: {},
  userOpacities: {},
  userTimestamps: {},
  userLatest: {}
}

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLASS:
      return action.singleClass
    case REMOVE_CLASS:
      return initialState
    case SET_READY_ATTENDEES:
      return {
        ...state,
        attendees: state.attendees.map(a =>
          action.attendees.includes(a.id)
            ? {...a, ready: true}
            : {...a, ready: false}
        )
      }
    case ADD_NEW_ATTENDEE:
      return {
        ...state,
        attendees: state.attendees.includes(action.attendee)
          ? state.attendees
          : [...state.attendees, action.attendee],
        userColors: {...state.userColors, [action.userId]: action.color}
      }
    case REMOVE_ATTENDEE:
      return {
        ...state,
        attendees: state.attendees.filter(({id}) => id !== action.id)
      }
    case SET_USER_COLORS:
      return {
        ...state,
        userColors: action.userColors
      }
    case SET_USER_OPACITY:
      return {
        ...state,
        userOpacities: {...state.userOpacities, [action.userId]: action.opacity}
      }
    case INITIALIZE_COLOR_OPACITY:
      return {
        ...state,
        userColors: action.attendees.reduce(
          (a, {id}) => ({...a, [id]: '#ffffff'}),
          {}
        ),
        userOpacities: action.attendees.reduce(
          (a, {id}) => ({...a, [id]: 0.3}),
          {}
        )
      }
    case UPDATE_START_TIME:
      return {...state, when: action.when}
    case UPDATE_TIMESTAMPS:
      return {
        ...state,
        userTimestamps: {
          ...state.userTimestamps,
          [action.userId]: action.timestamps
        },
        userLatest: {...state.userLatest, [action.userId]: action.latest}
      }
    default:
      return state
  }
}
export default classReducer
