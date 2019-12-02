import axios from 'axios'
import {ngrok} from '../ngrok'

// const GET_EXERCISE = 'GET_EXERCISE';
const GET_OPTION = 'GET_OPTION'

export const getOption = option => ({
  type: GET_OPTION,
  option
})

// export const thunk = id => async dispatch => {
//   try {
//     const response = await axios.get(`/api/options/${id}`);
//     dispatch(getOption(response.data));
//   } catch (err) {
//     console.error(err);
//   }
// };

const initialState = {}

//should be a GET_OPTIONS probably
const optionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OPTION:
      return action.option
    default:
      return state
  }
}
export default optionReducer
