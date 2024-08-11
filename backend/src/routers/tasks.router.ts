import tasksController from "@/controllers/tasks.controller";
import { body } from "@/middlewares/validation.middleware";
import { createTaskSchema } from "@/validators/task/create.validator";
import { updateTaskSchema } from "@/validators/task/update.validator";
import express from "express";

const router = express.Router();

router.get("/", tasksController.getAll);

router.post("/", body(createTaskSchema), tasksController.create);

router.get("/:id", tasksController.getOne);

router.put("/:id", body(updateTaskSchema), tasksController.update);

router.delete("/:id", tasksController.remove);

export default router;
