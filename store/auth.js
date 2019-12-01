import {AsyncStorage} from 'react-native'
import {combineReducers} from 'redux'

export const getToken = token => ({
  type: 'GET_TOKEN',
  token
})

export const saveToken = token => ({
  type: 'SAVE_TOKEN',
  token
})

export const removeToken = () => ({
  type: 'REMOVE_TOKEN'
})

export const loading = bool => ({
  type: 'LOADING',
  isLoading: bool
})

export const error = error => ({
  type: 'ERROR',
  error
})

export const getUserToken = () => dispatch =>
  AsyncStorage.getItem('userToken')
    .then(data => {
      dispatch(loading(false))
      dispatch(getToken(data))
    })
    .catch(err => {
      dispatch(loading(false))
      dispatch(error(err.message || 'ERROR'))
    })

export const saveUserToken = data => dispatch =>
  AsyncStorage.setItem('userToken', 'abc')
    .then(data => {
      dispatch(loading(false))
      dispatch(saveToken('token saved'))
    })
    .catch(err => {
      dispatch(loading(false))
      dispatch(error(err.message || 'ERROR'))
    })

export const removeUserToken = () => dispatch =>
  AsyncStorage.removeItem('userToken')
    .then(data => {
      dispatch(loading(false))
      dispatch(removeToken(data))
    })
    .catch(err => {
      dispatch(loading(false))
      dispatch(error(err.message || 'ERROR'))
    })

const authReducer = (
  state = {
    token: {},
    loading: true,
    error: null
  },
  action
) => {
  switch (action.type) {
    case 'GET_TOKEN':
      return {...state, token: action.token}
    case 'SAVE_TOKEN':
      return {...state, token: action.token}
    case 'REMOVE_TOKEN':
      return {...state, token: action.token}
    case 'LOADING':
      return {...state, loading: action.isLoading}
    case 'ERROR':
      return {...state, error: action.error}
    default:
      return state
  }
}

export default combineReducers({
  token: authReducer
})
