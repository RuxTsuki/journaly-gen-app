
import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // another form to get data but more accurate?
    //const credentials = GoogleAuthProvider.credentialFromResult(result);

    return setValuesCredentials(result);
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

/**
 * Ensure the properties have been set if is null or empty
 * because signInWithPopup by default return properties string | null
 * @uid always come set
 */
const setValuesCredentials = (result: UserCredential) => {
  const { email, displayName, photoURL, uid } = result.user;
  return {
    error: null,
    displayName: displayName || "",
    email: email || "",
    photoUrl: photoURL || "",
    uid,
  };
};
