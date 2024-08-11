import Task from "@/models/task.model";
import { Request, Response } from "express";

const getAll = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

const getOne = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).json({
      message: `Task with id ${req.params.id} has been removed`,
    })
  } catch (error) {
    res.status(500).json({ message: "Error removing task", error });
  }
};

export default { getAll, create, getOne, update, remove };
