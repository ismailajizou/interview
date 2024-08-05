import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./utils/db-connection";
import usersRouter from "@/routers/users.router";
const PORT = process.env.PORT || 8000;

async function main() {
  await connectDB();
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );
  const api = express.Router();
  app.use("/api", api);

  api.use("/users", usersRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
main();
