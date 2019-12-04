import axios from 'axios'
import {ngrok} from '../ngrok'

// const GET_EXERCISE = 'GET_EXERCISE';
const GET_OPTION = 'GET_OPTION'
const UPDATE_OPTION = 'UPDATE_OPTION'

export const getOption = option => ({
  type: GET_OPTION,
  option
})

export const updateOption = option => ({
  type: UPDATE_OPTION,
  option
})

export const updateOptionThunk = option => async dispatch => {
  try {
    await axios.put(`${ngrok}/api/users/options`, option)
    dispatch(updateOption(option))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {}

//should be a GET_OPTIONS probably
const optionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OPTION: {
      return action.option
    }
    case UPDATE_OPTION:
      return {...state, ...action.option}
    default:
      return state
  }
}
export default optionReducer
