// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpoGx4t2PgWfsesCqYQBbpyIxrcPEnsO4",
  authDomain: "react-dates-fer.firebaseapp.com",
  projectId: "react-dates-fer",
  storageBucket: "react-dates-fer.appspot.com",
  messagingSenderId: "56332988923",
  appId: "1:56332988923:web:994f0dfffc0248820e5b5e",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
