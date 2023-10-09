import { configureStore } from "@reduxjs/toolkit";
import homeReducer from '../features/homeSlice';
import albumReducer from '../features/albumSlice';
import photoReducer from '../features/photoSlice';
import anniversaryReducer from "../features/anniversarySlice";
import todoReducer from "../features/todoSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    home:homeReducer,
    album:albumReducer,
    photo:photoReducer,
    anniversary:anniversaryReducer,
    todo:todoReducer,
    auth:authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
