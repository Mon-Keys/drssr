import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { addClothes, prepareClothes } from "./addItem";
import {fetchUsersClothes} from "./fetchClothes";
import * as ImagePicker from "expo-image-picker";

export interface Clothes {
    id: number;
    brand: string;
    color: string;
    currency: string;
    link: string;
    type: string;
    img_path: string;
    mask_path: string;
    owner_id: number;
    price: number;
    sex: string;
    description: string;
}

export interface PrepareClothesResponse {
    id: number;
    type: string;
    mask_path: string;
}

export interface PrepareClothes {
    currentItem?: ImagePicker.ImagePickerResult | null;
    itemResp: PrepareClothesResponse | null;
    status: string
}

interface ClothesState {
    clothesData: Array<Clothes>;
    prepareClothes: PrepareClothes;
    status: string;
    error: string;
}

const initialState = {
    clothesData: [],
    prepareClothes: {status: '', itemResp: null},
    status: '',
    error: ''
} as ClothesState;

export const clothesSlice = createSlice({
    name: 'clothes',
    initialState,
    reducers: {
        loadData: (state) => {
            console.log('not done loadData111', state);
        },
        choosePhoto: (
            state,
            action: PayloadAction<ImagePicker.ImagePickerResult>
        ) => {
            state.prepareClothes.currentItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersClothes.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(fetchUsersClothes.fulfilled, (state, action) => {
                state.status = 'resolved';
                console.log('resolved');
                const clothes = action.payload as unknown as Array<Clothes>;
                state.clothesData = clothes ? clothes.reverse() : Array<Clothes>();
                console.log('done');
            })
            .addCase(fetchUsersClothes.rejected, (state) => {
                state.status = 'rejected';
                console.log('rejected');
            })
            .addCase(prepareClothes.pending, (state) => {
                state.prepareClothes.status = 'pending';
                console.log('pending prepareClothes');
            })
            .addCase(prepareClothes.fulfilled, (state, action) => {
                state.prepareClothes.status = 'resolved';
                console.log('resolved prepareClothes');

                state.prepareClothes.itemResp = action.payload as PrepareClothesResponse;

                const clothes = action.payload as Clothes;
                state.clothesData.unshift(clothes)
            })
            .addCase(prepareClothes.rejected, (state) => {
                state.prepareClothes.status = 'rejected';
                console.log('rejected prepareClothes');
            })
            .addCase(addClothes.fulfilled, (state, action) => {
                state.status = 'resolved';
                console.log('resolved');
                const item = action.payload as unknown as Clothes;
                const idx = state.clothesData.findIndex((element) => element.id == item.id);
                state.clothesData[idx] = item;
                console.log('done');
            });
    }
});

export const { loadData, choosePhoto } = clothesSlice.actions

export const selectUserItems = (state: RootState) => state.clothes.clothesData;

export const selectPrepareClothes = (state: RootState) => state.clothes.prepareClothes;

export default clothesSlice.reducer;
