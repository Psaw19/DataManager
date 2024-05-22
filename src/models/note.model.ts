import mongoose, { Document, Schema, Model } from "mongoose";

import { UserDocument } from "@/models/user.model";

export interface NoteDocument extends Document {
  userId: UserDocument["_id"];
  title: string;
  description: string;
}

const noteSchema = new Schema<NoteDocument>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export const NoteModel: Model<NoteDocument> =
  mongoose.models.Note || mongoose.model<NoteDocument>("Note", noteSchema);
