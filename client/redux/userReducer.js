import axios from "axios";

//action types
const FETCH_USER = "FETCH_USER";

// action creator

export const setUser = (user) => ({
  type: FETCH_USER,
  user,
});

export const fetchUser = (username) => {
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

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...action.user };
    default:
      return state;
  }
};

export default userReducer;
