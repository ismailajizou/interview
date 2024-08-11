import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types/task.type";
import type { RootState } from "../store";

export interface TaskState {
  data: Task[];
  loading: boolean;
  createIsLoading: boolean;
  updateIsLoading: boolean;
  removeIsLoading: boolean;
  fetchAllError: string | null;
  createError: string | null;
  updateError: string | null;
  removeError: string | null;
}

const initialState: TaskState = {
  data: [],
  loading: false,
  createIsLoading: false,
  updateIsLoading: false,
  removeIsLoading: false,
  fetchAllError: null,
  createError: null,
  updateError: null,
  removeError: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchAllIsLoading(state) {
      state.loading = true;
      state.fetchAllError = null;
    },
    fetchAllSucceeded(state, action: PayloadAction<Task[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchAllFailure(state, action: PayloadAction<string>) {
      state.fetchAllError = action.payload;
      state.loading = false;
    },
    createIsLoading(state) {
      state.createIsLoading = true;
      state.createError = null;
    },
    createTaskSucceeded(state, action: PayloadAction<Task>) {
      state.data.push(action.payload);
      state.createIsLoading = false;
    },
    createTaskFailure(state, action: PayloadAction<string>) {
      state.createError = action.payload;
      state.createIsLoading = false;
    },
    updateIsLoading(state) {
      state.updateIsLoading = true;
      state.updateError = null;
    },
    updateTaskSucceeded(state, action: PayloadAction<Task>) {
      state.data = state.data.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
      state.updateIsLoading = false;
    },
    updateTaskFailure(state, action: PayloadAction<string>) {
      state.updateError = action.payload;
      state.updateIsLoading = false;
    },
    removeIsLoading(state) {
      state.removeIsLoading = true;
      state.removeError = null;
    },
    removeTaskSucceeded(state, action: PayloadAction<string>) {
      state.data = state.data.filter((task) => task._id !== action.payload);
      state.removeIsLoading = false;
    },
    removeTaskFailure(state, action: PayloadAction<string>) {
      state.removeError = action.payload;
      state.removeIsLoading = false;
    },
  },
});


// Action Creators
export const taskActions = {
  fetchAllIsLoading: tasksSlice.actions.fetchAllIsLoading,
  fetchAllSucceeded: tasksSlice.actions.fetchAllSucceeded,
  fetchAllFailure: tasksSlice.actions.fetchAllFailure,

  // Using proper typing for the payload of these actions
  createIsLoading: createAction<Pick<Task, "body">>(
    `${tasksSlice.name}/createIsLoading`
  ),
  createTaskSucceeded: tasksSlice.actions.createTaskSucceeded,
  createTaskFailure: tasksSlice.actions.createTaskFailure,

  updateIsLoading: createAction<Pick<Task, "_id" | "status">>(
    `${tasksSlice.name}/updateIsLoading`
  ),
  updateTaskSucceeded: tasksSlice.actions.updateTaskSucceeded,
  updateTaskFailure: tasksSlice.actions.updateTaskFailure,

  removeIsLoading: createAction<string>(
    `${tasksSlice.name}/removeIsLoading`
  ),
  removeTaskSucceeded: tasksSlice.actions.removeTaskSucceeded,
  removeTaskFailure: tasksSlice.actions.removeTaskFailure,
};

export const selectTasks = (state: RootState): TaskState => state.tasks;

export default tasksSlice.reducer;
