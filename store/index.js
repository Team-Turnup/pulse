import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import routines from './routines'
import routine from './routine'
import user from './user'
import classes from './classes'
import singleClass from './singleClass'
import option from './option'
import myClasses from './myClasses'
import socket from './socket'
import workout from './workout'
import workouts from './workouts'

const reducer = combineReducers({
  routine,
  routines,
  user,
  singleClass,
  classes,
  option,
  myClasses,
  workout,
  workouts
})
const middleware = composeWithDevTools(
  //applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
  applyMiddleware(thunkMiddleware)
)
const store = createStore(reducer, middleware)

export default store
