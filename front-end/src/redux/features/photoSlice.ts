import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { PhotoState } from "../interface";
import { PhotoPopUpType } from "../../types/common";
import { PictureInfo } from "../../types/payloadAction";

const initialState: PhotoState = {
  popUp: null,
  pictureInfo: {
    pictureSrc: "",
    pictureId: 0,
  },
};

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    switchPopUp: (state, action: PayloadAction<PhotoPopUpType>) => {
      state.popUp = action.payload;
    },
    setPictureInfo: (state, action: PayloadAction<PictureInfo>) => {
      state.pictureInfo.pictureSrc = action.payload.pictureSrc;
      state.pictureInfo.pictureId = action.payload.pictureId;
    },
  },
});

export const { switchPopUp, setPictureInfo } = photoSlice.actions;

export const selectPopUp = (state: RootState) => state.photo.popUp;
export const selectPictureInfo = (state: RootState) => state.photo.pictureInfo;

export default photoSlice.reducer;
