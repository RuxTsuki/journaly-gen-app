import { collection, DocumentData, getDocs } from "firebase/firestore/lite";
import { pathJournal, pathNotes } from "../firebase/paths";
import { Note } from "../generalTypes/notes.interface";
import { FirebaseDB } from "./../firebase/config";

export const loadNotes = async (uid: string) => {
  const collectionRef = collection(
    FirebaseDB,
    `${uid}/${pathJournal}/${pathNotes}`
  );
  const docs = await getDocs(collectionRef);

  const notes: any[] = [];

  docs.forEach((doc) => {
    notes.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return notes;
};
