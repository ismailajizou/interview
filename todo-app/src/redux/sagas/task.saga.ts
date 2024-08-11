import { type SagaIterator } from "@redux-saga/core";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  createTask,
  getTasks,
  removeTask,
  updateTask,
} from "../../api/tasks.api";
import { Task } from "../../types/task.type";
import { taskActions } from "../features/tasks.slice";

// Worker Sagas
export function* onGetTasks(): SagaIterator {
  try {
    const tasks: Task[] = yield call(getTasks);
    yield put(taskActions.fetchAllSucceeded(tasks));
  } catch (e: unknown) {
    if (e instanceof Error)
      yield put(taskActions.fetchAllFailure(e.message.toString()));
  }
}

export function* onCreateTask(action: PayloadAction<Pick<Task, "body">>): SagaIterator {
  try {
    const task: Task = yield call(createTask, action.payload);
    yield put(taskActions.createTaskSucceeded(task));
  } catch (e: unknown) {
    if (e instanceof Error)
      yield put(taskActions.createTaskFailure(e.message.toString()));
  }
}

export function* onRemoveTask(action: PayloadAction<string>): SagaIterator {
  try {
    yield call(removeTask, action.payload);
    yield put(taskActions.removeTaskSucceeded(action.payload));
  } catch (e: unknown) {
    if (e instanceof Error)
      yield put(taskActions.removeTaskFailure(e.message.toString()));
  }
}

export function* onUpdateTask(action: PayloadAction<Pick<Task, "_id" | "status">>): SagaIterator {
  try {
    const task: Task = yield call(updateTask, action.payload);
    yield put(taskActions.updateTaskSucceeded(task));
  } catch (e: unknown) {
    if (e instanceof Error)
      yield put(taskActions.updateTaskFailure(e.message.toString()));
  }
}

// Watcher Saga
function* tasksWatcherSaga(): SagaIterator {
  yield takeEvery(taskActions.fetchAllIsLoading.type, onGetTasks);
  yield takeEvery(taskActions.createIsLoading.type, onCreateTask);
  yield takeEvery(taskActions.updateIsLoading.type, onUpdateTask);
  yield takeEvery(taskActions.removeIsLoading.type, onRemoveTask);
}

export default tasksWatcherSaga;
