import { configureStore } from "@reduxjs/toolkit";
// ...

import { counterSlice } from "../reducers";
import { wardrobeSlice } from "../reducers/wardrobeReducer";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    wardrobe: wardrobeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
