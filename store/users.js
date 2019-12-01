import axios from 'axios'
import {ngrok} from '../ngrok'

//ACTION TYPES
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const CHANGE_USER_INFO = 'CHANGE_USER_INFO'
const ADD_USER = 'ADD_USER'

//ACTION CREATORS
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const changeUserInfo = userId => ({type: CHANGE_USER_INFO, userId})

//THUNKS

export const me = () => async dispatch => {
  try {
    const response = await axios.get(`auth/me`)
    dispatch(getUser(response.data || defaultUser))
  } catch (error) {
    console.error(error)
  }
}

// export const auth = (
//   email,
//   password,
//   method
//   // firstName,
//   // lastName
// ) => async dispatch => {
//   let res
//   try {
//     if (method === 'signup') {
//       res = await axios.post('/auth/signup', {
//         email,
//         password
//         // firstName,
//         // lastName
//       })
//     } else if (method === 'login') {
//       res = await axios.post('/auth/login', {email, password})
//     }
//   } catch (authError) {
//     return dispatch(getUser({error: authError}))
//   }
//   try {
//     dispatch(getUser(res.data))
//     //history.push('/home')
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr)
//   }
// }

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
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
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
      console.log('USERFROMREDUCER', action.user.id)
      return action.user
    case REMOVE_USER:
      return defaultUser
    case CHANGE_USER_INFO:
      return state.map(user => {
        return user
      })
    default:
      return state
  }
}

// async () => {
//   try{
//     await AsyncStorage.setItem('userId', action.user.id)
//   } catch(error){
//     console.error(error)
//   }
// }
