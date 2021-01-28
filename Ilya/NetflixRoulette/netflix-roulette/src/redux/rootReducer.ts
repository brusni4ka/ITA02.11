import { combineReducers } from "redux";
import reducer from "./moviesReducer";

export const rootReducer = combineReducers({
    store: reducer,
});