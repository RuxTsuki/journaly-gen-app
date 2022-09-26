import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { startLoadingNotes } from "../store/journal/journalThunks";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

export const useCheckAuth = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout(null));

      const { uid, email, displayName, photoURL } = user;

      dispatch(
        login({
          error: null,
          uid,
          email: email || "",
          displayName: displayName || "",
          photoUrl: photoURL || "",
        })
      );

      dispatch(startLoadingNotes());
    });
  }, []);

  return {
    status,
  };
};
