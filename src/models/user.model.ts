import mongoose, { Document, Schema, Model } from "mongoose";
import { NoteDocument } from "@/models/note.model";
import { CredentialDocument } from "@/models/credential.model";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  notes: NoteDocument["_id"][];
  credentials: CredentialDocument["_id"][];
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
  credentials: [{ type: Schema.Types.ObjectId, ref: "Credential" }],
});

export const UserModel: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);
