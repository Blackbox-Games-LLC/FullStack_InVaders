import axios from "axios";

//action types
const FETCH_USER = "FETCH_USER";
const CLEAR = "CLEAR"

// action creator

export const clearUser = () => ({
  type: CLEAR,
})

export const setUser = (user) => ({
  type: FETCH_USER,
  user,
});

export const registerUser = (username) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/register`, {
        username,
      });
      dispatch(setUser(response.data));
    } catch (err) {
      return dispatch(setUser({ error: err }));
    }
  };
};

export const loginUser = (username) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/login`, {
        username,
      });
      dispatch(setUser(response.data));
    } catch (err) {
      console.log(err)
      return dispatch(setUser({ error: err }));
    }
  };
};

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...action.user };
    case CLEAR:
      return initialState
    default:
      return state;
  }
};

export default userReducer;
