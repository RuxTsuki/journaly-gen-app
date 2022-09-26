import { Dispatch } from "react";
import { RootState } from "../store";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewNote,
  deleteNoteById,
  setActiveNote,
  setImgsToActiveNote,
  setNotes,
  setSaving,
  startSaveNewNote,
  updateNote,
} from "./journalSlice";
import { pathJournal, pathNotes } from "../../firebase/paths";
import { loadNotes } from "./../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";
import Swal from "sweetalert2";

/**
 * Journal New Note Thunk
 * @returns
 */
export const startNewNote = () => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch(startSaveNewNote());

    const { uid } = getState().auth;

    const newNote: any = {
      title: "New Note",
      body: "",
      date: 0,
    };

    const newDoc = doc(
      collection(FirebaseDB, `${uid}/${pathJournal}/${pathNotes}`)
    );

    await setDoc(newDoc, newNote);

    newNote.id = uid;

    dispatch(addNewNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("You must be logged in");

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    if (!uid) throw new Error("You must be logged in");

    const { activeNote } = getState().journal;
    if (!activeNote) throw new Error("doesn't exist");

    const { id, ...noteToFireStore } = { ...activeNote };

    const docRef = doc(
      FirebaseDB,
      `${uid}/${pathJournal}/${pathNotes}/${activeNote.id}`
    );

    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote({ ...activeNote }));
  };
};

export const startUploadingFiles = (files: FileList) => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    if (!getState().journal.activeNote) {
      Swal.fire("Error", "please select a journal to upload", "error");
      return;
    }

    dispatch(setSaving());

    const filesPromise = [];
    for (const file of files) {
      filesPromise.push(fileUpload(file));
    }

    try {
      const respFiles = await Promise.all(filesPromise);

      if (files.length === respFiles.length) {
        console.log("all images uploaded");
      }

      dispatch(setImgsToActiveNote(respFiles));
    } catch (error) {
      console.log(`Something went wrong `, error);
    }
  };
};

export const startDeletingNote = () => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    const { uid } = getState().auth;

    const { activeNote } = getState().journal;

    if (!activeNote) {
      Swal.fire("Error", "please select a journal to delete", "error");
      return;
    }

    const docRef = doc(
      FirebaseDB,
      `${uid}/${pathJournal}/${pathNotes}/${activeNote.id}`
    );
    await deleteDoc(docRef);
    dispatch(deleteNoteById(activeNote.id));
  };
};
