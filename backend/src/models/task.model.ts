import mongoose from "mongoose";

export interface ITask extends mongoose.Document {
  body: string;
  status: "DONE" | "CANCELLED" | "PENDING";
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    body: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["DONE", "CANCELLED", "PENDING"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
