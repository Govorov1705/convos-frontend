import type { Auth } from "@/lib/definitions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
} satisfies Auth as Auth;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    finishInitialLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { signIn, logout, finishInitialLoading } = authSlice.actions;
export default authSlice.reducer;
