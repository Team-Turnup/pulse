import axios from 'axios';
import {ngrok} from '../ngrok'
import { debuggerStatement } from '@babel/types';

const GET_CLASSES = 'GET_CLASSES'

const getClasses = classes =>({type:GET_CLASSES,classes})

export const fetchClasses = () => async dispatch =>{
  try{
    const response = await axios.get(`${ngrok}/api/classes`)
    dispatch(getClasses(response.data))
  } catch (error){
    console.error(error)
  }
}

initialState = []

const classesReducer = (state = initialState, action) => {
  switch(action.type){
    case GET_CLASSES:
      return action.classes
    default:
      return state
  }
}

export default classesReducer
