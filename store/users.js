import axios from "axios";

//ACTION TYPES
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const CHANGE_USER_INFO = 'CHANGE_USER_INFO'


//ACTION CREATORS
const getUser = user => ({type: GET_USER,user})
const removeUser = () => ({type: REMOVE_USER})
const changeUserInfo = userId => ({type: CHANGE_USER_INFO, userId})

//INITIALSTATE
const defaultUser = {}

//THUNKS

export const changeUserInfoThunk = userId => {
  try{
    const response = await.put(`api/users/${userId}`, {userId})
    dispatch(changeUserInfo(userId))
  } catch (error) {
    console.error(error)
  }
}

export const me = () => async dispatch =>{
  try{
    const response = await axios.get(`auth/me`)
    dispatch(getUser(response.data || defaultUser))

  } catch(error){
    console.error(error)
  }
}

export const auth = (
  email,
  password,
  method,
  firstName,
  lastName
) => async dispatch => {
  let res
  try {
    if (method === 'signup') {
      res = await axios.post('/auth/signup', {email, password, firstName, lastName})
    } else if (method === 'login') {
      res = await axios.post('/auth/login', {email, password})
    }
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
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

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
