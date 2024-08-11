import mongoose from "mongoose";

interface IDocument {
  id: string;
  title: string;
  content: string;
  creatorId: mongoose.Schema.Types.ObjectId;
  currentEditors: mongoose.Schema.Types.ObjectId[];
  createdAt: string;
  updatedAt: string;
}

export const documentSchema = new mongoose.Schema<IDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: false, default: "" },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currentEditors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model<IDocument>("Document", documentSchema);

export default Document;
