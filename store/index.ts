import { configureStore } from "@reduxjs/toolkit";
// ...

import { counterSlice } from "../reducers";
import { wardrobeSlice } from "../reducers/wardrobeReducer";
import {userSlice} from "../reducers/userReducer";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    wardrobe: wardrobeSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
