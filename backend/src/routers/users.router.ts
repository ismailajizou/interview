import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "@/controllers/users.controller";
import { body } from "@/middlewares/validation.middleware";
import { createUserSchema } from "@/validators/user/create.validator";
import { updateUserSchema } from "@/validators/user/update.validator";
import express from "express";

const router = express.Router();

router.get("/", getAll);

router.post("/", body(createUserSchema), create);

router.get("/:id", getOne);

router.put("/:id", body(updateUserSchema), update);

router.delete("/:id", remove);

export default router;
