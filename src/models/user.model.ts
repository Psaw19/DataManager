import mongoose, { Document, Schema, Model } from "mongoose";
import { NoteDocument } from "./note.model";
import { CredentialDocument } from "./credential.model";

export interface UserDocument extends Document {
  fullname: string;
  username: string;
  password: string;
  email: string;
  notes: NoteDocument["_id"][];
  credentials: CredentialDocument["_id"][];
}

const userSchema = new Schema<UserDocument>({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
  credentials: [{ type: Schema.Types.ObjectId, ref: "Credential" }],
});

export const UserModel: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);
