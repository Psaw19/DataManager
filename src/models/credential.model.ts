import mongoose, { Document, Schema, Model } from "mongoose";

export interface CredentialDocument extends Document {
  username: string;
  password: string;
}

const credentialSchema = new Schema<CredentialDocument>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const CredentialModel: Model<CredentialDocument> =
  mongoose.models.Credential ||
  mongoose.model<CredentialDocument>("Credential", credentialSchema);
