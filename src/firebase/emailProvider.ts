import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

interface UserSignUp {
  email: string;
  password: string;
  displayName: string;
}

export const registerUserWithEmail = async ({
  email,
  password,
  displayName,
}: UserSignUp) => {
  try {
    const result = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid, photoURL } = result.user;

    if (!FirebaseAuth.currentUser) throw new Error("Firebase user not found");

    await updateProfile(FirebaseAuth.currentUser, {
      displayName,
    });

    //return setValuesCredentials(result);
    return { error: null, uid, photoUrl: photoURL || "", displayName, email };
  } catch (error: any) {
    const errorMessage = error.message;
    const errorCode = error.code;

    return {
      error: {
        errorMessage,
        errorCode,
      },
    };
  }
};

export const logInWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const result = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid, photoURL, displayName } = result.user;

    return {
      error: null,
      uid,
      photoUrl: photoURL || "",
      displayName: displayName || "",
      email,
    };
  } catch (error: any) {
    const errorMessage = error.message;
    const errorCode = error.code;
    return {
      error: {
        errorMessage,
        errorCode,
      },
    };
  }
};
