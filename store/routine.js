import axios from 'axios';

const GET_EXERCISE = 'GET_EXERCISE';
const GET_ROUTINE = 'GET_ROUTINE';

const getExercise = exercise => ({
  type: GET_EXERCISE,
  exercise,
});

export const getExerciseThunk = () => async dispatch => {
  try {
  } catch (err) {
    console.error(err);
  }
};
