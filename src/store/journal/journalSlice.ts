import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ImageNote, Note } from "../../generalTypes/notes.interface";

interface journalState {
  isSaving: boolean;
  msgSaved: string;
  notes: Note[];
  activeNote: Note | undefined;
}

const initialState: journalState = {
  isSaving: false,
  msgSaved: "",
  notes: [],
  activeNote: undefined,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    startSaveNewNote: (state) => {
      state.isSaving = true;
    },
    addNewNote: (state, { payload }: PayloadAction<any>) => {
      state.notes.push(payload);
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }: PayloadAction<any>) => {
      state.activeNote = payload;
      state.msgSaved = "";
    },
    setNotes: (state, { payload }: PayloadAction<Note[]>) => {
      state.notes = payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.msgSaved = "";
    },
    updateNote: (state, { payload }: PayloadAction<Note>) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) =>
        note.id === payload.id ? payload : note
      );
      state.msgSaved = "Note updated";
    },
    setImgsToActiveNote: (state, { payload }: PayloadAction<ImageNote[]>) => {
      if (!state.activeNote) return;

      state.activeNote.imageUrls = [
        ...(state.activeNote.imageUrls || []),
        ...payload,
      ];

      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.msgSaved = "";
      state.activeNote = undefined;
      state.notes = [];
    },
    deleteNoteById: (state, { payload }: PayloadAction<string>) => {
      state.activeNote = undefined;
      state.notes = state.notes.filter((note) => note.id !== payload);
    },
  },
});

export const {
  addNewNote,
  clearNotesLogout,
  deleteNoteById,
  setActiveNote,
  setImgsToActiveNote,
  setNotes,
  setSaving,
  startSaveNewNote,
  updateNote,
} = journalSlice.actions;

export const selectCount = (state: RootState) => state.auth;

export default journalSlice.reducer;
