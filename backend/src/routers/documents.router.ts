import express from "express";

// Import the controllers
import {
  createDocument,
  deleteDocument,
  getAllDocuments,
  getDocumentById,
  updateTitle,
} from "@/controllers/documents.controller";
import { body } from "@/middlewares/validation.middleware";
import { z } from "zod";
import passport from "passport";

// Import the auth middleware

const router = express.Router();
router.use(
  passport.authenticate("jwt", { session: false })
);

// Define the routes
router.get("/", getAllDocuments);

router.get("/:id", getDocumentById);

router.post("/", body(z.object({ title: z.string() })), createDocument);

router.patch("/:id/title", body(z.object({ title: z.string() })), updateTitle);

router.delete("/:id", deleteDocument);

export default router;
