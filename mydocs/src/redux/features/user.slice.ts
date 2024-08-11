// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isOnline: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isOnline: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    setOnline: (state) => {
      state.isOnline = true;
    },
    setOffline: (state) => {
      state.isOnline = false;
    },
  },
});

export const { setUser, logout, setOffline, setOnline } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
