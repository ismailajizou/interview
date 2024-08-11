import { combineReducers } from "@reduxjs/toolkit";
import { tasksSlice } from "./tasks.slice";

const rootReducer = combineReducers({
  tasks: tasksSlice.reducer,
});

export default rootReducer;