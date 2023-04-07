import { combineReducers } from "redux";
import counterReducer from "./counterReducer.js";


const reducers=combineReducers({
    counter:counterReducer
})

export default reducers