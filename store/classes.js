import axios from 'axios';
import {ngrok} from '../ngrok'

const GET_CLASSES = 'GET_CLASSES'

const getClasses = classes =>({type:GET_CLASSES,classes})

export const fetchClasses = () => async dispatch =>{
  try{
    console.log('getting to the thunk')
    const response = await axios.get(`${ngrok}/api/classes`)
    dispatch(getClasses(response.data))
  } catch (error){
    console.error(error)
  }
}

const initialState = []

const classesReducer = (state = initialState, action) => {
  switch(action.type){
    case GET_CLASSES:
      return action.classes
    default:
      return state
  }
}

export default classesReducer
