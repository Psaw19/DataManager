import mongoose, { Document, Schema, Model } from "mongoose";

export interface NoteDocument extends Document {
  title: string;
  description: string;
}

const noteSchema = new Schema<NoteDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export const NoteModel: Model<NoteDocument> =
  mongoose.models.Note || mongoose.model<NoteDocument>("Note", noteSchema);
