import axios from 'axios'
import {ngrok} from '../ngrok'
import {switchStatement} from '@babel/types'

const SET_MY_CLASSES = 'SET_MY_CLASSES'
const ADD_NEW_CLASS = 'ADD_NEW_CLASS'

export const setMyClasses = myClasses => ({
  type: SET_MY_CLASSES,
  myClasses
})

export const addNewClass = newClass => ({
  type: ADD_NEW_CLASS,
  newClass
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
    case ADD_NEW_CLASS:
      console.log("you're adding a class")
      return [...state, action.newClass]
    case SET_MY_CLASSES:
      return action.myClasses
    default:
      return state
  }
}
export default myClassesReducer
