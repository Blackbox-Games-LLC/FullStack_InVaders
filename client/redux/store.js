import { createStore, applyMiddleware } from "redux";
import loggingMiddleware from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./reducer";

export default createStore(reducer, applyMiddleware(thunk, loggingMiddleware));
