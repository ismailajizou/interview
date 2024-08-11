import Document from "@/models/document.model";
import { Request, Response } from "express";

export const getAllDocuments = async (req: Request, res: Response) => {
  try {
    const all = await Document.find().populate(["creatorId", "currentEditors"]);
    res.json({ documents: all });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const document = await Document.findById(req.params.id).populate([
      "creatorId",
      "currentEditors",
    ]);
    res.json({ document });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createDocument = async (req: Request, res: Response) => {
  const usr = req.user as any;
  console.log("CREATE: ", usr);
  try {
    const document = await Document.create({
      ...req.body,
      content: "",
      creatorId: usr.id,
    });
    res.json({ document });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error", error: error });
  }
};

export const updateTitle = async (req: Request, res: Response) => {
  try {
    const document = await Document.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );
    res.json({ document });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteDocument = async (req: Request, res: Response) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
