import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { Item } from "../types/";

interface WardrobeState {
  itemsAmount: number;
  userItems: Array<Item>;
}

const initialState = {
  itemsAmount: 0,
  userItems: [],
} as WardrobeState;

export const wardrobeSlice = createSlice({
  name: "wardrobe",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.userItems = [...state.userItems, action.payload];
    },
  },
});

export const { addItem } = wardrobeSlice.actions;

export const selectWardrobe = (state: RootState) => state.wardrobe;

export default wardrobeSlice.reducer;
