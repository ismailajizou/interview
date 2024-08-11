// src/sagas/index.js
import { all } from "redux-saga/effects";
import taskSaga from "./task.saga";

export default function* rootSaga() {
  yield all([
    taskSaga(),
    // Add other sagas here
  ]);
}
