import axios from 'axios'
import {ngrok} from '../ngrok'

const SET_MY_CLASSES = 'SET_MY_CLASSES'

export const setMyClasses = myClasses => ({
  type: SET_MY_CLASSES,
  myClasses
})

export const getMyClassesThunk = () => async dispatch => {
  try {
    const response = await axios.get(`${ngrok}/api/users/myClasses`)
    dispatch(setMyClasses(response.data))
  } catch (err) {
    console.error(err)
  }
}

const initialState = []

const myClassesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MY_CLASSES:
      return action.myClasses
    default:
      return state
  }
}
export default myClassesReducer
