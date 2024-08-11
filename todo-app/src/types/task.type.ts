export interface Task {
  _id: string;
  body: string;
  status: "DONE" | "CANCELLED" | "PENDING";
  createdAt: string;
  updatedAt: string;
}
