import { createStore, applyMiddleware, combineReducers } from "redux";
import loggingMiddleware from "redux-logger";
import thunk from "redux-thunk";
import scoreReducer from "./scoreReducer.js";
import userReducer from "./userReducer.js";

const reducer = combineReducers({
  score: scoreReducer,
  user: userReducer,
});

export default createStore(reducer, applyMiddleware(thunk, loggingMiddleware));
