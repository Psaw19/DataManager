import mongoose, { Document, Schema, Model } from "mongoose";

import { UserDocument } from "@/models/user.model";

export interface CredentialDocument extends Document {
  userId: UserDocument["_id"];
  username: string;
  password: string;
}

const credentialSchema = new Schema<CredentialDocument>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const CredentialModel: Model<CredentialDocument> =
  mongoose.models.Credential ||
  mongoose.model<CredentialDocument>("Credential", credentialSchema);
