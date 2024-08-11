import authRouter from "@/routers/auth.router";
import tasksRouter from "@/routers/tasks.router";
import usersRouter from "@/routers/users.router";
import cors from "cors";
import "dotenv/config";
import express from "express";
import passport from "passport";
import { connectDB } from "./utils/db-connection";
import "@/utils/passport";
import { createServer } from "node:http";
import { Server } from "socket.io";
import User, { IUser } from "./models/user.model";
import Document from "./models/document.model";
import docsRouter from "./routers/documents.router";
import jwt from "jsonwebtoken";
const PORT = process.env.PORT || 8000;

async function main() {
  await connectDB();
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST", "PUT"],
    },
  });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      // credentials: true,
    })
  );
  const api = express.Router();
  // Run the server on ${{url}}/api
  app.use("/api", api);
  app.use(passport.initialize());
  // Import the auth router

  api.use("/auth", authRouter);
  api.use("/users", usersRouter);
  api.use("/tasks", tasksRouter);
  api.use("/docs", docsRouter);

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  io.use((socket, next) => {
    console.log("Socket connected", socket.handshake.auth);
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded) {
      return next(new Error("Authentication error"));
    }
    (socket as any).user = decoded;
    next();
  });

  io.on("connection", (socket) => {
    const user = (socket as any).user as IUser;
    console.log("A user connected:", user.id);

    // Update user online status
    User.findByIdAndUpdate(user.id, { isOnline: true })
      .then(() => console.log(`${user.name} is online`))
      .catch((err) => console.error(err));

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected:", user.name);
      User.findByIdAndUpdate(user.id, { isOnline: false })
        .then(() => console.log(`${user.name} is offline`))
        .catch((err) => console.error(err));
    });

    // handle joining the document room
    socket.on("join-doc", async (docID) => {
      const editors = await Document.findOneAndUpdate(
        { _id: docID },
        { $addToSet: { currentEditors: user.id } },
        { new: true }
      )
        .populate("currentEditors")
        .select("currentEditors");
      console.log(editors);

      socket.join(docID);
      io.to(docID).emit("editors-changed", {
        editors: editors?.currentEditors,
        docId: docID,
      });
    });

    // handle leaving the document room
    socket.on("leave-doc", async (docID) => {
      socket.leave(docID);
      const editors = await Document.findOneAndUpdate(
        { _id: docID },
        { $pull: { currentEditors: user.id } },
        { new: true }
      )
        .populate("currentEditors")
        .select("currentEditors");
      io.to(docID).emit("editors-changed", {
        editors: editors?.currentEditors,
        docId: docID,
      });
    });

    // handle document changes
    socket.on("doc-change", async (docID, content) => {
      console.log("Doc change", docID, content);
      const d = await Document.findByIdAndUpdate(docID, { content });
      socket.to(docID).emit("doc-change", { content: content });
    });
  });
}
main().catch((error) => console.error("Error starting server:", error));
