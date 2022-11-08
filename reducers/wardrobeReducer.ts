import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


interface WardrobeState {
    itemsAmount: number;
}

const initialState = {
    itemsAmount: 0,
    userItems: []
} as WardrobeState;

export const wardrobeSlice = createSlice({
    name: 'wardrobe',
    initialState,
    reducers: {

    }
});

export const {} = wardrobeSlice.actions;

export const selectWardrobe = (state: RootState) => state.wardrobe;

export default wardrobeSlice.reducer;
