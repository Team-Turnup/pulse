import axios from 'axios'
import {ngrok} from '../ngrok'

// const GET_EXERCISE = 'GET_EXERCISE';
const SET_ROUTINE = 'SET_ROUTINE'

export const setRoutine = routine => ({
  type: SET_ROUTINE,
  routine
})

// export const thunk = id => async dispatch => {
//   try {
//     const response = await axios.get(`/api/routines/${id}`);
//     dispatch(getRoutine(response.data));
//   } catch (err) {
//     console.error(err);
//   }
// };

export const getRoutineThunk = id => async dispatch => {
  try {
    const response = await axios.get(`${ngrok}/api/routines/${id}`)
    dispatch(setRoutine(response.data))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {}

//should be a GET_ROUTINES probably
const routineReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROUTINE:
      return action.routine
    default:
      return state
  }
}
export default routineReducer
