import { login, me, register } from "@/controllers/auth.controller";
import { body } from "@/middlewares/validation.middleware";
import User, { IUser } from "@/models/user.model";
import { registerSchema } from "@/validators/auth/register.validator";
import express from "express";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { z } from "zod";

const router = express.Router();

router.post(
  "/login",
  body(
    z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })
  ),
  login
);

router.post("/register", body(registerSchema), register);

router.get("/me", passport.authenticate("jwt", { session: false }), me);

export default router;
