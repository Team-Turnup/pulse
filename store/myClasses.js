import axios from 'axios'
import {ngrok} from '../ngrok'

// const GET_EXERCISE = 'GET_EXERCISE';
const SET_MY_CLASSES = 'SET_MY_CLASSES'

export const setMyClasses = myClasses => ({
  type: SET_MY_CLASSES,
  myClasses
})

export const getMyClassesThunk = () => async dispatch => {
  try {
    const response = await axios.get(`${ngrok}/api/users/myClasses`)
    console.log('in myClasses thunk', response.data)
    dispatch(setMyClasses(response.data))
  } catch (err) {
    console.error(err)
  }
}

const initialState = []

//should be a GET_MY_CLASSESS probably
const myClassesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MY_CLASSES:
      return action.myClasses
    default:
      return state
  }
}
export default myClassesReducer
