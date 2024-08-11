import User, { IUser } from "@/models/user.model";
import { TLogin } from "@/validators/auth/login.validator";
import { TRegister } from "@/validators/auth/register.validator";
import { verify } from "argon2";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

type RequestWithBody<B extends Record<string, unknown>> = Request & { body: B };

export async function login(req: RequestWithBody<TLogin>, res: Response) {
  const user = await User.findOne({ email: req.body.email }, "+password");
  if (!user || !user.password) {
    return res.status(401).json({ message: "Wrong Credentials" });
  }
  const isValid = await verify(user.password, req.body.password);
  if (!isValid) {
    return res.status(401).json({ message: "Wrong Credentials" });
  }
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );
  return res.status(200).json({ accessToken, user });
}

export async function register(req: RequestWithBody<TRegister>, res: Response) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const newUser = await User.create(req.body);
    res.status(201).json({ user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err });
  }
}

export async function me(req: Request, res: Response) {
  const u = req.user as IUser;
  const user = await User.findById(u.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
}
