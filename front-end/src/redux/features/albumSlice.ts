import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { AlbumState } from "../interface";
import { AlbumPopUpType } from "../../types/common";

const initialState: AlbumState = {
  popUp: null,
};

export const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    switchPopUp: (state, action: PayloadAction<AlbumPopUpType>) => {
      state.popUp = action.payload;
    },
  },
});

export const { switchPopUp } = albumSlice.actions;

export const selectPopUp = (state: RootState) => state.album.popUp;

export default albumSlice.reducer;
