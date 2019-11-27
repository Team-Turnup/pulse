import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import routines from './routines';
import routine from './routine';
import users from './users'
import classes from './classes'

const reducer = combineReducers({
  routine,
  routines,
  users,
  classes
})
const middleware = composeWithDevTools(
  // applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
  applyMiddleware(thunkMiddleware)
);
const store = createStore(reducer, middleware);

export default store
