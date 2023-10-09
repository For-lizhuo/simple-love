import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { TodoState } from "../interface";
import { TodoPopUpType } from "../../types/common";

const initialState: TodoState = {
  popUp: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    switchPopUp: (state, action: PayloadAction<TodoPopUpType>) => {
      state.popUp = action.payload;
    },
  },
});

export const { switchPopUp } = todoSlice.actions;

export const selectPopUp = (state: RootState) => state.todo.popUp;

export default todoSlice.reducer;
