import axios from "axios";

//action types
const FETCH_SCORE = "FETCH_SCORE";

// action creator

export const setScore = (score) => ({
  type: FETCH_SCORE,
  score: score,
});

// thunk creator
export const fetchScore = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/score/${id}`);
      //console.log("response", response);
      const score = response.data;
      dispatch(setScore(score));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCORE:
      return [...action.score];
    default:
      return state;
  }
};

export default scoreReducer;
