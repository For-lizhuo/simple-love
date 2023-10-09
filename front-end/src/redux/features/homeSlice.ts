import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { HomeState } from "../interface";
import { HomePopUpType } from "../../types/common";

const initialState: HomeState = {
  popUp: "log",
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    switchPopUp: (state, action: PayloadAction<HomePopUpType>) => {
      state.popUp = action.payload;
    },
  },
});

export const { switchPopUp } = homeSlice.actions;

export const selectPopUp = (state: RootState) => state.home.popUp;

export default homeSlice.reducer;
