import axios from 'axios';

// const GET_EXERCISE = 'GET_EXERCISE';
const GET_ROUTINE = 'GET_ROUTINE';
const CREATE_ROUTINE = 'CREATE_ROUTINE';
//const UPDATE_ROUTINE = 'UPDATE_ROUTINE';

const getRoutine = routine => ({
  type: GET_ROUTINE,
  routine,
});

const createRoutine = routine => ({
  type: CREATE_ROUTINE,
  routine,
});

// const updateRoutine = routine => ({
//   type: UPDATE_ROUTINE,
//   routine,
// });

export const getRoutineThunk = id => async dispatch => {
  try {
    const response = await axios.get(`/api/routines/${id}`);
    dispatch(getRoutine(response.data));
  } catch (err) {
    console.error(err);
  }
};

export const createRoutineThunk = routine => async dispatch => {
  try {
    const response = await axios.create(`/api/routines/${id}`);
    dispatch(createRoutine(response.data));
  } catch (err) {
    console.error(err);
  }
};

//should be a GET_ROUTINES probably
const routinesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ROUTINE:
      return action.routine;
    case CREATE_ROUTINE:
      return [...state, action.routine];
    default:
      return state;
  }
};
export default routinesReducer;
