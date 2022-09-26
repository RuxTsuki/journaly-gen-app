import {
  logInWithEmail,
  registerUserWithEmail,
} from "../../firebase/emailProvider";
import { signInWithGoogle } from "../../firebase/googleProvider";
import { logoutFirebase } from "../../firebase/logoutProvider";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkAuth, login, logout } from "./authSlice";

export const authThunk = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(checkAuth());

    // something async
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch: any) => {
    dispatch(checkAuth());

    const result = await signInWithGoogle();

    if (result.error) return dispatch(logout(result.error));

    dispatch(login(result));
  };
};

export const startSignUpWithEmail = ({
  email,
  password,
  displayName,
}: {
  email: string;
  password: string;
  displayName: string;
}) => {
  return async (dispatch: any) => {
    dispatch(checkAuth());
    const { error, uid, photoUrl } = await registerUserWithEmail({
      email,
      displayName,
      password,
    });

    if (error) return dispatch(logout(error));

    dispatch(login({ error, uid, photoUrl, displayName, email }));
  };
};

export const startSignInWithEmail = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return async (dispatch: any) => {
    dispatch(checkAuth());

    const { error, uid, photoUrl, displayName } = await logInWithEmail({
      email,
      password,
    });

    if (error) return dispatch(logout(error));

    dispatch(login({ error, uid, photoUrl, displayName, email }));
  };
};

export const startSignOut = () => {
  return async (dispatch: any) => {
    await logoutFirebase();

    dispatch(clearNotesLogout());

    dispatch(logout(null));
  };
};
