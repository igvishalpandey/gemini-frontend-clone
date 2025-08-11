import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  phoneNumber: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  phoneNumber: localStorage.getItem("phoneNumber"),
  isLoggedIn: !!localStorage.getItem("phoneNumber"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.phoneNumber = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("phoneNumber", action.payload);
    },
    logout(state) {
      state.phoneNumber = null;
      state.isLoggedIn = false;
      localStorage.removeItem("phoneNumber");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
