import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { AuthState } from "../interface";

const initialState: AuthState = {
  loginStatus: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.loginStatus = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.loginStatus = false;
      state.token = undefined;
    },
  },
});

export const { login,logout } = authSlice.actions;

export const selectLoginStatus = (state: RootState) => state.auth.loginStatus;

export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
