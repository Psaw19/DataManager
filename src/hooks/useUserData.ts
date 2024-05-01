import { create } from "zustand";

import { CredentialDocument } from "@/models/credential.model";
import { NoteDocument } from "@/models/note.model";

type State = {
  credentials: CredentialDocument[];
  notes: NoteDocument[];
};

type Action = {
  setCredentials: (credentials: State["credentials"]) => void;
  setNotes: (notes: State["notes"]) => void;
};

export const useUserData = create<State & Action>((set) => ({
  credentials: [],
  notes: [],
  setCredentials: (credentials) => set(() => ({ credentials })),
  setNotes: (notes) => set(() => ({ notes })),
}));
