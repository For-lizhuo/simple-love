import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { AnniversaryState } from "../interface";
import { AnniversaryPopUpType } from "../../types/common";

const initialState: AnniversaryState = {
  popUp: null,
};

export const anniversarySlice = createSlice({
  name: "anniversary",
  initialState,
  reducers: {
    switchPopUp: (state, action: PayloadAction<AnniversaryPopUpType>) => {
      state.popUp = action.payload;
    },
  },
});

export const { switchPopUp } = anniversarySlice.actions;

export const selectPopUp = (state: RootState) => state.anniversary.popUp;

export default anniversarySlice.reducer;
