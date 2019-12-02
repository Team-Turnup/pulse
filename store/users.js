import axios from 'axios'
import {ngrok} from '../ngrok'

//ACTION TYPES
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const CHANGE_USER_INFO = 'CHANGE_USER_INFO'
const ADD_USER = 'ADD_USER'
const GET_MY_CLASSES = 'GET_MY_CLASSES'

//ACTION CREATORS
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const changeUserInfo = userId => ({type: CHANGE_USER_INFO, userId})
const getMyClasses = myClasses => ({
  type: GET_MY_CLASSES,
  myClasses
})

//THUNKS
export const me = () => async dispatch => {
  try {
    const response = await axios.get(`${ngrok}/auth/me`)
    dispatch(getUser(response.data || defaultUser))
  } catch (error) {
    console.error(error)
  }
}

export const getUserClassesThunk = userId => async dispatch => {
  try {
    const response = await axios.get(`${ngrok}/api/users/${userId}/myClasses`)
    dispatch(getMyClasses(response.data))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (user, method) => async dispatch => {
  let res
  try {
    if (method === 'signup') {
      res = await axios.post(`${ngrok}/auth/${method}`, {
        email: user.email,
        password: user.password
        //role: 'follower',
        //username: user.username,
        //firstname: user.firstname,
        //lastname: user.lastname
      })
    } else if (method === 'login') {
      res = await axios.post(`${ngrok}/auth/${method}`, {
        email: user.email,
        password: user.password
      })
    }
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(res.data))
    //history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post(`${ngrok}/auth/logout`)
    dispatch(removeUser())
    //history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const changeUserInfoThunk = userId => async dispatch => {
  try {
    const response = await axios.put(`api/users/${userId}`, {userId})
    dispatch(changeUserInfo(userId))
  } catch (error) {
    console.error(error)
  }
}

//INITIALSTATE
const defaultUser = {}

//reducer
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case CHANGE_USER_INFO:
      return state.map(user => {
        return user
      })
    case GET_MY_CLASSES:
      return action.myClasses
    default:
      return state
  }
}
