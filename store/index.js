import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import routines from './routines'
import routine from './routine'
import users from './users'
import classes from './classes'
import singleClass from './singleClass'
import authReducer from './auth'
import socket from './socket'

const reducer = combineReducers({
  routine,
  routines,
  users,
  singleClass,
  authReducer,
  classes,
  socket
})
const middleware = composeWithDevTools(
  // applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
  applyMiddleware(thunkMiddleware)
)
const store = createStore(reducer, middleware)

export default store
