import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export const body =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      const e = error as ZodError;
      res.status(422).json({
        message: "Unprocessable Entity",
        error: e.errors.reduce(
          (acc, err) => ({
            ...acc,
            [err.path.join(".")]: err.message,
          }),
          {}
        ),
      });
    }
  };
