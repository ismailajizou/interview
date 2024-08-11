import axios from "axios";
import { Task } from "../types/task.type";

// API
export const getTasks = async () => {
  const response = await axios.get<{ tasks: Task[] }>(
    "http://localhost:8000/api/tasks"
  );
  return response.data.tasks;
};

export const getTask = async (id: string) => {
  const response = await axios.get<{ task: Task }>(
    `http://localhost:8000/api/tasks/${id}`
  );
  return response.data.task;
};

export const createTask = async (task: Pick<Task, 'body'>) => {
  const response = await axios.post<{ task: Task }>(
    "http://localhost:8000/api/tasks",
    task
  );
  return response.data.task;
};

export const updateTask = async (task: Pick<Task, "_id" | "status">) => {
  const response = await axios.put<{ task: Task }>(
    `http://localhost:8000/api/tasks/${task._id}`,
    { status: task.status }
  );
  return response.data.task;
};

export const removeTask = async (id: string) => {
  await axios.delete(`http://localhost:8000/api/tasks/${id}`);
};
