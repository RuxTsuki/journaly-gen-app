import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  basicCredentials,
  errorAuth,
} from "../../firebase/providers.interface";
import { AuthStatusType } from "../../auth/types/auth.interface";

interface authState extends basicCredentials {
  status: AuthStatusType;
}

const initialState: authState = {
  status: AuthStatusType.authType3,
  uid: "",
  email: "",
  displayName: "",
  photoUrl: "",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (_, { payload }: PayloadAction<basicCredentials>): authState => {
      // is not allowed to return and mutate state at the same time
      // Object.assign(state); this is another way to do it

      // second thing,
      // "state = payload" does not actually mutate or return anything new

      return {
        ...payload,
        status: AuthStatusType.authType1,
      };
    },
    logout: (_, { payload }: PayloadAction<errorAuth | null>): authState => {
      return {
        ...initialState,
        status: AuthStatusType.authType2,
        error: payload,
      };
    },
    checkAuth: (state) => {
      state.status = AuthStatusType.authType3;
    },
  },
});

export const { login, logout, checkAuth } = authSlice.actions;

export const selectCount = (state: RootState) => state.auth;

export default authSlice.reducer;
