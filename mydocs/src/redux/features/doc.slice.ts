import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUser } from "../apis/auth.api";

export const docSlice = createSlice({
  name: "doc",
  initialState: {
    currentEditors: [] as IUser[],
    content: "",
  },
  reducers: {
    editorsChanged: (state, action: PayloadAction<IUser[]>) => {
      state.currentEditors = action.payload;
    },
    setDocContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
});

export const { editorsChanged, setDocContent } = docSlice.actions;
export const selectDoc = (state: RootState) => state.doc;
export default docSlice.reducer;
